import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { HeroSection } from '../features/home/components/HeroSection';
import { WisdomCarousel } from '../features/wisdom/components/WisdomCarousel';
import { TimelineSection } from '../features/timeline/components/TimelineSection';
import { Footer } from '../shared/components/Footer';
import { WardrobeModal } from '../features/wardrobe/components/WardrobeModal';
import { PhotocardModal, PhotocardDye } from '../features/studio/components/PhotocardModal';

const MuseumGallery = lazy(() => import('../features/museum/components/MuseumGallery').then(m => ({ default: m.MuseumGallery })));
const AnatomySection = lazy(() => import('../features/anatomy/components/AnatomySection').then(m => ({ default: m.AnatomySection })));
const StudioSection = lazy(() => import('../features/studio/components/StudioSection').then(m => ({ default: m.StudioSection })));
const CommunityGrid = lazy(() => import('../features/community/components/CommunityGrid').then(m => ({ default: m.CommunityGrid })));
const ChatDrawer = lazy(() => import('../features/chat/components/ChatDrawer').then(m => ({ default: m.ChatDrawer })));
const SpreadCommunityHub = lazy(() => import('../features/community/components/SpreadCommunityHub').then(m => ({ default: m.SpreadCommunityHub })));
const DressUpStudio = lazy(() => import('../features/dress-up/components/DressUpStudio').then(m => ({ default: m.DressUpStudio })));
const HeritageMuseumCorner = lazy(() => import('../features/heritage-map/components/HeritageMuseumCorner').then(m => ({ default: m.HeritageMuseumCorner })));

export interface AppProps {}

interface PhotocardState {
  portraitUrl: string;
  costumeName: string;
  seasonText: string;
  dyes: PhotocardDye[];
  score: number;
  destination: string;
}

const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Root application component.
 */
