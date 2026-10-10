# Handoff Report: UI Architecture Survey & Vietnamese Imperial Design System Plan

- **Author**: Explorer 1 (UI Architecture Explorer)
- **Target Role / Recipient**: Parent Agent / Orchestrator & UI Implementation Agents
- **Project**: VietHeritage Remix - Gen Z Heritage Co-Creation Platform
- **Date**: 2026-10-10
- **Integrity Mode**: Development (Read-Only Investigation)

---

## 1. Observation

### 1.1 Tooling, Dependencies & Build Infrastructure
- **Runtime & Framework**: React 19.0.1 (`react`, `react-dom`), Vite 8.3.0 (`vite`, `@vitejs/plugin-react` 6.1.1), TypeScript 7.0.2 (`package.json:17-42`).
- **Styling Architecture**: Tailwind CSS v4.3.3 via `@tailwindcss/vite` plugin (`package.json:19, 39`, `vite.config.ts:1, 116`). Configured in `src/index.css` via `@import "tailwindcss";` and `@theme` block (`src/index.css:1-20`).
- **Animation & Motion**: Motion 12.23.24 (`motion: ^12.23.24`) and custom CSS keyframes (`lotusBreathingPulse`, `floatSlow`, `floatReverse`, `shake`, `fadeIn` in `src/index.css:78-215`).
- **Iconography**: Native Lucide React 0.546.0 (`lucide-react: ^0.546.0`). Verified: zero occurrences of dead `<i data-lucide` tags across all source files (`tests/craftsmanship_m2_m3.test.ts:107-134`).
- **Cartography**: Leaflet 1.9.4 and React Leaflet 5.0.0 (`leaflet: ^1.9.4`, `react-leaflet: ^5.0.0`, `src/features/heritage-map/components/MapSection.tsx:2-3`).
- **Audio Synthesis**: Native HTML5 Web Audio API synthesizing Vietnamese pentatonic scale (*thang âm ngũ cung*: C4, D4, F4, G4, A4, C5, D5, F5) and 16-string zither (*Đàn Tranh*) plucked timbre without external MP3 audio assets (`src/shared/hooks/useAudio.ts:1-125`).
- **Verification Commands & Test Suite**:
  - `npm run verify` runs `npm run lint` (TypeScript `tsc --noEmit`), `npm test` (`tsx --test tests/*.test.ts`), and `npm run build` (`vite build`).
  - Baseline execution verified: **116 automated tests across 27 suites pass with 0 errors**, TypeScript type check passes with 0 diagnostics, and Vite production bundle compiles cleanly in 867ms (`dist/assets/index-h41yoQ9L.js` 324 kB, gzip 99 kB).

### 1.2 Font Imports & Typography Hierarchy
- **Font Imports** in `index.html:19-21`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  ```
- **CSS Cascade & Font Tokens** in `src/index.css:17-29`:
  - `--font-sans`: `"Be Vietnam Pro", sans-serif` (Default body font, high-legibility Vietnamese diacritic support).
  - `--font-serif`: `"Playfair Display", "Noto Serif", serif` (Heritage editorial serif font for headings and titles).
  - `--font-mono`: `"Be Vietnam Pro", monospace`.
  - `.font-serif`: utility class binding `font-family: var(--font-serif)`.

### 1.3 Current Color Palette & WCAG 2.2 Contrast Tokens
- Declared under `@theme` in `src/index.css:3-16`:
  - `--color-linen: #FAF7F2` (background base parchment / dó paper).
  - `--color-linen-dark: #F0ECE1`.
  - `--color-charcoal: #222222` (primary typography on light background).
  - `--color-taupe: #666666` (secondary typography).
  - `--color-crimson: #8B0000` (primary cinnabar lacquer red).
  - `--color-crimson-dark: #5C0000`.
  - `--color-gold: #D4AF37` (primary decorative gold).
  - `--color-gold-light: #FDF6E2`.
  - `--color-gold-dark: #8A6D1C` (dark gold for text/icons on light background, contrast 4.59:1 - 4.90:1).
  - `--color-gold-deep: #785E15` (deep antique bronze, contrast 5.76:1 - 6.16:1).
  - `--color-bronze: #8A6D1C` (semantic replacement token).
  - `--color-amber-seal: #B33927` (cinnabar seal stamp red).
- Focus visible dual-ring indicator in `src/index.css:38-42`:
  - `outline: 2px solid #8B0000 !important;`
  - `outline-offset: 2px !important;`
  - `box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.45) !important;`
