# Comprehensive Feature & Logic Survey Report: VietHeritage Remix

**Author**: Explorer 2 (Feature & Logic Explorer)  
**Date**: 2026-10-10  
**Target Repository**: `c:\Users\TRAN HIEU\Desktop\vietheritage-remix---gen-z-heritage-co-creation-platform`  
**Purpose**: Exhaustive catalog of all functional features, business logic, data models, state transitions, DOM contracts, and interactive flows that MUST be 100% preserved during the traditional Vietnamese Imperial & Classical UI/UX redesign.

---

## 1. Observation

Direct code analysis, test execution, and static AST inspection across the repository revealed the following concrete architectural and functional facts:

### 1.1 Build & Test Baseline
- Command `npm run verify` executed with exit code 0.
- 116 automated unit and integration tests across 27 suites passed with 0 failures (`tests 116, suites 27, pass 116, fail 0`).
- TypeScript type checking (`tsc --noEmit`) succeeded with 0 errors.
- Production bundle (`vite build`) compiled successfully in 1.03s generating 12 chunks.

### 1.2 Tech Stack & Dependencies (`package.json`)
- React 19 (`react@^19.0.1`, `react-dom@^19.0.1`)
- Vite 8 (`vite@^8.3.0`, `@vitejs/plugin-react@^6.1.1`)
- Tailwind CSS v4 (`tailwindcss@^4.3.3`, `@tailwindcss/vite@^4.3.3`)
- Motion (`motion@^12.23.24`)
- Lucide React (`lucide-react@^0.546.0`)
- Leaflet & React-Leaflet (`leaflet@^1.9.4`, `react-leaflet@^5.0.0`, `@types/leaflet@^1.9.22`)
- Google GenAI SDK (`@google/genai@^2.4.0`)
- Express & Serverless backend (`express@^4.21.2`, `@vercel/node@^23.0.0`, `dotenv@^17.2.3`)
- Testing harness: Native Node.js Test Runner with `tsx` (`tsx --test tests/*.test.ts`)

### 1.3 Architectural Layering (Feature-Sliced Design)
The project is organized in strict Feature-Sliced Design (FSD) architecture:
- `src/app/`: Application orchestrator, root layout, skip navigation, global modals composition.
- `src/features/`: Isolated business domains:
  - `anatomy`: 2D layered anatomy flaps, garment layer toggles, hotspot inspection.
  - `chat`: Gemini AI cultural advisor drawer with preset prompt chips.
  - `community`: Community lookbook gallery, like interactions, look persistence.
  - `heritage-map`: Leaflet territorial sovereignty map, maritime markers, regional filters.
  - `home`: Hero section, dual hub CTA routing, responsive stat counters.
  - `museum`: Digital museum gallery, 4K photo/split-slider/vector card modes, historical detail modal.
  - `studio`: Personal Color analysis, Virtual Try-On pipeline, 1200x1800 Photocard export.
  - `timeline`: Dynastic timeline, silhouette evolution, dual-dynasty comparison mode.
  - `wardrobe`: Saved outfits drawer, local inventory management, delete confirmation.
  - `wisdom`: Cultural wisdom carousel, randomizer, clipboard citation copy.
- `src/shared/`:
  - `components`: `Navbar.tsx`, `Footer.tsx`.
  - `data`: Master costume collection (`costumes.ts`).
  - `hooks`: `useAudio.ts` (Web Audio pentatonic synthesizer), `useFocusTrap.ts` (APG modal focus trap).
  - `i18n`: Dictionaries for Vietnamese (`vi.ts`) and English (`en.ts`).
  - `lib`: `guardrails.ts`, `personalColor.ts`, `storage.ts`, `imageCompression.ts`, `api.ts`.
  - `types`: TypeScript interfaces (`costume.ts`, `dynasty.ts`, `wisdom.ts`, `anatomy.ts`, `map.ts`).
- `server/`:
  - `geminiService.ts`: Multimodal Gemini 3.1 Flash Image integration, Gemini 2.5 Flash chat/styling.
  - `handlers.ts`: Unified API handlers, sliding-window `RateLimiter` (60 req/min per IP).

---

## 2. Logic Chain: Comprehensive Feature & Flow Mapping

### 2.1 State Management & Application Lifecycle (`App.tsx`)

