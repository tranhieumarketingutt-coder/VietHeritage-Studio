import React from 'react';
import type { AnatomyPreset } from '../../../shared/types/anatomy';

/**
 * Props for the CostumeStage component.
 */
export interface CostumeStageProps {
  preset: AnatomyPreset;
  activeLayer: string;
  flapsOpen: boolean;
  activeHotspot: string;
  lang: 'vi' | 'en';
  onSelectHotspot: (id: string) => void;
}

/**
 * Component that renders the interactive SVG stage for costume anatomy.
 */
export const CostumeStage: React.FC<CostumeStageProps> = ({
  preset,
  activeLayer,
  flapsOpen,
  activeHotspot,
  lang,
  onSelectHotspot
}) => {
  const isEn = lang === 'en';

  return (
    <div className="relative w-72 h-[410px] flex items-center justify-center select-none my-2 group">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 288 410">
        <circle cx="144" cy="180" r="120" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 4"/>
        <circle cx="144" cy="180" r="95" fill="none" stroke="#8B0000" strokeWidth="0.8" opacity="0.3"/>
      </svg>

      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${activeLayer === 'outer' ? 'opacity-15' : 'opacity-100'}`}
        dangerouslySetInnerHTML={{ __html: preset.innerSvg }}
      />

      {preset.midSvg && (
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${activeLayer === 'inner' ? 'opacity-10' : (activeLayer === 'mid' ? 'opacity-100 scale-105' : (flapsOpen ? 'opacity-100' : 'opacity-40'))}`}
          dangerouslySetInnerHTML={{ __html: preset.midSvg }}
        />
      )}

      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${activeLayer === 'inner' ? 'hidden' : 'block'}`}>
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out origin-top-left ${flapsOpen ? '-translate-x-[108%] -rotate-2 opacity-50 shadow-2xl' : 'translate-x-0 rotate-0 opacity-100'}`}
          dangerouslySetInnerHTML={{ __html: preset.flapLeftSvg }}
        />

        <div 
          className={`absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out origin-top-right ${flapsOpen ? 'translate-x-[108%] rotate-2 opacity-50 shadow-2xl' : 'translate-x-0 rotate-0 opacity-100'}`}
          dangerouslySetInnerHTML={{ __html: preset.flapRightSvg }}
        />
      </div>

      <div 
        className="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none z-30" 
        title={isEn ? preset.headwear.labelEn : preset.headwear.labelVi}
        dangerouslySetInnerHTML={{ __html: preset.headwear.svg }}
      />

      {preset.hotspots.map(h => (
        <button 
          key={h.id}
          className={`absolute ${h.pos} w-7 h-7 rounded-full ${h.color} font-mono text-xs font-bold flex items-center justify-center shadow-lg border-2 border-white cursor-pointer z-40 transition-transform hover:scale-125 ${activeHotspot === h.id ? 'ring-4 ring-[#8B0000]/40 scale-110 animate-bounce' : 'animate-pulse'}`} 
          title={isEn ? h.quickLabelEn : h.quickLabelVi}
          onClick={() => onSelectHotspot(h.id)}
        >
          {h.id}
        </button>
      ))}
    </div>
  );
};
