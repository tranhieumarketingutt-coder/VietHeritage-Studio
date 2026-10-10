import React, { useState } from 'react';

/**
 * Costume data model.
 */
export interface Costume {
  id: string;
  nameVi: string;
  nameEn: string;
  era: string;
  eraCategory: string;
  form: string;
  shortDescVi: string;
  shortDescEn: string;
  fabricsVi: string;
  fabricsEn: string;
  philosophyVi: string;
  philosophyEn: string;
  realPhotography?: {
    heroPhoto: string;
    photoTitleVi: string;
    photoTitleEn: string;
    locationVi: string;
    locationEn: string;
  };
  svgIllustration: string;
}

/**
 * Props for CostumeCard component.
 */
export interface CostumeCardProps {
  costume: Costume;
  globalMode: 'real' | 'split' | 'svg';
  lang: 'vi' | 'en';
  onOpenModal: (id: string) => void;
  onOpenLightbox: (photoUrl: string) => void;
}

/**
 * Renders a single interactive costume card.
 */
export const CostumeCard: React.FC<CostumeCardProps> = ({
  costume,
  globalMode,
  lang,
  onOpenModal,
  onOpenLightbox
}) => {
  const [localMode, setLocalMode] = useState<'real' | 'split' | 'svg'>(globalMode);
  const [splitPos, setSplitPos] = useState<number>(50);

  const isEn = lang === 'en';
  const c = costume;

  return (
    <article 
      className="group bg-white rounded-2xl border-2 border-[#D4AF37]/50 hover:border-[#8B0000] ring-1 ring-[#D4AF37]/20 hover:ring-[#8B0000]/30 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer relative overflow-hidden" 
      onClick={() => onOpenModal(c.id)}
      title={isEn ? 'Click anywhere on card to open historical dossier' : 'Nhấp vào thẻ để mở hồ sơ lịch sử chi tiết'}
    >
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 to-transparent rounded-full pointer-events-none group-hover:from-[#8B0000]/20 transition-all"></div>
      
      <div>
        <div className="relative w-full h-72 rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#F8F4EC] to-[#EBE2D3] border border-[#D4AF37]/50 group-hover:border-[#8B0000]/50 p-3 mb-5 overflow-hidden flex items-center justify-center transition-colors shadow-inner">
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#8B0000] text-[#D4AF37] font-mono text-[10px] font-bold tracking-wider shadow-sm border border-[#D4AF37]/60 z-20 flex items-center space-x-1">
            <span>✦</span>
            <span>{c.era}</span>
          </div>

          <div 
            className="absolute top-2.5 left-2.5 z-20 flex items-center bg-white/95 backdrop-blur-sm rounded-full p-0.5 border border-[#D4AF37]/60 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              aria-pressed={localMode === 'svg'}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B0000] ${localMode === 'svg' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900'}`}
              onClick={() => setLocalMode('svg')}
              title={isEn ? '2D Vector Illustration' : 'Bản Đồ Họa 2D'}
            >
              🎨 Vector
            </button>
            <button 
              type="button"
              aria-pressed={localMode === 'split'}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B0000] ${localMode === 'split' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900'}`}
              onClick={() => setLocalMode('split')}
              title={isEn ? 'Interactive Split Comparison' : 'So Sánh Kéo Trượt'}
            >
              ⚡ So Sánh
            </button>
            <button 
              type="button"
              aria-pressed={localMode === 'real'}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B0000] ${localMode === 'real' ? 'bg-[#8B0000] text-white shadow-sm' : 'text-stone-700 hover:text-stone-900'}`}
              onClick={() => setLocalMode('real')}
              title={isEn ? 'Real-Life Photography 4K' : 'Ảnh Thực Tế 4K'}
            >
              📸 Ảnh Thật
            </button>
          </div>

          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/90 font-mono text-[9px] flex items-center space-x-1 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37]"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>{isEn ? 'Dossier' : 'Hồ Sơ'}</span>
          </div>

          {localMode === 'real' ? (
            <div className="w-full h-full relative rounded-lg overflow-hidden flex items-center justify-center bg-stone-900 group/img">
              <img 
                src={c.realPhotography?.heroPhoto} 
                alt={isEn ? c.realPhotography?.photoTitleEn : c.realPhotography?.photoTitleVi}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              
              <button 
                type="button" 
                className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-lg bg-black/75 hover:bg-[#8B0000] text-white flex items-center space-x-1 text-[10px] font-mono font-bold transition-all border border-[#D4AF37]/60 shadow-md hover:scale-105 cursor-pointer backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                title={isEn ? 'Inspect 4K Tailoring & Craftsmanship' : 'Soi nếp may & chi tiết may đo 4K'}
                aria-label={isEn ? `Inspect 4K craftsmanship for ${c.nameEn}` : `Soi nếp may đo 4K cho ${c.nameVi}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(c.realPhotography?.heroPhoto || '');
                }}
              >
                <span>🔍</span>
                <span>{isEn ? 'Inspect' : 'Soi Nếp May'}</span>
              </button>

              <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-mono flex items-center justify-between pointer-events-none z-10">
                <span className="truncate flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37] shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-xs text-stone-200 font-serif font-bold">{isEn ? c.realPhotography?.locationEn : c.realPhotography?.locationVi}</span>
                </span>
                <span className="text-[9px] bg-[#8B0000] px-2 py-0.5 rounded text-[#D4AF37] shrink-0 font-bold border border-[#D4AF37]/50 shadow-sm">
                  ✦ 4K CHÂN THỰC
                </span>
              </div>
            </div>
          ) : localMode === 'split' ? (
            <div className="w-full h-full relative rounded-lg overflow-hidden bg-stone-900 select-none shadow-inner">
              <img 
                src={c.realPhotography?.heroPhoto} 
                alt={`${c.nameVi} Real Photo`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover filter brightness-95 pointer-events-none"
              />
              <div className="absolute bottom-7 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[#D4AF37] font-mono text-[9px] font-bold pointer-events-none z-10 border border-[#D4AF37]/30">
                📸 4K Thật
              </div>

              <div 
                className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#F8F4EC] to-[#EBE2D3] flex items-center justify-center p-3 pointer-events-none"
                style={{ clipPath: `inset(0 calc(100% - ${splitPos}%) 0 0)` }}
              >
                <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: c.svgIllustration }} />
                <div className="absolute bottom-7 left-2 px-1.5 py-0.5 rounded bg-[#8B0000]/90 text-white font-mono text-[9px] font-bold z-10 border border-white/20">
                  🎨 Vector
                </div>
              </div>

              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none z-20 shadow-md"
                style={{ left: `${splitPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#8B0000] border border-[#D4AF37] text-white flex items-center justify-center text-[9px] font-bold shadow-md">
                  ⇄
                </div>
              </div>

              <div 
                className="absolute bottom-1 left-2 right-2 z-30 flex items-center space-x-1.5 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10" 
                onClick={(e) => e.stopPropagation()}
              >
                <label htmlFor={`slider-${c.id}`} className="text-[9px] font-mono text-stone-300 shrink-0">
                  {isEn ? 'Slide:' : 'Trượt:'}
                </label>
                <input 
                  id={`slider-${c.id}`}
                  type="range" 
                  min="0" 
                  max="100" 
                  value={splitPos} 
                  onChange={(e) => setSplitPos(parseInt(e.target.value, 10))}
                  aria-label={isEn ? `Comparison slider between vector illustration and real photo for ${c.nameEn}` : `Thanh trượt so sánh bản vẽ vector và ảnh thật cho ${c.nameVi}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={splitPos}
                  aria-valuetext={`${splitPos}%`}
                  className="w-full h-1 bg-stone-700 accent-[#D4AF37] rounded cursor-ew-resize focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                  title={isEn ? 'Slide to compare vector illustration and real photo' : 'Kéo trượt so sánh bản vẽ và ảnh thật'}
                />
                <span className="text-[9px] font-mono text-[#D4AF37] font-bold w-6 text-right shrink-0" aria-hidden="true">{splitPos}%</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: c.svgIllustration }} />
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <span className="text-[#8B0000] font-bold uppercase tracking-wider">✦ {c.form}</span>
          <span className="text-stone-600 font-normal">{c.eraCategory.toUpperCase()}</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#222222] mb-2 group-hover:text-[#8B0000] transition-colors leading-snug">
          {isEn ? c.nameEn : c.nameVi}
        </h3>

        <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed mb-4 font-sans">
          {isEn ? c.shortDescEn : c.shortDescVi}
        </p>

        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs font-mono text-stone-700 mb-4 space-y-2 shadow-sm group-hover:border-[#D4AF37]/50 transition-colors">
          <div className="flex items-start space-x-2">
            <span className="shrink-0 text-[#8B0000] font-bold">🏛️ {isEn ? 'Era:' : 'Niên Đại:'}</span>
            <span className="text-stone-900 font-semibold truncate">{c.era}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="shrink-0 text-amber-900 font-bold">🧵 {isEn ? 'Fabric:' : 'Chất Liệu:'}</span>
            <span className="text-stone-700 truncate" title={isEn ? c.fabricsEn : c.fabricsVi}>{isEn ? c.fabricsEn : c.fabricsVi}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="shrink-0 text-emerald-800 font-bold">⚖️ {isEn ? 'Symbolism:' : 'Biểu Tượng:'}</span>
            <span className="text-stone-700 truncate" title={isEn ? c.philosophyEn : c.philosophyVi}>{isEn ? c.philosophyEn : c.philosophyVi}</span>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-stone-200 pt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(c.id);
          }}
          aria-label={isEn ? `Xem hồ sơ lịch sử chi tiết cho ${c.nameEn}` : `Xem hồ sơ lịch sử chi tiết cho ${c.nameVi}`}
          className="w-full flex items-center justify-center space-x-2 text-xs font-mono font-bold text-[#8B0000] group-hover:text-[#8A6D1C] transition-colors p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
        >
          <span>{isEn ? 'Explore Dossier' : 'Xem Hồ Sơ Lịch Sử'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B0000] group-hover:text-[#8A6D1C] transition-colors"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  );
};