export const App: React.FC<AppProps> = () => {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [activeHub, setActiveHub] = useState<'hub1' | 'hub2' | 'hub3' | 'dressup' | 'museumCorner'>('hub1');
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isPhotocardOpen, setIsPhotocardOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [photocardData, setPhotocardData] = useState<PhotocardState>({
    portraitUrl: '',
    costumeName: 'Áo Ngũ Thân Tay Chẽn',
    seasonText: 'Mùa Thu (Autumn)',
    dyes: [],
    score: 100,
    destination: 'Hoàng Thành Thăng Long'
  });

  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') : null;
    if (saved) setLang(saved as 'vi' | 'en');
  }, []);

  const handleToggleLang = () => {
    const nextLang = lang === 'vi' ? 'en' : 'vi';
    setLang(nextLang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vheritage_lang', nextLang);
    }
  };

  const handleSelectHub = (hub: 'hub1' | 'hub2' | 'hub3' | 'dressup' | 'museumCorner') => {
    setActiveHub(hub);
    setTimeout(() => {
      const targetId = 
        hub === 'hub1' ? 'museumSection' : 
        hub === 'museumCorner' ? 'heritageMuseumCornerSection' :
        hub === 'dressup' ? 'dressUpSection' :
        hub === 'hub2' ? 'studioSection' : 
        'communityHubSection';
      const el = document.getElementById(targetId) || document.getElementById('mainContent');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleOpenPhotocard = (data: PhotocardState) => {
    setPhotocardData(data);
    setIsPhotocardOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#8B0000] selection:text-[#FAF7F2]">
      <a 
        href="#mainContent" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#8B0000] focus:text-white focus:rounded-md focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4AF37]"
      >
        Chuyển đến nội dung chính
      </a>
      <Navbar 
        lang={lang}
        onToggleLang={handleToggleLang}
        activeHub={activeHub}
        onSelectHub={handleSelectHub}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
      />
      <main id="mainContent" className="flex-grow">
        <HeroSection onSelectHub={handleSelectHub} activeHub={activeHub} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-14">
          {activeHub === 'hub1' && (
            <div className="space-y-16">
              <div id="museumSection">
                <Suspense fallback={<SectionLoader />}>
                  <MuseumGallery lang={lang} />
                </Suspense>
              </div>
              <div id="heritageMuseumCornerSection">
                <Suspense fallback={<SectionLoader />}>
                  <HeritageMuseumCorner lang={lang} />
                </Suspense>
              </div>
              <Suspense fallback={<SectionLoader />}>
                <AnatomySection lang={lang} />
              </Suspense>
              <TimelineSection />
              <WisdomCarousel />
            </div>
          )}

          {activeHub === 'museumCorner' && (
            <div id="heritageMuseumCornerSection" className="space-y-16">
              <Suspense fallback={<SectionLoader />}>
                <HeritageMuseumCorner lang={lang} />
              </Suspense>
            </div>
          )}

          {activeHub === 'dressup' && (
            <div id="dressUpSection" className="space-y-16">
              <Suspense fallback={<SectionLoader />}>
                <DressUpStudio 
                  lang={lang} 
                  onNavigateToMuseum={() => handleSelectHub('hub1')} 
                />
              </Suspense>
            </div>
          )}

          {activeHub === 'hub2' && (
            <div className="space-y-16">
              {/* Highlight Banner linking to 2D Dress-Up Mini-Game */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F5EFE6] to-[#FAF7F2] border border-[#D4AF37]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3 text-center sm:text-left">
                  <span className="text-3xl">👘</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#222222]">
                      {lang === 'en' ? 'Want to mix and match traditional layers in 2D?' : 'Trải nghiệm phòng thay đồ Cổ Phục 2D mini-game'}
                    </h4>
                    <p className="text-xs text-stone-600 font-sans">
                      {lang === 'en' 
                        ? 'Try on Áo Dài, Nhật Bình, Ngũ Thân with independent layers, hairstyles and accessories.'
                        : 'Thay đổi từng lớp áo, mũ nón, phụ kiện và màu sắc tự nhiên trên nhân vật đại diện.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectHub('dressup')}
                  className="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                >
                  {lang === 'en' ? 'Play 2D Dress-Up' : 'Mở Phối Đồ 2D'}
                </button>
              </div>

              <div id="studioSection">
                <Suspense fallback={<SectionLoader />}>
                  <StudioSection onOpenPhotocard={handleOpenPhotocard} />
                </Suspense>
              </div>
              <Suspense fallback={<SectionLoader />}>
                <CommunityGrid />
              </Suspense>
            </div>
          )}

          {activeHub === 'hub3' && (
            <div id="communityHubSection" className="space-y-16">
              <Suspense fallback={<SectionLoader />}>
                <SpreadCommunityHub lang={lang} />
              </Suspense>
            </div>
          )}
        </div>
      </main>

      <Suspense fallback={null}>
        <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </Suspense>

      <WardrobeModal 
        isOpen={isWardrobeOpen} 
        onClose={() => setIsWardrobeOpen(false)} 
        lang={lang}
      />

      <PhotocardModal 
        isOpen={isPhotocardOpen}
        onClose={() => setIsPhotocardOpen(false)}
        portraitUrl={photocardData.portraitUrl}
        costumeName={photocardData.costumeName}
        seasonText={photocardData.seasonText}
        dyes={photocardData.dyes}
        score={photocardData.score}
        destination={photocardData.destination}
        lang={lang}
      />
      
      <button 
        id="floatingChatButton"
        type="button"
        onClick={() => setIsChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 bg-[#8B0000] text-white p-4 rounded-full shadow-lg hover:bg-red-800 transition-colors z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4AF37] cursor-pointer"
        aria-label={isChatOpen ? "Đóng Trợ lý Cổ phục" : "Mở Trợ lý Cổ phục"}
        aria-expanded={isChatOpen}
        aria-haspopup="dialog"
      >
        💬
      </button>

      <Footer />
    </div>
  );
};
