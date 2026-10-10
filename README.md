# 🌸 VietHeritage Remix - Gen Z Heritage Co-Creation Platform

> **Nền tảng Đồng Sáng Tạo Cổ Phục Việt Nam Cho Thế Hệ Z (Indochine High-Fashion Editorial 2026)**  
> Cầu nối số hóa thế hệ trẻ và di sản trang phục truyền thống: Phục dựng chuẩn xác · Phối đồ thấu đáo · Tôn vinh cội nguồn dân tộc.

---

## 🌟 Tính Năng Nổi Bật

### 🏛️ HUB 1: BẢO TÀNG DI SẢN SỐ (Heritage Museum)
- **Bóc tách 2D Anatomy Flaps**: Khám phá cấu trúc đa lớp của các dòng cổ phục tinh hoa: Áo Ngũ Thân (1744), Áo Nhật Bình triều Nguyễn, Áo Giao Lĩnh, Áo Tứ Thân Kinh Bắc, Áo Bà Ba Nam Bộ, Áo Dài tân thời.
- **Tư liệu Lịch sử & Điển chế**: Triết lý Nho giáo (Ngũ Thường, Ngũ Luân, Tứ Thân Phụ Mẫu, đường sống lưng trung phùng, 5 khuy nữu lập lĩnh).
- **Bản đồ Di sản & Không gian Văn hóa**: Tích hợp Leaflet.js khẳng định trọn vẹn chủ quyền 2 quần đảo **Hoàng Sa (Đà Nẵng)** và **Trường Sa (Khánh Hòa)** cùng các tọa độ di tích, bảo tàng và dịch vụ cho thuê uy tín tại Hà Nội, Huế, Hội An, TP.HCM.
- **Âm thanh Đàn Tranh Ngũ Cung (Web Audio Synthesizer)**: Nhạc cụ mô phỏng điệu Bắc & Nam (thang âm ngũ cung C4 - F5) sử dụng bộ dao động sóng tam giác và ADSR envelope phát nền thư giãn hoàn toàn bằng trình duyệt, không cần tải file âm thanh ngoài.

### 🎨 HUB 2: AI CO-CREATOR & V-STUDIO
- **AI Personal Color & Styling Engine**: Phân tích sắc thái da 4 Mùa (Spring, Summer, Autumn, Winter) tối ưu cho tông da người Việt kết hợp bảng màu nhuộm tự nhiên (Củ Nâu, Hoàng Đằng, Chàm, Son).
- **Phối đồ theo ngữ cảnh**: Tự động gợi ý bản phối phù hợp với điểm đến (Hoàng thành Thăng Long, Cố đô Huế, Phố cổ Hội An...) và điều kiện thời tiết.
- **Cultural Guardrail Score**: Hệ thống chấm điểm rào chắn văn hóa thời gian thực, phát hiện và ngăn chặn lỗi mặc phản cảm hoặc sai lệch điển chế (như vạt Tả Nhậm tang lễ hay phối quần ngắn với cổ phục).
- **Xuất Thẻ Phối Đồ Editorial (1200x1800 PNG)**: Kết xuất thẻ lookbook độ phân giải cao bằng HTML5 Canvas với đầy đủ thông số trang phục, điểm chuẩn văn hóa, mã màu truyền thống và trích dẫn văn hóa.
- **Bảo Tàng Sáng Tạo Cộng Đồng**: Lưu trữ, chia sẻ và tính năng Remix bản phối của cộng đồng Gen Z.

### 🤖 TRỢ LÝ CỔ PHỤC AI (Gemini Live Cultural Stylist)
- Tích hợp mô hình **Google Gemini 2.5 Flash** qua SDK chính thức `@google/genai`.
- Tư vấn 24/7 về lịch sử, triết lý may đo, kiểu tóc, cách phối phụ kiện đương đại (kính râm đồi mồi, sneakers trắng, kiềng bạc hoa sen).
- **Cơ chế hoạt động linh hoạt**:
  - Khi có `GEMINI_API_KEY`: Gọi trực tiếp Gemini AI thông minh trong thời gian thực.
  - Khi chưa có key hoặc offline: Tự động chuyển sang Chế độ Dữ liệu Chuẩn sử (Offline Curated Mode) mượt mà, đảm bảo trải nghiệm người dùng luôn liền mạch.

### 📱 Progressive Web App (PWA)
- Hỗ trợ cài đặt trực tiếp lên màn hình chính điện thoại và máy tính để bàn (iOS, Android, Windows, macOS).
- Tùy biến `manifest.json` chuẩn nhận diện thương hiệu, hỗ trợ trải nghiệm toàn màn hình (standalone).

---

## 🔒 Kiến Trúc Bảo Mật & Tối Ưu Hóa (Security Architecture)