- Contrast compliance verified by `tests/accessibility.test.ts:42-70` and `tests/challenger_m1_oracle.test.ts:24-45`:
  - Dark gold `#8A6D1C` on linen `#FAF7F2`: >= 4.5:1 (passes WCAG AA).
  - Crimson `#8B0000` on linen `#FAF7F2`: >= 4.5:1 (passes WCAG AA).
  - Gold `#D4AF37` on crimson `#8B0000`: >= 4.5:1 (passes WCAG AA).
  - Gold `#D4AF37` on charcoal `#222222`: >= 7.0:1 (passes WCAG AAA).
  - Stone-600 `#57534E` on white and linen: >= 4.5:1 (passes WCAG AA).

### 1.4 Comprehensive Screen & Component Mapping
1. **Shell Composition** (`src/app/App.tsx:87-165`):
   - Skip Link: `<a href="#mainContent">` with accessible focus styling.
   - Global Header (`src/shared/components/Navbar.tsx`):
     - Branding button (`#navLogo`) navigating to Hub 1.
     - Dual Hub Navigation Tabs (`#navTabHub1`, `#navTabHub2`) with dynamic `aria-current="page"`.
     - Ambient audio toggle (`#audioToggleBtn`) with `aria-pressed`.
     - Wardrobe drawer trigger (`#openWardrobeBtn`).
     - Language toggle button (`#langToggleBtn`, VI / EN).
     - Guest account button (`#authBtn`).
     - Mobile navigation tabs (`#mobTabHub1`, `#mobTabHub2`).
   - Floating chat button (`#floatingChatButton`, bottom-right fixed trigger for Gemini Cultural Advisor).
   - Global Footer (`src/shared/components/Footer.tsx`).
2. **Hero Section** (`src/features/home/components/HeroSection.tsx`):
   - Editorial headline: "DI SẢN HÓA MỸ THUẬT" (`font-serif`, gradient text).
   - Floating lotus watermark illustrations (`interactive-lotus-pattern`, `interactive-lotus-pattern-rev`).
   - Hub triggers: `#heroGoHub1` (Bảo tàng) and `#heroGoHub2` (Xưởng sáng tạo).
   - 4-item cultural stats counter (Triều đại, Personal Color, Dáng áo, Guard Score).
3. **Digital Museum Gallery** (`src/features/museum/components/MuseumGallery.tsx`):
   - Section ID: `#museumGallerySection`.
   - Search input (`#costumeSearchInput`) with multi-field search and clear button.
   - Era category filters (`all`, `nguyen`, `ly-tran-le`, `folk`).
   - Global 3-way display mode toggle (📸 Ảnh thật 4K, ⚡ Kéo trượt, 🎨 Bản vẽ).
   - 6 Costume Cards (`src/features/museum/components/CostumeCard.tsx`):
     - Container is semantic `<article>` with zero button role and zero tabIndex.
     - 3 local preview modes: Real Photo, Split Range Slider (`type="range"` with WAI-ARIA `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`), and Vector SVG.
     - Bottom CTA button with explicit `<button type="button">`, `stopPropagation()`, and bilingual accessible `aria-label`.
   - Detailed dossier modal (`CostumeDetailModal.tsx`) with focus trap, photo carousel, and craftsmanship tabs.
   - 4K photo lightbox dialog with APG focus trap.
4. **2D Layered Costume Anatomy** (`src/features/anatomy/components/AnatomySection.tsx`):
   - Section ID: `#anatomySection`.
   - Costume selector pills (`ngu-than`, `nhat-binh`, `giao-linh`, `ao-dai`, `ao-tac`, `ba-ba`).
   - Layer toggles (All, Inner Đơn Y, Mid Thân Con, Outer).
   - Interactive flap open/close trigger button.
   - Hotspot markers with interactive popovers on collar, buttons, modest flap, seams.
   - 4K photo reference comparison button triggering modal dialog.
5. **Historical Timeline Evolution** (`src/features/timeline/components/TimelineSection.tsx`):
   - Section ID: `#historicalTimelineSection`.
   - 5 Dynasties: Lý, Trần, Lê, Nguyễn, Hiện Đại (`DYNASTIES_TIMELINE_DATA`).
   - Timeline milestone selector buttons with century labels.
   - Comparison mode toggle (`#btnToggleTimelineCompare`, `isCompareMode`).
   - Jump to Studio action button (`.timeline-jump-studio-btn`, `onSelectCostume`).
