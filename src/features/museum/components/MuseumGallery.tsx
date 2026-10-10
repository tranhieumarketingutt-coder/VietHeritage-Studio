import React, { useState, useMemo } from 'react';
import { COSTUMES_DATA } from '../../../costumes';
import { CostumeCard, Costume } from './CostumeCard';
import { CostumeDetailModal } from './CostumeDetailModal';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';

/**
 * Props for MuseumGallery component.
 */
export interface MuseumGalleryProps {
  lang: 'vi' | 'en';
}

/**
 * MuseumGallery component displaying the gallery of heritage costumes.
 */
export const MuseumGallery: React.FC<MuseumGalleryProps> = ({ lang }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [globalMode, setGlobalMode] = useState<'real' | 'split' | 'svg'>('real');
  
  const [selectedCostumeId, setSelectedCostumeId] = useState<string | null>(null);
  const [lightboxPhotoUrl, setLightboxPhotoUrl] = useState<string | null>(null);
  
  const isEn = lang === 'en';

  const handleOpenModal = (id: string) => setSelectedCostumeId(id);
  const handleCloseModal = () => setSelectedCostumeId(null);
  const handleOpenLightbox = (url: string) => setLightboxPhotoUrl(url);
  const handleCloseLightbox = () => setLightboxPhotoUrl(null);

  const lightboxRef = useFocusTrap<HTMLDivElement>({
    isOpen: Boolean(lightboxPhotoUrl),
    onClose: handleCloseLightbox,
    lockScroll: true,
    closeOnEscape: true
  });
  
  const filteredCostumes = useMemo(() => {
    let list = filter === 'all' 
      ? (COSTUMES_DATA as Costume[]) 
      : (COSTUMES_DATA as Costume[]).filter(c => c.eraCategory === filter);
      
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => 
        c.nameVi.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.fabricsVi.toLowerCase().includes(q) ||
        c.fabricsEn.toLowerCase().includes(q) ||
        c.philosophyVi.toLowerCase().includes(q) ||
        c.philosophyEn.toLowerCase().includes(q) ||
        c.era.toLowerCase().includes(q) ||
        c.form.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, searchQuery]);

  return (
    <section 
      className="relative rounded-3xl bg-gradient-to-b from-[#FAF7F2]/95 via-white/90 to-[#FAF7F2]/95 border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(139,0,0,0.06),0_4px_16px_rgba(212,175,55,0.15)] p-6 sm:p-8 lg:p-10 space-y-8 backdrop-blur-md overflow-hidden" 
      id="museumGallerySection"
    >
      {/* Decorative Heritage Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B0000] rounded-tl-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8B0000] rounded-tr-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8B0000] rounded-bl-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B0000] rounded-br-2xl pointer-events-none" aria-hidden="true"></div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D4AF37]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <span className="text-[#D4AF37]">✦</span>
            <span>V-Museum Curated Gallery</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-600 font-medium">Bảo Vật Lịch Sử</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#222222] tracking-tight leading-tight">
            {isEn ? 'V-Museum Heritage Gallery' : 'Bảo Tàng Số V-Museum'}
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-2xl font-sans leading-relaxed">
            {isEn ? 'Explore the collection of digitized traditional costumes preserved across 1,000 years of Vietnamese history.' : 'Không gian trưng bày & bảo tồn số hóa phục trang truyền thống Việt Nam qua các thời kỳ lịch sử.'}
          </p>
        </div>

        <div className="space-y-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <label htmlFor="costumeSearchInput" className="sr-only">
              {isEn ? 'Search heritage costumes by fabric, era, symbolism' : 'Tìm kiếm cổ phục theo chất liệu, niên đại, triết lý'}
            </label>
            <input 
              id="costumeSearchInput"
              type="text" 
              placeholder={isEn ? 'Filter by fabric, era, symbol...' : 'Tìm theo chất liệu, niên đại, triết lý...'}
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              aria-label={isEn ? 'Search heritage costumes by fabric, era, symbolism' : 'Tìm kiếm cổ phục theo chất liệu, niên đại, triết lý'}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs font-mono text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')} 
                aria-label={isEn ? 'Clear search filter' : 'Xóa từ khóa tìm kiếm'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] cursor-pointer"
              >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto">
            <button type="button" onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${filter === 'all' ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {isEn ? 'All Costumes' : 'Tất cả'} ({COSTUMES_DATA.length})
            </button>
            <button type="button" onClick={() => setFilter('nguyen')} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${filter === 'nguyen' ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {isEn ? 'Nguyen Dynasty' : 'Triều Nguyễn'}
            </button>
            <button type="button" onClick={() => setFilter('ly-tran-le')} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${filter === 'ly-tran-le' ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {isEn ? 'Ly - Tran - Le' : 'Lý - Trần - Lê'}
            </button>
            <button type="button" onClick={() => setFilter('folk')} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${filter === 'folk' ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {isEn ? 'Folk Traditions' : 'Dân gian'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D4AF37]/60 shadow-[0_4px_12px_rgba(212,175,55,0.12)] gap-3">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse"></span>
          <span className="text-[#8B0000] font-bold tracking-wide uppercase">✦ {isEn ? 'Display Mode for Costumes:' : 'Chế Độ Trải Nghiệm Cổ Phục:'}</span>
        </div>
        <div className="flex items-center space-x-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/35 shadow-inner">
          <button 
            type="button" 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${globalMode === 'real' ? 'bg-[#8B0000] text-white shadow-md' : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'}`}
            onClick={() => setGlobalMode('real')}
          >
            📸 {isEn ? '4K Real Photos' : 'Ảnh Thật 4K'}
          </button>
          <button 
            type="button" 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${globalMode === 'svg' ? 'bg-[#8B0000] text-white shadow-md' : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'}`}
            onClick={() => setGlobalMode('svg')}
          >
            🎨 {isEn ? 'Vector Schema' : 'Bản Vẽ Đồ Họa 2D'}
          </button>
        </div>
      </div>

      {filteredCostumes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 font-mono text-xs">
          <p>{isEn ? 'No heritage costumes matched your search query.' : 'Không tìm thấy cổ phục nào khớp với từ khóa tìm kiếm.'}</p>
          <button type="button" onClick={() => {setFilter('all'); setSearchQuery('');}} className="mt-3 px-4 py-1.5 rounded-lg bg-[#8B0000] text-white font-mono text-xs font-bold hover:bg-[#700000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] cursor-pointer">
            {isEn ? 'Reset Filters' : 'Đặt Lại Bộ Lọc'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCostumes.map(c => (
            <CostumeCard 
              key={c.id} 
              costume={c} 
              globalMode={globalMode} 
              lang={lang} 
              onOpenModal={handleOpenModal} 
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      )}

      {selectedCostumeId && (
        <CostumeDetailModal 
          costumeId={selectedCostumeId} 
          lang={lang} 
          onClose={handleCloseModal} 
          onOpenLightbox={handleOpenLightbox}
        />
      )}

      {lightboxPhotoUrl && (() => {
        const activeCostumeWithPhoto = (COSTUMES_DATA as Costume[]).find(c => 
          c.realPhotography?.heroPhoto === lightboxPhotoUrl || 
          c.realPhotography?.frontPhoto === lightboxPhotoUrl || 
          c.realPhotography?.backPhoto === lightboxPhotoUrl
        );

        return (
          <div 
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={isEn ? "Enlarged 4K costume photography" : "Ảnh phóng to cổ phục 4K"}
            tabIndex={-1}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-scroll lightbox-scroll-area flex flex-col items-center outline-none" 
            onClick={handleCloseLightbox}
          >
            {/* Thanh điều khiển cố định ở trên cùng */}
            <header 
              className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/80 to-transparent px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between pointer-events-none"
            >
              <div 
                className="flex items-center space-x-3 pointer-events-auto" 
                onClick={e => e.stopPropagation()}
              >
                {activeCostumeWithPhoto && (
                  <div className="text-white">
                    <div className="font-serif font-bold text-base sm:text-xl text-[#D4AF37] drop-shadow-md">
                      {isEn ? activeCostumeWithPhoto.nameEn : activeCostumeWithPhoto.nameVi}
                    </div>
                    <div className="text-xs text-stone-300 font-mono">
                      {activeCostumeWithPhoto.era}
                    </div>
                  </div>
                )}
              </div>

              {/* Bộ chuyển đổi Mặt Trước / Mặt Sau */}
              {activeCostumeWithPhoto?.realPhotography?.backPhoto && (
                <div 
                  className="pointer-events-auto flex items-center bg-stone-900/90 backdrop-blur-md rounded-2xl p-1 sm:p-1.5 border border-[#D4AF37]/80 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxPhotoUrl(activeCostumeWithPhoto.realPhotography?.frontPhoto || activeCostumeWithPhoto.realPhotography?.heroPhoto || '')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      lightboxPhotoUrl === activeCostumeWithPhoto.realPhotography?.frontPhoto || lightboxPhotoUrl === activeCostumeWithPhoto.realPhotography?.heroPhoto
                        ? 'bg-[#8B0000] text-white shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>👁️</span>
                    <span>{isEn ? 'Front View' : 'Mặt Trước'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxPhotoUrl(activeCostumeWithPhoto.realPhotography?.backPhoto || '')}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      lightboxPhotoUrl === activeCostumeWithPhoto.realPhotography?.backPhoto
                        ? 'bg-[#8B0000] text-white shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>🔄</span>
                    <span>{isEn ? 'Back View' : 'Mặt Sau'}</span>
                  </button>
                </div>
              )}

              <div className="pointer-events-auto">
                <button 
                  type="button" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-800/80 hover:bg-[#8B0000] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#D4AF37]/50 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]" 
                  onClick={handleCloseLightbox}
                  aria-label={isEn ? "Close enlarged photo" : "Đóng ảnh phóng to"}
                >
                  ✕
                </button>
              </div>
            </header>

            {/* Vùng hiển thị toàn cảnh trang phục có thể cuộn xuống để xem trọn vẹn */}
            <div 
              className="w-full flex-1 flex flex-col items-center justify-start pt-20 sm:pt-24 pb-16 px-4"
            >
              <div 
                className="relative max-w-4xl w-auto flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                <img 
                  src={lightboxPhotoUrl} 
                  alt={isEn ? "Enlarged costume detail" : "Chi tiết cổ phục phóng to"} 
                  className="w-auto h-auto max-w-full rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-2 border-[#D4AF37]/50" 
                />

                <div className="mt-4 px-4 py-2 rounded-full bg-stone-900/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-xs flex items-center space-x-2 shadow-lg select-none">
                  <span className="text-sm">↕</span>
                  <span>{isEn ? 'Scroll down or drag right scrollbar to inspect full costume silhouette & hem' : 'Kéo thanh cuộn bên phải hoặc lăn chuột để xem toàn cảnh vạt áo & chân trang phục'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
