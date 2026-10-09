# 🌸 VietHeritage Remix - Gen Z Heritage Co-Creation Platform

> **Nền tảng Đồng Sáng Tạo Cổ Phục Việt Nam Cho Thế Hệ Z (Indochine High-Fashion Editorial 2026)**  
> Cầu nối số hóa thế hệ trẻ và di sản trang phục truyền thống: Phục dựng chuẩn xác · Phối đồ thấu đáo · Tôn vinh cội nguồn dân tộc.

---

## 🌟 Tính Năng Nổi Bật

### 🏛️ HUB 1: BẢO TÀNG DI SẢN SỐ (Heritage Museum)
- **Bóc tách 2D Anatomy Flaps**: Khám phá cấu trúc đa lớp của các dòng cổ phục tinh hoa: Áo Ngũ Thân (1744), Áo Nhật Bình triều Nguyễn, Áo Giao Lĩnh, Áo Tứ Thân Kinh Bắc, Áo Bà Ba Nam Bộ, Áo Dài tân thời.
- **Tư liệu Lịch sử & Điển chế**: Triết lý Nho giáo (Ngũ Thường, Ngũ Luân, Tứ Thân Phụ Mẫu, đường sống lưng trung phùng, 5 khuy nữu lập lĩnh).
- **Bản đồ Di sản & Không gian Văn hóa**: Tích hợp Leaflet.js khẳng định trọn vẹn chủ quyền 2 quần đảo **Hoàng Sa (Đà Nẵng)** và **Trường Sa (Khánh Hòa)** cùng các tọa độ di tích, bảo tàng và dịch vụ cho thuê uy tín tại Hà Nội, Huế, Hội An, TP.HCM.
- **Âm thanh Đàn Tranh Ngũ Cung (Web Audio Synthesizer)**: Nhạc cụ mô phỏng điệu Bắc & Nam (thang âm ngũ cung C4 - F5) phát nền thư giãn.

### 🎨 HUB 2: AI CO-CREATOR & V-STUDIO
- **AI Personal Color & Styling Engine**: Phân tích sắc thái da 4 Mùa (Spring, Summer, Autumn, Winter) tối ưu cho tông da người Việt.
- **Phối đồ theo ngữ cảnh**: Tự động gợi ý bản phối phù hợp với điểm đến (Hoàng thành Thăng Long, Cố đô Huế, Phố cổ Hội An...) và điều kiện thời tiết.
- **Cultural Guardrail Score**: Hệ thống chấm điểm rào chắn văn hóa, ngăn chặn lỗi mặc phản cảm hoặc sai lệch điển chế.
- **Xuất Thẻ Phối Đồ Polaroid**: Tạo ảnh lookbook chất lượng cao kèm trích dẫn văn hóa và chữ ký người sáng tạo.
- **Bảo Tàng Sáng Tạo Cộng Đồng**: Lưu trữ, chia sẻ và tính năng Remix bản phối của cộng đồng Gen Z.

### 🤖 TRỢ LÝ CỔ PHỤC AI (Gemini Live Cultural Stylist)
- Tích hợp trực tiếp mô hình **Google Gemini 2.5 Flash** qua SDK `@google/genai`.
- Tư vấn 24/7 về lịch sử, triết lý may đo, kiểu tóc, cách phối phụ kiện hiện đại (kính râm đồi mồi, sneakers trắng, kiềng bạc hoa sen).
- **Cơ chế hoạt động linh hoạt**:
  - Khi có `GEMINI_API_KEY`: Gọi trực tiếp Gemini AI thông minh trong thời gian thực.
  - Khi chưa có key hoặc offline: Tự động chuyển sang Chế độ Dữ liệu Chuẩn sử (Offline Curated Mode) mượt mà, không bao giờ bị đơ hay báo lỗi.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Tiên Quyết
- **Node.js** phiên bản 18+ (khuyến nghị Node 20 hoặc 22).
- Trình quản lý gói `npm`.

### Bước 1: Cài đặt gói phụ thuộc
```bash
npm install
```

### Bước 2: Cấu hình Khóa Gemini API (Tùy chọn)
Tạo hoặc mở file [.env.local](.env.local) và điền khóa API:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
PORT=3000
```
> 💡 *Bạn có thể lấy khóa API Gemini hoàn toàn miễn phí tại [Google AI Studio](https://aistudio.google.com/app/apikey).*  
> *(Nếu bỏ trống, ứng dụng vẫn chạy 100% đầy đủ tính năng với cơ sở dữ liệu mẫu chuẩn sử tích hợp sẵn!)*

### Bước 3: Khởi chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: **http://localhost:3000**

---

## 📦 Các Kịch Bản Lệnh (Scripts)

| Lệnh | Chức năng |
| :--- | :--- |
| `npm run dev` | Khởi chạy Vite dev server với API proxy Gemini AI tích hợp tại cổng 3000 |
| `npm run build` | Đóng gói mã nguồn production tối ưu vào thư mục `dist/` |
| `npm run preview` | Xem trước bản build production thông qua Vite preview server |
| `npm run server` | Chạy Backend Express (`server.ts`) phục vụ cả API và static frontend |
| `npm run lint` | Kiểm tra tính đúng đắn của TypeScript (`tsc --noEmit`) |
| `npm run clean` | Dọn dẹp thư mục `dist/` đa nền tảng (hỗ trợ Windows, macOS, Linux) |

---

## 📁 Cấu Trúc Dự Án

```
├── .env.local             # Cấu hình khóa API Gemini và cổng
├── index.html             # Trang giao diện chính với kiểu chữ Be Vietnam Pro & Leaflet
├── package.json           # Khai báo dependencies và scripts
├── tsconfig.json          # Cấu hình TypeScript
├── vite.config.ts         # Cấu hình Vite & API Middleware cho Gemini
├── server.ts              # Express Server phục vụ production và Gemini API
├── public/                # Tài nguyên tĩnh & bản đồ SVG chuẩn chủ quyền
│   ├── vietnam_heritage_map.svg
│   └── vietnam_map.svg
└── src/
    ├── app.js             # Bộ điều khiển giao diện & tương tác chính (SPA Controller)
    ├── geminiService.ts   # Xử lý kết nối Google Gemini AI (@google/genai)
    ├── costumes.js        # Cơ sở dữ liệu cổ phục, tọa độ di sản & bản đồ
    ├── anatomyData.js     # Dữ liệu bóc tách lớp áo 2D Anatomy
    ├── heritageLogic.js   # Thuật toán Personal Color, Guardrail & Web Audio Đàn Tranh
    ├── timelineData.js    # Niên đại lịch sử các triều đại (Lý, Trần, Lê, Nguyễn...)
    ├── wisdomData.js      # Trích dẫn triết lý & thành ngữ cổ phục
    └── index.css          # Cấu hình Tailwind CSS
```

---

## 📜 Bản Quyền & Triết Lý
Dự án được xây dựng với tinh thần phi lợi nhuận hướng tới việc bảo tồn và tôn vinh di sản văn hóa Việt Nam trong kỷ nguyên số.
Mọi chi tiết trang phục tuân thủ các tài liệu lịch sử uy tín: *Khâm Định Đại Nam Hội Điển Sự Lệ*, tư liệu Viện Viễn Đông Bác Cổ (EFEO) và các nghiên cứu phục dựng cổ phục chuẩn xác.