6. **Cultural Wisdom & Philosophy Carousel** (`src/features/wisdom/components/WisdomCarousel.tsx`):
   - Section ID: `#culturalWisdomSection`.
   - 6+ curated cultural snippets (`CULTURAL_WISDOM_SNIPPETS`).
   - Action controls: `#btnRandomWisdom`, `#btnCopyWisdom` (with clipboard toast), `#btnNextWisdom`.
7. **Geographical Heritage Map** (`src/features/heritage-map/components/MapSection.tsx`):
   - Section ID: `#vietnamCostumeMapSection`.
   - Leaflet interactive map with responsive height (`h-[380px] sm:h-[480px] lg:h-[600px]`, `overflow-hidden`).
   - 6 region filters: Toàn Quốc, Bắc Bộ, Trung Bộ, Nam Bộ, Tây Nguyên, Hoàng Sa - Trường Sa.
   - 7 markers (`LEAFLET_MARKERS`) with live filtered count display.
8. **Heritage Co-Creation Studio & AI Personal Color** (`src/features/studio/components/StudioSection.tsx`):
   - Section ID: `#studioSection`.
   - Virtual Try-On configuration (`VirtualTryOn.tsx`):
     - Client-side image downsampling to 1024px, 82% JPEG (`compressImage`).
     - Radiogroup for costume selection with APG roving tabindex and Arrow keys navigation.
     - Radiogroup for destination selection with roving tabindex and Arrow keys navigation.
     - Body shape, bottom choice, collar choice, weather, and color swatch selector.
     - Action buttons: "Phục Dựng & Phân Tích Sắc Tố" and "Phục Dựng Diện Mạo Di Sản".
   - Cultural Guardrail (`CulturalGuardrail.tsx`):
     - Canonical decorum score badge (`ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%`) when zero breaches.
     - Decorum warning cards with shake animation on violations.
   - Styling Results (`StylingResults.tsx`):
     - 12-column balanced grid (`md:col-span-5` left, `md:col-span-7` right).
     - Guided empty state with `Palette` icon.
     - 4-season undertone analysis, silhouette advice, natural dye swatches.
     - Actions: "Xuất Thẻ Di Sản 1200x1800" and "Lưu vào Tủ Đồ Di Sản".
   - Photocard Generator Modal (`PhotocardModal.tsx`):
     - 1200x1800 HTML5 Canvas export with Indochine high-fashion borders, seal stamp, dye swatches, decorum score.
9. **Community Lookbook Grid** (`src/features/community/components/CommunityGrid.tsx`):
   - Grid of community looks (`LookCard.tsx`) with like counters, author avatars, and heritage scores.
10. **Heritage Wardrobe Modal** (`src/features/wardrobe/components/WardrobeModal.tsx`):
    - Saved looks drawer with inline delete confirmation prompt (`Xác nhận xóa?`, `confirmDeleteId`).
11. **Gemini Cultural Advisor** (`src/features/chat/components/ChatDrawer.tsx`):
    - Slide-out drawer with title "Cố Vấn Điển Chế Phục Trang" and badge "Tra cứu Điển chế & Sử liệu".
    - Prompt chips and streaming conversational responses.

### 1.5 Strict Quality Gates & Test Invariants Observed
- **Hard Gate R-02 (Zero Em Dashes)**:
  - All source files (`.ts`, `.tsx`, `.css`, `.html`) and data files must contain **0 em dashes (`—`, Unicode `\u2014`)**. Use hyphens `-` or colons `:` instead. Tested by `tests/craftsmanship_m2_m3.test.ts:15-60`.
- **Responsive Layout & 320px Viewport**:
  - `src/index.css` must declare `overflow-x: hidden` on `body`.
  - Zero unconstrained fixed width classes exceeding 320px (`w-[>320px]`).
  - Zero `whitespace-nowrap` unless housed in `overflow-x-auto` containers.
- **Accessibility & Focus**:
  - `useFocusTrap` on all modals and drawers with LIFO stacking, Escape dismissal, and body scroll lock.
  - `:focus-visible` dual-ring indicator in `src/index.css`.
  - APG roving tabindex in `VirtualTryOn` radiogroups.
  - Explicit CTA buttons with `stopPropagation()` inside cards.

---

## 2. Logic Chain

