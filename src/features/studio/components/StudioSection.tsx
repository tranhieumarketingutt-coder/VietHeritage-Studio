import React, { useState } from 'react';
import { VirtualTryOn, VirtualTryOnState } from './VirtualTryOn';
import { StylingResults, AnalysisResult, TryOnMeta } from './StylingResults';
import { CulturalGuardrail } from './CulturalGuardrail';
import { analyzePersonalColor } from '../../../shared/lib/personalColor';
import { I18N, Language, Translations } from '../../../shared/i18n';

export interface StudioSectionProps {
  onOpenPhotocard?: (data: {
    portraitUrl: string;
    costumeName: string;
    seasonText: string;
    dyes: Array<{ hex: string; nameEn: string; nameVi: string }>;
    score: number;
    destination: string;
  }) => void;
}

/**
 * Main wrapper component for the Studio / AI Hub section.
 */
export const StudioSection: React.FC<StudioSectionProps> = ({ onOpenPhotocard }) => {
  const lang = (typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi') as Language;
  
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
  const [tryOnMeta, setTryOnMeta] = useState<TryOnMeta | null>(null);

  const getTranslation = (key: string): string => {
    const dict = I18N[lang] || I18N.vi;
    const value = (dict as Record<string, string>)[key];
    return typeof value === 'string' ? value : key;
  };

  const costumeNameMap: Record<string, string> = {
    'ngu-than': 'Áo Ngũ Thân Tay Chẽn',
    'nhat-binh': 'Áo Nhật Bình Cung Đình',
    'giao-linh': 'Áo Giao Lĩnh Hữu Nhậm',
    'ao-dai': 'Áo Dài Truyền Thống',
    'ao-tac': 'Áo Tấc (Ngũ Thân Tay Thụ)',
    'ba-ba': 'Áo Bà Ba Nam Bộ'
  };

  const destinationMap: Record<string, string> = {
    'hoang-thanh': 'Hoàng Thành Thăng Long',
    'hoi-an': 'Phố Cổ Hội An',
    'dai-noi-hue': 'Đại Nội Huế',
    'chua-den': 'Chốn Tôn Nghiêm',
    'cafe': 'Dạo Phố Cà Phê'
  };

  const currentCostumeName = costumeNameMap[state.selectedCostumeId] || 'Áo Ngũ Thân';
  const currentDestinationName = destinationMap[state.selectedDestination] || 'Hoàng Thành Thăng Long';

  const handleAnalyze = async () => {
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

    if (!resultImage) {
      setResultImage(state.userPhotoUrl || null);
    }
    setAnalysisResult(res);

    try {
      const response = await fetch('/api/gemini/styling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          costumeName: currentCostumeName,
          season: res.season || 'Mùa Thu (Warm Autumn)',
          undertone: state.selectedUndertone,
          destination: currentDestinationName,
          weather: state.weather === 'cold-18' ? 'Se lạnh' : 'Nắng ấm',
          colorHex: state.colorHex,
          bodyShape: state.bodyShape
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.expertAdvice) {
          setAnalysisResult(prev => prev ? { ...prev, expertAdvice: data.expertAdvice } : prev);
        }
      }
    } catch (err) {
      console.warn('Styling advice API call failed:', err);
    }
  };

  const handleTryOn = async () => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    setAnalysisResult(null);

    const photoToSend = state.userPhotoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80';
    if (!state.userPhotoUrl) {
      setState(prev => ({ ...prev, userPhotoUrl: photoToSend }));
    }

    const colorAnalysis = analyzePersonalColor({
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

    try {
      const response = await fetch('/api/gemini/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoBase64: photoToSend,
          costumeId: state.selectedCostumeId,
          costumeName: currentCostumeName,
          colorHex: state.colorHex,
          destinationId: state.selectedDestination,
          gender: 'vietnamese'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultImage(data.imageUrl || null);
        setTryOnMeta({
          isLive: Boolean(data.isLive),
          model: data.model || 'gemini-3.1-flash-image',
          notes: data.notes || '',
          error: data.error
        });
      } else {
        const errData = await response.json().catch(() => ({}));
        setResultImage(photoToSend);
        setTryOnMeta({
          isLive: false,
          model: 'gemini-3.1-flash-image',
          error: errData.error || `Máy chủ trả về mã HTTP ${response.status}`,
          notes: 'Đang hiển thị chế độ ảnh mẫu chuẩn sử thay thế.'
        });
      }
    } catch (err: unknown) {
      console.warn('Try on API call failed:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setResultImage(photoToSend);
      setTryOnMeta({
        isLive: false,
        model: 'Offline Fallback',
        error: errMsg,
        notes: 'Không thể kết nối máy chủ tạo ảnh. Hiển thị chế độ ngoại tuyến.'
      });
    } finally {
      setAnalysisResult(colorAnalysis);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
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
            tryOnModel={tryOnMeta?.model || 'gemini-3.1-flash-image'}
            tryOnMeta={tryOnMeta}
            costumeName={currentCostumeName}
            costumeId={state.selectedCostumeId}
            destination={currentDestinationName}
            onOpenPhotocard={() => {
              if (onOpenPhotocard) {
                onOpenPhotocard({
                  portraitUrl: resultImage || state.userPhotoUrl || '',
                  costumeName: currentCostumeName,
                  seasonText: analysisResult?.season || 'Mùa Thu (Autumn)',
                  dyes: (analysisResult?.dyeList || []).map(d => ({
                    hex: d.hex,
                    nameVi: d.nameVi,
                    nameEn: d.nameEn
                  })),
                  score: analysisResult?.score ?? 100,
                  destination: currentDestinationName
                });
              }
            }}
          />
          <CulturalGuardrail alerts={analysisResult?.guardrails || []} />
        </div>
      </div>
    </section>
  );
};
