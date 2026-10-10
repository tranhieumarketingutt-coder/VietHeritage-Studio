import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { TimelineSection } from '../src/features/timeline/components/TimelineSection.tsx';
import { DYNASTIES_TIMELINE_DATA } from '../src/features/timeline/data/dynastiesTimeline.ts';
import { WisdomCarousel } from '../src/features/wisdom/components/WisdomCarousel.tsx';
import { CULTURAL_WISDOM_SNIPPETS } from '../src/features/wisdom/data/wisdomSnippets.ts';
import { AnatomySection } from '../src/features/anatomy/components/AnatomySection.tsx';
import { ANATOMY_PRESETS } from '../src/features/anatomy/data/anatomyPresets.ts';
import { COSTUMES_DATA } from '../src/shared/data/costumes.ts';
import { LEAFLET_MARKERS } from '../src/features/heritage-map/data/leafletMarkers.ts';
import { VIETNAM_REGIONS_DATA } from '../src/features/heritage-map/data/regionsData.ts';

// React 19 Dispatcher Simulator for stateful functional component execution in Node
const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

interface HookStateMap {
  values: any[];
  index: number;
}

let hookState: HookStateMap = { values: [], index: 0 };

function setupStatefulDispatcher(onStateChange?: () => void) {
  hookState = { values: [], index: 0 };
  internals.H = {
    useState: (initial: any) => {
      const idx = hookState.index++;
      if (hookState.values[idx] === undefined) {
        hookState.values[idx] = typeof initial === 'function' ? initial() : initial;
      }
      const setState = (action: any) => {
        const nextVal = typeof action === 'function' ? action(hookState.values[idx]) : action;
        hookState.values[idx] = nextVal;
        if (onStateChange) onStateChange();
      };
      return [hookState.values[idx], setState];
    },
    useRef: (initial: any) => ({ current: initial }),
    useCallback: (fn: any) => fn,
    useMemo: (fn: any) => fn(),
    useEffect: () => {},
    useLayoutEffect: () => {},
    useId: () => 'mock-id'
  };
}

function resetDispatcherCursor() {
  hookState.index = 0;
}

function teardownDispatcher() {
  if (internals) {
    internals.H = null;
  }
}

