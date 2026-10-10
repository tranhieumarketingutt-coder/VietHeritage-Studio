import React, { useState } from 'react';
import { ANATOMY_PRESETS } from '../../../anatomyData';
import { CostumeStage } from './CostumeStage';
import { HotspotCard } from './HotspotCard';

/**
 * Props for the AnatomySection component.
 */
export interface AnatomySectionProps {
  lang: 'vi' | 'en';
}

/**
 * Interactive Anatomy Section allowing users to explore 2D layers and flaps of costumes.
 */
export const AnatomySection: React.FC<AnatomySectionProps> = ({ lang }) => {
  const [activeCostumeKey, setActiveCostumeKey] = useState<string>('ngu-than');
  const [flapsOpen, setFlapsOpen] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<string>('all');
  const [activeHotspot, setActiveHotspot] = useState<string>('1');

  const isEn = lang === 'en';
  const preset = ANATOMY_PRESETS[activeCostumeKey] || ANATOMY_PRESETS['ngu-than'];
  const currentHotspot = preset.hotspots.find(h => h.id === activeHotspot) || preset.hotspots[0];

  const handleCostumeSelect = (id: string) => {
    setActiveCostumeKey(id);
    setActiveLayer('all');
    setFlapsOpen(false);
    setActiveHotspot('1');
  };

  return (
    <section id="anatomySection" className="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-10 shadow-sm relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#8B0000]/5 pointer-events-none blur-2xl"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>❖</span>
            <span>2D Layered Costume Anatomy · {isEn ? preset.eraEn : preset.eraVi}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            {isEn ? `2D Anatomy Deconstruction: ${preset.nameEn}` : `Bóc Tách Lớp Áo 2D: ${preset.nameVi}`}
          </h2>
          <p className="text-sm text-[#666666] mt-1 max-w-2xl">
            {isEn 
              ? 'Select any Vietnamese traditional costume below to interactively explore its layered tailoring, functional flaps, and philosophical anatomy.'
              : 'Chọn bất kỳ trang phục cổ phong nào dưới đây để tương tác bóc tách các lớp vải, mở đóng vạt áo 2D và khám phá triết lý nhân sinh.'
            }
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-2">
          <button 
            className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 font-mono text-xs font-bold rounded-xl border border-amber-300 shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
            title={isEn ? 'View real photo reference for this costume' : 'Xem ảnh chụp thực tế đối chiếu của cổ phục này'}
          >
            <span>📸</span>
            <span>{isEn ? 'Real Photo' : 'Ảnh Chụp Đối Chiếu'}</span>
          </button>
          <button 
            onClick={() => setFlapsOpen(!flapsOpen)}
            className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37]"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>
            <span>{flapsOpen ? (isEn ? 'Close Flaps' : 'Đóng Vạt Áo') : (isEn ? 'Open Flaps' : 'Mở Vạt Áo')}</span>
          </button>
        </div>
      </div>

      <div className="mb-6 p-1.5 bg-[#F5F1E8] rounded-2xl border border-[#D4AF37]/30 flex items-center space-x-1.5 overflow-x-auto shadow-sm">
        <span className="text-xs font-mono font-bold text-[#8B0000] px-3 shrink-0 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>{isEn ? 'Select Costume:' : 'Chọn Cổ Phục:'}</span>
        </span>
        {Object.values(ANATOMY_PRESETS).map(p => (
          <button 
            key={p.id}
            onClick={() => handleCostumeSelect(p.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${p.id === activeCostumeKey ? 'bg-[#8B0000] text-white shadow-md' : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'}`}
          >
            <span>{isEn ? p.nameEn.split('(')[0].trim() : p.nameVi.split('(')[0].trim()}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#FAF7F2] to-[#ECE4D4] rounded-2xl border-2 border-[#D4AF37]/40 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px] shadow-inner">
          <div className="w-full flex items-center justify-between mb-4 z-20 flex-wrap gap-2">
            <div className="flex items-center space-x-1 p-1 bg-white/90 backdrop-blur-sm rounded-xl border border-stone-200 shadow-sm overflow-x-auto">
              {preset.layers.map(layer => (
                <button 
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${activeLayer === layer.id ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {isEn ? layer.labelEn : layer.labelVi}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#8B0000] font-bold bg-[#8B0000]/10 px-2 py-0.5 rounded border border-[#8B0000]/20">
              {flapsOpen ? (isEn ? '✦ Flaps Unfolded' : '✦ Đang Mở Vạt') : (isEn ? '✦ Fully Fastened' : '✦ Đang Cài Kín')}
            </span>
          </div>

          <CostumeStage 
            preset={preset} 
            activeLayer={activeLayer} 
            flapsOpen={flapsOpen} 
            activeHotspot={activeHotspot} 
            lang={lang} 
            onSelectHotspot={setActiveHotspot}
          />

          <div className="w-full text-center mt-3 z-20">
            <span className="inline-block text-[11px] text-stone-500 font-mono bg-white/80 px-3 py-1 rounded-full border border-stone-200">
              💡 {isEn ? 'Click numbers (1-6) or "Open Flaps" to unfold 2D layers' : 'Bấm các số (1-6) trên áo hoặc nút "Mở Vạt Áo" để bóc tách 2D'}
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <HotspotCard 
            hotspot={currentHotspot} 
            eraVi={preset.eraVi} 
            lang={lang} 
          />

          <div className="grid grid-cols-3 gap-2">
            {preset.hotspots.map(h => (
              <button 
                key={h.id}
                onClick={() => setActiveHotspot(h.id)}
                className={`p-2.5 rounded-xl border border-stone-200 bg-white hover:border-[#8B0000] text-left text-xs transition-all cursor-pointer shadow-sm hover:scale-105 ${activeHotspot === h.id ? 'border-[#8B0000] bg-rose-50/50' : ''}`}
              >
                <span className="block font-mono font-bold text-[#8B0000]">{isEn ? h.quickLabelEn : h.quickLabelVi}</span>
                <span className="text-[11px] text-stone-500 truncate block">{isEn ? h.quickSubEn : h.quickSubVi}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