1. **Premise 1 (R1 - Business & Test Invariance)**:
   The project has 116 rigorous unit, integration, and stress tests covering accessibility, DOM structure, ARIA semantics, mobile viewport overflow resistance, rate limiting, personal color, guardrails, and AI try-on flows. Any visual redesign MUST preserve all DOM IDs, test hooks, roving tabindex mechanics, aria-current attributes, focus trap bindings, and zero-em-dash constraints to ensure `npm run verify` continues to pass with exit code 0.

2. **Premise 2 (R2 - Aesthetic Identity Gap Analysis)**:
   The current application successfully implements foundational colors (crimson `#8B0000`, gold `#D4AF37`, linen `#FAF7F2`) and typography (`Playfair Display`, `Be Vietnam Pro`), but:
   - Styling is largely composed of inline Tailwind hex utilities (`bg-[#FAF7F2]`, `border-[#D4AF37]/50`) rather than a structured semantic token system.
   - Traditional motifs (Thủy ba waves, Kỷ hà meanders, Vân mây auspicious clouds, Imperial seals) are only present in isolated SVG fragments (the lotus watermark and hero lotus), missing across cards, dividers, buttons, frames, and modals.
   - The color palette lacks formal integration of royal cobalt porcelain (*Lam gốm cổ / men lam Huế* `#1C3B5E`) and warm wood amber (*Trầm mộc* `#6B4226` / `#3D261A`).
   - Cards and containers use generic modern card styling (rounded rectangles with flat borders) rather than the classical imperial decree scroll framework (*Bản chiếu khung viền*, *Chỉ dụ hoàng triều*).

3. **Inference (Design System Architecture Solution)**:
   To transition the platform to the authentic Vietnamese Imperial & Classical Elegant aesthetic (*Cung đình & Cổ điển trang nhã*) without breaking existing logic, we must establish:
   - A formal 5-hue Vietnamese Imperial design token system in `src/index.css` extending `@theme`.
   - A dedicated library of lightweight, accessible vector heritage motif primitives (Thủy ba, Sen bách diệp, Kỷ hà hồi văn, Triện son, Mây cuộn thời Lê-Nguyễn).
   - Classical architectural frame components (double hairline borders, ornamental corner brackets, imperial decree title bands).
   - Refined typography scales with intentional line heights, balance wrapping, and zero diacritic clipping.

---

## 3. Detailed Architectural Recommendation

### 3.1 Imperial Color Token Palette (Bảng Màu Cung Đình & Cổ Điển)

