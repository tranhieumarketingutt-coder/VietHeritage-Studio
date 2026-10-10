import React from 'react';
import { CommunityLook } from '../../../shared/lib/storage';
import { CostumeData } from '../../../shared/types/costume';
// @ts-ignore
import { COSTUMES_DATA } from '../../../costumes.js';

export interface LookCardProps {
  look: CommunityLook;
  onLike?: (id: string) => void;
}

/**
 * Renders a single community look card.
 */
export const LookCard: React.FC<LookCardProps> = ({ look, onLike }) => {
  const costume = COSTUMES_DATA.find((c: CostumeData) => c.id === look.costumeId) || COSTUMES_DATA[0];
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  const handleLike = () => {
    if (onLike) {
      onLike(look.id);
    }
  };

  const defaultPhoto = costume?.realPhotography?.heroPhoto || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80';
  const imageUrl = look.photoUrl || defaultPhoto;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 hover:border-[#D4AF37] p-5 shadow-xs transition-all flex flex-col justify-between">
      <div>
        <div className="w-full h-52 rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F2] to-[#ECE4D4] border border-stone-200 p-3 mb-4 flex items-center justify-center relative overflow-hidden group">
          <img src={imageUrl} className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105" alt={isEn ? look.titleEn : look.titleVi} />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
            Score: {look.score}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8B0000] uppercase">
            <span>{isEn ? look.costumeName : look.costumeName}</span>
            <span>{look.date}</span>
          </div>
          <h4 className="font-serif font-bold text-sm text-[#222222] leading-tight line-clamp-2">
            {isEn ? look.titleEn : look.titleVi}
          </h4>
          <p className="text-[11px] text-stone-500 truncate mt-1">
            📍 {look.destination}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#D4AF37] flex items-center justify-center text-[10px] font-bold text-[#8B0000] shrink-0">
            {look.author.charAt(0)}
          </div>
          <span className="text-[11px] font-medium text-stone-700 truncate">{look.author}</span>
        </div>
        <button 
          onClick={handleLike}
          className="flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-rose-50 text-stone-500 hover:text-[#8B0000] transition-colors group shrink-0"
        >
          <svg className="w-3.5 h-3.5 group-hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-[10px] font-mono font-bold">{look.likes}</span>
        </button>
      </div>
    </div>
  );
};