#### Global State Matrix
| State Variable | Type | Default Value | Source / Trigger | Downstream Effects |
|---|---|---|---|---|
| `lang` | `'vi' \| 'en'` | `'vi'` | `localStorage.getItem('vheritage_lang')` / `#langToggleBtn` | Passed to all child sections, alters bilingual copy throughout |
| `activeHub` | `'hub1' \| 'hub2'` | `'hub1'` | Navbar tab click / Hero CTA click | Scrolls to `#museumSection` or `#studioSection`, sets `aria-current="page"` |
| `isWardrobeOpen` | `boolean` | `false` | `#openWardrobeBtn` / Navbar / Lookbook action | Toggles `WardrobeModal` with `useFocusTrap` |
| `isPhotocardOpen`| `boolean` | `false` | Action in `StylingResults` ("Tạo Thẻ Sứ Giả Di Sản") | Toggles `PhotocardModal` with `useFocusTrap` |
| `isChatOpen` | `boolean` | `false` | `#floatingChatButton` | Slides open `ChatDrawer` drawer with `inert` toggle |
| `photocardData` | `PhotocardState` | Initialized state | Populated by `StudioSection.onOpenPhotocard` | Supplies photo, costume, dyes, score, destination to Canvas |

#### Top-Level View Ordering in `App.tsx`
1. Skip Link: `<a href="#mainContent">` (Accessible skip to main content)
2. `<Navbar />` (Sticky header, z-40)
3. `<main id="mainContent">`:
   - `<HeroSection />`
   - `<div id="museumSection"><MuseumGallery /></div>` (Lazy loaded)
   - `<AnatomySection />` (Lazy loaded)
   - `<TimelineSection />`
   - `<WisdomCarousel />`
   - `<MapSection />` (Lazy loaded)
   - `<div id="studioSection"><StudioSection /></div>` (Lazy loaded)
   - `<CommunityGrid />` (Lazy loaded)
4. Modals & Portals:
   - `<ChatDrawer />` (Lazy loaded)
   - `<WardrobeModal />`
   - `<PhotocardModal />`
   - Floating Chat Trigger: `#floatingChatButton`
5. `<Footer />`

---

### 2.2 Feature 1: Digital Museum & Historical Inspection (`features/museum`)

#### Components
- `MuseumGallery.tsx`: Filterable costume grid, global display mode switcher, search filter, lightbox viewer.
- `CostumeCard.tsx`: Individual costume card with triple view mode (Vector, Split, Real 4K).
- `CostumeDetailModal.tsx`: Comprehensive modal dossier with tabbed historical and tailoring metadata.

#### State & Interactive Controls
1. **Search & Filter**:
   - `searchQuery`: Text input `#costumeSearchInput`, live filtering across `nameVi`, `nameEn`, `fabricsVi`, `fabricsEn`, `philosophyVi`, `philosophyEn`, `era`, `form`.
   - `filter`: Category filter buttons: `'all'`, `'nguyen'`, `'ly-tran-le'`, `'folk'`.
   - Empty state reset button: "Đặt Lại Bộ Lọc".
2. **Display Modes**:
   - `globalMode` / `localMode`:
     - `'real'`: Displays 4K photography (`c.realPhotography.heroPhoto`), location badge, and "Soi Nếp May" button triggering lightbox.
     - `'split'`: Interactive comparison slider using CSS `clipPath: inset(0 calc(100% - ${splitPos}%) 0 0)`. Range input: `min="0"`, `max="100"`, `value={splitPos}` with live percent indicator.
     - `'svg'`: Injected vector art (`c.svgIllustration`).
3. **Detail Modal (`CostumeDetailModal`)**:
   - Triggered by card click or bottom CTA button "Xem Hồ Sơ Lịch Sử".
   - Displays historical era, fabric details, ethical symbolism, 4K photo with enlarge button.
   - Internal language toggle (`vi` vs `en`).

#### Master Costume Dataset (6 Iconic Vietnamese Garments)
1. `ngu-than`: Áo Ngũ Thân (Tay Chẽn & Áo Tấc) - 1744 Triều Nguyễn (5 thân vải, cổ lập lĩnh, 5 khuy nữu, đường trung phùng).
2. `nhat-binh`: Áo Nhật Bình - Triều Nguyễn (Cổ chữ nhật, hoa văn Loan Phượng, dải Ngũ hành, Tam Sơn Thủy Ba).
3. `giao-linh`: Áo Giao Lĩnh - Thời Lý, Trần, Hậu Lê (Cổ vắt chéo Hữu Nhậm, tà áo thướt tha).
4. `tu-than`: Áo Tứ Thân - Dân gian Kinh Bắc (4 vạt lụa, yếm đào, nón quai thao, bao tượng).
5. `ba-ba`: Áo Bà Ba - Dân gian Nam Bộ (Cổ tròn, xẻ tà hông, túi vuông, khăn rằn, guốc mộc).
6. `ao-dai`: Áo Dài Truyền Thống - Triều Nguyễn đến Đương đại (Cổ cao, 2 tà trước sau buông rủ, quần lụa trắng).

