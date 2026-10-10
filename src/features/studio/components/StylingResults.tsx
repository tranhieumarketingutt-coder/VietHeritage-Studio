import React from 'react';
// @ts-ignore
import { COSTUMES_DATA } from '../../../costumes.js';
import { GuardrailItem } from '../../../shared/lib/guardrails';

export interface AnalysisResult {
  score?: number;
  season?: string;
  descriptionVi?: string;
  descriptionEn?: string;
  paletteSuggestions?: string;
  recommendedCostume?: string;
  dyeList?: Array<{ hex: string; nameEn: string; nameVi: string; descEn: string; descVi: string }>;
  bodyAdviceVi?: string;
  bodyAdviceEn?: string;
  contextLookbook?: {
    outfitTitle: string;
    outfitDesc: string;
    hairStyle: string;
    makeupStyle: string;
    accessories?: string[];
  };
  guardrails?: GuardrailItem[];
}

export interface StylingResultsProps {
  analysis: AnalysisResult | null;
  resultImage: string | null;
  isAnalyzing: boolean;
  tryOnModel: string;
}

export const StylingResults: React.FC<StylingResultsProps> = ({ analysis, resultImage, isAnalyzing, tryOnModel }) => {
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-[#D4AF37] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full border-4 border-[#8B0000] border-t-transparent animate-spin"></div>
        <div className="space-y-1.5 max-w-md">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Engine: {tryOnModel} · Google AI Studio</span>
          </div>
          <p className="font-mono text-sm text-[#8B0000] font-bold">
            ✦ {isEn ? 'Analyzing appearance & generating...' : 'Đang phân tích diện mạo & kết xuất...'}
          </p>
        </div>
      </div>
    );
  }

  if (!analysis && !resultImage) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-8 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-mono font-bold text-[#8B0000] tracking-wider uppercase">✦ LOOKBOOK ARCHIVE</span>
          <h3 className="font-serif text-2xl font-bold text-[#222222] mt-0.5">
            Áo Ngũ Thân - Sĩ Tử Kinh Kỳ
          </h3>
        </div>
        {analysis?.score && (
          <div className="px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
            Cultural Score: {analysis.score}%
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start bg-[#FAF7F2] rounded-xl p-5 md:p-6 border border-stone-200">
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-[340px] rounded-2xl bg-white border-4 border-white shadow-xl p-3 flex flex-col items-center justify-between transition-all hover:shadow-2xl">
            <div className="w-full h-80 sm:h-96 flex items-center justify-center overflow-hidden rounded-xl bg-stone-900 relative group">
              <img 
                src={resultImage || COSTUMES_DATA[0].realPhotography?.heroPhoto} 
                alt="Styling Result" 
                className="w-full h-full object-cover filter brightness-95 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-mono border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{tryOnModel}</span>
              </div>
            </div>
            <div className="w-full text-center border-t border-stone-100 pt-2 flex items-center justify-between px-2 mt-2">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-tight truncate max-w-[150px]">VietHeritage Editorial</span>
              <span className="text-[10px] font-mono text-[#8B0000] font-bold">1744·2026</span>
            </div>
          </div>
        </div>

        {analysis && (
          <div className="md:col-span-7 space-y-3 text-xs">
            <div>
              <span className="font-mono font-bold text-[#8B0000] uppercase text-[10px] tracking-wide">✦ Chẩn Đoán Sắc Tố Cá Nhân:</span>
              <p className="font-serif font-bold text-base text-[#222222]">{analysis.season}</p>
              <p className="text-stone-600 mt-0.5 leading-relaxed text-[11px]">{isEn ? analysis.descriptionEn : analysis.descriptionVi}</p>
              <div className="mt-1 p-2 rounded-lg bg-white border border-stone-200">
                <span className="font-mono text-[10px] text-stone-500 block mb-0.5">Gợi ý bảng màu:</span>
                <p className="font-mono font-medium text-[#8B0000] text-[11px]">{analysis.paletteSuggestions}</p>
              </div>
            </div>

            <div>
              <span className="font-mono font-bold text-[#D4AF37] uppercase text-[10px] tracking-wide">✦ Cổ Phục Đề Xuất Theo Mùa:</span>
              <p className="font-serif font-bold text-xs text-[#222222] mt-0.5">{analysis.recommendedCostume}</p>
            </div>

            {analysis.dyeList && (
              <div>
                <span className="font-mono text-stone-500 uppercase text-[10px]">Màu Nhuộm Truyền Thống:</span>
                <div className="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                  {analysis.dyeList.map((dye: { hex: string; nameEn: string; nameVi: string; descEn: string; descVi: string }) => (
                    <div key={dye.hex} className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-200" title={isEn ? dye.descEn : dye.descVi}>
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dye.hex }}></span>
                      <span className="text-[10px] font-mono">{isEn ? dye.nameEn : dye.nameVi}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="font-mono text-stone-500 uppercase text-[10px]">Kỹ Thuật May Đo & Form Dáng:</span>
              <p className="text-stone-600 text-[11px] leading-relaxed mt-0.5">
                {isEn ? analysis.bodyAdviceEn : analysis.bodyAdviceVi}
              </p>
            </div>
          </div>
        )}
      </div>

      {analysis?.contextLookbook && (
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
            <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wide flex items-center space-x-1.5">
              <span>Tư Vấn Phối Đồ Theo Ngữ Cảnh</span>
            </span>
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-[#222222]">{analysis.contextLookbook.outfitTitle}</h4>
            <p className="text-xs text-[#666666] mt-0.5 leading-relaxed">{analysis.contextLookbook.outfitDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-white p-3 rounded-lg border border-stone-200">
              <span className="font-mono font-bold text-[#8B0000] text-[10px] uppercase block mb-1">💄 Kiểu Tóc & Trang Điểm:</span>
              <p className="text-stone-700 text-[11px] leading-relaxed">
                Tóc: {analysis.contextLookbook.hairStyle}.<br/>
                Makeup: {analysis.contextLookbook.makeupStyle}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-stone-200">
              <span className="font-mono font-bold text-[#D4AF37] text-[10px] uppercase block mb-1">✨ Phụ Kiện Đi Kèm:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {analysis.contextLookbook.accessories?.map((acc: string) => (
                  <span key={acc} className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono">{acc}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
