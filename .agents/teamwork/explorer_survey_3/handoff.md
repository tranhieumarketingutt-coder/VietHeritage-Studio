# Verification Infrastructure & Test Preservation Report

**Explorer**: Explorer 3 (Verification Infrastructure Explorer)  
**Date**: 2026-10-10  
**Repository**: `c:\Users\TRAN HIEU\Desktop\vietheritage-remix---gen-z-heritage-co-creation-platform`  
**Status**: 100% Baseline Verified (116/116 Tests Passing, Zero Type Errors, Production Build Successful)

---

## 1. Observation

### 1.1 Project Verification & Tooling Configuration

From inspection of `package.json`, `tsconfig.json`, and `vite.config.ts`:

- **Package Scripts**:
  - `npm run verify`: `"npm run lint && npm test && npm run build"` (The authoritative gatekeeper).
  - `npm run lint` / `npm run typecheck`: `"tsc --noEmit"` (Strict TypeScript compiler checking).
  - `npm test`: `"tsx --test tests/*.test.ts"` (Node.js native test runner via `node:test` executed with TSX).
  - `npm run build`: `"vite build"` (Vite client bundler).
  - `npm run dev`: `"vite --port=3000 --host=0.0.0.0"`.
  - `npm run server`: `"tsx server.ts"`.
  - `npm run clean`: `"node -e \"try { fs.rmSync('dist', {recursive: true, force: true}); fs.rmSync('server.js', {force: true}); } catch (e) {}\""`.

- **Test Framework Architecture**:
  - The repository does **NOT** use Vitest or Jest.
  - It runs **Node.js native test runner** (`node:test`, `node:assert/strict`) via `tsx --test tests/*.test.ts`.
  - There are two primary testing execution paradigms in use:
    1. **In-Memory Component Execution**: Utilizes React 19 Client Internals (`(React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H`) to mock hooks (`useState`, `useRef`, `useCallback`, `useMemo`, `useEffect`) and evaluate functional React components directly in Node without a browser.
    2. **Static Source Code AST / String Oracles**: Utilizes Node's `fs.readFileSync` and regular expressions to inspect source files (`src/index.css`, `index.html`, components, data files) for exact tokens, classes, accessible attributes, and the complete absence of banned patterns (such as em dashes or nested buttons).

- **TypeScript Configuration (`tsconfig.json`)**:
  - Strict mode enabled (`"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`).
  - Target: `"ES2022"`, Module: `"ESNext"`, Module Resolution: `"bundler"`.
  - Path aliases: `"@/*": ["./*"]` and `"*": ["./*"]`.
  - JSX: `"react-jsx"`.
  - Included paths: `server/**/*`, `api/**/*`, `src/**/*`, `tests/**/*`, `server.ts`, `vite.config.ts`.

- **Bundling & Styling Pipeline (`vite.config.ts`)**:
  - `@tailwindcss/vite` (Tailwind CSS v4).
  - `@vitejs/plugin-react` (React 19).
  - Custom `geminiDevApiPlugin()` simulating `/api/gemini/*` endpoints locally.

---

### 1.2 Baseline Verification Execution & Health Status

The baseline verification command (`npm run verify`) was executed in the workspace root.

