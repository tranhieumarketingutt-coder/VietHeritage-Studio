import React, { useState } from 'react';
import { DYNASTIES_TIMELINE_DATA } from '../data/dynastiesTimeline';
import { Columns2, Scissors, BookOpen, Layers } from 'lucide-react';

export interface TimelineSectionProps {
  onSelectCostume?: (costumeId: string) => void;
}

/**
 * Historical Timeline Section component detailing costume silhouette evolution across dynasties.
 */
export const TimelineSection: React.FC<TimelineSectionProps> = ({ onSelectCostume }) => {
  const [selectedDynastyId, setSelectedDynastyId] = useState<string>('ly');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareDynastyId, setCompareDynastyId] = useState<string>('nguyen');

  const selectedDynasty = DYNASTIES_TIMELINE_DATA.find(d => d.id === selectedDynastyId) || DYNASTIES_TIMELINE_DATA[0];
  const compareDynasty = DYNASTIES_TIMELINE_DATA.find(d => d.id === compareDynastyId) || DYNASTIES_TIMELINE_DATA[3];

  const handleJumpToStudio = (costumeId: string) => {
    if (onSelectCostume) {
      onSelectCostume(costumeId);
    } else {
      const target = document.getElementById('studioSection') || document.getElementById('anatomySection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="historicalTimelineSection" className="bg-white rounded-2xl border-2 border-[#D4AF37]/50 p-6 md:p-10 shadow-sm relative overflow-hidden transition-all mt-16 mb-16">
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#8B0000]/5 pointer-events-none blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#D4AF37]/10 pointer-events-none blur-3xl"></div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 border-b border-stone-200/80 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <span>⏳</span>
            <span>TRỤC THỜI GIAN TIẾN HÓA CỔ PHỤC · THẾ KỶ XI ĐẾN XXI</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            Tiến Hóa Phom Dáng Cổ Phục Qua Các Triều Đại
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl leading-relaxed">
            Chọn bất kỳ triều đại nào dưới đây để khám phá sự biến đổi phom dáng hình thể (Silhouette), cấu trúc cổ áo, ống tay và triết lý nhân sinh quan xuyên suốt 1.000 năm lịch sử Đại Việt - Việt Nam.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-y-2">
          <button 
            type="button"
            id="btnToggleTimelineCompare" 
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 border ${
              isCompareMode 
                ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md' 
                : 'bg-[#F5F1E8] hover:bg-stone-200 text-stone-800 border-[#D4AF37]/50'
            }`}
            title="Bật/tắt chế độ so sánh 2 triều đại"
            aria-pressed={isCompareMode}
          >
            <Columns2 className={`w-3.5 h-3.5 ${isCompareMode ? 'text-yellow-300' : 'text-[#8B0000]'}`} />
            <span>{isCompareMode ? 'Đóng Chế Độ So Sánh' : 'So Sánh 2 Triều Đại'}</span>
          </button>

          <button 
            type="button"
            onClick={() => handleJumpToStudio(selectedDynasty.primaryCostumeId)}
            className="timeline-jump-studio-btn px-4 py-2 bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
            title="Trải nghiệm trang phục triều đại này tại Xưởng Sáng Tạo"
          >
            <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Phối Đồ Ngay</span>
          </button>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <div className="p-2 bg-[#F7F3EB] rounded-2xl border border-[#D4AF37]/40 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DYNASTIES_TIMELINE_DATA.map((dynasty, idx) => {
              const isActive = dynasty.id === selectedDynastyId;
              return (
                <button
                  type="button"
                  key={dynasty.id}
                  onClick={() => setSelectedDynastyId(dynasty.id)}
                  aria-pressed={isActive}
                  className={`timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/40 scale-[1.02]'
                      : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[10px] font-mono mb-1 ${isActive ? 'text-yellow-300' : 'text-[#8B0000]'}`}>
                    <span className="font-bold">#{String(idx + 1).padStart(2, '0')}</span>
                    <span>{dynasty.centuryVi}</span>
                  </div>
                  <h4 className={`font-serif font-bold text-sm leading-tight truncate ${isActive ? 'text-white' : 'text-stone-900'}`}>
                    {dynasty.dynastyVi}
                  </h4>
                  <span className={`text-[10px] font-sans truncate mt-1 block ${isActive ? 'text-stone-200' : 'text-stone-500'}`}>
                    {dynasty.signatureCostumeVi}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8B0000] rotate-45 border-r border-b border-[#8B0000]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isCompareMode ? (
        <div className="space-y-6 relative z-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/40 gap-3">
            <div className="flex items-center space-x-2">
              <Columns2 className="w-4 h-4 text-[#8B0000]" />
              <span className="font-serif font-bold text-sm text-[#222222]">
                Đối Chiếu Tiến Hóa: {selectedDynasty.dynastyVi} vs {compareDynasty.dynastyVi}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-stone-600">Chọn triều đại đối chiếu:</span>
              <select
                value={compareDynastyId}
                onChange={e => setCompareDynastyId(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white font-mono text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                aria-label="Chọn triều đại so sánh thứ hai"
              >
                {DYNASTIES_TIMELINE_DATA.map(d => (
                  <option key={d.id} value={d.id} disabled={d.id === selectedDynastyId}>
                    {d.dynastyVi} ({d.centuryVi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left dynasty card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-mono text-xs font-bold">
                    {selectedDynasty.dynastyVi} · {selectedDynasty.period}
                  </span>
                  <span className="font-mono text-xs text-stone-500 font-semibold">{selectedDynasty.centuryVi}</span>
                </div>
                {selectedDynasty.imageUrl ? (
                  <div className="h-64 sm:h-72 my-4 relative rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-stone-100 shadow-inner group">
                    <img
                      src={selectedDynasty.imageUrl}
                      alt={`${selectedDynasty.dynastyVi} - ${selectedDynasty.signatureCostumeVi}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2.5 text-center">
                      <span className="text-[11px] font-mono font-medium text-white/95">
                        {selectedDynasty.dynastyVi}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 sm:h-72 my-4 flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: selectedDynasty.svgSilhouette }} />
                )}
                <h4 className="font-serif text-lg font-bold text-[#8B0000]">{selectedDynasty.signatureCostumeVi}</h4>
                <p className="text-xs text-stone-600 mt-1 italic font-serif">"{selectedDynasty.taglineVi}"</p>
                <div className="mt-3 space-y-1.5 text-xs">
                  <p><strong className="text-stone-800">Dáng hình thể:</strong> <span className="text-stone-600">{selectedDynasty.silhouetteTypeVi}</span></p>
                  <p><strong className="text-stone-800">Cổ áo:</strong> <span className="text-stone-600">{selectedDynasty.features.collarVi}</span></p>
                  <p><strong className="text-stone-800">Ống tay:</strong> <span className="text-stone-600">{selectedDynasty.features.sleevesVi}</span></p>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-800 block mb-0.5">Triết lý nhân sinh:</strong>
                <p className="leading-relaxed">{selectedDynasty.philosophyVi}</p>
              </div>
            </div>

            {/* Right dynasty card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8A6D1C]/15 text-[#8A6D1C] font-mono text-xs font-bold">
                    {compareDynasty.dynastyVi} · {compareDynasty.period}
                  </span>
                  <span className="font-mono text-xs text-stone-500 font-semibold">{compareDynasty.centuryVi}</span>
                </div>
                {compareDynasty.imageUrl ? (
                  <div className="h-64 sm:h-72 my-4 relative rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-stone-100 shadow-inner group">
                    <img
                      src={compareDynasty.imageUrl}
                      alt={`${compareDynasty.dynastyVi} - ${compareDynasty.signatureCostumeVi}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2.5 text-center">
                      <span className="text-[11px] font-mono font-medium text-white/95">
                        {compareDynasty.dynastyVi}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 sm:h-72 my-4 flex items-center justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: compareDynasty.svgSilhouette }} />
                )}
                <h4 className="font-serif text-lg font-bold text-[#8A6D1C]">{compareDynasty.signatureCostumeVi}</h4>
                <p className="text-xs text-stone-600 mt-1 italic font-serif">"{compareDynasty.taglineVi}"</p>
                <div className="mt-3 space-y-1.5 text-xs">
                  <p><strong className="text-stone-800">Dáng hình thể:</strong> <span className="text-stone-600">{compareDynasty.silhouetteTypeVi}</span></p>
                  <p><strong className="text-stone-800">Cổ áo:</strong> <span className="text-stone-600">{compareDynasty.features.collarVi}</span></p>
                  <p><strong className="text-stone-800">Ống tay:</strong> <span className="text-stone-600">{compareDynasty.features.sleevesVi}</span></p>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-800 block mb-0.5">Triết lý nhân sinh:</strong>
                <p className="leading-relaxed">{compareDynasty.philosophyVi}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 animate-fade-in">
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6] rounded-2xl border border-[#D4AF37]/40 p-5 sm:p-6 flex flex-col items-center justify-center shadow-inner relative group">
            <div className="w-full flex items-center justify-between text-xs font-mono mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000]/10 text-[#8B0000] font-bold">
                {selectedDynasty.period}
              </span>
              <span className="text-stone-600 font-medium">
                {selectedDynasty.silhouetteTypeVi}
              </span>
            </div>

            {selectedDynasty.imageUrl ? (
              <div className="w-full relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-md bg-stone-100 h-80 sm:h-96 my-1">
                <img 
                  src={selectedDynasty.imageUrl} 
                  alt={`Phục dựng cổ phục ${selectedDynasty.dynastyVi} - ${selectedDynasty.signatureCostumeVi}`} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-yellow-300 text-[10px] font-mono font-bold border border-yellow-400/40 shadow-xs">
                  ✦ {selectedDynasty.dynastyVi}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-8 text-center">
                  <span className="text-xs font-medium text-white drop-shadow-sm font-sans block">
                    {selectedDynasty.signatureCostumeVi}
                  </span>
                </div>
              </div>
            ) : (
              <div 
                className="w-full max-w-[260px] h-72 sm:h-80 flex items-center justify-center py-2 transition-transform duration-500 group-hover:scale-105"
                dangerouslySetInnerHTML={{ __html: selectedDynasty.svgSilhouette }}
              />
            )}

            <div className="w-full text-center mt-3 pt-3 border-t border-stone-200">
              <span className="text-xs font-mono font-bold text-[#8B0000] uppercase block">
                Bản Vẽ Silhouette Phục Dựng
              </span>
              <span className="text-[11px] text-stone-500 font-sans mt-0.5 block">
                {selectedDynasty.archeologySourceVi}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-white font-mono text-xs font-bold">
                  {selectedDynasty.dynastyVi}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#8A6D1C] font-mono text-xs font-bold border border-[#D4AF37]/40">
                  {selectedDynasty.centuryVi}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222] mt-1">
                {selectedDynasty.signatureCostumeVi}
              </h3>
              <p className="text-sm font-serif text-[#8B0000] italic mt-1 leading-relaxed">
                "{selectedDynasty.taglineVi}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-[#8B0000] uppercase text-[10px] block">✦ Cấu Trúc Cổ Áo:</span>
                <p className="text-stone-700 leading-relaxed font-sans">{selectedDynasty.features.collarVi}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-[#8B0000] uppercase text-[10px] block">✦ Đặc Trưng Ống Tay:</span>
                <p className="text-stone-700 leading-relaxed font-sans">{selectedDynasty.features.sleevesVi}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-[#8A6D1C] uppercase text-[10px] block">✦ Vạt Áo & Tà Thắt:</span>
                <p className="text-stone-700 leading-relaxed font-sans">{selectedDynasty.features.hemlineVi}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-[#8A6D1C] uppercase text-[10px] block">✦ Mấn Mũ & Khăn Vấn:</span>
                <p className="text-stone-700 leading-relaxed font-sans">{selectedDynasty.features.hairAccessoryVi}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-1.5 text-xs">
              <span className="font-mono font-bold text-[#8B0000] uppercase text-[11px] flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Triết Lý Nhân Sinh & Tinh Thần Thời Đại</span>
              </span>
              <p className="text-stone-700 leading-relaxed font-sans text-xs">
                {selectedDynasty.philosophyVi}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-stone-500 border-t border-stone-200">
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Nguồn khảo cổ:</span>
                <strong className="text-stone-700 truncate max-w-[260px] sm:max-w-md">{selectedDynasty.archeologySourceVi}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
