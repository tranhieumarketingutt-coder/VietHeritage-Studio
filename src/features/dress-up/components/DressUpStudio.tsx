import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Heart, BookOpen, Layers, Info, Check } from 'lucide-react';
import { CharacterCanvas2D } from './CharacterCanvas2D';
import { SavedLooksModal } from './SavedLooksModal';
import type { 
  DressUpState, 
  CostumeCategoryId, 
  EventFilterId, 
  RegionFilterId, 
  SavedDressUpLook 
} from '../types';
import { 
  CHARACTERS_DATA, 
  OUTFIT_ITEMS, 
  HEADWEAR_ITEMS, 
  ACCESSORY_ITEMS, 
  BOTTOM_ITEMS, 
  HAIR_ITEMS, 
  COLOR_PALETTES, 
  EVENT_FILTERS, 
  REGION_FILTERS,
  getStylingRecommendation 
} from '../data/dressUpData';

export interface DressUpStudioProps {
  lang?: 'vi' | 'en';
  onNavigateToMuseum?: () => void;
}

const STORAGE_KEY = 'vheritage_saved_dressup_looks';

export const DressUpStudio: React.FC<DressUpStudioProps> = ({
  lang = 'vi',
  onNavigateToMuseum
}) => {
  const isEn = lang === 'en';

  // 1. Unified state for current layered outfit
  const [dressUpState, setDressUpState] = useState<DressUpState>(
    CHARACTERS_DATA[0].defaultState
  );

  // 2. Navigation & filter states
  const [activeCategory, setActiveCategory] = useState<CostumeCategoryId>('outfit');
  const [selectedEvent, setSelectedEvent] = useState<EventFilterId>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilterId>('all');

  // 3. Modals and animation feedbacks
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);

  // 4. Saved looks collection in localStorage
  const [savedLooks, setSavedLooks] = useState<SavedDressUpLook[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedLooks(JSON.parse(raw));
      }
    } catch {
      // Fallback gracefully if localStorage is unavailable
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Switch character profile
  const handleSelectCharacter = (charId: 'female-01' | 'male-01') => {
    const profile = CHARACTERS_DATA.find(c => c.id === charId) || CHARACTERS_DATA[0];
    setDressUpState(profile.defaultState);
    triggerSparkle();
  };

  const triggerSparkle = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 600);
  };

  // Randomize a harmonious outfit
  const handleRandomize = () => {
    triggerSparkle();
    const isCurFemale = dressUpState.character === 'female-01';

    // Pick random outfit matching gender
    const eligibleOutfits = OUTFIT_ITEMS.filter(item => 
      item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male')
    );
    const randOutfit = eligibleOutfits[Math.floor(Math.random() * eligibleOutfits.length)];

    // Pick random color
    const randColor = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

    // Pick matching headwear (or none)
    const eligibleHeadwear = HEADWEAR_ITEMS.filter(item => 
      item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male')
    );
    const randHeadwear = Math.random() > 0.25 
      ? eligibleHeadwear[Math.floor(Math.random() * eligibleHeadwear.length)].id 
      : null;

    // Pick accessory
    const eligibleAcc = ACCESSORY_ITEMS.filter(item => 
      item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male')
    );
    const randAcc = Math.random() > 0.2
      ? eligibleAcc[Math.floor(Math.random() * eligibleAcc.length)].id
      : null;

    // Pick bottom
    const eligibleBottoms = BOTTOM_ITEMS.filter(item => 
      item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male')
    );
    const randBottom = eligibleBottoms[Math.floor(Math.random() * eligibleBottoms.length)].id;

    // Pick hair
    const eligibleHair = HAIR_ITEMS.filter(item => 
      item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male')
    );
    const randHair = eligibleHair[Math.floor(Math.random() * eligibleHair.length)].id;

    setDressUpState({
      character: dressUpState.character,
      outfitId: randOutfit.id,
      colorId: randColor.id,
      hairId: randHair,
      headwearId: randHeadwear,
      accessoryId: randAcc,
      bottomId: randBottom
    });

    showToast(isEn ? '✨ Harmonious outfit randomized!' : '✨ Đã phối ngẫu nhiên bộ đồ chuẩn sử!');
  };

  // Reset to default
  const handleReset = () => {
    const profile = CHARACTERS_DATA.find(c => c.id === dressUpState.character) || CHARACTERS_DATA[0];
    setDressUpState(profile.defaultState);
    triggerSparkle();
    showToast(isEn ? '↩ Reset to default state' : '↩ Đã đặt lại trang phục ban đầu');
  };

  // Save outfit to localStorage
  const handleSaveOutfit = () => {
    const currentOutfit = OUTFIT_ITEMS.find(o => o.id === dressUpState.outfitId);
    const currentColor = COLOR_PALETTES.find(c => c.id === dressUpState.colorId);
    const charName = dressUpState.character === 'female-01' ? 'An Nhã' : 'Minh Triết';

    const newLook: SavedDressUpLook = {
      id: `look-${Date.now()}`,
      title: `${currentOutfit?.nameVi || 'Cổ phục'} (${currentColor?.nameVi || 'Đỏ son'})`,
      createdAt: Date.now(),
      state: { ...dressUpState },
      previewSummaryVi: `${charName} diện ${currentOutfit?.nameVi}, sắc ${currentColor?.nameVi}`,
      previewSummaryEn: `${charName} in ${currentOutfit?.nameEn}, ${currentColor?.nameEn}`
    };

    const nextList = [newLook, ...savedLooks].slice(0, 30);
    setSavedLooks(nextList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    } catch {}

    showToast(isEn ? '♡ Saved outfit to your wardrobe!' : '♡ Đã lưu bộ đồ vào tủ di sản!');
  };

  const handleDeleteSavedLook = (id: string) => {
    const nextList = savedLooks.filter(l => l.id !== id);
    setSavedLooks(nextList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    } catch {}
    showToast(isEn ? 'Look deleted' : 'Đã xóa bộ đồ');
  };

  const handleApplySavedLook = (state: DressUpState) => {
    setDressUpState(state);
    triggerSparkle();
    showToast(isEn ? 'Outfit applied!' : 'Đã diện bộ đồ thành công!');
  };

  // Active items lookup
  const currentOutfit = OUTFIT_ITEMS.find(o => o.id === dressUpState.outfitId) || OUTFIT_ITEMS[0];
  const currentColor = COLOR_PALETTES.find(c => c.id === dressUpState.colorId) || COLOR_PALETTES[0];
  const currentHeadwear = HEADWEAR_ITEMS.find(h => h.id === dressUpState.headwearId);
  const currentAccessory = ACCESSORY_ITEMS.find(a => a.id === dressUpState.accessoryId);
  const currentRecommendation = getStylingRecommendation(dressUpState, lang);

  // Filter items based on active category, gender, event, and region
  const isCurFemale = dressUpState.character === 'female-01';

  let currentCategoryItems = (
    activeCategory === 'outfit' ? OUTFIT_ITEMS :
    activeCategory === 'headwear' ? HEADWEAR_ITEMS :
    activeCategory === 'accessory' ? ACCESSORY_ITEMS :
    activeCategory === 'bottom' ? BOTTOM_ITEMS :
    HAIR_ITEMS
  ).filter(item => {
    // Gender check
    const matchesGender = item.gender === 'unisex' || (isCurFemale ? item.gender === 'female' : item.gender === 'male');
    if (!matchesGender) return false;

    // Event check
    if (selectedEvent !== 'all' && !item.events.includes(selectedEvent)) {
      return false;
    }

    // Region check
    if (selectedRegion !== 'all' && item.region !== 'toan-quoc' && item.region !== selectedRegion) {
      return false;
    }

    return true;
  });

  return (
    <section 
      id="dressUpSection"
      aria-labelledby="dress-up-section-title"
      className="relative rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 shadow-xl overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#8B0000] text-white text-xs font-mono font-semibold shadow-xl border border-[#D4AF37] flex items-center space-x-2 animate-bounce"
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between border-b border-[#D4AF37]/25 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-mono font-semibold border border-[#8B0000]/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? '2D TRADITIONAL DRESS-UP STUDIO' : 'PHÒNG THAY ĐỒ CỔ PHỤC 2D'}</span>
          </div>
          <h2 id="dress-up-section-title" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#222222]">
            {isEn ? 'Traditional Costume Dress-Up' : 'Phối Trang Phục Truyền Thống 2D'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1 max-w-2xl">
            {isEn 
              ? 'Mix and match layered silhouettes, authentic natural dye palettes, and historical accessories on your representative character.'
              : 'Tự do thử sức sáng tạo, thay đổi từng lớp trang phục từ áo chính, mũ nón, phụ kiện và khám phá triết lý lịch sử sống động qua từng nếp áo.'}
          </p>
        </div>

        {/* Character Selector Pills */}
        <div className="mt-4 sm:mt-0 flex items-center justify-center sm:justify-end space-x-2 bg-[#F0ECE1] p-1.5 rounded-2xl border border-[#D4AF37]/30">
          {CHARACTERS_DATA.map(char => {
            const isSelected = dressUpState.character === char.id;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => handleSelectCharacter(char.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  isSelected
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
                }`}
                aria-pressed={isSelected}
              >
                <span>{char.gender === 'female' ? '👩' : '👨'}</span>
                <span>{isEn ? char.nameEn : char.nameVi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* =========================================================
            COLUMN 1 (Left): Category Tabs & Item Grid (lg:col-span-4)
            ========================================================= */}
        <div className="order-2 lg:order-1 lg:col-span-4 space-y-4">
          {/* Category Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center">
              <button
                type="button"
                onClick={() => setActiveCategory('outfit')}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  activeCategory === 'outfit'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="text-base">👘</span>
                <span className="text-[11px] truncate w-full">{isEn ? 'Outfits' : 'Áo Chính'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('headwear')}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  activeCategory === 'headwear'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="text-base">👑</span>
                <span className="text-[11px] truncate w-full">{isEn ? 'Headwear' : 'Mũ Nón'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('accessory')}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  activeCategory === 'accessory'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="text-base">📿</span>
                <span className="text-[11px] truncate w-full">{isEn ? 'Accessories' : 'Phụ Kiện'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('bottom')}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  activeCategory === 'bottom'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="text-base">👖</span>
                <span className="text-[11px] truncate w-full">{isEn ? 'Bottoms' : 'Quần/Váy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('hair')}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  activeCategory === 'hair'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#F5F1E8]'
                }`}
              >
                <span className="text-base">💇</span>
                <span className="text-[11px] truncate w-full">{isEn ? 'Hairstyle' : 'Kiểu Tóc'}</span>
              </button>
            </div>
          </div>

          {/* Color Palette Selector Bar (Always accessible) */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-stone-600">
              <span className="font-bold flex items-center space-x-1.5">
                <span>🎨</span>
                <span>{isEn ? 'Natural Dye Color' : 'Màu Sắc Sắc Tố'}</span>
              </span>
              <span className="text-[11px] font-semibold text-[#8B0000]">{currentColor.nameVi}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {COLOR_PALETTES.map(color => {
                const isSelected = dressUpState.colorId === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      setDressUpState(prev => ({ ...prev, colorId: color.id }));
                      triggerSparkle();
                    }}
                    className={`w-full aspect-square rounded-xl transition-all cursor-pointer relative shadow-xs flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                      isSelected ? 'ring-2 ring-[#8B0000] ring-offset-2 scale-105' : 'hover:scale-102 opacity-90 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.nameVi} (${color.traditionalNameVi})`}
                    aria-label={`Chọn màu ${color.nameVi}`}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event & Region Filters */}
          <div className="bg-[#F5F1E8] p-3 rounded-2xl border border-stone-200 space-y-2.5 text-xs font-mono">
            <div>
              <label htmlFor="event-filter" className="block text-stone-600 font-bold mb-1">
                {isEn ? 'Occasion / Event Filter:' : 'Bạn đang mặc đồ cho dịp nào?'}
              </label>
              <select
                id="event-filter"
                value={selectedEvent}
                onChange={e => setSelectedEvent(e.target.value as EventFilterId)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-800 text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
              >
                {EVENT_FILTERS.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {ev.icon} {isEn ? ev.labelEn : ev.labelVi}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="region-filter" className="block text-stone-600 font-bold mb-1">
                {isEn ? 'Regional Origin:' : 'Vùng miền văn hóa:'}
              </label>
              <select
                id="region-filter"
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value as RegionFilterId)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-stone-800 text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
              >
                {REGION_FILTERS.map(reg => (
                  <option key={reg.id} value={reg.id}>
                    {isEn ? reg.labelEn : reg.labelVi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items Selector Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-1">
              <span>{isEn ? 'Available Items' : 'Danh sách vật phẩm'} ({currentCategoryItems.length})</span>
              {(activeCategory === 'headwear' || activeCategory === 'accessory') && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeCategory === 'headwear') {
                      setDressUpState(prev => ({ ...prev, headwearId: null }));
                    } else {
                      setDressUpState(prev => ({ ...prev, accessoryId: null }));
                    }
                  }}
                  className="text-[11px] text-[#8B0000] hover:underline cursor-pointer"
                >
                  {isEn ? 'Unequip' : 'Bỏ chọn'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto p-1">
              {currentCategoryItems.map(item => {
                const isSelected = 
                  activeCategory === 'outfit' ? dressUpState.outfitId === item.id :
                  activeCategory === 'headwear' ? dressUpState.headwearId === item.id :
                  activeCategory === 'accessory' ? dressUpState.accessoryId === item.id :
                  activeCategory === 'bottom' ? dressUpState.bottomId === item.id :
                  dressUpState.hairId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (activeCategory === 'outfit') {
                        setDressUpState(prev => ({ ...prev, outfitId: item.id }));
                      } else if (activeCategory === 'headwear') {
                        setDressUpState(prev => ({ ...prev, headwearId: isSelected ? null : item.id }));
                      } else if (activeCategory === 'accessory') {
                        setDressUpState(prev => ({ ...prev, accessoryId: isSelected ? null : item.id }));
                      } else if (activeCategory === 'bottom') {
                        setDressUpState(prev => ({ ...prev, bottomId: item.id }));
                      } else {
                        setDressUpState(prev => ({ ...prev, hairId: item.id }));
                      }
                      triggerSparkle();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                      isSelected
                        ? 'bg-white border-[#8B0000] shadow-md ring-1 ring-[#8B0000]'
                        : 'bg-white/80 border-stone-200 hover:border-[#D4AF37] hover:bg-white'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-serif font-bold text-xs text-[#222222] leading-tight">
                        {isEn ? item.nameEn : item.nameVi}
                      </h4>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#8B0000] text-white text-[10px] flex items-center justify-center shrink-0">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 inline-block self-start">
                        {isEn ? item.eraEn : item.eraVi}
                      </span>
                      {item.isModern && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 inline-flex items-center space-x-0.5">
                          <span>✨</span>
                          <span>{isEn ? 'FUSION' : 'HIỆN ĐẠI'}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-sans text-stone-500 line-clamp-2">
                      {isEn ? item.shortDescEn : item.shortDescVi}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            COLUMN 2 (Center): 2D Character & Controls (lg:col-span-4)
            ========================================================= */}
        <div className="order-1 lg:order-2 lg:col-span-4 flex flex-col items-center space-y-4">
          {/* Layered 2D Canvas */}
          <CharacterCanvas2D state={dressUpState} isSparkling={isSparkling} />

          {/* Quick Action Buttons */}
          <div className="w-full max-w-[340px] grid grid-cols-3 gap-2">
            <button
              type="button"
              id="btnRandomizeOutfit"
              onClick={handleRandomize}
              className="py-2.5 px-3 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
              title={isEn ? 'Randomize harmonious outfit' : 'Phối ngẫu nhiên bộ đồ hợp chuẩn'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Random' : 'Ngẫu nhiên'}</span>
            </button>

            <button
              type="button"
              id="btnResetOutfit"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-mono font-semibold text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
              title={isEn ? 'Reset to default' : 'Đặt lại trang phục ban đầu'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset' : 'Đặt lại'}</span>
            </button>

            <button
              type="button"
              id="btnSaveOutfit"
              onClick={handleSaveOutfit}
              className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#C29E2F] text-[#4A3B05] font-mono font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
              title={isEn ? 'Save outfit' : 'Lưu bộ đồ này'}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{isEn ? 'Save' : 'Lưu đồ'}</span>
            </button>
          </div>

          {/* Open Saved Looks Wardrobe Trigger */}
          <button
            type="button"
            onClick={() => setIsSavedModalOpen(true)}
            className="w-full max-w-[340px] py-2 px-3 rounded-xl bg-white/90 hover:bg-white text-stone-700 border border-[#D4AF37]/50 text-xs font-mono flex items-center justify-between cursor-pointer transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
          >
            <span className="flex items-center space-x-1.5">
              <span>📂</span>
              <span className="font-semibold">{isEn ? 'View Saved Outfits' : 'Tủ đồ đã lưu'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-bold text-[10px]">
              {savedLooks.length}
            </span>
          </button>

          {/* Mobile view cultural info drawer trigger */}
          <button
            type="button"
            onClick={() => setIsMobileInfoOpen(prev => !prev)}
            className="lg:hidden w-full max-w-[340px] py-2 px-3 rounded-xl bg-[#F0ECE1] text-stone-800 text-xs font-mono font-semibold flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isMobileInfoOpen ? (isEn ? 'Hide Cultural Notes' : 'Đóng Thông Tin Văn Hóa') : (isEn ? 'Show Cultural Notes' : 'Xem Thông Tin Văn Hóa & Gợi Ý')}</span>
          </button>
        </div>

        {/* =========================================================
            COLUMN 3 (Right): Cultural Card & Styling Suggestions (lg:col-span-4)
            ========================================================= */}
        <div className={`order-3 lg:order-3 lg:col-span-4 space-y-4 ${isMobileInfoOpen ? 'block' : 'hidden lg:block'}`}>
          {/* Active Costume Cultural Card */}
          <div className="bg-white p-5 rounded-3xl border border-[#D4AF37]/40 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8B0000] bg-[#8B0000]/10 px-2.5 py-0.5 rounded-full">
                {isEn ? currentOutfit.eraEn : currentOutfit.eraVi}
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                {isEn ? 'Historical Record' : 'Khảo cứu sử liệu'}
              </span>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#222222]">
                {isEn ? currentOutfit.nameEn : currentOutfit.nameVi}
              </h3>
              <p className="font-sans text-xs text-stone-600 mt-1 leading-relaxed">
                {isEn ? currentOutfit.culturalNoteEn : currentOutfit.culturalNoteVi}
              </p>
            </div>

            {/* Current Combination Breakdown */}
            <div className="p-3 rounded-2xl bg-[#FBF9F5] border border-stone-200 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-stone-600">
                <span>{isEn ? 'Main Robe:' : 'Áo chính:'}</span>
                <span className="font-bold text-stone-900">{isEn ? currentOutfit.nameEn : currentOutfit.nameVi}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>{isEn ? 'Palette:' : 'Sắc màu:'}</span>
                <span className="font-bold text-[#8B0000]">{isEn ? currentColor.nameEn : currentColor.nameVi}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>{isEn ? 'Headwear:' : 'Mũ nón:'}</span>
                <span className="font-bold text-stone-900">
                  {currentHeadwear ? (isEn ? currentHeadwear.nameEn : currentHeadwear.nameVi) : (isEn ? 'None' : 'Không')}
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>{isEn ? 'Accessory:' : 'Phụ kiện:'}</span>
                <span className="font-bold text-stone-900">
                  {currentAccessory ? (isEn ? currentAccessory.nameEn : currentAccessory.nameVi) : (isEn ? 'None' : 'Không')}
                </span>
              </div>
            </div>

            {onNavigateToMuseum && (
              <button
                type="button"
                onClick={onNavigateToMuseum}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-[#FDF6E2] text-stone-800 font-mono text-xs font-semibold border border-stone-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>{isEn ? 'Explore in Heritage Museum' : 'Tìm hiểu thêm tại Bảo tàng'}</span>
              </button>
            )}
          </div>

          {/* Dynamic Styling Suggestion Card ("💡 Gợi ý cho bạn") */}
          <div className="bg-gradient-to-br from-[#FFF9EE] to-[#FAF5E8] p-5 rounded-3xl border border-[#D4AF37]/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-base">💡</span>
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#8B0000]">
                  {isEn ? 'Heritage Stylist Advice' : 'Gợi ý cho bạn'}
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                {isEn ? currentRecommendation.decorumEn : currentRecommendation.decorumVi}
              </span>
            </div>

            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {isEn ? currentRecommendation.tipEn : currentRecommendation.tipVi}
            </p>

            <div className="text-[11px] font-mono text-stone-500 pt-1 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <span>{isEn ? 'Rule Engine: Canonical Decorum' : 'Bộ quy tắc: Chuẩn mực Điển chế'}</span>
              <span>24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Looks Modal */}
      <SavedLooksModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedLooks={savedLooks}
        onApplyLook={handleApplySavedLook}
        onDeleteLook={handleDeleteSavedLook}
        lang={lang}
      />
    </section>
  );
};
