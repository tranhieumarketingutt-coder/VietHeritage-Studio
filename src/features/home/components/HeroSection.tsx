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
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F5EFE6] via-[#FAF7F2] to-[#ECE4D4] border-b border-[#D4AF37]/25 py-12 md:py-16 px-4 sm:px-6 lg:px-8">


      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold tracking-tight mb-4 leading-tight bg-gradient-to-r from-[#5C0606] via-[#8B0000] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(212,175,55,0.25)]">
          DI SẢN HÓA MỸ THUẬT
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#666666] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Nền tảng đồng sáng tạo cổ phục Việt Nam. Khám phá giải phẫu 2D chuẩn sử, phối màu cá nhân thông minh và tôn vinh triết lý phương Đông qua từng nếp áo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            type="button"
            id="heroGoHub1" 
            onClick={() => onSelectHub && onSelectHub('hub1')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub1'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border border-transparent'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border border-[#D4AF37]'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Khám Phá Bảo Tàng</span>
          </button>
          <button 
            type="button"
            id="heroGoHub2" 
            onClick={() => onSelectHub && onSelectHub('hub2')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub2'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border border-transparent'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border border-[#D4AF37]'
            }`}
          >
            <Palette className={`w-4 h-4 ${activeHub === 'hub2' ? 'text-[#D4AF37]' : 'text-[#8B0000]'}`} />
            <span>Phối Màu Sắc Tố Tự Nhiên</span>
          </button>
          <button 
            type="button"
            id="heroGoHub3" 
            onClick={() => onSelectHub && onSelectHub('hub3')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub3'
                ? 'bg-[#8B0000] hover:bg-[#700000] text-white border border-transparent'
                : 'bg-white hover:bg-[#FDF6E2] text-[#222222] border border-[#D4AF37]'
            }`}
          >
            <Camera className={`w-4 h-4 ${activeHub === 'hub3' ? 'text-[#D4AF37]' : 'text-[#8B0000]'}`} />
            <span>Cộng Đồng Lan Tỏa</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-[#8B0000]">5</span>
            <span className="text-xs text-[#666666]">Triều đại</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-[#8A6D1C]">4 Season</span>
            <span className="text-xs text-[#666666]">Personal Color</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-[#222222]">12+</span>
            <span className="text-xs text-[#666666]">Dáng áo cổ điển</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-emerald-700">100% Guard</span>
            <span className="text-xs text-[#666666]">Cultural Score</span>
          </div>
        </div>
      </div>
    </section>
  );
};
