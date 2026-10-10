import React from 'react';
import { Landmark, Palette, Camera } from 'lucide-react';

export interface HeroSectionProps {
  onSelectHub?: (hub: 'hub1' | 'hub2' | 'hub3') => void;
  activeHub?: 'hub1' | 'hub2' | 'hub3';
}

/**
 * Hero Section component for the home page.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectHub, activeHub = 'hub1' }) => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F5EFE6] via-[#FAF7F2] to-[#ECE4D4] border-b border-[#D4AF37]/25 py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.25rem] font-serif font-bold tracking-tight mb-6 leading-[1.15] bg-gradient-to-r from-[#5C0606] via-[#8B0000] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(212,175,55,0.25)]">
          DI SẢN HÓA MỸ THUẬT
        </h1>
        <p className="font-sans text-base sm:text-xl md:text-2xl text-[#555555] max-w-3xl sm:max-w-4xl mx-auto mb-10 font-normal leading-relaxed">
          Nền tảng đồng sáng tạo cổ phục Việt Nam. Khám phá giải phẫu 2D chuẩn sử, phối màu cá nhân thông minh và tôn vinh triết lý phương Đông qua từng nếp áo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button 
            type="button" 
            id="heroGoHub1" 
            onClick={() => onSelectHub && onSelectHub('hub1')}
            className={`px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub1'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border-2 border-transparent ring-2 ring-[#D4AF37]/50'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border-2 border-[#D4AF37]/60'
            }`}
          >
            <Landmark className="w-5 h-5 shrink-0" />
            <span>Khám Phá Bảo Tàng</span>
          </button>
          <button 
            type="button" 
            id="heroGoHub2" 
            onClick={() => onSelectHub && onSelectHub('hub2')}
            className={`px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub2'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border-2 border-transparent ring-2 ring-[#D4AF37]/50'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border-2 border-[#D4AF37]/60'
            }`}
          >
            <Palette className={`w-5 h-5 shrink-0 ${activeHub === 'hub2' ? 'text-[#D4AF37]' : 'text-[#8B0000]'}`} />
            <span>Phối Màu Sắc Tố Tự Nhiên</span>
          </button>
          <button 
            type="button" 
            id="heroGoHub3" 
            onClick={() => onSelectHub && onSelectHub('hub3')}
            className={`px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub3'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border-2 border-transparent ring-2 ring-[#D4AF37]/50'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border-2 border-[#D4AF37]/60'
            }`}
          >
            <Camera className={`w-5 h-5 shrink-0 ${activeHub === 'hub3' ? 'text-[#D4AF37]' : 'text-[#8B0000]'}`} />
            <span>Cộng Đồng Lan Tỏa</span>
          </button>
        </div>
      </div>
    </section>
  );
};