**Exact Terminal Output Recorded**:
```
> vietheritage-remix@1.0.0 verify
> npm run lint && npm test && npm run build

> vietheritage-remix@1.0.0 lint
> tsc --noEmit

> vietheritage-remix@1.0.0 test
> tsx --test tests/*.test.ts

▶ Accessibility & Human Factor Refactor (M1)
  ✔ exports useFocusTrap hook as a callable function (0.8359ms)
  ✔ verifies WCAG 2.2 AA contrast ratios for updated theme palette (0.6865ms)
  ✔ verifies src/index.css includes focus-visible, reduced-motion, and theme tokens (1.6983ms)
  ✔ verifies CostumeCard resolves nested interactive violations with semantic article and accessible CTA button (1.1118ms)
  ✔ verifies VirtualTryOn implements WAI-ARIA APG roving tabindex and arrow navigation for radiogroups (1.0263ms)
  ✔ verifies Navbar exposes aria-current='page' for active navigation hub (1.0289ms)
✔ Accessibility & Human Factor Refactor (M1) (9.6706ms)
▶ Challenger M1 Adversarial Verification Oracle
  ✔ empirically validates contrast math across full palette pairings (0.6406ms)
  ✔ verifies prefers-reduced-motion reset and focus indicators (1.4398ms)
  ✔ empirically audits all interactive controls for accessible names (60.6756ms)
✔ Challenger M1 Adversarial Verification Oracle (63.8569ms)
▶ Challenger M1 DOM Structure & ARIA Oracle
  ▶ Adversarial Challenge 1: CostumeCard DOM Structure & Interactive Descendants
    ✔ verifies CostumeCard renders root as <article> with zero button role or tabIndex (0.9103ms)
    ✔ empirically verifies absence of nested interactive elements (button inside button) (2.1979ms)
    ✔ verifies bottom CTA is a dedicated, fully accessible <button> with bilingual aria-label and event stopPropagation (1.1627ms)
    ✔ verifies inner view mode buttons possess valid aria-pressed attributes (0.7516ms)
    ✔ verifies split range slider has accessible label and ARIA value attributes (0.5962ms)
  ✔ Adversarial Challenge 1: CostumeCard DOM Structure & Interactive Descendants (7.584ms)
  ▶ Adversarial Challenge 2: Navbar aria-current Semantics
    ✔ empirically evaluates aria-current="page" on desktop and mobile tabs when Hub 1 is active (1.0253ms)
    ✔ empirically evaluates aria-current="page" on desktop and mobile tabs when Hub 2 is active (0.9387ms)
    ✔ verifies all auxiliary controls in Navbar have accessible names in both vi and en (1.442ms)
  ✔ Adversarial Challenge 2: Navbar aria-current Semantics (4.1378ms)
  ▶ Adversarial Challenge 3: Strict Static AST / Regex Inspection across Codebase
    ✔ verifies zero occurrences of invalid nested interactive markup in TSX files (38.8344ms)
  ✔ Adversarial Challenge 3: Strict Static AST / Regex Inspection across Codebase (39.5167ms)
✔ Challenger M1 DOM Structure & ARIA Oracle (52.6288ms)
▶ Empirical Challenger M1: LIFO Trap Stacking & Roving Tabindex Stress
  ▶ Suite 1: N-Deep LIFO Focus Trap Stacking
    ✔ enforces strict LIFO dismissal across a 3-level stacked modal hierarchy (3 -> 2 -> 1) (1.8159ms)
    ✔ enforces strict LIFO dismissal across a 4-level deep modal hierarchy (4 -> 3 -> 2 -> 1) (1.464ms)
    ✔ resiliently recovers when a middle modal unmounts out-of-order without Escape (0.9573ms)
    ✔ rapid burst of 10 Escape key presses handles sequential teardown without crashing (0.8353ms)
    ✔ preserves body scroll lock across nested modal openings and sequentially restores it (0.8329ms)
    ✔ Tab key trapping isolates to topmost modal only and never wraps within background modal (1.0718ms)
    ✔ restores focus through a 3-level chain of openers upon sequential dismissal (0.9859ms)
  ✔ Suite 1: N-Deep LIFO Focus Trap Stacking (9.8459ms)
  ▶ Suite 2: APG Roving Tabindex & Arrow Key Navigation in VirtualTryOn
    ✔ Costume Radiogroup: full forward 360-degree traversal via ArrowRight wrapping at boundary (0.7719ms)
    ✔ Costume Radiogroup: full forward 360-degree traversal via ArrowDown wrapping at boundary (0.573ms)
    ✔ Costume Radiogroup: full backward traversal via ArrowLeft wrapping at start boundary (0.5367ms)
    ✔ Costume Radiogroup: full backward traversal via ArrowUp wrapping at start boundary (0.5318ms)
    ✔ Costume Radiogroup: unselected state (-1) navigates to index 0 on forward and last on backward (0.4796ms)
    ✔ Destination Radiogroup: 5-item bidirectional cycling and wrap-around (0.5975ms)
    ✔ Non-arrow keys (Tab, Enter, Space, Escape, Shift) remain transparent without preventDefault (0.6406ms)
    ✔ Roving Tabindex distribution contract: exactly 1 element has tabIndex 0, remaining have tabIndex -1 (0.8385ms)
  ✔ Suite 2: APG Roving Tabindex & Arrow Key Navigation in VirtualTryOn (6.3315ms)
✔ Empirical Challenger M1: LIFO Trap Stacking & Roving Tabindex Stress (17.5645ms)
▶ Empirical Challenger M2/M3: Responsive Layout & Interactive Controls Stress Oracle
  ▶ Suite 1: 320px Viewport Rendering & Horizontal Overflow Resistance
    ✔ verifies src/index.css guarantees body overflow-x: hidden to prevent horizontal scrollbars (1.4721ms)
    ✔ verifies HeroSection eliminates whitespace-nowrap and wraps cleanly at 320px (0.966ms)
    ✔ verifies StylingResults layout enforces balanced 12-column grid and fluid container bounds (0.702ms)
    ✔ verifies MapSection container specifies responsive breakpoints and overflow containment (0.8732ms)
    ✔ scans all JSX/TSX components in src/ for dangerous unconstrained fixed widths (> 320px) (34.8192ms)
    ✔ verifies all whitespace-nowrap usages across src/ are strictly housed in overflow-x-auto containers (34.225ms)
  ✔ Suite 1: 320px Viewport Rendering & Horizontal Overflow Resistance (74.4578ms)
  ▶ Suite 2: Timeline Dynasty Switching & Comparison Toggle
    ✔ initializes TimelineSection with Ly dynasty and renders complete silhouette and metadata (1.7587ms)
    ✔ cycles through all 5 dynasties, dynamically updating active state and metadata (1.096ms)
    ✔ toggles isCompareMode, transitioning between single-view and dual-view comparison layouts (1.464ms)
    ✔ invokes onSelectCostume with primaryCostumeId when Jump to Studio is triggered (1.2662ms)
  ✔ Suite 2: Timeline Dynasty Switching & Comparison Toggle (6.8159ms)
  ▶ Suite 3: Wisdom Carousel Interactive Controls & Clipboard Feedback
    ✔ verifies CULTURAL_WISDOM_SNIPPETS dataset integrity and coverage (0.5404ms)
    ✔ empirically tests sequential pagination (#btnNextWisdom) wrapping at boundary (0.509ms)
    ✔ stress-tests randomizer (#btnRandomWisdom) across 100 iterations ensuring valid bounds and divergence (0.9038ms)
    ✔ empirically tests copy to clipboard with formatting and feedback toast state (0.9996ms)
    ✔ resiliently handles clipboard API errors without throwing unhandled exceptions (0.672ms)
  ✔ Suite 3: Wisdom Carousel Interactive Controls & Clipboard Feedback (5.0069ms)
  ▶ Suite 4: Anatomy Photo Lightbox Comparison & APG Dialog Compliance
    ✔ verifies AnatomySection wires real photo comparison button and triggers lightbox dialog (1.6163ms)
    ✔ verifies lightbox dismissal mechanics (close button, backdrop, stopPropagation) (1.2981ms)
    ✔ dynamically adapts photo reference when activeCostumeKey changes (1.8153ms)
  ✔ Suite 4: Anatomy Photo Lightbox Comparison & APG Dialog Compliance (6.1368ms)
  ▶ Suite 5: Heritage Map Geographic Region Filtering
    ✔ verifies all 6 regions in VIETNAM_REGIONS_DATA map to markers in LEAFLET_MARKERS (0.5694ms)
    ✔ empirically evaluates region filter outputs matching LEAFLET_MARKERS dataset (0.7998ms)
    ✔ verifies showAll toggle filters out non-city markers when toggled off (0.7327ms)
    ✔ verifies dynamic live count display matches filtered result length (0.5887ms)
  ✔ Suite 5: Heritage Map Geographic Region Filtering (3.5245ms)
✔ Empirical Challenger M2/M3: Responsive Layout & Interactive Controls Stress Oracle (106.56ms)
▶ Milestone 2 & 3: Craftsmanship, Layout, Typography & Cultural Authenticity
  ▶ Hard Gate R-02: Zero Em Dashes Across All Source and Data Files
    ✔ verifies 0 em dashes in COSTUMES_DATA (2.6492ms)
    ✔ verifies 0 em dashes in ANATOMY_PRESETS (1.1836ms)
    ✔ verifies 0 em dashes in DYNASTIES_TIMELINE_DATA and CULTURAL_WISDOM_SNIPPETS (6.5474ms)
    ✔ scans all source files in src/ recursively and verifies 0 em dashes (31.1951ms)
  ✔ Hard Gate R-02: Zero Em Dashes Across All Source and Data Files (44.1985ms)
  ▶ R-06 & R3: Editorial Typography & Responsive Layout
    ✔ verifies index.html links Google Fonts Playfair Display and Noto Serif (0.8875ms)
    ✔ verifies src/index.css defines font-serif cascading token and utility (0.5762ms)
    ✔ verifies HeroSection applies font-serif and removes whitespace-nowrap for 320px wrapping (0.5244ms)
    ✔ verifies StylingResults grid is balanced at 12 columns with guided Empty State (0.6484ms)
    ✔ verifies Heritage Map container has responsive heights without horizontal blowout (0.597ms)
  ✔ R-06 & R3: Editorial Typography & Responsive Layout (4.2281ms)
  ▶ R-04: Icon Migration to Native Lucide React
    ✔ verifies zero occurrences of <i data-lucide in src/ (36.0506ms)
    ✔ verifies native Lucide icons in Navbar and HeroSection (1.2719ms)
    ✔ verifies native Lucide icons in TimelineSection and WisdomCarousel (0.8605ms)
  ✔ R-04: Icon Migration to Native Lucide React (38.808ms)
  ▶ R-26 / C-2: Interactive Wiring across All Sections
    ✔ verifies DYNASTIES_TIMELINE_DATA completeness and compare mode wiring in TimelineSection (0.9098ms)
    ✔ verifies CULTURAL_WISDOM_SNIPPETS completeness and interactive buttons in WisdomCarousel (0.5192ms)
    ✔ verifies LEAFLET_MARKERS regionId assignments and filter logic in MapSection (0.6125ms)
    ✔ verifies AnatomySection wires 4K photo reference lightbox dialog (0.6134ms)
  ✔ R-26 / C-2: Interactive Wiring across All Sections (3.2388ms)
  ▶ R-27 / C-4 & R-16: Cultural Decorum, Guardrails & Authentic Microcopy
    ✔ verifies CulturalGuardrail renders 100% decorum badge when zero alerts (0.5613ms)
    ✔ verifies WardrobeModal has delete confirmation before item removal (3.3152ms)
    ✔ verifies VirtualTryOn maps raw slugs to localized Vietnamese destinations and authentic actions (0.7329ms)
    ✔ verifies ChatDrawer uses authentic Vietnamese titles and historical research prompts (0.6248ms)
    ✔ verifies i18n dictionaries (vi.ts and en.ts) have purged AI buzzwords (0.2353ms)
  ✔ R-27 / C-4 & R-16: Cultural Decorum, Guardrails & Authentic Microcopy (6.3729ms)
✔ Milestone 2 & 3: Craftsmanship, Layout, Typography & Cultural Authenticity (100.6176ms)
▶ Empirical Challenger: useFocusTrap & Modal APG Compliance
  ✔ Cycle forward (Tab) from last element wraps around to first element (15.5964ms)
  ✔ Cycle backward (Shift+Tab) from first element wraps around to last element (1.1584ms)
  ✔ Middle element navigation allows native browser Tab flow (1.2534ms)
  ✔ Single focusable element traps both Tab and Shift+Tab on itself (1.1673ms)
  ✔ Container with zero focusable elements prevents Tab escaping without error (3.4545ms)
  ✔ Out-of-bounds focus is pulled back into modal on Tab (1.55ms)
  ✔ Escape key dismisses modal and prevents event bubbling (1.3603ms)
  ✔ Escape key does NOT trigger onClose when closeOnEscape is false (0.8445ms)
  ✔ Focus restoration: returns focus to previously active element upon closing or unmounting (2.9547ms)
  ✔ Body scroll lock: applies overflow:hidden on open and restores previous overflow on close (1.2801ms)
  ✔ Rapid open/close toggle does not leak body scroll lock (1.5252ms)
  ✔ When isOpen is false, no keydown listeners are attached to window (0.4568ms)
  ✔ Initial focus prioritizes initialFocusRef over container elements (54.192ms)
  ✔ Initial focus targets first focusable element when initialFocusRef is omitted (72.136ms)
  ✔ Stacked modals Escape dismissal enforces LIFO: topmost modal closes first without closing underlying modal (0.9953ms)
  ✔ ChatDrawer closed state guarantees no focus capture or background interaction (0.316ms)
  ✔ Backdrop click triggers onClose while modal content clicks are protected via stopPropagation (0.4294ms)
✔ Empirical Challenger: useFocusTrap & Modal APG Compliance (167.2883ms)
▶ evaluateGuardrails
  ✔ evaluates canon outfits with 0 breaches (1.9872ms)
  ✔ triggers ERR_NGU_THAN_SHORT when bottomChoice is short for traditional costumes (0.5856ms)
  ✔ triggers ERR_GIAO_LINH_COLLAR when collarChoice is ta for giao-linh (0.3753ms)
  ✔ enforces sacred destination decorum rules (0.4866ms)
  ✔ calculates cumulative score reductions and clamps to lower bound (0.4909ms)
✔ evaluateGuardrails (10.8804ms)
▶ analyzePersonalColor
  ✔ determines correct color profiles for all 4 seasons (2.743ms)
  ✔ falls back to autumn warm when undertone choice is missing or unknown (0.4517ms)
  ✔ provides tailored silhouette advice across body shapes (0.6529ms)
  ✔ maps traditional natural dyes with full bilingual metadata (19.8271ms)
✔ analyzePersonalColor (26.856ms)
▶ RateLimiter
  ✔ allows requests up to the configured limit (1.8586ms)
  ✔ rejects subsequent requests when the limit is exceeded (0.3438ms)
  ✔ resets tracked quotas manually and when sliding window elapses (76.5893ms)
  ✔ executes automatic eviction for expired records when cache capacity is exceeded (95.6228ms)
✔ RateLimiter (178.5462ms)
▶ storageHelper
  ✔ handles server-side rendering gracefully when window is undefined (9.317ms)
  ✔ returns seeded community looks when storage is empty (1.2197ms)
  ✔ saves a new community look and increments likes on interaction (1.4706ms)
  ✔ falls back to default guest profile when user record is absent or corrupted (2.5823ms)
✔ storageHelper (20.3548ms)
▶ Virtual Try-On AI Flow & Studio Integration
  ✔ validates malformed payload returns status 400 (3.0447ms)
  ✔ handles valid try-on input payload and returns structured response (20131.0512ms)
  ✔ verifies StudioSection wires fetch to /api/gemini/try-on and /api/gemini/styling (0.8488ms)
  ✔ verifies VirtualTryOn renders body shape, bottom, weather, and color controls (0.7456ms)
  ✔ verifies StylingResults renders tryOnMeta status banner, rotating progress steps, and expert advice (0.6659ms)
  ✔ verifies zero em dashes in newly modified files (1.5172ms)
✔ Virtual Try-On AI Flow & Studio Integration (20141.6501ms)
ℹ tests 116
ℹ suites 27
ℹ pass 116
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 22697.4823

> vietheritage-remix@1.0.0 build
> vite build

vite v8.3.3 building client environment for production...
transforming...
✓ 1747 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                           2.28 kB │ gzip:  0.91 kB
dist/assets/MapSection-vh-t_kPv.css      15.09 kB │ gzip:  6.36 kB
dist/assets/index-C7QVoXvL.css           90.08 kB │ gzip: 15.15 kB
dist/assets/CommunityGrid-Qap1YMEE.js     4.08 kB │ gzip:  1.71 kB
dist/assets/i18n-Bk0gLy1w.js              8.13 kB │ gzip:  3.70 kB
dist/assets/ChatDrawer-DeRtMeGM.js       16.87 kB │ gzip:  7.49 kB
dist/assets/MuseumGallery-DF9F4rc-.js    27.30 kB │ gzip:  6.18 kB
dist/assets/StudioSection-DTPeVKyO.js    47.31 kB │ gzip: 14.45 kB
dist/assets/costumes-CUOLRlrm.js         67.77 kB │ gzip: 23.50 kB
dist/assets/AnatomySection-mG04zgSy.js   80.34 kB │ gzip: 24.87 kB
dist/assets/MapSection-D_J49fEA.js      173.69 kB │ gzip: 53.72 kB
dist/assets/index-h41yoQ9L.js           324.07 kB │ gzip: 99.34 kB

✓ built in 883ms
```

