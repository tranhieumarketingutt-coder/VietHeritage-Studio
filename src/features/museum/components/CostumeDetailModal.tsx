import React, { useState, useEffect } from 'react';
import { COSTUMES_DATA } from '../../../costumes';
import { Costume } from './CostumeCard';

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const costume = (COSTUMES_DATA as Costume[]).find(c => c.id === costumeId) || (COSTUMES_DATA as Costume[])[0];
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#D4AF37] p-6 md:p-8 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center z-10 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-stone-200 pb-4 mb-5 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1">
              <span>✦ {isEn ? 'Historical Costume Dossier' : 'Hồ Sơ Cổ Phục Chuẩn Sử'}</span>
              <span>· {costume.form}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#222222]">
              {isEn ? costume.nameEn : costume.nameVi}
            </h3>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              {isEn ? 'Imperial Era:' : 'Niên Đại Lịch Sử:'} <strong className="text-[#8B0000]">{costume.era}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-1 p-1 bg-[#F5F1E8] rounded-xl border border-[#D4AF37]/60 shadow-sm shrink-0 self-start">
            <button 
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${!isEn ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              onClick={() => setLang('vi')}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button 
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${isEn ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              onClick={() => setLang('en')}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#8B0000] uppercase mb-1.5">
              <span>🏛️</span>
              <span>{isEn ? 'Era & Dynasty' : 'Niên Đại Lịch Sử'}</span>
            </div>
            <div className="text-sm font-serif font-bold text-[#222222] mb-1">
              {costume.era}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-800 uppercase mb-1.5">
              <span>🧵</span>
              <span>{isEn ? 'Fabric & Weaving' : 'Chất Liệu Dệt May'}</span>
            </div>
            <div className="text-xs font-mono font-bold text-stone-900 mb-1 leading-snug">
              {isEn ? costume.fabricsEn : costume.fabricsVi}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-800 uppercase mb-1.5">
              <span>⚖️</span>
              <span>{isEn ? 'Symbolism & Ethics' : 'Ý Nghĩa Biểu Tượng'}</span>
            </div>
            <div className="text-xs font-mono font-bold text-stone-900 mb-1 leading-snug">
              {isEn ? costume.philosophyEn : costume.philosophyVi}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] rounded-2xl border border-[#D4AF37]/50 p-4 shadow-sm">
          <div className="md:col-span-5 h-64 relative rounded-xl overflow-hidden bg-stone-900 border border-[#D4AF37]/50 shadow-md flex items-center justify-center group">
            <img 
              src={costume.realPhotography?.heroPhoto} 
              alt={isEn ? costume.nameEn : costume.nameVi}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none"></div>

            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[9px] font-bold border border-[#D4AF37]/60 shadow-sm">
                ✦ 4K CHÂN THỰC
              </span>
              <button 
                type="button"
                className="pointer-events-auto px-2 py-1 rounded-lg bg-black/75 hover:bg-[#8B0000] text-white font-mono text-[10px] font-bold border border-[#D4AF37]/50 shadow-sm transition-all hover:scale-105 flex items-center space-x-1 cursor-pointer backdrop-blur-sm"
                onClick={() => onOpenLightbox(costume.realPhotography?.heroPhoto || '')}
              >
                <span>🔍</span>
                <span>{isEn ? 'Enlarge' : 'Phóng To 4K'}</span>
              </button>
            </div>
            
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono z-10">
              <span className="truncate flex items-center space-x-1 max-w-[160px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37] shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-xs text-stone-200 font-serif font-bold">{isEn ? costume.realPhotography?.locationEn : costume.realPhotography?.locationVi}</span>
              </span>
            </div>
          </div>
          
          <div className="md:col-span-7 h-64 overflow-y-auto pr-2 custom-scrollbar text-stone-700 text-sm leading-relaxed space-y-4">
             <p>{isEn ? costume.shortDescEn : costume.shortDescVi}</p>
             <p>{isEn ? 'This costume represents the pinnacle of Vietnamese tailoring craftsmanship, reflecting deep cultural values and historical continuity.' : 'Trang phục này đại diện cho đỉnh cao của kỹ thuật may đo truyền thống Việt Nam, phản ánh những giá trị văn hóa sâu sắc và tính liên tục của lịch sử.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
