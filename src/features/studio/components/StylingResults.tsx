import React from 'react';
import { Palette } from 'lucide-react';
// @ts-ignore
import { COSTUMES_DATA } from '../../../costumes.js';
import { GuardrailItem } from '../../../shared/lib/guardrails';
import { storageHelper } from '../../../shared/lib/storage';

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
  expertAdvice?: string;
}

export interface TryOnMeta {
  isLive: boolean;
  model: string;
  notes?: string;
  error?: string;
}

export interface StylingResultsProps {
  analysis: AnalysisResult | null;
  resultImage: string | null;
  isAnalyzing: boolean;
  tryOnModel: string;
  tryOnMeta?: TryOnMeta | null;
  costumeName?: string;
  costumeId?: string;
  destination?: string;
  onOpenPhotocard?: () => void;
  onSaveWardrobeSuccess?: () => void;
  onPublishCommunitySuccess?: () => void;
}

const ROTATING_TRY_ON_STEPS = [
  {
    title: '✦ Đang phân tích diện mạo, nét mặt & thần thái từ ảnh chân dung...',
    subtitle: 'Trích xuất đặc điểm nhân trắc học và cấu trúc ngũ quan người mặc...'
  },
  {
    title: '✦ Đang truyền tải dữ liệu & kết nối model gemini-3.1-flash-image...',
    subtitle: 'Khởi tạo kênh truyền bảo mật tới Google AI Studio...'
  },
  {
    title: '✦ Đang dệt phom dáng cổ phục theo chuẩn Điển chế 1744...',
    subtitle: 'Áp dụng cổ lập lĩnh, 5 khuy nữu và hoa văn truyền thống...'
  },
  {
    title: '✦ Đang kết xuất ảnh Editorial Lookbook 4K siêu thực...',
    subtitle: 'Khử nhiễu, phối màu ánh sáng di sản và hoàn tất bức ảnh...'
  }
];

