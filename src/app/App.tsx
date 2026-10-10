import React, { useState, useEffect } from 'react';
import { Navbar } from '../shared/components/Navbar';
import { HeroSection } from '../features/home/components/HeroSection';
import { WisdomCarousel } from '../features/wisdom/components/WisdomCarousel';
import { TimelineSection } from '../features/timeline/components/TimelineSection';
import { MuseumGallery } from '../features/museum/components/MuseumGallery';
import { AnatomySection } from '../features/anatomy/components/AnatomySection';
import { MapSection } from '../features/heritage-map/components/MapSection';
import { StudioSection } from '../features/studio/components/StudioSection';
import { CommunityGrid } from '../features/community/components/CommunityGrid';
import { ChatDrawer } from '../features/chat/components/ChatDrawer';
import { Footer } from '../shared/components/Footer';

export interface AppProps {}

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
          <MuseumGallery lang={lang} />
          <AnatomySection lang={lang} />
          <TimelineSection />
          <WisdomCarousel />
          <MapSection lang={lang} />
          <StudioSection />
          <CommunityGrid />
        </div>
      </main>
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
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


