import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { HeroSection } from '../features/home/components/HeroSection';
import { WisdomCarousel } from '../features/wisdom/components/WisdomCarousel';
import { TimelineSection } from '../features/timeline/components/TimelineSection';
import { Footer } from '../shared/components/Footer';

// Lazy loaded components for code splitting
const MuseumGallery = lazy(() => import('../features/museum/components/MuseumGallery').then(m => ({ default: m.MuseumGallery })));
const AnatomySection = lazy(() => import('../features/anatomy/components/AnatomySection').then(m => ({ default: m.AnatomySection })));
const MapSection = lazy(() => import('../features/heritage-map/components/MapSection').then(m => ({ default: m.MapSection })));
const StudioSection = lazy(() => import('../features/studio/components/StudioSection').then(m => ({ default: m.StudioSection })));
const CommunityGrid = lazy(() => import('../features/community/components/CommunityGrid').then(m => ({ default: m.CommunityGrid })));
const ChatDrawer = lazy(() => import('../features/chat/components/ChatDrawer').then(m => ({ default: m.ChatDrawer })));

export interface AppProps {}

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') : null;
    if (saved) setLang(saved as 'vi' | 'en');
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#8B0000] selection:text-[#FAF7F2]">
      <Navbar />
      <main id="mainContent" className="flex-grow">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          <Suspense fallback={<SectionLoader />}>
            <MuseumGallery lang={lang} />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <AnatomySection lang={lang} />
          </Suspense>
          <TimelineSection />
          <WisdomCarousel />
          <Suspense fallback={<SectionLoader />}>
            <MapSection lang={lang} />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <StudioSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <CommunityGrid />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={null}>
        <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </Suspense>
      
      {/* Floating Chat Button for Demo */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-[#8B0000] text-white p-4 rounded-full shadow-lg hover:bg-red-800 transition-colors z-40"
      >
        💬
      </button>

      <Footer />
    </div>
  );
};


