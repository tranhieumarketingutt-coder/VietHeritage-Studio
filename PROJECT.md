# Project: VietHeritage Remix — Vietnamese Imperial & Classical Elegant Redesign

## Architecture
- **Framework**: React 19, Vite 8, TypeScript strict mode.
- **Styling Architecture**: Tailwind CSS v4 via `@tailwindcss/vite`, `@theme` token definitions in `src/index.css`.
- **Aesthetic Direction**: Vietnamese Imperial & Classical Elegant (Cung đình & Cổ điển trang nhã truyền thống Việt Nam)
  - 5 Imperial Hue Families:
    1. Đỏ son / Chu sa (Cinnabar Lacquer Red): `#8B0000`, `#9E1B1B`, `#5C0000`, `#B33927`
    2. Vàng hoàng cung / Thếp vàng (Imperial Gold & Bronze): `#D4AF37`, `#FDF6E2`, `#8A6D1C`, `#785E15`
    3. Lam gốm cổ / Men lam Huế & Men ngọc (Cobalt & Celadon Porcelain): `#1C3B5E`, `#2E5B88`, `#3D6B58`, `#EBF2F7`
    4. Trầm mộc / Củ nâu / Sơn then (Wood Amber & Ebony): `#3D261A`, `#6B4226`, `#222222`
    5. Giấy dó / Bạch ngọc / Tơ tằm (Dó Paper & Raw Silk): `#FAF7F2`, `#F0ECE1`, `#FFFFFF`, `#E5DFC9`
  - Heritage Motifs (SVG / Vector):
    - Sóng nước Thủy Ba (Thủy ba lập đạo / Tam sơn thủy ba)
    - Hoa Sen Bách Diệp (Lý - Trần royal lotus medallion)
    - Kỷ Hà & Hồi Văn (Imperial geometric meander frames & corner brackets)
    - Triện Son Hoàng Gia (Imperial seal stamp badge: Đạt Chuẩn Mực Điển Chế 100%)
    - Chim Hạc / Vân Mây (Royal crane & auspicious clouds)
  - Frame & Card Architecture (*Khung Chiếu Chỉ*):
    - Double hairline borders (gold + cinnabar)
    - Subtle parchment gradient backgrounds
    - Refined Vietnamese typography with `Playfair Display` + `Noto Serif` for headings and `Be Vietnam Pro` for body copy, with zero diacritic clipping.