**Health Summary**:
- **Lint**: 0 errors (`tsc --noEmit` clean).
- **Tests**: 116 passed out of 116 (100% pass rate across 27 suites, 0 skipped, 0 failed).
- **Build**: Vite production bundle succeeded with 1747 modules compiled in 883ms.

---

### 1.3 Exhaustive Survey of All 12 Test Files

| Test File | Type | Primary Target / Component | Verification Technique |
|---|---|---|---|
| `tests/accessibility.test.ts` | Unit / Static Audit / WCAG Math | `useFocusTrap`, `src/index.css`, `CostumeCard`, `VirtualTryOn`, `Navbar` | WCAG relative luminance math + `fs.readFileSync` string inclusion |
| `tests/challenger_m1_oracle.test.ts` | Static Oracle / Math | CSS tokens, contrast ratios, `@media (prefers-reduced-motion: reduce)`, button count | Relative luminance math + `fs.readFileSync` regex + AST walk |
| `tests/challenger_m1_dom_oracle.test.ts` | Component DOM Oracle / Static AST | `CostumeCard`, `Navbar`, all `.tsx` in `src/` | React 19 Client Internals mock dispatcher + recursive AST/regex audit |
| `tests/challenger_m1_lifo_stress.test.ts` | Hook Harness Stress Test | `useFocusTrap` (LIFO stack), `VirtualTryOn` (APG keyboard nav) | Mock DOM implementation (`MockElement`, `mockWindow`, `HookInstanceHarness`) |
| `tests/focusTrapStress.test.ts` | Hook Harness APG Test | `useFocusTrap`, Modal dismissal, `ChatDrawer` | Mock DOM implementation (`MockElement`, `HookTestHarness`) |
| `tests/challenger_m2_m3_stress.test.ts` | Component & Layout Stress Oracle | Layout responsiveness (320px), `TimelineSection`, `WisdomCarousel`, `AnatomySection`, `MapSection` | `fs.readFileSync` regex + React 19 mock dispatcher execution + Mock clipboard |
| `tests/craftsmanship_m2_m3.test.ts` | Codebase & Typography Craftsmanship | Hard Gate R-02 (Zero Em Dashes), Font links, Lucide icons, Interactivity wiring, i18n dictionaries | Recursive directory file scans + `fs.readFileSync` + JSON checks + Dictionary assertions |
| `tests/guardrails.test.ts` | Pure Unit Test | `src/shared/lib/guardrails.ts` (`evaluateGuardrails`) | Pure functional assertions on scores, breach codes, severity |
| `tests/personalColor.test.ts` | Pure Unit Test | `src/shared/lib/personalColor.ts` (`analyzePersonalColor`, `TRADITIONAL_DYES`) | Pure functional assertions on palettes, seasons, dyes, body shape advice |
| `tests/rateLimiter.test.ts` | Server Unit Test | `server/handlers.ts` (`RateLimiter`) | Time-based sliding window & cache eviction verification |
| `tests/storage.test.ts` | Library / SSR Unit Test | `src/shared/lib/storage.ts` (`storageHelper`) | SSR `window: undefined` mock + `MemoryStorage` mock for `localStorage` |
| `tests/virtualTryOnFlow.test.ts` | Integration & Wiring Test | `server/handlers.ts` (`executeTryOnHandler`), `StudioSection`, `VirtualTryOn`, `StylingResults` | Handler async invocation + `fs.readFileSync` wiring assertions + Em dash scan |

