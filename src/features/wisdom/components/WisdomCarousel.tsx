import React from 'react';

export interface WisdomCarouselProps {}

/**
 * Wisdom Carousel component for displaying cultural heritage facts.
 */
export const WisdomCarousel: React.FC<WisdomCarouselProps> = () => {
  return (
    <section id="culturalWisdomSection" className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F5EFE0] p-6 sm:p-8 md:p-10 shadow-sm transition-all">
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#8B0000]/5 pointer-events-none blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-2xl"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4 mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B0000] text-yellow-300 flex items-center justify-center font-bold text-lg shadow-md shrink-0 border border-[#D4AF37]">
            ?
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">
                ĐIỂM SÁNG TRI THỨC VĂN HÓA · LỜI VÀNG DI SẢN
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
              <span className="text-xs font-mono text-stone-500 font-semibold">
                #01 / 10
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222] mt-0.5">
              Bạn Có Biết? Triết Lý Cổ Phục
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
          <button 
            id="btnRandomWisdom" 
            className="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B0000] text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="Khám phá tri thức ngẫu nhiên"
          >
            <i data-lucide="shuffle" className="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span>Ngẫu Nhiên</span>
          </button>

          <button 
            id="btnCopyWisdom" 
            className="px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#8B0000] text-xs font-mono font-bold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="Sao chép đoạn trích"
          >
            <i data-lucide="copy" className="w-3.5 h-3.5 text-stone-500"></i>
            <span id="copyWisdomText">Sao Chép</span>
          </button>

          <button 
            id="btnNextWisdom" 
            className="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-[#8B0000]/20"
            title="Điểm sáng tri thức tiếp theo"
          >
            <span>Khám Phá Tiếp</span>
            <i data-lucide="arrow-right" className="w-3.5 h-3.5 text-yellow-300"></i>
          </button>
        </div>
      </div>

      <div id="wisdomCardContainer" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-opacity duration-300 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono text-xs font-bold border border-[#8B0000]/20">
                ❖ Triết Lý Nhân Sinh
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100/70 text-amber-900 font-mono text-xs border border-amber-300/40">
                ⏳ Triều Nguyễn (1744 - 1945)
              </span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#8B0000] leading-snug">
              Áo Ngũ Thân và Đạo Làm Người
            </h4>

            <div className="relative pl-5 border-l-3 border-[#8B0000]/60 py-1">
              <p className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed italic">
                "Áo ngũ thân được thiết kế với 4 vạt chính tượng trưng cho Tứ Thân Phụ Mẫu (cha mẹ mình và cha mẹ vợ/chồng), và 1 vạt con (vạt hò) bên trong tượng trưng cho bản thân người mặc, luôn được ôm ấp bởi tình cảm gia đình. Năm hạt nút áo tượng trưng cho Ngũ Thường: Nhân, Nghĩa, Lễ, Trí, Tín."
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200/80 flex items-center space-x-2 text-xs font-mono text-stone-500">
            <i data-lucide="book-open" className="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span>Nguồn Sử Liệu Trích Dẫn:</span>
            <strong className="text-stone-700">Điển Chế Phục Trang Triều Nguyễn</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
