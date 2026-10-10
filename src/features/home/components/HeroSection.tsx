import React from 'react';

export interface HeroSectionProps {}

/**
 * Hero Section component for the home page.
 */
export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F5EFE6] via-[#FAF7F2] to-[#ECE4D4] border-b border-[#D4AF37]/25 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      
      <div className="interactive-lotus-pattern absolute -left-10 md:left-2 -bottom-8 w-56 md:w-80 h-auto pointer-events-auto opacity-50 md:opacity-60 animate-[float-lotus_4s_ease-in-out_infinite] z-0 select-none cursor-pointer" title="Hoa Sen Bách Diệp">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <path d="M10 260 C60 250, 140 270, 200 255 C240 245, 270 260, 290 255" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="4,4"/>
          <path d="M30 280 C80 270, 160 290, 220 275 C250 268, 280 280, 300 275" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.25"/>
          <path d="M110 270 Q120 180, 80 120" stroke="#557C3E" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4"/>
          <ellipse cx="65" cy="140" rx="60" ry="32" fill="#3D5A2B" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.45"/>
          <path d="M65 140 Q40 125, 15 130 M65 140 Q40 155, 20 160 M65 140 Q85 125, 115 130 M65 140 Q85 155, 110 160" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.35"/>
          <circle cx="65" cy="140" r="2.5" fill="#D4AF37" fillOpacity="0.5"/>
          <path d="M150 270 Q145 170, 170 85" stroke="#557C3E" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.5"/>
          <g transform="translate(170, 85)">
            <path d="M0 0 C-40 -15, -60 -50, -45 -75 C-30 -100, -10 -80, 0 0 Z" fill="#8B0000" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C40 -15, 60 -50, 45 -75 C30 -100, 10 -80, 0 0 Z" fill="#8B0000" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C-30 -25, -45 -65, -25 -85 C-10 -105, -5 -80, 0 0 Z" fill="#C47B89" fillOpacity="0.18" stroke="#8B0000" strokeWidth="1.2"/>
            <path d="M0 0 C30 -25, 45 -65, 25 -85 C10 -105, 5 -80, 0 0 Z" fill="#C47B89" fillOpacity="0.18" stroke="#8B0000" strokeWidth="1.2"/>
            <path d="M0 0 C-18 -30, -25 -80, 0 -100 C25 -80, 18 -30, 0 0 Z" fill="#8B0000" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1.4"/>
            <ellipse cx="0" cy="-35" rx="14" ry="7" fill="#D4AF37" fillOpacity="0.4" stroke="#8B0000" strokeWidth="1"/>
            <circle cx="-6" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="0" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="6" cy="-35" r="1.5" fill="#8B0000"/>
          </g>
          <path d="M190 270 Q200 190, 235 140" stroke="#557C3E" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.45"/>
          <g transform="translate(235, 140)">
            <path d="M0 0 C-15 -15, -15 -45, 0 -55 C15 -45, 15 -15, 0 0 Z" fill="#8B0000" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C-6 -15, -6 -40, 0 -52 C6 -40, 6 -15, 0 0 Z" fill="#C47B89" fillOpacity="0.25" stroke="#8B0000" strokeWidth="0.9"/>
          </g>
        </svg>
      </div>

      <div className="interactive-lotus-pattern-rev absolute -right-10 md:right-2 -top-6 w-56 md:w-80 h-auto pointer-events-auto opacity-50 md:opacity-60 animate-[float-lotus-rev_4s_ease-in-out_infinite] z-0 select-none cursor-pointer" title="Hoa Sen Bách Diệp">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm transform scale-x-[-1]">
          <path d="M10 260 C60 250, 140 270, 200 255 C240 245, 270 260, 290 255" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="4,4"/>
          <path d="M30 280 C80 270, 160 290, 220 275 C250 268, 280 280, 300 275" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.25"/>
          <path d="M110 270 Q120 180, 80 120" stroke="#557C3E" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4"/>
          <ellipse cx="65" cy="140" rx="60" ry="32" fill="#3D5A2B" fillOpacity="0.12" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.45"/>
          <path d="M65 140 Q40 125, 15 130 M65 140 Q40 155, 20 160 M65 140 Q85 125, 115 130 M65 140 Q85 155, 110 160" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.35"/>
          <circle cx="65" cy="140" r="2.5" fill="#D4AF37" fillOpacity="0.5"/>
          <path d="M150 270 Q145 170, 170 85" stroke="#557C3E" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.5"/>
          <g transform="translate(170, 85)">
            <path d="M0 0 C-40 -15, -60 -50, -45 -75 C-30 -100, -10 -80, 0 0 Z" fill="#8B0000" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C40 -15, 60 -50, 45 -75 C30 -100, 10 -80, 0 0 Z" fill="#8B0000" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C-30 -25, -45 -65, -25 -85 C-10 -105, -5 -80, 0 0 Z" fill="#C47B89" fillOpacity="0.18" stroke="#8B0000" strokeWidth="1.2"/>
            <path d="M0 0 C30 -25, 45 -65, 25 -85 C10 -105, 5 -80, 0 0 Z" fill="#C47B89" fillOpacity="0.18" stroke="#8B0000" strokeWidth="1.2"/>
            <path d="M0 0 C-18 -30, -25 -80, 0 -100 C25 -80, 18 -30, 0 0 Z" fill="#8B0000" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1.4"/>
            <ellipse cx="0" cy="-35" rx="14" ry="7" fill="#D4AF37" fillOpacity="0.4" stroke="#8B0000" strokeWidth="1"/>
            <circle cx="-6" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="0" cy="-35" r="1.5" fill="#8B0000"/>
            <circle cx="6" cy="-35" r="1.5" fill="#8B0000"/>
          </g>
          <path d="M190 270 Q200 190, 235 140" stroke="#557C3E" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.45"/>
          <g transform="translate(235, 140)">
            <path d="M0 0 C-15 -15, -15 -45, 0 -55 C15 -45, 15 -15, 0 0 Z" fill="#8B0000" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1.2"/>
            <path d="M0 0 C-6 -15, -6 -40, 0 -52 C6 -40, 6 -15, 0 0 Z" fill="#C47B89" fillOpacity="0.25" stroke="#8B0000" strokeWidth="0.9"/>
          </g>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight mb-4 leading-tight whitespace-nowrap bg-gradient-to-r from-[#5C0606] via-[#8B0000] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(212,175,55,0.25)]">
          DI SẢN HÓA MỸ THUẬT
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#666666] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Nền tảng đồng sáng tạo cổ phục Việt Nam. Khám phá giải phẫu 2D chuẩn sử, phối màu cá nhân thông minh và tôn vinh triết lý phương Đông qua từng nếp áo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button id="heroGoHub1" className="px-6 py-3 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer">
            <i data-lucide="landmark" className="w-4 h-4"></i>
            <span>Khám Phá Bảo Tàng</span>
          </button>
          <button id="heroGoHub2" className="px-6 py-3 rounded-xl bg-white hover:bg-[#FDF6E2] text-[#222222] border border-[#D4AF37] font-medium text-sm transition-all shadow-xs flex items-center space-x-2 cursor-pointer">
            <i data-lucide="wand-2" className="w-4 h-4 text-[#8B0000]"></i>
            <span>Thử Phối Màu AI</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-[#8B0000]">5</span>
            <span className="text-xs text-[#666666]">Triều đại</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
            <span className="block text-2xl font-mono font-bold text-[#D4AF37]">4 Season</span>
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