---

### 2.3 Feature 2: 2D Layered Anatomy Flaps (`features/anatomy`)

#### Components
- `AnatomySection.tsx`: Master container, costume selector, flap open/close trigger, reference photo lightbox.
- `CostumeStage.tsx`: Interactive SVG stage with layered visual elements and hotspot pins.
- `HotspotCard.tsx`: Editorial panel detailing tailored anatomy points, tailoring technique, and philosophy.

#### State & Layer Mechanics
- `activeCostumeKey`: Selected preset key (`ngu-than`, `nhat-binh`, `giao-linh`, `tu-than`, `ba-ba`, `ao-dai`).
- `flapsOpen`: Boolean toggle. When `true`:
  - Left flap (`flapLeftSvg`) translates `-108%` and rotates `-2deg` with opacity `0.5`.
  - Right flap (`flapRightSvg`) translates `108%` and rotates `2deg` with opacity `0.5`.
  - Reveals middle flap (`midSvg`) representing the 5th humble flap (*Thân con*).
- `activeLayer`: `'all'`, `'inner'` (only white Don Y tunic), `'mid'` (5th flap), `'outer'` (outer coat).
- `activeHotspot`: ID of current active hotspot (default `'1'`).
- `isLightboxOpen`: Toggles 4K photographic reference dialog.

#### Hotspot Data Model (`AnatomyHotspot`)
Each preset contains up to 6 numbered hotspots:
- `id`: `'1'` through `'6'`.
- `pos`: Absolute positioning CSS string (e.g. `top-12 left-1/2 -translate-x-1/2`).
- `badgeVi` / `badgeEn`: Cultural hotspot badge.
- `titleVi` / `titleEn`: Philosophical title.
- `contentVi` / `contentEn`: Historical tailoring narrative.
- `philosophyVi` / `philosophyEn`: Moral philosophy code (e.g. "Chính trực · Đạo Nho").
- `tailoringVi` / `tailoringEn`: Tailoring craft technique (e.g. "Lập lĩnh vuông · Khâu giấu chỉ").

---

### 2.4 Feature 3: Historical Dynastic Timeline (`features/timeline`)

#### Components
- `TimelineSection.tsx`: Dynasty carousel, dual-dynasty comparison layout, jump to studio trigger.
- `dynastiesTimeline.ts`: Dataset covering 5 major historical periods.

#### State & Logic
1. `selectedDynastyId`: Active dynasty milestone (`'ly'`, `'tran'`, `'le'`, `'nguyen'`, `'hien-dai'`).
2. `isCompareMode`: Boolean toggle (`#btnToggleTimelineCompare`).
   - When `false`: Renders single dynasty view with 260px SVG silhouette illustration, archaeological source, and 4 sartorial feature cards (Collar, Sleeves, Hemline, Hair/Headwear).
   - When `true`: Renders dual side-by-side comparison cards (`selectedDynasty` vs `compareDynasty`).
3. `compareDynastyId`: Secondary dynasty selector dropdown with `<select aria-label="Chọn triều đại so sánh thứ hai">`, automatically disables the primary selected dynasty option.
4. Studio Navigation: `.timeline-jump-studio-btn` triggers `onSelectCostume(primaryCostumeId)` or scrolls smoothly to `#studioSection`.

#### Dynasties Timeline Dataset
1. **Ly Dynasty (1009 - 1225)**: Ethereal X-Silhouette, Giao Linh short blouse + Thuong pleated skirt, Buddhist serene philosophy, source: Phat Tich Pagoda reliefs. Primary costume: `giao-linh`.
2. **Tran Dynasty (1225 - 1400)**: Structured H-Silhouette, Vien Linh round collar + martial cut, Dong A valour, source: Pho Minh Pagoda warriors. Primary costume: `giao-linh`.
3. **Later Le Dynasty (1428 - 1789)**: Grand A-Silhouette, Trang Vat long crossover coat + Bo Phuc square badge, Hong Duc legal codification, source: Nguyen Trai portrait. Primary costume: `giao-linh`.
4. **Nguyen Dynasty (1802 - 1945)**: Columnar Silhouette, Lap Linh stand collar, 5 buttons, Ta Canh Cung smiling hem, source: Kham Dinh Dai Nam Hoi Dien Su Le. Primary costume: `ngu-than`.
5. **Modern Era (1930 - Present)**: Curvilinear Silhouette, Le Mur/raglan sleeves, Gen Z heritage revival. Primary costume: `ao-dai`.

---

### 2.5 Feature 4: Cultural Wisdom & Proverb Carousel (`features/wisdom`)

