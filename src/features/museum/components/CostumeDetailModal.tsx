import React, { useState } from 'react';
import { COSTUMES_DATA } from '../../../costumes';
import { Costume } from './CostumeCard';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';

/**
 * Props for CostumeDetailModal.
 */
export interface CostumeDetailModalProps {
  costumeId: string;
  lang: 'vi' | 'en';
  onClose: () => void;
  onOpenLightbox: (url: string) => void;
}

/**
 * Renders the full historical dossier for a selected costume.
 */
export const CostumeDetailModal: React.FC<CostumeDetailModalProps> = ({
  costumeId,
  lang: initialLang,
  onClose,
  onOpenLightbox
}) => {
  const [lang, setLang] = useState<'vi' | 'en'>(initialLang);
  const [activeTab, setActiveTab] = useState<'history' | 'styling'>('history');
  const [modalPhotoSide, setModalPhotoSide] = useState<'front' | 'back'>('front');
  const scrollBodyRef = React.useRef<HTMLDivElement>(null);

  const dialogRef = useFocusTrap<HTMLDivElement>({
    isOpen: true,
    onClose,
    lockScroll: true,
    closeOnEscape: true
  });

  const costume = (COSTUMES_DATA as Costume[]).find(c => c.id === costumeId) || (COSTUMES_DATA as Costume[])[0];
  const isEn = lang === 'en';
  const displayedPhoto = modalPhotoSide === 'back' && costume.realPhotography?.backPhoto
    ? costume.realPhotography.backPhoto
    : (costume.realPhotography?.frontPhoto || costume.realPhotography?.heroPhoto || '');

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (overlayRef.current) {
      overlayRef.current.scrollBy({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md overflow-y-scroll flex justify-center pt-[10px] sm:pt-[12px] px-2 sm:px-4 pb-16 modal-scroll-area" onClick={onClose}>
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="costume-detail-title"
        tabIndex={-1}
        className="bg-white rounded-3xl max-w-5xl w-full flex flex-col border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative outline-none overflow-hidden my-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Controls */}
        <div className="p-5 sm:p-6 md:p-8 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative">
          <button 
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200/80 hover:bg-[#8B0000] hover:text-white text-stone-700 font-mono text-sm flex items-center justify-center z-10 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            onClick={onClose}
            aria-label={isEn ? "Close costume dossier" : "Đóng hồ sơ chi tiết cổ phục"}
          >
            ✕
          </button>

          <div className="pr-10 sm:pr-0">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1">
              <span>✦ {isEn ? 'Historical Costume Dossier' : 'Hồ Sơ Cổ Phục Chuẩn Sử'}</span>
              <span>· {costume.form}</span>
            </div>
            <h3 id="costume-detail-title" className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#222222] tracking-tight">
              {isEn ? costume.nameEn : costume.nameVi}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">
              {isEn ? 'Imperial Era:' : 'Niên Đại Lịch Sử:'} <strong className="text-[#8B0000] font-bold">{costume.era}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-1.5 p-1 bg-white/90 rounded-xl border border-[#D4AF37]/60 shadow-sm shrink-0 self-start sm:self-center mr-8 sm:mr-10">
            <button 
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${!isEn ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              onClick={() => setLang('vi')}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button 
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${isEn ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              onClick={() => setLang('en')}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div ref={scrollBodyRef} className="p-5 sm:p-6 md:p-8 flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/45 shadow-xs">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1.5">
                <span>🏛️</span>
                <span>{isEn ? 'Era & Dynasty' : 'Niên Đại Lịch Sử'}</span>
              </div>
              <div className="text-sm font-serif font-bold text-[#222222]">
                {costume.era}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/45 shadow-xs">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-800 uppercase mb-1.5">
                <span>🧵</span>
                <span>{isEn ? 'Fabric & Weaving' : 'Chất Liệu Dệt May'}</span>
              </div>
              <div className="text-xs font-mono font-bold text-stone-900 leading-snug">
                {isEn ? costume.fabricsEn : costume.fabricsVi}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/45 shadow-xs">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-800 uppercase mb-1.5">
                <span>⚖️</span>
                <span>{isEn ? 'Symbolism & Ethics' : 'Ý Nghĩa Biểu Tượng'}</span>
              </div>
              <div className="text-xs font-mono font-bold text-stone-900 leading-snug">
                {isEn ? costume.philosophyEn : costume.philosophyVi}
              </div>
            </div>
          </div>

          {/* Main Visual & Historical Text Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6] rounded-3xl border-2 border-[#D4AF37]/50 p-5 sm:p-6 shadow-md">
            <div className="lg:col-span-5 min-h-[380px] sm:min-h-[440px] md:min-h-[500px] relative rounded-2xl overflow-hidden bg-stone-900 border border-[#D4AF37]/60 shadow-lg flex items-center justify-center group p-1.5 sm:p-2">
              <img 
                src={displayedPhoto} 
                alt={isEn ? costume.nameEn : costume.nameVi}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[500px] object-contain filter brightness-95 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none"></div>

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                {costume.realPhotography?.backPhoto ? (
                  <div className="flex items-center bg-black/80 backdrop-blur-md rounded-xl p-1 border border-[#D4AF37]/70 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setModalPhotoSide('front')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${modalPhotoSide === 'front' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-300 hover:text-white'}`}
                    >
                      {isEn ? '👁️ Front' : '👁️ Mặt Trước'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalPhotoSide('back')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${modalPhotoSide === 'back' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-300 hover:text-white'}`}
                    >
                      {isEn ? '🔄 Back' : '🔄 Mặt Sau'}
                    </button>
                  </div>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-[#8B0000] text-[#D4AF37] font-mono text-[10px] font-bold border border-[#D4AF37]/60 shadow-sm pointer-events-none">
                    ✦ 4K CHÂN THỰC
                  </span>
                )}

                <button 
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-black/75 hover:bg-[#8B0000] text-white font-mono text-xs font-bold border border-[#D4AF37]/60 shadow-md transition-all hover:scale-105 flex items-center space-x-1.5 cursor-pointer backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  onClick={() => onOpenLightbox(displayedPhoto)}
                  aria-label={isEn ? "Enlarge 4K real photo" : "Phóng to ảnh chụp 4K"}
                >
                  <span>🔍</span>
                  <span>{isEn ? 'Enlarge 4K' : 'Phóng To 4K'}</span>
                </button>
              </div>
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono z-10 pointer-events-none">
                <span className="truncate flex items-center space-x-1.5 max-w-[200px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37] shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-xs text-stone-200 font-serif font-bold">
                    {modalPhotoSide === 'back' ? (isEn ? 'Back View' : 'Góc Nhìn Mặt Sau') : (isEn ? 'Front View' : 'Góc Nhìn Mặt Trước')}
                  </span>
                </span>
                <span className="text-[10px] bg-[#8B0000] px-2.5 py-1 rounded-md text-[#D4AF37] shrink-0 font-bold border border-[#D4AF37]/50 shadow-sm">
                  {modalPhotoSide === 'back' ? '✦ MẶT SAU' : '✦ MẶT TRƯỚC'}
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-4 overflow-y-auto max-h-[380px] sm:max-h-[440px] pr-2 custom-scrollbar">
                <div className="p-3.5 rounded-xl bg-white/80 border border-[#D4AF37]/40 shadow-xs">
                  <span className="text-xs font-mono font-bold text-[#8B0000] uppercase block mb-1">
                    📖 {isEn ? 'Historical Summary' : 'Tóm Lược Lịch Sử'}
                  </span>
                  <p className="font-sans text-stone-800 leading-relaxed">
                    {isEn ? costume.shortDescEn : costume.shortDescVi}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-[#D4AF37]/50 shadow-xs">
                  <span className="text-xs font-mono font-bold text-[#8A6D1C] uppercase block mb-2">
                    📜 {isEn ? 'In-depth Historical Dossier' : 'Hồ Sơ Sử Liệu & Quy Chế May Đo'}
                  </span>
                  <p className="font-sans text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                    {((costume as any).detailsVi || (costume as any).detailsEn) ? (isEn ? (costume as any).detailsEn : (costume as any).detailsVi) : (
                      isEn ? 'This costume represents the pinnacle of Vietnamese tailoring craftsmanship, reflecting deep cultural values, Confucian ethical philosophy, and the continuous evolution of national identity.' : 'Trang phục này đại diện cho đỉnh cao của kỹ thuật may đo truyền thống Việt Nam, phản ánh những giá trị văn hóa sâu sắc, triết lý luân thường phương Đông và tính liên tục của lịch sử Đại Việt.'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>✦ VietHeritage Digital Archive</span>
                <span className="text-[#8B0000] font-bold">100% Chuẩn Sử</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quick Scroll-Down Button */}
        <button
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-4 right-6 z-20 px-3.5 py-2 rounded-full bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold shadow-xl border border-[#D4AF37] flex items-center space-x-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          title={isEn ? "Scroll down to read more" : "Cuộn xuống xem tiếp"}
          aria-label={isEn ? "Scroll down to read more" : "Cuộn xuống xem tiếp"}
        >
          <span>{isEn ? "Read More" : "Xem Tiếp"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
  );
};
