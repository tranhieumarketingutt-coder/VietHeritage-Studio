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
    <section className="space-y-8" id="museumGallerySection">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-stone-200/80">
        <div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>✦</span>
            <span>V-Museum Curated Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            {isEn ? 'V-Museum Heritage Gallery' : 'Bảo Tàng Số V-Museum'}
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl font-sans">
            {isEn ? 'Explore the collection of digitized traditional costumes.' : 'Khám phá bộ sưu tập cổ phục truyền thống được số hóa.'}
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

      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#F5F1E8] p-3 rounded-2xl border border-[#D4AF37]/50 shadow-sm gap-3">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-[#8B0000] font-bold">✨ {isEn ? 'Display Mode for Costumes:' : 'Chế Độ Hiển Thị Cổ Phục:'}</span>
        </div>
        <div className="flex items-center space-x-1.5 p-1 bg-white rounded-xl border border-stone-300 shadow-sm">
          <button 
            type="button" 
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${globalMode === 'real' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}`}
            onClick={() => setGlobalMode('real')}
          >
            📸 {isEn ? '4K Real Photos' : 'Ảnh Thật 4K'}
          </button>
          <button 
            type="button" 
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${globalMode === 'split' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}`}
            onClick={() => setGlobalMode('split')}
          >
            ⚡ {isEn ? 'Split Slider' : 'Kéo Trượt'}
          </button>
          <button 
            type="button" 
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${globalMode === 'svg' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'}`}
            onClick={() => setGlobalMode('svg')}
          >
            🎨 {isEn ? 'Vector' : 'Bản Vẽ'}
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

      {lightboxPhotoUrl && (
        <div 
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? "Enlarged 4K costume photography" : "Ảnh phóng to cổ phục 4K"}
          tabIndex={-1}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 outline-none" 
          onClick={handleCloseLightbox}
        >
          <button 
            type="button" 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#8B0000] text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]" 
            onClick={handleCloseLightbox}
            aria-label={isEn ? "Close enlarged photo" : "Đóng ảnh phóng to"}
          >
            ✕
          </button>
          <img 
            src={lightboxPhotoUrl} 
            alt={isEn ? "Enlarged costume detail" : "Chi tiết cổ phục phóng to"} 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
            onClick={e => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};
