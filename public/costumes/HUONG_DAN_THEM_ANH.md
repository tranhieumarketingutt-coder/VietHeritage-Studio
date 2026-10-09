# HƯỚNG DẪN THÊM ẢNH CỔ PHỤC CHO AI VIRTUAL TRY-ON

Thư mục này dùng để chứa các file ảnh trang phục cổ phục gốc của dự án.
Khi người dùng chọn trang phục trên trang web, hệ thống sẽ tự động quét thư mục này, lấy ảnh cổ phục truyền vào làm **ảnh tham chiếu (Image Reference)** cho model `gemini-3.1-flash-image` kết hợp cùng ảnh chân dung của người dùng.

## Định dạng & Tên file quy ước:
Bạn chỉ cần lưu ảnh trang phục vào thư mục này với tên tương ứng (hỗ trợ đuôi `.jpg`, `.jpeg`, `.png`, hoặc `.webp`):

| Tên file | Loại trang phục |
| :--- | :--- |
| `ngu-than.jpg` (hoặc `.png`) | Áo Ngũ Thân (Tay Chẽn / Áo Tấc 1744) |
| `nhat-binh.jpg` (hoặc `.png`) | Áo Nhật Bình (Triều Nguyễn) |
| `giao-linh.jpg` (hoặc `.png`) | Áo Giao Lĩnh (Lý - Trần - Lê) |
| `tu-than.jpg` (hoặc `.png`) | Áo Tứ Thân (Kinh Bắc) |
| `ba-ba.jpg` (hoặc `.png`) | Áo Bà Ba (Nam Bộ) |
| `ao-dai.jpg` (hoặc `.png`) | Áo Dài Truyền Thống |

## Lời khuyên để AI sinh ảnh đẹp nhất:
- Ảnh chụp trang phục nên rõ nét, thấy rõ chi tiết cổ áo (lập lĩnh/giao lĩnh), nút khuy nữu và hoa văn vải.
- Có thể là ảnh ma-nơ-canh mặc trang phục hoặc ảnh người mẫu mặc trên nền đơn sắc/nền sáng.
