import React, { useState } from 'react';
import { CULTURAL_WISDOM_SNIPPETS } from '../data/wisdomSnippets';
import { Shuffle, Copy, Check, ArrowRight, BookOpen } from 'lucide-react';

export interface WisdomCarouselProps {}

/**
 * Wisdom Carousel component displaying cultural heritage insights, philosophy, and tailoring craftsmanship.
 */
export const WisdomCarousel: React.FC<WisdomCarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const snippet = CULTURAL_WISDOM_SNIPPETS[currentIndex] || CULTURAL_WISDOM_SNIPPETS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CULTURAL_WISDOM_SNIPPETS.length);
    setCopied(false);
  };

  const handleRandom = () => {
    let nextIdx = Math.floor(Math.random() * CULTURAL_WISDOM_SNIPPETS.length);
    if (nextIdx === currentIndex && CULTURAL_WISDOM_SNIPPETS.length > 1) {
      nextIdx = (currentIndex + 1) % CULTURAL_WISDOM_SNIPPETS.length;
    }
    setCurrentIndex(nextIdx);
    setCopied(false);
  };

  const handleCopy = async () => {
    const textToCopy = `"${snippet.titleVi}"\n\n${snippet.factVi}\n\nTriết lý: ${snippet.philosophyVi}\n(Nguồn: ${snippet.source} · ${snippet.eraVi})`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  return (
    <section id="culturalWisdomSection" className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F5EFE0] p-6 sm:p-8 md:p-10 shadow-sm transition-all">
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#8B0000]/5 pointer-events-none blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-2xl"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4 mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-yellow-300 flex items-center justify-center font-serif font-bold text-lg shadow-md shrink-0 border border-[#D4AF37]">
            ✦
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">
                ĐIỂM SÁNG TRI THỨC VĂN HÓA · LỜI VÀNG DI SẢN
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
              <span className="text-xs font-mono text-stone-600 font-semibold">
                #{String(currentIndex + 1).padStart(2, '0')} / {CULTURAL_WISDOM_SNIPPETS.length}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222] mt-0.5">
              Bạn Có Biết? Triết Lý Cổ Phục
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto flex-wrap gap-y-2">
          <button 
            type="button"
            id="btnRandomWisdom" 
            onClick={handleRandom}
            className="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B0000] text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            title="Khám phá tri thức ngẫu nhiên"
            aria-label="Khám phá tri thức ngẫu nhiên"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Ngẫu Nhiên</span>
          </button>

          <button 
            type="button"
            id="btnCopyWisdom" 
            onClick={handleCopy}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
              copied
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700 hover:text-[#8B0000]'
            }`}
            title="Sao chép đoạn trích vào clipboard"
            aria-label="Sao chép đoạn trích vào clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-700" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-stone-600" />
            )}
            <span id="copyWisdomText">{copied ? '✓ Đã sao chép' : 'Sao Chép'}</span>
          </button>

          <button 
            type="button"
            id="btnNextWisdom" 
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-[#8B0000]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            title="Điểm sáng tri thức tiếp theo"
            aria-label="Khám phá điểm sáng tri thức tiếp theo"
          >
            <span>Khám Phá Tiếp</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
          </button>
        </div>
      </div>

      <div id="wisdomCardContainer" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-opacity duration-300 relative z-10 animate-fade-in">
        <div className="lg:col-span-12 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono text-xs font-bold border border-[#8B0000]/20">
                ❖ {snippet.categoryVi}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-900 font-mono text-xs border border-amber-300/40">
                ⏳ {snippet.eraVi}
              </span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#8B0000] leading-snug">
              {snippet.titleVi}
            </h4>

            <div className="relative pl-5 border-l-3 border-[#8B0000]/60 py-1 bg-white/60 rounded-r-xl p-3">
              <p className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed italic">
                "{snippet.factVi}"
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/30 shadow-2xs">
              <span className="font-mono text-[11px] font-bold text-[#8A6D1C] uppercase block mb-1">
                ✦ Triết Lý Đạo Làm Người:
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {snippet.philosophyVi}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200/80 flex items-center space-x-2 text-xs font-mono text-stone-600">
            <BookOpen className="w-3.5 h-3.5 text-[#8A6D1C]" />
            <span>Nguồn Sử Liệu Trích Dẫn:</span>
            <strong className="text-stone-800">{snippet.source}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