---

## 2. Logic Chain

From the concrete observations above, the logic chain reveals crucial architectural contracts that the redesign must strictly adhere to:

```
[Observation: Node native test runner lacks JSDOM/browser DOM]
       ↓
[Logic Step 1: Tests execute React components via React 19 Client Internals dispatcher simulator]
       ↓
[Logic Step 2: Tests directly inspect returned element tree nodes: element.type, element.props, element.props.children[i]]
       ↓
[Conclusion A: Changes to the JSX element tree structure or node order in CostumeCard, TimelineSection, etc. will fail tests]

[Observation: Tests perform static scans using fs.readFileSync and regex]
       ↓
[Logic Step 3: Specific class names, IDs, text strings, and CSS variables are hard-checked in source files]
       ↓
[Conclusion B: Renaming, deleting, or altering required text strings, IDs, or CSS tokens will fail tests]

[Observation: craftsmanship_m2_m3 and virtualTryOnFlow contain Hard Gate R-02 checking for em dashes \u2014]
       ↓
[Logic Step 4: Any occurrence of '—' in any .ts, .tsx, .css, or .html file in src/ triggers immediate test failure]
       ↓
[Conclusion C: The redesign must NEVER introduce the em dash character (—); use hyphens (-), colons (:), or dots (·) instead]
```