#### Components
- `WisdomCarousel.tsx`: Interactive wisdom snippet display with citation copy.
- `wisdomSnippets.ts`: Dataset of 10 cultural wisdom quotes.

#### State & Controls
1. `currentIndex`: Integer index [0, 9].
2. `#btnNextWisdom`: Cyclic pagination `(prev + 1) % CULTURAL_WISDOM_SNIPPETS.length`.
3. `#btnRandomWisdom`: Randomizer that guarantees divergence when pool > 1 (`next !== current`).
4. `#btnCopyWisdom`: Copies formatted citation text to `navigator.clipboard.writeText`:
   `"${snippet.titleVi}"\n\n${snippet.factVi}\n\nTriết lý: ${snippet.philosophyVi}\n(Nguồn: ${snippet.source} · ${snippet.eraVi})`
   Displays `#copyWisdomText` with "✓ Đã sao chép" for 2500ms.

#### Core Curated Knowledge Entries
- 5 Buttons & The Five Constant Virtues (*Ngũ Thường: Nhân, Nghĩa, Lễ, Trí, Tín*).
- The Hidden Fifth Flap (*Thân con*) & Humility (*Tứ thân phụ mẫu*).
- Center Spine Seam (*Đường Trung Phùng*) & Moral Rectitude.
- The Inviolable *Hữu Nhậm* Rule (Left-over-right for life; right-over-left *Tả Nhậm* for funeral shrouds).
- Imperial *Nhật Bình* Color Hierarchy (Empress yellow, princess red, consort violet/blue).
- *Tam Sơn Thủy Ba* Embroidery (Three mountains and sacred waves asserting territorial sovereignty).
- *Khăn Đóng Chữ Nhân* (Turban folds forming the character "Humanity").
- *Khâu Giấu Chỉ* Master Stitching (Hidden stitches creating smiling hem).
- *Lãnh Mỹ A* (Black diamond lacquer silk dyed with Mac Nua tree sap).
- Traditional Solid Silver Torc (*Kiềng Bạc*).

---

### 2.6 Feature 5: Heritage Map & Territorial Sovereignty (`features/heritage-map`)

#### Components
- `MapSection.tsx`: Leaflet interactive container, region filter strip, display toggles.
- `ProvinceHotspot.tsx`: Custom Leaflet markers with popups.
- `leafletMarkers.ts`: 7 geographic coordinates.
- `regionsData.ts`: 6 regional definitions.
- `mapLocations.ts`: Directory of certified rental shops, museums, and photo spots.

#### State & Logic
1. `activeRegId`: Region filter (`'all'`, `'bac-bo'`, `'mientrung-hue'`, `'namtrungbo-hoian'`, `'hoang-sa-truong-sa'`, `'tay-nguyen'`, `'nam-bo'`).
2. `showAll`: Toggle between all markers and key city hubs only.
3. `showLabels`: Toggle marker label visibility.
4. Filter calculation:
   - When `activeRegId !== 'all'`, filters by marker `regionId`.
   - When `showAll === false`, excludes markers with `type !== 'city'` (excludes sovereign islands in key-hubs-only view).
   - Live counter: Displays dynamic count `{filteredMarkers.length} điểm`.

#### Geographic Markers Dataset
1. `hoang-sa`: Sovereign maritime archipelago (16.5, 112.0) - Da Nang City, sacred sovereignty.
2. `truong-sa`: Sovereign maritime archipelago (9.5, 114.0) - Khanh Hoa Province, sacred sovereignty.
3. `ha-noi`: Capital City (21.0285, 105.8542) - Giao Linh, Tu Than, Ngu Than.
4. `hue`: Imperial City (16.4637, 107.5909) - Nhat Binh, Ao Tac, Imperial Ngu Than.
5. `da-nang`: Hoi An Ancient Town (15.8801, 108.3380) - Sa The Ngu Than, Ma Chau Silk.
6. `tay-nguyen`: Central Highlands (12.6667, 108.0500) - Vay Tam, Zeng brocade weaving.
7. `hcmc`: Saigon (10.8231, 106.6297) - Ao Ba Ba, Southern Six Provinces Ngu Than.

---

### 2.7 Feature 6: Co-Creation Studio, Personal Color & Virtual Try-On (`features/studio`)

#### Components
- `StudioSection.tsx`: Orchestrator connecting virtual try-on, styling results, and cultural guardrails.
- `VirtualTryOn.tsx`: Configuration panel with photo upload, costume selection, and advanced options.
- `StylingResults.tsx`: Results display, AI status banner, lookbook photocard trigger, community sharing.
- `CulturalGuardrail.tsx`: Real-time cultural decorum alert panel.
- `PhotocardModal.tsx`: High-fashion 1200x1800 Canvas export modal.