- **Sliding-Window Rate Limiting**: Bộ kiểm soát tần suất truy vấn theo cửa sổ trượt (60 yêu cầu/phút trên mỗi địa chỉ IP), ngăn chặn spam và lạm dụng API token.
- **Content-Security-Policy (CSP)**: Thiết lập nghiêm ngặt trong `vercel.json` và server headers, vô hiệu hóa nguy cơ tấn công XSS, clickjacking (`frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).
- **Nén Ảnh Phía Client (Client-Side Image Compression)**: Tự động hạ độ phân giải ảnh tải lên của người dùng về tối đa 1024px JPEG (chất lượng 0.82) qua HTML5 Canvas trước khi gửi lên máy chủ, tiết kiệm băng thông và bảo vệ hạ tầng máy chủ khỏi các tệp tin quá lớn.

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
| `npm run typecheck`| Kiểm tra cú pháp kiểu dữ liệu tĩnh TypeScript độc lập |
| `npm test` | Chạy bộ 17 bài kiểm thử tự động với Node.js native test runner & tsx |
| `npm run verify` | Chu trình kiểm định chất lượng: chạy tuần tự Lint -> Test -> Build |
| `npm run clean` | Dọn dẹp thư mục `dist/` đa nền tảng |

---

## 🧪 Kiểm Thử Tự Động (Automated Testing)

Dự án áp dụng bộ kiểm thử tự động 17 bài kiểm tra độc lập viết bằng Node.js Native Test Runner (`node:test`) kết hợp `tsx`:

```bash
npm test
```

### Danh Mục Bộ Kiểm Thử:
1. **Cultural Guardrails (`tests/guardrails.test.ts`)**: 5 bài kiểm tra đánh giá quy chuẩn trang phục, vi phạm vạt tang lễ Tả Nhậm và trang phục nơi tôn nghiêm.
2. **Personal Color Analysis (`tests/personalColor.test.ts`)**: 4 bài kiểm tra phân loại sắc thái 4 mùa, khuyến nghị phom dáng và ánh xạ màu nhuộm tự nhiên.
3. **Sliding Window Rate Limiter (`tests/rateLimiter.test.ts`)**: 4 bài kiểm tra giới hạn tần suất 60 req/min, phản hồi mã 429, giải phóng bộ nhớ và xoay vòng cửa sổ trượt.
4. **Storage & SSR Resilience (`tests/storage.test.ts`)**: 4 bài kiểm tra an toàn SSR khi không có `window`, khởi tạo dữ liệu mẫu cộng đồng và thao tác thả tim tương tác.

---

## 📁 Cấu Trúc Mã Nguồn (Feature-Sliced Design)

```
vietheritage-remix/
├── .env.local                 # Khóa bí mật API & cấu hình môi trường
├── index.html                 # Entry point HTML với typography & Leaflet
├── package.json               # Cấu hình scripts & dependencies
├── tsconfig.json              # Thiết lập TypeScript nghiêm ngặt
├── vite.config.ts             # Vite bundler & Dev API proxy plugin
├── server.ts                  # Máy chủ Express phục vụ production & API
├── vercel.json                # Cấu hình Vercel Serverless, CSP & Header bảo mật
├── tests/                     # 17 bài kiểm thử tự động
│   ├── guardrails.test.ts
│   ├── personalColor.test.ts
│   ├── rateLimiter.test.ts
│   └── storage.test.ts
├── server/                    # Logic xử lý API chung giữa Express & Serverless
│   ├── geminiService.ts       # Kết nối Google Gemini SDK & fallback chuẩn sử
│   └── handlers.ts            # Rate limiter & bộ điều phối API chat/try-on/styling
├── public/                    # Tài nguyên tĩnh, Web App Manifest & SVG bản đồ
│   ├── manifest.json
│   ├── vietnam_heritage_map.svg
│   └── vietnam_map.svg
└── src/                       # Kiến trúc Feature-Sliced Design (FSD)
    ├── app/                   # Shell ứng dụng chính (App.tsx, main.tsx)
    ├── features/              # Các phân hệ chức năng độc lập
    │   ├── anatomy/           # Bóc tách 2D Anatomy Flaps
    │   ├── chat/              # Trợ lý Cổ phục AI Gemini Chat Drawer
    │   ├── community/         # Lookbook cộng đồng & tương tác Remix
    │   ├── heritage-map/      # Bản đồ di sản và không gian văn hóa
    │   ├── home/              # Banner Hero & điều hướng Hub
    │   ├── museum/            # Bảo tàng số & thư viện cổ phục
    │   ├── studio/            # V-Studio AI, Virtual Try-On & Photocard Export
    │   ├── timeline/          # Niên biểu lịch sử qua các triều đại
    │   ├── wardrobe/          # Tủ đồ cá nhân của người dùng
    │   └── wisdom/            # Điển cố điển tích & danh ngôn cổ phục
    └── shared/                # Thư viện dùng chung, types, hooks & i18n
        ├── components/        # Navbar, Footer
        ├── data/              # Dữ liệu cổ phục, màu nhuộm, địa danh
        ├── hooks/             # Custom hooks (useAudio)
        ├── i18n/              # Hỗ trợ song ngữ Việt - Anh
        ├── lib/               # Thuật toán Guardrails, Color, Image Compression
        └── types/             # TypeScript domain definitions
```

Chi tiết kiến trúc kỹ thuật sâu hơn được ghi nhận tại [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 📜 Bản Quyền & Triết Lý
Dự án được xây dựng với tinh thần phi lợi nhuận hướng tới việc bảo tồn và tôn vinh di sản văn hóa Việt Nam trong kỷ nguyên số.
Mọi chi tiết trang phục tuân thủ các tài liệu lịch sử uy tín: *Khâm Định Đại Nam Hội Điển Sự Lệ*, tư liệu Viện Viễn Đông Bác Cổ (EFEO) và các nghiên cứu phục dựng cổ phục chuẩn xác.
