// app.js - Full Interactive Application Controller
import './index.css';
import { COSTUMES_DATA, MAP_LOCATIONS, VIETNAM_REGIONS_DATA, PROVINCE_TO_REGION_MAP, MAP_PROVINCES_HOTSPOTS } from './costumes.js';
import { ANATOMY_PRESETS } from './anatomyData.js';
import { heritageAudio, TRADITIONAL_DYES, analyzePersonalColor, storageHelper, GEMINI_RESPONSES } from './heritageLogic.js';
import mapImageDefault from './assets/images/regenerated_image_1790863673225.jpg';
import { CULTURAL_WISDOM_SNIPPETS } from './wisdomData.js';
import { DYNASTIES_TIMELINE_DATA } from './timelineData.js';

// Application State
const state = {
  lang: localStorage.getItem('vheritage_lang') || 'vi',
  activeHub: (typeof window !== 'undefined' && window.location.hash === '#hub2') ? 'hub2' : 'hub1',
  activeLocationFilter: 'all',
  activeMapRegionId: 'all', // 'all', 'bac-bo', 'mientrung-hue', 'namtrungbo-hoian', 'hoang-sa-truong-sa', 'tay-nguyen', 'nam-bo'
  selectedProvince: 'Hà Nội',
  activeProvinceHotspotId: 'ha-noi',
  showAllHotspotsOnMap: true,
  showMapPinLabels: true,
  customMapImage: (typeof localStorage !== 'undefined' ? localStorage.getItem('vmix_custom_map_image') : null) || null,
  mapFullImageModalOpen: false,
  galleryEraFilter: 'all',
  gallerySearchQuery: '',
  galleryGlobalMode: 'real', // 'real' | 'split' | 'svg' - defaults to authentic realistic photography
  activeAnatomyCostumeId: 'ngu-than', // 'ngu-than', 'nhat-binh', 'giao-linh', 'tu-than', 'ba-ba', 'ao-dai'
  cardImageMode: {}, // { [costumeId]: 'svg' | 'split' | 'real' }
  cardSplitPos: {}, // { [costumeId]: number 0-100 }
  modalPhotoSubTab: 'hotspots', // 'hotspots' | 'split' | 'posing' | 'card'
  modalPhotoSplitVal: 50,
  modalActiveHotspotId: null,
  activeLightboxPhoto: null,
  flapsOpen: false,
  activeLayer: 'all', // 'all', 'inner', 'mid', 'outer'
  activeHotspot: '1',
  activeTimelineDynastyId: 'nguyen', // 'ly', 'tran', 'le', 'nguyen', 'hien-dai'
  timelineCompareMode: false,
  timelineCompareDynastyId: 'ly',
  currentWisdomIndex: 0,
  wisdomCopied: false,
  costumeModalTab: 'history',
  activeCostumeModalId: null,
  userPhotoUrl: '',
  selectedUndertone: 'autumn',
  selectedCostumeId: 'ngu-than',
  selectedDestination: 'hoang-thanh',
  stylingResult: null,
  isAnalyzing: false,
  tryOnResultImage: null,
  tryOnModel: 'gemini-3.1-flash-image',
  tryOnNotes: '',
  tryOnPrompt: '',
  tryOnIsLive: false,
  tryOnError: null,
  user: storageHelper.getUser(),
  audioPlaying: false,
  chatOpen: false,
  highThinking: true,
  chatMessages: [
    {
      sender: 'ai',
      text: 'Xin chào! Mình là **Trợ lý Cổ Phục AI** (Gemini Live Cultural Stylist). Bạn đang lên kế hoạch diện cổ phục đi đâu, hay muốn khám phá triết lý trang phục truyền thống nào hôm nay?',
      enText: 'Hello! I am your **AI Cultural Stylist** (Gemini Live). Where are you planning to wear your traditional outfit, or which cultural philosophy would you like to explore today?'
    }
  ]
};

// UI Translations Dictionary
const I18N = {
  vi: {
    tagline: 'Nền Tảng Đồng Sáng Tạo Cổ Phục Cho Thế Hệ Z',
    navHub1: 'HUB 1: BẢO TÀNG DI SẢN',
    navHub2: 'HUB 2: AI CO-CREATOR',
    wardrobeBtn: 'Tủ Đồ Di Sản',
    communityBtn: 'Bảo Tàng Cộng Đồng',
    loginBtn: 'Tài khoản',
    audioTitle: 'Nhã Nhạc & Bèo Dạt Mây Trôi',
    heroBadge: 'INDOCHINE HIGH-FASHION EDITORIAL 2026',
    heroTitle: 'Di Sản Trong Hơi Thở Đương Đại',
    heroDesc: 'Cầu nối số hóa thế hệ Z và cổ phục Việt Nam. Phục dựng chuẩn xác - Phối đồ thấu đáo - Tôn vinh cội nguồn.',
    exploreBtn: 'Khám Phá Bảo Tàng Số',
    tryOnHeroBtn: 'Thử Đồ AI & Phối Màu',
    stat1: 'Dòng Cổ Phục Chuẩn Sử',
    stat2: 'Nhóm Personal Color Việt',
    stat3: 'Tọa Độ Check-in & Cho Thuê',
    stat4: 'Cultural Guardrail',
    anatomyTitle: 'Bóc Tách Lớp Áo 2D Cho Tất Cả Cổ Phục',
    anatomySub: 'Tương tác trực quan đa dạng cổ phục: Áo Ngũ Thân, Áo Nhật Bình, Áo Giao Lĩnh, Áo Tứ Thân, Áo Bà Ba, Áo Dài.',
    btnToggleFlaps: 'Mở / Đóng Vạt Áo',
    layerAll: 'Đầy đủ các lớp',
    layerInner: 'Chỉ lớp áo lót trắng',
    layerOuter: 'Chỉ áo khoác ngoài',
    museumTitle: 'Bảo Tàng Số Cổ Phục Việt Nam',
    museumSub: 'Tổng hợp 6 tuyệt tác trang phục với tư liệu lịch sử, kỹ thuật dệt may và ý nghĩa triết học sâu sắc.',
    btnViewDetails: 'Xem Chi Tiết Lịch Sử',
    btnTryThis: 'Phối Đồ Với Bộ Này',
    mediaSectionTitle: 'Tư Liệu Điện Ảnh & Thước Phim Di Sản',
    mediaSectionSub: 'Góc nhìn thực tế về chuyển động tà áo ngũ thân và phục dựng cổ phục triều Nguyễn.',
    mapSectionTitle: 'Bản Đồ Không Gian Văn Hóa & Dịch Vụ',
    mapSectionSub: 'Định vị địa chỉ cho thuê trang phục uy tín, bảo tàng trưng bày và tọa độ check-in tại Hà Nội, Huế, TP.HCM.',
    tabAll: 'Tất cả địa điểm',
    tabShop: 'Shop bán/cho thuê',
    tabMuseum: 'Bảo tàng trưng bày',
    tabPhoto: 'Tọa độ chụp ảnh di sản',
    studioTitle: 'V-Studio: Cá Nhân Hóa & Thử Đồ AI',
    studioSub: 'Phân tích Personal Color 4 Mùa cho tông da Việt, phối đồ theo ngữ cảnh điểm đến & thời tiết, rào chắn bảo vệ văn hóa.',
    formPhotoLabel: 'Tải Ảnh Chân Dung (Hoặc chọn mẫu)',
    presetLabel: 'Undertone 4 Mùa:',
    presetAutumn: 'Mùa Thu (Autumn)',
    presetSpring: 'Mùa Xuân (Spring)',
    presetSummer: 'Mùa Hạ (Summer)',
    presetWinter: 'Mùa Đông (Winter)',
    heightLabel: 'Chiều cao (cm)',
    weightLabel: 'Cân nặng (kg)',
    bodyShapeLabel: 'Dáng người',
    shapeHourglass: 'Đồng hồ cát (Hourglass)',
    shapePear: 'Quả lê (Pear)',
    shapeRect: 'Thước kẻ (Rectangle)',
    shapeInverted: 'Tam giác ngược (Inverted)',
    destLabel: 'Điểm đến dự kiến',
    destHoangThanh: 'Hoàng Thành Thăng Long',
    destHoiAn: 'Phố cổ Hội An',
    destTemple: 'Lễ Chùa (Chốn tôn nghiêm)',
    destCafe: 'Cà phê Dạo phố',
    weatherLabel: 'Thời tiết',
    weatherCold18: 'Thu Đông lạnh 18°C',
    weatherSummer32: 'Mùa Hè 32°C',
    costumeSelectLabel: 'Loại cổ phục',
    bottomSelectLabel: 'Trang phục dưới (Quần/Váy)',
    bottomPant: 'Quần thụng lụa trắng (Chuẩn mực)',
    bottomSkirt: 'Thường / Váy quây dệt gấm (Chuẩn mực)',
    bottomShort: 'Quần đùi / Váy ngắn (⚠️ Vi phạm)',
    collarSelectLabel: 'Kiểu cổ áo (Nếu chọn Giao Lĩnh)',
    collarHuu: 'Hữu Nhậm (Vạt trái đè lên vạt phải - Chuẩn)',
    collarTa: 'Tả Nhậm (Vạt trái nằm dưới - ⚠️ Vi phạm)',
    btnAnalyze: 'Phân Tích & Thử Đồ AI',
    scanningText: 'AI đang phân tích cấu trúc khuôn mặt, undertone & vóc dáng...',
    lookbookBadge: 'HIGH-FASHION LOOKBOOK DOSSIER',
    dyeTitle: 'Bảng Màu Nhuộm Tự Nhiên Phù Hợp',
    bodyTitle: 'Tối Ưu Vóc Dáng & Phom Dáng',
    guardTitle: 'Hệ Thống Cảnh Báo Văn Hóa (Cultural Guardrail)',
    btnAddToCommunity: 'Đưa Vào Bảo Tàng Cộng Đồng',
    btnSendEmail: 'Gửi Lookbook về Email',
    btnSaveWardrobe: 'Lưu vào Tủ Đồ Di Sản',
    btnCreatePhotocard: 'Tạo Thẻ Sứ Giả Văn Hóa',
    communityHeader: 'Bảo Tàng Sáng Tạo Cộng Đồng (Live Showcase)',
    communitySub: 'Các bản phối cổ phục ấn tượng từ thế hệ Z được chia sẻ trực tiếp qua nền tảng.',
    btnRemix: 'Remix phong cách này',
    chatDrawerTitle: 'Trợ lý Cổ Phục AI (Gemini Live)',
    chatPlaceholder: 'Nhập câu hỏi về cổ phục hoặc phong cách...',
    btnSend: 'Gửi'
  },
  en: {
    tagline: 'Gen Z Heritage Co-Creation Platform',
    navHub1: 'HUB 1: BẢO TÀNG DI SẢN',
    navHub2: 'HUB 2: AI CO-CREATOR',
    wardrobeBtn: 'Personal Wardrobe',
    communityBtn: 'Community Museum',
    loginBtn: 'Profile',
    audioTitle: 'Dan Tranh Ambient Meditation',
    heroBadge: 'INDOCHINE HIGH-FASHION EDITORIAL 2026',
    heroTitle: 'Heritage in Contemporary Breath',
    heroDesc: 'Digitizing Vietnamese imperial costumes for Gen Z. Archival accuracy, conscious styling, ancestral honor.',
    exploreBtn: 'Explore Digital Museum',
    tryOnHeroBtn: 'AI Styling & Color Match',
    stat1: 'Historic Garment Forms',
    stat2: 'Asian Personal Color Palettes',
    stat3: 'Checked Rentals & Museums',
    stat4: 'Cultural Guardrail',
    anatomyTitle: '2D Layered Costume Anatomy for All Costumes',
    anatomySub: 'Interactive 2D deconstruction across all six iconic Vietnamese costumes: Ngu Than, Nhat Binh, Giao Linh, Tu Than, Ba Ba, and Ao Dai.',
    btnToggleFlaps: 'Open / Close Flaps',
    layerAll: 'All Layers',
    layerInner: 'Inner White Tunic Only',
    layerOuter: 'Outer Coat Only',
    museumTitle: 'Digital Museum of Vietnamese Costumes',
    museumSub: '6 masterworks spanning centuries, detailing textiles, tailoring craftsmanship, and cultural codes.',
    btnViewDetails: 'Historical Dossier',
    btnTryThis: 'Style This Outfit',
    mediaSectionTitle: 'Cinematic Heritage Footage',
    mediaSectionSub: 'Witness authentic fabric movement and royal costume restoration.',
    mapSectionTitle: 'Cultural Spaces & Services Map',
    mapSectionSub: 'Locate certified costume ateliers, national museums, and imperial photo destinations.',
    tabAll: 'All Locations',
    tabShop: 'Rental & Tailoring',
    tabMuseum: 'Museum Exhibitions',
    tabPhoto: 'Heritage Coordinates',
    studioTitle: 'AI Co-Creator & Contextual Styling',
    studioSub: 'Personal Color calibrated for Asian olive tones, silhouette balance, and cultural guardrails.',
    formPhotoLabel: 'Upload Portrait (Or pick a preset)',
    presetLabel: 'Quick presets:',
    presetAutumn: 'Warm Olive (Autumn)',
    presetSpring: 'Warm Fair (Spring)',
    presetSummer: 'Cool Light (Summer)',
    heightLabel: 'Height (cm)',
    weightLabel: 'Weight (kg)',
    bodyShapeLabel: 'Body Shape',
    shapeHourglass: 'Hourglass',
    shapePear: 'Pear Shape',
    shapeRect: 'Rectangle',
    shapeInverted: 'Inverted Triangle',
    destLabel: 'Destination',
    destHue: 'Hue Imperial Citadel',
    destHoiAn: 'Hoi An Ancient Town',
    destVanMieu: 'Temple of Literature Hanoi',
    destProm: 'Graduation Prom / Gala',
    destTemple: 'Sacred Shrine / Mausoleum',
    destCafe: 'Old Quarter Cafe / Casual',
    weatherLabel: 'Weather',
    weatherWarm: 'Mild Sun 25°C',
    weatherCold: 'Breezy Cool 18°C',
    weatherSummer: 'Tropical Heat 32°C',
    weatherWinter: 'Northern Monsoon 14°C',
    costumeSelectLabel: 'Garment Form',
    bottomSelectLabel: 'Lower Garment (Pants / Skirt)',
    bottomPant: 'White Flowing Silk Trousers (Canon)',
    bottomSkirt: 'Long Brocade Wrap Skirt (Canon)',
    bottomShort: 'Shorts / Miniskirt (Triggers Guardrail)',
    collarSelectLabel: 'Lapel Crossing (For Giao Linh)',
    collarHuu: 'Huu Nham (Left over Right - Canon)',
    collarTa: 'Ta Nham (Right over Left - Violation)',
    btnAnalyze: 'Analyze & AI Try-On',
    scanningText: 'AI scanning skin undertones, silhouette & cultural statutes...',
    lookbookBadge: 'HIGH-FASHION LOOKBOOK DOSSIER',
    dyeTitle: 'Harmonious Natural Dye Palette',
    bodyTitle: 'Body Silhouette Guidance',
    guardTitle: 'Cultural Guardrail & Respect Gauge',
    btnAddToCommunity: 'Publish to Community Museum',
    btnSendEmail: 'Email Styling Dossier',
    btnSaveWardrobe: 'Save to Personal Wardrobe',
    communityHeader: 'Live Community Heritage Showcase',
    communitySub: 'Crowd-sourced Gen Z styling remixes celebrated across Vietnam.',
    btnRemix: 'Remix This Look',
    chatDrawerTitle: 'AI Cultural Stylist (Gemini Live)',
    chatPlaceholder: 'Ask about costume history, colors or styling...',
    btnSend: 'Send'
  }
};

function t(key) {
  const dict = I18N[state.lang] || I18N.vi;
  return dict[key] || key;
}

// --- DOM RENDERERS ---

export function initApp() {
  renderNavbar();
  renderHubs();
  renderModals();
  renderChatbot();
  attachEvents();
  renderCommunityShowcase();

  // Probe Gemini AI status asynchronously
  fetch('/api/gemini/status')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('geminiStatusLabel');
      if (el && data) {
        el.innerText = data.hasApiKey ? 'Gemini 2.5 Flash · Trực Tuyến 24/7' : 'Gemini AI · Dữ Liệu Chuẩn Sử';
      }
    })
    .catch(() => {});

  // Subtle interactive dynamics for the lotus background pattern on page interaction
  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;
        const rotateDeg = (normX * 1.8).toFixed(2);
        const opacityDelta = (0.65 + Math.hypot(normX, normY) * 0.25).toFixed(2);
        document.documentElement.style.setProperty('--lotus-mouse-rotate', `${rotateDeg}deg`);
        document.documentElement.style.setProperty('--lotus-base-opacity', opacityDelta);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function renderNavbar() {
  const navContainer = document.getElementById('navbarContainer');
  if (!navContainer) return;

  navContainer.innerHTML = `
    <header class="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3 cursor-pointer" id="navLogo">
          <div class="w-11 h-11 rounded-lg bg-[#8B0000] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-[#D4AF37]">
            V
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-serif font-bold text-xl sm:text-2xl text-[#222222] tracking-wide">VietHeritage Remix</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono font-semibold border border-[#8B0000]/30 uppercase">1744 · 2026</span>
            </div>
            <p class="text-xs text-[#666666] hidden sm:block font-sans">${t('tagline')}</p>
          </div>
        </div>

        <!-- Navigation Tabs: HUB 1 & HUB 2 -->
        <nav class="hidden md:flex items-center space-x-1.5 p-1 bg-[#F0ECE1] rounded-xl border border-[#D4AF37]/30 shadow-inner" id="desktopNavTabs">
          <button 
            id="navTabHub1" 
            class="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 ${state.activeHub === 'hub1' ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]' : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'}"
            title="HUB 1: BẢO TÀNG DI SẢN"
          >
            <i data-lucide="landmark" class="w-3.5 h-3.5 ${state.activeHub === 'hub1' ? 'text-[#D4AF37]' : 'text-stone-500'}"></i>
            <span>${t('navHub1')}</span>
          </button>
          <button 
            id="navTabHub2" 
            class="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 ${state.activeHub === 'hub2' ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]' : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'}"
            title="HUB 2: AI CO-CREATOR"
          >
            <i data-lucide="wand-2" class="w-3.5 h-3.5 ${state.activeHub === 'hub2' ? 'text-[#D4AF37]' : 'text-stone-500'}"></i>
            <span>${t('navHub2')}</span>
          </button>
        </nav>

        <!-- Right Side: Audio, Language, Auth -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <!-- Audio Toggle Pill -->
          <button id="audioToggleBtn" title="Play / Pause Ambient Vietnamese Music" class="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-white/80 hover:bg-[#FDF6E2] text-xs font-mono transition-all shadow-xs cursor-pointer">
            <span class="w-2.5 h-2.5 rounded-full ${state.audioPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}"></span>
            <span class="hidden lg:inline text-[#222222] font-medium">${t('audioTitle')}</span>
            <i data-lucide="${state.audioPlaying ? 'volume-2' : 'volume-x'}" class="w-3.5 h-3.5 text-[#8B0000]"></i>
          </button>

          <!-- Wardrobe Modal Trigger -->
          <button id="openWardrobeBtn" class="p-2 rounded-lg border border-stone-300 hover:border-[#D4AF37] bg-white text-[#222222] text-xs font-mono hidden sm:flex items-center space-x-1.5 cursor-pointer" title="${t('wardrobeBtn')}">
            <i data-lucide="archive" class="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span class="hidden md:inline">${t('wardrobeBtn')}</span>
          </button>

          <!-- Language Switcher -->
          <button id="langToggleBtn" class="px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-white hover:bg-[#F0ECE1] text-xs font-bold font-mono text-[#8B0000] transition-colors cursor-pointer">
            ${state.lang.toUpperCase()}
          </button>

          <!-- Auth Button -->
          <button id="authBtn" class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium font-sans transition-colors shadow-xs cursor-pointer">
            <i data-lucide="user" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span class="truncate max-w-[85px] sm:max-w-none">${state.user.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      <!-- Mobile Tab Bar: HUB 1 & HUB 2 -->
      <div class="flex md:hidden border-t border-[#D4AF37]/20 bg-[#F5F1E8] px-2 py-1.5 justify-around" id="mobileNavTabs">
        <button id="mobTabHub1" class="flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 ${state.activeHub === 'hub1' ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60' : 'text-stone-500 hover:text-stone-800'}">
          <i data-lucide="landmark" class="w-3.5 h-3.5 ${state.activeHub === 'hub1' ? 'text-[#8B0000]' : 'text-stone-400'}"></i>
          <span>${t('navHub1')}</span>
        </button>
        <button id="mobTabHub2" class="flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 ${state.activeHub === 'hub2' ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60' : 'text-stone-500 hover:text-stone-800'}">
          <i data-lucide="wand-2" class="w-3.5 h-3.5 ${state.activeHub === 'hub2' ? 'text-[#8B0000]' : 'text-stone-400'}"></i>
          <span>${t('navHub2')}</span>
        </button>
      </div>
    </header>
  `;
}

function renderHubs() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  main.innerHTML = `
    <!-- Top Editorial Hero Banner with Imperial Vietnamese Lotus Background -->
    <section class="relative overflow-hidden bg-radial from-[#F5EFE6] via-[#FAF7F2] to-[#ECE4D4] border-b border-[#D4AF37]/25 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      
      <!-- Left Decorative Lotus Cluster (Hoa Sen Cung Đình) with Interactive Hover -->
      <div class="interactive-lotus-pattern absolute -left-10 md:left-2 -bottom-8 w-56 md:w-80 h-auto pointer-events-auto opacity-50 md:opacity-60 animate-float-lotus z-0 select-none cursor-pointer" title="Hoa Sen Bách Diệp">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-sm">
          <path d="M10 260 C60 250, 140 270, 200 255 C240 245, 270 260, 290 255" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="4,4"/>
          <path d="M30 280 C80 270, 160 290, 220 275 C250 268, 280 280, 300 275" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.25"/>
          <path d="M110 270 Q120 180, 80 120" stroke="#557C3E" stroke-width="3" stroke-linecap="round" stroke-opacity="0.4"/>
          <ellipse cx="65" cy="140" rx="60" ry="32" fill="#3D5A2B" fill-opacity="0.12" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.45"/>
          <path d="M65 140 Q40 125, 15 130 M65 140 Q40 155, 20 160 M65 140 Q85 125, 115 130 M65 140 Q85 155, 110 160" stroke="#D4AF37" stroke-width="0.8" stroke-opacity="0.35"/>
          <circle cx="65" cy="140" r="2.5" fill="#D4AF37" fill-opacity="0.5"/>
          <path d="M150 270 Q145 170, 170 85" stroke="#557C3E" stroke-width="3.5" stroke-linecap="round" stroke-opacity="0.5"/>
          <g transform="translate(170, 85)">
            <path d="M0 0 C-40 -15, -60 -50, -45 -75 C-30 -100, -10 -80, 0 0 Z" fill="#8B0000" fill-opacity="0.08" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C40 -15, 60 -50, 45 -75 C30 -100, 10 -80, 0 0 Z" fill="#8B0000" fill-opacity="0.08" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C-30 -25, -45 -65, -25 -85 C-10 -105, -5 -80, 0 0 Z" fill="#C47B89" fill-opacity="0.18" stroke="#8B0000" stroke-width="1.2"/>
            <path d="M0 0 C30 -25, 45 -65, 25 -85 C10 -105, 5 -80, 0 0 Z" fill="#C47B89" fill-opacity="0.18" stroke="#8B0000" stroke-width="1.2"/>
            <path d="M0 0 C-18 -30, -25 -80, 0 -100 C25 -80, 18 -30, 0 0 Z" fill="#8B0000" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.4"/>
            <ellipse cx="0" cy="-35" rx="14" ry="7" fill="#D4AF37" fill-opacity="0.4" stroke="#8B0000" stroke-width="1"/>
            <circle cx="-6" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="0" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="6" cy="-35" r="1.5" fill="#8B0000"/>
          </g>
          <path d="M190 270 Q200 190, 235 140" stroke="#557C3E" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.45"/>
          <g transform="translate(235, 140)">
            <path d="M0 0 C-15 -15, -15 -45, 0 -55 C15 -45, 15 -15, 0 0 Z" fill="#8B0000" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C-6 -15, -6 -40, 0 -52 C6 -40, 6 -15, 0 0 Z" fill="#C47B89" fill-opacity="0.25" stroke="#8B0000" stroke-width="0.9"/>
          </g>
        </svg>
      </div>

      <!-- Right Decorative Lotus Cluster (Hoa Sen Cung Đình) with Interactive Hover -->
      <div class="interactive-lotus-pattern-rev absolute -right-10 md:right-2 -top-6 w-56 md:w-80 h-auto pointer-events-auto opacity-50 md:opacity-60 animate-float-lotus-rev z-0 select-none cursor-pointer" title="Hoa Sen Bách Diệp">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-sm transform scale-x-[-1]">
          <path d="M10 260 C60 250, 140 270, 200 255 C240 245, 270 260, 290 255" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="4,4"/>
          <path d="M30 280 C80 270, 160 290, 220 275 C250 268, 280 280, 300 275" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.25"/>
          <path d="M110 270 Q120 180, 80 120" stroke="#557C3E" stroke-width="3" stroke-linecap="round" stroke-opacity="0.4"/>
          <ellipse cx="65" cy="140" rx="60" ry="32" fill="#3D5A2B" fill-opacity="0.12" stroke="#D4AF37" stroke-width="1.2" stroke-opacity="0.45"/>
          <path d="M65 140 Q40 125, 15 130 M65 140 Q40 155, 20 160 M65 140 Q85 125, 115 130 M65 140 Q85 155, 110 160" stroke="#D4AF37" stroke-width="0.8" stroke-opacity="0.35"/>
          <circle cx="65" cy="140" r="2.5" fill="#D4AF37" fill-opacity="0.5"/>
          <path d="M150 270 Q145 170, 170 85" stroke="#557C3E" stroke-width="3.5" stroke-linecap="round" stroke-opacity="0.5"/>
          <g transform="translate(170, 85)">
            <path d="M0 0 C-40 -15, -60 -50, -45 -75 C-30 -100, -10 -80, 0 0 Z" fill="#8B0000" fill-opacity="0.08" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C40 -15, 60 -50, 45 -75 C30 -100, 10 -80, 0 0 Z" fill="#8B0000" fill-opacity="0.08" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C-30 -25, -45 -65, -25 -85 C-10 -105, -5 -80, 0 0 Z" fill="#C47B89" fill-opacity="0.18" stroke="#8B0000" stroke-width="1.2"/>
            <path d="M0 0 C30 -25, 45 -65, 25 -85 C10 -105, 5 -80, 0 0 Z" fill="#C47B89" fill-opacity="0.18" stroke="#8B0000" stroke-width="1.2"/>
            <path d="M0 0 C-18 -30, -25 -80, 0 -100 C25 -80, 18 -30, 0 0 Z" fill="#8B0000" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.4"/>
            <ellipse cx="0" cy="-35" rx="14" ry="7" fill="#D4AF37" fill-opacity="0.4" stroke="#8B0000" stroke-width="1"/>
            <circle cx="-6" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="0" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="6" cy="-35" r="1.5" fill="#8B0000"/>
          </g>
          <path d="M190 270 Q200 190, 235 140" stroke="#557C3E" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.45"/>
          <g transform="translate(235, 140)">
            <path d="M0 0 C-15 -15, -15 -45, 0 -55 C15 -45, 15 -15, 0 0 Z" fill="#8B0000" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.2"/>
            <path d="M0 0 C-6 -15, -6 -40, 0 -52 C6 -40, 6 -15, 0 0 Z" fill="#C47B89" fill-opacity="0.25" stroke="#8B0000" stroke-width="0.9"/>
          </g>
        </svg>
      </div>

      <div class="max-w-5xl mx-auto text-center relative z-10">
        <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight mb-4 leading-tight whitespace-nowrap bg-gradient-to-r from-[#5C0606] via-[#8B0000] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(212,175,55,0.25)]">
          ${t('heroTitle')}
        </h1>
        <p class="font-sans text-base sm:text-lg text-[#666666] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          ${t('heroDesc')}
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button id="heroGoHub1" class="px-6 py-3 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer">
            <i data-lucide="landmark" class="w-4 h-4"></i>
            <span>${t('exploreBtn')}</span>
          </button>
          <button id="heroGoHub2" class="px-6 py-3 rounded-xl bg-white hover:bg-[#FDF6E2] text-[#222222] border border-[#D4AF37] font-medium text-sm transition-all shadow-xs flex items-center space-x-2 cursor-pointer">
            <i data-lucide="wand-2" class="w-4 h-4 text-[#8B0000]"></i>
            <span>${t('startRemixBtn')}</span>
          </button>
        </div>
      </div>

        <!-- Metric Badges -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-left">
          <div class="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span class="block text-2xl font-mono font-bold text-[#8B0000]">5</span>
            <span class="text-xs text-[#666666]">${t('stat1')}</span>
          </div>
          <div class="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span class="block text-2xl font-mono font-bold text-[#D4AF37]">4 Season</span>
            <span class="text-xs text-[#666666]">${t('stat2')}</span>
          </div>
          <div class="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span class="block text-2xl font-mono font-bold text-[#222222]">12+</span>
            <span class="text-xs text-[#666666]">${t('stat3')}</span>
          </div>
          <div class="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span class="block text-2xl font-mono font-bold text-emerald-700">100% Guard</span>
            <span class="text-xs text-[#666666]">${t('stat4')}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Anchor for Smooth Hub Navigation -->
    <div id="hubContentAnchor" class="scroll-mt-24"></div>

    <!-- HUB 1 CONTAINER: BẢO TÀNG DI SẢN -->
    <div 
      id="hub1Section" 
      class="${state.activeHub === 'hub1' ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-3'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 transition-all duration-300 ease-out"
    >
      ${renderAnatomySection()}
      ${renderHistoricalTimelineSection()}
      ${renderWisdomSnippetSection()}
      ${renderMuseumGallerySection()}
      ${renderVietnamCostumeMapSection()}
      ${renderMediaAndMapsSection()}
    </div>

    <!-- HUB 2 CONTAINER: AI CO-CREATOR -->
    <div 
      id="hub2Section" 
      class="${state.activeHub === 'hub2' ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-3'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 transition-all duration-300 ease-out"
    >
      ${renderStudioSection()}
      ${renderCommunityGridSection()}
    </div>
  `;
}

// ----------------- HUB 1 COMPONENTS -----------------

