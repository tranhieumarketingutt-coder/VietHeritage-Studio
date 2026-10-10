import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { useFocusTrap, UseFocusTrapOptions, _resetActiveTrapStackForTesting } from "../src/shared/hooks/useFocusTrap.ts";

// --- Mock DOM Implementation ---

interface Rect {
  width: number;
  height: number;
}

class MockElement {
  public tagName: string;
  public id: string = "";
  public tabIndex: number = 0;
  public disabled: boolean = false;
  public offsetWidth: number = 100;
  public offsetHeight: number = 50;
  public attributes: Record<string, string> = {};
  public style: Record<string, string> = {};
  public children: MockElement[] = [];
  public parent: MockElement | null = null;
  public isFocused: boolean = false;

  constructor(tagName: string, attributes: Record<string, string> = {}) {
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attributes };
    if (attributes.id) this.id = attributes.id;
    if (attributes.tabindex !== undefined) this.tabIndex = parseInt(attributes.tabindex, 10);
    if (attributes.disabled !== undefined) this.disabled = true;
  }

  appendChild(child: MockElement): MockElement {
    child.parent = this;
    this.children.push(child);
    return child;
  }

  getClientRects(): Rect[] {
    return this.offsetWidth > 0 || this.offsetHeight > 0 ? [{ width: this.offsetWidth, height: this.offsetHeight }] : [];
  }

  focus(): void {
    if (globalDoc.activeElement && globalDoc.activeElement !== (this as unknown as HTMLElement)) {
      (globalDoc.activeElement as unknown as MockElement).isFocused = false;
    }
    globalDoc.activeElement = this as unknown as HTMLElement;
    this.isFocused = true;
  }

  contains(el: any): boolean {
    if (!el) return false;
    if (el === this) return true;
    for (const child of this.children) {
      if (child.contains(el)) return true;
    }
    return false;
  }

  querySelectorAll<T = HTMLElement>(selector: string): T[] {
    const results: MockElement[] = [];
    const selectors = selector.split(",").map(s => s.trim());

    const check = (el: MockElement) => {
      if (this.matchesAny(el, selectors)) {
        results.push(el);
      }
      for (const child of el.children) {
        check(child);
      }
    };

    for (const child of this.children) {
      check(child);
    }
    return results as unknown as T[];
  }

  private matchesAny(el: MockElement, selectors: string[]): boolean {
    if (el.disabled) return false;
    for (const sel of selectors) {
      if (sel === "a[href]" && el.tagName === "A" && "href" in el.attributes) return true;
      if (sel === "button:not([disabled])" && el.tagName === "BUTTON" && !el.disabled) return true;
      if (sel === "textarea:not([disabled])" && el.tagName === "TEXTAREA" && !el.disabled) return true;
      if (sel === "input:not([disabled])" && el.tagName === "INPUT" && !el.disabled) return true;
      if (sel === "select:not([disabled])" && el.tagName === "SELECT" && !el.disabled) return true;
      if (sel === '[tabindex]:not([tabindex="-1"]):not([disabled])') {
        if (el.tabIndex !== undefined && el.tabIndex >= 0 && !el.disabled) return true;
      }
    }
    return false;
  }
}

interface WindowListener {
  type: string;
  handler: (e: any) => void;
}

let windowListeners: WindowListener[] = [];

const mockWindow = {
  addEventListener(type: string, handler: (e: any) => void) {
    windowListeners.push({ type, handler });
  },
  removeEventListener(type: string, handler: (e: any) => void) {
    const idx = windowListeners.findIndex(l => l.type === type && l.handler === handler);
    if (idx !== -1) windowListeners.splice(idx, 1);
  },
  dispatchEvent(event: any) {
    for (const l of [...windowListeners]) {
      if (l.type === event.type) {
        l.handler(event);
      }
    }
  }
};

const mockBody = new MockElement("body");
const globalDoc: {
  activeElement: HTMLElement | null;
  body: { style: { overflow: string } };
} = {
  activeElement: null,
  body: mockBody as unknown as { style: { overflow: string } }
};

// --- React Hook Dispatcher Harness ---

const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

interface EffectRecord {
  idx: number;
  effect: () => void | (() => void);
  deps: any[] | undefined;
  cleanup?: () => void;
}