### Direct Constraints Identified

1. **Static AST & String Scanning**:
   - `src/index.css` is statically searched for `--color-gold-dark: #8A6D1C`, `--color-bronze: #8A6D1C`, `:focus-visible`, `outline: 2px solid #8B0000 !important`, `rgba(212, 175, 55, 0.45) !important`, `@media (prefers-reduced-motion: reduce)`, `animation-duration: 0.01ms !important`, `transition-duration: 0.01ms !important`, `scroll-behavior: auto !important`, `--font-serif`, `.font-serif`, and `overflow-x: hidden` inside the `body` rule.
   - It also asserts that `font-family: 'Be Vietnam Pro', -apple-system` does **NOT** exist in `src/index.css` (universal font override !important was purged).

2. **React Element Tree Indexing Contracts**:
   - `CostumeCard`: Root must be `<article>` with no `role="button"` or `tabIndex`. Child 2 (`tree.props.children[2]`) must be a `<div>`, whose child is `<button type="button" ...>` with `aria-label` containing the costume name.
   - `TimelineSection`: Jump to Studio button is accessed via `tree.props.children[2].props.children[1].props.children[1]`. It must have class `timeline-jump-studio-btn`.
   - `AnatomySection`: When `isLightboxOpen` is true, lightbox dialog is found in `tree.props.children` with `role="dialog"`, `aria-modal="true"`. Its first child `children[0]` is the close `<button>` with `aria-label="Đóng ảnh đối chiếu"`, and second child `children[1]` is the content container with `e.stopPropagation()`.