function renderAnatomySection() {
  const isEn = state.lang === 'en';
  const activeCostumeKey = state.activeAnatomyCostumeId || 'ngu-than';
  const preset = ANATOMY_PRESETS[activeCostumeKey] || ANATOMY_PRESETS['ngu-than'];
  const currentHotspot = preset.hotspots.find(h => h.id === state.activeHotspot) || preset.hotspots[0];

  return `
    <section id="anatomySection" class="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-10 shadow-sm relative overflow-hidden">
      <!-- Background subtle imperial watermark -->
      <div class="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#8B0000]/5 pointer-events-none blur-2xl"></div>

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>❖</span>
            <span>2D Layered Costume Anatomy · ${isEn ? preset.eraEn : preset.eraVi}</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            ${isEn ? `2D Anatomy Deconstruction: ${preset.nameEn}` : `Bóc Tách Lớp Áo 2D: ${preset.nameVi}`}
          </h2>
          <p class="text-sm text-[#666666] mt-1 max-w-2xl">
            ${isEn 
              ? 'Select any Vietnamese traditional costume below to interactively explore its layered tailoring, functional flaps, and philosophical anatomy.'
              : 'Chọn bất kỳ trang phục cổ phong nào dưới đây để tương tác bóc tách các lớp vải, mở đóng vạt áo 2D và khám phá triết lý nhân sinh.'
            }
          </p>
        </div>

        <!-- Actions: Flaps Toggle & Real Photo Reference -->
        <div class="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
          <button 
            id="anatomyViewRealPhotoBtn" 
            class="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 font-mono text-xs font-bold rounded-xl border border-amber-300 shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
            data-costume-id="${activeCostumeKey}"
            title="${isEn ? 'View real photo reference for this costume' : 'Xem ảnh chụp thực tế đối chiếu của cổ phục này'}"
          >
            <span>📸</span>
            <span>${isEn ? 'Real Photo' : 'Ảnh Chụp Đối Chiếu'}</span>
          </button>
          <button id="toggleFlapsBtn" class="px-4 py-2.5 bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95">
            <i data-lucide="scissors" class="w-4 h-4 text-[#D4AF37]"></i>
            <span id="flapsBtnText">${state.flapsOpen ? (isEn ? 'Close Flaps' : 'Đóng Vạt Áo') : (isEn ? 'Open Flaps' : 'Mở Vạt Áo')}</span>
          </button>
        </div>
      </div>

      <!-- Costume Selection Tab Bar for 2D Anatomy -->
      <div class="mb-6 p-1.5 bg-[#F5F1E8] rounded-2xl border border-[#D4AF37]/30 flex items-center space-x-1.5 overflow-x-auto shadow-2xs">
        <span class="text-xs font-mono font-bold text-[#8B0000] px-3 shrink-0 flex items-center space-x-1">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          <span>${isEn ? 'Select Costume:' : 'Chọn Cổ Phục:'}</span>
        </span>
        ${Object.values(ANATOMY_PRESETS).map(p => `
          <button class="anatomy-costume-tab px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${p.id === activeCostumeKey ? 'bg-[#8B0000] text-white shadow-md' : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'}" data-costume-id="${p.id}">
            <span>${isEn ? p.nameEn.split('(')[0].trim() : p.nameVi.split('(')[0].trim()}</span>
          </button>
        `).join('')}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Interactive Anatomy Stage (Pure 2D CSS Transforms) -->
        <div class="lg:col-span-6 bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] rounded-2xl border-2 border-[#D4AF37]/40 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px] shadow-inner">
          <!-- Layer Filter Controls Pill Bar -->
          <div class="w-full flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
            <div class="flex items-center space-x-1 p-1 bg-white/90 backdrop-blur-xs rounded-xl border border-stone-200 shadow-2xs overflow-x-auto">
              ${preset.layers.map(layer => `
                <button class="anatomy-layer-btn px-2.5 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${state.activeLayer === layer.id ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-layer="${layer.id}">
                  ${isEn ? layer.labelEn : layer.labelVi}
                </button>
              `).join('')}
            </div>
            <span id="flapStatusIndicator" class="text-[11px] font-mono text-[#8B0000] font-bold bg-[#8B0000]/10 px-2 py-0.5 rounded border border-[#8B0000]/20">
              ${state.flapsOpen ? (isEn ? '✦ Flaps Unfolded' : '✦ Đang Mở Vạt') : (isEn ? '✦ Fully Fastened' : '✦ Đang Cài Kín')}
            </span>
          </div>

          <!-- COSTUME ANATOMY STAGE WITH FUNCTIONAL 2D TRANSFORM FLAPS -->
          <div id="costumeStageWrapper" class="relative w-72 h-[410px] flex items-center justify-center select-none my-2 group">
            <!-- Background Halo & Traditional Pattern Grid -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 288 410">
              <circle cx="144" cy="180" r="120" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="6 4"/>
              <circle cx="144" cy="180" r="95" fill="none" stroke="#8B0000" stroke-width="0.8" opacity="0.3"/>
            </svg>

            <!-- LAYER 1: INNER GARMENT -->
            <div id="innerLayer" class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${state.activeLayer === 'outer' ? 'opacity-15' : 'opacity-100'}">
              ${preset.innerSvg}
            </div>

            <!-- LAYER 2: INTERMEDIATE (If exists for this costume) -->
            ${preset.midSvg ? `
              <div id="midLayer" class="absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${state.activeLayer === 'inner' ? 'opacity-10' : (state.activeLayer === 'mid' ? 'opacity-100 scale-105' : (state.flapsOpen ? 'opacity-100' : 'opacity-40'))}">
                ${preset.midSvg}
              </div>
            ` : ''}

            <!-- LAYER 3: OUTER ROBE (FUNCTIONAL 2D TRANSFORM FLAPS) -->
            <div id="outerLayer" class="absolute inset-0 flex items-center justify-center pointer-events-none ${state.activeLayer === 'inner' ? 'hidden' : 'block'}">
              <!-- Left Outer Flap -->
              <div id="flapLeft" class="absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out origin-top-left ${state.flapsOpen ? '-translate-x-[108%] -rotate-2 opacity-50 shadow-2xl' : 'translate-x-0 rotate-0 opacity-100'}">
                ${preset.flapLeftSvg}
              </div>

              <!-- Right Outer Flap -->
              <div id="flapRight" class="absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out origin-top-right ${state.flapsOpen ? 'translate-x-[108%] rotate-2 opacity-50 shadow-2xl' : 'translate-x-0 rotate-0 opacity-100'}">
                ${preset.flapRightSvg}
              </div>
            </div>

            <!-- Headwear Accessory on Top -->
            <div class="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none z-30" title="${isEn ? preset.headwear.labelEn : preset.headwear.labelVi}">
              ${preset.headwear.svg}
            </div>

            <!-- 6 INTERACTIVE PULSATING HOTSPOTS (Click to inspect) -->
            ${preset.hotspots.map(h => `
              <button class="hotspot absolute ${h.pos} w-7 h-7 rounded-full ${h.color} font-mono text-xs font-bold flex items-center justify-center shadow-lg border-2 border-white cursor-pointer z-40 transition-transform hover:scale-125 ${state.activeHotspot === h.id ? 'ring-4 ring-[#8B0000]/40 scale-115 animate-bounce' : 'animate-pulse'}" data-hotspot="${h.id}" title="${isEn ? h.quickLabelEn : h.quickLabelVi}">
                ${h.id}
              </button>
            `).join('')}
          </div>

          <div class="w-full text-center mt-3 z-20">
            <span class="inline-block text-[11px] text-stone-500 font-mono bg-white/80 px-3 py-1 rounded-full border border-stone-200">
              💡 ${isEn ? 'Click numbers (1-6) or "Open Flaps" to unfold 2D layers' : 'Bấm các số (1-6) trên áo hoặc nút "Mở Vạt Áo" để bóc tách 2D'}
            </span>
          </div>
        </div>

        <!-- Hotspot Dynamic Cultural Explanation Card -->
        <div class="lg:col-span-6 space-y-4">
          <div id="hotspotCard" class="p-6 md:p-7 rounded-2xl border-2 border-[#D4AF37]/50 bg-[#FAF7F2] transition-all shadow-sm">
            <div class="flex items-center justify-between text-xs font-mono font-bold text-[#8B0000] uppercase mb-2">
              <span id="hotspotBadge">${isEn ? currentHotspot.badgeEn : currentHotspot.badgeVi}</span>
              <span class="text-stone-500">${preset.eraVi.split('·')[0].trim()}</span>
            </div>
            <h3 id="hotspotTitle" class="font-serif text-2xl font-bold text-[#222222] mb-3 leading-snug">
              ${isEn ? currentHotspot.titleEn : currentHotspot.titleVi}
            </h3>
            <p id="hotspotContent" class="text-sm text-stone-700 leading-relaxed font-sans">
              ${isEn ? currentHotspot.contentEn : currentHotspot.contentVi}
            </p>

            <div class="mt-4 pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-3 text-xs font-mono">
              <div class="p-2.5 rounded-lg bg-white border border-stone-200">
                <span class="text-stone-400 block text-[10px] uppercase">${isEn ? 'Cultural Philosophy:' : 'Triết Lý Văn Hóa:'}</span>
                <span id="hotspotPhilosophy" class="text-[#8B0000] font-bold">${isEn ? currentHotspot.philosophyEn : currentHotspot.philosophyVi}</span>
              </div>
              <div class="p-2.5 rounded-lg bg-white border border-stone-200">
                <span class="text-stone-400 block text-[10px] uppercase">${isEn ? 'Tailoring Technique:' : 'Kỹ Thuật May Đo:'}</span>
                <span id="hotspotTailoring" class="text-[#222222] font-bold">${isEn ? currentHotspot.tailoringEn : currentHotspot.tailoringVi}</span>
              </div>
            </div>
          </div>

          <!-- 6 Quick Hotspot Buttons Grid -->
          <div class="grid grid-cols-3 gap-2">
            ${preset.hotspots.map(h => `
              <button class="hotspot-trigger p-2.5 rounded-xl border border-stone-200 bg-white hover:border-[#8B0000] text-left text-xs transition-all cursor-pointer shadow-2xs hover:scale-102 ${state.activeHotspot === h.id ? 'border-[#8B0000] bg-rose-50/50' : ''}" data-hotspot="${h.id}">
                <span class="block font-mono font-bold text-[#8B0000]">${isEn ? h.quickLabelEn : h.quickLabelVi}</span>
                <span class="text-[11px] text-stone-500 truncate block">${isEn ? h.quickSubEn : h.quickSubVi}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

// ----------------- HISTORICAL SILHOUETTE TIMELINE COMPONENT -----------------
function renderHistoricalTimelineSection() {
  const isEn = state.lang === 'en';
  const activeDynasty = DYNASTIES_TIMELINE_DATA.find(d => d.id === state.activeTimelineDynastyId) || DYNASTIES_TIMELINE_DATA[3];
  const compareDynasty = DYNASTIES_TIMELINE_DATA.find(d => d.id === state.timelineCompareDynastyId) || DYNASTIES_TIMELINE_DATA[0];
  const isCompare = state.timelineCompareMode;

  const currentIndex = DYNASTIES_TIMELINE_DATA.findIndex(d => d.id === activeDynasty.id);
  const prevDynasty = DYNASTIES_TIMELINE_DATA[(currentIndex - 1 + DYNASTIES_TIMELINE_DATA.length) % DYNASTIES_TIMELINE_DATA.length];
  const nextDynasty = DYNASTIES_TIMELINE_DATA[(currentIndex + 1) % DYNASTIES_TIMELINE_DATA.length];

  return `
    <section id="historicalTimelineSection" class="bg-white rounded-2xl border-2 border-[#D4AF37]/50 p-6 md:p-10 shadow-sm relative overflow-hidden transition-all">
      <!-- Ambient Decorative Imperial Radial Background -->
      <div class="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#8B0000]/5 pointer-events-none blur-3xl"></div>
      <div class="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-3xl"></div>

      <!-- Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>⏳</span>
            <span>${isEn ? 'HISTORICAL EVOLUTION TIMELINE · 11TH TO 21ST CENTURY' : 'TRỤC THỜI GIAN TIẾN HÓA CỔ PHỤC · THẾ KỶ XI ĐẾN XXI'}</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            ${isEn ? 'Evolution of Vietnamese Costume Silhouettes' : 'Tiến Hóa Phom Dáng Cổ Phục Qua Các Triều Đại'}
          </h2>
          <p class="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl leading-relaxed">
            ${isEn 
              ? 'Select any imperial dynasty (Ly, Tran, Later Le, Nguyen, or Modern) to interactively inspect how silhouette profiles, collar lines, sleeve widths, and philosophical meaning transformed across 1,000 years of history.'
              : 'Chọn bất kỳ triều đại nào dưới đây để khám phá sự biến đổi phom dáng hình thể (Silhouette), cấu trúc cổ áo, ống tay và triết lý nhân sinh quan xuyên suốt 1.000 năm lịch sử Đại Việt - Việt Nam.'
            }
          </p>
        </div>

        <!-- Mode Toggles & Jump to Studio -->
        <div class="flex items-center space-x-2 shrink-0 flex-wrap gap-y-2">
          <!-- Toggle Comparison Mode -->
          <button 
            id="btnToggleTimelineCompare" 
            class="px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${isCompare ? 'bg-[#8B0000] text-white' : 'bg-[#F5F1E8] hover:bg-stone-200 text-stone-800 border border-[#D4AF37]/50'}"
            title="${isEn ? 'Toggle side-by-side silhouette comparison' : 'Bật/tắt chế độ so sánh 2 triều đại'}"
          >
            <i data-lucide="columns-2" class="w-3.5 h-3.5 ${isCompare ? 'text-[#D4AF37]' : 'text-[#8B0000]'}"></i>
            <span>${isCompare ? (isEn ? 'Close Comparison' : 'Đóng So Sánh') : (isEn ? 'Compare Silhouettes' : 'So Sánh 2 Triều Đại')}</span>
          </button>

          <!-- Jump to Try in V-Studio -->
          <button 
            class="timeline-jump-studio-btn px-4 py-2 bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            data-costume-id="${activeDynasty.primaryCostumeId}"
          >
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span>${isEn ? 'Try in V-Studio' : 'Phối Đồ Ngay'}</span>
          </button>
        </div>
      </div>

      <!-- HORIZONTAL INTERACTIVE DYNASTY TIMELINE MILESTONE TRACK -->
      <div class="mb-8">
        <div class="p-2 bg-[#F7F3EB] rounded-2xl border border-[#D4AF37]/40 shadow-inner">
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
            ${DYNASTIES_TIMELINE_DATA.map((d, idx) => {
              const isActive = d.id === activeDynasty.id;
              const isCompTarget = isCompare && d.id === compareDynasty.id;
              return `
                <button 
                  class="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between ${isActive ? 'bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/40 scale-[1.02]' : (isCompTarget ? 'bg-[#1E3A8A] text-white shadow-md ring-2 ring-blue-500' : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]')}"
                  data-dynasty-id="${d.id}"
                >
                  <!-- Number & Era Tag -->
                  <div class="flex items-center justify-between text-[10px] font-mono mb-1 ${isActive || isCompTarget ? 'text-yellow-300' : 'text-[#8B0000]'}">
                    <span class="font-bold">#0${idx + 1}</span>
                    <span>${d.period}</span>
                  </div>
                  <!-- Dynasty Title -->
                  <h4 class="font-serif font-bold text-sm ${isActive || isCompTarget ? 'text-white' : 'text-stone-900'} leading-tight truncate">
                    ${isEn ? d.dynastyEn : d.dynastyVi}
                  </h4>
                  <!-- Silhouette Type Tag -->
                  <span class="text-[10px] font-sans truncate mt-1 block ${isActive || isCompTarget ? 'text-stone-200' : 'text-stone-500'}">
                    ${isEn ? d.silhouetteTypeEn.split('(')[0].trim() : d.silhouetteTypeVi.split('(')[0].trim()}
                  </span>

                  <!-- Active Bottom Arrow Pointer -->
                  ${isActive ? `
                    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8B0000] rotate-45 border-r border-b border-[#8B0000]"></div>
                  ` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- MAIN TIMELINE DISPLAY STAGE (SINGLE MODE VS DUAL COMPARISON MODE) -->
      ${!isCompare ? `
        <!-- SINGLE DYNASTY IN-DEPTH VIEW -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Silhouette Vector Showcase Stage (5 cols) -->
          <div class="lg:col-span-5 bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] rounded-2xl border-2 border-[#D4AF37]/50 p-6 flex flex-col items-center justify-between min-h-[480px] relative shadow-inner">
            <!-- Top Silhouette Tag -->
            <div class="w-full flex items-center justify-between z-10">
              <span class="px-2.5 py-1 rounded-full bg-white/90 border border-[#D4AF37]/60 text-[11px] font-mono font-bold text-[#8B0000] shadow-2xs">
                ✦ ${isEn ? activeDynasty.silhouetteTypeEn : activeDynasty.silhouetteTypeVi}
              </span>
              <span class="text-[11px] font-mono font-semibold text-stone-500 bg-white/80 px-2 py-0.5 rounded">
                ${activeDynasty.period}
              </span>
            </div>

            <!-- Concentric Circular Background Halo -->
            <div class="relative w-56 h-72 my-4 flex items-center justify-center select-none group">
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-52 h-52 rounded-full border border-[#D4AF37]/40"></div>
                <div class="absolute w-64 h-64 rounded-full border border-dashed border-[#8B0000]/20"></div>
              </div>

              <!-- SVG Silhouette Vector -->
              <div class="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                ${activeDynasty.svgSilhouette}
              </div>
            </div>

            <!-- Bottom Dynasty Quick Navigator Bar -->
            <div class="w-full pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between z-10">
              <button id="btnPrevDynasty" class="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-[#8B0000] text-xs font-mono font-bold text-stone-700 hover:text-[#8B0000] transition-all flex items-center space-x-1 cursor-pointer shadow-2xs hover:scale-102">
                <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
                <span>${isEn ? prevDynasty.dynastyEn : prevDynasty.dynastyVi}</span>
              </button>

              <span class="text-[11px] font-mono text-stone-500 font-bold">
                ${isEn ? activeDynasty.dynastyEn : activeDynasty.dynastyVi}
              </span>

              <button id="btnNextDynasty" class="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-[#8B0000] text-xs font-mono font-bold text-stone-700 hover:text-[#8B0000] transition-all flex items-center space-x-1 cursor-pointer shadow-2xs hover:scale-102">
                <span>${isEn ? nextDynasty.dynastyEn : nextDynasty.dynastyVi}</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Right: Silhouette Evolutionary Anatomy & Historical Philosophy (7 cols) -->
          <div class="lg:col-span-7 space-y-5">
            <!-- Dynasty Overview Headline -->
            <div>
              <div class="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1">
                <span>${isEn ? activeDynasty.centuryEn : activeDynasty.centuryVi}</span>
                <span>·</span>
                <span>${isEn ? activeDynasty.signatureCostumeEn : activeDynasty.signatureCostumeVi}</span>
              </div>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#222222] leading-tight">
                ${isEn ? activeDynasty.dynastyEn : activeDynasty.dynastyVi}: ${isEn ? activeDynasty.taglineEn : activeDynasty.taglineVi}
              </h3>
            </div>

            <!-- 4 Anatomical Features Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Feature 1: Collar -->
              <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-2xs space-y-1">
                <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000]">
                  <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? '1. Collar & Neckline:' : '1. Cấu Trúc Cổ Áo:'}</span>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                  ${isEn ? activeDynasty.features.collarEn : activeDynasty.features.collarVi}
                </p>
              </div>

              <!-- Feature 2: Sleeves -->
              <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-2xs space-y-1">
                <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000]">
                  <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? '2. Sleeves & Drapes:' : '2. Dáng Ống Tay Áo:'}</span>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                  ${isEn ? activeDynasty.features.sleevesEn : activeDynasty.features.sleevesVi}
                </p>
              </div>

              <!-- Feature 3: Hemline -->
              <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-2xs space-y-1">
                <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000]">
                  <i data-lucide="layers" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? '3. Panels & Hemline:' : '3. Tà Áo & Thân Vải:'}</span>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                  ${isEn ? activeDynasty.features.hemlineEn : activeDynasty.features.hemlineVi}
                </p>
              </div>

              <!-- Feature 4: Headwear & Accessories -->
              <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-2xs space-y-1">
                <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000]">
                  <i data-lucide="crown" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? '4. Headwear & Accents:' : '4. Tóc & Phụ Kiện:'}</span>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed font-sans">
                  ${isEn ? activeDynasty.features.hairAccessoryEn : activeDynasty.features.hairAccessoryVi}
                </p>
              </div>
            </div>

            <!-- Historical & Philosophical Spirit -->
            <div class="p-4 rounded-xl bg-[#FFFDF9] border-l-4 border-[#8B0000] border-t border-r border-b border-stone-200/80 shadow-2xs space-y-1.5">
              <span class="font-mono font-bold text-xs text-[#8B0000] uppercase tracking-wider block">
                🏛️ ${isEn ? 'Cultural Ethos & Philosophical Context:' : 'Triết Lý Nhân Sinh & Bối Cảnh Lịch Sử:'}
              </span>
              <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                ${isEn ? activeDynasty.philosophyEn : activeDynasty.philosophyVi}
              </p>
            </div>

            <!-- Archeological Reference Note -->
            <div class="flex items-center justify-between pt-2 border-t border-stone-200 text-xs font-mono text-stone-500">
              <span class="flex items-center space-x-1.5">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                <span>${isEn ? 'Archeological Proof:' : 'Căn Cứ Khảo Cổ & Sử Liệu:'}</span>
                <strong class="text-stone-700">${isEn ? activeDynasty.archeologySourceEn : activeDynasty.archeologySourceVi}</strong>
              </span>
            </div>
          </div>
        </div>
      ` : `
        <!-- DUAL COMPARISON MODE (SIDE-BY-SIDE EVOLUTION MATRIX) -->
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-[#F7F3EB] border border-[#D4AF37]/50 gap-3">
            <div class="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000]">
              <i data-lucide="columns-2" class="w-4 h-4"></i>
              <span>${isEn ? 'Side-by-Side Silhouette Comparison' : 'So Sánh Trực Quan Tiến Hóa Phom Dáng'}</span>
            </div>

            <div class="flex items-center space-x-2 text-xs font-mono">
              <span class="text-stone-600">${isEn ? 'Compare with:' : 'So sánh cùng:'}</span>
              <select id="selectCompareDynasty" class="px-3 py-1.5 rounded-lg border border-[#D4AF37] bg-white font-mono text-xs text-stone-800 outline-none focus:ring-1 focus:ring-[#8B0000] cursor-pointer">
                ${DYNASTIES_TIMELINE_DATA.map(d => `
                  <option value="${d.id}" ${d.id === compareDynasty.id ? 'selected' : ''}>
                    ${isEn ? d.dynastyEn : d.dynastyVi} (${d.period})
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Dual Silhouettes Columns -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column: Active Dynasty -->
            <div class="p-6 rounded-2xl bg-radial from-[#FFFDF9] to-[#FAF7F2] border-2 border-[#8B0000]/40 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div class="inline-block px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-mono font-bold">
                ${isEn ? activeDynasty.dynastyEn : activeDynasty.dynastyVi} (${activeDynasty.period})
              </div>
              <h4 class="font-serif font-bold text-lg text-stone-900">
                ${isEn ? activeDynasty.silhouetteTypeEn : activeDynasty.silhouetteTypeVi}
              </h4>
              <div class="w-44 h-64 flex items-center justify-center my-2">
                ${activeDynasty.svgSilhouette}
              </div>
              <p class="text-xs text-stone-600 italic">
                "${isEn ? activeDynasty.signatureCostumeEn : activeDynasty.signatureCostumeVi}"
              </p>
            </div>

            <!-- Right Column: Secondary Compare Dynasty -->
            <div class="p-6 rounded-2xl bg-radial from-[#FFFDF9] to-[#FAF7F2] border-2 border-blue-700/40 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div class="inline-block px-3 py-1 rounded-full bg-[#1E3A8A] text-white text-xs font-mono font-bold">
                ${isEn ? compareDynasty.dynastyEn : compareDynasty.dynastyVi} (${compareDynasty.period})
              </div>
              <h4 class="font-serif font-bold text-lg text-stone-900">
                ${isEn ? compareDynasty.silhouetteTypeEn : compareDynasty.silhouetteTypeVi}
              </h4>
              <div class="w-44 h-64 flex items-center justify-center my-2">
                ${compareDynasty.svgSilhouette}
              </div>
              <p class="text-xs text-stone-600 italic">
                "${isEn ? compareDynasty.signatureCostumeEn : compareDynasty.signatureCostumeVi}"
              </p>
            </div>
          </div>

          <!-- Direct Evolutionary Leap Matrix Table -->
          <div class="overflow-x-auto rounded-xl border border-[#D4AF37]/50 shadow-2xs">
            <table class="w-full text-left text-xs font-sans">
              <thead class="bg-[#8B0000] text-white font-mono uppercase text-[11px]">
                <tr>
                  <th class="p-3">${isEn ? 'Evolutionary Aspect' : 'Bộ Phận Tiến Hóa'}</th>
                  <th class="p-3">${isEn ? activeDynasty.dynastyEn : activeDynasty.dynastyVi}</th>
                  <th class="p-3">${isEn ? compareDynasty.dynastyEn : compareDynasty.dynastyVi}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-3 font-mono font-bold text-[#8B0000] bg-stone-50">Cổ Áo (Collar)</td>
                  <td class="p-3 text-stone-700">${isEn ? activeDynasty.features.collarEn : activeDynasty.features.collarVi}</td>
                  <td class="p-3 text-stone-700">${isEn ? compareDynasty.features.collarEn : compareDynasty.features.collarVi}</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-[#8B0000] bg-stone-50">Ống Tay (Sleeves)</td>
                  <td class="p-3 text-stone-700">${isEn ? activeDynasty.features.sleevesEn : activeDynasty.features.sleevesVi}</td>
                  <td class="p-3 text-stone-700">${isEn ? compareDynasty.features.sleevesEn : compareDynasty.features.sleevesVi}</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-[#8B0000] bg-stone-50">Tà Áo (Hemline)</td>
                  <td class="p-3 text-stone-700">${isEn ? activeDynasty.features.hemlineEn : activeDynasty.features.hemlineVi}</td>
                  <td class="p-3 text-stone-700">${isEn ? compareDynasty.features.hemlineEn : compareDynasty.features.hemlineVi}</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono font-bold text-[#8B0000] bg-stone-50">Triết Lý (Philosophy)</td>
                  <td class="p-3 text-stone-700">${isEn ? activeDynasty.philosophyEn : activeDynasty.philosophyVi}</td>
                  <td class="p-3 text-stone-700">${isEn ? compareDynasty.philosophyEn : compareDynasty.philosophyVi}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `}
    </section>
  `;
}

// ----------------- CULTURAL WISDOM SNIPPET SECTION -----------------
function renderWisdomSnippetSection() {
  const isEn = state.lang === 'en';
  const total = CULTURAL_WISDOM_SNIPPETS.length;
  const currentIndex = (state.currentWisdomIndex >= 0 && state.currentWisdomIndex < total) 
    ? state.currentWisdomIndex 
    : 0;
  const item = CULTURAL_WISDOM_SNIPPETS[currentIndex];

  return `
    <section id="culturalWisdomSection" class="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F5EFE0] p-6 sm:p-8 md:p-10 shadow-sm transition-all">
      <!-- Watermark & Decorative Halo -->
      <div class="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#8B0000]/5 pointer-events-none blur-3xl"></div>
      <div class="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-2xl"></div>

      <!-- Header Row -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4 mb-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-[#8B0000] text-yellow-300 flex items-center justify-center font-bold text-lg shadow-md shrink-0 border border-[#D4AF37]">
            ✦
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">
                ${isEn ? 'CULTURAL WISDOM SNIPPET · BITE-SIZED HERITAGE' : 'ĐIỂM SÁNG TRI THỨC VĂN HÓA · LỜI VÀNG DI SẢN'}
              </span>
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
              <span class="text-xs font-mono text-stone-500 font-semibold">
                #${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}
              </span>
            </div>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#222222] mt-0.5">
              ${isEn ? 'Did You Know? Heritage Fact' : 'Bạn Có Biết? Triết Lý Cổ Phục'}
            </h3>
          </div>
        </div>

        <!-- Quick Interaction Actions -->
        <div class="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
          <!-- Randomize Button -->
          <button 
            id="btnRandomWisdom" 
            class="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B0000] text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="${isEn ? 'Random historical fact' : 'Khám phá tri thức ngẫu nhiên'}"
          >
            <i data-lucide="shuffle" class="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span>${isEn ? 'Random' : 'Ngẫu Nhiên'}</span>
          </button>

          <!-- Copy Button -->
          <button 
            id="btnCopyWisdom" 
            class="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B0000] text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="${isEn ? 'Copy snippet to clipboard' : 'Sao chép đoạn trích'}"
          >
            <i data-lucide="${state.wisdomCopied ? 'check' : 'copy'}" class="w-3.5 h-3.5 ${state.wisdomCopied ? 'text-emerald-600' : 'text-stone-500'}"></i>
            <span id="copyWisdomText">${state.wisdomCopied ? (isEn ? 'Copied!' : 'Đã Chép!') : (isEn ? 'Copy' : 'Sao Chép')}</span>
          </button>

          <!-- Next Button -->
          <button 
            id="btnNextWisdom" 
            class="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-[#8B0000]/20"
            title="${isEn ? 'Next cultural snippet' : 'Điểm sáng tri thức tiếp theo'}"
          >
            <span>${isEn ? 'Next Fact' : 'Khám Phá Tiếp'}</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-yellow-300"></i>
          </button>
        </div>
      </div>

      <!-- Main Fact Card Showcase -->
      <div id="wisdomCardContainer" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-opacity duration-300">
        <!-- Left: Fact Narrative & Title (8 cols) -->
        <div class="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="flex items-center space-x-2 flex-wrap gap-y-1">
              <span class="px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono text-xs font-bold border border-[#8B0000]/20">
                🏷️ ${isEn ? item.categoryEn : item.categoryVi}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-900 font-mono text-xs border border-amber-300/40">
                ⏳ ${isEn ? item.eraEn : item.eraVi}
              </span>
            </div>

            <h4 class="font-serif text-xl sm:text-2xl font-bold text-[#8B0000] leading-snug">
              ${isEn ? item.titleEn : item.titleVi}
            </h4>

            <div class="relative pl-5 border-l-3 border-[#8B0000]/60 py-1">
              <p class="font-serif text-base sm:text-lg text-stone-800 leading-relaxed italic">
                "${isEn ? item.factEn : item.factVi}"
              </p>
            </div>
          </div>

          <!-- Historical Provenance Citation -->
          <div class="pt-3 border-t border-stone-200/80 flex items-center space-x-2 text-xs font-mono text-stone-500">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span>${isEn ? 'Historical Record / Reference:' : 'Nguồn Sử Liệu Trích Dẫn:'}</span>
            <strong class="text-stone-700">${item.source}</strong>
          </div>
        </div>

        <!-- Right: Cultural Philosophy Takeaway (4 cols) -->
        <div class="lg:col-span-4 bg-white/90 backdrop-blur-xs rounded-xl border border-[#D4AF37]/50 p-5 shadow-inner flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] uppercase mb-2">
              <i data-lucide="heart-handshake" class="w-4 h-4 text-[#8B0000]"></i>
              <span>${isEn ? 'Moral Philosophy Takeaway' : 'Thông Điệp Nhân Sinh'}</span>
            </div>
            <p class="text-sm font-sans text-stone-700 leading-relaxed">
              ${isEn ? item.philosophyEn : item.philosophyVi}
            </p>
          </div>

          <!-- Fact Carousel Quick Selector Dots -->
          <div class="pt-3 border-t border-stone-200/60 flex items-center justify-between">
            <span class="text-[11px] font-mono text-stone-400">
              ${isEn ? 'Browse 10 facts:' : '10 Tri thức cổ phong:'}
            </span>
            <div class="flex items-center space-x-1.5">
              ${CULTURAL_WISDOM_SNIPPETS.map((_, idx) => `
                <button 
                  class="wisdom-dot-btn w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-[#8B0000] scale-125 ring-2 ring-yellow-400' : 'bg-stone-300 hover:bg-stone-500'}" 
                  data-index="${idx}"
                  title="${isEn ? `Fact ${idx + 1}` : `Tri thức ${idx + 1}`}"
                ></button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMuseumGallerySection() {
  const isEn = state.lang === 'en';
  const filter = state.galleryEraFilter || 'all';
  const searchQuery = (state.gallerySearchQuery || '').toLowerCase().trim();

  let filteredCostumes = filter === 'all' 
    ? COSTUMES_DATA 
    : COSTUMES_DATA.filter(c => c.eraCategory === filter);

  if (searchQuery) {
    filteredCostumes = filteredCostumes.filter(c => 
      c.nameVi.toLowerCase().includes(searchQuery) ||
      c.nameEn.toLowerCase().includes(searchQuery) ||
      c.fabricsVi.toLowerCase().includes(searchQuery) ||
      c.fabricsEn.toLowerCase().includes(searchQuery) ||
      c.philosophyVi.toLowerCase().includes(searchQuery) ||
      c.philosophyEn.toLowerCase().includes(searchQuery) ||
      c.era.toLowerCase().includes(searchQuery) ||
      c.form.toLowerCase().includes(searchQuery)
    );
  }

  return `
    <section class="space-y-8" id="museumGallerySection">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-stone-200/80">
        <div>
          <div class="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>✦</span>
            <span>V-Museum Curated Gallery</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            ${t('museumTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl font-sans">
            ${t('museumSub')}
          </p>
        </div>

        <!-- Controls: Search & Era Filter Pills -->
        <div class="space-y-3 shrink-0">
          <!-- Dynamic Live Search -->
          <div class="relative w-full sm:w-72">
            <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            <input 
              type="text" 
              id="gallerySearchInput" 
              placeholder="${isEn ? 'Filter by fabric, era, symbol...' : 'Tìm theo chất liệu, niên đại, triết lý...'}"
              value="${state.gallerySearchQuery || ''}" 
              class="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all shadow-2xs"
            >
            ${state.gallerySearchQuery ? `
              <button id="clearGallerySearchBtn" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>

          <!-- Era Filter Pills -->
          <div class="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto">
            <button class="era-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === 'all' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-era="all">
              ${isEn ? 'All Costumes' : 'Tất cả'} (${COSTUMES_DATA.length})
            </button>
            <button class="era-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === 'nguyen' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-era="nguyen">
              ${isEn ? 'Nguyen Dynasty' : 'Triều Nguyễn'}
            </button>
            <button class="era-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === 'ly-tran-le' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-era="ly-tran-le">
              ${isEn ? 'Ly - Tran - Le' : 'Lý - Trần - Lê'}
            </button>
            <button class="era-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === 'folk' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-era="folk">
              ${isEn ? 'Folk Traditions' : 'Dân gian'}
            </button>
          </div>
        </div>
      </div>

      <!-- Real-Life Photography Showcase Banner for all 6 Costumes -->
      <div class="p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-[#261E1A] to-stone-900 text-white border-2 border-[#D4AF37]/50 shadow-md flex flex-col lg:flex-row items-center justify-between gap-4">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-xl bg-[#8B0000] border border-[#D4AF37] flex items-center justify-center text-2xl shadow-inner shrink-0">
            📸
          </div>
          <div>
            <div class="flex items-center space-x-2 text-[11px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider mb-0.5">
              <span>✦ Phân Hệ Nhiếp Ảnh Di Sản Thực Tế</span>
              <span class="text-stone-400">·</span>
              <span class="text-emerald-400">Đầy Đủ 6 Cổ Phục Chuẩn Xác</span>
            </div>
            <h4 class="font-serif text-lg font-bold text-white leading-snug">
              ${isEn ? '4K Real-Life Photography Studio & Interactive Split-Slider' : 'Phòng Triển Lãm Ảnh Thực Tế 4K & Kéo Trượt So Sánh Đối Chiếu'}
            </h4>
            <p class="text-xs text-stone-300 font-sans mt-0.5 max-w-xl leading-relaxed">
              ${isEn ? 'Experience all 6 traditional costumes captured in authentic Vietnamese heritage monuments with interactive macro tailoring pins and posing guides.' : 'Chiêm ngưỡng cả 6 loại cổ phục tại các di tích lịch sử có thật với kính lúp soi nếp may, ghim chi tiết may đo và cẩm nang tạo dáng ngoài đời thực.'}
            </p>
          </div>
        </div>

        <!-- 6 Quick Costume Real-Photo Buttons -->
        <div class="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 shrink-0">
          ${COSTUMES_DATA.map(c => `
            <button 
              type="button" 
              class="quick-open-realphoto-btn px-2.5 py-1.5 rounded-lg bg-stone-800/90 hover:bg-[#8B0000] border border-stone-700 hover:border-[#D4AF37] text-white text-[11px] font-mono font-bold transition-all shrink-0 flex items-center space-x-1 shadow-xs cursor-pointer hover:scale-105"
              data-costume-id="${c.id}"
              title="Xem ảnh thực tế & kéo trượt: ${c.nameVi}"
            >
              <span>📸</span>
              <span class="truncate max-w-[85px]">${c.nameVi.split('(')[0].trim()}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Global Visual Presentation Mode Selector (Real 4K vs Split vs Vector) -->
      <div class="flex flex-col sm:flex-row items-center justify-between bg-[#F5F1E8] p-3 rounded-2xl border border-[#D4AF37]/50 shadow-2xs gap-3">
        <div class="flex items-center space-x-2 text-xs font-mono">
          <span class="text-[#8B0000] font-bold">✨ ${isEn ? 'Display Mode for 6 Costumes:' : 'Chế Độ Hiển Thị 6 Cổ Phục:'}</span>
          <span class="text-stone-500 font-sans text-[11px] hidden sm:inline">${isEn ? '(Real 4K photography, split comparison, or vector blueprint)' : '(Ảnh chụp thực tế 4K, kéo trượt đối chiếu hoặc bản vẽ)'}</span>
        </div>
        <div class="flex items-center space-x-1.5 p-1 bg-white rounded-xl border border-stone-300 shadow-2xs">
          <button 
            type="button" 
            class="global-gallery-mode-btn px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${state.galleryGlobalMode === 'real' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}" 
            data-mode="real"
            title="${isEn ? 'Show realistic photography for all 6 costumes' : 'Xem toàn bộ 6 cổ phục bằng ảnh chụp thực tế 4K'}"
          >
            📸 ${isEn ? '4K Real Photos' : 'Ảnh Thật Chân Thực 4K (Khuyên dùng)'}
          </button>
          <button 
            type="button" 
            class="global-gallery-mode-btn px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${state.galleryGlobalMode === 'split' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}" 
            data-mode="split"
            title="${isEn ? 'Interactive split slider for all 6 costumes' : 'Kéo trượt đối chiếu bản vẽ & ảnh thật'}"
          >
            ⚡ ${isEn ? 'Split Slider' : 'So Sánh Kéo Trượt'}
          </button>
          <button 
            type="button" 
            class="global-gallery-mode-btn px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${state.galleryGlobalMode === 'svg' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}" 
            data-mode="svg"
            title="${isEn ? 'Vector blueprint illustrations' : 'Bản vẽ cấu trúc vector'}"
          >
            🎨 ${isEn ? 'Vector' : 'Bản Vẽ Vector'}
          </button>
        </div>
      </div>

      <!-- Costumes Dynamic Grid Gallery (Custom Inline SVG illustrations inside gold/red borders) -->
      ${filteredCostumes.length === 0 ? `
        <div class="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 font-mono text-xs">
          <i data-lucide="help-circle" class="w-8 h-8 text-stone-300 mx-auto mb-2"></i>
          <p>${isEn ? 'No heritage costumes matched your search query.' : 'Không tìm thấy cổ phục nào khớp với từ khóa tìm kiếm.'}</p>
          <button id="resetGalleryFiltersBtn" class="mt-3 px-4 py-1.5 rounded-lg bg-[#8B0000] text-white font-mono text-xs font-bold hover:bg-[#700000]">
            ${isEn ? 'Reset Filters' : 'Đặt Lại Bộ Lọc'}
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filteredCostumes.map(c => {
            const cardMode = state.cardImageMode[c.id] || state.galleryGlobalMode || 'real';
            const splitVal = state.cardSplitPos[c.id] !== undefined ? state.cardSplitPos[c.id] : 50;
            return `
            <div 
              class="costume-gallery-card group bg-white rounded-2xl border-2 border-[#D4AF37]/50 hover:border-[#8B0000] ring-1 ring-[#D4AF37]/20 hover:ring-[#8B0000]/30 p-6 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer relative overflow-hidden" 
              data-costume-id="${c.id}"
              title="${isEn ? 'Click anywhere on card to open historical dossier' : 'Nhấp vào thẻ để mở hồ sơ lịch sử chi tiết'}"
            >
              <!-- Traditional Corner Seal Accents -->
              <div class="absolute -top-12 -right-12 w-24 h-24 bg-radial from-[#D4AF37]/20 to-transparent rounded-full pointer-events-none group-hover:from-[#8B0000]/20 transition-all"></div>
              
              <div>
                <!-- Visual Card Frame with Inline SVG or Real-Life Photo -->
                <div class="relative w-full h-72 rounded-xl bg-radial from-[#FFFDF9] via-[#F8F4EC] to-[#EBE2D3] border border-[#D4AF37]/50 group-hover:border-[#8B0000]/50 p-3 mb-5 overflow-hidden flex items-center justify-center transition-colors shadow-inner">
                  <!-- Cultural Era Seal Badge -->
                  <div class="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[10px] font-bold tracking-wider shadow-sm border border-[#D4AF37]/60 z-20 flex items-center space-x-1">
                    <span>✦</span>
                    <span>${c.era}</span>
                  </div>

                  <!-- 3-Mode Visual Switcher (Vector / Split Slider / Real 4K) -->
                  <div class="absolute top-2.5 left-2.5 z-20 flex items-center bg-white/95 backdrop-blur-xs rounded-full p-0.5 border border-[#D4AF37]/60 shadow-xs" onclick="event.stopPropagation()">
                    <button 
                      type="button"
                      class="card-mode-btn px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all ${cardMode === 'svg' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'}"
                      data-costume-id="${c.id}"
                      data-mode="svg"
                      title="${isEn ? '2D Vector Illustration' : 'Bản Đồ Họa 2D'}"
                    >
                      🎨 Vector
                    </button>
                    <button 
                      type="button"
                      class="card-mode-btn px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all ${cardMode === 'split' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'}"
                      data-costume-id="${c.id}"
                      data-mode="split"
                      title="${isEn ? 'Interactive Split Comparison' : 'So Sánh Kéo Trượt'}"
                    >
                      ⚡ So Sánh
                    </button>
                    <button 
                      type="button"
                      class="card-mode-btn px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all ${cardMode === 'real' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'}"
                      data-costume-id="${c.id}"
                      data-mode="real"
                      title="${isEn ? 'Real-Life Photography 4K' : 'Ảnh Thực Tế 4K'}"
                    >
                      📸 Ảnh Thật
                    </button>
                  </div>

                  <!-- Quick Interactive Inspection Hint -->
                  <div class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white/90 font-mono text-[9px] flex items-center space-x-1 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                    <i data-lucide="eye" class="w-3 h-3 text-[#D4AF37]"></i>
                    <span>${isEn ? 'Dossier' : 'Hồ Sơ'}</span>
                  </div>

                  <!-- Content: Real Photo vs Split Slider vs Inline SVG Vector -->
                  ${cardMode === 'real' ? `
                    <div class="w-full h-full relative rounded-lg overflow-hidden flex items-center justify-center bg-stone-900 group/img">
                      <img 
                        src="${c.realPhotography?.heroPhoto}" 
                        alt="${isEn ? c.realPhotography?.photoTitleEn : c.realPhotography?.photoTitleVi}"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        class="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 filter brightness-95"
                        onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'flex flex-col items-center justify-center text-stone-300 p-4 text-center\\'><span class=\\'text-3xl mb-1\\'>📸</span><span class=\\'text-xs font-serif font-bold text-[#D4AF37]\\'>${c.realPhotography?.photoTitleVi}</span><span class=\\'text-[10px] text-stone-400 font-mono mt-1\\'>${c.realPhotography?.locationVi}</span></div>';"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none"></div>
                      
                      <!-- Quick Inspect Button in card corner -->
                      <button 
                        type="button" 
                        class="quick-card-lightbox-btn absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-lg bg-black/75 hover:bg-[#8B0000] text-white flex items-center space-x-1 text-[10px] font-mono font-bold transition-all border border-[#D4AF37]/60 shadow-md hover:scale-105 cursor-pointer backdrop-blur-xs"
                        data-costume-id="${c.id}"
                        title="${isEn ? 'Inspect 4K Tailoring & Craftsmanship' : 'Soi nếp may & chi tiết may đo 4K'}"
                        onclick="event.stopPropagation()"
                      >
                        <span>🔍</span>
                        <span>${isEn ? 'Inspect' : 'Soi Nếp May'}</span>
                      </button>

                      <div class="absolute bottom-2 left-2 right-2 text-white text-[11px] font-mono flex items-center justify-between pointer-events-none z-10">
                        <span class="truncate flex items-center space-x-1">
                          <i data-lucide="map-pin" class="w-3 h-3 text-[#D4AF37] shrink-0"></i>
                          <span class="text-xs text-stone-200 font-serif font-bold">${isEn ? c.realPhotography?.locationEn : c.realPhotography?.locationVi}</span>
                        </span>
                        <span class="text-[9px] bg-[#8B0000] px-2 py-0.5 rounded text-[#D4AF37] shrink-0 font-bold border border-[#D4AF37]/50 shadow-xs">
                          ✦ 4K CHÂN THỰC
                        </span>
                      </div>
                    </div>
                  ` : cardMode === 'split' ? `
                    <div class="w-full h-full relative rounded-lg overflow-hidden bg-stone-900 select-none shadow-inner" id="cardSplitFrame_${c.id}">
                      <!-- Right layer: Real Photo -->
                      <img 
                        src="${c.realPhotography?.heroPhoto}" 
                        alt="${c.nameVi} Real Photo"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        class="absolute inset-0 w-full h-full object-cover filter brightness-95 pointer-events-none"
                      />
                      <div class="absolute bottom-7 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[#D4AF37] font-mono text-[9px] font-bold pointer-events-none z-10 border border-[#D4AF37]/30">
                        📸 4K Thật
                      </div>

                      <!-- Left layer: Vector Graphic (Clipped) -->
                      <div 
                        id="cardSplitOverlay_${c.id}" 
                        class="absolute inset-0 w-full h-full bg-radial from-[#FFFDF9] via-[#F8F4EC] to-[#EBE2D3] flex items-center justify-center p-3 pointer-events-none"
                        style="clip-path: inset(0 calc(100% - ${splitVal}%) 0 0);"
                      >
                        <div class="w-full h-full flex items-center justify-center">
                          ${c.svgIllustration}
                        </div>
                        <div class="absolute bottom-7 left-2 px-1.5 py-0.5 rounded bg-[#8B0000]/90 text-white font-mono text-[9px] font-bold z-10 border border-white/20">
                          🎨 Vector
                        </div>
                      </div>

                      <!-- Divider Line -->
                      <div 
                        id="cardSplitDivider_${c.id}" 
                        class="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none z-20 shadow-md"
                        style="left: ${splitVal}%;"
                      >
                        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#8B0000] border border-[#D4AF37] text-white flex items-center justify-center text-[9px] font-bold shadow-md">
                          ⇄
                        </div>
                      </div>

                      <!-- Slider input overlay -->
                      <div class="absolute bottom-1 left-2 right-2 z-30 flex items-center space-x-1.5 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10" onclick="event.stopPropagation()">
                        <span class="text-[9px] font-mono text-stone-300 shrink-0">Trượt:</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="${splitVal}" 
                          class="card-split-range w-full h-1 bg-stone-700 accent-[#D4AF37] rounded cursor-ew-resize"
                          data-costume-id="${c.id}"
                          title="Kéo trượt so sánh bản vẽ và ảnh thật"
                          onclick="event.stopPropagation()"
                        />
                        <span class="text-[9px] font-mono text-[#D4AF37] font-bold w-6 text-right shrink-0" id="cardSplitValText_${c.id}">${splitVal}%</span>
                      </div>
                    </div>
                  ` : `
                    <div class="w-full h-full transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      ${c.svgIllustration}
                    </div>
                  `}
                </div>

                <!-- Form Category Badge -->
                <div class="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span class="text-[#8B0000] font-bold uppercase tracking-wider">✦ ${c.form}</span>
                  <span class="text-stone-400 font-normal">${c.eraCategory.toUpperCase()}</span>
                </div>

                <!-- Costume Title in Playfair Display Serif -->
                <h3 class="font-serif text-2xl font-bold text-[#222222] mb-2 group-hover:text-[#8B0000] transition-colors leading-snug">
                  ${isEn ? c.nameEn : c.nameVi}
                </h3>

                <!-- Short Editorial Description -->
                <p class="text-xs text-[#666666] line-clamp-2 leading-relaxed mb-4 font-sans">
                  ${isEn ? c.shortDescEn : c.shortDescVi}
                </p>

                <!-- Core Historical Data Showcase (Fabric, Era, Symbolism) -->
                <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs font-mono text-stone-700 mb-4 space-y-2 shadow-2xs group-hover:border-[#D4AF37]/50 transition-colors">
                  <div class="flex items-start space-x-2">
                    <span class="shrink-0 text-[#8B0000] font-bold">🏛️ ${isEn ? 'Era:' : 'Niên Đại:'}</span>
                    <span class="text-stone-900 font-semibold truncate">${c.era}</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <span class="shrink-0 text-amber-900 font-bold">🧵 ${isEn ? 'Fabric:' : 'Chất Liệu:'}</span>
                    <span class="text-stone-700 truncate" title="${isEn ? c.fabricsEn : c.fabricsVi}">${isEn ? c.fabricsEn : c.fabricsVi}</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <span class="shrink-0 text-emerald-900 font-bold">⚖️ ${isEn ? 'Symbol:' : 'Biểu Tượng:'}</span>
                    <span class="text-stone-700 truncate" title="${isEn ? c.philosophyEn : c.philosophyVi}">${isEn ? c.philosophyEn : c.philosophyVi}</span>
                  </div>
                </div>

                <!-- Click Hint Prompt -->
                <div class="text-[11px] font-mono text-[#8B0000] mb-3 flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <i data-lucide="info" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                  <span>${isEn ? 'Click card to view complete historical dossier' : 'Nhấp vào thẻ để mở hồ sơ lịch sử chi tiết'}</span>
                </div>
              </div>

              <!-- Action Buttons Row -->
              <div class="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-1.5 flex-wrap">
                <button 
                  class="view-costume-btn flex-1 py-2 px-2.5 rounded-xl border border-stone-300 hover:border-[#8B0000] text-xs font-mono font-bold text-[#222222] hover:text-[#8B0000] transition-colors cursor-pointer text-center bg-white shadow-2xs" 
                  data-costume-id="${c.id}"
                >
                  ${t('btnViewDetails')}
                </button>
                <button 
                  type="button"
                  class="btn-view-realphoto py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center space-x-1" 
                  data-costume-id="${c.id}" 
                  title="${isEn ? 'View Real-Life Photography Gallery' : 'Xem Ảnh Chụp Ngoài Đời Thực'}"
                >
                  <span>📸</span>
                  <span>${isEn ? 'Real Photos' : 'Ảnh Thực Tế'}</span>
                </button>
                <button 
                  class="deconstruct-costume-btn py-2 px-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center space-x-1" 
                  data-costume-id="${c.id}" 
                  title="${isEn ? '2D Anatomy Deconstruction' : 'Bóc tách lớp áo 2D'}"
                >
                  <i data-lucide="scissors" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? '2D' : 'Bóc Tách'}</span>
                </button>
                <button 
                  class="try-costume-btn py-2 px-2.5 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-xs hover:shadow-md hover:scale-102 flex items-center space-x-1" 
                  data-costume-id="${c.id}" 
                  title="${t('btnTryThis')}"
                >
                  <i data-lucide="wand-2" class="w-3.5 h-3.5"></i>
                  <span>${t('btnTryThis')}</span>
                </button>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      `}
    </section>
  `;
}

function renderVietnamCostumeMapSection() {
  const isEn = state.lang === 'en';
  const activeRegId = state.activeMapRegionId || 'all';
  const isAll = activeRegId === 'all';
  const activeReg = VIETNAM_REGIONS_DATA.find(r => r.id === activeRegId) || VIETNAM_REGIONS_DATA[0];

  const displayCostumes = isAll
    ? COSTUMES_DATA
    : COSTUMES_DATA.filter(c => activeReg.costumeIds.includes(c.id));

  // Determine active hotspots based on filter and view mode
  const showAll = state.showAllHotspotsOnMap !== false;
  const showLabels = state.showMapPinLabels !== false;
  const onlyCostumes = state.filterOnlyCostumeProvinces === true;

  let visibleHotspots = MAP_PROVINCES_HOTSPOTS;
  if (activeRegId !== 'all') {
    visibleHotspots = MAP_PROVINCES_HOTSPOTS.filter(h => h.regionId === activeRegId);
  } else if (!showAll) {
    visibleHotspots = MAP_PROVINCES_HOTSPOTS.filter(h => h.isMajor);
  }

  if (onlyCostumes) {
    visibleHotspots = visibleHotspots.filter(h => h.hasCostume);
  }

  // Active province hotspot object
  const activeHotspot = MAP_PROVINCES_HOTSPOTS.find(h => 
    h.id === state.activeProvinceHotspotId || 
    h.provinceVi === state.selectedProvince ||
    (state.selectedProvince && state.selectedProvince.includes(h.provinceVi))
  ) || MAP_PROVINCES_HOTSPOTS[0];

  // 63 Provinces organized by regions
  const PROVINCE_GROUPS = [
    {
      groupVi: "Miền Bắc (Thăng Long - Hà Nội, Kinh Bắc & Tây Bắc)",
      groupEn: "Northern Vietnam (Hanoi, Kinh Bac & Northwest)",
      provinces: ["Hà Nội", "Bắc Ninh", "Hải Phòng", "Quảng Ninh", "Ninh Bình", "Hải Dương", "Hưng Yên", "Nam Định", "Thái Bình", "Hà Nam", "Vĩnh Phúc", "Bắc Giang", "Phú Thọ", "Thái Nguyên", "Tuyên Quang", "Hà Giang", "Cao Bằng", "Bắc Kạn", "Lạng Sơn", "Lào Cai", "Yên Bái", "Sơn La", "Điện Biên", "Lai Châu", "Hòa Bình"]
    },
    {
      groupVi: "Cố Đô Huế & Bắc Trung Bộ",
      groupEn: "Hue Imperial Capital & North Central",
      provinces: ["Thừa Thiên Huế", "Quảng Trị", "Quảng Bình", "Hà Tĩnh", "Nghệ An", "Thanh Hóa"]
    },
    {
      groupVi: "Duyên Hải Nam Trung Bộ & Hội An",
      groupEn: "South Central Coast & Hoi An",
      provinces: ["Đà Nẵng", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận"]
    },
    {
      groupVi: "Quần Đảo Hoàng Sa & Trường Sa (Biển Đông)",
      groupEn: "Paracel & Spratly Sacred Archipelagos (East Sea)",
      provinces: ["Quần đảo Hoàng Sa (TP. Đà Nẵng)", "Quần đảo Trường Sa (Tỉnh Khánh Hòa)"]
    },
    {
      groupVi: "Tây Nguyên Đại Ngàn",
      groupEn: "Central Highlands (Tay Nguyen)",
      provinces: ["Đắk Lắk", "Gia Lai", "Kon Tum", "Lâm Đồng", "Đắk Nông"]
    },
    {
      groupVi: "Miền Nam (Sài Gòn - Gia Định & Tây Nam Bộ)",
      groupEn: "Southern Vietnam (Saigon & Mekong Delta)",
      provinces: ["TP. Hồ Chí Minh", "Cần Thơ", "Bình Dương", "Đồng Nai", "Bà Rịa - Vũng Tàu (Côn Đảo)", "Tây Ninh", "Bình Phước", "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long", "Đồng Tháp", "An Giang", "Kiên Giang (Phú Quốc)", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Cà Mau"]
    }
  ];

  return `
    <section id="vietnamCostumeMapSection" class="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-10 shadow-sm relative overflow-hidden space-y-8">
      <!-- Watermark accents -->
      <div class="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#8B0000]/5 pointer-events-none blur-2xl"></div>

      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span>${isEn ? 'GEOGRAPHICAL HERITAGE · VIETNAM COSTUME ATLAS' : 'ĐỊA LÝ DI SẢN · BẢN ĐỒ CỔ PHỤC VIỆT NAM'}</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            ${isEn ? '63 Provinces & Maritime Territories Costume Atlas' : 'Bản Đồ Cổ Phục 63 Tỉnh Thành & Biển Đảo Việt Nam'}
          </h2>
          <p class="text-sm text-[#666666] mt-1 max-w-2xl font-sans leading-relaxed">
            ${isEn 
              ? 'Comprehensive interactive map with 40+ cultural hotspots matching the official territorial geography of Vietnam. Click any province or sacred island pin to discover native costumes, weaving crafts, and history.' 
              : 'Bản đồ tương tác chi tiết với hơn 40 tọa độ di sản khớp chuẩn xác theo địa lý lãnh thổ Việt Nam. Nhấp vào bất kỳ tỉnh thành hoặc hải đảo thiêng liêng nào để khám phá cổ phục, làng nghề dệt lụa và sử liệu triết học.'}
          </p>
        </div>

        <!-- Quick Region Selector Pills -->
        <div class="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto max-w-full">
          <button 
            class="map-region-btn px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${activeRegId === 'all' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'}" 
            data-region-id="all"
          >
            <span>${isEn ? 'All Regions' : 'Toàn Quốc (Tất cả)'}</span>
          </button>
          ${VIETNAM_REGIONS_DATA.map(reg => `
            <button 
              class="map-region-btn px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${activeRegId === reg.id ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'}" 
              data-region-id="${reg.id}"
            >
              <span>${isEn ? reg.nameEn.split('(')[0].trim() : reg.nameVi.split('(')[0].trim()}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Province Search & Filter Control Bar -->
      <div class="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/50 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] shrink-0">
          <i data-lucide="compass" class="w-4 h-4 text-[#8B0000]"></i>
          <span>${isEn ? 'Search Province / Island:' : 'Tra cứu 63 tỉnh thành & biển đảo:'}</span>
        </div>
        
        <div class="flex-1 w-full flex items-center gap-2">
          <select 
            id="vietnamProvinceSelect" 
            class="flex-1 px-3.5 py-2 rounded-lg bg-white border border-stone-300 font-sans text-xs text-[#222222] focus:ring-2 focus:ring-[#8B0000] outline-none shadow-2xs cursor-pointer"
          >
            <option value="">${isEn ? '--- Choose a Province / Island (63 Provinces & Maritime) ---' : '--- Chọn Tỉnh / Thành phố / Quần đảo (63 tỉnh thành & biển đảo) ---'}</option>
            ${PROVINCE_GROUPS.map(g => `
              <optgroup label="📍 ${isEn ? g.groupEn : g.groupVi}">
                ${g.provinces.map(p => `
                  <option value="${p}" ${state.selectedProvince === p ? 'selected' : ''}>
                    ${p}
                  </option>
                `).join('')}
              </optgroup>
            `).join('')}
          </select>

          ${state.selectedProvince ? `
            <span class="px-2.5 py-1.5 bg-[#8B0000]/10 border border-[#8B0000]/30 rounded-lg text-xs font-mono font-bold text-[#8B0000] whitespace-nowrap shrink-0 flex items-center space-x-1">
              <span>📍</span>
              <span>${state.selectedProvince}</span>
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Main Layout: Left Map (5 Cols) vs Right Regional Costumes (7 Cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Authentic Geographic & Administrative Vietnam Heritage Image Map (5 Cols) -->
        <div class="lg:col-span-5 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/40 p-4 md:p-6 shadow-xs relative flex flex-col items-center">
          
          <!-- Image Map Control Header: Switch Photo / View Full / Density Toggle -->
          <div class="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono mb-3 pb-3 border-b border-stone-200">
            <span class="flex items-center space-x-1.5 font-bold text-[#8B0000]">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>${isEn ? 'Vietnam Heritage Map' : 'Bản Đồ Cổ Phục Chuẩn Xác'}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-[#8B0000]/10 text-[#8B0000] font-mono">
                ${visibleHotspots.length} điểm
              </span>
            </span>

            <!-- Image Map Actions Toolbar -->
            <div class="flex items-center space-x-1.5 flex-wrap justify-end">
              <!-- Toggle Pin Density (All vs Major) -->
              <button 
                id="btnToggleMapDensity" 
                class="px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${showAll && !onlyCostumes ? 'bg-[#8B0000] text-white' : 'bg-white border border-stone-300 text-stone-700'} shadow-2xs flex items-center space-x-1"
                title="${showAll ? (isEn ? 'Show major hubs only' : 'Chỉ hiện điểm tiêu biểu') : (isEn ? 'Show all 44+ provinces' : 'Hiện tất cả 44+ tỉnh thành')}"
              >
                <i data-lucide="layers" class="w-3 h-3"></i>
                <span>${showAll ? (isEn ? 'All (44+)' : 'Tất cả (44+)') : (isEn ? 'Key Hubs' : 'Tiêu biểu')}</span>
              </button>

              <!-- Toggle Costumes Only Filter -->
              <button 
                id="btnToggleCostumesOnly" 
                class="px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${onlyCostumes ? 'bg-amber-600 text-white ring-2 ring-amber-300 shadow-xs' : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-50'} shadow-2xs flex items-center space-x-1"
                title="${onlyCostumes ? (isEn ? 'Show all provinces' : 'Xem toàn bộ 44+ tỉnh thành') : (isEn ? 'Filter to provinces with V-Mix costumes (6 locations)' : 'Chỉ hiện các tỉnh có Cổ phục V-Mix (6 tọa độ)')}"
              >
                <i data-lucide="crown" class="w-3 h-3 ${onlyCostumes ? 'text-yellow-200' : 'text-amber-700'}"></i>
                <span>${onlyCostumes ? (isEn ? 'Costumes Only' : 'Chỉ Tỉnh Cổ Phục') : (isEn ? 'Costume Hubs' : 'Tỉnh Cổ Phục')}</span>
              </button>

              <!-- Toggle Labels Visibility -->
              <button 
                id="btnToggleMapLabels" 
                class="px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${showLabels ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-white border border-stone-300 text-stone-600'} shadow-2xs flex items-center space-x-1"
                title="${isEn ? 'Toggle province labels' : 'Bật / tắt tên tỉnh trên bản đồ'}"
              >
                <i data-lucide="type" class="w-3 h-3"></i>
                <span>${showLabels ? (isEn ? 'Labels On' : 'Nhãn: Bật') : (isEn ? 'Labels Off' : 'Nhãn: Tắt')}</span>
              </button>

              <!-- Upload Custom Image Button -->
              <label 
                for="mapImageUploadInput" 
                class="px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer bg-white border border-[#D4AF37] text-[#8B0000] hover:bg-[#8B0000] hover:text-white shadow-2xs flex items-center space-x-1"
                title="${isEn ? 'Upload custom map photo' : 'Đổi ảnh bản đồ của bạn'}"
              >
                <i data-lucide="upload" class="w-3 h-3"></i>
                <span>${isEn ? 'Upload' : 'Đổi Ảnh'}</span>
              </label>
              <input type="file" id="mapImageUploadInput" accept="image/*" class="hidden" />

              ${state.customMapImage ? `
                <button 
                  id="btnResetMapImage" 
                  class="px-1.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer bg-stone-200 hover:bg-stone-300 text-stone-700 shadow-2xs"
                  title="${isEn ? 'Reset to default map' : 'Khôi phục ảnh gốc'}"
                >
                  <i data-lucide="rotate-ccw" class="w-3 h-3"></i>
                </button>
              ` : ''}

              <!-- View Full Image Modal Button -->
              <button 
                id="btnViewFullMapImage" 
                class="px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer bg-[#8B0000]/10 hover:bg-[#8B0000]/20 text-[#8B0000] border border-[#8B0000]/30 shadow-2xs flex items-center space-x-1"
                title="${isEn ? 'Expand full image view' : 'Xem toàn màn hình'}"
              >
                <i data-lucide="maximize-2" class="w-3 h-3"></i>
              </button>
            </div>
          </div>

          <!-- Main Interactive Map Image Container (Drop Zone + Overlaid Cultural Hotspots) -->
          <div 
            id="vietnamMapImageContainer" 
            class="w-full relative rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-inner bg-[#FBF7EE] group select-none"
          >
            <!-- Map Image Element (Aspect ratio preserved with max height) -->
            <img 
              id="vietnamMapImage" 
              src="${state.customMapImage || mapImageDefault || '/src/assets/images/regenerated_image_1790863673225.jpg'}" 
              alt="Bản Đồ Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam" 
              referrerpolicy="no-referrer"
              class="w-full h-auto object-contain block transition-transform duration-300 max-h-[760px] mx-auto"
            />

            <!-- Drag & Drop Hover Mask -->
            <div id="mapDropOverlay" class="absolute inset-0 bg-[#8B0000]/85 text-white flex flex-col items-center justify-center p-6 text-center space-y-2 opacity-0 pointer-events-none transition-opacity duration-200 z-30">
              <i data-lucide="file-image" class="w-12 h-12 text-yellow-300 animate-bounce"></i>
              <p class="font-serif text-lg font-bold text-yellow-100">Thả ảnh bản đồ của bạn vào đây</p>
              <p class="text-xs text-stone-200">Hệ thống sẽ ngay lập tức sử dụng ảnh bản đồ này cho ứng dụng</p>
            </div>

            <!-- Interactive Cultural Hotspots Overlay (Precision Pinned Across Vietnam) -->
            <div class="absolute inset-0 pointer-events-none">
              ${visibleHotspots.map(h => {
                const isActive = (
                  h.id === activeHotspot.id || 
                  h.provinceVi === state.selectedProvince ||
                  (state.selectedProvince && state.selectedProvince.includes(h.provinceVi))
                );

                const isIslands = (h.id === 'hoang-sa' || h.id === 'truong-sa');
                const isCostumeHub = h.hasCostume === true;

                // Coordinate label positioning: left-side vs right-side placement
                const labelOnLeft = h.left > 35 && !isIslands;

                if (isIslands) {
                  return `
                    <button 
                      class="map-img-hotspot pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group/pin z-20"
                      style="top: ${h.top}%; left: ${h.left}%;"
                      data-hotspot-id="${h.id}"
                      data-region-id="${h.regionId}"
                      data-province="${h.provinceVi}"
                      title="${isEn ? h.provinceEn : h.provinceVi}: ${isEn ? h.craftEn : h.craftVi}"
                    >
                      <div class="relative flex flex-col items-center justify-center">
                        <span class="absolute w-8 h-8 rounded-full bg-red-500/40 animate-ping ${isActive ? 'opacity-100' : 'opacity-60'}"></span>
                        <div class="px-2 py-1 rounded-md bg-[#8B0000] border-2 border-yellow-300 text-yellow-200 shadow-xl flex items-center space-x-1 ${isActive ? 'ring-3 ring-yellow-400 scale-110 font-bold' : 'hover:scale-105'} transition-transform">
                          <span class="text-xs">🇻🇳</span>
                          <span class="text-[10px] font-mono font-bold tracking-tight uppercase">${h.id === 'hoang-sa' ? 'HOÀNG SA' : 'TRƯỜNG SA'}</span>
                        </div>
                      </div>
                    </button>
                  `;
                }

                if (isCostumeHub) {
                  return `
                    <button 
                      class="map-img-hotspot pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group/pin ${isActive ? 'z-30' : 'z-20'}"
                      style="top: ${h.top}%; left: ${h.left}%;"
                      data-hotspot-id="${h.id}"
                      data-region-id="${h.regionId}"
                      data-province="${h.provinceVi}"
                      title="${isEn ? h.provinceEn : h.provinceVi} - 👑 ${isEn ? h.costumeEn : h.costumeVi}"
                    >
                      <div class="relative flex items-center justify-center">
                        <!-- Golden Aura for Core Costume Cradle -->
                        <span class="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping"></span>
                        <span class="absolute w-10 h-10 rounded-full bg-[#8B0000]/25 animate-pulse"></span>

                        <!-- Royal Pin Badge -->
                        <div class="
                          ${isActive 
                            ? 'w-7 h-7 bg-gradient-to-tr from-[#8B0000] to-amber-600 ring-3 ring-yellow-300 scale-125 text-white shadow-xl' 
                            : 'w-6 h-6 bg-gradient-to-tr from-[#8B0000] to-amber-600 hover:from-amber-600 hover:to-[#8B0000] ring-2 ring-yellow-300 text-yellow-100 shadow-lg hover:scale-120'}
                          rounded-full flex items-center justify-center transition-all duration-150 font-bold text-[10px] relative
                        ">
                          <span class="absolute -top-1.5 -right-1 text-[9px] filter drop-shadow">👑</span>
                          <span>${h.icon || '👘'}</span>
                        </div>

                        <!-- Label for Costume Cradle -->
                        <span class="
                          ${labelOnLeft ? 'right-6 mr-1' : 'left-6 ml-1'}
                          absolute whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-sans shadow-md backdrop-blur-xs transition-all pointer-events-none flex items-center space-x-1
                          ${isActive 
                            ? 'bg-[#8B0000] text-yellow-200 ring-2 ring-yellow-400 font-bold z-30 opacity-100 scale-110' 
                            : (showLabels || h.isMajor 
                                ? 'bg-amber-950/90 text-amber-200 font-bold border border-amber-400/60 opacity-95 group-hover/pin:scale-105' 
                                : 'bg-stone-900/90 text-white opacity-0 group-hover/pin:opacity-100 scale-95 group-hover/pin:scale-100')
                          }
                        ">
                          <span>👑</span>
                          <span>${isEn ? h.provinceEn.split('(')[0].trim() : h.provinceVi.split('(')[0].trim()}</span>
                        </span>
                      </div>
                    </button>
                  `;
                }

                // Regular Heritage Province without core costume
                return `
                  <button 
                    class="map-img-hotspot pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group/pin ${isActive ? 'z-30' : 'z-10'}"
                    style="top: ${h.top}%; left: ${h.left}%;"
                    data-hotspot-id="${h.id}"
                    data-region-id="${h.regionId}"
                    data-province="${h.provinceVi}"
                    title="${isEn ? h.provinceEn : h.provinceVi} - 🎋 ${isEn ? h.craftEn : h.craftVi}"
                  >
                    <div class="relative flex items-center justify-center">
                      ${isActive ? `
                        <span class="absolute w-6 h-6 rounded-full bg-stone-500/40 animate-ping"></span>
                        <span class="absolute w-8 h-8 rounded-full bg-stone-700/20 animate-pulse"></span>
                      ` : ''}

                      <!-- Pin Dot / Badge -->
                      <div class="
                        ${h.isMajor 
                          ? (isActive 
                              ? 'w-5 h-5 bg-stone-800 ring-2 ring-stone-300 scale-120 text-white shadow-md' 
                              : 'w-4 h-4 bg-stone-700 hover:bg-stone-800 ring-1 ring-white/90 text-stone-200 shadow-xs hover:scale-115') 
                          : (isActive 
                              ? 'w-4.5 h-4.5 bg-stone-800 ring-2 ring-stone-300 scale-120 text-white shadow-xs' 
                              : 'w-3 h-3 bg-stone-600/90 hover:bg-stone-700 ring-1 ring-white/80 text-white shadow-xs hover:scale-125')
                        } 
                        rounded-full flex items-center justify-center transition-all duration-150 font-bold text-[8px]
                      ">
                        ${h.icon || '📍'}
                      </div>

                      <!-- Province Label -->
                      <span class="
                        ${labelOnLeft ? 'right-5 mr-1' : 'left-5 ml-1'}
                        absolute whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-sans shadow-md backdrop-blur-xs transition-all pointer-events-none
                        ${isActive 
                          ? 'bg-stone-900 text-stone-100 ring-1 ring-stone-400 font-bold z-30 opacity-100 scale-105' 
                          : (showLabels || h.isMajor 
                              ? 'bg-stone-900/80 text-stone-200 font-medium group-hover/pin:bg-stone-900 opacity-85 group-hover/pin:opacity-100' 
                              : 'bg-stone-900/90 text-white opacity-0 group-hover/pin:opacity-100 scale-95 group-hover/pin:scale-100')
                        }
                      ">
                        ${isEn ? h.provinceEn.split('(')[0].trim() : h.provinceVi.split('(')[0].trim()}
                      </span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Official National Sovereignty Assertion Banner -->
          <div class="mt-3 p-2.5 rounded-xl bg-[#8B0000]/10 border border-[#8B0000]/30 text-xs font-sans text-[#8B0000] font-semibold text-center flex items-center justify-center space-x-2 w-full shadow-2xs">
            <span class="text-sm">🇻🇳</span>
            <span class="text-[11px] leading-tight">${isEn 
              ? 'Sacred territorial integrity of Vietnam: Full mainland with Paracel (Hoang Sa) and Spratly (Truong Sa) archipelagos.' 
              : 'Khẳng định chủ quyền toàn vẹn lãnh thổ Nước CHXHCN Việt Nam bao gồm đất liền cùng hai quần đảo Hoàng Sa và Trường Sa thiêng liêng.'}</span>
          </div>

          <!-- Interactive Province Spotlight Card (Góc Di Sản Tỉnh Thành Được Chọn) -->
          <div id="provinceSpotlightCard" class="mt-3 w-full bg-white rounded-xl ${activeHotspot.hasCostume ? 'border-2 border-amber-400/80 shadow-md' : 'border border-stone-200 shadow-sm'} p-4 space-y-3 transition-all relative overflow-hidden">
            ${activeHotspot.hasCostume ? `
              <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-400/10 pointer-events-none blur-xl"></div>
            ` : ''}

            <div class="flex items-center justify-between border-b border-stone-200/80 pb-2">
              <div class="flex items-center space-x-2">
                <span class="text-lg p-1.5 rounded-lg ${activeHotspot.hasCostume ? 'bg-amber-100 border border-amber-300 text-[#8B0000]' : 'bg-stone-100 text-stone-700'}">
                  ${activeHotspot.icon || (activeHotspot.hasCostume ? '👑' : '📍')}
                </span>
                <div>
                  <div class="flex items-center space-x-1.5">
                    <h4 class="font-serif text-base font-bold text-[#222222]">
                      ${isEn ? activeHotspot.provinceEn : activeHotspot.provinceVi}
                    </h4>
                    ${activeHotspot.hasCostume ? `
                      <span class="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold flex items-center space-x-1">
                        <span>👑</span>
                        <span>${isEn ? 'Core Costume' : 'Có Cổ Phục V-Mix'}</span>
                      </span>
                    ` : ''}
                  </div>
                  <span class="text-[10px] font-mono text-[#8B0000] font-semibold uppercase">
                    ✦ ${VIETNAM_REGIONS_DATA.find(r => r.id === activeHotspot.regionId)?.nameVi.split('(')[0].trim() || 'Việt Nam'}
                  </span>
                </div>
              </div>

              <span class="text-[10px] font-mono px-2 py-0.5 rounded-md ${activeHotspot.hasCostume ? 'bg-[#8B0000] text-yellow-200 font-bold shadow-2xs' : 'bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#8B0000] font-bold'}">
                ${activeHotspot.hasCostume ? (isEn ? 'Core Collection' : 'BST Cốt Lõi') : (isEn ? 'Heritage Landmark' : 'Tọa độ di sản')}
              </span>
            </div>

            ${activeHotspot.hasCostume ? `
              <!-- Featured Costume for this Province (Officially in V-Museum collection) -->
              <div class="p-3 rounded-lg bg-gradient-to-r from-amber-50/90 to-orange-50/70 border border-amber-200 text-xs space-y-1.5">
                <div class="flex items-start space-x-1.5 text-stone-800">
                  <span class="font-bold text-[#8B0000] shrink-0">👘 Cổ phục chính thức:</span>
                  <span class="font-bold font-serif text-[#8B0000] text-sm">${isEn ? activeHotspot.costumeEn : activeHotspot.costumeVi}</span>
                </div>
                <div class="flex items-start space-x-1.5 text-stone-700">
                  <span class="font-bold text-amber-800 shrink-0">🧵 Làng nghề dệt may:</span>
                  <span class="font-sans text-stone-600 text-[11px]">${isEn ? activeHotspot.craftEn : activeHotspot.craftVi}</span>
                </div>
                <p class="text-stone-700 text-[11px] font-sans leading-relaxed pt-1 border-t border-amber-200/60">
                  ${isEn ? activeHotspot.descEn : activeHotspot.descVi}
                </p>
              </div>

              <!-- Fast Action Buttons for provinces with costume -->
              <div class="pt-1 flex items-center gap-2">
                <button 
                  class="btn-open-costume-modal flex-1 py-2 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F0ECE1] border border-[#D4AF37] text-xs font-mono font-bold text-[#8B0000] transition-colors cursor-pointer text-center flex items-center justify-center space-x-1.5 shadow-2xs"
                  data-costume-id="${activeHotspot.costumeId}"
                >
                  <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
                  <span>${isEn ? 'Inspect in V-Museum' : 'Chiêm Ngưỡng Trong V-Museum'}</span>
                </button>
                <button 
                  class="btn-try-costume-studio py-2 px-3.5 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md hover:scale-102 flex items-center space-x-1.5"
                  data-costume-id="${activeHotspot.costumeId}"
                >
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 text-yellow-300"></i>
                  <span>${isEn ? 'Try On in V-Studio' : 'Thử Đồ Tại V-Studio'}</span>
                </button>
              </div>
            ` : `
              <!-- Regular Province without core costume -->
              <div class="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                <div class="flex items-start space-x-1.5 text-stone-600">
                  <span class="font-bold text-stone-500 shrink-0">ℹ️ Cổ phục:</span>
                  <span class="font-sans text-stone-600 italic">Chưa có bộ trang phục riêng trong 5 Cổ phục V-Museum</span>
                </div>
                <div class="flex items-start space-x-1.5 text-stone-700">
                  <span class="font-bold text-amber-800 shrink-0">🧵 Làng nghề & Bản sắc:</span>
                  <span class="font-sans text-stone-700 text-[11px] font-medium">${isEn ? activeHotspot.craftEn : activeHotspot.craftVi}</span>
                </div>
                <p class="text-stone-600 text-[11px] font-sans leading-relaxed pt-1 border-t border-stone-200">
                  ${isEn ? activeHotspot.descEn : activeHotspot.descVi}
                </p>
              </div>

              <!-- Recommendation of closest style -->
              <div class="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs font-sans">
                <div class="flex items-center space-x-1 text-stone-700 text-[11px]">
                  <span class="text-amber-800 font-bold">💡 Gợi ý Cổ phục phù hợp:</span>
                  <strong class="text-[#8B0000]">
                    ${activeHotspot.regionId === 'bac-bo' ? 'Áo Tứ Thân / Áo Ngũ Thân' : (activeHotspot.regionId === 'nam-bo' ? 'Áo Bà Ba' : 'Áo Ngũ Thân / Nhật Bình')}
                  </strong>
                </div>
                <button 
                  class="btn-open-costume-modal py-1 px-2.5 rounded-md bg-[#8B0000] text-white text-[10px] font-mono font-bold hover:bg-[#700000] transition-colors cursor-pointer"
                  data-costume-id="${activeHotspot.regionId === 'bac-bo' ? 'tu-than' : (activeHotspot.regionId === 'nam-bo' ? 'ba-ba' : 'ngu-than')}"
                >
                  ${isEn ? 'Explore style →' : 'Khám phá →'}
                </button>
              </div>
            `}
          </div>

          <!-- Bottom map status indicator with image tip -->
          <div class="mt-2 p-2 bg-white/90 rounded-xl border border-stone-200 text-xs font-mono w-full flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px]">
            <div class="flex items-center space-x-1.5 text-stone-600">
              <span>📍 ${isEn ? 'Zone:' : 'Vùng:'}</span>
              <span class="font-bold text-[#8B0000]">${isAll ? (isEn ? 'All Vietnam Heritage Zones' : 'Toàn Bộ Các Vùng Di Sản') : (isEn ? activeReg.nameEn : activeReg.nameVi)}</span>
            </div>
            <span class="text-[10px] text-stone-500 font-sans italic">
              💡 ${isEn ? 'Click any pin on map to inspect' : 'Nhấp bất kỳ điểm nào trên bản đồ để tra cứu'}
            </span>
          </div>
        </div>

        <!-- Right: Regional Costumes & Historical Context (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Region Detail Overview Card -->
          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/30 shadow-2xs space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
              <div>
                <span class="text-[11px] font-mono font-bold text-[#8B0000] uppercase tracking-wider">
                  ✦ ${isAll ? (isEn ? 'Nationwide Atlas' : 'Bản Đồ Toàn Quốc') : (isEn ? activeReg.tagEn : activeReg.tagVi)}
                </span>
                <h3 class="font-serif text-2xl font-bold text-[#222222] mt-0.5">
                  ${isAll ? (isEn ? 'Traditional Costumes of Vietnam' : 'Toàn Cảnh Cổ Phục Việt Nam') : (isEn ? activeReg.nameEn : activeReg.nameVi)}
                </h3>
              </div>
              <span class="px-3 py-1 rounded-full bg-white border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#8B0000]">
                ${isAll ? '1744 - 2026' : (isEn ? activeReg.eraEn : activeReg.eraVi)}
              </span>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              ${isAll 
                ? (isEn 
                    ? 'Vietnam traditional attire reflects the philosophical harmony between nature, filial piety, and civic virtue across three cultural regions and maritime horizons.' 
                    : 'Hệ thống cổ phục Việt Nam trải dài qua các thời kỳ lịch sử Lý, Trần, Lê, Nguyễn phản ánh triết lý Nho giáo, lòng hiếu thảo Tứ thân phụ mẫu, sự mộc mạc kiên cường và đức khiêm nhường của dân tộc.') 
                : (isEn ? activeReg.descriptionEn : activeReg.descriptionVi)}
            </p>

            <!-- Metadata info chips -->
            ${!isAll ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
                  <span class="text-[#8B0000] font-bold block mb-1">🏛️ ${isEn ? 'Cultural Provinces / Islands:' : 'Tỉnh thành & Đơn vị tiêu biểu:'}</span>
                  <span class="text-stone-700 font-sans leading-relaxed">${activeReg.provincesVi.join(', ')}</span>
                </div>
                <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
                  <span class="text-amber-800 font-bold block mb-1">🧵 ${isEn ? 'Textile Crafts & Lore:' : 'Làng nghề dệt & Lễ hội di sản:'}</span>
                  <span class="text-stone-700 font-sans leading-relaxed">${isEn ? activeReg.craftVillagesEn : activeReg.craftVillagesVi}</span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Costumes List Header -->
          <div class="flex items-center justify-between">
            <h4 class="font-serif text-xl font-bold text-[#222222] flex items-center space-x-2">
              <i data-lucide="sparkles" class="w-4 h-4 text-[#D4AF37]"></i>
              <span>${isEn ? 'Featured Traditional Costumes' : 'Các Bộ Cổ Phục Đặc Trưng Tại Vùng Này'}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono font-bold">${displayCostumes.length} bộ</span>
            </h4>
          </div>

          <!-- Costume Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${displayCostumes.map(c => {
              // Find matching regional note if available
              const highlight = activeReg?.costumeHighlightsVi?.find(h => h.costumeId === c.id);

              return `
                <div class="p-4 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] transition-all hover:shadow-md flex flex-col justify-between group space-y-3">
                  <div>
                    <!-- Top SVG mini showcase -->
                    <div class="h-40 rounded-lg bg-[#FAF7F2] p-2 border border-stone-100 flex items-center justify-center overflow-hidden mb-3 relative group-hover:scale-102 transition-transform">
                      ${c.svgIllustration}
                      <span class="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/90 border border-stone-200 text-stone-700 font-semibold">
                        ${c.eraCategory.toUpperCase()}
                      </span>
                    </div>

                    <!-- Title & Form -->
                    <div class="flex items-center justify-between text-[11px] font-mono text-[#8B0000] mb-1">
                      <span class="font-bold">✦ ${c.form.split('(')[0].trim()}</span>
                      <span class="text-stone-400">${c.era.split('-')[0].trim()}</span>
                    </div>
                    <h5 class="font-serif text-lg font-bold text-[#222222] group-hover:text-[#8B0000] transition-colors leading-snug">
                      ${isEn ? c.nameEn : c.nameVi}
                    </h5>

                    <!-- Regional Cultural Note -->
                    <p class="text-xs text-stone-600 font-sans mt-2 line-clamp-2 leading-relaxed">
                      ${highlight ? highlight.reasonVi : (isEn ? c.shortDescEn : c.shortDescVi)}
                    </p>
                  </div>

                  <!-- Actions -->
                  <div class="pt-3 border-t border-stone-100 flex items-center gap-2">
                    <button 
                      class="map-view-costume-btn flex-1 py-1.5 px-2 rounded-lg border border-stone-300 hover:border-[#8B0000] text-xs font-mono font-bold text-[#222222] hover:text-[#8B0000] transition-colors cursor-pointer text-center bg-white"
                      data-costume-id="${c.id}"
                    >
                      ${t('btnViewDetails')}
                    </button>
                    <button 
                      class="map-try-costume-btn py-1.5 px-3 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center space-x-1"
                      data-costume-id="${c.id}"
                      title="${t('btnTryThis')}"
                    >
                      <i data-lucide="wand-2" class="w-3 h-3"></i>
                      <span>${isEn ? 'Try On' : 'Phối Đồ'}</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    </section>
  `;
}

// ----------------- HIGH-PRECISION VIETNAM SVG MAP RENDERER -----------------
function renderVietnamSvgMap(activeRegId, isEn, selectedProvince) {
  const isBacBo = activeRegId === 'bac-bo';
  const isHue = activeRegId === 'mientrung-hue';
  const isNamTrungBo = activeRegId === 'namtrungbo-hoian';
  const isHoangSaTruongSa = activeRegId === 'hoang-sa-truong-sa';
  const isTayNguyen = activeRegId === 'tay-nguyen';
  const isNamBo = activeRegId === 'nam-bo';

  return `
    <svg 
      id="vietnamInteractiveSvg" 
      viewBox="0 0 560 820" 
      class="w-full h-auto select-none font-sans"
      style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.06));"
    >
      <defs>
        <!-- Golden Lacquer Glow for Active Region -->
        <filter id="mapGlowGold" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#FFD700" flood-opacity="0.9"/>
          <feDropShadow dx="0" dy="0" stdDeviation="9" flood-color="#D4AF37" flood-opacity="0.7"/>
        </filter>
        <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.35"/>
        </filter>
        <!-- Linear Gradients for Lacquer Regions -->
        <linearGradient id="gradBacBo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B0000"/>
          <stop offset="100%" stop-color="#B22222"/>
        </linearGradient>
        <linearGradient id="gradHue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#C59B27"/>
        </linearGradient>
        <linearGradient id="gradNamTrungBo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C47B89"/>
          <stop offset="100%" stop-color="#A85768"/>
        </linearGradient>
        <linearGradient id="gradTayNguyen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2E7D32"/>
          <stop offset="100%" stop-color="#3F5E4D"/>
        </linearGradient>
        <linearGradient id="gradNamBo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E3A8A"/>
          <stop offset="100%" stop-color="#2C4E6B"/>
        </linearGradient>
        <linearGradient id="gradIslands" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E65100"/>
          <stop offset="100%" stop-color="#BF360C"/>
        </linearGradient>
      </defs>

      <!-- Ocean / Sea Canvas Background -->
      <rect width="560" height="820" rx="16" fill="#EDF5FA" stroke="#D4AF37" stroke-width="1.5"/>

      <!-- Graticule Lat/Long Coordinate Grid Lines -->
      <g stroke="#D4AF37" stroke-width="0.6" stroke-dasharray="4 4" opacity="0.35">
        <line x1="30" y1="100" x2="530" y2="100"/>
        <line x1="30" y1="280" x2="530" y2="280"/>
        <line x1="30" y1="460" x2="530" y2="460"/>
        <line x1="30" y1="640" x2="530" y2="640"/>
        <line x1="110" y1="30" x2="110" y2="790"/>
        <line x1="240" y1="30" x2="240" y2="790"/>
        <line x1="370" y1="30" x2="370" y2="790"/>
        <line x1="500" y1="30" x2="500" y2="790"/>
      </g>

      <!-- Graticule Coordinate Labels -->
      <g fill="#888888" font-size="8.5" font-family="'Be Vietnam Pro'" opacity="0.8">
        <text x="14" y="104">22°B</text>
        <text x="14" y="284">18°B</text>
        <text x="14" y="464">14°B</text>
        <text x="14" y="644">10°B</text>
        <text x="110" y="808" text-anchor="middle">104°Đ</text>
        <text x="240" y="808" text-anchor="middle">108°Đ</text>
        <text x="370" y="808" text-anchor="middle">112°Đ</text>
        <text x="500" y="808" text-anchor="middle">116°Đ</text>
      </g>

      <!-- East Sea (BIỂN ĐÔNG VIỆT NAM) Calligraphic Water Engraving -->
      <g>
        <text x="340" y="255" fill="#1E3A8A" opacity="0.28" font-weight="900" font-size="22" letter-spacing="8" font-family="'Be Vietnam Pro'">BIỂN ĐÔNG</text>
        <text x="370" y="280" fill="#8B0000" opacity="0.4" font-weight="800" font-size="11.5" letter-spacing="4" font-family="'Be Vietnam Pro'">(VIỆT NAM)</text>
        <text x="215" y="195" fill="#2C4E6B" opacity="0.25" font-weight="700" font-size="10" letter-spacing="2" font-family="'Be Vietnam Pro'">VỊNH BẮC BỘ</text>
        <text x="32" y="730" fill="#2C4E6B" opacity="0.25" font-weight="700" font-size="9.5" letter-spacing="1" font-family="'Be Vietnam Pro'">VỊNH THÁI LAN</text>
      </g>

      <!-- Traditional Nautical Compass Rose (Hoa Tiêu Phương Hướng) -->
      <g transform="translate(490, 68)">
        <circle cx="0" cy="0" r="22" fill="#FAF7F2" stroke="#D4AF37" stroke-width="1.2" opacity="0.9"/>
        <circle cx="0" cy="0" r="16" fill="none" stroke="#8B0000" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.6"/>
        <!-- North Pointer Arrow -->
        <polygon points="0,-18 4,-4 0,0" fill="#8B0000"/>
        <polygon points="0,-18 -4,-4 0,0" fill="#5C0000"/>
        <!-- South Pointer Arrow -->
        <polygon points="0,18 4,4 0,0" fill="#D4AF37"/>
        <polygon points="0,18 -4,4 0,0" fill="#B8860B"/>
        <!-- East & West Pointer Arrows -->
        <polygon points="18,0 4,3 0,0" fill="#D4AF37"/>
        <polygon points="-18,0 -4,3 0,0" fill="#D4AF37"/>
        <!-- Compass Labels -->
        <text x="0" y="-22" text-anchor="middle" fill="#8B0000" font-weight="900" font-size="10" font-family="'Be Vietnam Pro'">BẮC</text>
        <text x="0" y="28" text-anchor="middle" fill="#666" font-size="8" font-family="'Be Vietnam Pro'">NAM</text>
        <text x="26" y="3" text-anchor="middle" fill="#666" font-size="8" font-family="'Be Vietnam Pro'">ĐÔNG</text>
        <text x="-26" y="3" text-anchor="middle" fill="#666" font-size="8" font-family="'Be Vietnam Pro'">TÂY</text>
      </g>

      <!-- REGION 1: MIỀN BẮC (Thăng Long - Hà Nội & Kinh Bắc) -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-200" 
        data-region-id="bac-bo"
        ${isBacBo ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <path 
          d="M 50,110 C 65,95 85,80 115,65 C 135,52 148,45 160,46 C 172,48 185,60 200,75 C 220,95 240,110 262,130 C 268,135 255,148 242,156 C 228,168 218,180 208,198 C 196,210 182,212 170,205 C 158,195 142,185 125,175 C 105,162 80,148 58,132 Z" 
          fill="${isBacBo ? 'url(#gradBacBo)' : '#A32828'}" 
          stroke="${isBacBo ? '#FFD700' : '#FFFFFF'}" 
          stroke-width="${isBacBo ? '2.5' : '1.2'}"
          opacity="${isBacBo || activeRegId === 'all' ? '1' : '0.78'}"
        />
        <!-- Region Label -->
        <text x="145" y="115" fill="#FFFFFF" font-weight="800" font-size="11" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))">
          MIỀN BẮC
        </text>
        <text x="145" y="128" fill="#FDF6E2" font-weight="600" font-size="8.5" font-family="'Be Vietnam Pro'" text-anchor="middle">
          (Thăng Long - Hà Nội)
        </text>
      </g>

      <!-- REGION 2: BẮC TRUNG BỘ & CỐ ĐÔ HUẾ -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-200" 
        data-region-id="mientrung-hue"
        ${isHue ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <path 
          d="M 170,205 C 182,212 196,210 208,198 C 215,225 212,255 208,285 C 210,315 220,345 230,370 C 238,390 248,405 252,410 C 242,414 230,410 220,395 C 205,370 190,340 178,305 C 165,270 152,240 170,205 Z" 
          fill="${isHue ? 'url(#gradHue)' : '#C99D2A'}" 
          stroke="${isHue ? '#FFD700' : '#FFFFFF'}" 
          stroke-width="${isHue ? '2.5' : '1.2'}"
          opacity="${isHue || activeRegId === 'all' ? '1' : '0.78'}"
        />
        <!-- Region Label -->
        <text x="195" y="320" fill="#222222" font-weight="800" font-size="10.5" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(255,255,255,0.8))">
          CỐ ĐÔ HUẾ
        </text>
        <text x="195" y="333" fill="#5C0000" font-weight="700" font-size="8.5" font-family="'Be Vietnam Pro'" text-anchor="middle">
          & Bắc Trung Bộ
        </text>
      </g>

      <!-- REGION 3: DUYÊN HẢI NAM TRUNG BỘ & HỘI AN -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-200" 
        data-region-id="namtrungbo-hoian"
        ${isNamTrungBo ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <path 
          d="M 252,410 C 262,425 272,450 282,485 C 292,520 300,555 304,570 C 302,595 296,625 288,645 C 275,665 260,675 248,675 C 242,668 250,650 258,630 C 268,600 272,565 270,530 C 266,495 258,460 245,435 C 240,422 246,415 252,410 Z" 
          fill="${isNamTrungBo ? 'url(#gradNamTrungBo)' : '#B86877'}" 
          stroke="${isNamTrungBo ? '#FFD700' : '#FFFFFF'}" 
          stroke-width="${isNamTrungBo ? '2.5' : '1.2'}"
          opacity="${isNamTrungBo || activeRegId === 'all' ? '1' : '0.78'}"
        />
        <!-- Region Label -->
        <text x="282" y="505" fill="#FFFFFF" font-weight="800" font-size="10" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))">
          NAM TRUNG BỘ
        </text>
        <text x="282" y="518" fill="#FDF6E2" font-weight="600" font-size="8" font-family="'Be Vietnam Pro'" text-anchor="middle">
          (Đà Nẵng - Hội An)
        </text>
      </g>

      <!-- REGION 4: TÂY NGUYÊN ĐẠI NGÀN -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-200" 
        data-region-id="tay-nguyen"
        ${isTayNguyen ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <path 
          d="M 245,435 C 258,460 266,495 270,530 C 272,565 268,600 258,630 C 245,635 230,632 218,622 C 205,605 200,575 204,545 C 208,515 215,485 228,460 C 235,445 240,438 245,435 Z" 
          fill="${isTayNguyen ? 'url(#gradTayNguyen)' : '#2E7D32'}" 
          stroke="${isTayNguyen ? '#FFD700' : '#FFFFFF'}" 
          stroke-width="${isTayNguyen ? '2.5' : '1.2'}"
          opacity="${isTayNguyen || activeRegId === 'all' ? '1' : '0.78'}"
        />
        <!-- Region Label -->
        <text x="238" y="535" fill="#FFFFFF" font-weight="800" font-size="10" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))">
          TÂY NGUYÊN
        </text>
        <text x="238" y="547" fill="#E8F5E9" font-weight="600" font-size="8" font-family="'Be Vietnam Pro'" text-anchor="middle">
          (Buôn Ma Thuột)
        </text>
      </g>

      <!-- REGION 5: MIỀN NAM (Sài Gòn & Đồng Bằng Sông Cửu Long) -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-200" 
        data-region-id="nam-bo"
        ${isNamBo ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <path 
          d="M 248,675 C 235,685 220,688 205,692 C 190,705 180,725 168,750 C 158,770 145,788 135,788 C 130,780 132,760 136,735 C 138,710 145,685 160,668 C 178,650 200,642 225,650 C 238,658 245,668 248,675 Z" 
          fill="${isNamBo ? 'url(#gradNamBo)' : '#1E3A8A'}" 
          stroke="${isNamBo ? '#FFD700' : '#FFFFFF'}" 
          stroke-width="${isNamBo ? '2.5' : '1.2'}"
          opacity="${isNamBo || activeRegId === 'all' ? '1' : '0.78'}"
        />
        <!-- Region Label -->
        <text x="188" y="700" fill="#FFFFFF" font-weight="800" font-size="10.5" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))">
          MIỀN NAM
        </text>
        <text x="188" y="712" fill="#E0F2FE" font-weight="600" font-size="8" font-family="'Be Vietnam Pro'" text-anchor="middle">
          (Sài Gòn - Cửu Long)
        </text>
      </g>

      <!-- OFFSHORE ISLANDS OF MIỀN BẮC & TRUNG -->
      <g>
        <!-- Cát Bà / Hạ Long -->
        <circle cx="248" cy="158" r="3.5" fill="#8B0000" stroke="#FFF" stroke-width="0.8"/>
        <!-- Bạch Long Vĩ (Hải Phòng) -->
        <circle cx="266" cy="204" r="3.2" fill="#8B0000" stroke="#FFF" stroke-width="0.8"/>
        <text x="266" y="216" fill="#666" font-size="7.5" font-family="'Be Vietnam Pro'" text-anchor="middle">Bạch Long Vĩ</text>
        <!-- Cồn Cỏ (Quảng Trị) -->
        <circle cx="240" cy="375" r="2.8" fill="#C99D2A" stroke="#FFF" stroke-width="0.8"/>
        <!-- Lý Sơn (Quảng Ngãi) -->
        <circle cx="292" cy="448" r="3.2" fill="#B86877" stroke="#FFF" stroke-width="0.8"/>
        <text x="306" y="448" fill="#8B0000" font-weight="700" font-size="8" font-family="'Be Vietnam Pro'">Lý Sơn</text>
        <!-- Phú Quý (Bình Thuận) -->
        <circle cx="282" cy="678" r="3.2" fill="#B86877" stroke="#FFF" stroke-width="0.8"/>
        <text x="296" y="682" fill="#666" font-size="7.5" font-family="'Be Vietnam Pro'">Phú Quý</text>
        <!-- Côn Đảo (Bà Rịa - Vũng Tàu) -->
        <circle cx="198" cy="775" r="4.2" fill="#1E3A8A" stroke="#FFD700" stroke-width="1.2" class="vietnam-map-pin cursor-pointer" data-region-id="nam-bo"/>
        <text x="216" y="778" fill="#1E3A8A" font-weight="700" font-size="8.5" font-family="'Be Vietnam Pro'">Côn Đảo</text>
        <!-- Đảo Phú Quốc (Kiên Giang) -->
        <g class="vietnam-map-pin cursor-pointer" data-region-id="nam-bo">
          <path d="M 98,695 C 103,688 110,690 112,702 C 114,714 108,724 102,725 C 98,720 96,706 98,695 Z" fill="#1E3A8A" stroke="#FFD700" stroke-width="1.5"/>
          <text x="105" y="736" fill="#1E3A8A" font-weight="800" font-size="9" font-family="'Be Vietnam Pro'" text-anchor="middle" filter="drop-shadow(0 1px 1px white)">Phú Quốc</text>
        </g>
      </g>

      <!-- ============================================================== -->
      <!-- REGION 6: QUẦN ĐẢO HOÀNG SA (THUỘC TP. ĐÀ NẴNG, VIỆT NAM)      -->
      <!-- ============================================================== -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-300" 
        data-region-id="hoang-sa-truong-sa"
        ${isHoangSaTruongSa ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <!-- Sovereign Reef Boundary Zone -->
        <ellipse 
          cx="410" cy="380" rx="50" ry="34" 
          fill="${isHoangSaTruongSa ? '#FFD700' : '#8B0000'}" 
          fill-opacity="${isHoangSaTruongSa ? '0.22' : '0.08'}" 
          stroke="${isHoangSaTruongSa ? '#FFD700' : '#B8860B'}" 
          stroke-width="${isHoangSaTruongSa ? '2' : '1.2'}" 
          stroke-dasharray="3 3"
        />

        <!-- Distinct Islands of Hoang Sa Archipelago -->
        <!-- Đảo Hoàng Sa (Pattle Island) & Nhóm Lưỡi Liềm -->
        <circle cx="395" cy="375" r="4.5" fill="#8B0000" stroke="#FFD700" stroke-width="1.2"/>
        <!-- Đảo Phú Lâm (Woody Island) & Nhóm An Vĩnh -->
        <circle cx="424" cy="365" r="5" fill="#8B0000" stroke="#FFD700" stroke-width="1.2"/>
        <!-- Đảo Linh Côn (Lincoln Island) -->
        <circle cx="442" cy="378" r="3.8" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Tri Tôn (Triton Island) -->
        <circle cx="388" cy="396" r="3.5" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Quang Ảnh & Đảo Hữu Nhật -->
        <circle cx="406" cy="370" r="3" fill="#8B0000" stroke="#FFD700" stroke-width="0.8"/>
        <circle cx="414" cy="390" r="2.8" fill="#8B0000" stroke="#FFD700" stroke-width="0.8"/>

        <!-- Sacred National Flag Star Emblem -->
        <g transform="translate(410, 386) scale(0.95)" filter="url(#pinShadow)">
          <circle cx="0" cy="0" r="9" fill="#8B0000" stroke="#FFD700" stroke-width="1.6"/>
          <polygon points="0,-6 1.8,-1.8 6,-1.8 2.6,0.8 3.8,5.2 0,2.6 -3.8,5.2 -2.6,0.8 -6,-1.8 -1.8,-1.8" fill="#FFD700"/>
        </g>

        <!-- Bold National Sovereignty Text (Hoàng Sa - Đà Nẵng) -->
        <text 
          x="410" y="334" 
          text-anchor="middle" 
          fill="#8B0000" 
          font-weight="900" 
          font-size="12" 
          font-family="'Be Vietnam Pro'" 
          stroke="#FFFFFF" 
          stroke-width="3" 
          paint-order="stroke fill"
        >
          Quần đảo Hoàng Sa
        </text>
        <text 
          x="410" y="347" 
          text-anchor="middle" 
          fill="#1E3A8A" 
          font-weight="700" 
          font-size="9.5" 
          font-family="'Be Vietnam Pro'" 
          stroke="#FFFFFF" 
          stroke-width="2.5" 
          paint-order="stroke fill"
        >
          (TP. Đà Nẵng, Việt Nam)
        </text>
      </g>

      <!-- ============================================================== -->
      <!-- REGION 6 (CONTINUED): QUẦN ĐẢO TRƯỜNG SA (KHÁNH HÒA, VIỆT NAM)  -->
      <!-- ============================================================== -->
      <g 
        class="vietnam-map-region cursor-pointer transition-all duration-300" 
        data-region-id="hoang-sa-truong-sa"
        ${isHoangSaTruongSa ? 'filter="url(#mapGlowGold)"' : ''}
      >
        <!-- Sovereign Reef Boundary Zone -->
        <ellipse 
          cx="468" cy="672" rx="64" ry="78" 
          fill="${isHoangSaTruongSa ? '#FFD700' : '#8B0000'}" 
          fill-opacity="${isHoangSaTruongSa ? '0.22' : '0.08'}" 
          stroke="${isHoangSaTruongSa ? '#FFD700' : '#B8860B'}" 
          stroke-width="${isHoangSaTruongSa ? '2' : '1.2'}" 
          stroke-dasharray="3 3"
        />

        <!-- Distinct Islands of Truong Sa Archipelago -->
        <!-- Đảo Song Tử Tây (Southwest Cay) -->
        <circle cx="438" cy="605" r="3.8" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Sơn Ca (Sand Cay) -->
        <circle cx="468" cy="622" r="3.8" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Nam Yết (Namyit Island) -->
        <circle cx="452" cy="638" r="4.2" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Sinh Tồn (Sin Cowe Island) -->
        <circle cx="480" cy="652" r="4.2" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Trường Sa Lớn (Spratly Island) -->
        <circle cx="428" cy="710" r="5.5" fill="#8B0000" stroke="#FFD700" stroke-width="1.6"/>
        <!-- Đảo Đá Tây (West Reef) -->
        <circle cx="445" cy="730" r="3.8" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo An Bang (Amboyna Cay) -->
        <circle cx="474" cy="742" r="3.8" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Bãi Thuyền Chài (Barque Canada Reef) -->
        <circle cx="502" cy="722" r="3.5" fill="#8B0000" stroke="#FFD700" stroke-width="1"/>
        <!-- Đảo Cô Lin & Len Đao -->
        <circle cx="476" cy="668" r="3.2" fill="#8B0000" stroke="#FFD700" stroke-width="0.8"/>

        <!-- Sacred National Flag Star Emblem -->
        <g transform="translate(468, 674) scale(1.05)" filter="url(#pinShadow)">
          <circle cx="0" cy="0" r="9.5" fill="#8B0000" stroke="#FFD700" stroke-width="1.8"/>
          <polygon points="0,-6.5 2,-2 6.5,-2 2.8,1 4.2,5.8 0,3 -4.2,5.8 -2.8,1 -6.5,-2 -2,-2" fill="#FFD700"/>
        </g>

        <!-- Bold National Sovereignty Text (Trường Sa - Khánh Hòa) -->
        <text 
          x="468" y="580" 
          text-anchor="middle" 
          fill="#8B0000" 
          font-weight="900" 
          font-size="12.5" 
          font-family="'Be Vietnam Pro'" 
          stroke="#FFFFFF" 
          stroke-width="3" 
          paint-order="stroke fill"
        >
          Quần đảo Trường Sa
        </text>
        <text 
          x="468" y="594" 
          text-anchor="middle" 
          fill="#1E3A8A" 
          font-weight="700" 
          font-size="9.5" 
          font-family="'Be Vietnam Pro'" 
          stroke="#FFFFFF" 
          stroke-width="2.5" 
          paint-order="stroke fill"
        >
          (Tỉnh Khánh Hòa, Việt Nam)
        </text>
      </g>

      <!-- ============================================================== -->
      <!-- CAPITAL AND PRINCIPAL CULTURAL HERITAGE LANDMARK PINS           -->
      <!-- ============================================================== -->
      <!-- Thủ Đô Hà Nội (Red River Delta / Capital Star) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="bac-bo">
        <circle cx="175" cy="165" r="9.5" fill="#8B0000" stroke="#FFD700" stroke-width="2" filter="url(#pinShadow)"/>
        <polygon points="175,159 177,163 181,163 178,166 179,170 175,168 171,170 172,166 169,163 173,163" fill="#FFD700"/>
        <text x="175" y="152" text-anchor="middle" fill="#8B0000" font-weight="900" font-size="10.5" stroke="#FFF" stroke-width="2.5" paint-order="stroke fill">Hà Nội</text>
      </g>

      <!-- Cố Đô Huế (Imperial Citadel Pin) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="mientrung-hue">
        <circle cx="246" cy="396" r="6" fill="#D4AF37" stroke="#8B0000" stroke-width="1.8" filter="url(#pinShadow)"/>
        <circle cx="246" cy="396" r="2.2" fill="#8B0000"/>
        <text x="264" y="399" fill="#8B0000" font-weight="900" font-size="10" stroke="#FFF" stroke-width="2" paint-order="stroke fill">Huế</text>
      </g>

      <!-- Đà Nẵng & Đô Thị Cổ Hội An -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="namtrungbo-hoian">
        <circle cx="258" cy="420" r="5.5" fill="#C47B89" stroke="#FFF" stroke-width="1.5" filter="url(#pinShadow)"/>
        <circle cx="258" cy="420" r="2" fill="#8B0000"/>
        <text x="276" y="423" fill="#8B0000" font-weight="800" font-size="9.5" stroke="#FFF" stroke-width="2" paint-order="stroke fill">Hội An / Đà Nẵng</text>
      </g>

      <!-- Tây Nguyên (Buôn Ma Thuột) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="tay-nguyen">
        <circle cx="240" cy="565" r="5.5" fill="#2E7D32" stroke="#FFD700" stroke-width="1.5" filter="url(#pinShadow)"/>
        <circle cx="240" cy="565" r="2" fill="#FFF"/>
        <text x="240" y="582" text-anchor="middle" fill="#1B5E20" font-weight="800" font-size="9" stroke="#FFF" stroke-width="2" paint-order="stroke fill">Buôn Ma Thuột</text>
      </g>

      <!-- TP. Hồ Chí Minh (Sài Gòn) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="nam-bo">
        <circle cx="195" cy="665" r="7.5" fill="#1E3A8A" stroke="#FFD700" stroke-width="1.8" filter="url(#pinShadow)"/>
        <circle cx="195" cy="665" r="2.5" fill="#FFD700"/>
        <text x="195" y="654" text-anchor="middle" fill="#1E3A8A" font-weight="900" font-size="10" stroke="#FFF" stroke-width="2" paint-order="stroke fill">TP. Hồ Chí Minh</text>
      </g>

      <!-- Cần Thơ (Thủ Phủ Miền Tây) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="nam-bo">
        <circle cx="165" cy="715" r="4.5" fill="#1E3A8A" stroke="#FFF" stroke-width="1.2"/>
        <text x="145" y="718" fill="#1E3A8A" font-weight="700" font-size="8.5" text-anchor="end" stroke="#FFF" stroke-width="1.5" paint-order="stroke fill">Cần Thơ</text>
      </g>

      <!-- Mũi Cà Mau (Cực Nam Tổ Quốc) -->
      <g class="vietnam-map-pin cursor-pointer" data-region-id="nam-bo">
        <circle cx="135" cy="788" r="4.5" fill="#8B0000" stroke="#FFD700" stroke-width="1.2"/>
        <text x="148" y="792" fill="#8B0000" font-weight="800" font-size="8.5" stroke="#FFF" stroke-width="1.5" paint-order="stroke fill">Mũi Cà Mau</text>
      </g>

      <!-- Official Sovereign Seal Stamp in Corner -->
      <g transform="translate(18, 770)">
        <rect width="105" height="34" rx="6" fill="#8B0000" fill-opacity="0.12" stroke="#8B0000" stroke-width="0.8"/>
        <text x="52" y="783" fill="#8B0000" font-weight="800" font-size="7.5" font-family="'Be Vietnam Pro'" text-anchor="middle">CHỦ QUYỀN TOÀN VẸN</text>
        <text x="52" y="796" fill="#1E3A8A" font-weight="700" font-size="7" font-family="'Be Vietnam Pro'" text-anchor="middle">ĐẤT LIỀN & BIỂN ĐẢO</text>
      </g>
    </svg>
  `;
}

// ----------------- LEAFLET REAL GIS MAP INITIALIZER -----------------
function initVietnamLeafletMap() {
  if (typeof L === 'undefined') return;
  const container = document.getElementById('vietnamLeafletMap');
  if (!container) return;

  if (state.leafletMapInstance) {
    try {
      state.leafletMapInstance.remove();
    } catch (e) {
      console.warn('Leaflet cleanup exception:', e);
    }
    state.leafletMapInstance = null;
  }

  // Create Leaflet instance centered on Vietnam with full East Sea scope
  const map = L.map('vietnamLeafletMap', {
    center: [16.0, 108.5],
    zoom: 5.5,
    minZoom: 4,
    maxZoom: 15,
    scrollWheelZoom: false
  });
  state.leafletMapInstance = map;

  // Add high quality, clean CartoDB Positron / OSM tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO · VietHeritage Remix',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Custom Sovereign Icon Helper
  const createSovereignPin = (label) => L.divIcon({
    className: 'custom-sovereignty-pin',
    html: `
      <div style="background:#8B0000;color:#FFD700;border:2px solid #FFD700;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:bold;box-shadow:0 0 10px rgba(255,215,0,0.85);cursor:pointer;" title="${label}">
        ★
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const createCityPin = (color, initial) => L.divIcon({
    className: 'custom-city-pin',
    html: `
      <div style="background:${color};color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;box-shadow:0 1px 5px rgba(0,0,0,0.3);cursor:pointer;">
        ${initial}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // 1. Quần Đảo Hoàng Sa (TP. Đà Nẵng, Việt Nam)
  L.marker([16.5, 112.0], { icon: createSovereignPin('Quần đảo Hoàng Sa (TP. Đà Nẵng, Việt Nam)') })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Be Vietnam Pro',sans-serif;padding:4px;">
        <div style="color:#8B0000;font-weight:bold;font-size:13px;border-bottom:1px solid #D4AF37;padding-bottom:3px;margin-bottom:4px;">
          🇻🇳 QUẦN ĐẢO HOÀNG SA
        </div>
        <div style="font-size:11px;color:#222;font-weight:600;">Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam</div>
        <div style="font-size:10px;color:#666;margin-top:2px;">Chủ quyền thiêng liêng · Lịch sử Hải đội Hoàng Sa thời Nguyễn</div>
        <button style="margin-top:6px;background:#8B0000;color:white;border:none;border-radius:4px;padding:3px 8px;font-size:10px;cursor:pointer;" onclick="window.selectVietnamRegionFromMap('hoang-sa-truong-sa', 'Hoàng Sa')">
          Xem Cổ Phục Vùng Này →
        </button>
      </div>
    `)
    .on('click', () => selectMapRegion('hoang-sa-truong-sa', 'Hoàng Sa'));

  // 2. Quần Đảo Trường Sa (Tỉnh Khánh Hòa, Việt Nam)
  L.marker([9.5, 114.0], { icon: createSovereignPin('Quần đảo Trường Sa (Tỉnh Khánh Hòa, Việt Nam)') })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Be Vietnam Pro',sans-serif;padding:4px;">
        <div style="color:#8B0000;font-weight:bold;font-size:13px;border-bottom:1px solid #D4AF37;padding-bottom:3px;margin-bottom:4px;">
          🇻🇳 QUẦN ĐẢO TRƯỜNG SA
        </div>
        <div style="font-size:11px;color:#222;font-weight:600;">Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam</div>
        <div style="font-size:10px;color:#666;margin-top:2px;">Chủ quyền thiêng liêng ngàn đời · Ngư dân kiên cường bám biển</div>
        <button style="margin-top:6px;background:#8B0000;color:white;border:none;border-radius:4px;padding:3px 8px;font-size:10px;cursor:pointer;" onclick="window.selectVietnamRegionFromMap('hoang-sa-truong-sa', 'Trường Sa')">
          Xem Cổ Phục Vùng Này →
        </button>
      </div>
    `)
    .on('click', () => selectMapRegion('hoang-sa-truong-sa', 'Trường Sa'));

  // 3. Hà Nội
  L.marker([21.0285, 105.8542], { icon: createCityPin('#8B0000', 'HN') })
    .addTo(map)
    .bindPopup('<b>Thủ Đô Hà Nội (Thăng Long)</b><br/>Áo Giao Lĩnh, Áo Tứ Thân, Áo Ngũ Thân Hà Thành')
    .on('click', () => selectMapRegion('bac-bo', 'Hà Nội'));

  // 4. Cố Đô Huế
  L.marker([16.4637, 107.5909], { icon: createCityPin('#D4AF37', 'H') })
    .addTo(map)
    .bindPopup('<b>Cố Đô Huế</b><br/>Áo Nhật Bình Hoàng Gia, Áo Tấc, Áo Ngũ Thân Cung Đình')
    .on('click', () => selectMapRegion('mientrung-hue', 'Thừa Thiên Huế'));

  // 5. Hội An / Đà Nẵng
  L.marker([15.8801, 108.3380], { icon: createCityPin('#C47B89', 'HA') })
    .addTo(map)
    .bindPopup('<b>Đô Thị Cổ Hội An & Đà Nẵng</b><br/>Áo Ngũ Thân Sa The, Tơ Lụa Mã Châu')
    .on('click', () => selectMapRegion('namtrungbo-hoian', 'Đà Nẵng'));

  // 6. Tây Nguyên (Buôn Ma Thuột)
  L.marker([12.6667, 108.0500], { icon: createCityPin('#2E7D32', 'TN') })
    .addTo(map)
    .bindPopup('<b>Tây Nguyên Đại Ngàn (Buôn Ma Thuột)</b><br/>Váy Tấm, Dệt Zèng Thổ Cẩm')
    .on('click', () => selectMapRegion('tay-nguyen', 'Đắk Lắk'));

  // 7. TP. Hồ Chí Minh
  L.marker([10.8231, 106.6297], { icon: createCityPin('#1E3A8A', 'SG') })
    .addTo(map)
    .bindPopup('<b>TP. Hồ Chí Minh (Sài Gòn)</b><br/>Áo Bà Ba, Áo Ngũ Thân Lục Tỉnh Nam Kỳ')
    .on('click', () => selectMapRegion('nam-bo', 'TP. Hồ Chí Minh'));

  // 8. Đảo Phú Quốc (Kiên Giang)
  L.marker([10.22, 103.96], { icon: createCityPin('#1E3A8A', 'PQ') })
    .addTo(map)
    .bindPopup('<b>Đảo Phú Quốc (Kiên Giang)</b><br/>Vùng biển Tây Nam · Áo Bà Ba')
    .on('click', () => selectMapRegion('nam-bo', 'Phú Quốc'));

  // 9. Côn Đảo (Bà Rịa - Vũng Tàu)
  L.marker([8.68, 106.60], { icon: createCityPin('#1E3A8A', 'CĐ') })
    .addTo(map)
    .bindPopup('<b>Côn Đảo (Bà Rịa - Vũng Tàu)</b><br/>Vùng biển Đông Nam')
    .on('click', () => selectMapRegion('nam-bo', 'Côn Đảo'));
}

// Global selector helper for Vietnam Costume Map
function selectMapRegion(regId, provinceName = null) {
  state.activeMapRegionId = regId;
  if (provinceName) {
    state.selectedProvince = provinceName;
    const clean = provinceName.replace(/\(.*\)/, '').trim();
    const found = MAP_PROVINCES_HOTSPOTS.find(h => 
      h.provinceVi === provinceName || 
      h.provinceVi === clean ||
      clean.includes(h.provinceVi) ||
      h.provinceVi.includes(clean)
    );
    if (found) {
      state.activeProvinceHotspotId = found.id;
    }
  } else if (regId !== 'all') {
    // Pick the first major hotspot of this region
    const firstRegHotspot = MAP_PROVINCES_HOTSPOTS.find(h => h.regionId === regId && h.isMajor) 
      || MAP_PROVINCES_HOTSPOTS.find(h => h.regionId === regId);
    if (firstRegHotspot) {
      state.activeProvinceHotspotId = firstRegHotspot.id;
      state.selectedProvince = firstRegHotspot.provinceVi;
    }
  }
  heritageAudio?.playChime?.();
  renderHubs();
  attachEvents();
}
window.selectVietnamRegionFromMap = selectMapRegion;

function selectProvinceHotspot(hotspotId) {
  const hotspot = MAP_PROVINCES_HOTSPOTS.find(h => h.id === hotspotId);
  if (hotspot) {
    state.activeProvinceHotspotId = hotspot.id;
    state.selectedProvince = hotspot.provinceVi;
    state.activeMapRegionId = hotspot.regionId;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  }
}
window.selectProvinceHotspot = selectProvinceHotspot;


function renderMediaAndMapsSection() {
  const isEn = state.lang === 'en';
  const filteredLocs = state.activeLocationFilter === 'all' 
    ? MAP_LOCATIONS 
    : MAP_LOCATIONS.filter(l => l.type === state.activeLocationFilter);

  return `
    <section class="space-y-12">
      <!-- EXACT GOOGLE MAPS EMBED & CULTURAL LOCATOR -->
      <div class="bg-white rounded-2xl border border-[#D4AF37]/30 p-6 md:p-8 shadow-xs">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">✦ V-Map Spatial Explorer</span>
            <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#222222] mt-1">
              ${t('mapSectionTitle')}
            </h2>
            <p class="text-xs md:text-sm text-[#666666] mt-1">
              ${t('mapSectionSub')}
            </p>
          </div>

          <!-- Filter Tabs -->
          <div class="flex items-center space-x-1 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto">
            <button class="loc-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${state.activeLocationFilter === 'all' ? 'bg-[#8B0000] text-white font-bold' : 'text-stone-600 hover:text-stone-900'}" data-filter="all">
              ${t('tabAll')}
            </button>
            <button class="loc-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${state.activeLocationFilter === 'shop' ? 'bg-[#8B0000] text-white font-bold' : 'text-stone-600 hover:text-stone-900'}" data-filter="shop">
              ${t('tabShop')}
            </button>
            <button class="loc-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${state.activeLocationFilter === 'museum' ? 'bg-[#8B0000] text-white font-bold' : 'text-stone-600 hover:text-stone-900'}" data-filter="museum">
              ${t('tabMuseum')}
            </button>
            <button class="loc-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${state.activeLocationFilter === 'photo' ? 'bg-[#8B0000] text-white font-bold' : 'text-stone-600 hover:text-stone-900'}" data-filter="photo">
              ${t('tabPhoto')}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Locations List -->
          <div class="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
            ${filteredLocs.map(loc => `
              <div class="map-card p-4 rounded-xl border border-stone-200 hover:border-[#D4AF37] bg-[#FAF7F2] cursor-pointer transition-all shadow-2xs" data-query="${loc.mapQuery}">
                <div class="flex items-center justify-between text-[11px] font-mono font-semibold text-[#8B0000] mb-1">
                  <span>${isEn ? loc.categoryEn : loc.categoryVi}</span>
                  <span class="text-stone-500 font-normal">📍 Check-in</span>
                </div>
                <h4 class="font-serif font-bold text-base text-[#222222] mb-1">
                  ${isEn ? loc.nameEn : loc.nameVi}
                </h4>
                <p class="text-xs text-[#666666] mb-1">
                  🏛️ ${loc.address}
                </p>
                <div class="text-[11px] text-stone-500 font-mono flex items-center justify-between pt-2 border-t border-stone-200/80">
                  <span>🕒 ${loc.hours}</span>
                  <span class="text-[#8B0000] font-semibold">Xem bản đồ →</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- EXACT GOOGLE MAPS EMBED AS SPECIFIED -->
          <div class="lg:col-span-7 bg-stone-100 rounded-xl overflow-hidden border border-stone-300">
            <iframe id="heritageMapIframe" class="w-full h-64 md:h-80 rounded-xl shadow-md mt-4" src="https://maps.google.com/maps?q=Bảo+tàng+Áo+Dài,+Hồ+Chí+Minh&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no"></iframe>
            <div class="p-3 bg-[#FAF7F2] border-t border-stone-200 text-xs font-mono text-[#666666] flex items-center justify-between">
              <span>Đang định vị: <strong id="activeMapLabel" class="text-[#8B0000]">Bảo Tàng Áo Dài TP. Hồ Chí Minh</strong></span>
              <span class="text-emerald-700">✓ Tọa độ chuẩn xác</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ----------------- HUB 2: AI CO-CREATOR & STYLING -----------------

function renderStudioSection() {
  const isEn = state.lang === 'en';

  return `
    <section class="space-y-8">
      <div class="max-w-3xl">
        <div class="inline-block text-xs font-mono font-bold text-[#8B0000] tracking-wider uppercase mb-1">
          ✦ AI Heritage Atelier
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
          ${t('studioTitle')}
        </h2>
        <p class="text-sm text-[#666666] mt-1">
          ${t('studioSub')}
        </p>
      </div>

      <!-- Asymmetric Split View -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- LEFT PANE: 3-Step Streamlined Try-On Studio -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-[#D4AF37]/40 p-5 md:p-6 shadow-sm space-y-5">
          <!-- BƯỚC 1: TẢI ẢNH CỦA BẠN (HOẶC CHỌN MẪU NHANH) -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
                <span class="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Tải Ảnh Chân Dung (Hoặc Chọn Nhanh)</span>
              </label>
              <span class="text-[10px] font-mono text-stone-400">Ảnh chân dung rõ mặt</span>
            </div>

            <div class="flex items-center space-x-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30">
              <div 
                class="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white border-2 border-dashed border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0 shadow-inner group cursor-pointer hover:border-[#8B0000] transition-colors"
                onclick="document.getElementById('userPhoto').click()"
                title="Bấm để tải ảnh của bạn"
              >
                <img id="previewAvatar" src="${state.userPhotoUrl || ''}" class="w-full h-full object-cover ${state.userPhotoUrl ? '' : 'hidden'}" alt="User Portrait">
                <div id="previewAvatarPlaceholder" class="${state.userPhotoUrl ? 'hidden' : 'flex'} flex-col items-center justify-center text-stone-400">
                  <i data-lucide="camera" class="w-6 h-6 stroke-1 text-[#8B0000]"></i>
                  <span class="text-[9px] font-mono mt-0.5 text-stone-500">Tải ảnh</span>
                </div>
              </div>

              <div class="flex-1 space-y-2">
                <input type="file" id="userPhoto" accept="image/*" class="text-xs text-stone-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-[#8B0000] file:text-white hover:file:bg-[#700000] cursor-pointer w-full transition-colors">
                
                <div class="flex items-center space-x-1.5">
                  <span class="text-[10px] font-mono text-stone-500 shrink-0">Mẫu sẵn:</span>
                  <div class="grid grid-cols-3 gap-1.5 w-full">
                    <button type="button" class="preset-avatar-btn px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer truncate shadow-2xs" data-url="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80">
                      <span>👦</span><span class="truncate">Nam Gen Z</span>
                    </button>
                    <button type="button" class="preset-avatar-btn px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer truncate shadow-2xs" data-url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80">
                      <span>👧</span><span class="truncate">Nữ Gen Z</span>
                    </button>
                    <button type="button" class="preset-avatar-btn px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer truncate shadow-2xs" data-url="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80">
                      <span>🌸</span><span class="truncate">Nàng Thơ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BƯỚC 2: CHỌN CỔ PHỤC MUỐN THỬ (DANH MỤC TRỰC QUAN 6 BỘ) -->
          <div class="space-y-2.5 pt-3 border-t border-stone-200">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
                <span class="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Chọn Cổ Phục Muốn Mặc Thử</span>
              </label>
              <span id="selectedCostumeBadge" class="text-xs font-mono font-bold text-[#8B0000] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                ${(COSTUMES_DATA.find(c => c.id === (state.selectedCostumeId || 'ngu-than')) || COSTUMES_DATA[0]).nameVi}
              </span>
            </div>

            <!-- Visual Costume Cards Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="costumeVisualGrid">
              ${COSTUMES_DATA.slice(0, 6).map((c) => {
                const isSelected = (state.selectedCostumeId || 'ngu-than') === c.id;
                const photo = c.realPhotography?.heroPhoto || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80';
                return `
                  <div 
                    class="costume-picker-card group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected ? 'border-[#8B0000] ring-2 ring-[#8B0000]/40 shadow-sm bg-rose-50/20' : 'border-stone-200 hover:border-[#D4AF37] bg-white'}"
                    data-costume-id="${c.id}"
                    data-costume-name="${c.nameVi}"
                  >
                    <div class="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                      <img src="${photo}" alt="${c.nameVi}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      <!-- Checkmark Indicator -->
                      <div class="costume-check-badge absolute top-1.5 right-1.5 w-5 h-5 rounded-full ${isSelected ? 'bg-[#8B0000] text-white flex' : 'hidden'} items-center justify-center text-[10px] font-bold shadow-xs">
                        ✓
                      </div>
                      
                      <!-- Era tag on image -->
                      <span class="absolute bottom-1.5 left-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-[#D4AF37] border border-white/10 backdrop-blur-2xs">
                        ${c.eraCategory === 'nguyen' ? 'Triều Nguyễn' : (c.eraCategory ? `Thời ${c.eraCategory.toUpperCase()}` : 'Cổ phục')}
                      </span>
                    </div>

                    <div class="p-2 text-left">
                      <h4 class="font-serif font-bold text-xs text-[#222222] truncate group-hover:text-[#8B0000] transition-colors">${c.nameVi}</h4>
                      <p class="text-[10px] text-stone-500 font-sans truncate mt-0.5">${c.form || c.shortDescVi}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Hidden field for script compatibility -->
            <input type="hidden" id="selectCostume" value="${state.selectedCostumeId || 'ngu-than'}" />
          </div>

          <!-- BƯỚC 3: CHỌN BỐI CẢNH DI SẢN (1 CHẠM) -->
          <div class="space-y-2 pt-3 border-t border-stone-200">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
                <span class="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Chọn Bối Cảnh Di Sản Check-In</span>
              </label>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="destinationPillGroup">
              <button type="button" class="dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${(!state.selectedDestination || state.selectedDestination === 'hoang-thanh') ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}" data-dest="hoang-thanh">
                🏛️ Hoàng Thành
              </button>
              <button type="button" class="dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${state.selectedDestination === 'dai-noi-hue' ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}" data-dest="dai-noi-hue">
                👑 Đại Nội Huế
              </button>
              <button type="button" class="dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${state.selectedDestination === 'hoi-an' ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}" data-dest="hoi-an">
                🏮 Phố Cổ Hội An
              </button>
              <button type="button" class="dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${state.selectedDestination === 'chua-den' ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}" data-dest="chua-den">
                🪷 Chùa Một Cột
              </button>
              <button type="button" class="dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${state.selectedDestination === 'cafe' ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}" data-dest="cafe">
                ☕ Cafe Indochine
              </button>
            </div>
            <input type="hidden" id="selectDest" value="${state.selectedDestination || 'hoang-thanh'}" />
          </div>

          <!-- TÙY CHỈNH NÂNG CAO (GẬP LẠI MẶC ĐỊNH - KHÔNG RỐI MẮT) -->
          <details class="pt-2 border-t border-stone-200 group">
            <summary class="text-xs font-mono text-stone-500 hover:text-[#8B0000] cursor-pointer flex items-center justify-between py-1 select-none">
              <span class="flex items-center space-x-1.5">
                <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                <span>Tùy chọn nâng cao (Màu sắc, vóc dáng, trang phục dưới)</span>
              </span>
              <span class="text-xs text-stone-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>

            <div class="mt-3 space-y-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans">
              <!-- Sắc tố da & Personal Color -->
              <div>
                <label class="block text-xs font-mono text-stone-600 mb-1">Undertone 4 Mùa (Personal Color):</label>
                <select id="selectUndertone" class="w-full px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
                  <option value="autumn" ${state.selectedUndertone === 'autumn' ? 'selected' : ''}>🍂 Mùa Thu (Warm Olive - Phổ biến tại Việt Nam)</option>
                  <option value="spring" ${state.selectedUndertone === 'spring' ? 'selected' : ''}>🌸 Mùa Xuân (Warm Fair - Trắng sáng ấm)</option>
                  <option value="summer" ${state.selectedUndertone === 'summer' ? 'selected' : ''}>🌊 Mùa Hạ (Cool Light - Sáng hồng lạnh)</option>
                  <option value="winter" ${state.selectedUndertone === 'winter' ? 'selected' : ''}>❄️ Mùa Đông (Cool Deep - Tương phản cao)</option>
                </select>
              </div>

              <!-- Chiều cao & Cân nặng -->
              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="block text-[11px] font-mono text-stone-600 mb-1">Chiều cao (cm):</label>
                  <input type="number" id="inputHeight" value="165" class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-stone-600 mb-1">Cân nặng (kg):</label>
                  <input type="number" id="inputWeight" value="52" class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
                </div>
              </div>

              <!-- Dáng người & Trang phục dưới -->
              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="block text-[11px] font-mono text-stone-600 mb-1">Dáng người:</label>
                  <select id="selectBodyShape" class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
                    <option value="hourglass" selected>Đồng hồ cát</option>
                    <option value="pear">Dáng quả lê</option>
                    <option value="rectangle">Dáng chữ nhật</option>
                    <option value="inverted-triangle">Tam giác ngược</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-stone-600 mb-1">Trang phục dưới:</label>
                  <select id="selectBottom" class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
                    <option value="pant">Quần thụng lụa trắng (Chuẩn mực)</option>
                    <option value="skirt">Váy quấn gấm dài</option>
                    <option value="short" class="text-red-700">Quần short (Vi phạm)</option>
                  </select>
                </div>
              </div>

              <!-- Hidden values for compatibility -->
              <input type="hidden" id="selectWeather" value="cold-18" />
              <input type="hidden" id="selectCollar" value="huu-nham" />
              <input type="hidden" id="selectColor" value="#8B0000" />
            </div>
          </details>

          <!-- PRIMARY ACTION: Virtual Try-On Button -->
          <div class="space-y-2 pt-2">
            <div class="flex items-center justify-between text-[11px] font-mono px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200">
              <span id="geminiConnectionStatus" class="flex items-center space-x-1.5 text-stone-600">
                <span id="geminiStatusDot" class="w-2 h-2 rounded-full bg-amber-500"></span>
                <span id="geminiStatusText">Đang kiểm tra kết nối AI Studio...</span>
              </span>
              <span class="text-stone-400 text-[10px] flex items-center space-x-1">
                <span>🔒 Backend (.env.local)</span>
              </span>
            </div>

            <button id="btnVirtualTryOn" class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#8B0000] via-[#A01625] to-[#8B0000] hover:from-[#700000] hover:to-[#700000] text-white font-mono font-bold text-sm transition-all shadow-md hover:shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5 active:scale-98 border border-[#D4AF37]/50 relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <i data-lucide="sparkles" class="w-4 h-4 text-[#D4AF37]"></i>
              <span class="tracking-wide">✨ Thử Cổ Phục Bằng AI (gemini-3.1-flash-image)</span>
            </button>

            <!-- SECONDARY ACTION: Personal Color & Guardrail Analysis -->
            <button id="btnAnalyze" class="w-full py-2.5 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/30 font-mono font-bold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              <i data-lucide="compass" class="w-3.5 h-3.5"></i>
              <span>Phân Tích Personal Color & Cultural Guardrail</span>
            </button>
          </div>
        </div>

        <!-- RIGHT PANE: Live Visual Lookbook Mockup & Dynamic Result Dashboard -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Scanning Overlay (Appears during analysis) -->
          <div id="scanningOverlay" class="hidden bg-white rounded-2xl border-2 border-dashed border-[#D4AF37] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
            <div class="w-16 h-16 rounded-full border-4 border-[#8B0000] border-t-transparent animate-spin"></div>
            <div class="space-y-1.5 max-w-md">
              <div class="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Engine: gemini-3.1-flash-image · Google AI Studio</span>
              </div>
              <p id="scanningProgressText" class="font-mono text-sm text-[#8B0000] font-bold">
                ✦ Đang phân tích diện mạo & kết nối gemini-3.1-flash-image...
              </p>
              <p id="scanningSubText" class="text-xs text-stone-500 font-sans">
                Trích xuất đường nét khuôn mặt, đối chiếu quy chuẩn cổ phục 1744 và kết xuất ảnh Editorial...
              </p>
            </div>
            <div class="w-64 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div class="h-full bg-gradient-to-r from-[#D4AF37] via-[#8B0000] to-[#D4AF37] animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>

          <!-- Editorial Lookbook Output Dashboard -->
          <div id="resultContainer" class="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-8 shadow-md space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
              <div>
                <span class="text-xs font-mono font-bold text-[#8B0000] tracking-wider uppercase">✦ LOOKBOOK ARCHIVE // N° 1744</span>
                <h3 id="lookbookTitle" class="font-serif text-2xl font-bold text-[#222222] mt-0.5">
                  Áo Ngũ Thân - Sĩ Tử Kinh Kỳ 2026
                </h3>
              </div>
              <div id="respectScoreBadge" class="px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                Cultural Score: 98%
              </div>
            </div>

            <!-- Real-time AI Try-On Execution Banner -->
            <div id="tryOnStatusBanner" class="hidden"></div>

            <!-- Dynamic Lookbook Visual Preview (Editorial Showcase) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start bg-[#FAF7F2] rounded-xl p-5 md:p-6 border border-stone-200">
              <div class="md:col-span-6 flex flex-col items-center justify-center">
                <div id="polaroidPhotocardElement" class="w-full max-w-[340px] rounded-2xl bg-white border-4 border-white shadow-xl p-3 flex flex-col items-center justify-between transition-all hover:shadow-2xl">
                  <div id="lookbookCostumeVisual" class="w-full h-80 sm:h-96 flex items-center justify-center overflow-hidden rounded-xl bg-stone-900 relative group">
                    <img 
                      id="tryOnOutputImage"
                      src="${COSTUMES_DATA[0].realPhotography?.heroPhoto}" 
                      alt="${COSTUMES_DATA[0].nameVi}" 
                      class="w-full h-full object-cover filter brightness-95 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                    <div class="absolute top-2.5 left-2.5 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-mono border border-white/20">
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span id="tryOnModelBadge">gemini-3.1-flash-image</span>
                    </div>
                    <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none">
                      <span id="lookbookImageTitle" class="truncate max-w-[170px] text-[#D4AF37] font-bold">${COSTUMES_DATA[0].nameVi}</span>
                      <span class="px-2 py-0.5 rounded bg-[#8B0000] text-[9px] uppercase tracking-wider font-bold">4K Editorial</span>
                    </div>
                  </div>
                  <div class="w-full text-center border-t border-stone-100 pt-2 flex items-center justify-between px-2 mt-2">
                    <span id="lookbookPhotoCredit" class="text-[11px] font-mono text-stone-500 uppercase tracking-tight truncate max-w-[150px]">VietHeritage Editorial</span>
                    <span class="text-[10px] font-mono text-[#8B0000] font-bold">1744·2026</span>
                  </div>
                </div>

                <!-- Action Buttons for Output Image -->
                <div class="w-full max-w-[340px] grid grid-cols-2 gap-2 mt-3.5">
                  <button id="btnDownloadPolaroid" class="text-xs font-mono font-bold text-white bg-[#8B0000] hover:bg-[#700000] flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl transition-all shadow-xs cursor-pointer">
                    <i data-lucide="download" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                    <span>Tải Ảnh HD</span>
                  </button>
                  <button id="btnSaveToWardrobe" class="text-xs font-mono font-bold text-[#8B0000] bg-white hover:bg-rose-50 border border-[#8B0000]/30 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl transition-all shadow-xs cursor-pointer">
                    <i data-lucide="archive" class="w-3.5 h-3.5"></i>
                    <span>Lưu Tủ Đồ</span>
                  </button>
                </div>
              </div>

              <div class="md:col-span-7 space-y-3 text-xs">
                <!-- Personal Color Diagnosis -->
                <div>
                  <span class="font-mono font-bold text-[#8B0000] uppercase text-[10px] tracking-wide">✦ Chẩn Đoán Sắc Tố Cá Nhân:</span>
                  <p id="personalColorSeason" class="font-serif font-bold text-base text-[#222222]">
                    Mùa Thu (Autumn - Warm)
                  </p>
                  <p id="personalColorDesc" class="text-stone-600 mt-0.5 leading-relaxed text-[11px]">
                    Da ngăm ấm / vàng olive (Warm Undertone kinh điển của người Việt).
                  </p>
                  <div class="mt-1 p-2 rounded-lg bg-white border border-stone-200">
                    <span class="font-mono text-[10px] text-stone-500 block mb-0.5">Gợi ý bảng màu:</span>
                    <p id="personalColorPalette" class="font-mono font-medium text-[#8B0000] text-[11px]">
                      Cam đất, Đỏ tía Burgundy, Vàng mù tạt, Xanh rêu Olive
                    </p>
                  </div>
                </div>

                <!-- Recommended Costume -->
                <div>
                  <span class="font-mono font-bold text-[#D4AF37] uppercase text-[10px] tracking-wide">✦ Cổ Phục Đề Xuất Theo Mùa:</span>
                  <p id="recommendedCostumeText" class="font-serif font-bold text-xs text-[#222222] mt-0.5">
                    Áo Tấc bánh quy cam, Nhật Bình gấm Vọng Nguyệt đỏ trầm, Giao Lĩnh the vàng đất
                  </p>
                </div>

                <!-- Natural Dyes Swatches -->
                <div>
                  <span class="font-mono text-stone-500 uppercase text-[10px]">${t('dyeTitle')}:</span>
                  <div id="dyesContainer" class="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                    <div class="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-200">
                      <span class="w-3 h-3 rounded-full bg-[#8B1E3F]"></span>
                      <span class="text-[10px] font-mono">Củ Dền</span>
                    </div>
                    <div class="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-200">
                      <span class="w-3 h-3 rounded-full bg-[#1C3144]"></span>
                      <span class="text-[10px] font-mono">Xanh Chàm</span>
                    </div>
                    <div class="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-200">
                      <span class="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                      <span class="text-[10px] font-mono">Hoàng Yến</span>
                    </div>
                  </div>
                </div>

                <!-- Body Tailoring Advice -->
                <div>
                  <span class="font-mono text-stone-500 uppercase text-[10px]">${t('bodyTitle')}:</span>
                  <p id="bodyAdviceText" class="text-stone-600 text-[11px] leading-relaxed mt-0.5">
                    Dáng người cân đối. Áo Ngũ Thân tay chẽn vuốt nhẹ eo tạo đường cong thanh thoát và tôn chiều cao.
                  </p>
                </div>
              </div>
            </div>

            <!-- CONTEXTUAL LOOKBOOK RECOMMENDATIONS (Destination + Weather + Tutorials) -->
            <div id="contextualLookbookContainer" class="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-3">
              <div class="flex items-center justify-between border-b border-stone-200/80 pb-2">
                <span class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wide flex items-center space-x-1.5">
                  <i data-lucide="compass" class="w-3.5 h-3.5 text-[#8B0000]"></i>
                  <span>Tư Vấn Phối Đồ Theo Ngữ Cảnh (Contextual Lookbook)</span>
                </span>
                <span class="text-[10px] font-mono text-stone-500">Địa Điểm & Thời Tiết</span>
              </div>

              <!-- Outfit title & Desc -->
              <div>
                <h4 id="contextOutfitTitle" class="font-serif font-bold text-base text-[#222222]">
                  Áo Giao Lĩnh The Dày & Đối Khâm Gấm Nhũ Lót Lụa
                </h4>
                <p id="contextOutfitDesc" class="text-xs text-[#666666] mt-0.5 leading-relaxed">
                  Lookbook giữ ấm trang trọng tại không gian di tích cổ kính. Tầng lớp vải dày dặn giúp tạo phom dáng bề thế, tôn nghiêm.
                </p>
              </div>

              <!-- Hair, Makeup & Accessories -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div class="bg-white p-3 rounded-lg border border-stone-200">
                  <span class="font-mono font-bold text-[#8B0000] text-[10px] uppercase block mb-1">💄 Kiểu Tóc & Trang Điểm:</span>
                  <p id="contextHairMakeup" class="text-stone-700 text-[11px] leading-relaxed">
                    Búi tóc cao vấn khăn chữ Nhân, cố định bằng trâm bạc. Makeup tông ấm (Autumn Warm), má hồng đất, son đỏ trầm.
                  </p>
                </div>
                <div class="bg-white p-3 rounded-lg border border-stone-200">
                  <span class="font-mono font-bold text-[#D4AF37] text-[10px] uppercase block mb-1">✨ Phụ Kiện Đi Kèm:</span>
                  <div id="contextAccessories" class="flex flex-wrap gap-1 mt-1">
                    <span class="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">Kiềng bạc bản lớn</span>
                    <span class="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">Nón quai thao / Nón lá</span>
                    <span class="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">Túi cối vintage</span>
                    <span class="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">Guốc mộc</span>
                  </div>
                </div>
              </div>

              <!-- YouTube Tutorial Video Links -->
              <div class="pt-2">
                <span class="font-mono text-[10px] text-stone-500 uppercase block mb-1.5 flex items-center space-x-1">
                  <i data-lucide="play-circle" class="w-3 h-3 text-[#8B0000]"></i>
                  <span>Video Hướng Dẫn Vấn Khăn & Trang Điểm (YouTube):</span>
                </span>
                <div id="contextYoutubeGuides" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a href="https://www.youtube.com/watch?v=HHTXi9DvhAg" target="_blank" rel="noreferrer" class="p-2.5 rounded-lg bg-white hover:bg-rose-50/50 border border-stone-200 hover:border-[#8B0000] flex items-center justify-between text-xs transition-colors group">
                    <div class="flex items-center space-x-2 truncate">
                      <span class="w-6 h-6 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">▶</span>
                      <span class="font-sans font-medium text-stone-800 text-[11px] truncate group-hover:text-[#8B0000]">Hướng dẫn vấn khăn & búi tóc</span>
                    </div>
                    <span class="text-[10px] font-mono text-stone-400 shrink-0">5:20 ↗</span>
                  </a>
                  <a href="https://www.youtube.com/watch?v=FBcvPdh4XoM" target="_blank" rel="noreferrer" class="p-2.5 rounded-lg bg-white hover:bg-rose-50/50 border border-stone-200 hover:border-[#8B0000] flex items-center justify-between text-xs transition-colors group">
                    <div class="flex items-center space-x-2 truncate">
                      <span class="w-6 h-6 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">▶</span>
                      <span class="font-sans font-medium text-stone-800 text-[11px] truncate group-hover:text-[#8B0000]">Trang điểm hoài cổ Indochine</span>
                    </div>
                    <span class="text-[10px] font-mono text-stone-400 shrink-0">7:45 ↗</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- CULTURAL GUARDRAIL WARNING CONTAINER (Shake Animation Trigger) -->
            <div id="guardrailAlerts" class="hidden space-y-2"></div>

            <!-- Action Buttons: Publish, Email, Wardrobe -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
              <button id="btnPublishCommunity" class="py-2.5 px-3 rounded-xl bg-[#222222] hover:bg-[#333333] text-white font-mono text-xs flex items-center justify-center space-x-2 transition-colors shadow-2xs cursor-pointer">
                <i data-lucide="share-2" class="w-4 h-4 text-[#D4AF37]"></i>
                <span>${t('btnAddToCommunity')}</span>
              </button>
              <button id="btnOpenEmailModal" class="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#8B0000] border border-[#8B0000]/40 font-mono text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                <i data-lucide="mail" class="w-4 h-4"></i>
                <span>${t('btnSendEmail')}</span>
              </button>
              <button id="btnSaveToWardrobe" class="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29f2e] text-[#222222] font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                <i data-lucide="bookmark" class="w-4 h-4"></i>
                <span>${t('btnSaveWardrobe')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCommunityGridSection() {
  const isEn = state.lang === 'en';
  return `
    <section class="pt-8 border-t border-stone-200">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">✦ Live Community Grid</span>
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#222222] mt-0.5">
            ${t('communityHeader')}
          </h2>
          <p class="text-xs md:text-sm text-[#666666]">
            ${t('communitySub')}
          </p>
        </div>
      </div>

      <div id="communityGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </section>
  `;
}

// ----------------- MODALS -----------------

function renderModals() {
  const modalContainer = document.getElementById('modalContainer');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <!-- COSTUME DETAIL MODAL -->
    <div id="costumeModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#D4AF37] p-6 md:p-8 shadow-2xl relative">
        <button id="closeCostumeModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center z-10 cursor-pointer">
          ✕
        </button>
        <div id="costumeModalBody"></div>
      </div>
    </div>

    <!-- EMAIL REPORT MODAL -->
    <div id="emailModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-lg w-full border border-[#D4AF37] p-6 shadow-2xl relative">
        <button id="closeEmailModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center">
          ✕
        </button>
        <span class="text-xs font-mono font-bold text-[#8B0000] uppercase">✦ Heritage Lookbook Receipt</span>
        <h3 class="font-serif text-2xl font-bold text-[#222222] mt-1 mb-2">Gửi Hồ Sơ Phong Cách Về Email</h3>
        <p class="text-xs text-[#666666] mb-4">Hệ thống sẽ tổng hợp báo cáo Personal Color, phom dáng và thẻ Heritage Polaroid để gửi đến bạn.</p>

        <form id="emailForm" class="space-y-4">
          <div>
            <label class="block text-xs font-mono text-stone-600 mb-1">Địa chỉ Email nhận báo cáo:</label>
            <input type="email" id="targetEmailInput" value="${state.user.email || 'genz@vietheritage.vn'}" required class="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none">
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono font-bold text-xs transition-colors shadow-xs">
            Xác nhận & Gửi Email Báo Cáo
          </button>
        </form>

        <!-- Simulated Sent Notification -->
        <div id="emailSuccessNotice" class="hidden mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono">
          ✓ Đã gửi thành công dossier phong cách về email! Hãy kiểm tra hòm thư của bạn.
        </div>
      </div>
    </div>

    <!-- PERSONAL WARDROBE MODAL -->
    <div id="wardrobeModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37] p-6 shadow-2xl relative">
        <button id="closeWardrobeModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center">
          ✕
        </button>
        <span class="text-xs font-mono font-bold text-[#8B0000] uppercase">✦ Personal Archive</span>
        <h3 class="font-serif text-2xl font-bold text-[#222222] mt-1 mb-2">${t('wardrobeBtn')}</h3>
        <p class="text-xs text-[#666666] mb-4">Lưu trữ các bản phối trang phục cá nhân của bạn qua các phiên truy cập.</p>

        <div id="wardrobeList" class="space-y-3"></div>
      </div>
    </div>

    <!-- AUTH / PROFILE MODAL -->
    <div id="authModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-sm w-full border border-[#D4AF37] p-6 shadow-2xl relative">
        <button id="closeAuthModal" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center">
          ✕
        </button>
        <span class="text-xs font-mono font-bold text-[#8B0000] uppercase">✦ Heritage Creator ID</span>
        <h3 class="font-serif text-2xl font-bold text-[#222222] mt-1 mb-4">Tài Khoản Nhà Sáng Tạo</h3>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-mono text-stone-600 mb-1">Họ & Tên:</label>
            <input type="text" id="authNameInput" value="${state.user.name}" class="w-full px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none">
          </div>
          <div>
            <label class="block text-xs font-mono text-stone-600 mb-1">Email:</label>
            <input type="email" id="authEmailInput" value="${state.user.email}" class="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none">
          </div>
          <button id="saveAuthBtn" class="w-full py-2.5 rounded-xl bg-[#222222] hover:bg-[#333333] text-white font-mono text-xs font-bold transition-colors">
            Cập nhật Hồ Sơ
          </button>
        </div>
      </div>
    </div>

    <!-- FULL MAP IMAGE LIGHTBOX MODAL -->
    <div id="fullMapImageModal" class="${state.mapFullImageModalOpen ? '' : 'hidden'} fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-[#FAF7F2] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border-2 border-[#D4AF37] p-6 shadow-2xl relative flex flex-col items-center">
        <button id="btnCloseFullMapModal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 font-mono text-base flex items-center justify-center z-10 cursor-pointer shadow-md border border-stone-200">
          ✕
        </button>
        
        <div class="w-full text-center pb-4 border-b border-[#D4AF37]/30 mb-4">
          <span class="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">✦ Di Sản Địa Lý &amp; Chủ Quyền Biển Đảo</span>
          <h3 class="font-serif text-2xl font-bold text-[#222222] mt-0.5">Bản Đồ Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</h3>
          <p class="text-xs text-[#666666] mt-1">Toàn vẹn lãnh thổ dải đất hình chữ S cùng hai quần đảo Hoàng Sa và Trường Sa thiêng liêng.</p>
        </div>

        <div class="w-full flex items-center justify-center overflow-auto rounded-xl bg-white/80 p-2 border border-[#D4AF37]/40 shadow-inner">
          <img 
            src="${state.customMapImage || mapImageDefault || '/src/assets/images/regenerated_image_1790863673225.jpg'}" 
            alt="Bản Đồ Toàn Cảnh Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam"
            referrerpolicy="no-referrer"
            class="max-w-full h-auto object-contain rounded-lg max-h-[75vh]"
          />
        </div>
      </div>
    </div>
  `;
}

// ----------------- GEMINI CHATBOT DRAWER -----------------

function renderChatbot() {
  const chatContainer = document.getElementById('chatbotContainer');
  if (!chatContainer) return;

  chatContainer.innerHTML = `
    <!-- Floating Action Button (FAB) with 2D Heritage Avatar -->
    <button id="fabChat" class="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-full bg-[#8B0000] hover:bg-[#700000] text-[#D4AF37] font-mono text-xs font-bold shadow-2xl flex items-center space-x-2.5 border-2 border-[#D4AF37] transition-all hover:scale-105 cursor-pointer ring-4 ring-[#8B0000]/25 group">
      <!-- 2D Heritage Avatar SVG (Áo Ngũ Thân & Khăn Đóng) -->
      <div class="w-8 h-8 rounded-full overflow-hidden bg-[#FAF7F2] border border-[#D4AF37] flex items-center justify-center relative shrink-0 shadow-inner">
        <svg viewBox="0 0 100 100" class="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#FDF6E2" />
          <!-- Khăn đóng truyền thống -->
          <ellipse cx="50" cy="34" rx="22" ry="12" fill="#222222" />
          <ellipse cx="50" cy="30" rx="20" ry="7" fill="#8B0000" />
          <circle cx="50" cy="27" r="3" fill="#D4AF37" />
          <!-- Khuôn mặt -->
          <ellipse cx="50" cy="46" rx="17" ry="16" fill="#FAD4B2" />
          <circle cx="44" cy="45" r="2" fill="#222222" />
          <circle cx="56" cy="45" r="2" fill="#222222" />
          <path d="M47 52 Q50 56 53 52" stroke="#B33927" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <!-- Áo ngũ thân lập lĩnh & nút áo -->
          <path d="M30 62 L50 58 L70 62 L78 98 L22 98 Z" fill="#8B0000" />
          <path d="M44 58 L50 78 L56 58" fill="#D4AF37" opacity="0.3" />
          <path d="M47 62 L50 62" stroke="#D4AF37" stroke-width="2" />
          <circle cx="50" cy="67" r="1.8" fill="#D4AF37" />
          <circle cx="50" cy="74" r="1.8" fill="#D4AF37" />
          <circle cx="50" cy="81" r="1.8" fill="#D4AF37" />
        </svg>
      </div>
      <div class="text-left hidden sm:block">
        <span class="block text-[11px] text-white font-bold leading-tight">V-Assistant</span>
        <span class="block text-[9px] text-[#D4AF37] font-normal">Trợ lý Cổ Phục AI</span>
      </div>
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    </button>

    <!-- Slide-out Drawer Panel -->
    <div id="chatDrawer" class="fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-[#FAF7F2] border-l border-[#D4AF37]/40 shadow-2xl transform transition-transform duration-300 ${state.chatOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between">
      <!-- Chat Header -->
      <div class="p-4 bg-white border-b border-[#D4AF37]/30 flex items-center justify-between">
        <div class="flex items-center space-x-2.5">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-[#FAF7F2] border-2 border-[#D4AF37] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#FDF6E2" />
              <ellipse cx="50" cy="34" rx="22" ry="12" fill="#222222" />
              <ellipse cx="50" cy="30" rx="20" ry="7" fill="#8B0000" />
              <circle cx="50" cy="27" r="3" fill="#D4AF37" />
              <ellipse cx="50" cy="46" rx="17" ry="16" fill="#FAD4B2" />
              <circle cx="44" cy="45" r="2" fill="#222222" />
              <circle cx="56" cy="45" r="2" fill="#222222" />
              <path d="M47 52 Q50 56 53 52" stroke="#B33927" stroke-width="1.8" fill="none" stroke-linecap="round" />
              <path d="M30 62 L50 58 L70 62 L78 98 L22 98 Z" fill="#8B0000" />
              <path d="M47 62 L50 62" stroke="#D4AF37" stroke-width="2" />
              <circle cx="50" cy="67" r="1.8" fill="#D4AF37" />
              <circle cx="50" cy="74" r="1.8" fill="#D4AF37" />
            </svg>
          </div>
          <div>
            <h4 class="font-serif font-bold text-sm text-[#222222]">Trợ Lý Cổ Phục AI (V-Assistant)</h4>
            <div class="flex items-center space-x-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-[10px] font-mono text-stone-500" id="geminiStatusLabel">Gemini Live · 24/7 Văn Hóa Chuẩn Sử</span>
            </div>
          </div>
        </div>
        <button id="closeChatBtn" class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-xs flex items-center justify-center cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Quick Preset Chips -->
      <div class="p-2.5 bg-[#F5F1E8] border-b border-stone-200 overflow-x-auto flex items-center space-x-2 shrink-0">
        <button class="chip-prompt px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors" data-prompt="hue">
          Tư vấn đồ đi Huế tháng 10
        </button>
        <button class="chip-prompt px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors" data-prompt="nhatbinh">
          Ý nghĩa hoa văn Áo Nhật Bình
        </button>
        <button class="chip-prompt px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors" data-prompt="nguthan">
          Phối Áo Ngũ Thân Gen Z
        </button>
        <button class="chip-prompt px-2.5 py-1 rounded-full bg-white hover:bg-[#FDF6E2] text-stone-700 border border-stone-200 text-[10px] font-mono whitespace-nowrap cursor-pointer transition-colors" data-prompt="toc">
          Kiểu tóc & trang điểm
        </button>
      </div>

      <!-- Messages Thread (Scrollable) -->
      <div id="chatMessagesThread" class="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        ${renderChatMessages()}
      </div>

      <!-- Chat Input & Controls -->
      <div class="p-3 bg-white border-t border-[#D4AF37]/30 space-y-2">
        <form id="chatForm" class="flex items-center space-x-2">
          <!-- Voice Simulated Button -->
          <button type="button" id="voiceToggleBtn" class="p-2 rounded-lg border border-stone-300 hover:border-[#8B0000] text-stone-600 hover:text-[#8B0000] transition-colors cursor-pointer" title="Simulated Voice Query">
            🎙️
          </button>
          <input type="text" id="chatInput" placeholder="${t('chatPlaceholder')}" class="flex-1 px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none">
          <button type="submit" class="px-3.5 py-2 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-xs">
            ${t('btnSend')}
          </button>
        </form>
        <div class="flex items-center justify-between text-[10px] text-stone-400 font-mono">
          <span>System: Cultural Etiquette Grounded</span>
          <span>Thinking Mode: High</span>
        </div>
      </div>
    </div>
  `;
}

function renderChatMessages() {
  const isEn = state.lang === 'en';
  return state.chatMessages.map(m => {
    const isAi = m.sender === 'ai';
    const text = isEn && m.enText ? m.enText : m.text;
    return `
      <div class="flex ${isAi ? 'justify-start' : 'justify-end'}">
        <div class="max-w-[85%] p-3 rounded-xl ${isAi ? 'bg-white border border-[#D4AF37]/30 text-[#222222]' : 'bg-[#8B0000] text-white'} shadow-2xs leading-relaxed">
          ${text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;
  }).join('');
}

// ----------------- EVENT LISTENERS & LOGIC -----------------

function attachEvents() {
  // Navigation Logo -> Hub 1
  document.getElementById('navLogo')?.addEventListener('click', () => switchHub('hub1'));

  // Hub Switchers
  document.getElementById('navTabHub1')?.addEventListener('click', () => switchHub('hub1'));
  document.getElementById('navTabHub2')?.addEventListener('click', () => switchHub('hub2'));
  document.getElementById('mobTabHub1')?.addEventListener('click', () => switchHub('hub1'));
  document.getElementById('mobTabHub2')?.addEventListener('click', () => switchHub('hub2'));
  document.getElementById('heroGoHub1')?.addEventListener('click', () => switchHub('hub1'));
  document.getElementById('heroGoHub2')?.addEventListener('click', () => switchHub('hub2'));
  document.querySelectorAll('[data-hub-target]').forEach(el => {
    el.addEventListener('click', e => {
      const target = e.currentTarget.getAttribute('data-hub-target');
      if (target) switchHub(target);
    });
  });

  // Language Switcher
  document.getElementById('langToggleBtn')?.addEventListener('click', () => {
    state.lang = state.lang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('vheritage_lang', state.lang);
    initApp();
  });

  // Audio Toggle
  document.getElementById('audioToggleBtn')?.addEventListener('click', () => {
    state.audioPlaying = heritageAudio.toggle(isPlaying => {
      state.audioPlaying = isPlaying;
      renderNavbar();
      attachEvents();
    });
  });

  // 2D Anatomy View Real Photo Reference
  document.getElementById('anatomyViewRealPhotoBtn')?.addEventListener('click', e => {
    const id = e.currentTarget.getAttribute('data-costume-id') || state.activeAnatomyCostumeId || 'ngu-than';
    openCostumeModal(id, 'realphotos');
  });

  // 2D Anatomy Toggle Flaps (Smooth 2D CSS slide transforms)
  document.getElementById('toggleFlapsBtn')?.addEventListener('click', () => {
    state.flapsOpen = !state.flapsOpen;
    const flapLeft = document.getElementById('flapLeft');
    const flapRight = document.getElementById('flapRight');
    const btnText = document.getElementById('flapsBtnText');
    const flapIndicator = document.getElementById('flapStatusIndicator');
    const isEn = state.lang === 'en';
    if (btnText) {
      btnText.innerText = state.flapsOpen ? (isEn ? 'Close Flaps' : 'Đóng Vạt Áo') : (isEn ? 'Open Flaps' : 'Mở Vạt Áo');
    }
    if (flapIndicator) {
      flapIndicator.innerText = state.flapsOpen ? (isEn ? '✦ Flaps Unfolded' : '✦ Đang Mở Vạt') : (isEn ? '✦ Fully Fastened' : '✦ Đang Cài Kín');
    }
    if (flapLeft && flapRight) {
      if (state.flapsOpen) {
        flapLeft.style.transform = 'translateX(-108%) rotate(-2deg)';
        flapLeft.style.opacity = '0.45';
        flapRight.style.transform = 'translateX(108%) rotate(2deg)';
        flapRight.style.opacity = '0.45';
      } else {
        flapLeft.style.transform = 'translateX(0) rotate(0deg)';
        flapLeft.style.opacity = '1';
        flapRight.style.transform = 'translateX(0) rotate(0deg)';
        flapRight.style.opacity = '1';
      }
    }
    updateAnatomyDisplay();
  });

  // 2D Anatomy Costume Switcher Tabs (Supports ALL 5 costumes)
  document.querySelectorAll('.anatomy-costume-tab').forEach(btn => {
    btn.addEventListener('click', e => {
      const costumeId = e.currentTarget.getAttribute('data-costume-id');
      if (costumeId) {
        state.activeAnatomyCostumeId = costumeId;
        state.flapsOpen = false;
        state.activeLayer = 'all';
        state.activeHotspot = '1';
        renderHubs();
        attachEvents();
      }
    });
  });

  // Anatomy Dynamic Layer Filters
  document.querySelectorAll('.anatomy-layer-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      state.activeLayer = e.currentTarget.getAttribute('data-layer') || 'all';
      updateAnatomyDisplay();
    });
  });

  // Hotspots click
  document.querySelectorAll('.hotspot, .hotspot-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.currentTarget.getAttribute('data-hotspot');
      selectHotspot(idx);
    });
  });

  // --- HISTORICAL DYNASTIES TIMELINE EVENT LISTENERS ---

  // Dynasty Milestone Tab Buttons
  document.querySelectorAll('.timeline-milestone-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const dynastyId = e.currentTarget.getAttribute('data-dynasty-id');
      if (dynastyId) {
        state.activeTimelineDynastyId = dynastyId;
        heritageAudio?.playChime?.();
        renderHubs();
        attachEvents();
      }
    });
  });

  // Previous Dynasty Button
  document.getElementById('btnPrevDynasty')?.addEventListener('click', () => {
    const curIdx = DYNASTIES_TIMELINE_DATA.findIndex(d => d.id === state.activeTimelineDynastyId);
    const newIdx = (curIdx - 1 + DYNASTIES_TIMELINE_DATA.length) % DYNASTIES_TIMELINE_DATA.length;
    state.activeTimelineDynastyId = DYNASTIES_TIMELINE_DATA[newIdx].id;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Next Dynasty Button
  document.getElementById('btnNextDynasty')?.addEventListener('click', () => {
    const curIdx = DYNASTIES_TIMELINE_DATA.findIndex(d => d.id === state.activeTimelineDynastyId);
    const newIdx = (curIdx + 1) % DYNASTIES_TIMELINE_DATA.length;
    state.activeTimelineDynastyId = DYNASTIES_TIMELINE_DATA[newIdx].id;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Toggle Timeline Comparison Mode
  document.getElementById('btnToggleTimelineCompare')?.addEventListener('click', () => {
    state.timelineCompareMode = !state.timelineCompareMode;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Select Secondary Comparison Dynasty Dropdown
  document.getElementById('selectCompareDynasty')?.addEventListener('change', e => {
    state.timelineCompareDynastyId = e.target.value;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Timeline Jump to V-Studio Button
  document.querySelectorAll('.timeline-jump-studio-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const costumeId = e.currentTarget.getAttribute('data-costume-id') || 'ngu-than';
      state.activeAnatomyCostumeId = costumeId;
      switchHub('hub2');
      const select = document.getElementById('selectCostume');
      if (select) {
        select.value = costumeId;
        toggleCollarOption();
      }
      document.getElementById('studioSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- CULTURAL WISDOM SNIPPET EVENT LISTENERS ---

  // Next Fact Button
  document.getElementById('btnNextWisdom')?.addEventListener('click', () => {
    state.currentWisdomIndex = (state.currentWisdomIndex + 1) % CULTURAL_WISDOM_SNIPPETS.length;
    state.wisdomCopied = false;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Random Fact Button
  document.getElementById('btnRandomWisdom')?.addEventListener('click', () => {
    const total = CULTURAL_WISDOM_SNIPPETS.length;
    let nextIdx = state.currentWisdomIndex;
    if (total > 1) {
      do {
        nextIdx = Math.floor(Math.random() * total);
      } while (nextIdx === state.currentWisdomIndex);
    }
    state.currentWisdomIndex = nextIdx;
    state.wisdomCopied = false;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Copy Snippet Button
  document.getElementById('btnCopyWisdom')?.addEventListener('click', () => {
    const item = CULTURAL_WISDOM_SNIPPETS[state.currentWisdomIndex] || CULTURAL_WISDOM_SNIPPETS[0];
    const isEn = state.lang === 'en';
    const textToCopy = `❖ ${isEn ? item.titleEn : item.titleVi}\n"${isEn ? item.factEn : item.factVi}"\n— ${isEn ? 'Moral Philosophy' : 'Triết lý nhân sinh'}: ${isEn ? item.philosophyEn : item.philosophyVi}\n(Nguồn: ${item.source} · V-Mix Heritage App)`;
    
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        state.wisdomCopied = true;
        const copyTextEl = document.getElementById('copyWisdomText');
        if (copyTextEl) copyTextEl.innerText = isEn ? 'Copied!' : 'Đã Chép!';
        setTimeout(() => {
          state.wisdomCopied = false;
          if (copyTextEl) copyTextEl.innerText = isEn ? 'Copy' : 'Sao Chép';
        }, 2000);
      });
    }
  });

  // Fact Carousel Quick Selector Dots
  document.querySelectorAll('.wisdom-dot-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index') || '0', 10);
      if (!isNaN(idx) && idx >= 0 && idx < CULTURAL_WISDOM_SNIPPETS.length) {
        state.currentWisdomIndex = idx;
        state.wisdomCopied = false;
        heritageAudio?.playChime?.();
        renderHubs();
        attachEvents();
      }
    });
  });

  // Gallery: "Bóc Tách 2D" Direct Button on every costume card
  document.querySelectorAll('.deconstruct-costume-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.getAttribute('data-costume-id');
      if (id) {
        state.activeAnatomyCostumeId = id;
        state.flapsOpen = false;
        state.activeLayer = 'all';
        state.activeHotspot = '1';
        renderHubs();
        attachEvents();
        document.getElementById('anatomySection')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Museum Era Filter Pills
  document.querySelectorAll('.era-filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      state.galleryEraFilter = e.currentTarget.getAttribute('data-era') || 'all';
      renderHubs();
      attachEvents();
    });
  });

  // Dynamic Grid Gallery Card Click: Entire card onClick opens modal displaying historical data (Fabric, Era, Symbolism)
  document.querySelectorAll('.costume-gallery-card').forEach(card => {
    card.addEventListener('click', e => {
      // Prevent opening modal when clicking on action buttons that have their own distinct workflows
      if (
        e.target.closest('.deconstruct-costume-btn') || 
        e.target.closest('.try-costume-btn') ||
        e.target.closest('.card-mode-btn') ||
        e.target.closest('.card-split-range') ||
        e.target.closest('.btn-view-realphoto') ||
        e.target.closest('.view-costume-btn')
      ) {
        return;
      }
      const id = card.getAttribute('data-costume-id');
      if (id) {
        openCostumeModal(id);
      }
    });
  });

  // Card Visual Mode Switcher (Vector / Split Slider / Real 4K)
  document.querySelectorAll('.card-mode-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-costume-id');
      const mode = btn.getAttribute('data-mode') || 'svg';
      if (id) {
        state.cardImageMode[id] = mode;
        renderHubs();
        attachEvents();
      }
    });
  });

  // Global Gallery Visual Presentation Mode Switcher (All 6 Costumes)
  document.querySelectorAll('.global-gallery-mode-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const mode = e.currentTarget.getAttribute('data-mode') || 'real';
      state.galleryGlobalMode = mode;
      state.cardImageMode = {}; // Clear individual overrides so all 6 cards update in sync
      heritageAudio?.playChime?.();
      renderHubs();
      attachEvents();
    });
  });

  // Card Direct Quick 4K Lightbox Inspection Button
  document.querySelectorAll('.quick-card-lightbox-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-costume-id');
      const c = COSTUMES_DATA.find(item => item.id === id);
      if (c && c.realPhotography) {
        openLightbox({
          url: c.realPhotography.heroPhoto,
          title: c.nameVi,
          location: c.realPhotography.locationVi,
          desc: c.realPhotography.shootingNotesVi || c.realPhotography.photoTitleVi
        });
      }
    });
  });

  // Card Split Slider live range dragging
  document.querySelectorAll('.card-split-range').forEach(input => {
    input.addEventListener('input', e => {
      e.stopPropagation();
      const id = input.getAttribute('data-costume-id');
      const val = input.value;
      state.cardSplitPos[id] = parseInt(val, 10);
      const clipped = document.getElementById(`cardSplitOverlay_${id}`);
      const divider = document.getElementById(`cardSplitDivider_${id}`);
      const text = document.getElementById(`cardSplitValText_${id}`);
      if (clipped) clipped.style.clipPath = `inset(0 calc(100% - ${val}%) 0 0)`;
      if (divider) divider.style.left = `${val}%`;
      if (text) text.innerText = `${val}%`;
    });
  });

  // Card Direct "Ảnh Thực Tế & Kính Lúp" Button
  document.querySelectorAll('.btn-view-realphoto, .quick-open-realphoto-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-costume-id');
      if (id) {
        openCostumeModal(id, 'realphotos');
      }
    });
  });

  // Dynamic Gallery Live Search Filter
  document.getElementById('gallerySearchInput')?.addEventListener('input', e => {
    state.gallerySearchQuery = e.target.value;
    renderHubs();
    attachEvents();
    const input = document.getElementById('gallerySearchInput');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });

  // Gallery Search Clear & Reset
  document.getElementById('clearGallerySearchBtn')?.addEventListener('click', () => {
    state.gallerySearchQuery = '';
    renderHubs();
    attachEvents();
  });
  document.getElementById('resetGalleryFiltersBtn')?.addEventListener('click', () => {
    state.gallerySearchQuery = '';
    state.galleryEraFilter = 'all';
    renderHubs();
    attachEvents();
  });

  // Museum View Details Modal Button
  document.querySelectorAll('.view-costume-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-costume-id');
      openCostumeModal(id);
    });
  });

  // Museum "Try this costume" shortcut
  document.querySelectorAll('.try-costume-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-costume-id');
      switchHub('hub2');
      const select = document.getElementById('selectCostume');
      if (select) {
        select.value = id;
        toggleCollarOption();
      }
    });
  });

  // Vietnam Costume Map: Province Selection Dropdown
  document.getElementById('vietnamProvinceSelect')?.addEventListener('change', e => {
    const prov = e.target.value;
    if (prov) {
      let cleanProv = prov.replace(/\(.*\)/, '').trim();
      let regId = PROVINCE_TO_REGION_MAP[prov] || PROVINCE_TO_REGION_MAP[cleanProv];
      if (!regId) {
        if (prov.includes('Hoàng Sa') || prov.includes('Trường Sa')) regId = 'hoang-sa-truong-sa';
        else if (prov.includes('Huế')) regId = 'mientrung-hue';
        else if (prov.includes('Hội An') || prov.includes('Đà Nẵng')) regId = 'namtrungbo-hoian';
        else if (prov.includes('Hà Nội')) regId = 'bac-bo';
        else if (prov.includes('Sài Gòn') || prov.includes('Hồ Chí Minh') || prov.includes('Cà Mau')) regId = 'nam-bo';
        else regId = 'bac-bo';
      }
      selectMapRegion(regId, prov);
      document.getElementById('vietnamCostumeMapSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Vietnam Costume Map: Custom Image Upload via file input
  document.getElementById('mapImageUploadInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        state.customMapImage = ev.target.result;
        try {
          localStorage.setItem('vmix_custom_map_image', state.customMapImage);
        } catch (err) {
          console.warn('LocalStorage error:', err);
        }
        renderHubs();
        attachEvents();
      };
      reader.readAsDataURL(file);
    }
  });

  // Vietnam Costume Map: Reset to default heritage map
  document.getElementById('btnResetMapImage')?.addEventListener('click', () => {
    state.customMapImage = null;
    try {
      localStorage.removeItem('vmix_custom_map_image');
    } catch (_) {}
    renderHubs();
    attachEvents();
  });

  // Vietnam Costume Map: Lightbox Full View Modal
  document.getElementById('btnViewFullMapImage')?.addEventListener('click', () => {
    state.mapFullImageModalOpen = true;
    renderModals();
    attachEvents();
  });
  document.getElementById('btnCloseFullMapModal')?.addEventListener('click', () => {
    state.mapFullImageModalOpen = false;
    renderModals();
    attachEvents();
  });

  // Vietnam Costume Map: Drag & Drop photo onto map box
  const mapContainer = document.getElementById('vietnamMapImageContainer');
  const mapDropOverlay = document.getElementById('mapDropOverlay');
  if (mapContainer && mapDropOverlay) {
    mapContainer.addEventListener('dragover', e => {
      e.preventDefault();
      e.stopPropagation();
      mapDropOverlay.classList.remove('opacity-0', 'pointer-events-none');
      mapDropOverlay.classList.add('opacity-100');
    });
    mapContainer.addEventListener('dragleave', e => {
      e.preventDefault();
      e.stopPropagation();
      mapDropOverlay.classList.remove('opacity-100');
      mapDropOverlay.classList.add('opacity-0', 'pointer-events-none');
    });
    mapContainer.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();
      mapDropOverlay.classList.remove('opacity-100');
      mapDropOverlay.classList.add('opacity-0', 'pointer-events-none');
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = ev => {
          state.customMapImage = ev.target.result;
          try {
            localStorage.setItem('vmix_custom_map_image', state.customMapImage);
          } catch (err) {
            console.warn(err);
          }
          renderHubs();
          attachEvents();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Vietnam Costume Map: Clickable Hotspots Overlaid on Image
  document.querySelectorAll('.map-img-hotspot').forEach(pin => {
    pin.addEventListener('click', e => {
      e.stopPropagation();
      const hotspotId = pin.getAttribute('data-hotspot-id');
      const regId = pin.getAttribute('data-region-id');
      const prov = pin.getAttribute('data-province');
      if (hotspotId) {
        selectProvinceHotspot(hotspotId);
      } else if (regId) {
        selectMapRegion(regId, prov);
      }
      document.getElementById('provinceSpotlightCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Toggle Map Density (All 44+ vs Key Hubs)
  document.getElementById('btnToggleMapDensity')?.addEventListener('click', e => {
    e.stopPropagation();
    state.showAllHotspotsOnMap = !state.showAllHotspotsOnMap;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Toggle Costumes Only vs All Provinces
  document.getElementById('btnToggleCostumesOnly')?.addEventListener('click', e => {
    e.stopPropagation();
    state.filterOnlyCostumeProvinces = !state.filterOnlyCostumeProvinces;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Toggle Map Pin Labels
  document.getElementById('btnToggleMapLabels')?.addEventListener('click', e => {
    e.stopPropagation();
    state.showMapPinLabels = !state.showMapPinLabels;
    heritageAudio?.playChime?.();
    renderHubs();
    attachEvents();
  });

  // Open Costume Dossier from Province Spotlight Card
  document.querySelectorAll('.btn-open-costume-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const costumeId = btn.getAttribute('data-costume-id');
      if (costumeId) {
        openCostumeModal(costumeId);
      }
    });
  });

  // Jump to V-Studio Try-on with Province Costume
  document.querySelectorAll('.btn-try-costume-studio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const costumeId = btn.getAttribute('data-costume-id');
      if (costumeId) {
        state.activeAnatomyCostumeId = costumeId;
        switchHub('hub2');
        const select = document.getElementById('selectCostume');
        if (select) {
          select.value = costumeId;
          toggleCollarOption();
          render3DAvatar();
          updateTryOnCanvas();
        }
      }
    });
  });

  // Scroll to Region Costumes button in Spotlight Card
  document.getElementById('btnScrollToRegionCostumes')?.addEventListener('click', e => {
    e.stopPropagation();
    const rightCol = document.querySelector('#vietnamCostumeMapSection .lg\\:col-span-7');
    rightCol?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Try Province Costume In V-Studio button in Spotlight Card
  document.getElementById('btnTryProvinceInStudio')?.addEventListener('click', e => {
    e.stopPropagation();
    const regId = e.currentTarget.getAttribute('data-region-id') || state.activeMapRegionId;
    const reg = VIETNAM_REGIONS_DATA.find(r => r.id === regId) || VIETNAM_REGIONS_DATA[0];
    const targetCostumeId = reg?.costumeIds?.[0] || 'ngu-than';
    state.activeAnatomyCostumeId = targetCostumeId;
    switchHub('hub2');
    const select = document.getElementById('selectCostume');
    if (select) {
      select.value = targetCostumeId;
      toggleCollarOption();
      render3DAvatar();
      updateTryOnCanvas();
    }
  });

  // Vietnam Costume Map: Region Pill Buttons
  document.querySelectorAll('.map-region-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const regId = e.currentTarget.getAttribute('data-region-id');
      if (regId) {
        selectMapRegion(regId);
        document.getElementById('vietnamCostumeMapSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Vietnam Costume Map: Clickable SVG Map Regions
  document.querySelectorAll('.vietnam-map-region').forEach(path => {
    path.addEventListener('click', e => {
      const regId = e.currentTarget.getAttribute('data-region-id');
      if (regId) {
        selectMapRegion(regId);
        document.getElementById('vietnamCostumeMapSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Vietnam Costume Map: Clickable City / Island Pins
  document.querySelectorAll('.vietnam-map-pin').forEach(pin => {
    pin.addEventListener('click', e => {
      e.stopPropagation();
      const regId = pin.getAttribute('data-region-id');
      if (regId) {
        selectMapRegion(regId);
        document.getElementById('vietnamCostumeMapSection')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Vietnam Costume Map: View Details Modal button
  document.querySelectorAll('.map-view-costume-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-costume-id');
      if (id) openCostumeModal(id);
    });
  });

  // Vietnam Costume Map: Try On in V-Studio button
  document.querySelectorAll('.map-try-costume-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = e.currentTarget.getAttribute('data-costume-id');
      if (id) {
        state.activeAnatomyCostumeId = id;
        switchHub('hub2');
        const select = document.getElementById('selectCostume');
        if (select) {
          select.value = id;
          toggleCollarOption();
        }
        document.getElementById('studioSection')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Map Filter Buttons
  document.querySelectorAll('.loc-filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      state.activeLocationFilter = e.currentTarget.getAttribute('data-filter');
      renderHubs();
      attachEvents();
    });
  });

  // Map Card Click (Changes Google Maps embed query)
  document.querySelectorAll('.map-card').forEach(card => {
    card.addEventListener('click', e => {
      const query = e.currentTarget.getAttribute('data-query');
      const iframe = document.getElementById('heritageMapIframe');
      const label = document.getElementById('activeMapLabel');
      if (iframe && query) {
        iframe.src = `https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
      }
      if (label) {
        const titleEl = e.currentTarget.querySelector('h4');
        if (titleEl) label.innerText = titleEl.innerText;
      }
    });
  });

  // Costume Visual Picker Grid Selection (Hub 2)
  document.querySelectorAll('.costume-picker-card').forEach(card => {
    card.addEventListener('click', e => {
      const costumeId = e.currentTarget.getAttribute('data-costume-id');
      const costumeName = e.currentTarget.getAttribute('data-costume-name');
      if (!costumeId) return;

      state.selectedCostumeId = costumeId;
      const hiddenInput = document.getElementById('selectCostume');
      if (hiddenInput) {
        hiddenInput.value = costumeId;
        toggleCollarOption();
      }

      const badge = document.getElementById('selectedCostumeBadge');
      if (badge) badge.textContent = costumeName || costumeId;

      // Update active card styling
      document.querySelectorAll('.costume-picker-card').forEach(c => {
        const check = c.querySelector('.costume-check-badge');
        if (c.getAttribute('data-costume-id') === costumeId) {
          c.className = 'costume-picker-card group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md border-[#8B0000] ring-2 ring-[#8B0000]/40 shadow-sm bg-rose-50/20';
          if (check) {
            check.classList.remove('hidden');
            check.classList.add('flex');
          }
        } else {
          c.className = 'costume-picker-card group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md border-stone-200 hover:border-[#D4AF37] bg-white';
          if (check) {
            check.classList.add('hidden');
            check.classList.remove('flex');
          }
        }
      });

      // Update right Lookbook visual immediately so user sees what costume they picked
      const costumeObj = COSTUMES_DATA.find(c => c.id === costumeId);
      if (costumeObj) {
        const previewImg = document.getElementById('tryOnOutputImage');
        const previewTitle = document.getElementById('lookbookImageTitle');
        const lookbookTitle = document.getElementById('lookbookTitle');
        if (previewImg && costumeObj.realPhotography?.heroPhoto) {
          previewImg.src = costumeObj.realPhotography.heroPhoto;
          previewImg.alt = costumeObj.nameVi;
        }
        if (previewTitle) previewTitle.textContent = costumeObj.nameVi;
        if (lookbookTitle) lookbookTitle.textContent = `${costumeObj.nameVi} - Sĩ Tử Kinh Kỳ 2026`;
      }
    });
  });

  // Destination Pill Buttons Selection (Hub 2)
  document.querySelectorAll('.dest-pill-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const dest = e.currentTarget.getAttribute('data-dest');
      if (!dest) return;

      state.selectedDestination = dest;
      const hiddenInput = document.getElementById('selectDest');
      if (hiddenInput) hiddenInput.value = dest;

      // Toggle active classes
      document.querySelectorAll('.dest-pill-btn').forEach(b => {
        if (b.getAttribute('data-dest') === dest) {
          b.className = 'dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs';
        } else {
          b.className = 'dest-pill-btn px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';
        }
      });
    });
  });

  // Costume Select change (shows Giao Linh collar option & Nhat Binh royal color)
  document.getElementById('selectCostume')?.addEventListener('change', toggleCollarOption);

  // Photo Upload FileReader
  document.getElementById('userPhoto')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        const url = ev.target.result;
        state.userPhotoUrl = url;
        const img = document.getElementById('previewAvatar');
        const placeholder = document.getElementById('previewAvatarPlaceholder');
        if (img) {
          img.src = url;
          img.classList.remove('hidden');
        }
        if (placeholder) {
          placeholder.classList.add('hidden');
        }
      };
      reader.readAsDataURL(file);
    }
  });

  // Season Presets (Personal Color 4 Mùa)
  document.querySelectorAll('.season-preset-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const season = e.currentTarget.getAttribute('data-season') || 'autumn';
      state.selectedUndertone = season;
      const sel = document.getElementById('selectUndertone');
      if (sel) sel.value = season;

      // Update button visual active states
      document.querySelectorAll('.season-preset-btn').forEach(b => {
        const s = b.getAttribute('data-season');
        const isActive = s === season;
        if (isActive) {
          b.className = 'season-preset-btn px-2.5 py-1.5 rounded-lg border text-left flex items-center space-x-1.5 transition-all cursor-pointer bg-[#8B0000] text-white border-[#8B0000] shadow-2xs font-bold';
        } else {
          const bgMap = {
            spring: 'bg-rose-50/70 border-rose-200 text-rose-900 hover:bg-rose-100',
            summer: 'bg-sky-50/70 border-sky-200 text-sky-900 hover:bg-sky-100',
            autumn: 'bg-amber-50/70 border-amber-200 text-amber-900 hover:bg-amber-100',
            winter: 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
          };
          b.className = `season-preset-btn px-2.5 py-1.5 rounded-lg border text-left flex items-center space-x-1.5 transition-all cursor-pointer ${bgMap[s] || 'bg-stone-50 border-stone-200'}`;
        }
      });

      // Quick sample portrait if user hasn't uploaded their own photo
      const photoMap = {
        spring: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        summer: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        autumn: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        winter: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
      };
      if (!state.userPhotoUrl || state.userPhotoUrl.startsWith('https://images.unsplash.com')) {
        const url = photoMap[season];
        state.userPhotoUrl = url;
        const img = document.getElementById('previewAvatar');
        const placeholder = document.getElementById('previewAvatarPlaceholder');
        if (img) {
          img.src = url;
          img.classList.remove('hidden');
        }
        if (placeholder) {
          placeholder.classList.add('hidden');
        }
      }
    });
  });

  // Undertone dropdown change listener
  document.getElementById('selectUndertone')?.addEventListener('change', e => {
    state.selectedUndertone = e.target.value;
    const activeBtn = document.querySelector(`.season-preset-btn[data-season="${e.target.value}"]`);
    if (activeBtn) activeBtn.click();
  });

  // Preset Avatar Model Selection
  document.querySelectorAll('.preset-avatar-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const url = e.currentTarget.getAttribute('data-url');
      if (url) {
        state.userPhotoUrl = url;
        const img = document.getElementById('previewAvatar');
        const placeholder = document.getElementById('previewAvatarPlaceholder');
        if (img) {
          img.src = url;
          img.classList.remove('hidden');
        }
        if (placeholder) {
          placeholder.classList.add('hidden');
        }
      }
    });
  });

  // Google AI Studio Live Status from Server (.env.local)
  const updateAiStudioStatusUi = async () => {
    try {
      const res = await fetch('/api/gemini/status');
      if (res.ok) {
        const data = await res.json();
        const dot = document.getElementById('geminiStatusDot');
        const text = document.getElementById('geminiStatusText');
        const studioEl = document.getElementById('geminiStatusLabel');
        if (data.hasApiKey) {
          if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
          if (text) text.innerHTML = `<span class="text-emerald-700 font-bold">🟢 Google AI Studio: Đã nhận Key (${data.maskedKey || '***'}) · Model: gemini-3.1-flash-image</span>`;
          if (studioEl) studioEl.innerText = 'Gemini 3.1 Live · Sẵn sàng sinh ảnh';
        } else {
          if (dot) dot.className = 'w-2 h-2 rounded-full bg-amber-500';
          if (text) text.innerHTML = '<span class="text-amber-700">⚠️ Chưa nhận thấy GEMINI_API_KEY trong .env.local (Hãy dán khóa & bấm Ctrl+S)</span>';
          if (studioEl) studioEl.innerText = 'Chế độ Xem Mẫu Di Sản';
        }
      }
    } catch (e) {}
  };
  updateAiStudioStatusUi();

  // Virtual Try-On Action (#btnVirtualTryOn) via gemini-3.1-flash-image
  document.getElementById('btnVirtualTryOn')?.addEventListener('click', runVirtualTryOn);

  // Analyze & Personal Color Action (#btnAnalyze)
  document.getElementById('btnAnalyze')?.addEventListener('click', runAiAnalysis);

  // Community Museum Publish
  document.getElementById('btnPublishCommunity')?.addEventListener('click', publishToCommunity);

  // Email Modal & Submission
  document.getElementById('btnOpenEmailModal')?.addEventListener('click', () => {
    document.getElementById('emailModal')?.classList.remove('hidden');
  });
  document.getElementById('closeEmailModal')?.addEventListener('click', () => {
    document.getElementById('emailModal')?.classList.add('hidden');
  });
  document.getElementById('emailForm')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('emailSuccessNotice')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('emailModal')?.classList.add('hidden');
      document.getElementById('emailSuccessNotice')?.classList.add('hidden');
    }, 2200);
  });

  // Wardrobe Modal
  document.getElementById('openWardrobeBtn')?.addEventListener('click', openWardrobeModal);
  document.getElementById('closeWardrobeModal')?.addEventListener('click', () => {
    document.getElementById('wardrobeModal')?.classList.add('hidden');
  });
  document.getElementById('btnSaveToWardrobe')?.addEventListener('click', saveCurrentToWardrobe);

  // Auth Modal
  document.getElementById('authBtn')?.addEventListener('click', () => {
    document.getElementById('authModal')?.classList.remove('hidden');
  });
  document.getElementById('closeAuthModal')?.addEventListener('click', () => {
    document.getElementById('authModal')?.classList.add('hidden');
  });
  document.getElementById('saveAuthBtn')?.addEventListener('click', () => {
    const name = document.getElementById('authNameInput')?.value || 'Guest';
    const email = document.getElementById('authEmailInput')?.value || 'guest@vietheritage.vn';
    state.user = storageHelper.setUser({ isLoggedIn: true, name, email });
    renderNavbar();
    attachEvents();
    document.getElementById('authModal')?.classList.add('hidden');
  });

  // Costume Modal Close & Backdrop Click
  document.getElementById('closeCostumeModal')?.addEventListener('click', () => {
    document.getElementById('costumeModal')?.classList.add('hidden');
  });
  document.getElementById('costumeModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });
  document.getElementById('emailModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });
  document.getElementById('wardrobeModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });
  document.getElementById('authModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });

  // Download Polaroid Card
  document.getElementById('btnDownloadPolaroid')?.addEventListener('click', downloadPolaroidCard);

  // Chatbot FAB & Drawer
  document.getElementById('fabChat')?.addEventListener('click', () => {
    state.chatOpen = true;
    renderChatbot();
    attachChatEvents();
  });
  document.getElementById('closeChatBtn')?.addEventListener('click', () => {
    state.chatOpen = false;
    renderChatbot();
    attachChatEvents();
  });

  // Re-generate Lucide icons for fresh DOM
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function attachChatEvents() {
  document.getElementById('fabChat')?.addEventListener('click', () => {
    state.chatOpen = true;
    renderChatbot();
    attachChatEvents();
  });
  document.getElementById('closeChatBtn')?.addEventListener('click', () => {
    state.chatOpen = false;
    renderChatbot();
    attachChatEvents();
  });

  // Chip Prompts
  document.querySelectorAll('.chip-prompt').forEach(btn => {
    btn.addEventListener('click', e => {
      const promptKey = e.currentTarget.getAttribute('data-prompt');
      handleChatQuery(promptKey);
    });
  });

  // Chat Form Submit
  document.getElementById('chatForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    if (input && input.value.trim()) {
      const q = input.value.trim();
      input.value = '';
      sendCustomChatMessage(q);
    }
  });

  // Simulated Voice Toggle Button
  document.getElementById('voiceToggleBtn')?.addEventListener('click', () => {
    handleVoiceSimulation();
  });
}

function updateNavbarActiveState(hub) {
  const isHub1 = hub === 'hub1';
  const isHub2 = hub === 'hub2';

  // Desktop Tab Buttons
  const btn1 = document.getElementById('navTabHub1');
  const btn2 = document.getElementById('navTabHub2');
  if (btn1) {
    btn1.className = `px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 ${isHub1 ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]' : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'}`;
    const icon1 = btn1.querySelector('i');
    if (icon1) icon1.className = `w-3.5 h-3.5 ${isHub1 ? 'text-[#D4AF37]' : 'text-stone-500'}`;
  }
  if (btn2) {
    btn2.className = `px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 ${isHub2 ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]' : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'}`;
    const icon2 = btn2.querySelector('i');
    if (icon2) icon2.className = `w-3.5 h-3.5 ${isHub2 ? 'text-[#D4AF37]' : 'text-stone-500'}`;
  }

  // Mobile Tab Buttons
  const mob1 = document.getElementById('mobTabHub1');
  const mob2 = document.getElementById('mobTabHub2');
  if (mob1) {
    mob1.className = `flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 ${isHub1 ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60' : 'text-stone-500 hover:text-stone-800'}`;
    const mobIcon1 = mob1.querySelector('i');
    if (mobIcon1) mobIcon1.className = `w-3.5 h-3.5 ${isHub1 ? 'text-[#8B0000]' : 'text-stone-400'}`;
  }
  if (mob2) {
    mob2.className = `flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 ${isHub2 ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60' : 'text-stone-500 hover:text-stone-800'}`;
    const mobIcon2 = mob2.querySelector('i');
    if (mobIcon2) mobIcon2.className = `w-3.5 h-3.5 ${isHub2 ? 'text-[#8B0000]' : 'text-stone-400'}`;
  }
}

function switchHub(hub) {
  const isSame = state.activeHub === hub;
  state.activeHub = hub;

  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    window.history.replaceState(null, '', '#' + hub);
  }

  // Immediately update navigation bar state
  updateNavbarActiveState(hub);

  const hub1 = document.getElementById('hub1Section');
  const hub2 = document.getElementById('hub2Section');

  if (hub1 && hub2) {
    if (isSame) {
      document.getElementById('hubContentAnchor')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const outgoing = hub === 'hub1' ? hub2 : hub1;
    const incoming = hub === 'hub1' ? hub1 : hub2;

    // Smooth SPA cross-fade transition
    outgoing.style.transition = 'opacity 180ms ease-out, transform 180ms ease-out';
    outgoing.style.opacity = '0';
    outgoing.style.transform = 'translateY(10px)';

    setTimeout(() => {
      outgoing.classList.add('hidden');
      outgoing.classList.remove('block');

      incoming.classList.remove('hidden');
      incoming.classList.add('block');
      incoming.style.opacity = '0';
      incoming.style.transform = 'translateY(12px)';

      // Trigger reflow for smooth animation
      void incoming.offsetHeight;

      incoming.style.transition = 'opacity 280ms ease-out, transform 280ms ease-out';
      incoming.style.opacity = '1';
      incoming.style.transform = 'translateY(0)';

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }

      if (hub === 'hub2') {
        renderCommunityShowcase();
      }

      document.getElementById('hubContentAnchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 180);
  } else {
    renderHubs();
    attachEvents();
    renderCommunityShowcase();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateAnatomyDisplay() {
  const outer = document.getElementById('outerLayer');
  const inner = document.getElementById('innerLayer');
  const mid = document.getElementById('midLayer');

  if (state.activeLayer === 'inner') {
    if (outer) outer.classList.add('hidden');
    if (mid) mid.classList.add('opacity-0');
    if (inner) {
      inner.classList.remove('opacity-15');
      inner.classList.add('opacity-100');
    }
  } else if (state.activeLayer === 'mid') {
    if (outer) outer.classList.add('hidden');
    if (inner) {
      inner.classList.add('opacity-30');
      inner.classList.remove('opacity-100');
    }
    if (mid) {
      mid.classList.remove('opacity-0', 'opacity-40');
      mid.classList.add('opacity-100', 'scale-105');
    }
  } else if (state.activeLayer === 'outer') {
    if (outer) outer.classList.remove('hidden');
    if (mid) mid.classList.add('opacity-20');
    if (inner) {
      inner.classList.add('opacity-15');
      inner.classList.remove('opacity-100');
    }
  } else {
    // 'all'
    if (outer) outer.classList.remove('hidden');
    if (mid) {
      mid.classList.remove('opacity-0', 'scale-105');
      mid.classList.add(state.flapsOpen ? 'opacity-100' : 'opacity-40');
    }
    if (inner) {
      inner.classList.remove('opacity-15');
      inner.classList.add('opacity-100');
    }
  }

  // Update button active styles
  document.querySelectorAll('.anatomy-layer-btn').forEach(btn => {
    const key = btn.getAttribute('data-layer');
    const active = state.activeLayer === key;
    btn.classList.toggle('bg-[#8B0000]', active);
    btn.classList.toggle('text-white', active);
    btn.classList.toggle('font-bold', active);
    btn.classList.toggle('shadow-xs', active);
    btn.classList.toggle('text-stone-600', !active);
  });
}

function selectHotspot(num) {
  state.activeHotspot = num;
  const activeKey = state.activeAnatomyCostumeId || 'ngu-than';
  const preset = ANATOMY_PRESETS[activeKey] || ANATOMY_PRESETS['ngu-than'];
  const hotspot = preset.hotspots.find(h => h.id === num) || preset.hotspots[0];
  const isEn = state.lang === 'en';

  const badge = document.getElementById('hotspotBadge');
  const title = document.getElementById('hotspotTitle');
  const content = document.getElementById('hotspotContent');
  const phil = document.getElementById('hotspotPhilosophy');
  const tail = document.getElementById('hotspotTailoring');

  // Highlight active trigger button
  document.querySelectorAll('.hotspot-trigger').forEach(btn => {
    const active = btn.getAttribute('data-hotspot') === num;
    btn.classList.toggle('border-[#8B0000]', active);
    btn.classList.toggle('bg-rose-50/50', active);
  });

  // Highlight active hotspot pin
  document.querySelectorAll('.hotspot').forEach(pin => {
    const active = pin.getAttribute('data-hotspot') === num;
    pin.classList.toggle('ring-4', active);
    pin.classList.toggle('ring-[#8B0000]/40', active);
    pin.classList.toggle('scale-115', active);
    pin.classList.toggle('animate-bounce', active);
    pin.classList.toggle('animate-pulse', !active);
  });

  if (badge) badge.innerText = isEn ? hotspot.badgeEn : hotspot.badgeVi;
  if (title) title.innerText = isEn ? hotspot.titleEn : hotspot.titleVi;
  if (content) content.innerText = isEn ? hotspot.contentEn : hotspot.contentVi;
  if (phil) phil.innerText = isEn ? hotspot.philosophyEn : hotspot.philosophyVi;
  if (tail) tail.innerText = isEn ? hotspot.tailoringEn : hotspot.tailoringVi;
}

function toggleCollarOption() {
  const selectCostume = document.getElementById('selectCostume');
  const collarContainer = document.getElementById('collarSelectContainer');
  const colorContainer = document.getElementById('colorSelectContainer');
  if (selectCostume) {
    if (collarContainer) {
      if (selectCostume.value === 'giao-linh') {
        collarContainer.classList.remove('hidden');
      } else {
        collarContainer.classList.add('hidden');
      }
    }
    if (colorContainer) {
      if (selectCostume.value === 'nhat-binh') {
        colorContainer.classList.remove('hidden');
      } else {
        colorContainer.classList.add('hidden');
      }
    }

    // Live update Lookbook Preview Card with selected costume's realistic photograph
    const visualEl = document.getElementById('lookbookCostumeVisual');
    if (visualEl && !state.userPhotoUrl) {
      const costumeId = selectCostume.value || 'ngu-than';
      const cObj = COSTUMES_DATA.find(c => c.id === costumeId) || COSTUMES_DATA[0];
      visualEl.innerHTML = `
        <div class="relative w-full h-full rounded overflow-hidden flex items-center justify-center bg-stone-900 group">
          <img src="${cObj.realPhotography?.heroPhoto}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${cObj.nameVi}">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
          <div class="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white pointer-events-none">
            <span class="truncate max-w-[105px] text-[#D4AF37] font-semibold">${cObj.nameVi}</span>
            <span class="px-1.5 py-0.5 rounded bg-[#8B0000] text-[8px] uppercase tracking-wider font-bold">4K Thật</span>
          </div>
        </div>
      `;
      const titleEl = document.getElementById('lookbookTitle');
      if (titleEl) {
        titleEl.innerText = `${cObj.nameVi} · Phối Đồ Di Sản 2026`;
      }
    }
  }
}

function openLightbox(photoData) {
  state.activeLightboxPhoto = photoData;
  let lb = document.getElementById('heritageLightboxModal');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'heritageLightboxModal';
    document.body.appendChild(lb);
  }
  lb.innerHTML = `
    <div class="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      <!-- Top Bar -->
      <div class="flex items-center justify-between text-white border-b border-stone-800 pb-3">
        <div class="flex items-center space-x-2.5">
          <span class="px-2.5 py-0.5 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/50 shadow-xs">
            ✦ 4K ARCHIVE
          </span>
          <h4 class="font-serif text-sm sm:text-base font-bold text-white truncate max-w-md">
            ${photoData.title || 'Tư Liệu Ảnh Cổ Phục Thực Tế'}
          </h4>
        </div>
        <button id="closeLightboxBtn" class="p-2 rounded-full bg-stone-800 hover:bg-[#8B0000] text-stone-300 hover:text-white transition-all cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Main Photo Area -->
      <div class="flex-1 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden group select-none">
        <img 
          id="lightboxMainImg" 
          src="${photoData.url}" 
          alt="${photoData.title || 'Heritage Photo'}" 
          referrerPolicy="no-referrer"
          class="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl transition-transform duration-200"
          style="transform: scale(1);"
        />
      </div>

      <!-- Bottom Caption Bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between bg-stone-900/90 rounded-xl p-3.5 border border-stone-800 text-white text-xs font-mono gap-3 shadow-lg">
        <div class="flex items-center space-x-2 text-stone-300 truncate max-w-xl">
          <span class="text-[#D4AF37] font-bold shrink-0">📍 ${photoData.location || 'Di tích lịch sử'}</span>
          <span class="text-stone-500">•</span>
          <span class="truncate">${photoData.desc || 'Tư liệu đối chiếu di sản thực tế ngoài đời sống'}</span>
        </div>
        <div class="flex items-center space-x-2 shrink-0">
          <button id="lightboxZoomInBtn" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-[#D4AF37] transition-colors cursor-pointer text-xs font-bold" title="Phóng to">🔍 +</button>
          <button id="lightboxZoomOutBtn" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-[#D4AF37] transition-colors cursor-pointer text-xs font-bold" title="Thu nhỏ">🔍 -</button>
          <button id="lightboxZoomResetBtn" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-[#D4AF37] transition-colors cursor-pointer text-xs" title="Khôi phục cỡ chuẩn">Reset</button>
        </div>
      </div>
    </div>
  `;

  let currentZoom = 1;
  const img = document.getElementById('lightboxMainImg');
  document.getElementById('lightboxZoomInBtn')?.addEventListener('click', () => {
    currentZoom = Math.min(currentZoom + 0.35, 3.5);
    if (img) img.style.transform = `scale(${currentZoom})`;
  });
  document.getElementById('lightboxZoomOutBtn')?.addEventListener('click', () => {
    currentZoom = Math.max(currentZoom - 0.35, 0.6);
    if (img) img.style.transform = `scale(${currentZoom})`;
  });
  document.getElementById('lightboxZoomResetBtn')?.addEventListener('click', () => {
    currentZoom = 1;
    if (img) img.style.transform = `scale(1)`;
  });
  document.getElementById('closeLightboxBtn')?.addEventListener('click', () => {
    lb.remove();
  });
}

function openCostumeModal(costumeId, activeTab = 'history') {
  state.activeCostumeModalId = costumeId;
  state.costumeModalTab = activeTab;
  const costume = COSTUMES_DATA.find(c => c.id === costumeId) || COSTUMES_DATA[0];
  const isEn = state.lang === 'en';
  const body = document.getElementById('costumeModalBody');
  if (!body) return;

  const tab = state.costumeModalTab || 'history';

  body.innerHTML = `
    <!-- Modal Header with Title & Prominent Language Toggle (EN/VI) -->
    <div class="flex flex-col sm:flex-row sm:items-start justify-between border-b border-stone-200 pb-4 mb-5 gap-3">
      <div>
        <div class="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1">
          <span>✦ ${isEn ? 'Historical Costume Dossier' : 'Hồ Sơ Cổ Phục Chuẩn Sử'}</span>
          <span>· ${costume.form}</span>
        </div>
        <h3 class="font-serif text-2xl md:text-3xl font-bold text-[#222222]">
          ${isEn ? costume.nameEn : costume.nameVi}
        </h3>
        <p class="text-xs text-stone-500 font-mono mt-0.5">
          ${isEn ? 'Imperial Era:' : 'Niên Đại Lịch Sử:'} <strong class="text-[#8B0000]">${costume.era}</strong>
        </p>
      </div>

      <!-- Bilingual Language Toggle (EN / VI) -->
      <div class="flex items-center space-x-1 p-1 bg-[#F5F1E8] rounded-xl border border-[#D4AF37]/60 shadow-xs shrink-0 self-start">
        <button 
          id="modalLangViBtn" 
          class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${!isEn ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
          title="Xem bằng Tiếng Việt"
        >
          🇻🇳 Tiếng Việt
        </button>
        <button 
          id="modalLangEnBtn" 
          class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${isEn ? 'bg-[#8B0000] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}"
          title="View in English"
        >
          🇬🇧 English
        </button>
      </div>
    </div>

    <!-- PRIMARY HISTORICAL DATA HIGHLIGHT PILLARS (Fabric, Era, Symbolism) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <!-- 1. ERA & DYNASTY -->
      <div class="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-2xs">
        <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1.5">
          <span>🏛️</span>
          <span>${isEn ? 'Era & Dynasty' : 'Niên Đại Lịch Sử'}</span>
        </div>
        <div class="text-sm font-serif font-bold text-[#222222] mb-1">
          ${costume.era}
        </div>
        <div class="text-[11px] text-stone-600 font-mono leading-relaxed">
          ${isEn ? 'Sartorial decrees & royal etiquette standardized for national identity.' : 'Sắc lệnh điển chế y phục quốc gia xác lập bản sắc văn hiến Đại Việt.'}
        </div>
      </div>

      <!-- 2. FABRIC & TEXTILES -->
      <div class="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-2xs">
        <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-800 uppercase mb-1.5">
          <span>🧵</span>
          <span>${isEn ? 'Fabric & Weaving' : 'Chất Liệu Dệt May'}</span>
        </div>
        <div class="text-xs font-mono font-bold text-stone-900 mb-1 leading-snug">
          ${isEn ? costume.fabricsEn : costume.fabricsVi}
        </div>
        <div class="text-[11px] text-stone-600 font-mono leading-relaxed">
          🌿 ${isEn ? 'Handwoven mulberry silk, brocade & botanical natural dyes.' : 'Tơ tằm dệt thủ công, gấm hoa, nhuộm củ nâu và lá chàm tự nhiên.'}
        </div>
      </div>

      <!-- 3. SYMBOLISM & ETHICS -->
      <div class="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-2xs">
        <div class="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-800 uppercase mb-1.5">
          <span>⚖️</span>
          <span>${isEn ? 'Symbolism & Ethics' : 'Ý Nghĩa Biểu Tượng'}</span>
        </div>
        <div class="text-xs font-mono font-bold text-stone-900 mb-1 leading-snug">
          ${isEn ? costume.philosophyEn : costume.philosophyVi}
        </div>
        <div class="text-[11px] text-stone-600 font-mono leading-relaxed">
          📜 ${isEn ? 'Moral integrity, filial devotion & cosmic harmony encoded in stitches.' : 'Đạo đức Nho gia, lòng hiếu thuận và trật tự nhân sinh trong từng đường may.'}
        </div>
      </div>
    </div>

    <!-- Visual Artwork & Palette Card with Real Photo / Blueprint Toggle -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] rounded-2xl border border-[#D4AF37]/50 p-4 shadow-xs">
      <div class="md:col-span-5 h-64 relative rounded-xl overflow-hidden bg-stone-900 border border-[#D4AF37]/50 shadow-md flex items-center justify-center group/modalhero">
        <div id="modalHeroContainer" class="w-full h-full relative flex items-center justify-center">
          <img 
            id="modalHeroImg"
            src="${costume.realPhotography?.heroPhoto}" 
            alt="${costume.nameVi}"
            referrerPolicy="no-referrer"
            class="w-full h-full object-cover filter brightness-95 transition-transform duration-500 group-hover/modalhero:scale-105"
            onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'flex items-center justify-center text-stone-300 p-4\\'>${costume.svgIllustration}</div>';"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none"></div>

          <!-- Top Badge & Enlarge CTA -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span class="px-2 py-0.5 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[9px] font-bold border border-[#D4AF37]/60 shadow-xs">
              ✦ 4K CHÂN THỰC
            </span>
            <button 
              type="button"
              class="modal-expand-photo-btn pointer-events-auto px-2 py-1 rounded-lg bg-black/75 hover:bg-[#8B0000] text-white font-mono text-[10px] font-bold border border-[#D4AF37]/50 shadow-xs transition-all hover:scale-105 flex items-center space-x-1 cursor-pointer backdrop-blur-xs"
              data-photo-url="${costume.realPhotography?.heroPhoto}"
              data-photo-title="${costume.nameVi}"
              data-photo-location="${costume.realPhotography?.locationVi}"
              data-photo-desc="${costume.realPhotography?.photoTitleVi}"
              title="${isEn ? 'Full-screen 4K Lightbox' : 'Xem ảnh kích thước lớn 4K'}"
            >
              <span>🔍</span>
              <span>${isEn ? 'Enlarge' : 'Phóng To 4K'}</span>
            </button>
          </div>

          <!-- Bottom Location Tag & Blueprint Toggle Button -->
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono z-10">
            <span class="truncate flex items-center space-x-1 max-w-[160px]">
              <i data-lucide="map-pin" class="w-3 h-3 text-[#D4AF37] shrink-0"></i>
              <span class="text-stone-200 font-serif font-semibold truncate">${isEn ? costume.realPhotography?.locationEn : costume.realPhotography?.locationVi}</span>
            </span>
            <button 
              type="button" 
              class="modal-toggle-blueprint-btn px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 text-white border border-white/40 text-[9px] font-mono font-bold transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
              data-costume-id="${costume.id}"
              title="${isEn ? 'Toggle Blueprint / Real Photo' : 'Chuyển đổi Bản vẽ vector / Ảnh thật'}"
            >
              🔄 <span id="modalToggleBlueprintText">${isEn ? 'View Vector' : 'Xem Bản Vẽ'}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="md:col-span-7 space-y-2.5 text-xs font-sans">
        <p class="font-serif text-sm italic text-stone-800 leading-relaxed font-semibold">
          "${isEn ? costume.shortDescEn : costume.shortDescVi}"
        </p>
        <div class="p-3 rounded-xl bg-white/85 border border-stone-200 space-y-2 font-mono text-[11px]">
          <div>🏷️ <strong>${isEn ? 'Silhouette Form:' : 'Phom Dáng:'}</strong> ${costume.form}</div>
          <div class="flex items-center space-x-2">
            <span>🎨 <strong>${isEn ? 'Classic Colors:' : 'Màu Sắc Kinh Điển:'}</strong></span>
            <div class="inline-flex space-x-1.5">
              ${costume.colors.map(col => `<span class="inline-block w-4 h-4 rounded-full border border-stone-300 shadow-2xs" style="background-color: ${col}" title="${col}"></span>`).join('')}
            </div>
          </div>
          <div>🎥 <strong>${isEn ? 'Archival Documentation:' : 'Tư Liệu Phục Dựng:'}</strong> ${isEn ? 'YouTube 4K & Museum Artifacts Certified' : 'Có video tư liệu & hiện vật bảo tàng đối chiếu'}</div>
        </div>
      </div>
    </div>

    <!-- In-Depth 6-Tab Navigation Bar Inside Modal -->
    <div class="flex items-center space-x-1 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto mb-4">
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'history' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="history">
        📜 ${isEn ? 'History & Decrees' : 'Biên Niên Sử & Điển Lệ'}
      </button>
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'realphotos' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="realphotos">
        📸 ${isEn ? 'Real-Life Photos & Lookbook' : 'Ảnh Chụp Ngoài Đời Thực'}
      </button>
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'textiles' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="textiles">
        🧵 ${isEn ? 'Textiles & Dyes' : 'Kỹ Thuật Dệt & Nhuộm'}
      </button>
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'philosophy' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="philosophy">
        ⚖️ ${isEn ? 'Confucian Symbolism' : 'Triết Lý Biểu Tượng'}
      </button>
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'anatomy' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="anatomy">
        ✂️ ${isEn ? 'Anatomy (2D)' : 'Giải Phẫu Cấu Trúc 2D'}
      </button>
      <button class="modal-tab-btn flex-1 py-1.5 px-2.5 text-center text-xs font-mono rounded-lg transition-all ${tab === 'genz' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'}" data-tab="genz">
        ✨ ${isEn ? 'Gen Z Styling' : 'Phối Đồ Gen Z'}
      </button>
    </div>

    <!-- Tab Dynamic In-Depth Content -->
    <div class="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 min-h-[140px] text-xs leading-relaxed text-stone-700">
      ${renderModalTabContent(costume, tab, isEn)}
    </div>

    <!-- Modal CTAs -->
    <div class="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
      <button id="modalCloseFooterBtn" class="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-600 hover:bg-stone-100 transition-colors">
        ${isEn ? 'Close' : 'Đóng'}
      </button>
      
      <div class="flex items-center space-x-2 flex-wrap gap-2">
        <button id="modalBtnAnatomy" class="px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/40 text-xs font-mono font-bold transition-all shadow-2xs hover:scale-102 flex items-center space-x-1.5">
          <i data-lucide="scissors" class="w-3.5 h-3.5"></i>
          <span>${isEn ? 'Deconstruct 2D Layers' : 'Bóc Tách Lớp Áo 2D'}</span>
        </button>

        <button id="modalBtnStyle" class="px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold transition-all shadow-md flex items-center space-x-1.5 hover:scale-102">
          <span>✨</span>
          <span>${isEn ? 'Style This Look in Hub 2 →' : 'Phối Đồ Với Bộ Này Tại Hub 2 →'}</span>
        </button>
      </div>
    </div>
  `;

  // Attach modal internal tab clicks
  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const nextTab = e.currentTarget.getAttribute('data-tab');
      openCostumeModal(costumeId, nextTab);
    });
  });

  // Modal bilingual toggle listeners
  document.getElementById('modalLangViBtn')?.addEventListener('click', () => {
    state.lang = 'vi';
    localStorage.setItem('vheritage_lang', 'vi');
    renderNavbar();
    openCostumeModal(costumeId, tab);
  });
  document.getElementById('modalLangEnBtn')?.addEventListener('click', () => {
    state.lang = 'en';
    localStorage.setItem('vheritage_lang', 'en');
    renderNavbar();
    openCostumeModal(costumeId, tab);
  });

  // Modal Close buttons
  document.getElementById('modalCloseFooterBtn')?.addEventListener('click', () => {
    document.getElementById('costumeModal')?.classList.add('hidden');
  });

  // Modal Shortcut: Jump to 2D Layer Anatomy
  document.getElementById('modalBtnAnatomy')?.addEventListener('click', () => {
    document.getElementById('costumeModal')?.classList.add('hidden');
    state.activeAnatomyCostumeId = costume.id;
    state.flapsOpen = false;
    state.activeLayer = 'all';
    state.activeHotspot = '1';
    renderHubs();
    attachEvents();
    document.getElementById('anatomySection')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Modal Shortcut: Jump to Hub 2 Styling
  document.getElementById('modalBtnStyle')?.addEventListener('click', () => {
    document.getElementById('costumeModal')?.classList.add('hidden');
    switchHub('hub2');
    const s = document.getElementById('selectCostume');
    if (s) {
      s.value = costume.id;
      toggleCollarOption();
    }
  });

  // Real Photography Sub-tab Buttons
  document.querySelectorAll('.modal-photo-subtab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      state.modalPhotoSubTab = e.currentTarget.getAttribute('data-subtab');
      openCostumeModal(costumeId, 'realphotos');
    });
  });

  // Real Photography Hotspots Click
  document.querySelectorAll('.realphoto-hotspot-pin').forEach(pin => {
    pin.addEventListener('click', e => {
      const hid = e.currentTarget.getAttribute('data-hotspot-id');
      if (hid) {
        state.modalActiveHotspotId = hid;
        openCostumeModal(costumeId, 'realphotos');
      }
    });
  });

  // Modal Split Range input live adjustment
  const modalSplitRange = document.querySelector('.modal-photo-split-range');
  if (modalSplitRange) {
    modalSplitRange.addEventListener('input', e => {
      const val = e.target.value;
      state.modalPhotoSplitVal = val;
      const clipped = document.getElementById('modalSplitClippedLayer');
      const divider = document.getElementById('modalSplitDivider');
      const text = document.getElementById('modalSplitPercentText');
      if (clipped) clipped.style.clipPath = `inset(0 calc(100% - ${val}%) 0 0)`;
      if (divider) divider.style.left = `${val}%`;
      if (text) text.innerText = `${val}%`;
    });
  }

  // Modal Split Preset Buttons
  document.querySelectorAll('.modal-split-preset-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const val = e.currentTarget.getAttribute('data-val');
      state.modalPhotoSplitVal = val;
      const range = document.querySelector('.modal-photo-split-range');
      if (range) range.value = val;
      const clipped = document.getElementById('modalSplitClippedLayer');
      const divider = document.getElementById('modalSplitDivider');
      const text = document.getElementById('modalSplitPercentText');
      if (clipped) clipped.style.clipPath = `inset(0 calc(100% - ${val}%) 0 0)`;
      if (divider) divider.style.left = `${val}%`;
      if (text) text.innerText = `${val}%`;
    });
  });

  // Hero Photo and Gallery Lightbox Buttons
  document.querySelectorAll('.hero-photo-expand, .gallery-photo-thumb').forEach(el => {
    el.addEventListener('click', e => {
      const url = el.getAttribute('data-photo-url');
      const title = el.getAttribute('data-photo-title');
      const location = el.getAttribute('data-photo-location');
      const desc = el.getAttribute('data-photo-desc');
      if (url) {
        openLightbox({ url, title, location, desc });
      }
    });
  });

  // Jump to map button
  document.querySelectorAll('.jump-to-map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('costumeModal')?.classList.add('hidden');
      document.getElementById('vietnamCostumeMapSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Export / Print Editorial Card
  document.querySelectorAll('.export-editorial-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardEl = document.getElementById(`editorialCardVisual_${costume.id}`);
      if (cardEl) {
        window.print();
      }
    });
  });

  // Modal Expand Photo Lightbox
  document.querySelectorAll('.modal-expand-photo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-photo-url');
      const title = btn.getAttribute('data-photo-title');
      const location = btn.getAttribute('data-photo-location');
      const desc = btn.getAttribute('data-photo-desc');
      if (url) {
        openLightbox({ url, title, location, desc });
      }
    });
  });

  // Modal Toggle Blueprint / Real Photo View
  document.querySelectorAll('.modal-toggle-blueprint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = document.getElementById('modalHeroContainer');
      if (!container) return;
      const isVector = container.getAttribute('data-is-vector') === 'true';
      if (isVector) {
        // Restore realistic photo
        container.setAttribute('data-is-vector', 'false');
        container.innerHTML = `
          <img 
            id="modalHeroImg"
            src="${costume.realPhotography?.heroPhoto}" 
            alt="${costume.nameVi}"
            referrerPolicy="no-referrer"
            class="w-full h-full object-cover filter brightness-95 transition-transform duration-500 hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none"></div>
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span class="px-2 py-0.5 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[9px] font-bold border border-[#D4AF37]/60 shadow-xs">
              ✦ 4K CHÂN THỰC
            </span>
            <button 
              type="button"
              class="modal-expand-photo-btn pointer-events-auto px-2 py-1 rounded-lg bg-black/75 hover:bg-[#8B0000] text-white font-mono text-[10px] font-bold border border-[#D4AF37]/50 shadow-xs transition-all hover:scale-105 flex items-center space-x-1 cursor-pointer backdrop-blur-xs"
              data-photo-url="${costume.realPhotography?.heroPhoto}"
              data-photo-title="${costume.nameVi}"
              data-photo-location="${costume.realPhotography?.locationVi}"
              data-photo-desc="${costume.realPhotography?.photoTitleVi}"
            >
              <span>🔍</span>
              <span>${isEn ? 'Enlarge' : 'Phóng To 4K'}</span>
            </button>
          </div>
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono z-10">
            <span class="truncate flex items-center space-x-1 max-w-[160px]">
              <i data-lucide="map-pin" class="w-3 h-3 text-[#D4AF37] shrink-0"></i>
              <span class="text-stone-200 font-serif font-semibold truncate">${isEn ? costume.realPhotography?.locationEn : costume.realPhotography?.locationVi}</span>
            </span>
            <button 
              type="button" 
              class="modal-toggle-blueprint-btn px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 text-white border border-white/40 text-[9px] font-mono font-bold transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
            >
              🔄 ${isEn ? 'View Vector' : 'Xem Bản Vẽ'}
            </button>
          </div>
        `;
      } else {
        // Show vector blueprint
        container.setAttribute('data-is-vector', 'true');
        container.innerHTML = `
          <div class="w-full h-full bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] flex items-center justify-center p-3 relative">
            <div class="w-full h-full flex items-center justify-center">
              ${costume.svgIllustration}
            </div>
            <div class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#8B0000] text-white font-mono text-[9px] font-bold shadow-xs">
              🎨 BẢN VẼ CẤU TRÚC VECTOR
            </div>
            <button 
              type="button" 
              class="modal-toggle-blueprint-btn absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white border border-[#D4AF37]/50 text-[9px] font-mono font-bold transition-all cursor-pointer shadow-xs hover:scale-105"
            >
              📸 ${isEn ? 'View Real 4K' : 'Xem Ảnh Thật 4K'}
            </button>
          </div>
        `;
      }
      // Re-bind listeners on dynamically inserted buttons
      container.querySelector('.modal-toggle-blueprint-btn')?.addEventListener('click', () => {
        btn.click();
      });
      container.querySelector('.modal-expand-photo-btn')?.addEventListener('click', () => {
        openLightbox({
          url: costume.realPhotography?.heroPhoto,
          title: costume.nameVi,
          location: costume.realPhotography?.locationVi,
          desc: costume.realPhotography?.photoTitleVi
        });
      });
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  // Refresh Lucide icons in modal
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  document.getElementById('costumeModal')?.classList.remove('hidden');
}