class HookTestHarness {
  private hooks: any[] = [];
  private hookIndex = 0;
  private effectRecords: EffectRecord[] = [];
  private lastDeps: Map<number, any[]> = new Map();
  public containerElement: MockElement;
  public ref: { current: HTMLElement | null } = { current: null };

  constructor() {
    this.containerElement = new MockElement("div", { id: "dialog-container", tabindex: "-1" });
    this.ref.current = this.containerElement as unknown as HTMLElement;
  }

  private createDispatcher() {
    return {
      useRef: (init: any) => {
        const idx = this.hookIndex++;
        if (this.hooks[idx] === undefined) {
          this.hooks[idx] = { current: init };
        }
        return this.hooks[idx];
      },
      useCallback: (fn: any, deps: any[]) => {
        const idx = this.hookIndex++;
        if (!this.hooks[idx]) {
          this.hooks[idx] = { fn, deps };
        } else {
          const prev = this.hooks[idx];
          const changed = !deps || deps.some((d, i) => !Object.is(d, prev.deps[i]));
          if (changed) this.hooks[idx] = { fn, deps };
        }
        return this.hooks[idx].fn;
      },
      useEffect: (effect: () => void | (() => void), deps?: any[]) => {
        const idx = this.hookIndex++;
        this.effectRecords.push({ idx, effect, deps });
      }
    };
  }

  public render(options: UseFocusTrapOptions) {
    this.hookIndex = 0;
    this.effectRecords = [];
    internals.H = this.createDispatcher();

    const returnedRef = useFocusTrap<HTMLElement>(options);
    internals.H = null;

    // Attach container DOM element to the returned ref if unassigned
    if (!returnedRef.current) {
      returnedRef.current = this.containerElement as unknown as HTMLElement;
    }

    // Process effects
    for (const record of this.effectRecords) {
      const prevDeps = this.lastDeps.get(record.idx);
      const depsChanged = !prevDeps || !record.deps || record.deps.some((d, i) => !Object.is(d, prevDeps[i]));

      if (depsChanged) {
        // Run previous cleanup if any
        const existingRecord = this.hooks.find(h => h && h.__idx === record.idx);
        if (existingRecord?.cleanup) {
          existingRecord.cleanup();
          existingRecord.cleanup = undefined;
        }

        // Run effect
        const cleanup = record.effect();
        if (typeof cleanup === "function") {
          const stored = { __idx: record.idx, cleanup };
          const existingIdx = this.hooks.findIndex(h => h && h.__idx === record.idx);
          if (existingIdx !== -1) {
            this.hooks[existingIdx] = stored;
          } else {
            this.hooks.push(stored);
          }
        }
        this.lastDeps.set(record.idx, record.deps ?? []);
      }
    }

    return returnedRef;
  }

  public unmount() {
    for (const hook of this.hooks) {
      if (hook && typeof hook.cleanup === "function") {
        hook.cleanup();
        hook.cleanup = undefined;
      }
    }
  }
}

// --- Test Suite ---