#### State & Input Parameters (`VirtualTryOnState`)
- `userPhotoUrl`: Base64 or object URL of user photo.
- `selectedCostumeId`: Selected costume slug (default `'ngu-than'`).
- `selectedDestination`: Slugs `'hoang-thanh'`, `'dai-noi-hue'`, `'hoi-an'`, `'chua-den'`, `'cafe'`.
- `selectedUndertone`: `'autumn'`, `'spring'`, `'summer'`, `'winter'`.
- `height` (cm): Default `165`.
- `weight` (kg): Default `52`.
- `bodyShape`: `'hourglass'`, `'pear'`, `'rectangle'`, `'inverted-triangle'`.
- `bottomChoice`: `'pant'` (quần thụng lụa trắng), `'skirt'` (váy quấn gấm), `'short'` (quần short - breach).
- `collarChoice`: `'huu-nham'` (left over right), `'ta'` / `'ta-nham'` (right over left - breach).
- `weather`: `'cold-18'` (autumn/winter), `'warm-28'` (summer).
- `colorHex`: Natural dye hex codes (`#8B0000`, `#D4AF37`, `#1C3144`, `#6B4226`, `#8B1E3F`, `#6B8E23`).
- `isAnalyzing`: Boolean loading state.

#### Core Business Calculations

##### 1. Cultural Guardrail Algorithm (`evaluateGuardrails` in `src/shared/lib/guardrails.ts`)
- **Starting Score**: `98` points.
- **Rule 1 - Short Bottom Breach (`ERR_NGU_THAN_SHORT`)**:
  - Triggers if `costumeId` in `['ngu-than', 'nhat-binh', 'giao-linh', 'ao-dai']` AND `bottomChoice === 'short'`.
  - Severity: `error`. Score deduction: `-45`.
- **Rule 2 - Ta Nham Lapel Inversion (`ERR_GIAO_LINH_COLLAR`)**:
  - Triggers if `costumeId === 'giao-linh'` AND `collarChoice` in `['ta', 'ta-nham']`.
  - Severity: `error`. Score deduction: `-40`.
- **Rule 3 - Sacred Site Decorum (`ERR_LOCATION_RESPECT`)**:
  - Triggers if `destination` in `['chua-den', 'hoang-thanh', 'van-mieu']` AND `bottomChoice === 'short'`.
  - Severity: `error`. Score deduction: `-30`.
- **Rule 4 - Imperial Yellow Advisory (`WARN_ROYAL_YELLOW`)**:
  - Triggers if `costumeId === 'nhat-binh'` AND `colorHex` in `['#D4AF37', 'yellow', '#FFD700']`.
  - Severity: `warning`. Score deduction: `-5`.
- **Clamping**: Cumulative score clamped to `[10, 100]`.
- **Clean Outfits**: If breaches length === 0, renders `✓ ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%`.

##### 2. Personal Color Analysis Algorithm (`analyzePersonalColor` in `src/shared/lib/personalColor.ts`)
- Evaluates 4 seasonal color profiles with default fallback to `autumn` (Warm Olive / Golden Honey).
- Returns tailored `season`, `seasonKey`, `paletteSuggestions`, `recommendedCostume`, and 3 curated traditional dyes from `TRADITIONAL_DYES`:
  - `spring`: Vàng Hoàng Yến (`#D4AF37`), Xanh Hương Cốm (`#6B8E23`), Đỏ Son (`#9E1B1B`).
  - `summer`: Xanh Chàm (`#1C3144`), Đỏ Củ Dền (`#8B1E3F`), Xanh Hương Cốm (`#6B8E23`).
  - `autumn`: Nâu Củ Nâu (`#6B4226`), Vàng Hoàng Yến (`#D4AF37`), Đỏ Củ Dền (`#8B1E3F`).
  - `winter`: Đỏ Son (`#9E1B1B`), Xanh Chàm (`#1C3144`), Đỏ Củ Dền (`#8B1E3F`).
- Computes BMI: `(weight / ((height/100) ^ 2)).toFixed(1)`.
- Tailors silhouette advice across 4 body shapes (`pear`, `hourglass`, `inverted-triangle`, `rectangle`).
- Generates context-aware lookbook recommendations conditioned on weather (`cold-18` vs `warm-28`) and destination (sacred vs street).