- **Pattern**: Project Pattern (Feature-Sliced Design: `src/app`, `src/features`, `src/shared`, `server`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Imperial Design System Tokens | 5 Imperial color families, WCAG 2.2 contrast, font tokens, focus indicators in `index.css` | M1 | Survey 1, Survey 3 |
| 2 | Heritage Vector Motifs Library | Reusable SVG primitives: Thủy ba waves, Sen bách diệp, Kỷ hà meander brackets, Triện son seals | M1 | Survey 1 |
| 3 | Khung Chiếu Chỉ Frame & Button System | Double-line imperial frames, scroll brackets, royal decree CTA styles | M1 | Survey 1 |
| 4 | Global Navigation Header (`Navbar`) | Royal header with bronze/gold filigree, audio toggle, wardrobe, language, auth, preserving all IDs & ARIA | M2 | Survey 1, 2, 3 |
| 5 | Global Footer (`Footer`) | Thủy Ba wave footer accent, imperial seal stamp, classical typography | M2 | Survey 1, 2 |
| 6 | Hero Section Proclamation (`HeroSection`) | Proclamation layout, lotus & wave watermarks, 4-item stats cards with meander borders, preserving `#heroGoHub1`/`#heroGoHub2` | M2 | Survey 1, 2, 3 |
| 7 | Cultural Wisdom Scroll (`WisdomCarousel`) | Imperial decree citation scroll, randomizer, cyclical pagination, copy citation to clipboard with toast | M2 | Survey 2, 3 |
| 8 | Digital Museum Gallery & Filter (`MuseumGallery`) | Filterable gallery, 4K photo/split/vector modes, search, responsive layout | M3 | Survey 1, 2, 3 |
| 9 | Royal Costume Card (`CostumeCard`) | Double-framed card, slider range input, mode buttons, dedicated CTA button, strict AST index contracts | M3 | Survey 1, 2, 3 |
| 10 | Costume Dossier & Lightbox (`CostumeDetailModal`) | Dossier dialog, APG focus trap, 4K photo comparison lightbox | M3 | Survey 2, 3 |
| 11 | 2D Layered Costume Anatomy (`AnatomySection`) | Imperial wardrobe atelier, SVG flap unfolding (left/right/mid), 6-point hotspot cards, photo comparison dialog | M3 | Survey 1, 2, 3 |
| 12 | Dynastic Historical Timeline (`TimelineSection`) | Antique stele track, 5 dynastic eras, side-by-side comparison mode, Jump to Studio button with exact AST index | M3 | Survey 2, 3 |
| 13 | Co-Creation Studio Orchestration (`StudioSection`) | Integration of Try-On, Personal Color, and Cultural Guardrails in imperial workshop aesthetic | M4 | Survey 1, 2, 3 |
| 14 | Virtual Try-On Controls (`VirtualTryOn`) | Radiogroups with APG roving tabindex, canvas downsampling, advanced parameters, destination selection | M4 | Survey 2, 3 |
| 15 | Cultural Guardrail Engine (`CulturalGuardrail`) | Real-time decorum scoring, breach alerts, 100% decorum cinnabar seal badge | M4 | Survey 2, 3 |
| 16 | Personal Color & Styling Results (`StylingResults`) | 12-column balanced grid, 4 seasons, natural dyes swatches, empty state with Palette icon, rotating steps | M4 | Survey 2, 3 |
| 17 | Indochine 1200x1800 Photocard (`PhotocardModal`) | HTML5 Canvas high-fashion editorial export with exact coordinate mapping and PNG download | M4 | Survey 2, 3 |
| 18 | Territorial Sovereignty Map (`MapSection`) | Imperial cartographic silk map, Leaflet container with responsive height, regional filters, Hoang Sa & Truong Sa markers | M4 | Survey 1, 2, 3 |
| 19 | Community Lookbook & Wardrobe (`CommunityGrid`, `WardrobeModal`) | Grid of community looks, local storage persistence, wardrobe modal with delete confirmation | M4 | Survey 2, 3 |
| 20 | Cultural Advisor AI Chat (`ChatDrawer`) | Off-canvas drawer, title "Cố Vấn Điển Chế Phục Trang", prompt chips, typewriter streaming, inert when closed | M4 | Survey 2, 3 |
| 21 | Web Audio Pentatonic Synthesizer (`useAudio`) | Pentatonic scale (C4-F5) simulating Đàn Tranh timbre without external audio files | M2 | Survey 2 |
| 22 | Hard Gate R-02 Zero Em Dash Invariant | 0 em dashes (`—`) across all source and data files | M1, M2, M3, M4, M5 | Survey 3 |
| 23 | E2E & Full Verification Suite Pass | Complete passage of `npm run verify` (116/116 tests, 0 TS errors, clean Vite build) | M5 | Survey 3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Imperial Design System & Motifs | `src/index.css`, `src/shared/components/heritage-motifs/`, `ImperialFrame.tsx` | none | PLANNED |
| M2 | Global Shell & Editorial Storytelling | `Navbar.tsx`, `Footer.tsx`, `HeroSection.tsx`, `WisdomCarousel.tsx`, `useAudio.ts` | M1 | PLANNED |
| M3 | Digital Museum, Anatomy & Timeline | `MuseumGallery.tsx`, `CostumeCard.tsx`, `CostumeDetailModal.tsx`, `AnatomySection.tsx`, `CostumeStage.tsx`, `HotspotCard.tsx`, `TimelineSection.tsx` | M1 | PLANNED |
| M4 | Studio, Try-On, Map, Lookbook & Modals | `StudioSection.tsx`, `VirtualTryOn.tsx`, `CulturalGuardrail.tsx`, `StylingResults.tsx`, `PhotocardModal.tsx`, `MapSection.tsx`, `CommunityGrid.tsx`, `WardrobeModal.tsx`, `ChatDrawer.tsx` | M1 | PLANNED |
| M5 | E2E Verification, Polish & Forensic Audit | Full pipeline verification (`npm run verify`), responsive stress testing, anti-slop check, forensic integrity audit | M2, M3, M4 | PLANNED |

## Interface Contracts

### Design Tokens (`src/index.css`)
- Must maintain existing token keys:
  `--color-linen: #FAF7F2`, `--color-linen-dark: #F0ECE1`, `--color-charcoal: #222222`, `--color-crimson: #8B0000`, `--color-crimson-dark: #5C0000`, `--color-gold: #D4AF37`, `--color-gold-light: #FDF6E2`, `--color-gold-dark: #8A6D1C`, `--color-gold-deep: #785E15`, `--color-bronze: #8A6D1C`, `--color-amber-seal: #B33927`.
- Must retain `:focus-visible` with `outline: 2px solid #8B0000 !important` and `box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.45) !important`.
- Must retain `@media (prefers-reduced-motion: reduce)` rules.
- Must retain `overflow-x: hidden` on `body`.
- Add imperial extensions:
  `--color-cinnabar-vermilion: #9E1B1B`, `--color-porcelain-cobalt: #1C3B5E`, `--color-porcelain-glaze: #2E5B88`, `--color-porcelain-celadon: #3D6B58`, `--color-porcelain-tint: #EBF2F7`, `--color-wood-agarwood: #3D261A`, `--color-wood-yam: #6B4226`, `--color-parchment-border: #E5DFC9`.

### Zero Em Dash Contract (Hard Gate R-02)
- Under NO circumstance may the em dash character (`—`, Unicode `\u2014`) be inserted into any `.ts`, `.tsx`, `.css`, or `.html` file.
- Always use hyphens (`-`), colons (`:`), or middle dots (`·`).

### AST & DOM Structure Contracts
- `CostumeCard`: Root MUST be `<article>`, child[2] contains bottom `<button type="button">`.
- `TimelineSection`: Jump to Studio button MUST be located at `tree.props.children[2].props.children[1].props.children[1]` with class `timeline-jump-studio-btn` and text `"Phối Đồ Ngay"`.
- `AnatomySection`: Lightbox dialog MUST have `role="dialog"`, `aria-modal="true"`, with close button as first child having `aria-label="Đóng ảnh đối chiếu"` (or English equivalent).
- `VirtualTryOn`: Radiogroups MUST implement APG roving tabindex with `ArrowRight`, `ArrowDown`, `ArrowLeft`, `ArrowUp` key handling.
- `DOM IDs`: All 27+ IDs listed in the Master Preservation Checklist must remain present and functional.

## Code Layout
```
src/
├── app/
│   └── App.tsx                                  # View orchestrator & global layout
├── features/
│   ├── anatomy/components/                      # 2D layered anatomy flaps & stage
│   ├── chat/components/                         # Gemini Cultural Advisor drawer
│   ├── community/components/                    # Community lookbook & cards
│   ├── heritage-map/components/                 # Cartographic map & markers
│   ├── home/components/                         # Hero proclamation & stats
│   ├── museum/components/                       # Museum gallery, cards, dossiers
│   ├── studio/components/                       # Co-creation studio, try-on, guardrail
│   ├── timeline/components/                     # Dynastic timeline & comparison
│   ├── wardrobe/components/                     # Saved outfits modal
│   └── wisdom/components/                      # Proverb carousel & clipboard
└── shared/
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── heritage-motifs/                     # Imperial vector SVG primitives (M1)
    │       ├── ThuyBaWave.tsx
    │       ├── SenBachDiep.tsx
    │       ├── KyHaBorder.tsx
    │       ├── TrienSonSeal.tsx
    │       └── ImperialFrame.tsx
    ├── hooks/                                   # useAudio, useFocusTrap
    ├── lib/                                     # guardrails, personalColor, storage
    └── i18n/                                    # vi.ts, en.ts
```