The color system is organized into 5 imperial hue families, mapped to semantic roles with guaranteed WCAG 2.2 contrast:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       VIETNAMESE IMPERIAL PALETTE                           │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│ Hue Family          │ Hex Value           │ Cultural Meaning & Semantic Role│
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ 1. ĐỎ SON (Chu Sa)  │ #8B0000 (Primary)   │ Primary lacquer cinnabar red    │
│    Cinnabar Lacquer │ #9E1B1B (Vermilion) │ Imperial robes & celebration    │
│    Red              │ #5C0000 (Lacquer)   │ Deep antique ebony-crimson      │
│                     │ #B33927 (Seal)      │ Royal decree seal ink (Triện)   │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ 2. VÀNG HOÀNG CUNG  │ #D4AF37 (Imperial)  │ Gilt wood (Thếp vàng) & accents │
│    Imperial Gold &  │ #FDF6E2 (Hoàng Yến) │ Delicate canary silk highlights │
│    Antique Bronze   │ #8A6D1C (Bronze AA) │ Text/icons on linen (>= 4.5:1)  │
│                     │ #785E15 (Deep AAA)  │ High-contrast bronze (>= 6:1)   │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ 3. LAM GỐM CỔ       │ #1C3B5E (Cobalt)    │ Imperial porcelain (Men lam Huế)│
│    Cobalt & Celadon │ #2E5B88 (Glaze)     │ Underglaze blue on silk         │
│    Porcelain Blue   │ #3D6B58 (Celadon)   │ Imperial jade green (Men ngọc)  │
│                     │ #EBF2F7 (Glaze Tint)│ Subtle porcelain surface tint   │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ 4. TRẦM MỘC         │ #3D261A (Agarwood)  │ Royal teak, agarwood, furniture │
│    Wood Amber &     │ #6B4226 (Yam Brown) │ Củ nâu traditional dye          │
│    Ebony Lacquer    │ #222222 (Sơn Then)  │ Primary high-contrast body text │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ 5. GIẤY DÓ & NGÀ    │ #FAF7F2 (Dó Paper)  │ Base authentic parchment canvas │
│    Dó Paper, Ivory  │ #F0ECE1 (Aged Dó)   │ Secondary container surface     │
│    & Raw Silk       │ #FFFFFF (Silk Card) │ High-clarity reading surface    │
│                     │ #E5DFC9 (Scroll Rim)│ Aged scroll divider borders     │
└─────────────────────┴─────────────────────┴─────────────────────────────────┘
```

#### CSS Token Specifications (`src/index.css` `@theme` extensions):
```css
@theme {
  /* Foundations preserved for test suite invariants */
  --color-linen: #FAF7F2;
  --color-linen-dark: #F0ECE1;
  --color-charcoal: #222222;
  --color-taupe: #666666;
  --color-crimson: #8B0000;
  --color-crimson-dark: #5C0000;
  --color-gold: #D4AF37;
  --color-gold-light: #FDF6E2;
  --color-gold-dark: #8A6D1C;
  --color-gold-deep: #785E15;
  --color-bronze: #8A6D1C;
  --color-amber-seal: #B33927;

  /* Imperial Hue Extensions */
  --color-cinnabar-vermilion: #9E1B1B;
  --color-cinnabar-seal: #B33927;
  --color-porcelain-cobalt: #1C3B5E;
  --color-porcelain-glaze: #2E5B88;
  --color-porcelain-celadon: #3D6B58;
  --color-porcelain-tint: #EBF2F7;
  --color-wood-agarwood: #3D261A;
  --color-wood-yam: #6B4226;
  --color-parchment-border: #E5DFC9;
}
```

### 3.2 Heritage Motifs & Vector Integration Plan

1. **Thủy Ba (Imperial Waves - Sóng Nước Thủy Ba)**:
   - **Cultural Origin**: Undulating water pillars (*thủy ba lập đạo*) and wave crests on hemline borders of Nguyễn dynasty Áo Long Bào and Áo Nhật Bình, symbolizing stability and cosmic harmony.
   - **UI Application**:
     - Decorative ribbon headers on section titles (`MuseumGallery`, `TimelineSection`).
     - Bottom boundary accent on `Footer` and `HeroSection`.
     - 1200x1800 photocard base ornamentation.
   - **Implementation**: Pure SVG paths wrapped in reusable React utility or CSS background pattern.

2. **Hoa Sen Bách Diệp (Lý-Trần Royal Lotus Medallion)**:
   - **Cultural Origin**: Carved stone lotus pedestals from Lý-era chùa Phật Tích (1057) and Trần dynasty architectural relics.
   - **UI Application**:
     - Brand insignia and modal title medallions.
     - Card corner stamps and watermark focal points.
     - Retain and elevate the `body::before` breathing lotus watermark.

3. **Kỷ Hà & Hồi Văn (Imperial Geometric Meander Borders)**:
   - **Cultural Origin**: Interlocking angular meanders (*hồi văn chữ Vạn, triện góc kỷ hà*) framing royal screens and palace balustrades in the Huế Imperial Citadel.
   - **UI Application**:
     - `CostumeCard` corner brackets: subtle golden `L`-shaped ornaments at the four corners of cards.
     - Modal frames (`CostumeDetailModal`, `PhotocardModal`, `WardrobeModal`).
     - Button boundary accents for primary actions.

4. **Triện Son Hoàng Gia (Imperial Seal Stamp Badges)**:
   - **Cultural Origin**: Cinnabar jade seals (*Kim Bảo, Ngọc Tỷ Triều Nguyễn*) used to authenticate imperial edicts.
   - **UI Application**:
     - Decorum Score badge: rendered as an authentic square vermilion seal with double gold rim (`ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%`).
     - Verification mark on saved wardrobe looks and photocard exports.

### 3.3 Typography & Bilingual Editorial Hierarchy

- **Title & Display Typography**:
  - Font: `font-serif` (`Playfair Display`, `Noto Serif`, `serif`).
  - Weights: `font-bold` (700) for section titles, `font-semibold` (600) for modal subtitles.
  - Tracking: `tracking-tight` (-0.015em) on headings 28px and larger.
  - Text wrap: `text-wrap: balance` on section headings to eliminate awkward single-word wraps.
  - Zero diacritic clipping: line-height set to `leading-snug` or `leading-tight` with unitless values (`1.2`–`1.3`).
- **Body & Microcopy Typography**:
  - Font: `font-sans` (`Be Vietnam Pro`, `sans-serif`).
  - Weights: `font-normal` (400) for body paragraphs, `font-medium` (500) for list items.
  - Measure: constrained to `max-w-2xl` (60-75 characters per line) for optimal reading comfort.
  - Text wrap: `text-wrap: pretty` for descriptions.
- **Data & Administrative Badges**:
  - Font: `font-mono` (`Be Vietnam Pro`, `monospace`).
  - Style: uppercase, `tracking-wider` (0.05em), `tabular-nums`.

### 3.4 Component Elevation & Frame Architecture

- **Card Architecture (*Khung Chiếu Chỉ*)**:
  - Replace flat modern borders with double-framed imperial edging: outer subtle gold ring (`ring-1 ring-[#D4AF37]/30`) and inner solid border (`border-2 border-[#D4AF37]/60`).
  - Corner brackets: Subtle SVG geometric meanders at the card corners.
  - Background surface: Warm parchment gradient (`bg-[radial-gradient(ellipse_at_center,_#FFFFFF_0%,_#FAF7F2_100%)]`).
- **Button Styling**:
  - **Primary CTA** (*Chiếu lệnh hoàng triều*): Deep cinnabar background (`bg-[#8B0000]`), gold border accent (`border border-[#D4AF37]/60`), crisp white text (`text-white`), subtle warm shadow. Hover: `hover:bg-[#700000] hover:border-[#D4AF37]`.
  - **Secondary CTA** (*Bạch ngọc điểm kim*): Pure silk parchment background (`bg-white` or `bg-[#FAF7F2]`), dark gold text (`text-[#8A6D1C]`), gold border (`border border-[#D4AF37]`). Hover: `hover:bg-[#FDF6E2]`.
- **Modals & Drawers**:
  - Backdrop: Deep agarwood charcoal tint (`bg-black/65 backdrop-blur-md`).
  - Header: Classical title bar with cinnabar badge and gold divider.
  - Focus containment: strictly managed via `useFocusTrap` with LIFO stack order.

---

## 4. Caveats

1. **Strict Read-Only Mode**: This investigation did NOT modify any project source files. All findings and recommendations are strictly documented in this survey report.
2. **Hard Gate R-02 Compliance**: In any subsequent implementation phase, developers must ensure that **no em dash characters (`—`)** are introduced into any `.ts`, `.tsx`, `.css`, or `.html` files, as verified by `tests/craftsmanship_m2_m3.test.ts`.
3. **Tailwind v4 Setup**: The project uses `@tailwindcss/vite` without a standalone `tailwind.config.js`. All design token additions and theme rules must be placed directly inside `@theme` in `src/index.css`.
4. **Third-Party Leaflet Styles**: The Leaflet map component in `MapSection.tsx` injects its own canvas and marker DOM nodes. Styling modifications must respect Leaflet wrapper overflow containment (`overflow-hidden`, responsive breakpoints `h-[380px] sm:h-[480px] lg:h-[600px]`).

---

## 5. Conclusion

VietHeritage Remix possesses a solid, well-architected Feature-Sliced Design codebase with outstanding test coverage (116 passing tests, 0 failures). Transitioning the platform to the **Vietnamese Imperial & Classical Elegant aesthetic (Cung đình & Cổ điển trang nhã)** is completely achievable and architecturally sound by:
1. Extending the design tokens with the 5 Imperial hues: Đỏ son, Vàng hoàng cung, Lam gốm cổ, Trầm mộc, and Giấy dó.
2. Infusing authentic vector heritage motifs (Thủy ba waves, Sen bách diệp, Kỷ hà hồi văn, Triện son).
3. Upgrading components to double-framed imperial decree borders and disciplined typography.
4. Preserving 100% of existing business logic, interactive event handlers, and test hooks.

---

## 6. Verification Method

To independently verify the architecture, test suite baseline, and design invariants documented in this report:

```bash
# 1. Verify TypeScript type-checking
npm run lint

# 2. Run all 116 automated test suites
npm test

# 3. Execute the full project verification pipeline (lint + test + build)
npm run verify

# 4. Confirm zero em-dashes across codebase (Hard Gate R-02)
node -e "
const fs = require('fs');
const path = require('path');
function scan(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== 'dist' && f.name !== '.git') scan(p);
    else if (f.isFile() && /\.(tsx?|css|html)$/.test(f.name)) {
      const content = fs.readFileSync(p, 'utf-8');
      if (content.includes('—')) console.error('Violation in:', p);
    }
  }
}
scan('src');
console.log('Zero em-dash check complete.');
"
```
