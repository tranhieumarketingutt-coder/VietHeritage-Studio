# Original User Request

## 2026-10-10T07:37:24Z

Thực hiện tái thiết kế toàn diện UX/UI cho nền tảng VietHeritage Remix sang phong cách Cung đình & Cổ điển trang nhã truyền thống Việt Nam, nâng tầm thẩm mỹ chuyên nghiệp nhưng bảo toàn 100% logic nghiệp vụ, tính năng và luồng tương tác hiện hữu.

Working directory: c:\Users\TRAN HIEU\Desktop\vietheritage-remix---gen-z-heritage-co-creation-platform
Integrity mode: development

## Requirements

### R1. Bảo toàn 100% logic nghiệp vụ và chức năng hiện hữu
Toàn bộ logic tương tác, API handlers, state management, routes, các bộ tính toán di sản (heritage logic, virtual try-on, anatomy, timeline, wisdom) và dữ liệu ứng dụng phải được giữ nguyên vẹn. Không được thay đổi, rút gọn hoặc làm sai lệch bất kỳ tính năng sẵn có nào.

### R2. Thiết kế mỹ thuật truyền thống Việt Nam: Cung đình & Cổ điển trang nhã
Chuyển hóa giao diện sang phong cách mỹ thuật di sản Việt Nam sang trọng và tinh tế:
- Bảng màu lấy cảm hứng hoàng gia/cung đình: Đỏ son (Cinnabar/Lacquer Red), Vàng hoàng yến/hoàng cung (Imperial Gold), Lam gốm cổ (Cobalt/Celadon Blue), Trầm mộc và Giấy dó/ngà ngọc.
- Điểm xuyết hoa văn/họa tiết di sản (mây sóng thủy ba, cánh sen, họa tiết kỷ hà, chim hạc, hoa văn thời Lý - Trần - Lê - Nguyễn) dưới dạng vector/SVG tinh giản, thanh thoát.
- Typography trang nhã, tương thích tiếng Việt có dấu hoàn chỉnh (serif/display tôn nét hoài cổ uyển chuyển kết hợp sans-serif hiện đại cho nội dung đọc dễ chịu).

### R3. Tinh chỉnh trải nghiệm người dùng chuyên nghiệp (UX Polish & Design System)
Đảm bảo tính nhất quán trên toàn bộ các màn hình và thành phần giao diện:
- Hierarchy thông tin mạch lạc, khoảng cách và lề chuẩn mực, độ tương phản trực quan tốt.
- Hiệu ứng chuyển động (motion/transitions) mềm mại, quý phái, không gây rối mắt.
- Đầy đủ các trạng thái tương tác: hover, focus-visible, active, disabled, loading, empty states, thông báo phản hồi người dùng.
- Tương thích responsive liền mạch trên cả giao diện di động lẫn máy tính để bàn.

## Verification Resources
Dự án đã có sẵn bộ kiểm thử và công cụ kiểm chứng chất lượng tự động:
- `npm run verify`: Lệnh tổng hợp chạy tuần tự `npm run lint` (TypeScript noEmit), `npm test` (toàn bộ test suites trong thư mục tests/), và `npm run build` (Vite build).

## Acceptance Criteria

### Tính toàn vẹn chức năng & Kiểm thử tự động (Functional Integrity)
- [ ] Lệnh `npm run verify` chạy thành công (exit code 0), 100% test suites trong `tests/` vượt qua (pass), không có lỗi TypeScript hay lỗi build nào.
- [ ] Tất cả các tính năng tương tác, luồng thử trang phục (virtual try-on), bản đồ di sản, dòng thời gian, form và modal hoạt động chuẩn xác như trước khi đổi UI.

### Bản sắc thị giác & Thẩm mỹ Việt Nam (Aesthetic Quality)
- [ ] Giao diện thể hiện rõ rệt phong cách Cung đình & Cổ điển trang nhã Việt Nam thông qua màu sắc, hoa văn, viền khung và bố cục di sản.
- [ ] Typography tiếng Việt hiển thị đẹp mắt, không lỗi font, không vỡ layout trên các độ phân giải màn hình.
- [ ] Hệ thống token giao diện (màu sắc, border, shadow, components) đồng bộ xuyên suốt toàn bộ ứng dụng.
