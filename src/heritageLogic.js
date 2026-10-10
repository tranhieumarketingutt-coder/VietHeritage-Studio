export { heritageAudio, HeritageAudioPlayer } from './shared/hooks/useAudio';
export { TRADITIONAL_DYES, analyzePersonalColor } from './shared/lib/personalColor';
export { evaluateGuardrails } from './shared/lib/guardrails';
export { storageHelper } from './shared/lib/storage';

export const GEMINI_RESPONSES = {
  hue: {
    vi: `Du lịch Đại Nội Huế vào tháng 10:

- Thời tiết: Tháng 10 là đầu mùa mưa bão của Huế, nhiệt độ khoảng 22–29°C, độ ẩm cao, mưa kéo dài và có thể có đợt mưa lớn. Trời mát chứ chưa lạnh (rét thật sự thường từ tháng 12 đến tháng 2). Hãy mang ô hoặc áo mưa mỏng và theo dõi dự báo thời tiết trước khi đi.
- Trang phục gợi ý:
  1. Áo Nhật Bình (lễ phục cung đình của nữ giới hoàng tộc) hoặc Áo Ngũ Thân, chọn chất liệu lụa hoặc gấm nhẹ. Gấm dày hút nước nặng, bất tiện khi trời ẩm hoặc mưa.
  2. Áo Tấc (áo dài cổ truyền tay thụng, vốn là lễ phục của nam giới thời Nguyễn) là lựa chọn hợp cho nam khi chụp ảnh tại Ngọ Môn, điện Thái Hòa.
  3. Chọn trang phục có gấu áo cao hơn mắt cá để tránh ướt và bẩn khi đi trên nền gạch, sân đá ẩm.
- Màu sắc đề xuất: Đỏ son, xanh chàm, đỏ củ dền (hợp tông Warm Autumn) nổi bật trên nền tường gạch rêu phong. Màu vàng gắn với hoàng gia (hoàng đế, hoàng hậu thời Nguyễn). Hãy ưu tiên sắc vàng nhạt, vàng nghệ cho trang phục chụp ảnh lưu niệm, tránh dùng sắc vàng sáng, hoa văn rồng đầy đủ.
- Phụ kiện & giày dép: Guốc mộc quai nhung, hài, hoặc giày búp bê/bệt màu tối, đế chống trơn. Có thể đội nón quai thao hoặc nón bài thơ, đeo khăn vấn nhung.
- Lưu ý ứng xử:
  - Ăn mặc kín đáo, lịch sự khi vào khu vực thờ tự như Thế Miếu, Hưng Miếu, điện Phụng Tiên.
  - Giữ gìn cổ vật, không trèo lên bậc, lan can, hiện vật.
  - Quy định thuê đồ, quay chụp và giờ mở cửa có thể thay đổi. Hãy kiểm tra lại với Trung tâm Bảo tồn Di tích Cố đô Huế trước khi đi.`,
    en: `Visiting the Hue Imperial City in October:

- Weather: October marks the start of Hue's rainy and typhoon season, with temperatures around 22–29°C, high humidity and prolonged or heavy rain. It is mild rather than cold (true cold usually comes from December to February). Bring an umbrella or light raincoat and check the forecast before you go.
- Suggested outfits:
  1. Ao Nhat Binh (the court robe of royal women) or Ao Ngu Than, in lightweight silk or light brocade. Thick brocade absorbs water and becomes heavy in damp or rainy weather.
  2. Ao Tac (a wide-sleeved traditional robe, originally men's ceremonial wear under the Nguyen) suits men for photos at Ngo Mon Gate or Thai Hoa Palace.
  3. Choose a hem above the ankle to avoid soaking and staining on wet brick and stone courtyards.
- Color palette: Vermilion, deep indigo and beetroot burgundy (Warm Autumn) stand out against mossy brick walls. Yellow was associated with the imperial family (emperor, empress), so prefer pale yellow or turmeric tones for souvenir photos and avoid bright imperial yellow with full dragon motifs.
- Accessories & footwear: Wooden clogs with velvet straps, traditional slippers, or dark flats with non-slip soles. Pair with a nón quai thao or nón bài thơ hat, or a black velvet head wrap.
- Etiquette:
  - Dress modestly when entering worship areas such as The Mieu, Hung Mieu and Phung Tien Temple.
  - Do not climb on steps, railings or artifacts.
  - Rules on costume rental, photography and opening hours can change. Please check with the Hue Monuments Conservation Centre before visiting.`
  },

  nhatbinh: {
    vi: `Ý nghĩa và đặc điểm Áo Nhật Bình triều Nguyễn:

1. Nguồn gốc & người mặc: Nhật Bình là lễ phục cung đình dành cho hoàng hậu, công chúa, cung tần và các mệnh phụ phẩm cấp cao, mặc trong các đại lễ. Về sau, kiểu áo này được dân gian mô phỏng làm áo cưới.
2. Dải cổ Nhật Bình: Đây là điểm nhận diện nổi bật, một mảnh vải hình chữ nhật (hoặc gần vuông) thêu hoa văn phủ quanh cổ, ngực, vai. Tên "Nhật Bình" mang ý nghĩa mặt trời và sự ngay ngắn, bình chính, tượng trưng cho trật tự chốn hoàng triều.
3. Họa tiết rồng, phượng: Rồng gắn với hoàng đế, phượng gắn với hoàng hậu, cung tần, công chúa. Phượng biểu trưng cho sự thanh cao, đức hạnh, và quyền mẫu nghi thiên hạ.
4. Hoa văn Hải thủy giang nhai (sóng nước và núi đá): Thường thêu ở gấu áo trên các lễ phục hoàng gia, mang ý nghĩa cầu mong giang sơn bền vững, quốc thái dân an.
5. Màu sắc: Màu sắc phân biệt theo phẩm cấp, vàng dành cho hoàng đế và hoàng hậu. Các cung tần, mệnh phụ dùng các sắc khác như đỏ, xanh, tím theo quy định.
6. Cấu trúc: Áo dài chấm gần mắt cá, tay rộng, mặc cùng quần lụa và đội khăn vấn hoặc mão theo phẩm cấp.`,
    en: `Meaning and features of the Nguyen Dynasty Ao Nhat Binh:

1. Origin & wearers: The Nhat Binh was a court robe for empresses, princesses, royal consorts and high-ranking noblewomen, worn at major ceremonies. Folk tradition later adapted it into the bridal gown.
2. The Nhat Binh collar panel: The defining feature, an embroidered rectangular (or near-square) panel draped around the neck, chest and shoulders. The name evokes the sun and uprightness, symbolizing moral correctness and imperial order.
3. Dragon and phoenix motifs: The dragon is tied to the emperor, the phoenix to the empress, consorts and princesses. The phoenix represents noble virtue, grace and maternal dignity.
4. Hai thuy giang nhai (waves and rocky cliffs): Commonly embroidered on the hem of royal robes, expressing the wish for an enduring realm and a peaceful nation.
5. Colors: Color followed rank, with yellow reserved for the emperor and empress. Consorts and noblewomen wore other regulated colors such as red, blue and purple.
6. Structure: A long robe reaching near the ankle with wide sleeves, worn with silk trousers and a head wrap or crown according to rank.`
  },

  nguthan: {
    vi: `Bí quyết phối Áo Ngũ Thân phong cách Gen Z:

- Về áo: Áo dài ngũ thân phổ biến từ thời chúa Nguyễn Phúc Khoát (1744). Áo gồm 4 thân chính và 1 thân phụ (vạt con) nằm bên trong, cổ đứng, cài khuy ở cổ và bên nách phải.
- Nguyên tắc bất biến:
  1. Giữ phom dáng chuẩn của tà áo, cổ đứng (lập lĩnh) và cài khuy đầy đủ.
  2. Mặc cùng quần ống rộng dài chấm mắt cá hoặc dài tới mặt đất (không mặc với quần đùi/váy ngắn).
  3. Ưu tiên chất liệu lụa, gấm, voan lụa. Chọn họa tiết nhỏ, tránh hoa văn rồng, phượng chuyên dùng cho hoàng gia.
- Điểm nhấn High-Fashion:
  1. Kính râm mắt mèo gọng đồi mồi.
  2. Giày sneakers da trắng đế bánh mì hoặc chunky loafers.
  3. Túi kẹp nách bằng lụa gấm thêu tay kết hợp dây xích kim loại.
  4. Kiềng bạc nguyên khối tối giản thay cho trang sức rườm rà.
- Bảng màu: Tông đất (nâu, kem, rêu), hoặc tông jewel (xanh ngọc, đỏ rượu vang) để hợp tinh thần heritage.`,
    en: `Styling Ao Ngu Than for Gen Z High-Fashion:

- About the garment: The five-panel ao dai became popular under Lord Nguyen Phuc Khoat (1744). It has 4 main panels and 1 hidden inner panel, a stand collar, and fastenings at the neck and right underarm.
- Non-negotiables:
  1. Keep the classic silhouette, stand collar (lap linh) and all fastenings closed.
  2. Wear with wide-leg trousers reaching the ankle or floor (never shorts or short skirts).
  3. Favor silk, brocade or silk chiffon. Choose small patterns and avoid dragon and phoenix motifs reserved for royalty.
- Contemporary touches:
  1. Tortoiseshell cat-eye sunglasses.
  2. Clean white platform sneakers or chunky leather loafers.
  3. A hand-embroidered silk brocade clutch with a metal chain.
  4. A minimalist solid silver torque necklace (kieng bac) instead of ornate jewelry.
- Palette: Earth tones (brown, cream, moss) or jewel tones (emerald, wine red) to suit the heritage spirit.`
  },

  toc: {
    vi: `Gợi ý Kiểu Tóc & Trang Điểm Cổ Phục Việt:

- Kiểu tóc nữ:
  1. Tóc vấn trần: Rẽ ngôi giữa, vấn tóc quanh đầu gọn gàng, tôn đường nét gương mặt.
  2. Khăn vấn (mấn) nhung đen: Quấn gọn, tạo dáng thanh thoát, hợp với áo dài ngũ thân, Nhật Bình, hoặc đội nón quai thao, nón bài thơ.
  3. Búi thấp sau gáy: Phù hợp trang phục Huế, thanh lịch và dễ giữ nếp khi trời ẩm.
- Kiểu tóc nam: Búi tóc gọn sau gáy kết hợp khăn đóng (khăn xếp) khi mặc áo Tấc hoặc Nhật Bình nam.
- Trang điểm (Makeup):
  1. Lớp nền mỏng nhẹ, da bóng khỏe (dewy skin), dùng sản phẩm chống nước vì thời tiết ẩm.
  2. Chân mày lá liễu mảnh, tự nhiên.
  3. Màu son: Đỏ gạch, cam đất, hồng đất hoặc đỏ đậu, thiên về lì (matte) hoặc nhung mịn.
  4. Má hồng đào nhẹ, tránh nhũ lấp lánh đậm kiểu phương Tây để giữ nét thuần Việt.`,
    en: `Hair & Makeup Guide for Vietnamese Traditional Costumes:

- Women's hairstyles:
  1. Toc van tran: Center-parted hair wrapped neatly around the head to showcase facial contours.
  2. Black velvet head wrap (man/khan van): Wrapped neatly for an elegant look, ideal with Ngu Than, Nhat Binh, or paired with a non quai thao or non bai tho hat.
  3. Low back bun: Suits Hue costumes, elegant and holds well in humid weather.
- Men's hairstyles: Hair tied neatly at the nape with a khan dong (turban) when wearing Ao Tac or the men's Nhat Binh.
- Makeup:
  1. Light base with a healthy dewy finish, using waterproof products for humid weather.
  2. Thin, natural willow-leaf brows.
  3. Lip colors: brick red, terracotta, earthy rose or red-bean, in matte or soft velvet finishes.
  4. Soft peach blush, avoiding heavy shimmer to keep a Vietnamese heritage look.`
  }
};