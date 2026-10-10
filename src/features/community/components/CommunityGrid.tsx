import React, { useState, useEffect } from 'react';
import { LookCard } from './LookCard';
import { storageHelper, CommunityLook } from '../../../shared/lib/storage';
// @ts-ignore
import { I18N } from '../../../shared/i18n';

export interface CommunityGridProps {}

/**
 * Community grid displaying lookbook cards.
 */
export const CommunityGrid: React.FC<CommunityGridProps> = () => {
  const [looks, setLooks] = useState<CommunityLook[]>([]);
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  
  useEffect(() => {
    setLooks(storageHelper.getCommunityLooks());
  }, []);

  const handleLike = (id: string) => {
    const updated = storageHelper.likeCommunityLook(id);
    setLooks(updated);
  };

  const getTranslation = (key: string) => {
    const dict = I18N[lang as 'vi' | 'en'] || I18N.vi;
    return (dict as any)[key] || key;
  };

  return (
    <section className="pt-8 border-t border-stone-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">✦ Live Community Grid</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#222222] mt-0.5">
            {getTranslation('communityHeader')}
          </h2>
          <p className="text-xs md:text-sm text-[#666666]">
            {getTranslation('communitySub')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {looks.map(look => (
          <LookCard key={look.id} look={look} onLike={handleLike} />
        ))}
      </div>
    </section>
  );
};