3. **Strict Banned Syntax Rules**:
   - **No Em Dashes (`—`)**: Unicode `\u2014` is 100% forbidden across all `.ts`, `.tsx`, `.css`, and `.html` files in `src/` and data structures.
   - **No `<i data-lucide>` tags**: All icons must be imported as native React components from `lucide-react`.
   - **No nested interactive elements**: No `<button>` inside `<button>`, and zero matches for `/role=["']button["'][^>]*>[\s\S]*?<button/` in all TSX files.
   - **No unconstrained fixed widths (> 320px)**: Any `w-[>320px]` or `min-w-[>320px]` class must be guarded on the same line with `max-w-`, `overflow-`, or a responsive prefix (`sm:`, `md:`, `lg:`).
   - **No uncontained `whitespace-nowrap`**: Any file containing `whitespace-nowrap` **must** also contain `overflow-x-auto`.

---

## 3. Caveats

- **No browser end-to-end (E2E) runner currently in package.json**: Cypress or Playwright are not configured; testing relies exclusively on Node test suites (`tsx --test`).
- **External Network Dependency in Tests**: Leaflet map components and image URLs are mocked or tested in memory; no actual network requests to Map tiles are made during `npm test`.
- **Local Gemini Dev Simulation**: `server/handlers.ts` provides fallback/mock data when `GEMINI_API_KEY` is not present in the execution environment, allowing `tests/virtualTryOnFlow.test.ts` to pass deterministically in CI/local runs.

---

## 4. Conclusion & Test Preservation Specification

To guarantee that the UX/UI redesign into the "Cung đình & Cổ điển trang nhã" (Royal & Elegant Vietnamese Heritage) style passes **100% of the 116 existing tests**, the following preservation specification must be strictly followed.

### 4.1 Master Preservation Checklist for Redesign Agents

