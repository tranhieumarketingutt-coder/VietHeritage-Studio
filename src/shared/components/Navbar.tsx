import React from 'react';

export interface NavbarProps {}

/**
 * Navbar component for the application.
 */
export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" id="navLogo">
          <div className="w-11 h-11 rounded-lg bg-[#8B0000] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-[#D4AF37]">
            V
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#222222] tracking-wide">VietHeritage Remix</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono font-semibold border border-[#8B0000]/30 uppercase">1744 · 2026</span>
            </div>
            <p className="text-xs text-[#666666] hidden sm:block font-sans">Dự án số hóa & phối màu trang phục truyền thống.</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1.5 p-1 bg-[#F0ECE1] rounded-xl border border-[#D4AF37]/30 shadow-inner" id="desktopNavTabs">
          <button 
            id="navTabHub1" 
            className="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 bg-[#8B0000] text-white shadow-md border border-[#8B0000]"
            title="HUB 1: BẢO TÀNG DI SẢN"
          >
            <i data-lucide="landmark" className="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span>BẢO TÀNG DI SẢN</span>
          </button>
          <button 
            id="navTabHub2" 
            className="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-2 text-[#666666] hover:text-[#222222] hover:bg-white/60"
            title="HUB 2: AI CO-CREATOR"
          >
            <i data-lucide="wand-2" className="w-3.5 h-3.5 text-stone-500"></i>
            <span>AI CO-CREATOR</span>
          </button>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button id="audioToggleBtn" title="Play / Pause Ambient Vietnamese Music" className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-white/80 hover:bg-[#FDF6E2] text-xs font-mono transition-all shadow-xs cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
            <span className="hidden lg:inline text-[#222222] font-medium">Nhạc Nền</span>
            <i data-lucide="volume-x" className="w-3.5 h-3.5 text-[#8B0000]"></i>
          </button>

          <button id="openWardrobeBtn" className="p-2 rounded-lg border border-stone-300 hover:border-[#D4AF37] bg-white text-[#222222] text-xs font-mono hidden sm:flex items-center space-x-1.5 cursor-pointer" title="Tủ Đồ">
            <i data-lucide="archive" className="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span className="hidden md:inline">Tủ Đồ</span>
          </button>

          <button id="langToggleBtn" className="px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-white hover:bg-[#F0ECE1] text-xs font-bold font-mono text-[#8B0000] transition-colors cursor-pointer">
            VI
          </button>

          <button id="authBtn" className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium font-sans transition-colors shadow-xs cursor-pointer">
            <i data-lucide="user" className="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span className="truncate max-w-[85px] sm:max-w-none">Khách</span>
          </button>
        </div>
      </div>

      <div className="flex md:hidden border-t border-[#D4AF37]/20 bg-[#F5F1E8] px-2 py-1.5 justify-around" id="mobileNavTabs">
        <button id="mobTabHub1" className="flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60">
          <i data-lucide="landmark" className="w-3.5 h-3.5 text-[#8B0000]"></i>
          <span>BẢO TÀNG</span>
        </button>
        <button id="mobTabHub2" className="flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 text-stone-500 hover:text-stone-800">
          <i data-lucide="wand-2" className="w-3.5 h-3.5 text-stone-400"></i>
          <span>SÁNG TẠO</span>
        </button>
      </div>
    </header>
  );
};