##### 3. Virtual Try-On Pipeline & API Protocol (`handleTryOn`)
1. User uploads photo -> Client-side canvas compression (`compressImage`) downsizes to max 1024px JPEG at 82% quality (< 1MB).
2. UI submits `POST /api/gemini/try-on` with payload `{ userPhotoBase64, costumeId, costumeName, colorHex, destinationId, gender }`.
3. Backend checks rate limit (sliding window 60 req/min).
4. Backend prompts Gemini visual model (`gemini-3.1-flash-image`) with reference costume photo and identity preservation constraints.
5. In live mode: returns generated editorial image base64; in offline mode: returns authentic historical reference fallback image from `FALLBACK_TRY_ON_IMAGES`.
6. UI displays `tryOnMeta` status banner (`role="status"`, `aria-live="polite"`), rotating status steps (`ROTATING_TRY_ON_STEPS`), and expert Gemini styling advice.

---

### 2.8 Feature 7: Indochine Editorial Photocard Export (`PhotocardModal.tsx`)

#### Specifications
- Renders an Indochine High-Fashion Editorial Card on an HTML5 `<canvas>` element sized exactly **1200 x 1800 px**:
  - Outer background: `#FAF7F2` (Linen).
  - Double border: Outer `#D4AF37` (14px), Inner `#8B0000` (2px).
  - Header: `✦ VIETHERITAGE REMIX · SỨ GIẢ DI SẢN ✦` in bold monospace.
  - Subtitle: `INDOCHINE HIGH-FASHION EDITORIAL ARCHIVE`.
  - Portrait box: Clipped to `(100, 200, 1000, 1000)` with gold border.
  - Lower info panel `(100, 1230, 1000, 460)`:
    - Costume name in 44px bold serif.
    - Destination and Personal Color season text.
    - Cultural decorum badge: `CULTURAL DECORUM: ${score}%` with green background.
    - Traditional natural dye swatches (up to 3 circles with hex fill and Vietnamese names).
  - Footer copyright: `VIETHERITAGE REMIX © 1744 - 2026 · SỐ HÓA & BẢO TỒN CỔ PHỤC VIỆT`.
  - Triggers browser download of `vietheritage-envoy-${Date.now()}.png`.

---

### 2.9 Feature 8: Community Heritage Lookbook & Wardrobe Storage (`storage.ts`)

#### Storage Keys & Interfaces
- `vheritage_community_v1`: Array of `CommunityLook` objects. Seeded with 4 initial looks if empty.
- `vheritage_wardrobe_v1`: Array of `WardrobeItem` objects saved by user.
- `vheritage_current_user_v1`: `UserContext` (`isLoggedIn`, `name`, `email`).
- `vheritage_lang`: User selected language (`'vi'` or `'en'`).

#### Key Operations
- `saveToWardrobe`: Prepends new look item to wardrobe array.
- `removeFromWardrobe`: Removes look by ID with confirmation prompt (`confirmDeleteId`).
- `likeCommunityLook`: Increments `likes` count on community item.
- `saveCommunityLook`: Publishes a new user creation to community lookbook.
- SSR Safety: All operations check `typeof window !== 'undefined'` and catch storage quota errors gracefully.

---

### 2.10 Feature 9: Cultural Advisor AI Chat Drawer (`features/chat`)

#### Components
- `ChatDrawer.tsx`: Off-canvas sliding drawer (`inert` when closed).
- `ChatMessage.tsx`: Message bubble with typewriter streaming effect and safe `**bold**` parsing.

#### Flow & Behavior
1. Triggered via `#floatingChatButton` with `aria-expanded` and `aria-haspopup="dialog"`.
2. Initial welcome message from "Cố Vấn Điển Chế Phục Trang (V-Heritage Cultural Stylist)".
3. Quick-reply prompt chips:
   - "Tư vấn đồ đi Huế tháng 10" (`'hue'`)
   - "Ý nghĩa hoa văn Áo Nhật Bình" (`'nhatbinh'`)
   - "Phối Áo Ngũ Thân Gen Z" (`'nguthan'`)
4. Input form triggers simulated or live conversational consultation with cultural guardrails.
5. Automatically scrolls to bottom on new message (`messagesEndRef`).

---

### 2.11 Audio Synthesis & Ambient Music (`useAudio.ts`)
- Implements Web Audio API without external audio files.
- Generates Vietnamese pentatonic scale (*thang âm ngũ cung*):
  `SCALE = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46]` (C4, D4, F4, G4, A4, C5, D5, F5).
- Plays melodic sequence `[0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 4, 2, 3, 4, 1, 2]` at 480ms intervals.
- Simulates plucked zither (*Đàn Tranh*) timbre via triangle oscillator and ADSR gain envelope (linear ramp to 0.22 in 30ms, exponential decay to 0.0001 over 1.4s).
- Controls exposed: `#audioToggleBtn` in Navbar with pulse indicator and `aria-pressed`.

---

## 3. Critical Interactive Contracts & Hard UI Invariants