#### A. DOM IDs (Must Be Preserved Verbatim)
| Element ID | Component | Required Location & Role |
|---|---|---|
| `navLogo` | `Navbar.tsx` | Header brand logo button |
| `navTabHub1` | `Navbar.tsx` | Desktop Tab Hub 1 button (Bảo Tàng) |
| `navTabHub2` | `Navbar.tsx` | Desktop Tab Hub 2 button (Xưởng Sáng Tạo) |
| `mobTabHub1` | `Navbar.tsx` | Mobile Tab Hub 1 button |
| `mobTabHub2` | `Navbar.tsx` | Mobile Tab Hub 2 button |
| `audioToggleBtn` | `Navbar.tsx` | Audio toggle button |
| `openWardrobeBtn` | `Navbar.tsx` | Open wardrobe modal button |
| `langToggleBtn` | `Navbar.tsx` | Language toggle button |
| `authBtn` | `Navbar.tsx` | Account/Guest status button |
| `heroGoHub1` | `HeroSection.tsx` | Hero CTA button (Khám Phá Bảo Tàng) |
| `heroGoHub2` | `HeroSection.tsx` | Hero CTA button (Phối Màu Sắc Tố Tự Nhiên) |
| `historicalTimelineSection` | `TimelineSection.tsx` | Section root ID |
| `btnToggleTimelineCompare` | `TimelineSection.tsx` | Toggle compare mode button |
| `culturalWisdomSection` | `WisdomCarousel.tsx` | Section root ID |
| `btnRandomWisdom` | `WisdomCarousel.tsx` | Randomize quote button |
| `btnCopyWisdom` | `WisdomCarousel.tsx` | Copy quote button |
| `btnNextWisdom` | `WisdomCarousel.tsx` | Next quote button |
| `copyWisdomText` | `WisdomCarousel.tsx` | Feedback text span for copy action |
| `vietnamCostumeMapSection` | `MapSection.tsx` | Section root ID |
| `chat-drawer-title` | `ChatDrawer.tsx` | Chat drawer title heading |
| `wardrobe-modal-title` | `WardrobeModal.tsx` | Wardrobe modal title heading |
| `userBodyShapeSelect` | `VirtualTryOn.tsx` | Select dropdown for body shape |
| `userBottomSelect` | `VirtualTryOn.tsx` | Select dropdown for lower garment |
| `userWeatherSelect` | `VirtualTryOn.tsx` | Select dropdown for weather/season |
| `userColorSelect` | `VirtualTryOn.tsx` | Select dropdown for color choice |
| `undertoneSelect` | `VirtualTryOn.tsx` | Select dropdown for personal color season |
| `userHeightInput` | `VirtualTryOn.tsx` | Number input for height |
| `userWeightInput` | `VirtualTryOn.tsx` | Number input for weight |

#### B. ARIA Attributes & APG Keyboard Navigation Contracts
- **`Navbar.tsx`**:
  - `navTabHub1`: `aria-current={activeHub === 'hub1' ? 'page' : undefined}`.
  - `navTabHub2`: `aria-current={activeHub === 'hub2' ? 'page' : undefined}`.
  - `mobTabHub1`: `aria-current={activeHub === 'hub1' ? 'page' : undefined}`.
  - `mobTabHub2`: `aria-current={activeHub === 'hub2' ? 'page' : undefined}`.
  - Non-empty `aria-label` in both `vi` and `en` for `navLogo`, `audioToggleBtn`, `openWardrobeBtn`, `langToggleBtn`, `authBtn`.
- **`CostumeCard.tsx`**:
  - Root container: Semantic `<article>`, **NO** `role="button"`, **NO** `tabIndex`.
  - Mode toggle buttons: Must contain `aria-pressed={localMode === 'svg'}`, `aria-pressed={localMode === 'split'}`, `aria-pressed={localMode === 'real'}`.
  - Split range input: `type="range"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow={splitPos}`, `aria-valuetext={`${splitPos}%`}`, `aria-label=...`.
  - Bottom CTA: `<button type="button" onClick={(e) => { e.stopPropagation(); onOpenModal(c.id); }} aria-label={isEn ? `Xem hồ sơ lịch sử chi tiết cho ${c.nameEn}` : `Xem hồ sơ lịch sử chi tiết cho ${c.nameVi}`}>`.
- **`VirtualTryOn.tsx`**:
  - Radiogroups: Must contain `role="radiogroup"` containers with `onKeyDown={handleCostumeKeyDown}` and `onKeyDown={handleDestinationKeyDown}`.
  - Roving tabindex: `tabIndex={isSelected || (!state.selectedCostumeId && index === 0) ? 0 : -1}`.
  - Arrow key navigation: Support `ArrowRight`, `ArrowDown`, `ArrowLeft`, `ArrowUp` with circular wrap-around.
- **Modals & Drawers (`AnatomySection`, `ChatDrawer`, `WardrobeModal`)**:
  - Must declare `role="dialog"`, `aria-modal="true"`.
  - Close button in Anatomy photo comparison must have `aria-label={isEn ? "Close enlarged photo" : "Đóng ảnh đối chiếu"}`.
  - `ChatDrawer` when closed: Must declare `aria-hidden={!isOpen}`, `inert={!isOpen ? true : undefined}`, `tabIndex={-1}`.
  - Modal backdrops must call `onClose`, and inner content containers must call `e.stopPropagation()`.

#### C. Required Text Strings & Microcopy
- **`HeroSection.tsx`**: Must contain heading with `font-serif` and responsive classes `text-2xl sm:text-4xl`.
- **`StylingResults.tsx`**:
  - Empty state text: `"Không Gian Phối Màu & Điển Chế Phục Trang"`.
  - Must include `<Palette className="w-6 h-6" />` or similar `Palette className=`.
  - Must declare status alert: `role="status"` and `tryOnMeta` handling.
  - Must include `ROTATING_TRY_ON_STEPS` and render `expertAdvice`.
- **`TimelineSection.tsx`**:
  - Jump button: Must contain class `timeline-jump-studio-btn` and text `"Phối Đồ Ngay"`.
  - Compare toggle: Must contain text `"So Sánh 2 Triều Đại"` / `"Đóng Chế Độ So Sánh"`.
- **`WisdomCarousel.tsx`**:
  - Must trigger `navigator.clipboard.writeText`.
  - Must render `"Đã sao chép"` or `"✓ Đã sao chép"` on copy.
