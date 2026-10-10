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
const MapSection = lazy(() => import('../features/heritage-map/components/MapSection').then(m => ({ default: m.MapSection })));
const StudioSection = lazy(() => import('../features/studio/components/StudioSection').then(m => ({ default: m.StudioSection })));
const CommunityGrid = lazy(() => import('../features/community/components/CommunityGrid').then(m => ({ default: m.CommunityGrid })));
const ChatDrawer = lazy(() => import('../features/chat/components/ChatDrawer').then(m => ({ default: m.ChatDrawer })));

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
  const [activeHub, setActiveHub] = useState<'hub1' | 'hub2'>('hub1');
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

  const handleSelectHub = (hub: 'hub1' | 'hub2') => {
    setActiveHub(hub);
    if (hub === 'hub1') {
      const el = document.getElementById('museumSection') || document.getElementById('mainContent');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      const el = document.getElementById('studioSection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
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
        <HeroSection onSelectHub={handleSelectHub} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          <div id="museumSection">
            <Suspense fallback={<SectionLoader />}>
              <MuseumGallery lang={lang} />
            </Suspense>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <AnatomySection lang={lang} />
          </Suspense>
          <TimelineSection />
          <WisdomCarousel />
          <Suspense fallback={<SectionLoader />}>
            <MapSection lang={lang} />
          </Suspense>
          <div id="studioSection">
            <Suspense fallback={<SectionLoader />}>
              <StudioSection onOpenPhotocard={handleOpenPhotocard} />
            </Suspense>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <CommunityGrid />
          </Suspense>
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