These contracts are covered by existing automated test suites (`tests/*.test.ts`) and MUST be 100% preserved during the UI redesign:

### 3.1 Hard Gate R-02: Zero Em Dash Rule
- **Contract**: ZERO em dash characters (`—` / `\u2014`) allowed in any source file or dataset.
- **Enforced By**: `tests/craftsmanship_m2_m3.test.ts` scanning `COSTUMES_DATA`, `ANATOMY_PRESETS`, `DYNASTIES_TIMELINE_DATA`, `CULTURAL_WISDOM_SNIPPETS`, and all files in `src/`.
- **Replacement**: Use hyphens (`-`), colons (`:`), or dots (`·`).

### 3.2 APG Focus Trap & Modal Dialogs (`useFocusTrap.ts`)
- **Contract**:
  1. `role="dialog"`, `aria-modal="true"`, `tabIndex={-1}` on modal containers.
  2. Tab and Shift+Tab wrap strictly within topmost modal.
  3. LIFO Escape dismissal: When multiple modals are stacked (e.g. Gallery -> Detail Modal -> 4K Lightbox), Escape dismisses ONLY the topmost modal without bubbling to background modals.
  4. Body scroll lock: Sets `document.body.style.overflow = 'hidden'` on open and restores previous overflow on close.
  5. Focus restoration: Restores focus to trigger button upon dismissal.
- **Enforced By**: `tests/focusTrapStress.test.ts` & `tests/challenger_m1_lifo_stress.test.ts`.

### 3.3 APG Roving Tabindex & Radiogroups (`VirtualTryOn.tsx`)
- **Contract**:
  1. Costume options container has `role="radiogroup"` and `onKeyDown={handleCostumeKeyDown}`.
  2. Destination options container has `role="radiogroup"` and `onKeyDown={handleDestinationKeyDown}`.
  3. Exactly one radio item has `tabIndex={0}` (the selected item or index 0 if none), while all other items have `tabIndex={-1}`.
  4. Arrow keys (`ArrowRight`, `ArrowDown`, `ArrowLeft`, `ArrowUp`) navigate bidirectionally with circular wrap-around at boundaries.
  5. Non-arrow keys (`Tab`, `Enter`, `Space`, `Escape`, `Shift`) remain transparent without `e.preventDefault()`.
- **Enforced By**: `tests/challenger_m1_lifo_stress.test.ts` (Suite 2) & `tests/accessibility.test.ts`.

### 3.4 Semantic Container & Zero Button Nesting (`CostumeCard.tsx`)
- **Contract**:
  1. Root element MUST be `<article>` semantic container, NOT `<div role="button">` or `tabIndex`.
  2. Zero button nesting: NO `<button>` inside `<button>` or inside `role="button"`.
  3. Bottom CTA is a dedicated `<button type="button">` with accessible name including localized costume name and calling `e.stopPropagation()`.
  4. Mode buttons declare `aria-pressed={localMode === '...'}`.
  5. Split slider declares `type="range"`, `min="0"`, `max="100"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow={splitPos}`, `aria-valuetext={\`${splitPos}%\`}`, and `aria-label`.
- **Enforced By**: `tests/challenger_m1_dom_oracle.test.ts` & `tests/accessibility.test.ts`.

### 3.5 Navbar Accessibility & Identifiers (`Navbar.tsx`)
- **Contract**:
  1. Elements MUST have IDs: `#navLogo`, `#navTabHub1`, `#navTabHub2`, `#audioToggleBtn`, `#openWardrobeBtn`, `#langToggleBtn`, `#authBtn`, `#desktopNavTabs`, `#mobileNavTabs`, `#mobTabHub1`, `#mobTabHub2`.
  2. Active tab exposes `aria-current="page"`, inactive omits it.
  3. All buttons have descriptive `aria-label` in both `vi` and `en`.
  4. Native `lucide-react` icons: `Landmark` and `Palette`.
- **Enforced By**: `tests/challenger_m1_dom_oracle.test.ts` & `tests/craftsmanship_m2_m3.test.ts`.

### 3.6 Color Contrast & Design Tokens (`src/index.css`)
- **Contract**:
  1. Tokens declared in `@theme`: `--color-linen: #FAF7F2`, `--color-crimson: #8B0000`, `--color-gold: #D4AF37`, `--color-gold-dark: #8A6D1C`, `--color-gold-deep: #785E15`, `--color-charcoal: #222222`.
  2. Fonts: `--font-serif: "Playfair Display", "Noto Serif", serif;`, utility `.font-serif`.
  3. Focus indicator:
     ```css
     :focus-visible {
       outline: 2px solid #8B0000 !important;
       outline-offset: 2px !important;
       box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.45) !important;
     }
     ```
  4. Prefers-reduced-motion media query clamping animation/transition durations to `0.01ms !important` and `scroll-behavior: auto !important`.
  5. Contrast ratios must meet WCAG 2.2 AA (>= 4.5:1 on light backgrounds, >= 7.0:1 AAA on charcoal).