- **`MapSection.tsx`**:
  - Must render dynamic count: `{filteredMarkers.length} điểm`.
  - Must contain state variables/setters: `setActiveRegId`, `setShowAll`, `setShowLabels`.
- **`CulturalGuardrail.tsx`**:
  - Clean outfit state: Must contain `"ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%"`.
- **`WardrobeModal.tsx`**:
  - Inline delete state: Must track `confirmDeleteId` and render `"Xác nhận xóa?"`.
- **`VirtualTryOn.tsx`**:
  - Must define `DESTINATION_LABELS` with entries for `'Hoàng Thành Thăng Long'` and `'Phố Cổ Hội An'`.
  - Action button: Must say `"Phục Dựng Diện Mạo Di Sản"`.
- **`ChatDrawer.tsx`**:
  - Must include title `"Cố Vấn Điển Chế Phục Trang"`.
  - Must include badge `"Tra cứu Điển chế & Sử liệu"`.
  - Must **NOT** contain `"Thinking Mode: High"`.
- **`i18n` Dictionaries (`src/shared/i18n/vi.ts` & `en.ts`)**:
  - `vi.navHub2`: `'HUB 2: XƯỞNG SÁNG TẠO DI SẢN'`
  - `en.navHub2`: `'HUB 2: HERITAGE CO-CREATION STUDIO'`
  - `vi.tryOnHeroBtn`: `'Phối Màu Sắc Tố Tự Nhiên'`
  - `en.tryOnHeroBtn`: `'Natural Dye & Palette Styling'`
  - `vi.studioTitle`: `'V-Studio: Xưởng Sáng Tạo Di Sản & Điển Chế Phục Trang'`
  - `en.studioTitle`: `'V-Studio: Heritage Co-Creation Studio & Contextual Styling'`
  - `vi.btnAnalyze`: `'Phục Dựng & Phân Tích Sắc Tố'`
  - `en.btnAnalyze`: `'Analyze Palette & Heritage Styling'`
  - `vi.chatDrawerTitle`: `'Cố Vấn Điển Chế Phục Trang'`
  - `en.chatDrawerTitle`: `'Heritage Cultural Advisor'`

#### D. CSS Tokens & Layout Integrity (`src/index.css` & `index.html`)
- **`index.html`**:
  - Must link `fonts.googleapis.com` with `Playfair+Display` and `Noto+Serif`.
- **`src/index.css`**:
  - Must retain `@theme` tokens:
    - `--color-gold-dark: #8A6D1C`
    - `--color-bronze: #8A6D1C`
    - `--font-serif: "Playfair Display", "Noto Serif", serif;`
  - Must provide `.font-serif` utility class.
  - `body` ruleset must include `overflow-x: hidden`.
  - `:focus-visible` must include `outline: 2px solid #8B0000 !important` and box shadow with `rgba(212, 175, 55, 0.45) !important`.
  - `@media (prefers-reduced-motion: reduce)` must reset `animation-duration: 0.01ms !important`, `transition-duration: 0.01ms !important`, and `scroll-behavior: auto !important`.
  - Must **NOT** contain `font-family: 'Be Vietnam Pro', -apple-system` universal override with `!important`.
- **Responsive Layout Rules**:
  - Any fixed width class `w-[...px]` or `min-w-[...px]` where width > 320px must be accompanied on the same line with `max-w-`, `overflow-`, `sm:`, `md:`, or `lg:`.
  - `whitespace-nowrap` can only appear in files that also contain `overflow-x-auto`.
  - In `StylingResults.tsx`: Left column must use `md:col-span-5` and card `max-w-[340px]`; right column must use `md:col-span-7`.
  - In `MapSection.tsx`: Container must have `h-[380px] sm:h-[480px] lg:h-[600px]`, `overflow-hidden`, and filter strip `overflow-x-auto max-w-full`.

---

## 5. Verification Method

To independently verify the project health at any stage of the redesign:

### 5.1 Primary Automated Gate
Run the unified verification command:
```bash
npm run verify
```
Expected output:
1. `npm run lint` (`tsc --noEmit`) passes with exit code 0.
2. `npm test` (`tsx --test tests/*.test.ts`) reports 116 tests passing across 27 suites with 0 failures.
3. `npm run build` (`vite build`) completes production build with exit code 0.

### 5.2 Targeted Sub-verifications
- **TypeScript strict check**: `npm run lint`
- **Unit & Oracle tests**: `npm test`
- **Specific test file check** (e.g. DOM Oracle):
  ```bash
  npx tsx --test tests/challenger_m1_dom_oracle.test.ts
  ```
- **Em Dash check across codebase**:
  ```bash
  npx tsx --test tests/craftsmanship_m2_m3.test.ts
  ```
- **Production bundle**: `npm run build`

### 5.3 Invalidation Conditions
Any of the following constitutes an immediate verification failure:
- Introducing an em dash (`—`) anywhere in `src/`.
- Changing the JSX children tree ordering of `CostumeCard` or `TimelineSection`.
- Removing or modifying any ID in Section 4.1.A.
- Omitting `overflow-x: hidden` from `body` in `src/index.css`.
- Renaming or omitting any required microcopy string in Section 4.1.C.
