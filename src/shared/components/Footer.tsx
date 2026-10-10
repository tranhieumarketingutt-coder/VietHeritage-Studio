import React from 'react';

export interface FooterProps {}

/**
 * Footer component for the application.
 */
export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#222222] text-[#FAF7F2] border-t border-[#D4AF37]/40 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded bg-[#8B0000] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg border border-[#D4AF37]">V</span>
            <span className="font-serif font-bold text-xl text-[#FAF7F2]">VietHeritage Remix</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Nền tảng đồng sáng tạo cổ phục Việt Nam cho thế hệ Z. Cầu nối số hóa chuẩn sử, phối màu thông minh và tôn vinh bản sắc dân tộc.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">Tư Liệu Di Sản</h4>
          <ul className="text-xs text-stone-300 space-y-2 font-mono">
            <li><a href="https://www.youtube.com/watch?v=2G8125IkyjE" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">✦ Thước phim Áo Ngũ Thân 1744</a></li>
            <li><a href="https://maps.google.com/?q=Bảo+tàng+Áo+Dài,+Hồ+Chí+Minh" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">✦ Tọa độ Bảo Tàng Áo Dài</a></li>
            <li><span>✦ Khâm Định Đại Nam Hội Điển Sự Lệ</span></li>
            <li><span>✦ Điển chế phục trang Triều Nguyễn</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">Tính Năng Cốt Lõi</h4>
          <ul className="text-xs text-stone-300 space-y-2 font-mono">
            <li><span>✦ 2D Layered Anatomy Flaps</span></li>
            <li><span>✦ Personal Color & Dyes Engine</span></li>
            <li><span>✦ Cultural Guardrail Score</span></li>
            <li><span>✦ Gemini Live Cultural Stylist</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">Đạo Lý & Bản Quyền</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Dự án nghiên cứu & ứng dụng phi lợi nhuận hướng tới bảo tồn văn hóa. Tôn trọng triết lý Nho giáo: Ngũ Thường, Ngũ Luân và Tứ Thân Phụ Mẫu.
          </p>
          <div className="mt-3 text-[11px] font-mono text-[#D4AF37]">
            © 2026 VietHeritage Remix · Indochine High-Fashion Editorial
          </div>
        </div>
      </div>
    </footer>
  );
};