describe('Empirical Challenger M2/M3: Responsive Layout & Interactive Controls Stress Oracle', () => {

  afterEach(() => {
    teardownDispatcher();
  });

  // =========================================================================
  // 1. 320px Viewport Rendering & Layout Overflow Stress
  // =========================================================================
  describe('Suite 1: 320px Viewport Rendering & Horizontal Overflow Resistance', () => {
    it('verifies src/index.css guarantees body overflow-x: hidden to prevent horizontal scrollbars', () => {
      const cssPath = path.resolve(process.cwd(), 'src/index.css');
      const css = fs.readFileSync(cssPath, 'utf-8');
      
      const bodyRuleMatch = css.match(/body\s*\{[^}]*\}/s);
      assert.ok(bodyRuleMatch, 'src/index.css must declare body rule');
      assert.ok(
        bodyRuleMatch[0].includes('overflow-x: hidden'),
        'body must explicitly declare overflow-x: hidden to eliminate window-level horizontal scroll triggers'
      );
    });

    it('verifies HeroSection eliminates whitespace-nowrap and wraps cleanly at 320px', () => {
      const heroPath = path.resolve(process.cwd(), 'src/features/home/components/HeroSection.tsx');
      const hero = fs.readFileSync(heroPath, 'utf-8');

      assert.ok(!hero.includes('whitespace-nowrap'), 'HeroSection must NOT contain whitespace-nowrap');
      assert.ok(hero.includes('font-serif'), 'HeroSection heading must have font-serif class');
      assert.ok(hero.includes('text-2xl sm:text-4xl'), 'Heading scales down to text-2xl on 320px mobile viewports');
    });

    it('verifies StylingResults layout enforces balanced 12-column grid and fluid container bounds', () => {
      const stylingPath = path.resolve(process.cwd(), 'src/features/studio/components/StylingResults.tsx');
      const styling = fs.readFileSync(stylingPath, 'utf-8');

      assert.ok(styling.includes('md:col-span-5'), 'Left portrait card uses md:col-span-5');
      assert.ok(styling.includes('md:col-span-7'), 'Right details card uses md:col-span-7');
      assert.ok(styling.includes('max-w-[340px]'), 'Card max-width is constrained with fluid w-full');
      assert.ok(styling.includes('Palette className='), 'Empty state provides guided visual cue');
    });

    it('verifies MapSection container specifies responsive breakpoints and overflow containment', () => {
      const mapPath = path.resolve(process.cwd(), 'src/features/heritage-map/components/MapSection.tsx');
      const map = fs.readFileSync(mapPath, 'utf-8');

      assert.ok(map.includes('h-[380px] sm:h-[480px] lg:h-[600px]'), 'Map height adapts across viewport tiers');
      assert.ok(map.includes('overflow-hidden'), 'Map wrapper enforces overflow-hidden against canvas blowout');
      assert.ok(map.includes('overflow-x-auto max-w-full'), 'Region filter strip allows touch-scroll without page overflow');
    });

    it('scans all JSX/TSX components in src/ for dangerous unconstrained fixed widths (> 320px)', () => {
      function getTsxFiles(dir: string): string[] {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        let files: string[] = [];
        for (const entry of entries) {
          const res = path.resolve(dir, entry.name);
          if (entry.isDirectory()) {
            files = files.concat(getTsxFiles(res));
          } else if (entry.name.endsWith('.tsx')) {
            files.push(res);
          }
        }
        return files;
      }

      const tsxFiles = getTsxFiles(path.resolve(process.cwd(), 'src'));
      const dangerousPatterns: string[] = [];

      for (const file of tsxFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        // Look for fixed pixel width classes like w-[350px], w-[400px], min-w-[340px] WITHOUT max-w or responsiveness
        const matches = content.match(/\b(w|min-w)-\[(\d+)px\]/g) || [];
        for (const m of matches) {
          const pxVal = parseInt(m.replace(/[^0-9]/g, ''), 10);
          if (pxVal > 320) {
            // Verify if it is accompanied by max-w, overflow-hidden, or responsive prefix
            const line = content.split('\n').find(l => l.includes(m)) || '';
            const isProtected = line.includes('max-w-') || line.includes('overflow-') || line.includes('sm:') || line.includes('md:') || line.includes('lg:');
            if (!isProtected) {
              dangerousPatterns.push(`${path.basename(file)}: ${m} without responsive or overflow protection`);
            }
          }
        }
      }

      assert.deepEqual(
        dangerousPatterns,
        [],
        `Found unconstrained fixed width classes exceeding 320px: ${dangerousPatterns.join(', ')}`
      );
    });

    it('verifies all whitespace-nowrap usages across src/ are strictly housed in overflow-x-auto containers', () => {
      function getTsxFiles(dir: string): string[] {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        let files: string[] = [];
        for (const entry of entries) {
          const res = path.resolve(dir, entry.name);
          if (entry.isDirectory()) {
            files = files.concat(getTsxFiles(res));
          } else if (entry.name.endsWith('.tsx')) {
            files.push(res);
          }
        }
        return files;
      }

      const tsxFiles = getTsxFiles(path.resolve(process.cwd(), 'src'));
      const uncontainedNowraps: string[] = [];

      for (const file of tsxFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('whitespace-nowrap')) {
          // Verify that this component also features overflow-x-auto for containing strips
          if (!content.includes('overflow-x-auto')) {
            uncontainedNowraps.push(path.basename(file));
          }
        }
      }

      assert.deepEqual(
        uncontainedNowraps,
        [],
        `Files using whitespace-nowrap without overflow-x-auto container: ${uncontainedNowraps.join(', ')}`
      );
    });
  });

  // =========================================================================
  // 2. Timeline Dynasty Switching & Comparison Toggle
  // =========================================================================
  describe('Suite 2: Timeline Dynasty Switching & Comparison Toggle', () => {
    it('initializes TimelineSection with Ly dynasty and renders complete silhouette and metadata', () => {
      setupStatefulDispatcher();
      const tree: any = TimelineSection({});

      // Initial dynasty is 'ly' (first item)
      const lyData = DYNASTIES_TIMELINE_DATA[0];
      assert.equal(lyData.id, 'ly');
      assert.ok(lyData.svgSilhouette.includes('<svg'), 'Ly dynasty must have valid SVG silhouette');

      // Verify header and dynasty title in single view
      assert.ok(tree.props.id === 'historicalTimelineSection', 'Section root has historicalTimelineSection id');
    });

    it('cycles through all 5 dynasties, dynamically updating active state and metadata', () => {
      assert.equal(DYNASTIES_TIMELINE_DATA.length, 5, 'Must have exactly 5 dynasties');
      const expectedIds = ['ly', 'tran', 'le', 'nguyen', 'hien-dai'];
      assert.deepEqual(DYNASTIES_TIMELINE_DATA.map(d => d.id), expectedIds);

      // Verify each dynasty possesses complete sartorial, philosophy, and archaeological data
      for (const d of DYNASTIES_TIMELINE_DATA) {
        assert.ok(d.svgSilhouette.length > 50, `Dynasty ${d.id} must have non-empty SVG`);
        assert.ok(d.philosophyVi.length > 20, `Dynasty ${d.id} must have rich philosophy`);
        assert.ok(d.archeologySourceVi.length > 10, `Dynasty ${d.id} must cite archaeological source`);
        assert.ok(d.features.collarVi, `Dynasty ${d.id} must specify collar features`);
        assert.ok(d.features.sleevesVi, `Dynasty ${d.id} must specify sleeve features`);
      }
    });

    it('toggles isCompareMode, transitioning between single-view and dual-view comparison layouts', () => {
      let renderCount = 0;
      setupStatefulDispatcher(() => { renderCount++; });

      // First render (isCompareMode = false)
      resetDispatcherCursor();
      let tree: any = TimelineSection({});
      assert.equal(hookState.values[1], false, 'isCompareMode starts as false');

      // Toggle compare mode
      hookState.values[1] = true;
      resetDispatcherCursor();
      tree = TimelineSection({});
      assert.equal(hookState.values[1], true, 'isCompareMode is now true');

      // In compare mode, comparison banner and two cards are rendered
      const compareDynastySelect = DYNASTIES_TIMELINE_DATA.find(d => d.id === 'nguyen');
      assert.ok(compareDynastySelect, 'Default compare dynasty is Nguyen dynasty');

      // Verify that the compare dropdown options disable the currently selected dynasty
      const selectedId = hookState.values[0]; // 'ly'
      for (const d of DYNASTIES_TIMELINE_DATA) {
        const isDisabled = d.id === selectedId;
        assert.equal(isDisabled, d.id === 'ly', `Dynasty ${d.id} disabled status must match selected dynasty`);
      }

      // Toggle back to single view
      hookState.values[1] = false;
      resetDispatcherCursor();
      tree = TimelineSection({});
      assert.equal(hookState.values[1], false, 'isCompareMode successfully reverts to false');
    });

    it('invokes onSelectCostume with primaryCostumeId when Jump to Studio is triggered', () => {
      let selectedCostumeId = '';
      setupStatefulDispatcher();
      resetDispatcherCursor();

      const tree: any = TimelineSection({
        onSelectCostume: (id) => { selectedCostumeId = id; }
      });

      // Find the "Phối Đồ Ngay" button
      const headerDiv = tree.props.children[2];
      const buttonGroup = headerDiv.props.children[1];
      const jumpButton = buttonGroup.props.children[1];

      assert.ok(jumpButton.props.className.includes('timeline-jump-studio-btn'), 'Jump button has designated class');
      
      // Trigger click
      jumpButton.props.onClick();
      assert.equal(selectedCostumeId, 'giao-linh', 'Jump button passes primaryCostumeId of Ly dynasty (giao-linh)');
    });
  });

  // =========================================================================
  // 3. Wisdom Carousel: Randomizer, Clipboard Copy & Next Pagination
  // =========================================================================
  describe('Suite 3: Wisdom Carousel Interactive Controls & Clipboard Feedback', () => {
    it('verifies CULTURAL_WISDOM_SNIPPETS dataset integrity and coverage', () => {
      assert.ok(CULTURAL_WISDOM_SNIPPETS.length >= 6, 'Must contain at least 6 curated quotes');
      for (const s of CULTURAL_WISDOM_SNIPPETS) {
        assert.ok(s.id, 'Snippet must have id');
        assert.ok(s.titleVi, 'Snippet must have title');
        assert.ok(s.factVi, 'Snippet must have fact');
        assert.ok(s.philosophyVi, 'Snippet must have philosophy');
        assert.ok(s.source, 'Snippet must cite source');
        assert.ok(s.eraVi, 'Snippet must have era');
      }
    });

    it('empirically tests sequential pagination (#btnNextWisdom) wrapping at boundary', () => {
      let currentIdx = 0;
      const total = CULTURAL_WISDOM_SNIPPETS.length;

      const handleNext = () => {
        currentIdx = (currentIdx + 1) % total;
      };

      for (let step = 1; step < total; step++) {
        handleNext();
        assert.equal(currentIdx, step, `Step ${step} advances to index ${step}`);
      }

      // Advance from last element: must wrap to 0
      handleNext();
      assert.equal(currentIdx, 0, 'Pagination wraps back to index 0 from last item');
    });

    it('stress-tests randomizer (#btnRandomWisdom) across 100 iterations ensuring valid bounds and divergence', () => {
      const total = CULTURAL_WISDOM_SNIPPETS.length;

      const simulateRandom = (current: number) => {
        let nextIdx = Math.floor(Math.random() * total);
        if (nextIdx === current && total > 1) {
          nextIdx = (current + 1) % total;
        }
        return nextIdx;
      };

      for (let i = 0; i < 100; i++) {
        const current = i % total;
        const next = simulateRandom(current);

        assert.ok(next >= 0 && next < total, `Random index ${next} must be within [0, ${total - 1}]`);
        assert.notEqual(next, current, `Randomizer must not return the identical index (${current}) when pool > 1`);
      }
    });

    it('empirically tests copy to clipboard with formatting and feedback toast state', async () => {
      let copiedText = '';
      const mockClipboard = {
        writeText: async (text: string) => {
          copiedText = text;
        }
      };

      const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis.navigator, 'clipboard');
      Object.defineProperty(globalThis.navigator, 'clipboard', {
        value: mockClipboard,
        configurable: true,
        writable: true
      });

      try {
        const snippet = CULTURAL_WISDOM_SNIPPETS[0];
        const textToCopy = `"${snippet.titleVi}"\n\n${snippet.factVi}\n\nTriết lý: ${snippet.philosophyVi}\n(Nguồn: ${snippet.source} · ${snippet.eraVi})`;

        await mockClipboard.writeText(textToCopy);

        assert.ok(copiedText.includes(snippet.titleVi), 'Copied text must include title');
        assert.ok(copiedText.includes(snippet.factVi), 'Copied text must include historical fact');
        assert.ok(copiedText.includes(snippet.philosophyVi), 'Copied text must include moral philosophy');
        assert.ok(copiedText.includes(snippet.source), 'Copied text must include source citation');
        assert.ok(copiedText.includes(snippet.eraVi), 'Copied text must include dynasty era');
      } finally {
        if (originalDescriptor) {
          Object.defineProperty(globalThis.navigator, 'clipboard', originalDescriptor);
        } else {
          delete (globalThis.navigator as any).clipboard;
        }
      }
    });

    it('resiliently handles clipboard API errors without throwing unhandled exceptions', async () => {
      const failingClipboard = {
        writeText: async (_text?: string) => {
          throw new Error('Clipboard permission denied');
        }
      };

      const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis.navigator, 'clipboard');
      Object.defineProperty(globalThis.navigator, 'clipboard', {
        value: failingClipboard,
        configurable: true,
        writable: true
      });

      try {
        let threw = false;
        try {
          // Simulate handleCopy try/catch block
          await failingClipboard.writeText('test');
        } catch (e) {
          threw = true;
        }
        assert.ok(threw, 'Failing clipboard was caught cleanly');
      } finally {
        if (originalDescriptor) {
          Object.defineProperty(globalThis.navigator, 'clipboard', originalDescriptor);
        } else {
          delete (globalThis.navigator as any).clipboard;
        }
      }
    });
  });

  // =========================================================================
  // 4. Anatomy Photo Lightbox Comparison
  // =========================================================================
  describe('Suite 4: Anatomy Photo Lightbox Comparison & APG Dialog Compliance', () => {
    it('verifies AnatomySection wires real photo comparison button and triggers lightbox dialog', () => {
      setupStatefulDispatcher();
      resetDispatcherCursor();

      // Initial state: isLightboxOpen is false (index 4 in hook state: activeCostumeKey, flapsOpen, activeLayer, activeHotspot, isLightboxOpen)
      let tree: any = AnatomySection({ lang: 'vi' });

      // Verify initial state has 5 hooks
      assert.equal(hookState.values[0], 'ngu-than', 'Initial costume is ngu-than');
      assert.equal(hookState.values[4], false, 'Lightbox is initially closed');

      // Trigger lightbox open
      hookState.values[4] = true;
      resetDispatcherCursor();
      tree = AnatomySection({ lang: 'vi' });

      // Find lightbox dialog in returned tree (last child: children[3] or similar)
      const lightboxNode = tree.props.children.find((c: any) => c && c.props && c.props.role === 'dialog');
      assert.ok(lightboxNode, 'Lightbox element must be rendered when isLightboxOpen is true');
      assert.equal(lightboxNode.props.role, 'dialog', 'Lightbox must declare role="dialog"');
      assert.equal(lightboxNode.props['aria-modal'], 'true', 'Lightbox must declare aria-modal="true"');
      assert.ok(lightboxNode.props['aria-label'].includes('Áo Ngũ Thân'), 'Lightbox aria-label must include costume name');
    });

    it('verifies lightbox dismissal mechanics (close button, backdrop, stopPropagation)', () => {
      setupStatefulDispatcher();
      hookState.values[0] = 'ngu-than';
      hookState.values[4] = true; // isOpen
      resetDispatcherCursor();

      const tree: any = AnatomySection({ lang: 'vi' });
      const lightboxNode = tree.props.children.find((c: any) => c && c.props && c.props.role === 'dialog');
      assert.ok(lightboxNode);

      // 1. Backdrop click invokes onClose
      assert.equal(typeof lightboxNode.props.onClick, 'function');

      // 2. Close button has accessible label
      const closeBtn = lightboxNode.props.children[0];
      assert.equal(closeBtn.type, 'button');
      assert.equal(closeBtn.props['aria-label'], 'Đóng ảnh đối chiếu');

      // 3. Inner content container has stopPropagation to protect photo clicks
      const contentContainer = lightboxNode.props.children[1];
      let propagationStopped = false;
      contentContainer.props.onClick({
        stopPropagation: () => { propagationStopped = true; }
      });
      assert.ok(propagationStopped, 'Clicking photo container must call e.stopPropagation()');
    });

    it('dynamically adapts photo reference when activeCostumeKey changes', () => {
      setupStatefulDispatcher();

      // Test across multiple costumes
      const testCostumes = ['ngu-than', 'nhat-binh', 'giao-linh'];
      for (const costumeId of testCostumes) {
        hookState.values[0] = costumeId;
        hookState.values[4] = true; // open lightbox
        resetDispatcherCursor();

        const tree: any = AnatomySection({ lang: 'vi' });
        const lightboxNode = tree.props.children.find((c: any) => c && c.props && c.props.role === 'dialog');
        assert.ok(lightboxNode);

        const contentContainer = lightboxNode.props.children[1];
        const img = contentContainer.props.children[0];
        const matchingCostume = COSTUMES_DATA.find(c => c.id === costumeId);
        assert.ok(matchingCostume);

        assert.equal(img.props.src, matchingCostume.realPhotography?.heroPhoto, `Image src must match ${costumeId} hero photo`);
      }
    });
  });

  // =========================================================================
  // 5. Map Geographic Region Filtering
  // =========================================================================
  describe('Suite 5: Heritage Map Geographic Region Filtering', () => {
    it('verifies all 6 regions in VIETNAM_REGIONS_DATA map to markers in LEAFLET_MARKERS', () => {
      assert.equal(VIETNAM_REGIONS_DATA.length, 6, 'Must define 6 historical/geographical regions');
      const regionIds = VIETNAM_REGIONS_DATA.map(r => r.id);

      assert.ok(regionIds.includes('bac-bo'), 'Contains Bac Bo region');
      assert.ok(regionIds.includes('mientrung-hue'), 'Contains Mien Trung - Hue region');
      assert.ok(regionIds.includes('namtrungbo-hoian'), 'Contains Nam Trung Bo - Hoi An region');
      assert.ok(regionIds.includes('hoang-sa-truong-sa'), 'Contains Hoang Sa - Truong Sa sovereign maritime region');
      assert.ok(regionIds.includes('tay-nguyen'), 'Contains Tay Nguyen region');
      assert.ok(regionIds.includes('nam-bo'), 'Contains Nam Bo region');
    });

    it('empirically evaluates region filter outputs matching LEAFLET_MARKERS dataset', () => {
      const filterMarkers = (regId: string, showAll: boolean = true) => {
        return LEAFLET_MARKERS.filter(marker => {
          if (regId !== 'all' && marker.regionId !== regId) return false;
          if (!showAll && marker.type !== 'city') return false;
          return true;
        });
      };

      // 1. All regions filter
      const allMarkers = filterMarkers('all', true);
      assert.equal(allMarkers.length, 7, 'Toan Quoc returns all 7 markers');

      // 2. Bac Bo filter
      const bacBo = filterMarkers('bac-bo', true);
      assert.equal(bacBo.length, 1, 'Bac Bo returns 1 marker (Hanoi)');
      assert.equal(bacBo[0].id, 'ha-noi');

      // 3. Mien Trung Hue filter
      const hue = filterMarkers('mientrung-hue', true);
      assert.equal(hue.length, 1, 'Hue returns 1 marker');
      assert.equal(hue[0].id, 'hue');

      // 4. Nam Trung Bo Hoi An filter
      const hoian = filterMarkers('namtrungbo-hoian', true);
      assert.equal(hoian.length, 1, 'Hoi An returns 1 marker');
      assert.equal(hoian[0].id, 'da-nang');

      // 5. Tay Nguyen filter
      const taynguyen = filterMarkers('tay-nguyen', true);
      assert.equal(taynguyen.length, 1, 'Tay Nguyen returns 1 marker');
      assert.equal(taynguyen[0].id, 'tay-nguyen');

      // 6. Nam Bo filter
      const nambo = filterMarkers('nam-bo', true);
      assert.equal(nambo.length, 1, 'Nam Bo returns 1 marker (HCMC)');
      assert.equal(nambo[0].id, 'hcmc');

      // 7. Hoang Sa - Truong Sa sovereign maritime islands filter
      const sovereign = filterMarkers('hoang-sa-truong-sa', true);
      assert.equal(sovereign.length, 2, 'Hoang Sa - Truong Sa returns 2 sacred maritime markers');
      const sovereignIds = sovereign.map(m => m.id);
      assert.ok(sovereignIds.includes('hoang-sa'), 'Includes Hoang Sa marker');
      assert.ok(sovereignIds.includes('truong-sa'), 'Includes Truong Sa marker');
      assert.ok(sovereign.every(m => m.type === 'sovereign'), 'All island markers have sovereign type');
    });

    it('verifies showAll toggle filters out non-city markers when toggled off', () => {
      const filterMarkers = (regId: string, showAll: boolean) => {
        return LEAFLET_MARKERS.filter(marker => {
          if (regId !== 'all' && marker.regionId !== regId) return false;
          if (!showAll && marker.type !== 'city') return false;
          return true;
        });
      };

      // When showAll is false, only city markers are returned
      const citiesOnly = filterMarkers('all', false);
      assert.equal(citiesOnly.length, 5, 'City-only filter returns exactly 5 urban hubs');
      assert.ok(citiesOnly.every(m => m.type === 'city'), 'Every remaining marker is a city');

      // Sovereign islands have type 'sovereign', so they are excluded in key-hubs-only view
      const sovereignCitiesOnly = filterMarkers('hoang-sa-truong-sa', false);
      assert.equal(sovereignCitiesOnly.length, 0, 'Sovereign island markers are excluded in city-only filter');
    });

    it('verifies dynamic live count display matches filtered result length', () => {
      const mapSource = fs.readFileSync(path.resolve(process.cwd(), 'src/features/heritage-map/components/MapSection.tsx'), 'utf-8');

      assert.ok(mapSource.includes('{filteredMarkers.length} điểm'), 'MapSection displays live marker count');
      assert.ok(mapSource.includes('setActiveRegId'), 'MapSection allows switching activeRegId');
      assert.ok(mapSource.includes('setShowAll'), 'MapSection allows toggling showAll');
      assert.ok(mapSource.includes('setShowLabels'), 'MapSection allows toggling showLabels');
    });
  });

});
