import React, { useState } from 'react';
import { VirtualTryOn, VirtualTryOnState } from './VirtualTryOn';
import { StylingResults, AnalysisResult } from './StylingResults';
import { CulturalGuardrail } from './CulturalGuardrail';
import { analyzePersonalColor } from '../../../shared/lib/personalColor';
// @ts-ignore
import { I18N } from '../../../shared/i18n';

export interface StudioSectionProps {}

/**
 * Main wrapper component for the Studio / AI Hub section.
 */
export const StudioSection: React.FC<StudioSectionProps> = () => {
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  
  const [state, setState] = useState<VirtualTryOnState>({
    userPhotoUrl: '',
    selectedCostumeId: 'ngu-than',
    selectedDestination: 'hoang-thanh',
    selectedUndertone: 'autumn',
    height: 165,
    weight: 52,
    bodyShape: 'hourglass',
    bottomChoice: 'pant',
    weather: 'cold-18',
    collarChoice: 'huu-nham',
    colorHex: '#8B0000',
    isAnalyzing: false,
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const getTranslation = (key: string) => {
    const dict = I18N[lang as 'vi' | 'en'] || I18N.vi;
    return (dict as any)[key] || key;
  };

  const handleAnalyze = () => {
    const res = analyzePersonalColor({
      undertoneChoice: state.selectedUndertone,
      height: state.height,
      weight: state.weight,
      bodyShape: state.bodyShape,
      destination: state.selectedDestination,
      weather: state.weather,
      costumeId: state.selectedCostumeId,
      bottomChoice: state.bottomChoice,
      collarChoice: state.collarChoice,
      colorHex: state.colorHex
    });
    setAnalysisResult(res);
  };

  const handleTryOn = () => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    setAnalysisResult(null);

    // Simulate AI Try-on delay
    setTimeout(() => {
      const res = analyzePersonalColor({
        undertoneChoice: state.selectedUndertone,
        height: state.height,
        weight: state.weight,
        bodyShape: state.bodyShape,
        destination: state.selectedDestination,
        weather: state.weather,
        costumeId: state.selectedCostumeId,
        bottomChoice: state.bottomChoice,
        collarChoice: state.collarChoice,
        colorHex: state.colorHex
      });
      setAnalysisResult(res);
      setResultImage(state.userPhotoUrl || null);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }, 1500);
  };

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <div className="inline-block text-xs font-mono font-bold text-[#8B0000] tracking-wider uppercase mb-1">
          ✦ AI Heritage Atelier
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
          {getTranslation('studioTitle')}
        </h2>
        <p className="text-sm text-[#666666] mt-1">
          {getTranslation('studioSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <VirtualTryOn 
            state={state} 
            setState={setState} 
            onAnalyze={handleAnalyze} 
            onTryOn={handleTryOn} 
          />
        </div>
        
        <div className="lg:col-span-5 space-y-6">
          <StylingResults 
            analysis={analysisResult} 
            resultImage={resultImage} 
            isAnalyzing={state.isAnalyzing}
            tryOnModel="gemini-3.1-flash-image"
          />
          <CulturalGuardrail alerts={analysisResult?.guardrails || []} />
        </div>
      </div>
    </section>
  );
};
