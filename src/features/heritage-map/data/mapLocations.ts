import type { MapLocation } from '../../../shared/types/map';

/**
 * Directory of heritage locations, museums, photo coordinates, and rental ateliers.
 */
export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "bao-tang-ao-dai",
    nameVi: "Bảo Tàng Áo Dài TP. Hồ Chí Minh",
    nameEn: "Ao Dai Museum Ho Chi Minh City",
    type: "museum",
    categoryVi: "Bảo tàng trưng bày",
    categoryEn: "Museum Exhibition",
    address: "206/19/30 Long Thuận, P. Long Phước, TP. Thủ Đức, TP.HCM",
    hours: "08:30 - 17:30 (Thứ 2 - Chủ Nhật)",
    priceVi: "Vé tham quan: 50.000 VNĐ (Ưu đãi học sinh, SV)",
    priceEn: "Ticket: 50,000 VND (Student discounts)",
    featuresVi: "Lưu giữ hàng trăm hiện vật áo dài từ triều Nguyễn, thời Pháp thuộc đến hiện đại trong không gian nhà rường Nam Bộ.",
    featuresEn: "Houses hundreds of historic tunics from Nguyen Dynasty to modern times in traditional wooden architecture.",
    mapQuery: "Bảo+tàng+Áo+Dài,+Hồ+Chí+Minh"
  },
  {
    id: "hoang-thanh-thang-long",
    nameVi: "Hoàng Thành Thăng Long Hà Nội",
    nameEn: "Imperial Citadel of Thang Long Hanoi",
    type: "photo",
    categoryVi: "Tọa độ chụp ảnh di sản",
    categoryEn: "Heritage Photo Coordinates",
    address: "19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội",
    hours: "08:00 - 17:00 hàng ngày",
    priceVi: "Vé: 30.000 VNĐ | Điểm check-in hot nhất cho Áo Tấc & Nhật Bình",
    priceEn: "Ticket: 30,000 VND | Premier spot for Ao Tac & Nhat Binh",
    featuresVi: "Điện Kính Thiên, Đoan Môn, Cột cờ Hà Nội lưu giữ trầm tích nghìn năm rực rỡ, phông nền tuyệt hảo cho giới trẻ yêu di sản.",
    featuresEn: "Kinh Thien Palace steps and Doan Mon gate offer grand royal backdrops for editorial photography.",
    mapQuery: "Hoàng+Thành+Thăng+Long,+Hà+Nội"
  },
  {
    id: "vstyle-viet-co-phuc",
    nameVi: "V'style - Việt Cổ Phục Hà Nội",
    nameEn: "V'style - Traditional Costumes Rental & Tailoring",
    type: "shop",
    categoryVi: "Shop bán/cho thuê",
    categoryEn: "Costume Rental & Tailoring",
    address: "3B Ngõ 94 Hoàng Ngân, Cầu Giấy & Cơ sở 2 tại Hoàng Thành Thăng Long",
    hours: "09:00 - 20:00 hàng ngày",
    priceVi: "Áo Tay Chẽn: 200k-300k | Áo Tấc: 300k-400k | Nhật Bình: 400k-600k",
    priceEn: "Narrow sleeves: 200k-300k | Ao Tac: 300k-400k | Nhat Binh: 400k-600k",
    featuresVi: "Đầy đủ phụ kiện kiềng bạc, nón quai thao, khăn vấn chữ Nhân, hỗ trợ chuyên viên makeup và hướng dẫn tạo dáng chuẩn mực.",
    featuresEn: "Full accessory suites: silver torque necklaces, headdresses, styling, and poses guidance.",
    mapQuery: "Hoàng+Ngân,+Cầu+Giấy,+Hà+Nội"
  },
  {
    id: "y-van-hien",
    nameVi: "Ỷ Vân Hiên - Phục Dựng Cổ Phục Chuẩn Sử",
    nameEn: "Y Van Hien - Historically Accurate Restorations",
    type: "shop",
    categoryVi: "Shop bán/cho thuê",
    categoryEn: "Costume Rental & Tailoring",
    address: "195 Đội Cấn, Ba Đình, Hà Nội",
    hours: "08:30 - 19:30 hàng ngày",
    priceVi: "Phục chế cao cấp, cố vấn điện ảnh & thời trang thảm đỏ",
    priceEn: "High-end bespoke restorations & cinema heritage consulting",
    featuresVi: "Đơn vị hàng đầu trong phong trào phục hưng cổ phục, kỹ thuật khâu tay giấu chỉ và nguồn tư liệu lịch sử đối chiếu nghiêm ngặt.",
    featuresEn: "Premier studio in Vietnam's costume revival, hand-stitched with rigorous archival validation.",
    mapQuery: "195+Đội+Cấn,+Ba+Đình,+Hà+Nội"
  },
  {
    id: "bao-tang-lich-su-quoc-gia",
    nameVi: "Bảo Tàng Lịch Sử Quốc Gia",
    nameEn: "National Museum of Vietnamese History",
    type: "museum",
    categoryVi: "Bảo tàng trưng bày",
    categoryEn: "Museum Exhibition",
    address: "Số 1 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội",
    hours: "08:00 - 17:00 (Đóng cửa thứ 2)",
    priceVi: "Vé: 40.000 VNĐ (Sinh viên: 15.000 VNĐ)",
    priceEn: "Ticket: 40,000 VND (Student: 15,000 VND)",
    featuresVi: "Kiến trúc Đông Dương tráng lệ với mái bát giác, lưu giữ ngọc tỷ, phẩm phục triều đình từ thời tiền sử đến thế kỷ XX.",
    featuresEn: "Magnificent French Indochine architecture with imperial seals and regal garments through the 20th century.",
    mapQuery: "Bảo+tàng+Lịch+sử+Quốc+gia,+Tràng+Tiền,+Hà+Nội"
  },
  {
    id: "co-do-hue",
    nameVi: "Đại Nội Kinh Thành Huế",
    nameEn: "Hue Imperial Citadel & Forbidden City",
    type: "photo",
    categoryVi: "Tọa độ chụp ảnh di sản",
    categoryEn: "Heritage Photo Coordinates",
    address: "Kinh thành Huế, Phú Hậu, TP. Huế, Thừa Thiên Huế",
    hours: "07:30 - 17:30 hàng ngày",
    priceVi: "Vé: 200.000 VNĐ | Thánh địa Nhật Bình và Áo Ngũ Thân hoàng gia",
    priceEn: "Ticket: 200,000 VND | Epicenter of Royal Nhat Binh and Ao Tac",
    featuresVi: "Ngọ Môn, Cung Diên Thọ, Điện Thái Hòa - cội nguồn đích thực của phong cách hoàng tộc Triều Nguyễn.",
    featuresEn: "Ngo Mon Gate and Dien Tho Residence - authentic cradle of Nguyen Dynasty imperial grandeur.",
    mapQuery: "Đại+Nội+Huế,+Thừa+Thiên+Huế"
  }
];
