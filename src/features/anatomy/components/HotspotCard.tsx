import React from 'react';
import type { AnatomyHotspot } from '../../../shared/types/anatomy';

/**
 * Props for the HotspotCard component.
 */
export interface HotspotCardProps {
  hotspot: AnatomyHotspot;
  eraVi: string;
  lang: 'vi' | 'en';
}

/**
 * Component that displays detailed information for a selected anatomy hotspot.
 */
export const HotspotCard: React.FC<HotspotCardProps> = ({ hotspot, eraVi, lang }) => {
  const isEn = lang === 'en';

  return (
    <div className="p-6 md:p-7 rounded-2xl border-2 border-[#D4AF37]/50 bg-[#FAF7F2] transition-all shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#8B0000] uppercase mb-2">
        <span>{isEn ? hotspot.badgeEn : hotspot.badgeVi}</span>
        <span className="text-stone-500">{eraVi.split('·')[0].trim()}</span>
      </div>
      <h3 className="font-serif text-2xl font-bold text-[#222222] mb-3 leading-snug">
        {isEn ? hotspot.titleEn : hotspot.titleVi}
      </h3>
      <p className="text-sm text-stone-700 leading-relaxed font-sans">
        {isEn ? hotspot.contentEn : hotspot.contentVi}
      </p>

      <div className="mt-4 pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-lg bg-white border border-stone-200">
          <span className="text-stone-400 block text-[10px] uppercase">
            {isEn ? 'Cultural Philosophy:' : 'Triết Lý Văn Hóa:'}
          </span>
          <span className="text-[#8B0000] font-bold">
            {isEn ? hotspot.philosophyEn : hotspot.philosophyVi}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-white border border-stone-200">
          <span className="text-stone-400 block text-[10px] uppercase">
            {isEn ? 'Tailoring Technique:' : 'Kỹ Thuật May Đo:'}
          </span>
          <span className="text-[#222222] font-bold">
            {isEn ? hotspot.tailoringEn : hotspot.tailoringVi}
          </span>
        </div>
      </div>
    </div>
  );
};