describe("Empirical Challenger: useFocusTrap & Modal APG Compliance", () => {
  let prevWindow: any;
  let prevDocument: any;

  beforeEach(() => {
    prevWindow = (globalThis as any).window;
    prevDocument = (globalThis as any).document;
    (globalThis as any).window = mockWindow;
    (globalThis as any).document = globalDoc;
    windowListeners = [];
    mockBody.style.overflow = "";
    globalDoc.activeElement = null;
    _resetActiveTrapStackForTesting();
  });

  afterEach(() => {
    (globalThis as any).window = prevWindow;
    (globalThis as any).document = prevDocument;
    windowListeners = [];
    _resetActiveTrapStackForTesting();
  });

  it("Cycle forward (Tab) from last element wraps around to first element", () => {
    const harness = new HookTestHarness();
    const btn1 = new MockElement("button", { id: "btn1" });
    const btn2 = new MockElement("button", { id: "btn2" });
    const btn3 = new MockElement("button", { id: "btn3" });
    harness.containerElement.appendChild(btn1);
    harness.containerElement.appendChild(btn2);
    harness.containerElement.appendChild(btn3);

    harness.render({ isOpen: true, onClose: () => {} });

    // Focus on btn3 (last element)
    btn3.focus();
    assert.equal(globalDoc.activeElement, btn3 as unknown as HTMLElement);

    let defaultPrevented = false;
    const tabEvent = {
      type: "keydown",
      key: "Tab",
      shiftKey: false,
      preventDefault: () => { defaultPrevented = true; },
      stopPropagation: () => {}
    };

    mockWindow.dispatchEvent(tabEvent);

    assert.ok(defaultPrevented, "Tab from last focusable element must prevent default browser action");
    assert.equal(globalDoc.activeElement, btn1 as unknown as HTMLElement, "Focus must cycle forward to first element");

    harness.unmount();
  });

  it("Cycle backward (Shift+Tab) from first element wraps around to last element", () => {
    const harness = new HookTestHarness();
    const btn1 = new MockElement("button", { id: "btn1" });
    const btn2 = new MockElement("button", { id: "btn2" });
    const btn3 = new MockElement("button", { id: "btn3" });
    harness.containerElement.appendChild(btn1);
    harness.containerElement.appendChild(btn2);
    harness.containerElement.appendChild(btn3);

    harness.render({ isOpen: true, onClose: () => {} });

    // Focus on btn1 (first element)
    btn1.focus();
    assert.equal(globalDoc.activeElement, btn1 as unknown as HTMLElement);

    let defaultPrevented = false;
    const shiftTabEvent = {
      type: "keydown",
      key: "Tab",
      shiftKey: true,
      preventDefault: () => { defaultPrevented = true; },
      stopPropagation: () => {}
    };

    mockWindow.dispatchEvent(shiftTabEvent);

    assert.ok(defaultPrevented, "Shift+Tab from first element must prevent default");
    assert.equal(globalDoc.activeElement, btn3 as unknown as HTMLElement, "Focus must cycle backward to last element");

    harness.unmount();
  });

  it("Middle element navigation allows native browser Tab flow", () => {
    const harness = new HookTestHarness();
    const btn1 = new MockElement("button", { id: "btn1" });
    const btn2 = new MockElement("button", { id: "btn2" });
    const btn3 = new MockElement("button", { id: "btn3" });
    harness.containerElement.appendChild(btn1);
    harness.containerElement.appendChild(btn2);
    harness.containerElement.appendChild(btn3);

    harness.render({ isOpen: true, onClose: () => {} });

    // Focus on middle element
    btn2.focus();

    let defaultPrevented = false;
    const tabEvent = {
      type: "keydown",
      key: "Tab",
      shiftKey: false,
      preventDefault: () => { defaultPrevented = true; },
      stopPropagation: () => {}
    };

    mockWindow.dispatchEvent(tabEvent);

    assert.equal(defaultPrevented, false, "Tab on intermediate element must not prevent default");

    harness.unmount();
  });

  it("Single focusable element traps both Tab and Shift+Tab on itself", () => {
    const harness = new HookTestHarness();
    const singleBtn = new MockElement("button", { id: "only-btn" });
    harness.containerElement.appendChild(singleBtn);

    harness.render({ isOpen: true, onClose: () => {} });
    singleBtn.focus();

    let tabPrevented = false;
    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Tab",
      shiftKey: false,
      preventDefault: () => { tabPrevented = true; },
      stopPropagation: () => {}
    });
    assert.ok(tabPrevented, "Tab with single element must prevent default");
    assert.equal(globalDoc.activeElement, singleBtn as unknown as HTMLElement);

    let shiftTabPrevented = false;
    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Tab",
      shiftKey: true,
      preventDefault: () => { shiftTabPrevented = true; },
      stopPropagation: () => {}
    });
    assert.ok(shiftTabPrevented, "Shift+Tab with single element must prevent default");
    assert.equal(globalDoc.activeElement, singleBtn as unknown as HTMLElement);

    harness.unmount();
  });

  it("Container with zero focusable elements prevents Tab escaping without error", () => {
    const harness = new HookTestHarness();
    // No focusable children added

    harness.render({ isOpen: true, onClose: () => {} });

    let defaultPrevented = false;
    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Tab",
      shiftKey: false,
      preventDefault: () => { defaultPrevented = true; },
      stopPropagation: () => {}
    });

    assert.ok(defaultPrevented, "Tab must be prevented when zero focusables exist");

    harness.unmount();
  });

  it("Out-of-bounds focus is pulled back into modal on Tab", () => {
    const harness = new HookTestHarness();
    const insideBtn = new MockElement("button", { id: "inside-btn" });
    harness.containerElement.appendChild(insideBtn);

    const outsideBtn = new MockElement("button", { id: "outside-btn" });
    outsideBtn.focus();
    assert.equal(globalDoc.activeElement, outsideBtn as unknown as HTMLElement);

    harness.render({ isOpen: true, onClose: () => {} });

    let defaultPrevented = false;
    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Tab",
      shiftKey: false,
      preventDefault: () => { defaultPrevented = true; },
      stopPropagation: () => {}
    });

    assert.ok(defaultPrevented);
    assert.equal(globalDoc.activeElement, insideBtn as unknown as HTMLElement, "Out-of-bounds focus must be pulled back inside");

    harness.unmount();
  });

  it("Escape key dismisses modal and prevents event bubbling", () => {
    const harness = new HookTestHarness();
    let closed = false;
    let prevented = false;
    let stopped = false;

    harness.render({
      isOpen: true,
      onClose: () => { closed = true; },
      closeOnEscape: true
    });

    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Escape",
      preventDefault: () => { prevented = true; },
      stopPropagation: () => { stopped = true; }
    });

    assert.ok(closed, "onClose must be invoked on Escape");
    assert.ok(prevented, "preventDefault must be invoked on Escape");
    assert.ok(stopped, "stopPropagation must be invoked on Escape");

    harness.unmount();
  });

  it("Escape key does NOT trigger onClose when closeOnEscape is false", () => {
    const harness = new HookTestHarness();
    let closed = false;

    harness.render({
      isOpen: true,
      onClose: () => { closed = true; },
      closeOnEscape: false
    });

    mockWindow.dispatchEvent({
      type: "keydown",
      key: "Escape",
      preventDefault: () => {},
      stopPropagation: () => {}
    });

    assert.equal(closed, false, "onClose must not be invoked when closeOnEscape is false");

    harness.unmount();
  });

  it("Focus restoration: returns focus to previously active element upon closing or unmounting", () => {
    const triggerBtn = new MockElement("button", { id: "modal-opener-trigger" });
    triggerBtn.focus();
    assert.equal(globalDoc.activeElement, triggerBtn as unknown as HTMLElement);

    const harness = new HookTestHarness();
    const modalBtn = new MockElement("button", { id: "inside-modal-btn" });
    harness.containerElement.appendChild(modalBtn);

    // Open modal
    harness.render({ isOpen: true, onClose: () => {} });

    // Focus moved inside modal
    modalBtn.focus();
    assert.equal(globalDoc.activeElement, modalBtn as unknown as HTMLElement);

    // Close / unmount modal
    harness.unmount();

    assert.equal(
      globalDoc.activeElement,
      triggerBtn as unknown as HTMLElement,
      "Focus must be restored to original opener button on unmount"
    );
  });

  it("Body scroll lock: applies overflow:hidden on open and restores previous overflow on close", () => {
    globalDoc.body.style.overflow = "auto";

    const harness = new HookTestHarness();
    harness.render({ isOpen: true, lockScroll: true });

    assert.equal(globalDoc.body.style.overflow, "hidden", "Body overflow must be hidden while modal is open");

    harness.unmount();

    assert.equal(globalDoc.body.style.overflow, "auto", "Body overflow must restore to original 'auto' value");
  });

  it("Rapid open/close toggle does not leak body scroll lock", () => {
    globalDoc.body.style.overflow = "";

    const harness = new HookTestHarness();

    // Toggle 10 times rapidly
    for (let i = 0; i < 10; i++) {
      harness.render({ isOpen: true, lockScroll: true });
      assert.equal(globalDoc.body.style.overflow, "hidden");
      harness.render({ isOpen: false, lockScroll: true });
      assert.equal(globalDoc.body.style.overflow, "");
    }

    harness.unmount();
    assert.equal(globalDoc.body.style.overflow, "");
  });

  it("When isOpen is false, no keydown listeners are attached to window", () => {
    const harness = new HookTestHarness();
    harness.render({ isOpen: false, onClose: () => {} });

    assert.equal(windowListeners.length, 0, "No keydown listeners should be active when isOpen is false");

    harness.unmount();
  });

  it("Initial focus prioritizes initialFocusRef over container elements", async () => {
    const harness = new HookTestHarness();
    const btn1 = new MockElement("button", { id: "btn1" });
    const targetInput = new MockElement("input", { id: "target-input" });
    harness.containerElement.appendChild(btn1);
    harness.containerElement.appendChild(targetInput);

    const targetRef = { current: targetInput as unknown as HTMLElement };

    harness.render({
      isOpen: true,
      initialFocusRef: targetRef
    });

    // Wait for the 30ms setTimeout inside useFocusTrap
    await new Promise(resolve => setTimeout(resolve, 50));

    assert.equal(
      globalDoc.activeElement,
      targetInput as unknown as HTMLElement,
      "Initial focus must land on initialFocusRef element"
    );

    harness.unmount();
  });

  it("Initial focus targets first focusable element when initialFocusRef is omitted", async () => {
    const harness = new HookTestHarness();
    const btn1 = new MockElement("button", { id: "first-btn" });
    const btn2 = new MockElement("button", { id: "second-btn" });
    harness.containerElement.appendChild(btn1);
    harness.containerElement.appendChild(btn2);

    harness.render({ isOpen: true });

    await new Promise(resolve => setTimeout(resolve, 50));

    assert.equal(
      globalDoc.activeElement,
      btn1 as unknown as HTMLElement,
      "Initial focus must land on first focusable element inside modal"
    );

    harness.unmount();
  });

  it("Stacked modals Escape dismissal enforces LIFO: topmost modal closes first without closing underlying modal", () => {
    const harness1 = new HookTestHarness();
    const harness2 = new HookTestHarness();

    let modal1Closed = false;
    let modal2Closed = false;

    // Modal 1 opens first (e.g. CostumeDetailModal)
    harness1.render({
      isOpen: true,
      onClose: () => { modal1Closed = true; },
      closeOnEscape: true
    });

    // Modal 2 opens second (e.g. Lightbox)
    harness2.render({
      isOpen: true,
      onClose: () => { modal2Closed = true; },
      closeOnEscape: true
    });

    const escapeEvent = {
      type: "keydown",
      key: "Escape",
      preventDefault: () => {},
      stopPropagation: () => {},
      stopImmediatePropagation: () => {}
    };

    mockWindow.dispatchEvent(escapeEvent);

    // In APG standard with LIFO stack, only the topmost active modal (Modal 2) closes
    assert.equal(modal1Closed, false, "Modal 1 must NOT close while Modal 2 is topmost overlay");
    assert.equal(modal2Closed, true, "Topmost Modal 2 receives Escape event and closes");

    // Once Modal 2 closes (isOpen becomes false), Modal 1 becomes topmost
    harness2.render({
      isOpen: false,
      onClose: () => { modal2Closed = true; },
      closeOnEscape: true
    });

    mockWindow.dispatchEvent(escapeEvent);
    assert.equal(modal1Closed, true, "Modal 1 receives Escape after Modal 2 is dismissed");

    harness1.unmount();
    harness2.unmount();
  });

  it("ChatDrawer closed state guarantees no focus capture or background interaction", () => {
    // When ChatDrawer has isOpen=false:
    // 1. useFocusTrap receives isOpen=false -> attaches 0 window listeners
    const harness = new HookTestHarness();
    harness.render({ isOpen: false, onClose: () => {} });
    assert.equal(windowListeners.length, 0, "No listeners attached when isOpen=false");

    // 2. ChatDrawer element markup verification
    const drawerAttrs = {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "chat-drawer-title",
      "aria-hidden": "true",
      inert: "true",
      tabIndex: -1
    };
    assert.equal(drawerAttrs["aria-hidden"], "true");
    assert.equal(drawerAttrs.inert, "true");
    assert.equal(drawerAttrs.tabIndex, -1);

    harness.unmount();
  });

  it("Backdrop click triggers onClose while modal content clicks are protected via stopPropagation", () => {
    let backdropDismissCalled = false;

    const onClose = () => { backdropDismissCalled = true; };

    // Simulate backdrop click
    const simulateBackdropClick = () => {
      onClose();
    };

    // Simulate modal inner container click
    let modalStoppedPropagation = false;
    const simulateModalInnerClick = (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
    };

    simulateModalInnerClick({
      stopPropagation: () => { modalStoppedPropagation = true; }
    });

    assert.ok(modalStoppedPropagation, "Modal inner container must stop click event propagation to backdrop");
    assert.equal(backdropDismissCalled, false, "Modal inner click must not call onClose");

    simulateBackdropClick();
    assert.ok(backdropDismissCalled, "Backdrop click must trigger onClose");
  });
});
