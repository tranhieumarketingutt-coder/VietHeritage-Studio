import React from 'react';

export interface TimelineSectionProps {}

/**
 * Historical Timeline Section component.
 */
export const TimelineSection: React.FC<TimelineSectionProps> = () => {
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
            id="btnToggleTimelineCompare" 
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 bg-[#F5F1E8] hover:bg-stone-200 text-stone-800 border border-[#D4AF37]/50"
            title="Bật/tắt chế độ so sánh 2 triều đại"
          >
            <i data-lucide="columns-2" className="w-3.5 h-3.5 text-[#8B0000]"></i>
            <span>So Sánh 2 Triều Đại</span>
          </button>

          <button 
            className="timeline-jump-studio-btn px-4 py-2 bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <i data-lucide="sparkles" className="w-3.5 h-3.5 text-[#D4AF37]"></i>
            <span>Phối Đồ Ngay</span>
          </button>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <div className="p-2 bg-[#F7F3EB] rounded-2xl border border-[#D4AF37]/40 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            
            <button className="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#8B0000]">
                <span className="font-bold">#01</span>
                <span>Thế kỷ 11-13</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight truncate">
                Triều Lý
              </h4>
              <span className="text-[10px] font-sans truncate mt-1 block text-stone-500">
                Viên Lĩnh / Giao Lĩnh Thụ Cáp
              </span>
            </button>

            <button className="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between bg-[#8B0000] text-white shadow-md ring-2 ring-[#8B0000]/40 scale-[1.02]">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-yellow-300">
                <span className="font-bold">#02</span>
                <span>Thế kỷ 13-15</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-white leading-tight truncate">
                Triều Trần
              </h4>
              <span className="text-[10px] font-sans truncate mt-1 block text-stone-200">
                Giao Lĩnh Thâm Y
              </span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8B0000] rotate-45 border-r border-b border-[#8B0000]"></div>
            </button>

            <button className="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#8B0000]">
                <span className="font-bold">#03</span>
                <span>Thế kỷ 15-18</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight truncate">
                Triều Lê Trung Hưng
              </h4>
              <span className="text-[10px] font-sans truncate mt-1 block text-stone-500">
                Giao Lĩnh Bổ Tử
              </span>
            </button>
            
            <button className="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#8B0000]">
                <span className="font-bold">#04</span>
                <span>Thế kỷ 19-20</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight truncate">
                Triều Nguyễn
              </h4>
              <span className="text-[10px] font-sans truncate mt-1 block text-stone-500">
                Áo Ngũ Thân
              </span>
            </button>

            <button className="timeline-milestone-btn p-3 rounded-xl transition-all cursor-pointer text-left relative flex flex-col justify-between bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#D4AF37]">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-[#8B0000]">
                <span className="font-bold">#05</span>
                <span>Thế kỷ 20-21</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight truncate">
                Thời Hiện Đại
              </h4>
              <span className="text-[10px] font-sans truncate mt-1 block text-stone-500">
                Áo Dài Tân Thời
              </span>
            </button>

          </div>
        </div>
      </div>

    </section>
  );
};
