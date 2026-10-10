import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { CostumeCard, Costume } from '../src/features/museum/components/CostumeCard.tsx';
import { Navbar } from '../src/shared/components/Navbar.tsx';
import { COSTUMES_DATA } from '../src/shared/data/costumes.ts';

// React 19 Dispatcher Simulator for shallow component execution in Node test runner
const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

function setupMockDispatcher() {
  internals.H = {
    useState: (initial: any) => [typeof initial === 'function' ? initial() : initial, () => {}],
    useRef: (initial: any) => ({ current: initial }),
    useCallback: (fn: any) => fn,
    useMemo: (fn: any) => fn(),
    useEffect: () => {},
    useLayoutEffect: () => {},
    useId: () => 'mock-id'
  };
}

function teardownMockDispatcher() {
  if (internals) {
    internals.H = null;
  }
}

describe('Challenger M1 DOM Structure & ARIA Oracle', () => {
  const sampleCostume: Costume = COSTUMES_DATA[0];

  beforeEach(() => {
    setupMockDispatcher();
  });

  afterEach(() => {
    teardownMockDispatcher();
  });

  describe('Adversarial Challenge 1: CostumeCard DOM Structure & Interactive Descendants', () => {
    it('verifies CostumeCard renders root as <article> with zero button role or tabIndex', () => {
      let modalIdOpened = '';
      let photoUrlOpened = '';

      const element: any = CostumeCard({
        costume: sampleCostume,
        globalMode: 'real',
        lang: 'vi',
        onOpenModal: (id) => { modalIdOpened = id; },
        onOpenLightbox: (url) => { photoUrlOpened = url; }
      });

      // 1. Root must be 'article'
      assert.equal(element.type, 'article', 'Root tag must be semantic <article>');

      // 2. Root props must NOT claim button semantics
      assert.equal(element.props.role, undefined, 'Root article must NOT declare role="button"');
      assert.equal(element.props.tabIndex, undefined, 'Root article must NOT declare tabIndex (no keyboard tab stop on container)');
      assert.equal(element.props.onKeyDown, undefined, 'Root article must NOT attach keyboard button handler');
      assert.equal(typeof element.props.onClick, 'function', 'Root article retains mouse click for convenience');

      // 3. Test root click invokes onOpenModal
      element.props.onClick();
      assert.equal(modalIdOpened, sampleCostume.id, 'Clicking article container triggers onOpenModal');
    });

    it('empirically verifies absence of nested interactive elements (button inside button)', () => {
      // Traverse the React element tree looking for interactive ancestors
      function scanForInteractiveNesting(node: any, interactiveAncestors: string[] = []): string[] {
        const violations: string[] = [];
        if (!node || typeof node !== 'object') return violations;

        const isInteractive = (tag: string, props: any = {}) => {
          if (typeof tag !== 'string') return false;
          if (tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'a') return true;
          if (props?.role === 'button' || props?.role === 'link' || props?.role === 'slider' || props?.role === 'radio') return true;
          return false;
        };

        const currentTag = typeof node.type === 'string' ? node.type : '';
        const currentIsInteractive = isInteractive(currentTag, node.props);

        if (currentIsInteractive && interactiveAncestors.length > 0) {
          violations.push(
            `Violation: Interactive <${currentTag}> nested inside interactive <${interactiveAncestors.join(' > ')}>`
          );
        }

        const newAncestors = currentIsInteractive 
          ? [...interactiveAncestors, currentTag || node.props?.role] 
          : interactiveAncestors;

        if (node.props?.children) {
          const children = React.Children.toArray(node.props.children);
          for (const child of children) {
            violations.push(...scanForInteractiveNesting(child, newAncestors));
          }
        }

        return violations;
      }

      // Check across all 3 view modes: 'real', 'split', 'svg'
      const modes: Array<'real' | 'split' | 'svg'> = ['real', 'split', 'svg'];
      for (const mode of modes) {
        const tree: any = CostumeCard({
          costume: sampleCostume,
          globalMode: mode,
          lang: 'vi',
          onOpenModal: () => {},
          onOpenLightbox: () => {}
        });

        const nestingViolations = scanForInteractiveNesting(tree);
        assert.deepEqual(
          nestingViolations,
          [],
          `CostumeCard in mode '${mode}' must have ZERO nested interactive elements. Found: ${nestingViolations.join(', ')}`
        );
      }
    });

    it('verifies bottom CTA is a dedicated, fully accessible <button> with bilingual aria-label and event stopPropagation', () => {
      let modalOpenedId = '';
      let stopPropagationCalled = false;

      const tree: any = CostumeCard({
        costume: sampleCostume,
        globalMode: 'real',
        lang: 'vi',
        onOpenModal: (id) => { modalOpenedId = id; },
        onOpenLightbox: () => {}
      });

      // Find bottom CTA button: children[2] is the bottom container
      const bottomContainer = tree.props.children[2];
      assert.equal(bottomContainer.type, 'div');

      const ctaButton = bottomContainer.props.children;
      assert.equal(ctaButton.type, 'button');
      assert.equal(ctaButton.props.type, 'button');
      assert.ok(ctaButton.props['aria-label'].includes(sampleCostume.nameVi), 'CTA aria-label must include Vietnamese costume name');

      // Test click event propagation stop
      const mockEvent = {
        stopPropagation: () => { stopPropagationCalled = true; }
      };
      ctaButton.props.onClick(mockEvent);

      assert.ok(stopPropagationCalled, 'CTA click handler must call e.stopPropagation()');
      assert.equal(modalOpenedId, sampleCostume.id, 'CTA click handler must invoke onOpenModal with costume ID');

      // Test English version
      const enTree: any = CostumeCard({
        costume: sampleCostume,
        globalMode: 'real',
        lang: 'en',
        onOpenModal: () => {},
        onOpenLightbox: () => {}
      });
      const enCtaButton = enTree.props.children[2].props.children;
      assert.ok(enCtaButton.props['aria-label'].includes(sampleCostume.nameEn), 'CTA aria-label must include English costume name');
    });

    it('verifies inner view mode buttons possess valid aria-pressed attributes', () => {
      const cardPath = path.resolve(process.cwd(), 'src/features/museum/components/CostumeCard.tsx');
      const content = fs.readFileSync(cardPath, 'utf-8');

      // Verify aria-pressed on all three mode toggle buttons
      assert.ok(content.includes("aria-pressed={localMode === 'svg'}"), 'Vector mode button has aria-pressed');
      assert.ok(content.includes("aria-pressed={localMode === 'split'}"), 'Split mode button has aria-pressed');
      assert.ok(content.includes("aria-pressed={localMode === 'real'}"), 'Real mode button has aria-pressed');
    });

    it('verifies split range slider has accessible label and ARIA value attributes', () => {
      const cardPath = path.resolve(process.cwd(), 'src/features/museum/components/CostumeCard.tsx');
      const content = fs.readFileSync(cardPath, 'utf-8');

      // Slider accessibility attributes
      assert.ok(content.includes('type="range"'), 'Range input exists');
      assert.ok(content.includes('aria-valuemin={0}'), 'aria-valuemin declared');
      assert.ok(content.includes('aria-valuemax={100}'), 'aria-valuemax declared');
      assert.ok(content.includes('aria-valuenow={splitPos}'), 'aria-valuenow declared');
      assert.ok(content.includes('aria-valuetext={`${splitPos}%`}'), 'aria-valuetext declared');
      assert.ok(content.includes('aria-label='), 'aria-label declared on slider');
    });
  });

  describe('Adversarial Challenge 2: Navbar aria-current Semantics', () => {
    function findNodeById(node: any, id: string): any {
      if (!node || typeof node !== 'object') return null;
      if (node.props?.id === id) return node;
      if (node.props?.children) {
        const children = React.Children.toArray(node.props.children);
        for (const child of children) {
          const found = findNodeById(child, id);
          if (found) return found;
        }
      }
      return null;
    }

    it('empirically evaluates aria-current="page" on desktop and mobile tabs when Hub 1 is active', () => {
      const hub1Tree: any = Navbar({
        lang: 'vi',
        onToggleLang: () => {},
        activeHub: 'hub1',
        onSelectHub: () => {},
        onOpenWardrobe: () => {}
      });

      const navTabHub1 = findNodeById(hub1Tree, 'navTabHub1');
      const navTabHub2 = findNodeById(hub1Tree, 'navTabHub2');
      const mobTabHub1 = findNodeById(hub1Tree, 'mobTabHub1');
      const mobTabHub2 = findNodeById(hub1Tree, 'mobTabHub2');

      assert.ok(navTabHub1, 'Desktop Tab Hub 1 must be present');
      assert.ok(navTabHub2, 'Desktop Tab Hub 2 must be present');
      assert.ok(mobTabHub1, 'Mobile Tab Hub 1 must be present');
      assert.ok(mobTabHub2, 'Mobile Tab Hub 2 must be present');

      // Hub 1 active assertions
      assert.equal(navTabHub1.props['aria-current'], 'page', 'Desktop Hub 1 must expose aria-current="page" when active');
      assert.equal(navTabHub2.props['aria-current'], undefined, 'Desktop Hub 2 must omit aria-current when inactive');
      assert.equal(mobTabHub1.props['aria-current'], 'page', 'Mobile Hub 1 must expose aria-current="page" when active');
      assert.equal(mobTabHub2.props['aria-current'], undefined, 'Mobile Hub 2 must omit aria-current when inactive');
    });

    it('empirically evaluates aria-current="page" on desktop and mobile tabs when Hub 2 is active', () => {
      const hub2Tree: any = Navbar({
        lang: 'vi',
        onToggleLang: () => {},
        activeHub: 'hub2',
        onSelectHub: () => {},
        onOpenWardrobe: () => {}
      });

      const navTabHub1 = findNodeById(hub2Tree, 'navTabHub1');
      const navTabHub2 = findNodeById(hub2Tree, 'navTabHub2');
      const mobTabHub1 = findNodeById(hub2Tree, 'mobTabHub1');
      const mobTabHub2 = findNodeById(hub2Tree, 'mobTabHub2');

      assert.equal(navTabHub1.props['aria-current'], undefined, 'Desktop Hub 1 must omit aria-current when inactive');
      assert.equal(navTabHub2.props['aria-current'], 'page', 'Desktop Hub 2 must expose aria-current="page" when active');
      assert.equal(mobTabHub1.props['aria-current'], undefined, 'Mobile Hub 1 must omit aria-current when inactive');
      assert.equal(mobTabHub2.props['aria-current'], 'page', 'Mobile Hub 2 must expose aria-current="page" when active');
    });

    it('verifies all auxiliary controls in Navbar have accessible names in both vi and en', () => {
      const navLangs: Array<'vi' | 'en'> = ['vi', 'en'];
      for (const lang of navLangs) {
        const tree: any = Navbar({
          lang,
          onToggleLang: () => {},
          activeHub: 'hub1',
          onSelectHub: () => {},
          onOpenWardrobe: () => {}
        });

        const logoBtn = findNodeById(tree, 'navLogo');
        const audioBtn = findNodeById(tree, 'audioToggleBtn');
        const wardrobeBtn = findNodeById(tree, 'openWardrobeBtn');
        const langBtn = findNodeById(tree, 'langToggleBtn');
        const authBtn = findNodeById(tree, 'authBtn');

        assert.ok(logoBtn?.props['aria-label'], `Logo must have aria-label in ${lang}`);
        assert.ok(audioBtn?.props['aria-label'], `Audio button must have aria-label in ${lang}`);
        assert.ok(wardrobeBtn?.props['aria-label'], `Wardrobe button must have aria-label in ${lang}`);
        assert.ok(langBtn?.props['aria-label'], `Lang button must have aria-label in ${lang}`);
        assert.ok(authBtn?.props['aria-label'], `Auth button must have aria-label in ${lang}`);
      }
    });
  });

  describe('Adversarial Challenge 3: Strict Static AST / Regex Inspection across Codebase', () => {
    it('verifies zero occurrences of invalid nested interactive markup in TSX files', () => {
      const srcDir = path.resolve(process.cwd(), 'src');
      function getTsxFiles(dir: string): string[] {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        const files: string[] = [];
        for (const entry of entries) {
          const res = path.resolve(dir, entry.name);
          if (entry.isDirectory()) {
            files.push(...getTsxFiles(res));
          } else if (entry.name.endsWith('.tsx')) {
            files.push(res);
          }
        }
        return files;
      }

      const tsxFiles = getTsxFiles(srcDir);
      for (const file of tsxFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        // Check for role="button" containing <button
        const roleButtonPattern = /role=["']button["'][^>]*>[\s\S]*?<button/g;

        assert.ok(
          !roleButtonPattern.test(content),
          `File ${path.basename(file)} must NOT contain <button> inside an element with role="button"`
        );
      }
    });
  });
});
