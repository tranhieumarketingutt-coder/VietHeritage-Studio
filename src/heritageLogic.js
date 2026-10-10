

export { heritageAudio, HeritageAudioPlayer } from './shared/hooks/useAudio';
export { TRADITIONAL_DYES, analyzePersonalColor } from './shared/lib/personalColor';
export { evaluateGuardrails } from './shared/lib/guardrails';
export { storageHelper } from './shared/lib/storage';


export const GEMINI_RESPONSES = {
  hue: {
    vi: `Đến **Cố đô Huế vào tháng 10**, thời tiết xứ kinh kỳ thường se lạnh với những cơn mưa thu lãng mạn. 
- **Trang phục lý tưởng:** Chọn **Áo Tấc tay thụng** dệt gấm hoặc tơ xước lót ấm, phối cùng **Áo Nhật Bình** khoác ngoài nếu bạn muốn phong thái vương giả tại Ngọ Môn hoặc Cung Diên Thọ.
- **Màu sắc đề xuất:** Sắc **Đỏ Son**, **Xanh Chàm**, hoặc **Màu Củ Dền** (Warm Autumn) hòa cùng rêu phong của các bức tường thành gạch cổ kính.
- **Phụ kiện & Quy tắc:** Tuyệt đối mang guốc mộc quai nhung hoặc giày búp bê tối màu. Nhớ giữ cổ áo chỉnh tề, khuy nữu cài kín khi vào các điện thờ hoàng tộc!`,
    en: `For visiting **Hue Imperial Citadel in October**, expect cool autumn breezes and gentle misty rain.
- **Recommended Outfit:** Opt for a broad-sleeved **Ao Tac** made of warming brocade, or layer with a **Nhat Binh** royal robe for majestic portraits at Ngo Mon Gate.
- **Color Palette:** Warm Vermilion, Deep Indigo, or Beetroot Burgundy will stand out against aged mossy brick walls.
- **Cultural Etiquette:** Keep all five collar buttons fastened when entering imperial ancestral temples.`
  },
  nhatbinh: {
    vi: `**Ý nghĩa hoa văn Áo Nhật Bình Triều Nguyễn:**
1. **Dải cổ hình chữ nhật (Nhật Bình):** Biểu trưng cho sự ngay ngắn, bình chính và tôn ti trật tự chốn hoàng triều.
2. **Họa tiết Phượng ổ & Loan ổ:** Tượng trưng cho sự thanh cao, đức hạnh và quyền năng mẫu nghi của phụ nữ hoàng gia.
3. **Hoa văn Tam Sơn Thủy Ba (Ba ngọn núi & Sóng nước ngũ sắc):** Đặt ở viền gấu áo, mang triết lý ước vọng 'Giang sơn trường tồn, quốc thái dân an'.
4. **Dải ngũ hành ở tay áo:** 5 màu sắc (Lục, Hồng, Vàng, Trắng, Lam) tượng trưng cho Kim - Mộc - Thủy - Hỏa - Thổ sinh sinh bất tức.`,
    en: `**Symbolism of the Nhat Binh Court Robe:**
1. **Rectangular Front Band:** Symbolizes moral uprightness and imperial order.
2. **Phoenix Roundels (Phuong O):** Represents noble virtue, grace, and matriarchal dignity.
3. **Three Mountains & Water Waves (Tam Son Thuy Ba):** Embellished on the hem, signifying enduring national prosperity.
4. **Five-Element Sleeve Bands:** Five colored stripes representing Wood, Fire, Earth, Metal, and Water in harmonious cycle.`
  },
  nguthan: {
    vi: `**Bí quyết phối Áo Ngũ Thân phong cách Gen Z:**
1. **Nguyên tắc bất biến:** Luôn giữ phom dáng chuẩn của tà áo, cổ đứng (lập lĩnh) cài đủ 5 khuy, và mặc cùng quần thụng dài (không mặc với quần đùi/váy ngắn hở đùi).
2. **Điểm nhấn High-Fashion:** 
   - Phối cùng kính râm mắt mèo gọng đồi mồi thời thượng.
   - Đi giày sneakers da trắng đế bánh mì hoặc chunky loafers hiện đại.
   - Khoác túi xách kẹp nách bằng lụa gấm thêu tay kết hợp dây xích kim loại.
   - Đeo kiềng bạc nguyên khối tối giản thay cho trang sức rườm rà.`,
    en: `**Styling Ngu Than for Gen Z High-Fashion:**
1. **Non-Negotiables:** Preserve the classic stand collar, all 5 buttons fastened, and full-length flowing trousers.
2. **Contemporary Touches:**
   - Pair with sleek tortoiseshell sunglasses.
   - Wear clean white platform sneakers or chunky leather loafers.
   - Minimalist solid silver torque necklace (kieng bac) instead of overly ornamental jewelry.`
  },
  toc: {
    vi: `**Gợi ý Kiểu Tóc & Trang Điểm Cổ Phục:**
- **Kiểu tóc nữ:** 
  1. *Tóc vấn trần:* Tóc rẽ ngôi giữa (ngôi trâu), vấn quanh đầu nhẹ nhàng tôn đường nét gương mặt thanh tú.
  2. *Khăn vấn nhung đen:* Khăn vấn hình chữ Nhân (tạo đỉnh nhọn nhẹ giúp mặt thon dài) hoặc đội nón lá/quai thao.
- **Trang điểm (Makeup):** 
  - Lớp nền mỏng nhẹ thủy tinh (Dewy clean skin).
  - Chân mày lá liễu tự nhiên, không kẻ quá sắc lẹm kiểu Tây.
  - Màu son: Đỏ gạch, cam đất hoặc hồng đậu đỏ tự nhiên tôn nét duyên ngầm thuần khiết.`,
    en: `**Hair & Makeup Guide for Vietnamese Costumes:**
- **Hairstyles:** Center-part hair wrapped naturally (toc van tran) or paired with a structured black velvet turban (khan van).
- **Makeup:** Dewy glass skin, gentle arched brows, and terracotta/brick-red soft matte lips celebrating natural heritage elegance.`
  }
};
