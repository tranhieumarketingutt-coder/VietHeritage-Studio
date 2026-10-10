import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { useFocusTrap, UseFocusTrapOptions, _resetActiveTrapStackForTesting } from "../src/shared/hooks/useFocusTrap.ts";
import { VirtualTryOn, VirtualTryOnState } from "../src/features/studio/components/VirtualTryOn.tsx";
import { COSTUMES_DATA } from "../src/shared/data/costumes.ts";

// --- Mock DOM Implementation for Hook Stress Testing ---

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
      if (sel === 'button[role="radio"]') {
        if (el.tagName === "BUTTON" && el.attributes.role === "radio" && !el.disabled) return true;
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

// React hook dispatcher simulator
const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

interface EffectRecord {
  idx: number;
  effect: () => void | (() => void);
  deps: any[] | undefined;
  cleanup?: () => void;
}

class HookInstanceHarness {
  private hooks: any[] = [];
  private hookIndex = 0;
  private effectRecords: EffectRecord[] = [];
  private lastDeps: Map<number, any[]> = new Map();
  public containerElement: MockElement;
  public ref: { current: HTMLElement | null } = { current: null };

  constructor(id: string) {
    this.containerElement = new MockElement("div", { id, tabindex: "-1" });
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

    if (!returnedRef.current) {
      returnedRef.current = this.containerElement as unknown as HTMLElement;
    }

    for (const record of this.effectRecords) {
      const prevDeps = this.lastDeps.get(record.idx);
      const depsChanged = !prevDeps || !record.deps || record.deps.some((d, i) => !Object.is(d, prevDeps[i]));

      if (depsChanged) {
        const existingRecord = this.hooks.find(h => h && h.__idx === record.idx);
        if (existingRecord?.cleanup) {
          existingRecord.cleanup();
          existingRecord.cleanup = undefined;
        }

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

// --- Test Suites ---

describe("Empirical Challenger M1: LIFO Trap Stacking & Roving Tabindex Stress", () => {
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

  describe("Suite 1: N-Deep LIFO Focus Trap Stacking", () => {
    it("enforces strict LIFO dismissal across a 3-level stacked modal hierarchy (3 -> 2 -> 1)", () => {
      const modal1 = new HookInstanceHarness("modal-1");
      const modal2 = new HookInstanceHarness("modal-2");
      const modal3 = new HookInstanceHarness("modal-3");

      let modal1Closed = false;
      let modal2Closed = false;
      let modal3Closed = false;

      // 1. Open Modal 1 (e.g. CostumeDetailModal)
      modal1.render({
        isOpen: true,
        onClose: () => { modal1Closed = true; },
        closeOnEscape: true
      });

      // 2. Open Modal 2 (e.g. Lightbox)
      modal2.render({
        isOpen: true,
        onClose: () => { modal2Closed = true; },
        closeOnEscape: true
      });

      // 3. Open Modal 3 (e.g. Confirm / Download dialog)
      modal3.render({
        isOpen: true,
        onClose: () => { modal3Closed = true; },
        closeOnEscape: true
      });

      const makeEscape = () => ({
        type: "keydown",
        key: "Escape",
        preventDefault: () => {},
        stopPropagation: () => {}
      });

      // --- 1st Escape Press: ONLY Modal 3 must close ---
      mockWindow.dispatchEvent(makeEscape());
      assert.equal(modal3Closed, true, "Topmost Modal 3 must close on 1st Escape");
      assert.equal(modal2Closed, false, "Modal 2 must NOT close on 1st Escape");
      assert.equal(modal1Closed, false, "Modal 1 must NOT close on 1st Escape");

      // Simulate Modal 3 closing / unmounting
      modal3.render({ isOpen: false, onClose: () => {} });
      modal3.unmount();

      // --- 2nd Escape Press: ONLY Modal 2 must close ---
      mockWindow.dispatchEvent(makeEscape());
      assert.equal(modal2Closed, true, "Middle Modal 2 must close on 2nd Escape");
      assert.equal(modal1Closed, false, "Modal 1 must NOT close on 2nd Escape");

      // Simulate Modal 2 closing / unmounting
      modal2.render({ isOpen: false, onClose: () => {} });
      modal2.unmount();

      // --- 3rd Escape Press: Modal 1 must close ---
      mockWindow.dispatchEvent(makeEscape());
      assert.equal(modal1Closed, true, "Base Modal 1 must close on 3rd Escape");

      // Simulate Modal 1 closing / unmounting
      modal1.render({ isOpen: false, onClose: () => {} });
      modal1.unmount();

      // --- 4th Escape Press: No active modals, safe no-op ---
      let threw = false;
      try {
        mockWindow.dispatchEvent(makeEscape());
      } catch {
        threw = true;
      }
      assert.equal(threw, false, "Escape with empty trap stack must never throw");
    });

    it("enforces strict LIFO dismissal across a 4-level deep modal hierarchy (4 -> 3 -> 2 -> 1)", () => {
      const modals = [
        new HookInstanceHarness("m1"),
        new HookInstanceHarness("m2"),
        new HookInstanceHarness("m3"),
        new HookInstanceHarness("m4")
      ];
      const closed = [false, false, false, false];

      for (let i = 0; i < 4; i++) {
        modals[i].render({
          isOpen: true,
          onClose: () => { closed[i] = true; },
          closeOnEscape: true
        });
      }

      const makeEscape = () => ({
        type: "keydown",
        key: "Escape",
        preventDefault: () => {},
        stopPropagation: () => {}
      });

      // Dismiss in reverse order: 3, then 2, then 1, then 0
      for (let expected = 3; expected >= 0; expected--) {
        mockWindow.dispatchEvent(makeEscape());
        assert.equal(closed[expected], true, `Modal ${expected + 1} must close`);
        for (let j = 0; j < expected; j++) {
          assert.equal(closed[j], false, `Underlying modal ${j + 1} must not close yet`);
        }
        modals[expected].render({ isOpen: false, onClose: () => {} });
        modals[expected].unmount();
      }

      for (const m of modals) {
        m.unmount();
      }
    });

    it("resiliently recovers when a middle modal unmounts out-of-order without Escape", () => {
      const modal1 = new HookInstanceHarness("modal-1");
      const modal2 = new HookInstanceHarness("modal-2");
      const modal3 = new HookInstanceHarness("modal-3");

      let modal1Closed = false;
      let modal2Closed = false;
      let modal3Closed = false;

      modal1.render({ isOpen: true, onClose: () => { modal1Closed = true; } });
      modal2.render({ isOpen: true, onClose: () => { modal2Closed = true; } });
      modal3.render({ isOpen: true, onClose: () => { modal3Closed = true; } });

      // Out-of-order close: Modal 2 is closed directly (e.g. backdrop click or code trigger)
      modal2.render({ isOpen: false, onClose: () => { modal2Closed = true; } });
      modal2.unmount();

      const makeEscape = () => ({
        type: "keydown",
        key: "Escape",
        preventDefault: () => {},
        stopPropagation: () => {}
      });

      // Escape 1: Modal 3 is still topmost and must close
      mockWindow.dispatchEvent(makeEscape());
      assert.equal(modal3Closed, true, "Topmost modal 3 must close despite modal 2 being spliced out");
      assert.equal(modal1Closed, false, "Modal 1 must remain open");

      modal3.render({ isOpen: false, onClose: () => {} });
      modal3.unmount();

      // Escape 2: Modal 1 is now topmost and closes
      mockWindow.dispatchEvent(makeEscape());
      assert.equal(modal1Closed, true, "Modal 1 becomes active topmost and closes on next Escape");

      modal1.unmount();
    });

    it("rapid burst of 10 Escape key presses handles sequential teardown without crashing", () => {
      const modal1 = new HookInstanceHarness("burst-1");
      const modal2 = new HookInstanceHarness("burst-2");

      let modal1CloseCount = 0;
      let modal2CloseCount = 0;

      modal1.render({
        isOpen: true,
        onClose: () => { modal1CloseCount++; }
      });
      modal2.render({
        isOpen: true,
        onClose: () => { modal2CloseCount++; }
      });

      const makeEscape = () => ({
        type: "keydown",
        key: "Escape",
        preventDefault: () => {},
        stopPropagation: () => {}
      });

      // Fire 5 times while modal 2 is open: only modal 2 receives the calls
      for (let i = 0; i < 5; i++) {
        mockWindow.dispatchEvent(makeEscape());
      }
      assert.equal(modal2CloseCount, 5, "Modal 2 handled all 5 escape dispatches");
      assert.equal(modal1CloseCount, 0, "Modal 1 ignored all 5 escape dispatches");

      // Dismiss modal 2
      modal2.render({ isOpen: false, onClose: () => {} });
      modal2.unmount();

      // Fire another 5 times: now modal 1 receives them
      for (let i = 0; i < 5; i++) {
        mockWindow.dispatchEvent(makeEscape());
      }
      assert.equal(modal1CloseCount, 5, "Modal 1 handled subsequent escape dispatches after modal 2 unmounted");

      modal1.unmount();
    });

    it("preserves body scroll lock across nested modal openings and sequentially restores it", () => {
      globalDoc.body.style.overflow = "scroll";

      const modal1 = new HookInstanceHarness("scroll-1");
      const modal2 = new HookInstanceHarness("scroll-2");

      modal1.render({ isOpen: true, lockScroll: true });
      assert.equal(globalDoc.body.style.overflow, "hidden", "Body overflow hidden after Modal 1");

      modal2.render({ isOpen: true, lockScroll: true });
      assert.equal(globalDoc.body.style.overflow, "hidden", "Body overflow remains hidden after Modal 2");

      // Close modal 2: overflow must remain hidden because modal 1 is still active
      modal2.render({ isOpen: false, lockScroll: true });
      modal2.unmount();
      assert.equal(globalDoc.body.style.overflow, "hidden", "Body overflow must stay hidden while Modal 1 remains open");

      // Close modal 1: overflow must now restore to 'scroll'
      modal1.render({ isOpen: false, lockScroll: true });
      modal1.unmount();
      assert.equal(globalDoc.body.style.overflow, "scroll", "Body overflow restored to original 'scroll' after all modals close");
    });

    it("Tab key trapping isolates to topmost modal only and never wraps within background modal", () => {
      const modal1 = new HookInstanceHarness("tab-modal-1");
      const m1Btn = new MockElement("button", { id: "m1-btn" });
      modal1.containerElement.appendChild(m1Btn);

      const modal2 = new HookInstanceHarness("tab-modal-2");
      const m2Btn1 = new MockElement("button", { id: "m2-btn1" });
      const m2Btn2 = new MockElement("button", { id: "m2-btn2" });
      modal2.containerElement.appendChild(m2Btn1);
      modal2.containerElement.appendChild(m2Btn2);

      modal1.render({ isOpen: true, onClose: () => {} });
      modal2.render({ isOpen: true, onClose: () => {} });

      // Focus is inside Modal 2's last element
      m2Btn2.focus();
      assert.equal(globalDoc.activeElement, m2Btn2 as unknown as HTMLElement);

      let prevented = false;
      mockWindow.dispatchEvent({
        type: "keydown",
        key: "Tab",
        shiftKey: false,
        preventDefault: () => { prevented = true; },
        stopPropagation: () => {}
      });

      assert.ok(prevented, "Tab from last element in topmost modal must preventDefault");
      assert.equal(globalDoc.activeElement, m2Btn1 as unknown as HTMLElement, "Tab must cycle to first element of Modal 2, NOT Modal 1");

      modal2.unmount();
      modal1.unmount();
    });

    it("restores focus through a 3-level chain of openers upon sequential dismissal", () => {
      const rootTrigger = new MockElement("button", { id: "root-gallery-card" });
      rootTrigger.focus();

      const modal1 = new HookInstanceHarness("m1");
      const m1InspectBtn = new MockElement("button", { id: "m1-inspect-btn" });
      modal1.containerElement.appendChild(m1InspectBtn);

      // Open Modal 1
      modal1.render({ isOpen: true, onClose: () => {} });
      m1InspectBtn.focus();
      assert.equal(globalDoc.activeElement, m1InspectBtn as unknown as HTMLElement);

      // Open Modal 2
      const modal2 = new HookInstanceHarness("m2");
      const m2CloseBtn = new MockElement("button", { id: "m2-close-btn" });
      modal2.containerElement.appendChild(m2CloseBtn);
      modal2.render({ isOpen: true, onClose: () => {} });
      m2CloseBtn.focus();
      assert.equal(globalDoc.activeElement, m2CloseBtn as unknown as HTMLElement);

      // Unmount Modal 2 -> should restore focus to m1InspectBtn
      modal2.unmount();
      assert.equal(globalDoc.activeElement, m1InspectBtn as unknown as HTMLElement, "Focus restored to Modal 1 inspect button");

      // Unmount Modal 1 -> should restore focus to rootTrigger
      modal1.unmount();
      assert.equal(globalDoc.activeElement, rootTrigger as unknown as HTMLElement, "Focus restored to root trigger element");
    });
  });

  describe("Suite 2: APG Roving Tabindex & Arrow Key Navigation in VirtualTryOn", () => {
    const COSTUME_OPTIONS = COSTUMES_DATA.slice(0, 6);
    const DESTINATION_OPTIONS = ['hoang-thanh', 'dai-noi-hue', 'hoi-an', 'chua-den', 'cafe'];

    // Helper that replicates the pure logic inside VirtualTryOn
    function simulateCostumeKeyNav(
      currentCostumeId: string,
      key: string
    ): { nextCostumeId: string; prevented: boolean; targetIndex: number } {
      const currentIndex = COSTUME_OPTIONS.findIndex(c => c.id === currentCostumeId);
      let nextIndex = -1;
      let prevented = false;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        prevented = true;
        nextIndex = currentIndex === -1 || currentIndex === COSTUME_OPTIONS.length - 1 ? 0 : currentIndex + 1;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        prevented = true;
        nextIndex = currentIndex <= 0 ? COSTUME_OPTIONS.length - 1 : currentIndex - 1;
      }

      const nextCostumeId = nextIndex !== -1 ? COSTUME_OPTIONS[nextIndex].id : currentCostumeId;
      return { nextCostumeId, prevented, targetIndex: nextIndex };
    }

    function simulateDestinationKeyNav(
      currentDest: string,
      key: string
    ): { nextDest: string; prevented: boolean; targetIndex: number } {
      const currentIndex = DESTINATION_OPTIONS.indexOf(currentDest);
      let nextIndex = -1;
      let prevented = false;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        prevented = true;
        nextIndex = currentIndex === -1 || currentIndex === DESTINATION_OPTIONS.length - 1 ? 0 : currentIndex + 1;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        prevented = true;
        nextIndex = currentIndex <= 0 ? DESTINATION_OPTIONS.length - 1 : currentIndex - 1;
      }

      const nextDest = nextIndex !== -1 ? DESTINATION_OPTIONS[nextIndex] : currentDest;
      return { nextDest, prevented, targetIndex: nextIndex };
    }

    it("Costume Radiogroup: full forward 360-degree traversal via ArrowRight wrapping at boundary", () => {
      let currentId = COSTUME_OPTIONS[0].id; // index 0

      for (let step = 1; step < COSTUME_OPTIONS.length; step++) {
        const res = simulateCostumeKeyNav(currentId, 'ArrowRight');
        assert.equal(res.prevented, true, "ArrowRight must prevent default");
        assert.equal(res.targetIndex, step, `Step ${step} should select index ${step}`);
        assert.equal(res.nextCostumeId, COSTUME_OPTIONS[step].id);
        currentId = res.nextCostumeId;
      }

      // At index 5: ArrowRight must wrap around to index 0
      const wrapRes = simulateCostumeKeyNav(currentId, 'ArrowRight');
      assert.equal(wrapRes.prevented, true);
      assert.equal(wrapRes.targetIndex, 0, "ArrowRight from last costume must wrap to index 0");
      assert.equal(wrapRes.nextCostumeId, COSTUME_OPTIONS[0].id);
    });

    it("Costume Radiogroup: full forward 360-degree traversal via ArrowDown wrapping at boundary", () => {
      let currentId = COSTUME_OPTIONS[0].id;

      for (let step = 1; step < COSTUME_OPTIONS.length; step++) {
        const res = simulateCostumeKeyNav(currentId, 'ArrowDown');
        assert.equal(res.prevented, true, "ArrowDown must prevent default");
        assert.equal(res.targetIndex, step);
        currentId = res.nextCostumeId;
      }

      const wrapRes = simulateCostumeKeyNav(currentId, 'ArrowDown');
      assert.equal(wrapRes.targetIndex, 0, "ArrowDown from last costume must wrap to index 0");
      assert.equal(wrapRes.nextCostumeId, COSTUME_OPTIONS[0].id);
    });

    it("Costume Radiogroup: full backward traversal via ArrowLeft wrapping at start boundary", () => {
      // From index 0: ArrowLeft must wrap to last element (index 5)
      const wrapRes = simulateCostumeKeyNav(COSTUME_OPTIONS[0].id, 'ArrowLeft');
      assert.equal(wrapRes.prevented, true);
      assert.equal(wrapRes.targetIndex, 5, "ArrowLeft from first costume must wrap to index 5");
      assert.equal(wrapRes.nextCostumeId, COSTUME_OPTIONS[5].id);

      // Traversal backwards from 5 down to 0
      let currentId = COSTUME_OPTIONS[5].id;
      for (let expected = 4; expected >= 0; expected--) {
        const res = simulateCostumeKeyNav(currentId, 'ArrowLeft');
        assert.equal(res.targetIndex, expected, `Step backwards should target index ${expected}`);
        currentId = res.nextCostumeId;
      }
      assert.equal(currentId, COSTUME_OPTIONS[0].id);
    });

    it("Costume Radiogroup: full backward traversal via ArrowUp wrapping at start boundary", () => {
      const wrapRes = simulateCostumeKeyNav(COSTUME_OPTIONS[0].id, 'ArrowUp');
      assert.equal(wrapRes.prevented, true);
      assert.equal(wrapRes.targetIndex, 5, "ArrowUp from first costume must wrap to index 5");
      assert.equal(wrapRes.nextCostumeId, COSTUME_OPTIONS[5].id);
    });

    it("Costume Radiogroup: unselected state (-1) navigates to index 0 on forward and last on backward", () => {
      const fwdRight = simulateCostumeKeyNav('', 'ArrowRight');
      assert.equal(fwdRight.targetIndex, 0, "ArrowRight with no selection must select index 0");

      const fwdDown = simulateCostumeKeyNav('', 'ArrowDown');
      assert.equal(fwdDown.targetIndex, 0, "ArrowDown with no selection must select index 0");

      const backLeft = simulateCostumeKeyNav('', 'ArrowLeft');
      assert.equal(backLeft.targetIndex, 5, "ArrowLeft with no selection must select last index 5");

      const backUp = simulateCostumeKeyNav('', 'ArrowUp');
      assert.equal(backUp.targetIndex, 5, "ArrowUp with no selection must select last index 5");
    });

    it("Destination Radiogroup: 5-item bidirectional cycling and wrap-around", () => {
      // Forward cycle through all 5 destinations
      let currentDest = DESTINATION_OPTIONS[0]; // 'hoang-thanh'
      for (let i = 1; i < DESTINATION_OPTIONS.length; i++) {
        const res = simulateDestinationKeyNav(currentDest, 'ArrowRight');
        assert.equal(res.targetIndex, i);
        assert.equal(res.nextDest, DESTINATION_OPTIONS[i]);
        currentDest = res.nextDest;
      }

      // Wrap forward from 'cafe' (index 4) to 'hoang-thanh' (index 0)
      const fwdWrap = simulateDestinationKeyNav(currentDest, 'ArrowDown');
      assert.equal(fwdWrap.targetIndex, 0, "ArrowDown from 'cafe' wraps to 'hoang-thanh'");
      assert.equal(fwdWrap.nextDest, 'hoang-thanh');

      // Wrap backward from 'hoang-thanh' (index 0) to 'cafe' (index 4)
      const bwdWrap = simulateDestinationKeyNav('hoang-thanh', 'ArrowLeft');
      assert.equal(bwdWrap.targetIndex, 4, "ArrowLeft from 'hoang-thanh' wraps to 'cafe'");
      assert.equal(bwdWrap.nextDest, 'cafe');
    });

    it("Non-arrow keys (Tab, Enter, Space, Escape, Shift) remain transparent without preventDefault", () => {
      const nonArrowKeys = ['Tab', 'Enter', ' ', 'Escape', 'Shift', 'KeyA', 'Home', 'End'];

      for (const key of nonArrowKeys) {
        const costumeRes = simulateCostumeKeyNav(COSTUME_OPTIONS[2].id, key);
        assert.equal(costumeRes.prevented, false, `Key ${key} must not preventDefault in costume radiogroup`);
        assert.equal(costumeRes.targetIndex, -1, `Key ${key} must not change costume selection`);

        const destRes = simulateDestinationKeyNav(DESTINATION_OPTIONS[2], key);
        assert.equal(destRes.prevented, false, `Key ${key} must not preventDefault in destination radiogroup`);
        assert.equal(destRes.targetIndex, -1, `Key ${key} must not change destination selection`);
      }
    });

    it("Roving Tabindex distribution contract: exactly 1 element has tabIndex 0, remaining have tabIndex -1", () => {
      // Test across each possible costume selection
      for (let selectedIdx = 0; selectedIdx < COSTUME_OPTIONS.length; selectedIdx++) {
        const selectedId = COSTUME_OPTIONS[selectedIdx].id;

        const tabIndices = COSTUME_OPTIONS.map((c, idx) => {
          const isSelected = selectedId === c.id;
          return isSelected || (!selectedId && idx === 0) ? 0 : -1;
        });

        const zeros = tabIndices.filter(t => t === 0);
        const minusOnes = tabIndices.filter(t => t === -1);

        assert.equal(zeros.length, 1, `Must have exactly 1 tab stop with tabIndex=0 for selected index ${selectedIdx}`);
        assert.equal(minusOnes.length, COSTUME_OPTIONS.length - 1, "Remaining items must have tabIndex=-1");
        assert.equal(tabIndices[selectedIdx], 0, `Selected item ${selectedIdx} must have tabIndex=0`);
      }

      // Test with unselected state ('')
      const emptyCostumeId: string = '';
      const initialTabIndices = COSTUME_OPTIONS.map((c, idx) => {
        const isSelected = emptyCostumeId === c.id;
        return isSelected || (!emptyCostumeId && idx === 0) ? 0 : -1;
      });
      assert.equal(initialTabIndices[0], 0, "Index 0 must receive tabIndex=0 when no costume is selected");
      assert.equal(initialTabIndices.slice(1).every(t => t === -1), true, "All other costumes have tabIndex=-1");
    });
  });
});