export const StylingResults: React.FC<StylingResultsProps> = ({
  analysis,
  resultImage,
  isAnalyzing,
  tryOnModel,
  tryOnMeta,
  costumeName = 'Áo Ngũ Thân Tay Chẽn',
  costumeId = 'ngu-than',
  destination = 'Hoàng Thành Thăng Long',
  onOpenPhotocard,
  onSaveWardrobeSuccess,
  onPublishCommunitySuccess
}) => {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [stepIndex, setStepIndex] = React.useState(0);
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  React.useEffect(() => {
    if (!isAnalyzing) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex(prev => (prev + 1) % ROTATING_TRY_ON_STEPS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  if (isAnalyzing) {
    const currentStep = ROTATING_TRY_ON_STEPS[stepIndex];
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-[#D4AF37] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full border-4 border-[#8B0000] border-t-transparent animate-spin"></div>
        <div className="space-y-1.5 max-w-md">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Engine: {tryOnModel} · Google AI Studio</span>
          </div>
          <p className="font-mono text-sm text-[#8B0000] font-bold">
            {currentStep.title}
          </p>
          <p className="text-xs text-stone-500 font-sans">
            {currentStep.subtitle}
          </p>
        </div>
        <div className="w-64 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#8B0000] to-[#D4AF37] animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!analysis && !resultImage) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-[#D4AF37]/60 p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs h-full min-h-[500px]">
        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B0000]">
          <Palette className="w-6 h-6" />
        </div>
        <h4 className="font-serif text-lg font-bold text-[#222222]">
          {isEn ? 'Personal Palette & Heritage Styling Studio' : 'Không Gian Phối Màu & Điển Chế Phục Trang'}
        </h4>
        <p className="text-xs text-stone-600 max-w-md leading-relaxed">
          {isEn
            ? 'Select a traditional garment above, set your destination or upload a portrait, and run styling analysis to receive customized silhouette harmony and canonical guidance.'
            : 'Hãy chọn một dáng cổ phục bên trên, thiết lập điểm đến hoặc tải chân dung và kích hoạt phân tích để nhận chẩn đoán sắc tố cá nhân và tư vấn may đo chuẩn sử.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D4AF37]/40 p-5 md:p-6 shadow-md space-y-5 flex flex-col justify-between flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-mono font-bold text-[#8B0000] tracking-wider uppercase">✦ LOOKBOOK ARCHIVE</span>
          <h3 className="font-serif text-2xl font-bold text-[#222222] mt-0.5">
            {costumeName}
          </h3>
        </div>
        {analysis?.score && (
          <div className="px-3 py-1.5 rounded-full font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
            Cultural Score: {analysis.score}%
          </div>
        )}
      </div>

      {tryOnMeta && (
        <div 
          role="status" 
          aria-live="polite"
          className={`p-3.5 rounded-xl border text-xs font-mono flex items-start space-x-2.5 ${
            tryOnMeta.isLive 
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900' 
              : 'bg-amber-50/90 border-amber-300 text-amber-900'
          }`}
        >
          <span className="text-base shrink-0 leading-none mt-0.5">
            {tryOnMeta.isLive ? '✨' : '🏛️'}
          </span>
          <div className="space-y-0.5 text-left">
            <p className="font-bold">
              {tryOnMeta.isLive
                ? `AI Sinh Thành Công: Bức ảnh được tạo lập trực tiếp từ model ${tryOnMeta.model} trên Google AI Studio.`
                : (tryOnMeta.error ? `Lưu ý: ${tryOnMeta.error}` : 'Ảnh Mẫu Di Sản (Chế độ đối chiếu chuẩn sử)')}
            </p>
            {tryOnMeta.notes && (
              <p className="text-[11px] opacity-90">{tryOnMeta.notes}</p>
            )}
          </div>
        </div>
      )}

      {/* Hàng trên: Khung ảnh kết quả phóng to (Trái) & Tư vấn phối đồ theo ngữ cảnh (Phải) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-stone-200">
        {/* Khung ảnh kết quả phóng to */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-[340px] sm:max-w-none rounded-2xl bg-white border-4 border-white shadow-xl p-3 flex flex-col items-center justify-between transition-all hover:shadow-2xl h-full">
            <div className="w-full h-88 sm:h-[400px] md:h-[430px] flex items-center justify-center overflow-hidden rounded-xl bg-stone-900 relative group">
              <img 
                src={resultImage || COSTUMES_DATA.find((c: { id: string }) => c.id === costumeId)?.realPhotography?.heroPhoto || COSTUMES_DATA[0].realPhotography?.heroPhoto} 
                alt="Styling Result" 
                className="w-full h-full object-cover filter brightness-95 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-mono border border-white/20">
                <span className={`w-2 h-2 rounded-full ${tryOnMeta?.isLive ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></span>
                <span>{tryOnMeta?.isLive ? `✨ AI Live (${tryOnModel})` : (tryOnModel || 'Ảnh Mẫu Di Sản')}</span>
              </div>
            </div>
            <div className="w-full text-center border-t border-stone-100 pt-2 flex items-center justify-between px-2 mt-2">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-tight truncate max-w-[150px]">VietHeritage Editorial</span>
              <span className="text-[10px] font-mono text-[#8B0000] font-bold">1744·2026</span>
            </div>
          </div>
        </div>

        {/* Tư vấn phối đồ theo ngữ cảnh (chuyển sang bên phải) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3.5 p-1 sm:p-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
              <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wide flex items-center space-x-1.5">
                <span>✦ Tư Vấn Phối Đồ Theo Ngữ Cảnh</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono text-[10px] font-bold border border-[#8B0000]/20">
                {destination}
              </span>
            </div>

            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#222222]">
                {analysis?.contextLookbook?.outfitTitle || `Phối Cổ Phục ${costumeName}`}
              </h4>
              <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                {analysis?.contextLookbook?.outfitDesc || 'Hòa quyện giữa đường nét trang trọng truyền thống và tinh thần đương đại khi dạo bước tại không gian di sản.'}
              </p>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs">
                <span className="font-mono font-bold text-[#8B0000] text-[10px] uppercase block mb-1">💄 Kiểu Tóc & Trang Điểm:</span>
                <p className="text-stone-700 text-[11px] leading-relaxed">
                  Tóc: {analysis?.contextLookbook?.hairStyle || 'Tóc tết buông lơi tự nhiên cài trâm bạc'}.<br/>
                  Makeup: {analysis?.contextLookbook?.makeupStyle || 'Tone cam đào / hồng đất nhẹ nhàng'}.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-2xs">
                <span className="font-mono font-bold text-[#8A6D1C] text-[10px] uppercase block mb-1">✨ Phụ Kiện Đi Kèm:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(analysis?.contextLookbook?.accessories || ['Khăn lụa gấm', 'Kiềng bạc mảnh', 'Túi cói vintage', 'Guốc mộc']).map((acc: string) => (
                    <span key={acc} className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono text-stone-800">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {analysis?.expertAdvice && (
            <div className="p-3 rounded-xl bg-white border border-[#D4AF37]/50 shadow-2xs space-y-1">
              <span className="font-mono text-[10px] text-[#8B0000] font-bold block uppercase tracking-wide">
                ✦ Cố Vấn Phong Cách Gemini AI:
              </span>
              <p className="text-stone-700 text-[11px] leading-relaxed whitespace-pre-line font-sans">
                {analysis.expertAdvice}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hàng dưới: Chẩn đoán sắc tố cá nhân & May đo điển chế (chuyển xuống dưới) */}
      {analysis && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/35 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/80 pb-2 gap-1">
            <div>
              <span className="font-mono font-bold text-[#8B0000] uppercase text-[10px] tracking-wide block">
                ✦ Chẩn Đoán Sắc Tố Cá Nhân
              </span>
              <h4 className="font-serif font-bold text-base text-[#222222] mt-0.5">
                {analysis.season}
              </h4>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed max-w-md">
              {isEn ? analysis.descriptionEn : analysis.descriptionVi}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs space-y-1">
              <span className="font-mono text-[10px] text-stone-600 font-semibold block mb-0.5">Gợi ý bảng màu:</span>
              <p className="font-mono font-bold text-[#8B0000] text-xs">{analysis.paletteSuggestions}</p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs space-y-1">
              <span className="font-mono font-bold text-[#8A6D1C] uppercase text-[10px] block mb-0.5">✦ Cổ Phục Đề Xuất Theo Mùa:</span>
              <p className="font-serif font-bold text-xs text-[#222222] mt-0.5 truncate">{analysis.recommendedCostume}</p>
              {analysis.dyeList && (
                <div className="flex items-center space-x-1 mt-1 flex-wrap gap-1">
                  {analysis.dyeList.map((dye: { hex: string; nameEn: string; nameVi: string; descEn: string; descVi: string }) => (
                    <div key={dye.hex} className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-stone-200" title={isEn ? dye.descEn : dye.descVi}>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: dye.hex }}></span>
                      <span className="text-[9px] font-mono">{isEn ? dye.nameEn : dye.nameVi}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs space-y-1">
              <span className="font-mono text-stone-600 font-semibold uppercase text-[10px] block mb-0.5">Kỹ Thuật May Đo & Form Dáng:</span>
              <p className="text-stone-600 text-[11px] leading-relaxed line-clamp-3">
                {isEn ? analysis.bodyAdviceEn : analysis.bodyAdviceVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center space-x-2 animate-fade-in">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={() => {
            storageHelper.saveToWardrobe({
              id: `wardrobe-${Date.now()}`,
              costumeId,
              costumeName,
              destination,
              date: isEn ? 'Today' : 'Hôm nay',
              photoUrl: resultImage || COSTUMES_DATA[0].realPhotography?.heroPhoto || '',
              score: analysis?.score ?? 100,
              season: analysis?.season || ''
            });
            setToastMessage(isEn ? 'Saved to Heritage Wardrobe!' : 'Đã lưu thành công vào Tủ Đồ Di Sản!');
            setTimeout(() => setToastMessage(null), 3000);
            if (onSaveWardrobeSuccess) onSaveWardrobeSuccess();
          }}
          className="flex-1 py-2.5 px-3 rounded-xl border border-[#D4AF37] bg-white hover:bg-[#FAF7F2] text-[#8B0000] text-xs font-bold font-mono transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
        >
          <svg className="w-4 h-4 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>{isEn ? 'Save to Heritage Wardrobe' : 'Lưu vào Tủ Đồ Di Sản'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenPhotocard) {
              onOpenPhotocard();
            }
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#8B0000] hover:bg-red-800 text-white text-xs font-bold font-mono transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#8B0000]"
        >
          <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{isEn ? 'Create Cultural Envoy Card' : 'Tạo Thẻ Sứ Giả Di Sản'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const user = storageHelper.getUser();
            storageHelper.saveCommunityLook({
              id: `look-user-${Date.now()}`,
              author: user.name || 'Gen Z Co-Creator',
              titleVi: `${costumeName} - Phong Cách Hoàng Thành Thăng Long`,
              titleEn: `${costumeName} - Imperial Heritage Style`,
              costumeId,
              costumeName,
              destination,
              score: analysis?.score ?? 100,
              likes: 1,
              date: isEn ? 'Just now' : 'Vừa xong',
              photoUrl: resultImage || COSTUMES_DATA[0].realPhotography?.heroPhoto || '',
              accentHex: '#8B0000',
              tags: ['#VietHeritageRemix', '#GenZHeritage', `#${costumeId}`]
            });
            setToastMessage(isEn ? 'Published to Community Museum!' : 'Đã đưa thành công vào Bảo Tàng Cộng Đồng!');
            setTimeout(() => setToastMessage(null), 3000);
            if (onPublishCommunitySuccess) onPublishCommunitySuccess();
          }}
          className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 hover:border-[#D4AF37] bg-white text-[#222222] text-xs font-bold font-mono transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
        >
          <svg className="w-4 h-4 text-[#8B0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{isEn ? 'Publish to Community Museum' : 'Đưa Vào Bảo Tàng Cộng Đồng'}</span>
        </button>
      </div>
    </div>
  );
};