- **Enforced By**: `tests/challenger_m1_oracle.test.ts` & `tests/accessibility.test.ts`.

### 3.7 Responsive Viewport & Overflow Protection
- **Contract**:
  1. `body` must declare `overflow-x: hidden`.
  2. Hero section heading removes `whitespace-nowrap` to prevent horizontal blowouts on 320px screens.
  3. All `whitespace-nowrap` elements across the codebase must be housed within `overflow-x-auto` horizontal scroll containers.
  4. Map container responsive heights: `h-[380px] sm:h-[480px] lg:h-[600px]` with `overflow-hidden`.
  5. Styling results grid balanced at 12 columns: `md:col-span-5` (portrait card) and `md:col-span-7` (details).
- **Enforced By**: `tests/challenger_m2_m3_stress.test.ts` (Suite 1).

---

## 4. Caveats

- **Mock AI in Test Runner**: `executeTryOnHandler` and `handleGeminiChat` fall back to offline curated historical data when no `GEMINI_API_KEY` is present. The integration test suite passes using these fallbacks; in production with an active key, the Gemini API is called via `@google/genai`.
- **Leaflet in Node.js Tests**: React-Leaflet tiles cannot be rendered directly in headless Node without jsdom/canvas mocking; unit tests inspect marker models (`LEAFLET_MARKERS`) and component structure statically.
- **Audio Autoplay Policy**: `useAudio` uses Web Audio API and requires a user interaction gesture (click on `#audioToggleBtn`) before initializing the AudioContext to comply with browser autoplay security policies.

---

## 5. Conclusion

VietHeritage Remix possesses a rich, sophisticated heritage architecture combining authentic historical sartorial algorithms (*Điển chế 1744*, *Khâm Định Đại Nam Hội Điển Sự Lệ*), AI multimodal workflows, Web Audio synthesis, HTML5 Canvas graphics generation, and strict WAI-ARIA APG accessibility patterns.

### Actionable Guidance for the UI/UX Redesign Team:
1. **Preserve All Element IDs & Test Hooks**: Do not rename or remove key element IDs (`#navLogo`, `#navTabHub1`, `#navTabHub2`, `#audioToggleBtn`, `#openWardrobeBtn`, `#langToggleBtn`, `#authBtn`, `#btnToggleTimelineCompare`, `#btnRandomWisdom`, `#btnCopyWisdom`, `#copyWisdomText`, `#btnNextWisdom`, `#floatingChatButton`, `#userPhotoUpload`, `#userBodyShapeSelect`, `#userBottomSelect`, `#userWeatherSelect`, `#userColorSelect`, `#undertoneSelect`).
2. **Retain Semantic Layouts & Radiogroups**:
   - `CostumeCard` MUST remain an `<article>` with dedicated `<button>` CTA and no nested buttons.
   - `VirtualTryOn` radiogroups MUST retain roving `tabIndex` and arrow navigation handlers.
3. **Respect Exact Color Tokens & Contrast**: Use the imperial color palette (Cinnabar `#8B0000`, Imperial Gold `#D4AF37`, Dark Bronze `#8A6D1C`, Linen `#FAF7F2`) preserving WCAG contrast ratios.
4. **Never Insert Em Dashes (`—`)**: Always use hyphens (`-`), colons (`:`), or middle dots (`·`) in code, copy, and datasets.
5. **Keep Canvas Coordinates in `PhotocardModal`**: The 1200x1800 export canvas layout depends on precise text offsets and coordinates.
6. **Maintain All 116 Tests Passing**: Run `npm run verify` after every design transformation.

---

## 6. Verification Method

To verify the functional integrity of the platform:

```bash
# 1. Full pipeline verification (Typecheck, 116 tests, Vite build)
npm run verify

# 2. Individual verification steps
npm run lint       # TypeScript noEmit type check
npm test           # Execute 12 test suites (116 tests) via Node test runner & tsx
npm run build      # Vite production bundle build
```

### Invalidation Conditions:
- Any test failure in `tests/*.test.ts` (especially ARIA oracles, roving tabindex, LIFO stress, or zero em dash gate).
- TypeScript compiler errors (`tsc --noEmit` non-zero exit code).
- Production build failure (`vite build` non-zero exit code).
- Inability to cycle dynasties, toggle flaps, copy wisdom citations, or download the 1200x1800 photocard.