function renderModalTabContent(costume, tab, isEn) {
  if (tab === 'realphotos') {
    const rp = costume.realPhotography;
    if (!rp) {
      return `<div class="p-6 text-center text-stone-500 font-mono text-xs">Đang cập nhật tư liệu ảnh thực tế cho trang phục này.</div>`;
    }
    const subTab = state.modalPhotoSubTab || 'hotspots';
    const splitVal = state.modalPhotoSplitVal !== undefined ? state.modalPhotoSplitVal : 50;
    const hotspots = rp.macroHotspots || [];
    const activeHotspotId = state.modalActiveHotspotId || (hotspots[0]?.id || 'collar');
    const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || hotspots[0] || {
      titleVi: 'Chi tiết may đo', titleEn: 'Tailoring Detail',
      descVi: 'Đặc trưng trang phục ngoài đời thực', descEn: 'Real-world garment feature'
    };
    const posing = rp.posingGuide;

    return `
      <div class="space-y-5">
        <!-- Header Banner: Location, Editorial Title & Camera Notes -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-stone-900 via-[#1C1917] to-stone-900 text-white border border-[#D4AF37]/50 shadow-md gap-3">
          <div>
            <div class="flex items-center space-x-2 text-[11px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider mb-1">
              <span>📸</span>
              <span>${isEn ? 'High-Fashion Editorial Real Photography' : 'Nhiếp Ảnh Thời Trang & Di Sản Ngoài Đời Thực'}</span>
            </div>
            <h4 class="font-serif text-xl font-bold text-white">
              ${isEn ? rp.photoTitleEn : rp.photoTitleVi}
            </h4>
            <div class="flex items-center space-x-1.5 text-xs text-stone-300 mt-1 font-mono">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#D4AF37] shrink-0"></i>
              <span>${isEn ? rp.locationEn : rp.locationVi}</span>
            </div>
          </div>

          <div class="shrink-0 flex items-center space-x-2">
            <span class="px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-mono font-bold border border-[#D4AF37]/50 shadow-xs flex items-center space-x-1">
              <span>✦</span>
              <span>4K Archive Certified</span>
            </span>
          </div>
        </div>

        <!-- 4-Feature Interactive Sub-Navigation Bar -->
        <div class="flex items-center space-x-1 p-1 bg-stone-200/70 rounded-xl border border-stone-300 overflow-x-auto shadow-2xs">
          <button 
            type="button" 
            class="modal-photo-subtab-btn flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${subTab === 'hotspots' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 bg-white/80'}"
            data-subtab="hotspots"
          >
            🔍 ${isEn ? 'Tailoring Hotspots & Macro' : 'Kính Lúp & Chi Tiết May Đo'}
          </button>
          <button 
            type="button" 
            class="modal-photo-subtab-btn flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${subTab === 'split' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 bg-white/80'}"
            data-subtab="split"
          >
            ⚡ ${isEn ? 'Split Comparison Slider' : 'Kéo Trượt So Sánh Đối Chiếu'}
          </button>
          <button 
            type="button" 
            class="modal-photo-subtab-btn flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${subTab === 'posing' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 bg-white/80'}"
            data-subtab="posing"
          >
            💃 ${isEn ? 'Posing & Camera Guide' : 'Cẩm Nang Tạo Dáng Ngoài Đời'}
          </button>
          <button 
            type="button" 
            class="modal-photo-subtab-btn flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${subTab === 'card' ? 'bg-[#8B0000] text-white font-bold shadow-xs' : 'text-stone-700 hover:text-stone-900 bg-white/80'}"
            data-subtab="card"
          >
            🎴 ${isEn ? 'Editorial Card & Download' : 'Thẻ Thời Trang & Tải Về'}
          </button>
        </div>

        <!-- Dynamic Sub-Tab Content Rendering -->
        ${subTab === 'hotspots' ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <!-- Hero Real Photo Display with Interactive Hotspot Pins -->
            <div class="lg:col-span-7 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-md relative min-h-[360px] bg-stone-900 flex items-center justify-center group select-none">
              <img 
                src="${rp.heroPhoto}" 
                alt="${isEn ? rp.photoTitleEn : rp.photoTitleVi}"
                referrerPolicy="no-referrer"
                loading="lazy"
                class="w-full h-full object-cover max-h-[440px] transition-transform duration-500 group-hover:scale-103"
                onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-8 text-center text-white\\'><div class=\\'text-4xl mb-2\\'>📸</div><div class=\\'font-serif text-lg font-bold text-[#D4AF37]\\'>${rp.photoTitleVi}</div><p class=\\'text-xs text-stone-300 font-mono mt-1\\'>${rp.locationVi}</p></div>';"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
              
              <!-- Interactive Hotspot Pins rendered on Photo -->
              ${hotspots.map((pin, idx) => {
                const isSelected = pin.id === activeHotspotId;
                return `
                  <button 
                    type="button"
                    class="realphoto-hotspot-pin absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group/pin"
                    style="left: ${pin.x}%; top: ${pin.y}%;"
                    data-hotspot-id="${pin.id}"
                    title="${isEn ? pin.titleEn : pin.titleVi}"
                  >
                    <span class="relative flex h-7 w-7 items-center justify-center">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-[#8B0000]'} opacity-75"></span>
                      <span class="relative inline-flex items-center justify-center rounded-full h-6 w-6 ${isSelected ? 'bg-[#D4AF37] text-stone-900 ring-4 ring-[#8B0000]' : 'bg-[#8B0000] text-white ring-2 ring-[#D4AF37]'} text-[11px] font-mono font-bold shadow-lg">
                        0${idx + 1}
                      </span>
                    </span>
                    <span class="hidden group-hover/pin:inline-block absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/85 backdrop-blur-xs text-[#D4AF37] font-mono text-[10px] font-bold z-30 shadow-md border border-[#D4AF37]/40 pointer-events-none">
                      ${isEn ? pin.titleEn : pin.titleVi}
                    </span>
                  </button>
                `;
              }).join('')}

              <!-- Clickable button to inspect fullscreen -->
              <button 
                type="button" 
                class="hero-photo-expand absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black/90 text-white font-mono text-[10px] font-bold border border-white/20 transition-all flex items-center space-x-1 z-20 cursor-pointer shadow-md"
                data-photo-url="${rp.heroPhoto}"
                data-photo-title="${isEn ? rp.photoTitleEn : rp.photoTitleVi}"
                data-photo-location="${isEn ? rp.locationEn : rp.locationVi}"
                data-photo-desc="${isEn ? rp.shootingNotesEn : rp.shootingNotesVi}"
              >
                <span>🔍</span>
                <span>${isEn ? 'Fullscreen 4K' : 'Phóng To 4K'}</span>
              </button>

              <!-- Bottom metadata overlay -->
              <div class="absolute bottom-3 left-3 right-3 text-white z-10 pointer-events-none">
                <span class="inline-block px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/40 mb-1">
                  📍 ${isEn ? rp.locationEn : rp.locationVi}
                </span>
                <p class="text-xs font-serif text-white/95 drop-shadow-sm font-semibold line-clamp-2">
                  ${isEn ? rp.shootingNotesEn : rp.shootingNotesVi}
                </p>
              </div>
            </div>

            <!-- Detail Callout Drawer & Photography Aesthetics -->
            <div class="lg:col-span-5 flex flex-col justify-between space-y-3.5 p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs">
              <!-- Active Hotspot Details -->
              <div class="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 shadow-2xs">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="px-2 py-0.5 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[10px] font-bold tracking-wide">
                    ✦ ĐIỂM MAY ĐO THỰC TẾ
                  </span>
                  <span class="text-[10px] font-mono text-stone-500">Chạm vào ghim số 1-4 trên ảnh</span>
                </div>
                <h5 class="font-serif text-base font-bold text-stone-900 mb-1">
                  ${isEn ? activeHotspot.titleEn : activeHotspot.titleVi}
                </h5>
                <p class="text-xs font-sans text-stone-700 leading-relaxed">
                  ${isEn ? activeHotspot.descEn : activeHotspot.descVi}
                </p>
              </div>

              <!-- Hotspot Quick Selector Pills -->
              <div class="grid grid-cols-2 gap-1.5">
                ${hotspots.map((pin, idx) => `
                  <button 
                    type="button" 
                    class="realphoto-hotspot-pin p-2 rounded-lg text-left text-[11px] font-mono border transition-all cursor-pointer ${pin.id === activeHotspotId ? 'border-[#8B0000] bg-rose-50/80 font-bold text-[#8B0000]' : 'border-stone-200 bg-[#FAF7F2] text-stone-700 hover:border-stone-400'}"
                    data-hotspot-id="${pin.id}"
                  >
                    <span class="block text-[10px] text-stone-500">Ghim 0${idx + 1}</span>
                    <span class="truncate block">${isEn ? pin.titleEn : pin.titleVi}</span>
                  </button>
                `).join('')}
              </div>

              <!-- Photography Guide Accordion -->
              <div class="space-y-2 text-[11px] font-mono">
                <div class="p-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200">
                  <strong class="text-[#8B0000] block mb-0.5">📐 ${isEn ? 'Framing & Camera Angle:' : 'Góc Máy & Bố Cục:'}</strong>
                  <span class="text-stone-700">${isEn ? (rp.posingGuide?.cameraTipsEn || 'Eye-level or subtle low-angle.') : (rp.posingGuide?.cameraTipsVi || 'Góc chụp ngang tầm mắt hoặc low-angle nhẹ.')}</span>
                </div>
                <div class="p-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200">
                  <strong class="text-amber-800 block mb-0.5">☀️ ${isEn ? 'Lighting & Golden Hour:' : 'Ánh Sáng & Khung Giờ Vàng:'}</strong>
                  <span class="text-stone-700">${isEn ? 'Golden Hour (16:30 - 17:30); warm ambient tone.' : 'Nắng xiên chiều tà (16:30 - 17:30) hoặc sáng sớm, ánh sáng mềm tôn vinh vân vải.'}</span>
                </div>
              </div>
            </div>
          </div>
        ` : subTab === 'split' ? `
          <div class="space-y-4">
            <!-- Split Slider Instructions Banner -->
            <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div class="flex items-center space-x-2">
                <span class="text-base">⚡</span>
                <span>${isEn ? 'Drag the central slider or choose presets to compare the 2D Blueprint with the 4K Real-Life Dress.' : 'Kéo thanh trượt hoặc chọn tỷ lệ để đối chiếu trực tiếp giữa Bản vẽ Giải Phẫu và Nếp Vải Đời Thực.'}</span>
              </div>
              <!-- Quick Preset Buttons -->
              <div class="flex items-center space-x-1 shrink-0">
                <button type="button" class="modal-split-preset-btn px-2.5 py-1 rounded bg-white text-stone-800 text-[10px] font-bold border border-stone-300 hover:border-[#8B0000] cursor-pointer" data-val="25">25%</button>
                <button type="button" class="modal-split-preset-btn px-2.5 py-1 rounded bg-white text-stone-800 text-[10px] font-bold border border-stone-300 hover:border-[#8B0000] cursor-pointer" data-val="50">50%</button>
                <button type="button" class="modal-split-preset-btn px-2.5 py-1 rounded bg-white text-stone-800 text-[10px] font-bold border border-stone-300 hover:border-[#8B0000] cursor-pointer" data-val="75">75%</button>
                <button type="button" class="modal-split-preset-btn px-2.5 py-1 rounded bg-white text-stone-800 text-[10px] font-bold border border-stone-300 hover:border-[#8B0000] cursor-pointer" data-val="100">100%</button>
              </div>
            </div>

            <!-- Interactive Split Canvas Stage -->
            <div class="relative w-full h-[380px] sm:h-[430px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-xl bg-stone-900 select-none" id="modalSplitStage">
              <!-- Right Layer: 4K Real Photo -->
              <img 
                src="${rp.heroPhoto}" 
                alt="Real Photo"
                referrerPolicy="no-referrer"
                class="absolute inset-0 w-full h-full object-cover filter brightness-95 pointer-events-none"
              />
              <div class="absolute bottom-10 right-4 px-2.5 py-1 rounded-full bg-black/75 text-[#D4AF37] font-mono text-[11px] font-bold border border-[#D4AF37]/40 pointer-events-none z-10 shadow-md">
                📸 4K ẢNH CHỤP THỰC TẾ
              </div>

              <!-- Left Layer: 2D Anatomical Blueprint (Clipped) -->
              <div 
                id="modalSplitClippedLayer" 
                class="absolute inset-0 w-full h-full bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#EAE0D0] flex items-center justify-center p-6 pointer-events-none shadow-inner"
                style="clip-path: inset(0 calc(100% - ${splitVal}%) 0 0);"
              >
                <div class="w-full h-full flex items-center justify-center">
                  ${costume.svgIllustration}
                </div>
                <div class="absolute bottom-10 left-4 px-2.5 py-1 rounded-full bg-[#8B0000]/90 text-white font-mono text-[11px] font-bold border border-white/30 z-10 shadow-md">
                  🎨 BẢN VẼ GIẢI PHẪU 2D
                </div>
              </div>

              <!-- Vertical Split Divider -->
              <div 
                id="modalSplitDivider" 
                class="absolute top-0 bottom-0 w-1 bg-[#D4AF37] pointer-events-none z-20 shadow-2xl"
                style="left: ${splitVal}%;"
              >
                <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#8B0000] border-2 border-[#D4AF37] text-white flex items-center justify-center text-xs font-bold shadow-xl">
                  ⇄
                </div>
              </div>

              <!-- Floating Range Slider at bottom of Stage -->
              <div class="absolute bottom-2 left-4 right-4 z-30 flex items-center space-x-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                <span class="text-xs font-mono text-[#D4AF37] font-bold shrink-0">🎨 2D Vector</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value="${splitVal}" 
                  class="modal-photo-split-range w-full h-2 bg-stone-700 accent-[#D4AF37] rounded-lg cursor-ew-resize"
                  title="Kéo trượt đối chiếu"
                />
                <span class="text-xs font-mono text-[#D4AF37] font-bold shrink-0">📸 4K Thật</span>
                <span class="text-xs font-mono text-white font-bold w-10 text-right shrink-0" id="modalSplitPercentText">${splitVal}%</span>
              </div>
            </div>

            <!-- Educational Explanatory Callout -->
            <div class="p-3.5 rounded-xl bg-white border border-stone-200 text-xs font-mono text-stone-700 leading-relaxed shadow-2xs">
              <strong class="text-[#8B0000] block mb-1">⚖️ Đối chiếu cấu trúc học thuật & may đo thực tiễn:</strong>
              <span>Bản vẽ vector số hóa chuẩn xác tỷ lệ cổ lập lĩnh, vị trí 5 khuy nữu và đường lượn cánh cung. Khi đối chiếu với ảnh chụp thực tế ngoài đời, nếp vải tơ tằm buông rủ tự nhiên ôm trọn sống lưng mà không hề có nếp gãy nhăn nhúm, chứng minh tay nghề may giấu chỉ bậc thầy của các nghệ nhân truyền thống.</span>
            </div>
          </div>
        ` : subTab === 'posing' ? `
          <div class="space-y-4">
            <!-- Posing Masterclass Card -->
            <div class="p-5 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-sm space-y-4">
              <div class="flex items-center space-x-2 pb-3 border-b border-stone-200">
                <span class="text-2xl">💃</span>
                <div>
                  <span class="text-[10px] font-mono text-[#8B0000] uppercase font-bold tracking-wider block">Signature Heritage Pose · Tạo Dáng Di Sản</span>
                  <h4 class="font-serif text-lg font-bold text-stone-900">
                    ${isEn ? posing?.poseTitleEn : posing?.poseTitleVi}
                  </h4>
                </div>
              </div>

              <!-- Step by Step Instructions -->
              <div class="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <h5 class="text-xs font-mono font-bold text-[#8B0000] uppercase mb-1.5 flex items-center space-x-1.5">
                  <span>✦</span>
                  <span>${isEn ? 'Step-by-Step Posture Guidance:' : 'Hướng Dẫn Tư Thế Từng Bước:'}</span>
                </h5>
                <p class="text-xs font-sans text-stone-800 leading-relaxed">
                  ${isEn ? posing?.poseInstructionEn : posing?.poseInstructionVi}
                </p>
              </div>

              <!-- Camera Setup & EXIF -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <strong class="text-[#8B0000] block mb-1">📷 ${isEn ? 'Recommended Camera & Lens:' : 'Ống Kính & Thông Số Khuyên Dùng:'}</strong>
                  <span class="text-stone-700">${isEn ? posing?.cameraTipsEn : posing?.cameraTipsVi}</span>
                </div>
                <div class="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <strong class="text-amber-800 block mb-1">📿 ${isEn ? 'Matching Heritage Accessories:' : 'Phụ Kiện Đồng Hành Chuẩn Cổ Phong:'}</strong>
                  <span class="text-stone-700">${isEn ? posing?.accessoriesEn : posing?.accessoriesVi}</span>
                </div>
              </div>

              <!-- Location Coordinate Action Card -->
              <div class="p-3.5 rounded-xl bg-gradient-to-r from-stone-900 to-[#2A2421] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div>
                  <span class="text-[10px] font-mono text-[#D4AF37] font-bold block">🏛️ BỐI CẢNH NGOÀI ĐỜI THỰC ĐƯỢC ĐỀ XUẤT</span>
                  <span class="font-serif text-sm font-bold text-white">${isEn ? rp.locationEn : rp.locationVi}</span>
                </div>
                <button 
                  type="button" 
                  class="jump-to-map-btn px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#A00000] text-white text-xs font-mono font-bold border border-[#D4AF37]/50 shadow-xs cursor-pointer transition-all hover:scale-105 shrink-0 flex items-center space-x-1.5"
                  data-location="${rp.locationVi}"
                >
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                  <span>${isEn ? 'View Landmark on Heritage Map →' : 'Xem Điểm Check-in Trên Bản Đồ →'}</span>
                </button>
              </div>
            </div>
          </div>
        ` : `
          <!-- Editorial Card Postcard View -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="text-xs font-mono text-stone-600">
                ${isEn ? 'High-Fashion Editorial Postcard ready for sharing & printing.' : 'Thẻ ảnh bìa thời trang di sản cao cấp kèm triết lý và thông số máy ảnh.'}
              </div>
              <button 
                type="button" 
                class="export-editorial-card-btn px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold shadow-md cursor-pointer transition-all hover:scale-102 flex items-center space-x-1.5"
                data-costume-id="${costume.id}"
              >
                <span>🖨️</span>
                <span>${isEn ? 'Print / Save Postcard' : 'In / Lưu Thẻ Ảnh Di Sản'}</span>
              </button>
            </div>

            <!-- Editorial Card Graphic -->
            <div id="editorialCardVisual_${costume.id}" class="max-w-xl mx-auto rounded-2xl p-6 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#EFE7D8] border-2 border-[#D4AF37] shadow-xl text-stone-900 relative overflow-hidden">
              <!-- Traditional Seal watermark in background -->
              <div class="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border-4 border-[#8B0000]/15 pointer-events-none flex items-center justify-center font-serif text-[#8B0000]/20 text-5xl font-black rotate-12">
                V-MIX
              </div>

              <!-- Editorial Header -->
              <div class="flex items-center justify-between pb-3 border-b-2 border-[#8B0000] mb-4">
                <div>
                  <span class="text-[10px] font-mono text-[#8B0000] uppercase font-bold tracking-widest block">INDOCHINE EDITORIAL LOOKBOOK</span>
                  <h3 class="font-serif text-2xl font-bold text-[#8B0000] leading-snug">
                    ${isEn ? costume.nameEn : costume.nameVi}
                  </h3>
                </div>
                <div class="px-2.5 py-1 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/50">
                  ${costume.eraCategory.toUpperCase()}
                </div>
              </div>

              <!-- Hero Image with Classic Gold Inner Border -->
              <div class="rounded-xl overflow-hidden border border-[#D4AF37] shadow-md h-64 relative bg-stone-900 mb-4">
                <img 
                  src="${rp.heroPhoto}" 
                  alt="${costume.nameVi}"
                  class="w-full h-full object-cover filter brightness-95"
                />
                <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#D4AF37] font-mono text-[10px] font-bold">
                  📍 ${isEn ? rp.locationEn : rp.locationVi}
                </div>
              </div>

              <!-- Poetic / Philosophical Quote -->
              <div class="p-3 rounded-xl bg-white/80 border border-stone-200/80 mb-3.5">
                <p class="font-serif text-xs italic text-stone-800 leading-relaxed text-center font-medium">
                  "${isEn ? (rp.editorialQuoteEn || costume.philosophyEn) : (rp.editorialQuoteVi || costume.philosophyVi)}"
                </p>
              </div>

              <!-- Technical Specs Row -->
              <div class="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-stone-300 pt-3">
                <div>
                  <span class="text-stone-500 block">CHẤT LIỆU DI SẢN:</span>
                  <span class="text-stone-900 font-semibold truncate block">${isEn ? costume.fabricsEn : costume.fabricsVi}</span>
                </div>
                <div>
                  <span class="text-stone-500 block">THÔNG SỐ ỐNG KÍNH:</span>
                  <span class="text-stone-900 font-semibold truncate block">85mm f/1.8 · Golden Hour 16:30</span>
                </div>
              </div>
            </div>
          </div>
        `}

        <!-- 3-Item Real-Life Photography Showcase Gallery with Lightbox Button -->
        <div class="pt-4 border-t border-stone-200">
          <div class="flex items-center justify-between mb-3">
            <h5 class="font-serif font-bold text-base text-[#222222] flex items-center space-x-1.5">
              <span>🖼️</span>
              <span>${isEn ? 'Real-Life Macro & Archival Dossier' : 'Thư Viện Chi Tiết May Đo & Tư Liệu Đời Thực'}</span>
            </h5>
            <span class="text-[10px] font-mono text-stone-500">Chạm vào ảnh để phóng to 4K</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            ${rp.gallery.map((g, idx) => `
              <div 
                class="gallery-photo-thumb rounded-xl overflow-hidden border border-stone-200 bg-white hover:border-[#8B0000] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                data-photo-url="${g.imageUrl}"
                data-photo-title="${isEn ? g.titleEn : g.titleVi}"
                data-photo-location="${isEn ? rp.locationEn : rp.locationVi}"
                data-photo-desc="${isEn ? g.contextEn : g.contextVi}"
              >
                <div>
                  <div class="h-44 overflow-hidden relative bg-stone-900 flex items-center justify-center">
                    <img 
                      src="${g.imageUrl}" 
                      alt="${isEn ? g.titleEn : g.titleVi}"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-95"
                      onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'flex flex-col items-center justify-center text-stone-300 p-4 text-center\\'><span class=\\'text-2xl mb-1\\'>🖼️</span><span class=\\'text-xs font-mono text-[#D4AF37]\\'>${g.tagVi}</span></div>';"
                    />
                    <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#D4AF37] font-mono text-[9px] font-bold border border-[#D4AF37]/30">
                      ${isEn ? g.tagEn : g.tagVi}
                    </div>
                    <div class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <span>🔍</span>
                      <span>Zoom 4K</span>
                    </div>
                  </div>
                  <div class="p-3">
                    <h6 class="font-serif font-bold text-xs text-[#222222] group-hover:text-[#8B0000] transition-colors leading-snug mb-1">
                      ${isEn ? g.titleEn : g.titleVi}
                    </h6>
                    <p class="text-[11px] text-stone-600 font-sans leading-relaxed line-clamp-3">
                      ${isEn ? g.contextEn : g.contextVi}
                    </p>
                  </div>
                </div>
                <div class="px-3 pb-3 pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>Photo 0${idx + 1} / 03</span>
                  <span class="text-[#8B0000] font-bold flex items-center space-x-0.5">
                    <span>Phóng to</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'anatomy') {
    const ah = costume.anatomyHighlights;
    return `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-serif font-bold text-sm text-[#8B0000]">${isEn ? '2D Anatomical Structure & Master Tailoring' : 'Cấu Trúc Giải Phẫu 2D & Kỹ Thuật May Thủ Công'}</h4>
          <span class="text-[10px] font-mono text-stone-500">5 Panels · Hidden Stitches</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] font-mono">
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <strong class="text-[#8B0000] block mb-1">Thân Vải (Panels):</strong>
            <span class="text-stone-700 leading-relaxed">${isEn ? ah.panelsEn : ah.panelsVi}</span>
          </div>
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <strong class="text-[#8B0000] block mb-1">Cổ Áo (Collar):</strong>
            <span class="text-stone-700 leading-relaxed">${isEn ? ah.collarEn : ah.collarVi}</span>
          </div>
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <strong class="text-[#8B0000] block mb-1">Khuy Cài (Buttons):</strong>
            <span class="text-stone-700 leading-relaxed">${isEn ? ah.buttonsEn : ah.buttonsVi}</span>
          </div>
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
            <strong class="text-[#8B0000] block mb-1">Đường May (Seams):</strong>
            <span class="text-stone-700 leading-relaxed">${isEn ? ah.seamEn : ah.seamVi}</span>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'textiles') {
    return `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-serif font-bold text-sm text-[#8B0000]">${isEn ? 'Traditional Textiles, Mulberry Silk & Natural Dyes' : 'Chất Liệu Dệt May Tơ Tằm & Kỹ Thuật Nhuộm Thảo Mộc'}</h4>
          <span class="text-[10px] font-mono text-amber-800">100% Organic Silk</span>
        </div>
        <p class="leading-relaxed font-sans text-xs text-stone-800">${isEn ? costume.fabricsEn : costume.fabricsVi}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2 text-[11px] font-mono">
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs space-y-1">
            <div class="text-[#8B0000] font-bold">🌿 ${isEn ? 'Botanical Dye Palette:' : 'Bảng Nhuộm Thực Vật Tự Nhiên:'}</div>
            <div class="text-stone-600 leading-relaxed">${isEn ? 'Wild yam root (Cu Nau), fermented indigo leaves (La Cham), gardenia fruit (Hoang Yen), beetroot, and betel bark.' : 'Củ nâu rừng, lá chàm ngâm vôi, quả dành dành (hoàng yến), củ dền, và vỏ cau dệt tơ bóng.'}</div>
          </div>
          <div class="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs space-y-1">
            <div class="text-stone-800 font-bold">🧺 ${isEn ? 'Artisanal Care Routine:' : 'Quy Chuẩn Bảo Quản Tơ Lụa:'}</div>
            <div class="text-stone-600 leading-relaxed">${isEn ? 'Hand wash gently in cool water, dry in shaded breeze, iron at low silk temperature without spray to prevent water marks.' : 'Giặt tay nhẹ với nước mát, phơi trong bóng râm thoáng gió, ủi mặt trái ở nhiệt độ tơ tằm thấp.'}</div>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'philosophy') {
    return `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-serif font-bold text-sm text-[#8B0000]">${isEn ? 'Confucian Ethics, Filial Piety & Cosmic Order' : 'Triết Lý Biểu Tượng: Nhân Sinh Quan & Đạo Đức Nho Gia'}</h4>
          <span class="text-[10px] font-mono text-emerald-800">Five Virtues · Five Elements</span>
        </div>
        <p class="leading-relaxed font-sans text-xs text-stone-800">${isEn ? costume.philosophyEn : costume.philosophyVi}</p>
        
        <div class="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-[11px] font-mono text-amber-900 leading-relaxed space-y-1.5 shadow-2xs">
          <div class="font-bold text-[#8B0000]">📜 ${isEn ? 'Classical Sartorial Maxim:' : 'Lời Cổ Nhân Dạy Về Y Phục:'}</div>
          <div class="italic">"Y phục bất chỉ thị dĩ già thân, thực thị dĩ minh lễ nghĩa."</div>
          <div class="text-[10px] text-stone-600">${isEn ? '(Costumes do not merely protect the body; they illuminate decorum, character, and celestial harmony).' : '(Trang phục không đơn thuần che thân, mà là hiện thân sống động của lễ nghĩa, đức khiêm nhường và nhân cách con người).'}</div>
        </div>
      </div>
    `;
  } else if (tab === 'genz') {
    return `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-serif font-bold text-sm text-[#8B0000]">${isEn ? 'Gen Z Contemporary Editorial Mix & Match' : 'Gợi Ý Phối Đồ Đương Đại Cho Thế Hệ Z'}</h4>
          <span class="text-[10px] font-mono text-emerald-800">Indochine High-Fashion 2026</span>
        </div>
        <p class="leading-relaxed font-sans text-xs text-stone-800">${isEn ? costume.genzStylingEn : costume.genzStylingVi}</p>
        <div class="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-[11px] font-mono text-emerald-900 flex items-center space-x-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-700 shrink-0"></i>
          <span>${isEn ? 'Verified: 100% compliant with Cultural Guardrails and sartorial etiquette.' : 'Kiểm định: 100% tương thích với Rào Cản Văn Hóa, tôn trọng cốt lõi di sản.'}</span>
        </div>
      </div>
    `;
  } else {
    // 'history'
    return `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-serif font-bold text-sm text-[#8B0000]">${isEn ? 'Historical Origins & Imperial Statutes' : 'Lịch Sử Hình Thành, Sắc Lệnh & Điển Lệ Triều Đình'}</h4>
          <span class="text-[10px] font-mono text-stone-500">${costume.era}</span>
        </div>
        <p class="leading-relaxed font-sans text-xs text-stone-800">${isEn ? costume.detailsEn : costume.detailsVi}</p>
        <div class="p-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-[11px] font-mono text-stone-600 flex items-center justify-between">
          <span>🏛️ ${isEn ? 'Archival Source: Dai Nam Hoi Dien Su Le & Hue Imperial Archives' : 'Nguồn Sử Liệu: Khâm Định Đại Nam Hội Điển Sự Lệ & Tư liệu Bảo tàng'}</span>
          <span class="text-emerald-700 font-semibold">✓ ${isEn ? 'Verified' : 'Chuẩn Sử'}</span>
        </div>
      </div>
    `;
  }
}

// Expose switchHub globally for modal buttons
window.vheritageSwitchHub = switchHub;

// --- AI VIRTUAL TRY-ON (gemini-3.1-flash-image) ---
async function runVirtualTryOn() {
  const scanning = document.getElementById('scanningOverlay');
  const results = document.getElementById('resultContainer');
  const progressText = document.getElementById('scanningProgressText');
  const scanningSub = document.getElementById('scanningSubText');

  if (scanning && results) {
    scanning.classList.remove('hidden');
    results.classList.add('hidden');
    scanning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Get current inputs
  const costumeId = state.selectedCostumeId || document.getElementById('selectCostume')?.value || 'ngu-than';
  const costumeItem = COSTUMES_DATA.find(c => c.id === costumeId) || COSTUMES_DATA[0];
  const colorHex = document.getElementById('selectColor')?.value || '#8B0000';
  const destination = state.selectedDestination || document.getElementById('selectDest')?.value || 'hoang-thanh';

  // If user hasn't selected a photo, auto-assign sample portrait for seamless AI experience
  if (!state.userPhotoUrl) {
    state.userPhotoUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80';
    const previewImg = document.getElementById('previewAvatar');
    const placeholder = document.getElementById('previewAvatarPlaceholder');
    if (previewImg) {
      previewImg.src = state.userPhotoUrl;
      previewImg.classList.remove('hidden');
    }
    if (placeholder) {
      placeholder.classList.add('hidden');
    }
  }

  const undertoneChoice = document.getElementById('selectUndertone')?.value || state.selectedUndertone || 'autumn';
  const height = document.getElementById('inputHeight')?.value || 165;
  const weight = document.getElementById('inputWeight')?.value || 52;
  const bodyShape = document.getElementById('selectBodyShape')?.value || 'hourglass';
  const bottomChoice = document.getElementById('selectBottom')?.value || 'pant';
  const collarChoice = document.getElementById('selectCollar')?.value || 'huu-nham';

  // Rotating realistic status messages
  const steps = [
    { t: '✦ Đang phân tích diện mạo, nét mặt & thần thái từ ảnh chân dung...', s: 'Trích xuất đặc điểm nhân trắc học và cấu trúc ngũ quan người mặc...' },
    { t: '✦ Đang truyền tải dữ liệu & kết nối model gemini-3.1-flash-image...', s: 'Khởi tạo kênh truyền bảo mật tới Google AI Studio...' },
    { t: '✦ Đang dệt phom dáng cổ phục theo chuẩn Điển chế 1744...', s: `Áp dụng ${costumeItem.nameVi}, cổ lập lĩnh, 5 khuy nữu và hoa văn truyền thống...` },
    { t: '✦ Đang kết xuất ảnh Editorial Lookbook 4K siêu thực...', s: 'Khử nhiễu, phối màu ánh sáng di sản và hoàn tất bức ảnh...' }
  ];

  let stepIdx = 0;
  if (progressText) progressText.innerText = steps[0].t;
  if (scanningSub) scanningSub.innerText = steps[0].s;

  const progressTimer = setInterval(() => {
    stepIdx = (stepIdx + 1) % steps.length;
    if (progressText) progressText.innerText = steps[stepIdx].t;
    if (scanningSub) scanningSub.innerText = steps[stepIdx].s;
  }, 1400);

  // Call backend API /api/gemini/try-on
  try {
    const res = await fetch('/api/gemini/try-on', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userPhotoBase64: state.userPhotoUrl || '',
        costumeId,
        costumeName: costumeItem.nameVi,
        colorHex,
        destinationId: destination,
        gender: 'vietnamese',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      state.tryOnResultImage = data.imageUrl || null;
      state.tryOnModel = data.model || 'gemini-3.1-flash-image';
      state.tryOnNotes = data.notes || '';
      state.tryOnIsLive = Boolean(data.isLive);
      state.tryOnError = data.error || null;
    } else {
      state.tryOnIsLive = false;
      state.tryOnError = `Máy chủ trả về mã HTTP ${res.status}`;
    }
  } catch (err) {
    console.warn('Try on API call failed:', err);
    state.tryOnIsLive = false;
    state.tryOnError = String(err?.message || err);
  } finally {
    clearInterval(progressTimer);

    // Compute Personal Color and styling results
    const analysis = analyzePersonalColor({
      undertoneChoice,
      height,
      weight,
      bodyShape,
      destination,
      weather: document.getElementById('selectWeather')?.value || 'cold-18',
      costumeId,
      bottomChoice,
      collarChoice,
      colorHex
    });

    state.stylingResult = {
      costumeId,
      bottomChoice,
      collarChoice,
      colorHex,
      destination,
      ...analysis
    };

    renderStylingResults();

    if (scanning && results) {
      scanning.classList.add('hidden');
      results.classList.remove('hidden');
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// --- AI STYLING PROCESSING ---
function runAiAnalysis() {
  const scanning = document.getElementById('scanningOverlay');
  const results = document.getElementById('resultContainer');
  if (scanning && results) {
    scanning.classList.remove('hidden');
    results.classList.add('hidden');
    scanning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Get inputs
  const undertoneChoice = document.getElementById('selectUndertone')?.value || state.selectedUndertone || 'autumn';
  const height = document.getElementById('inputHeight')?.value || 165;
  const weight = document.getElementById('inputWeight')?.value || 52;
  const bodyShape = document.getElementById('selectBodyShape')?.value || 'hourglass';
  const destination = document.getElementById('selectDest')?.value || 'hoang-thanh';
  const weather = document.getElementById('selectWeather')?.value || 'cold-18';
  const costumeId = document.getElementById('selectCostume')?.value || 'ngu-than';
  const bottomChoice = document.getElementById('selectBottom')?.value || 'pant';
  const collarChoice = document.getElementById('selectCollar')?.value || 'huu-nham';
  const colorHex = document.getElementById('selectColor')?.value || '#D4AF37';

  // 1.5s simulated neural scanning animation
  setTimeout(() => {
    const analysis = analyzePersonalColor({
      undertoneChoice,
      height,
      weight,
      bodyShape,
      destination,
      weather,
      costumeId,
      bottomChoice,
      collarChoice,
      colorHex
    });

    state.stylingResult = {
      costumeId,
      bottomChoice,
      collarChoice,
      colorHex,
      destination,
      weather,
      ...analysis
    };

    renderStylingResults();

    // Call Gemini Styling API asynchronously if available
    const costumeItem = COSTUMES_DATA.find(c => c.id === costumeId);
    fetch('/api/gemini/styling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        costumeName: costumeItem ? costumeItem.nameVi : costumeId,
        season: analysis.season || 'Warm Autumn',
        undertone: undertoneChoice,
        destination,
        weather,
        colorHex,
        bodyShape
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.isLive && data.expertAdvice) {
          const descEl = document.getElementById('contextOutfitDesc');
          if (descEl) {
            descEl.innerHTML = `<span class="text-xs text-[#8B0000] font-bold block mb-1">✦ Gemini Live Styling Review:</span>${data.expertAdvice.replace(/\n/g, '<br>')}`;
          }
        }
      })
      .catch(() => {});

    if (scanning && results) {
      scanning.classList.add('hidden');
      results.classList.remove('hidden');
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1200);
}

function renderStylingResults() {
  if (!state.stylingResult) return;
  const r = state.stylingResult;
  const isEn = state.lang === 'en';

  // Lookbook Title
  const costumeObj = COSTUMES_DATA.find(c => c.id === r.costumeId) || COSTUMES_DATA[0];
  const titleEl = document.getElementById('lookbookTitle');
  if (titleEl) {
    titleEl.innerText = `${isEn ? costumeObj.nameEn : costumeObj.nameVi} · ${r.contextLookbook?.outfitTitle || 'Lookbook 2026'}`;
  }

  // Real-time Status Banner
  const bannerEl = document.getElementById('tryOnStatusBanner');
  if (bannerEl) {
    bannerEl.classList.remove('hidden');
    if (state.tryOnIsLive && state.tryOnResultImage) {
      bannerEl.innerHTML = `
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <div>
            <span class="font-bold">✨ AI Sinh Thành Công:</span> Bức ảnh được tạo lập trực tiếp từ model <strong>${state.tryOnModel || 'gemini-3.1-flash-image'}</strong> trên Google AI Studio.
          </div>
        </div>
      `;
    } else {
      bannerEl.innerHTML = `
        <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono space-y-1.5">
          <div class="flex items-center space-x-1.5 font-bold text-amber-900">
            <span>⚠️ Đang hiển thị ảnh tư liệu mẫu di sản</span>
            <span class="text-[10px] font-normal px-2 py-0.5 rounded bg-amber-200 text-amber-800">Chưa kích hoạt AI</span>
          </div>
          <p class="font-sans text-xs text-stone-700 leading-relaxed">
            ${state.tryOnError ? state.tryOnError : (state.tryOnNotes || 'Hệ thống chưa tìm thấy GEMINI_API_KEY trong file .env.local.')}
          </p>
          <div class="text-[11px] font-sans text-amber-800 pt-1 border-t border-amber-200/60">
            👉 <strong>Cách xử lý:</strong> Hãy mở file <code>.env.local</code> trên máy, dán khóa API vào dòng <code>GEMINI_API_KEY=AIzaSy...</code> và nhấn <strong>Ctrl + S</strong> để lưu file lại.
          </div>
        </div>
      `;
    }
  }

  // Visual in Editorial Showcase
  const visualEl = document.getElementById('lookbookCostumeVisual');
  const creditEl = document.getElementById('lookbookPhotoCredit');

  // Choose the best display image: AI Try-On result takes first priority ONLY if live!
  const isLiveGenerated = Boolean(state.tryOnIsLive && state.tryOnResultImage);
  const displayImage = isLiveGenerated 
    ? state.tryOnResultImage 
    : (costumeObj.realPhotography?.heroPhoto || state.userPhotoUrl);

  if (visualEl) {
    visualEl.innerHTML = `
      <div class="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-stone-900 group">
        <img 
          id="tryOnOutputImage"
          src="${displayImage}" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt="${costumeObj.nameVi}"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none"></div>
        <div class="absolute top-2.5 left-2.5 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-mono border border-white/20">
          <span class="w-2 h-2 rounded-full ${isLiveGenerated ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse"></span>
          <span id="tryOnModelBadge">${isLiveGenerated ? '✨ AI Live (gemini-3.1-flash-image)' : 'Ảnh Mẫu Di Sản (Chưa có AI)'}</span>
        </div>
        <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono text-white pointer-events-none px-1">
          <span id="lookbookImageTitle" class="truncate max-w-[180px] text-[#D4AF37] font-bold">${costumeObj.nameVi}</span>
          <span class="px-2 py-0.5 rounded ${isLiveGenerated ? 'bg-emerald-700' : 'bg-[#8B0000]'} text-[9px] uppercase tracking-wider font-bold">${isLiveGenerated ? 'AI 4K Generated' : 'Di Sản Gốc'}</span>
        </div>
      </div>
    `;
  }
  if (creditEl) {
    creditEl.innerText = isLiveGenerated 
      ? '✨ AI Virtual Try-On · gemini-3.1-flash-image' 
      : (state.tryOnError ? '⚠️ Chưa kích hoạt AI (Xem thông báo)' : 'VietHeritage Editorial');
  }

  // Personal Color
  const pcSeason = document.getElementById('personalColorSeason');
  const pcDesc = document.getElementById('personalColorDesc');
  const pcPalette = document.getElementById('personalColorPalette');
  const recCostume = document.getElementById('recommendedCostumeText');

  if (pcSeason) pcSeason.innerText = r.season;
  if (pcDesc) pcDesc.innerText = isEn ? r.descriptionEn : `${r.skinToneDesc} — ${r.descriptionVi}`;
  if (pcPalette) pcPalette.innerText = r.paletteSuggestions || 'Gam màu đất & sắc nhuộm truyền thống';
  if (recCostume) recCostume.innerText = r.recommendedCostume || costumeObj.nameVi;

  // Dyes
  const dyesContainer = document.getElementById('dyesContainer');
  if (dyesContainer && r.dyeList) {
    dyesContainer.innerHTML = r.dyeList.map(dye => `
      <div class="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-200 shadow-2xs">
        <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${dye.hex}"></span>
        <span class="text-[10px] font-mono">${isEn ? dye.nameEn : dye.nameVi}</span>
      </div>
    `).join('');
  }

  // Body advice
  const bodyAdvice = document.getElementById('bodyAdviceText');
  if (bodyAdvice) {
    bodyAdvice.innerText = `${isEn ? r.bodyAdviceEn : r.bodyAdviceVi} (BMI: ${r.bmi})`;
  }

  // Contextual Lookbook Content
  const ctxTitle = document.getElementById('contextOutfitTitle');
  const ctxDesc = document.getElementById('contextOutfitDesc');
  const ctxHairMakeup = document.getElementById('contextHairMakeup');
  const ctxAccessories = document.getElementById('contextAccessories');
  const ctxGuides = document.getElementById('contextYoutubeGuides');

  if (ctxTitle && r.contextLookbook) ctxTitle.innerText = r.contextLookbook.outfitTitle;
  if (ctxDesc && r.contextLookbook) ctxDesc.innerText = r.contextLookbook.outfitDesc;
  if (ctxHairMakeup && r.contextLookbook) {
    ctxHairMakeup.innerText = `${r.contextLookbook.hairStyle} — ${r.contextLookbook.makeupStyle}`;
  }
  if (ctxAccessories && r.contextLookbook && r.contextLookbook.accessories) {
    ctxAccessories.innerHTML = r.contextLookbook.accessories.map(acc => `
      <span class="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">${acc}</span>
    `).join('');
  }
  if (ctxGuides && r.contextLookbook && r.contextLookbook.youtubeGuides) {
    ctxGuides.innerHTML = r.contextLookbook.youtubeGuides.map(g => `
      <a href="${g.url}" target="_blank" rel="noreferrer" class="p-2.5 rounded-lg bg-white hover:bg-rose-50/50 border border-stone-200 hover:border-[#8B0000] flex items-center justify-between text-xs transition-colors group">
        <div class="flex items-center space-x-2 truncate">
          <span class="w-6 h-6 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">▶</span>
          <span class="font-sans font-medium text-stone-800 text-[11px] truncate group-hover:text-[#8B0000]">${g.title}</span>
        </div>
        <span class="text-[10px] font-mono text-stone-400 shrink-0">${g.duration} ↗</span>
      </a>
    `).join('');
  }

  // Cultural Score Gauge
  const scoreBadge = document.getElementById('respectScoreBadge');
  if (scoreBadge) {
    scoreBadge.innerText = `Cultural Score: ${r.score}%`;
    if (r.score >= 85) {
      scoreBadge.className = 'px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit';
    } else if (r.score >= 60) {
      scoreBadge.className = 'px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 w-fit';
    } else {
      scoreBadge.className = 'px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse w-fit';
    }
  }

  // Guardrail Alerts Container (With Shake Animation)
  const alertContainer = document.getElementById('guardrailAlerts');
  if (alertContainer) {
    if (r.guardrails && r.guardrails.length > 0) {
      alertContainer.classList.remove('hidden');
      alertContainer.className = 'space-y-2.5 animate-[shake_0.5s_ease-in-out]';
      alertContainer.innerHTML = r.guardrails.map(g => `
        <div class="p-3.5 rounded-xl ${g.severity === 'error' ? 'bg-red-50 border-2 border-red-300 text-red-900 shadow-sm' : 'bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-2xs'} text-xs">
          <div class="font-mono font-bold mb-1 flex items-center space-x-1.5">
            <span class="text-sm">${g.severity === 'error' ? '🛑' : '💡'}</span>
            <span class="tracking-wide">${isEn ? g.titleEn : g.titleVi}</span>
          </div>
          <p class="leading-relaxed text-[11px] font-sans">
            ${isEn ? g.messageEn : g.messageVi}
          </p>
        </div>
      `).join('');
    } else {
      alertContainer.classList.add('hidden');
      alertContainer.innerHTML = '';
    }
  }

  // Refresh icons inside result card
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function downloadPolaroidCard() {
  const costumeObj = COSTUMES_DATA.find(c => c.id === state.stylingResult?.costumeId) || COSTUMES_DATA[0];
  const season = state.stylingResult?.season || 'Mùa Thu (Autumn - Warm)';
  const author = state.user.name || 'Sứ Giả Di Sản Gen Z';
  const outfitName = state.stylingResult?.contextLookbook?.outfitTitle || costumeObj.nameVi;

  // High-resolution canvas for print-grade Polaroid photocard (640 x 920)
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background Linen Paper
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(0, 0, 640, 920);

  // Outer border & vintage golden seal frame
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 600, 880);
  ctx.strokeStyle = '#8B0000';
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, 584, 864);

  // Traditional corner decorations
  const drawCorner = (x, y) => {
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 14, 14);
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(x + 4, y + 4, 6, 6);
  };
  drawCorner(34, 34);
  drawCorner(592, 34);
  drawCorner(34, 872);
  drawCorner(592, 872);

  // Title header
  ctx.fillStyle = '#8B0000';
  ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
  ctx.fillText('THẺ SỨ GIẢ VĂN HÓA · VIETHERITAGE REMIX', 50, 64);

  ctx.fillStyle = '#222222';
  ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
  ctx.fillText(costumeObj.nameVi, 50, 98);

  ctx.fillStyle = '#666666';
  ctx.font = '13px "Be Vietnam Pro", sans-serif';
  ctx.fillText(`${season} · Niên đại: ${costumeObj.era}`, 50, 124);

  // Inner Photo Area
  ctx.fillStyle = '#ECE4D4';
  ctx.fillRect(45, 145, 550, 520);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.strokeRect(45, 145, 550, 520);

  const drawFooterAndDownload = () => {
    // Cultural Quote & Lookbook Details
    ctx.fillStyle = '#222222';
    ctx.font = 'bold 17px "Be Vietnam Pro", sans-serif';
    ctx.fillText(outfitName, 50, 705);

    ctx.fillStyle = '#8B0000';
    ctx.font = 'italic 13px "Be Vietnam Pro", sans-serif';
    ctx.fillText('“Kế thừa di sản nghìn năm · Tự hào bản sắc Việt”', 50, 735);

    ctx.fillStyle = '#555555';
    ctx.font = '12px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Sứ giả đồng sáng tạo: ${author} · Điển chế phục trang 1744-2026`, 50, 762);

    ctx.fillStyle = '#888888';
    ctx.font = '11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Ngũ Thường · Ngũ Luân · Tứ Thân Phụ Mẫu · https://vietheritage.vn', 50, 788);

    // Draw QR Code Graphic on Bottom Right
    const qx = 480, qy = 705, qsize = 110;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qx - 5, qy - 5, qsize + 10, qsize + 10);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(qx - 5, qy - 5, qsize + 10, qsize + 10);

    // QR pattern simulation
    ctx.fillStyle = '#222222';
    const matrix = [
      [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,1,0,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
      [1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1],
      [0,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,1,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1],
      [1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,1,0,1,1,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1]
    ];
    const cell = qsize / matrix.length;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] === 1) {
          ctx.fillRect(qx + c * cell, qy + r * cell, cell, cell);
        }
      }
    }
    // QR Center Seal
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(qx + qsize / 2 - 12, qy + qsize / 2 - 12, 24, 24);
    ctx.strokeStyle = '#D4AF37';
    ctx.strokeRect(qx + qsize / 2 - 12, qy + qsize / 2 - 12, 24, 24);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('V', qx + qsize / 2, qy + qsize / 2 + 4);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#888888';
    ctx.font = '9px "Be Vietnam Pro", sans-serif';
    ctx.fillText('QUÉT ĐỂ TRUY CẬP TỦ ĐỒ', qx - 2, qy + qsize + 20);

    // Trigger download
    const link = document.createElement('a');
    link.download = `The_Su_Gia_Van_Hoa_${costumeObj.id}_VMix.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const photoToUse = state.tryOnResultImage || state.userPhotoUrl;
  if (photoToUse) {
    const userImg = new Image();
    userImg.crossOrigin = 'anonymous';
    userImg.onload = () => {
      // Crop cover photo to 550x520
      const imgAspect = userImg.width / userImg.height;
      const targetAspect = 550 / 520;
      let sx = 0, sy = 0, sw = userImg.width, sh = userImg.height;
      if (imgAspect > targetAspect) {
        sw = userImg.height * targetAspect;
        sx = (userImg.width - sw) / 2;
      } else {
        sh = userImg.width / targetAspect;
        sy = (userImg.height - sh) / 2;
      }
      ctx.drawImage(userImg, sx, sy, sw, sh, 45, 145, 550, 520);

      // Gradient overlay at bottom of photo
      const grad = ctx.createLinearGradient(0, 540, 0, 665);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(45, 540, 550, 125);

      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
      ctx.fillText(costumeObj.nameVi, 65, 635);

      ctx.fillStyle = '#FAF7F2';
      ctx.font = '10px "Be Vietnam Pro", sans-serif';
      ctx.fillText(state.tryOnResultImage ? '✨ THỬ ĐỒ AI: GEMINI-3.1-FLASH-IMAGE · 4K EDITORIAL' : 'THỬ ĐỒ CỔ PHỤC · THIẾT KẾ ĐỘC BẢN', 65, 605);

      drawFooterAndDownload();
    };
    userImg.onerror = () => {
      ctx.fillStyle = '#8B0000';
      ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(costumeObj.nameVi, 320, 395);
      ctx.textAlign = 'left';
      drawFooterAndDownload();
    };
    userImg.src = photoToUse;
  } else {
    ctx.fillStyle = '#8B0000';
    ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(costumeObj.nameVi, 320, 380);
    ctx.fillStyle = '#555555';
    ctx.font = '13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(costumeObj.form, 320, 420);
    ctx.textAlign = 'left';
    drawFooterAndDownload();
  }
}

function publishToCommunity() {
  if (!state.stylingResult) {
    runAiAnalysis();
  }
  const costumeObj = COSTUMES_DATA.find(c => c.id === state.stylingResult?.costumeId) || COSTUMES_DATA[0];
  const newLook = {
    id: 'look-' + Date.now(),
    author: state.user.name,
    titleVi: `${costumeObj.nameVi} - Phong Cách Gen Z`,
    titleEn: `${costumeObj.nameEn} - Contemporary Remix`,
    costumeId: costumeObj.id,
    costumeName: costumeObj.nameVi,
    destination: 'Di sản Việt Nam',
    score: state.stylingResult?.score || 96,
    likes: 1,
    date: 'Vừa xong',
    photoUrl: state.userPhotoUrl,
    accentHex: '#8B0000',
    tags: ['#VietHeritageRemix', '#GenZCoCreation', '#HighFashion']
  };

  storageHelper.saveCommunityLook(newLook);
  renderCommunityShowcase();

  alert('✓ Bản phối của bạn đã được đưa vào Bảo Tàng Sáng Tạo Cộng Đồng!');
}

function renderCommunityShowcase() {
  const container = document.getElementById('communityGrid');
  if (!container) return;
  const looks = storageHelper.getCommunityLooks();
  const isEn = state.lang === 'en';

  container.innerHTML = looks.map(look => {
    const costume = COSTUMES_DATA.find(c => c.id === look.costumeId) || COSTUMES_DATA[0];
    return `
      <div class="bg-white rounded-2xl border border-stone-200 hover:border-[#D4AF37] p-5 shadow-xs transition-all flex flex-col justify-between">
        <div>
          <!-- Lookbook Image Artwork -->
          <div class="w-full h-52 rounded-xl bg-radial from-[#FAF7F2] to-[#ECE4D4] border border-stone-200 p-3 mb-4 flex items-center justify-center relative overflow-hidden">
            ${look.photoUrl 
              ? `<img src="${look.photoUrl}" class="w-full h-full object-cover rounded-lg">`
              : costume.svgIllustration
            }
            <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
              Score: ${look.score}%
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-stone-500 font-mono mb-1">
            <span>👤 ${look.author}</span>
            <span>${look.date}</span>
          </div>
          <h4 class="font-serif font-bold text-base text-[#222222] mb-2">
            ${isEn ? look.titleEn : look.titleVi}
          </h4>
          <div class="flex items-center space-x-1 flex-wrap gap-1 mb-4">
            ${look.tags.map(t => `<span class="text-[10px] font-mono text-[#8B0000] bg-rose-50 px-1.5 py-0.5 rounded">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Like and Remix Buttons -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
          <button class="like-btn flex items-center space-x-1 text-xs font-mono text-stone-600 hover:text-[#8B0000]" data-look-id="${look.id}">
            <span>❤️</span>
            <span class="like-count">${look.likes}</span>
          </button>
          <button class="remix-btn px-3 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/30 text-xs font-mono font-bold" data-costume-id="${look.costumeId}">
            Remix →
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach like events
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.getAttribute('data-look-id');
      const updated = storageHelper.likeCommunityLook(id);
      const target = updated.find(i => i.id === id);
      if (target) {
        const countSpan = e.currentTarget.querySelector('.like-count');
        if (countSpan) countSpan.innerText = target.likes;
      }
    });
  });

  // Attach remix events
  document.querySelectorAll('.remix-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const costumeId = e.currentTarget.getAttribute('data-costume-id');
      switchHub('hub2');
      const select = document.getElementById('selectCostume');
      if (select) {
        select.value = costumeId;
        toggleCollarOption();
      }
      runAiAnalysis();
    });
  });
}

function saveCurrentToWardrobe() {
  if (!state.stylingResult) runAiAnalysis();
  const costumeObj = COSTUMES_DATA.find(c => c.id === state.stylingResult?.costumeId) || COSTUMES_DATA[0];
  const item = {
    id: 'wardrobe-' + Date.now(),
    costumeId: costumeObj.id,
    title: costumeObj.nameVi,
    season: state.stylingResult?.season || 'Warm Autumn',
    score: state.stylingResult?.score || 98,
    date: new Date().toLocaleDateString('vi-VN')
  };
  storageHelper.saveToWardrobe(item);
  alert('✓ Đã lưu bản phối vào Tủ Đồ Di Sản Cá Nhân!');
}

function openWardrobeModal() {
  const list = storageHelper.getWardrobe();
  const container = document.getElementById('wardrobeList');
  if (container) {
    if (list.length === 0) {
      container.innerHTML = '<p class="text-xs text-stone-500 py-6 text-center">Tủ đồ di sản của bạn hiện đang trống. Hãy phối đồ tại Hub 2 và nhấn "Lưu Vào Tủ Đồ Di Sản" nhé!</p>';
    } else {
      container.innerHTML = list.map(item => `
        <div class="p-3 rounded-xl border border-stone-200 bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h5 class="font-serif font-bold text-sm text-[#222222]">${item.title}</h5>
            <span class="text-[11px] font-mono text-stone-500">${item.season} · Score: ${item.score}% · ${item.date}</span>
          </div>
          <button class="remove-wardrobe-btn text-xs text-red-600 font-mono px-2 py-1 hover:bg-red-50 rounded" data-id="${item.id}">
            Xóa
          </button>
        </div>
      `).join('');

      document.querySelectorAll('.remove-wardrobe-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.currentTarget.getAttribute('data-id');
          storageHelper.removeFromWardrobe(id);
          openWardrobeModal();
        });
      });
    }
  }
  document.getElementById('wardrobeModal')?.classList.remove('hidden');
}

// --- CHATBOT STREAMING SIMULATION ---
function handleChatQuery(promptKey) {
  const res = GEMINI_RESPONSES[promptKey];
  if (!res) return;
  const userTextMap = {
    hue: 'Tư vấn đồ đi Huế tháng 10',
    nhatbinh: 'Ý nghĩa hoa văn Áo Nhật Bình',
    nguthan: 'Phối Áo Ngũ Thân phong cách Gen Z',
    toc: 'Gợi ý kiểu tóc & trang điểm cổ phục'
  };

  state.chatMessages.push({
    sender: 'user',
    text: userTextMap[promptKey] || 'Tư vấn cổ phục',
    enText: userTextMap[promptKey] || 'Costume advice'
  });

  const thread = document.getElementById('chatMessagesThread');
  if (thread) {
    thread.innerHTML = renderChatMessages();
    thread.scrollTop = thread.scrollHeight;
  }

  // Typewriter streaming simulation for AI answer
  setTimeout(() => {
    typewriterAiResponse(res.vi, res.en);
  }, 400);
}

async function sendCustomChatMessage(q) {
  state.chatMessages.push({
    sender: 'user',
    text: q,
    enText: q
  });

  const thread = document.getElementById('chatMessagesThread');
  if (thread) {
    thread.innerHTML = renderChatMessages();
    thread.scrollTop = thread.scrollHeight;
  }

  // Temporary thinking placeholder
  const thinkingMsg = {
    sender: 'ai',
    text: '✦ Đang phân tích điển chế cổ phục & tham vấn Gemini AI...',
    enText: '✦ Consulting Gemini AI & historical records...'
  };
  state.chatMessages.push(thinkingMsg);
  if (thread) {
    thread.innerHTML = renderChatMessages();
    thread.scrollTop = thread.scrollHeight;
  }

  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q, lang: state.lang })
    });

    // Remove thinking placeholder
    const thinkIdx = state.chatMessages.indexOf(thinkingMsg);
    if (thinkIdx > -1) state.chatMessages.splice(thinkIdx, 1);

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        typewriterAiResponse(data.text, data.text);
        return;
      }
    }
    throw new Error('API unavailable');
  } catch (_e) {
    // Remove thinking message if still present
    const thinkIdx = state.chatMessages.indexOf(thinkingMsg);
    if (thinkIdx > -1) state.chatMessages.splice(thinkIdx, 1);

    // Contextual fallback response
    const isEn = state.lang === 'en';
    const aiAnswerVi = `Cảm ơn bạn đã hỏi về "${q}". Theo điển chế trang phục cung đình và nguyên tắc phối đồ đương đại:
- Hãy luôn tôn trọng cấu trúc 5 khuy áo lập lĩnh hoặc vạt chéo Hữu nhậm.
- Với tà áo ngũ thân, phối cùng kính mắt thời trang và giày sneaker tối giản sẽ tạo nên phong thái Indochine Chic đậm chất Gen Z.
- Nếu bạn cần thử đồ trực tiếp, hãy chuyển sang tab HUB 2 ngay trên thanh điều hướng nhé!`;

    const aiAnswerEn = `Thank you for asking about "${q}". Based on Vietnamese sartorial statutes:
- Always uphold the classic stand-collar 5-button rule or Huu Nham lapel.
- Pair your tunics with modern tortoiseshell frames and clean platform sneakers for an elevated Indochine Chic look.
- Jump over to HUB 2 anytime to test your lookbook directly!`;

    setTimeout(() => {
      typewriterAiResponse(aiAnswerVi, aiAnswerEn);
    }, 200);
  }
}

function typewriterAiResponse(fullVi, fullEn) {
  const isEn = state.lang === 'en';
  const fullText = isEn ? fullEn : fullVi;

  const newAiMsg = {
    sender: 'ai',
    text: '',
    enText: ''
  };
  state.chatMessages.push(newAiMsg);

  let currentIdx = 0;
  const interval = setInterval(() => {
    currentIdx += 4;
    newAiMsg.text = fullVi.slice(0, currentIdx);
    newAiMsg.enText = fullEn.slice(0, currentIdx);

    const thread = document.getElementById('chatMessagesThread');
    if (thread) {
      thread.innerHTML = renderChatMessages();
      thread.scrollTop = thread.scrollHeight;
    }

    if (currentIdx >= fullText.length) {
      clearInterval(interval);
      newAiMsg.text = fullVi;
      newAiMsg.enText = fullEn;
      if (thread) thread.innerHTML = renderChatMessages();
    }
  }, 25);
}

function handleVoiceSimulation() {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('Xin chào, tôi là trợ lý cổ phục AI của VietHeritage Remix. Hãy hỏi tôi bất kỳ điều gì về di sản trang phục Việt Nam.');
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
  handleChatQuery('hue');
}

// Initial Run (robust execution check for pre- and post-DOMContentLoaded states)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Deep linking hash listener
window.addEventListener('hashchange', () => {
  const target = window.location.hash === '#hub2' ? 'hub2' : 'hub1';
  if (state.activeHub !== target) {
    switchHub(target);
  }
});
