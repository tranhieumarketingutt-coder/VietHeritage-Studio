import React from 'react';
import { Landmark, Palette, Camera } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

/**
 * Properties for the Navbar component.
 */
export interface NavbarProps {
  lang: 'vi' | 'en';
  onToggleLang: () => void;
  activeHub: 'hub1' | 'hub2' | 'hub3';
  onSelectHub: (hub: 'hub1' | 'hub2' | 'hub3') => void;
  onOpenWardrobe: () => void;
}

/**
 * Navbar component for navigation, audio controls, and global modal triggers.
 */
export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activeHub,
  onSelectHub,
  onOpenWardrobe
}) => {
  const { isPlaying, toggle: toggleAudio } = useAudio();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 lg:gap-6">
        <button 
          type="button"
          id="navLogo"
          onClick={() => onSelectHub('hub1')}
          aria-label={lang === 'en' ? "VietHeritage Remix - Return to museum home" : "VietHeritage Remix - Về trang chủ bảo tàng di sản"}
          className="flex items-center space-x-3 cursor-pointer text-left bg-transparent border-0 p-1 -m-1 rounded-xl transition-transform hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] shrink-0"
        >
          <div aria-hidden="true" className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg bg-[#8B0000] text-[#D4AF37] flex items-center justify-center font-serif text-xl lg:text-2xl font-bold shadow-md border border-[#D4AF37] shrink-0">
            V
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-lg lg:text-xl text-[#222222] tracking-wide whitespace-nowrap">
                VietHeritage <span className="text-[#8B0000]">Remix</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono font-semibold border border-[#8B0000]/25 uppercase whitespace-nowrap shrink-0">
                1744 · 2026
              </span>
            </div>
            <p className="text-xs text-[#666666] hidden xl:block font-sans whitespace-nowrap">Dự án số hóa & phối màu trang phục truyền thống.</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center space-x-1 p-1 bg-[#F0ECE1] rounded-xl border border-[#D4AF37]/35 shadow-inner shrink-0 overflow-x-auto" id="desktopNavTabs">
          <button 
            type="button"
            id="navTabHub1" 
            onClick={() => onSelectHub('hub1')}
            aria-current={activeHub === 'hub1' ? 'page' : undefined}
            className={`px-3 lg:px-4 py-2 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub1'
                ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]'
                : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'
            }`}
            title={lang === 'en' ? "HUB 1: HERITAGE MUSEUM" : "HUB 1: BẢO TÀNG DI SẢN"}
          >
            <Landmark className={`w-3.5 h-3.5 shrink-0 ${activeHub === 'hub1' ? 'text-[#D4AF37]' : 'text-stone-700'}`} />
            <span className="whitespace-nowrap">{lang === 'en' ? 'BẢO TÀNG DI SẢN' : 'BẢO TÀNG DI SẢN'}</span>
          </button>
          <button 
            type="button"
            id="navTabHub2" 
            onClick={() => onSelectHub('hub2')}
            aria-current={activeHub === 'hub2' ? 'page' : undefined}
            className={`px-3 lg:px-4 py-2 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub2'
                ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]'
                : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'
            }`}
            title={lang === 'en' ? "HUB 2: HERITAGE CO-CREATION STUDIO" : "HUB 2: XƯỞNG SÁNG TẠO DI SẢN"}
          >
            <Palette className={`w-3.5 h-3.5 shrink-0 ${activeHub === 'hub2' ? 'text-[#D4AF37]' : 'text-stone-700'}`} />
            <span className="whitespace-nowrap">{lang === 'en' ? 'CO-CREATION STUDIO' : 'XƯỞNG SÁNG TẠO'}</span>
          </button>
          <button 
            type="button"
            id="navTabHub3" 
            onClick={() => onSelectHub('hub3')}
            aria-current={activeHub === 'hub3' ? 'page' : undefined}
            className={`px-3 lg:px-4 py-2 rounded-lg text-xs font-bold tracking-wider font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
              activeHub === 'hub3'
                ? 'bg-[#8B0000] text-white shadow-md border border-[#8B0000]'
                : 'text-[#666666] hover:text-[#222222] hover:bg-white/60'
            }`}
            title={lang === 'en' ? "HUB 3: SPREAD COMMUNITY" : "HUB 3: CỘNG ĐỒNG LAN TỎA"}
          >
            <Camera className={`w-3.5 h-3.5 shrink-0 ${activeHub === 'hub3' ? 'text-[#D4AF37]' : 'text-stone-700'}`} />
            <span className="whitespace-nowrap">{lang === 'en' ? 'SPREAD COMMUNITY' : 'CỘNG ĐỒNG LAN TỎA'}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans font-bold whitespace-nowrap shrink-0 ${
              activeHub === 'hub3'
                ? 'bg-[#D4AF37] text-[#5C0606]'
                : 'bg-[#E8B04B]/30 text-[#8B0000] border border-[#E8B04B]/50'
            }`}>
              MỚI
            </span>
          </button>
        </nav>

        <div className="flex items-center space-x-2 lg:space-x-2.5 shrink-0">
          <button 
            type="button"
            id="audioToggleBtn" 
            onClick={toggleAudio}
            aria-label={isPlaying ? (lang === 'en' ? 'Pause Hello Vietnam music' : 'Tạm dừng nhạc Hello Vietnam') : (lang === 'en' ? 'Play Hello Vietnam music' : 'Bật nhạc Hello Vietnam')}
            aria-pressed={isPlaying}
            title={isPlaying ? (lang === 'en' ? 'Pause Hello Vietnam Music' : 'Tạm dừng nhạc Hello Vietnam') : (lang === 'en' ? 'Play Hello Vietnam Music' : 'Bật nhạc Hello Vietnam')} 
            className={`flex items-center space-x-1.5 px-2.5 lg:px-3 py-2 rounded-full border border-[#D4AF37]/50 text-xs font-mono transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
              isPlaying ? 'bg-[#FDF6E2] ring-1 ring-[#D4AF37]' : 'bg-white/85 hover:bg-[#FDF6E2]'
            }`}
          >
            <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`}></span>
            <span className="hidden xl:inline text-[#222222] font-medium whitespace-nowrap">{lang === 'en' ? 'Hello Vietnam' : 'Hello Vietnam'}</span>
            {isPlaying ? (
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-[#8B0000] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-stone-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          <button 
            type="button"
            id="openWardrobeBtn" 
            onClick={onOpenWardrobe}
            aria-label={lang === 'en' ? 'Open heritage wardrobe archives' : 'Mở tủ đồ di sản cá nhân'}
            className="px-2.5 lg:px-3 py-2 rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-white text-[#222222] text-xs font-mono hidden sm:flex items-center space-x-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]" 
            title={lang === 'en' ? 'Wardrobe' : 'Tủ Đồ'}
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5 text-[#8B0000] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="hidden xl:inline whitespace-nowrap">{lang === 'en' ? 'Wardrobe' : 'Tủ Đồ'}</span>
          </button>

          <button 
            type="button"
            id="langToggleBtn" 
            onClick={onToggleLang}
            className="px-2.5 py-2 rounded-lg border border-[#D4AF37]/40 bg-white hover:bg-[#F0ECE1] text-xs font-bold font-mono text-[#8B0000] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-offset-2"
            aria-label={`Chuyển ngôn ngữ: ${lang.toUpperCase()}`}
          >
            {lang.toUpperCase()}
          </button>

          <button 
            type="button"
            id="authBtn" 
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#222222] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium font-sans transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
            aria-label="Tài khoản khách"
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="whitespace-nowrap">Khách</span>
          </button>
        </div>
      </div>

      <div className="flex md:hidden border-t border-[#D4AF37]/20 bg-[#F5F1E8] px-2 py-1.5 justify-around overflow-x-auto" id="mobileNavTabs">
        <button 
          type="button"
          id="mobTabHub1" 
          onClick={() => onSelectHub('hub1')}
          aria-current={activeHub === 'hub1' ? 'page' : undefined}
          className={`flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
            activeHub === 'hub1'
              ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <svg aria-hidden="true" className="w-3.5 h-3.5 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>BẢO TÀNG</span>
        </button>
        <button 
          type="button"
          id="mobTabHub2" 
          onClick={() => onSelectHub('hub2')}
          aria-current={activeHub === 'hub2' ? 'page' : undefined}
          className={`flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
            activeHub === 'hub2'
              ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <svg aria-hidden="true" className="w-3.5 h-3.5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span>SÁNG TẠO</span>
        </button>
        <button 
          type="button"
          id="mobTabHub3" 
          onClick={() => onSelectHub('hub3')}
          aria-current={activeHub === 'hub3' ? 'page' : undefined}
          className={`flex-1 py-2 text-center text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
            activeHub === 'hub3'
              ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-white/60'
              : 'text-stone-700 hover:text-stone-950'
          }`}
        >
          <svg aria-hidden="true" className="w-3.5 h-3.5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>LAN TỎA</span>
          <span className="text-[8px] px-1 rounded-sm bg-[#E8B04B] text-[#16213A] font-bold">MỚI</span>
        </button>
      </div>
    </header>
  );
};

