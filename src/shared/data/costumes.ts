import type { CostumeData } from '../types/costume';

/**
 * Master collection of six traditional Vietnamese costumes with historical data.
 */
export const COSTUMES_DATA: CostumeData[] = [
  {
    id: "ngu-than",
    nameVi: "Áo Ngũ Thân (Tay Chẽn & Áo Tấc)",
    nameEn: "Five-Part Dress (Ngu Than / Ao Tac)",
    era: "1744 - Triều Nguyễn",
    eraCategory: "nguyen",
    form: "Nam & Nữ (Lễ phục & Thường phục)",
    colors: ["#8B0000", "#1C3144", "#3F5E4D", "#D4AF37"],
    shortDescVi: "Quốc phục chuẩn mực Đàng Trong thế kỷ 18 với triết lý Ngũ Thường và Tứ Thân Phụ Mẫu.",
    shortDescEn: "Standard 18th-century national garment representing Confucian five virtues and filial piety.",
    detailsVi: `Khởi thủy từ năm 1744 dưới sắc lệnh cải cách y phục Đàng Trong của Võ Vương Nguyễn Phúc Khoát, Áo Ngũ Thân kết tinh trọn vẹn tinh hoa văn hóa Nho giáo phương Đông. Cấu trúc gồm 5 thân vải: 2 thân trước, 2 thân sau tượng trưng cho 'Tứ thân phụ mẫu' (cha mẹ sinh thành và cha mẹ vợ/chồng), và 1 thân con ẩn phía trong bên phải tượng trưng cho chính người mặc - mang triết lý răn dạy đức khiêm nhường, biết giấu mình trong xã hội. Áo cài đúng 5 chiếc nút (nữu), tượng trưng cho 'Ngũ Thường' (Nhân, Nghĩa, Lễ, Trí, Tín) và 'Ngũ Luân'. Đường sống lưng 'trung phùng' giữ cho tâm thế luôn chính trực, ngay thẳng. Kỹ thuật may vuốt mép cánh cung giấu chỉ tạo nên phong thái đĩnh đạc, uy nghi.`,
    detailsEn: `Originating in 1744 under the sartorial reform decree of Lord Nguyen Phuc Khoat in Dang Trong (Southern realm), the Five-Part Dress embodies East Asian Confucian moral philosophy. Constructed from 5 fabric panels: 4 outer panels symbolizing the four parents (paternal and maternal), and an inner fifth panel symbolizing the wearer (teaching humility and self-restraint). The 5 buttons represent the Five Core Virtues (Benevolence, Righteousness, Propriety, Wisdom, Fidelity) and the Five Relationships. The central spine seam (trung phung) signifies unbending moral rectitude. Masterful hidden stitching curves the hem upward like a gentle smile.`,
    anatomyHighlights: {
      panelsVi: "5 thân vải (2 thân trước, 2 thân sau ghép sống lưng, 1 thân con nép bên trong vạt phải)",
      panelsEn: "5 panels (2 front, 2 back joined at spine, 1 modest inner flap tucked inside right)",
      collarVi: "Cổ đứng lập lĩnh cao 3-4cm, vuông vức, ôm khít cổ, nút cài ngay ngắn",
      collarEn: "Stand collar (lap linh) 3-4cm tall, square, snug, buttoned straight",
      buttonsVi: "5 khuy nữu (khuy đồng, ngọc bích, vàng hoặc gỗ quý cài từ cổ xuống nách phải)",
      buttonsEn: "5 knotted buttons (brass, jade, gold, or timber fastening collar to right armpit)",
      seamVi: "Đường trung phùng thẳng tắp nối 2 khổ vải sau lưng; tà áo vuốt cong cánh cung giấu mũi chỉ",
      seamEn: "Center spine seam (trung phung) straight down back; hem subtly curved like an archery bow with invisible stitching"
    },
    fabricsVi: "Tơ tằm dệt thủ công làng Vạn Phúc, Gấm hoa mai Huế, Sa Hà Đông, Đũi dệt tự nhiên nhuộm củ nâu, lá chàm.",
    fabricsEn: "Handwoven Van Phuc mulberry silk, Hue plum blossom brocade, airy Ha Dong gauze, raw tussah silk naturally dyed.",
    philosophyVi: "Biểu tượng của lòng hiếu thảo (Tứ thân phụ mẫu) và phẩm hạnh người quân tử (Nhân, Nghĩa, Lễ, Trí, Tín). Người mặc luôn giữ lưng thẳng, bước đi khoan thai, khiêm nhường.",
    philosophyEn: "Symbol of filial devotion (Four Parents) and gentlemanly righteousness (Five Virtues). Inspires upright posture, measured steps, and inward humility.",
    genzStylingVi: "Phối cùng quần thụng lụa trắng dài qua mắt cá chân, kính mắt râm gọng đồi mồi, kiềng bạc hoa sen tối giản và giày loafers da hoặc sneakers trắng sạch sẽ.",
    genzStylingEn: "Pair with full-length flowing white silk trousers, tortoiseshell sunglasses, minimalist silver torque necklace, and clean white platform sneakers.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Hoàng Thành Thăng Long (Hà Nội)",
      locationEn: "Imperial Citadel of Thang Long (Hanoi)",
      photoTitleVi: "Áo Ngũ Thân Tay Chẽn (Mặt trước)",
      photoTitleEn: "Scholar Ngu Than Tay Chen (Front View)",
      shootingNotesVi: "Mô hình và ảnh chụp chi tiết phục dựng chuẩn mực cổ phục Áo Ngũ Thân mặt trước và mặt sau.",
      shootingNotesEn: "Detailed model reproduction of historical Ngu Than costume showing front and back views.",
      heroPhoto: "/costumes/ai/ngu-than-front.png",
      frontPhoto: "/costumes/ai/ngu-than-front.png",
      backPhoto: "/costumes/ai/ngu-than-back.png",
      gallery: [
        {
          titleVi: "Người mẫu diện Áo Ngũ Thân tay chẽn tại Hoàng Thành",
          titleEn: "Editorial: Male Scholar in Tay Chen Ngu Than",
          tagVi: "Ảnh chụp di sản",
          tagEn: "Heritage Editorial",
          contextVi: "Bộ ảnh thực tế ghi lại phong thái nho nhã của nam sĩ tử diện áo ngũ thân tay chẽn tại di tích Hoàng Thành.",
          contextEn: "Live photoshoot capturing scholarly elegance in narrow-sleeved Ngu Than robe at the Imperial Citadel.",
          imageUrl: "/costumes/ngu-than-hero.webp"
        },
        {
          titleVi: "Cận cảnh Cổ Lập Lĩnh & Khuy Nữu cài vai (Gấm dệt cao cấp)",
          titleEn: "Macro: Upright Stand Collar & Fastener Knots on Brocade",
          tagVi: "Chi tiết may đo thủ công",
          tagEn: "Handcrafted Macro",
          contextVi: "Cổ đứng lập lĩnh cao 3-4cm ôm khít cổ, có lớp lót đơn y trắng nhô nhẹ 1-2mm và khuy cài vai tinh xảo.",
          contextEn: "3-4cm upright collar with pure white inner lining peek and delicate shoulder knot button.",
          imageUrl: "/costumes/ngu-than-collar.webp"
        },
        {
          titleVi: "Mô hình phục dựng: Mặt trước Áo Ngũ Thân Nữ gấm thêu phượng",
          titleEn: "Reproduction Model: Front View of Embroidered Silk Robe",
          tagVi: "Mô hình phục dựng",
          tagEn: "Costume Reproduction",
          contextVi: "Mô hình trang phục ngũ thân nữ dệt gấm xanh ngọc thêu chim phượng và hoa văn mây cát tường, cài khuy nách phải chuẩn mực.",
          contextEn: "Emerald silk brocade female Ngu Than robe featuring auspicious phoenix and cloud motifs.",
          imageUrl: "/costumes/ngu-than-model-front.png"
        },
        {
          titleVi: "Mô hình phục dựng: Mặt sau (Đường sống lưng Trung Phùng)",
          titleEn: "Reproduction Model: Back View & Central Spine Seam",
          tagVi: "Chuẩn mực cổ chế",
          tagEn: "Authentic Seamwork",
          contextVi: "Đặc tả đường may trung phùng nối đôi thân sau thẳng tắp từ cổ xuống gấu - biểu tượng của tâm thế cương trực, đoan chính.",
          contextEn: "Continuous central back seam (trung phung) connecting two panels from collar to hem, signifying moral rectitude.",
          imageUrl: "/costumes/ngu-than-model-back.png"
        },
        {
          titleVi: "Cặp đôi Cổ Phục Ngũ Thân Tay Chẽn Nam & Nữ",
          titleEn: "Couple Editorial: Male & Female Ngu Than Tay Chen",
          tagVi: "Phối đồ nam nữ",
          tagEn: "Couples Styling",
          contextVi: "Sự kết hợp hoàn hảo giữa nam diện áo ngũ thân xanh ngọc lụa bóng cùng nữ vấn khăn đỏ diện ngũ thân gấm thêu.",
          contextEn: "Coordinated pair in traditional silk Ngu Than robes, styled with turban and headdress.",
          imageUrl: "/costumes/ngu-than-nam-nu.jpg"
        },
        {
          titleVi: "Áo Ngũ Thân Tay Chẽn Nam truyền thống (Lụa đen, khăn đóng)",
          titleEn: "Traditional Male Tay Chen: Black Silk & Khan Dong Turban",
          tagVi: "Chuẩn mực truyền thống",
          tagEn: "Traditional Standard",
          contextVi: "Trang phục nam giới mẫu mực với sắc đen tuyền trang nghiêm, quần thụng trắng và khăn đóng chữ Nhất.",
          contextEn: "Classic gentleman attire in dignified black silk, white silk trousers, and structured turban.",
          imageUrl: "/costumes/ngu-than-nam-chuan.jpg"
        }
      ],
      editorialQuoteVi: "Đường trung phùng thẳng tắp nối sống lưng - Giữ cho tâm thế luôn đoan chính khiêm nhường.",
      editorialQuoteEn: "The unbroken spine seam guides upright posture - cultivating inner rectitude and Confucian humility.",
      macroHotspots: [
        {
          id: "collar",
          x: 50,
          y: 20,
          titleVi: "Cổ Lập Lĩnh & Khuy Nữu",
          titleEn: "Stand Collar & Knots",
          descVi: "Cổ đứng lập lĩnh cao 3-4cm vuông vắn ôm khít cổ, cài kín 5 khuy nữu tượng trưng cho Ngũ Thường (Nhân, Nghĩa, Lễ, Trí, Tín).",
          descEn: "Upright 3-4cm stand collar fastening 5 knotted buttons signifying the Five Confucian Virtues.",
          icon: "shield"
        },
        {
          id: "shoulder",
          x: 68,
          y: 34,
          titleVi: "Tay Chẽn Vuốt Gọn",
          titleEn: "Narrow Fitted Sleeves",
          descVi: "Ống tay bó chẽn cổ tay gọn gàng, thuận tiện vận động nhưng vẫn giữ phong thái mực thước người quân tử.",
          descEn: "Narrowed cuffs ensuring agile daily movement while preserving dignified scholarly decorum.",
          icon: "scissors"
        },
        {
          id: "hem",
          x: 50,
          y: 78,
          titleVi: "Vạt Cánh Cung Giấu Chỉ",
          titleEn: "Bow-Curved Hem",
          descVi: "Gấu áo vuốt cong hình cánh cung nhẹ nhàng, kỹ thuật khâu giấu chỉ bậc thầy không để lộ đường kim mũi chỉ.",
          descEn: "Curved upward hem resembling an archery bow with master invisible blind-stitching.",
          icon: "sparkles"
        },
        {
          id: "trousers",
          x: 42,
          y: 92,
          titleVi: "Quần Thụng Lụa Trắng",
          titleEn: "White Silk Trousers",
          descVi: "Ống quần rộng rủ mềm mại qua mắt cá chân, tương phản trang nhã với tà áo tơ tằm thẫm màu.",
          descEn: "Relaxed flowing trousers skimming ankles, providing elegant contrast against dark silk tunics.",
          icon: "layers"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Sĩ Tử Đứng Khoan Thai (Chắp Tay Cung Kính)",
        poseTitleEn: "Scholarly Poise (Confucian Hand Clasp)",
        poseInstructionVi: "Lưng giữ thẳng tắp theo đường sống lưng trung phùng, hai tay chắp ngang ngực hoặc đan nhẹ trước bụng tạo thành hình chữ nhật mực thước. Ánh mắt nhìn thẳng đĩnh đạc.",
        poseInstructionEn: "Maintain upright posture aligned with central spine seam. Clasp hands horizontally across chest or abdomen in rectangle shape. Gaze forward with calm dignified composure.",
        cameraTipsVi: "Góc máy Low-angle nhẹ (ngang ngực hắt lên 15 độ), tiêu cự 85mm f/1.8 để làm mờ hậu cảnh cổ kính, ánh sáng Giờ Vàng (16:30 - 17:30) vàng ấm.",
        cameraTipsEn: "Subtle low-angle (chest level angled up 15°), 85mm f/1.8 portrait lens for creamy bokeh against brick ramparts, golden hour warm backlight.",
        accessoriesVi: "Khăn đóng chữ Nhất (nam) hoặc khăn vấn, kiềng bạc hoa sen, quạt giấy trầm hương, giày da tối giản.",
        accessoriesEn: "Khan dong turban, silver lotus torque, aromatic incense fan, minimalist leather shoes."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <defs>
        <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9E1B1B"/>
          <stop offset="50%" stop-color="#800000"/>
          <stop offset="100%" stop-color="#4D0000"/>
        </linearGradient>
        <pattern id="cloudPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q 5 0, 10 10 T 20 10" fill="none" stroke="#D4AF37" stroke-width="0.7" opacity="0.3"/>
        </pattern>
      </defs>
      <!-- Halo Background -->
      <circle cx="150" cy="180" r="110" fill="#F4EBD9" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 2"/>
      <!-- Body Silhouette: Ngu Than -->
      <path d="M120 70 L90 120 L40 210 L80 230 L110 160 L105 350 L195 350 L190 160 L220 230 L260 210 L210 120 L180 70 Z" fill="url(#crimsonGrad)"/>
      <path d="M120 70 L90 120 L40 210 L80 230 L110 160 L105 350 L195 350 L190 160 L220 230 L260 210 L210 120 L180 70 Z" fill="url(#cloudPattern)"/>
      <!-- Stand Collar (Lap Linh) -->
      <rect x="135" y="60" width="30" height="20" rx="3" fill="#D4AF37" stroke="#800000" stroke-width="1.5"/>
      <path d="M140 80 Q150 85 160 80" stroke="#FAF7F2" stroke-width="2" fill="none"/>
      <!-- White Inner Collar Hint -->
      <path d="M138 62 L162 62" stroke="#FAF7F2" stroke-width="2"/>
      <!-- Five Golden Knots (Ngu Nuu) -->
      <circle cx="150" cy="85" r="3.5" fill="#F3E5AB" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="160" cy="98" r="3.5" fill="#F3E5AB" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="170" cy="115" r="3.5" fill="#F3E5AB" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="175" cy="135" r="3.5" fill="#F3E5AB" stroke="#D4AF37" stroke-width="1.5"/>
      <circle cx="178" cy="160" r="3.5" fill="#F3E5AB" stroke="#D4AF37" stroke-width="1.5"/>
      <!-- Right Overlap Curve (Ta Huu Nham) -->
      <path d="M150 85 Q178 120 178 160 L175 348" stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.8"/>
      <!-- Curved Hem (Canh Cung) -->
      <path d="M105 350 Q150 360 195 350" stroke="#D4AF37" stroke-width="3" fill="none"/>
      <!-- White Silk Trousers -->
      <rect x="120" y="345" width="28" height="40" fill="#FFFDF9" stroke="#E2DCD0"/>
      <rect x="152" y="345" width="28" height="40" fill="#FFFDF9" stroke="#E2DCD0"/>
      <!-- Traditional Khan Van Turban -->
      <ellipse cx="150" cy="45" rx="22" ry="10" fill="#222222" stroke="#D4AF37" stroke-width="1.5"/>
      <path d="M140 45 L160 45" stroke="#D4AF37" stroke-width="1"/>
    </svg>`
  },
  {
    id: "nhat-binh",
    nameVi: "Áo Nhật Bình",
    nameEn: "Nhat Binh Royal Robe",
    era: "Triều Nguyễn (1802 - 1945)",
    eraCategory: "nguyen",
    form: "Nữ giới (Hoàng Thái hậu, Hoàng hậu, Công chúa)",
    colors: ["#D4AF37", "#9E1B1B", "#6A2C70", "#1C3144"],
    shortDescVi: "Lễ phục đối khâm cung đình quyền quý với hoa văn Phượng Loan và dải ngũ hành rực rỡ.",
    shortDescEn: "Royal court rectangular-collar robe adorned with Phoenix medallions and five-element colors.",
    detailsVi: `Áo Nhật Bình là dạng áo Đối Khâm xẻ ngực, đặc trưng bởi dải cổ to bản tạo thành hình chữ nhật trước ngực. Đây là trang phục thường phục cao cấp của Hoàng Thái hậu, Hoàng hậu và là lễ phục của Công chúa, Cung tần thời Nguyễn. Hoa văn dày đặc gồm Phượng ổ, Loan ổ phối chữ Phúc, Thọ. Điểm nhấn là dải ngũ hành sọc màu ở tay áo và hoa văn 'Tam sơn thủy ba' (núi và sóng nước) ở chân vạt tượng trưng cho sự trường tồn của giang sơn xã tắc. Màu sắc quy định đẳng cấp nghiêm ngặt: Vàng chính sắc dành cho Hoàng Hậu, Xích Đào cho Công chúa, Tím cho bậc Tần.`,
    detailsEn: `Named after its broad rectangular collar joining at the chest, the Nhat Binh is a parallel-front court robe. Reserved for Empresses, Princesses, and high-ranking concubines of the Nguyen Dynasty. Richly embroidered with Phoenix and Loan roundels, paired with blessing ideograms. Sleeves feature multicolored bands representing the Five Elements, while the hem showcases 'Three Mountains & Water Waves' (Tam son thuy ba), symbolizing national endurance. Colors strictly reflected rank: pure Imperial Yellow for Empresses, Ruby Scarlet for Princesses, Purple for Noble Consorts.`,
    anatomyHighlights: {
      panelsVi: "Dạng áo Đối Khâm xẻ ngực, hai vạt trước buông thẳng song song, buộc dải khánh ngọc",
      panelsEn: "Parallel-front Doi Kham robe, two front panels hanging straight, fastened with jade pendants",
      collarVi: "Dải cổ to bản hình chữ nhật (Nhật Bình) thêu kim tuyến phượng hoàng rực rỡ",
      collarEn: "Broad rectangular chest band (Nhat Binh) lavishly embroidered with gold-thread phoenixes",
      buttonsVi: "Cài bằng dải dây lụa thắt ngọc hoặc nữu cúc ngọc giấu phía dưới dải cổ",
      buttonsEn: "Secured with silk ribbons adorned with jade beads beneath the rectangular collar",
      seamVi: "Viền tay áo phối dải vải 5 màu Ngũ Hành; chân tà thêu đồ án Tam Sơn Thủy Ba sóng nước",
      seamEn: "Sleeve cuffs banded with 5 Five-Element colors; hem embroidered with Three Mountains & Waves"
    },
    fabricsVi: "Gấm dệt tơ bóng, Sa tanh hoàng cung thêu chỉ kim tuyến, Lụa nhuộm tự nhiên.",
    fabricsEn: "Lustrous woven brocade, royal satin with gold-thread embroidery, naturally dyed silk.",
    philosophyVi: "Biểu trưng cho uy quyền mẫu nghi, sự tôn nghiêm và ước vọng đất nước thái bình thịnh trị (sóng nước trường tồn).",
    philosophyEn: "Emblem of royal matriarchal dignity, celestial grace, and eternal state stability.",
    genzStylingVi: "Khoác ngoài như một chiếc kimono cape cao cấp, phối cùng đầm suông tối giản hoặc váy quây lụa dập ly màu be, mang giày cao gót mũi nhọn thanh lịch.",
    genzStylingEn: "Wear unbuttoned as an editorial cape over a minimalist beige silk slip dress with pointed-toe pumps.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Đại Nội Cố Đô Huế & Cung An Định",
      locationEn: "Hue Imperial Citadel & An Dinh Palace",
      photoTitleVi: "Áo Nhật Bình Hoàng Cung (Mặt trước)",
      photoTitleEn: "Imperial Court Nhat Binh (Front View)",
      shootingNotesVi: "Góc chụp phục dựng chính diện và mặt sau áo Nhật Bình thể hiện chuẩn mực dải cổ viền ngũ sắc và họa tiết hoàng triều.",
      shootingNotesEn: "Front and back views of imperial court Nhat Binh robe highlighting decorative collar bands and royal motifs.",
      heroPhoto: "/costumes/ai/nhat-binh-front.jfif",
      frontPhoto: "/costumes/ai/nhat-binh-front.jfif",
      backPhoto: "/costumes/ai/nhat-binh-back.jfif",
      gallery: [
        {
          titleVi: "Tư liệu lịch sử: Mệnh phụ triều Nguyễn diện Áo Nhật Bình",
          titleEn: "Historical Archive: Royal Court Ladies in Nhat Binh",
          tagVi: "Lịch sử Hoàng triều",
          tagEn: "Imperial Archive",
          contextVi: "Ảnh tư liệu trang phục cung đình triều Nguyễn đối chiếu độ chuẩn xác của phom dáng và dải cổ nhật bình.",
          contextEn: "Historical study of Nguyen Dynasty court ladies in ceremonial Nhat Binh and Ngu Than robes.",
          imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
        },
        {
          titleVi: "Đặc tả hoa văn Phượng ổ & Thủy ba ngũ sắc",
          titleEn: "Detail: Phoenix Medallions & Five-Color Waves",
          tagVi: "Nghệ thuật thêu cung đình",
          tagEn: "Royal Embroidery",
          contextVi: "Kỹ thuật thêu kim tuyến nổi hình chim phượng, hoa sen và dải sóng nước Tam Sơn Thủy Ba chân vạt áo.",
          contextEn: "Gold metallic thread raised embroidery of phoenix, lotus, and the sacred Three Mountains Water Waves hemline.",
          imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
        },
        {
          titleVi: "Bản phục dựng Áo Nhật Bình công chúa màu Xích Đào",
          titleEn: "Princess Scarlet Nhat Binh Reproduction in Studio",
          tagVi: "Phục dựng bảo tàng",
          tagEn: "Museum Reproduction",
          contextVi: "Sắc đỏ son Xích Đào nguyên bản quy định cho bậc Công chúa triều Nguyễn chụp trong studio chuẩn bảo tàng.",
          contextEn: "Authentic scarlet silk hue reserved for Nguyen imperial princesses, photographed under museum studio lighting.",
          imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
        }
      ],
      editorialQuoteVi: "Dải cổ vuông vức đối khâm ngút ngàn uy quyền - Từng sợi chỉ vàng gửi gắm non sông thái bình.",
      editorialQuoteEn: "Rectangular imperial lapels radiating royal dignity - each golden stitch woven for celestial peace.",
      macroHotspots: [
        {
          id: "collar",
          x: 50,
          y: 22,
          titleVi: "Dải Cổ Chữ Nhật Hoàng Cung",
          titleEn: "Rectangular Imperial Lapel",
          descVi: "Dải cổ áo to bản hình chữ nhật trước ngực thêu rực rỡ chỉ kim tuyến vàng, đặc điểm nhận diện tối cao của áo Nhật Bình.",
          descEn: "Signature rectangular embroidered chest band stitched with raised gold threads, denoting highest imperial rank.",
          icon: "crown"
        },
        {
          id: "embroidery",
          x: 36,
          y: 46,
          titleVi: "Hoa Văn Phượng Ổ & Chữ Thọ",
          titleEn: "Phoenix Roundels & Longevity Seal",
          descVi: "Họa tiết chim phượng vỗ cánh trong vòng tròn khép kín đan xen hoa sen và chữ Thọ biểu trưng cho bậc mẫu nghi thiên hạ.",
          descEn: "Circular phoenix medallions and Longevity seals celebrating maternal dignity and eternal dynastic continuity.",
          icon: "sparkles"
        },
        {
          id: "hem",
          x: 50,
          y: 84,
          titleVi: "Sóng Nước Tam Sơn Thủy Ba",
          titleEn: "Three Sacred Mountain Waves",
          descVi: "Họa tiết sóng nước cuộn trào dưới chân vạt phối cùng dải màu ngũ hành, tượng trưng cho giang sơn gấm vóc thái bình thịnh trị.",
          descEn: "Sacred mountain waves cresting over elemental colored bands at hemline, embodying enduring peace across the realm.",
          icon: "waves"
        },
        {
          id: "cuff",
          x: 78,
          y: 56,
          titleVi: "Dải Ngũ Sắc Tay Áo",
          titleEn: "Five-Color Sleeve Bands",
          descVi: "5 dải vải màu ngũ hành (Xanh, Đỏ, Vàng, Trắng, Đen) viền quanh ống tay áo thụng, biểu trưng cho sự hòa hợp âm dương vũ trụ.",
          descEn: "Five elemental color bands bordering cuffs representing cosmic balance between Yin and Yang.",
          icon: "palette"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Mẫu Nghi Uy Nghi (Cầm Quạt Hoàng Cung)",
        poseTitleEn: "Imperial Regal Poise (Silk Fan Hold)",
        poseInstructionVi: "Đứng thẳng đối xứng (Symmetry), hai tà áo buông song song không cài chéo. Hai tay nâng nhẹ quạt lụa thêu phượng ngang ngực hoặc khép hờ hai mép cổ áo, ánh nhìn đoan trang cao quý.",
        poseInstructionEn: "Stand with strict frontal symmetry. Two front flaps drop parallel. Elevate embroidered silk fan softly to chest or gently rest palms along collar edge with royal serenity.",
        cameraTipsVi: "Bố cục chính diện đối xứng tuyệt đối (Symmetrical framing) trên nền bậc đá hoặc cửa son cung điện, tiêu cự 50mm hoặc 85mm f/2.0, ánh sáng tản đều hoàng gia.",
        cameraTipsEn: "Strict symmetrical framing in front of lacquered palace gates or stone stairs, 50mm or 85mm f/2.0 lens with soft royal ambient lighting.",
        accessoriesVi: "Khăn vành dây quấn kim tuyến, trâm cài tóc phượng hoàng ngọc bích, quạt lụa tơ tằm thêu tay, hài thêu phượng.",
        accessoriesEn: "Gold-wrapped khan vanh coil turban, jade phoenix hairpins, hand-embroidered silk fan, phoenix embroidered slippers."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <defs>
        <linearGradient id="goldRoyalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E5C158"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#997A15"/>
        </linearGradient>
      </defs>
      <circle cx="150" cy="180" r="110" fill="#FDF6E2" stroke="#800000" stroke-width="2"/>
      <!-- Robe Body -->
      <path d="M110 75 L70 120 L20 220 L65 240 L100 170 L95 350 L205 350 L200 170 L235 240 L280 220 L230 120 L190 75 Z" fill="url(#goldRoyalGrad)"/>
      <!-- Rectangular Front Collar (Nhat Binh band) -->
      <rect x="130" y="75" width="40" height="150" fill="#9E1B1B" stroke="#D4AF37" stroke-width="2"/>
      <!-- Collar Phoenix Embroidery Medallion -->
      <circle cx="150" cy="115" r="12" fill="#D4AF37" stroke="#FAF7F2" stroke-width="1"/>
      <path d="M144 115 Q150 108 156 115 Q150 122 144 115" fill="#9E1B1B"/>
      <!-- Five Element Sleeve Ribbons (Dải ngũ hành cổ tay ôm khít liền mạch thân áo) -->
      <polygon points="20.0,220.0 65.0,240.0 67.0,236.0 22.0,216.0" fill="#0080FF"/>
      <polygon points="22.0,216.0 67.0,236.0 69.0,232.0 24.0,212.0" fill="#E60000"/>
      <polygon points="24.0,212.0 69.0,232.0 71.0,227.9 26.0,207.9" fill="#FFFF00"/>
      <polygon points="26.0,207.9 71.0,227.9 73.0,223.9 28.0,203.9" fill="#FFFFFF"/>
      <polygon points="28.0,203.9 73.0,223.9 75.1,219.9 30.1,199.9" fill="#00A859"/>
      <polygon points="280.0,220.0 235.0,240.0 233.0,236.0 278.0,216.0" fill="#0080FF"/>
      <polygon points="278.0,216.0 233.0,236.0 231.0,232.0 276.0,212.0" fill="#E60000"/>
      <polygon points="276.0,212.0 231.0,232.0 229.0,227.9 274.0,207.9" fill="#FFFF00"/>
      <polygon points="274.0,207.9 229.0,227.9 227.0,223.9 272.0,203.9" fill="#FFFFFF"/>
      <polygon points="272.0,203.9 227.0,223.9 224.9,219.9 269.9,199.9" fill="#00A859"/>
      <!-- Gold Embroidered Sleeve Hem Outlines -->
      <line x1="20" y1="220" x2="65" y2="240" stroke="#D4AF37" stroke-width="1.8"/>
      <line x1="280" y1="220" x2="235" y2="240" stroke="#D4AF37" stroke-width="1.8"/>
      <!-- Water Wave Pattern (Tam son thuy ba) at hem -->
      <path d="M95 330 C110 320 120 340 135 330 C150 320 160 340 175 330 C190 320 200 340 205 330 L205 350 L95 350 Z" fill="#1C3144"/>
      <path d="M95 340 C110 330 120 350 135 340 C150 330 160 350 175 340 C190 330 200 350 205 340" stroke="#D4AF37" stroke-width="2" fill="none"/>
      <!-- Royal Golden Diadem / Headdress -->
      <path d="M130 50 Q150 35 170 50 L165 58 Q150 48 135 58 Z" fill="#D4AF37" stroke="#800000" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: "giao-linh",
    nameVi: "Áo Giao Lĩnh (Tràng Vạt)",
    nameEn: "Giao Linh Cross-Collar Robe",
    era: "Thời Lý - Trần - Lê (TK XI - XVIII)",
    eraCategory: "ly-tran-le",
    form: "Nam & Nữ (Vạt Hữu Nhậm vắt chéo)",
    colors: ["#3F5E4D", "#9E1B1B", "#1C3144", "#C4A482"],
    shortDescVi: "Cổ áo vắt chéo Hữu Nhậm cổ kính của các triều đại hưng thịnh Lý - Trần - Hậu Lê.",
    shortDescEn: "Ancient cross-collar robe with left-over-right lapel rule from the Ly-Tran-Le golden eras.",
    detailsVi: `Áo Giao Lĩnh là cổ phục Đông Á có bề dày hàng nghìn năm tại Việt Nam, thịnh hành từ thời Lý, Trần tới thời Lê Trung Hưng. Điểm nhận diện sống còn là cổ áo vắt chéo theo quy tắc 'Hữu Nhậm' (vạt bên trái đè lên vạt bên phải) - tượng trưng cho sinh khí, trật tự xã hội và đạo người sống. Ngược lại, 'Tả Nhậm' chỉ dành cho người đã khuất. Trang phục thường có vạt dài thướt tha hoặc kết hợp áo ngắn cùng 'thường' (váy quây dài) và đai thắt lưng lụa buông rủ bay bổng.`,
    detailsEn: `A foundational East Asian silhouette flourishing throughout Vietnam's Ly, Tran, and Later Le dynasties. Its core rule is 'Huu Nham' (left lapel crossed securely over right), symbolizing life vitality, civil order, and societal harmony. Crossing right-over-left (Ta Nham) was reserved strictly for burial shrouds or nomadic cultures. Frequently paired with sweeping skirts (thuong) and streaming silk sashes.`,
    anatomyHighlights: {
      panelsVi: "Cổ áo giao nhau trước ngực, vạt trái vắt qua ngực phải (quy tắc bất di bất dịch Hữu Nhậm)",
      panelsEn: "Cross-collar neckline, left lapel crossing over right chest (strictly Huu Nham)",
      collarVi: "Cổ bẻ vát chữ V khoáng đạt, viền vải màu tương phản hoặc cùng màu thân áo",
      collarEn: "Diagonal V-lapel collar, bound with contrasting or matching silk ribbon",
      buttonsVi: "Cố định bằng dải dây buộc lụa (thao) hoặc dải đai lưng (đai lụa/cách đới) thắt nơ trước bụng",
      buttonsEn: "Fastened with knotted silk tie cords and an elaborate flowing waist sash",
      seamVi: "Ống tay thụng rộng hoặc tay thường buông rủ; vạt áo dài hoặc mặc kết hợp váy thường quây",
      seamEn: "Broad flowing sleeves draping softly; lower body paired with floor-sweeping wrap skirts"
    },
    fabricsVi: "Tơ đũi mộc mạc, Sa the dệt thoáng mát, Lụa nhuộm củ nâu và lá chàm.",
    fabricsEn: "Raw tussah silk, breathable gauze, silk naturally dyed with wild yam and indigo.",
    philosophyVi: "Quy tắc Hữu Nhậm thể hiện sinh khí (Dương khí) và nền văn hiến Đại Việt, đối lập với phong tục du mục phương Bắc.",
    philosophyEn: "The Huu Nham rule embodies cosmic life-energy (Yang vitality) and civilized Dai Viet identity.",
    genzStylingVi: "Phối áo ngắn Giao Lĩnh tơ đũi cùng chân váy xếp ly dài hiện đại, thắt lưng da tối giản và túi tote canvas in hoa văn cổ.",
    genzStylingEn: "Pair cropped Giao Linh top with modern pleated maxi skirts, clean leather belt, and vintage heritage totes.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Chùa Phật Tích & Phố Cổ Hội An",
      locationEn: "Phat Tich Pagoda & Hoi An Ancient Town",
      photoTitleVi: "Áo Giao Lĩnh Hữu Nhậm (Mặt trước)",
      photoTitleEn: "Dai Viet Cross-Collar Giao Linh (Front View)",
      shootingNotesVi: "Phục dựng chuẩn mực cổ phục Áo Giao Lĩnh thời Lý - Trần - Lê với góc nhìn mặt trước và mặt sau.",
      shootingNotesEn: "Authentic historical reproduction of Dai Viet Giao Linh showing front and back silhouettes.",
      heroPhoto: "/costumes/ai/giao-linh-front.webp",
      frontPhoto: "/costumes/ai/giao-linh-front.webp",
      backPhoto: "/costumes/ai/giao-linh-back.webp",
      gallery: [
        {
          titleVi: "Tư liệu điêu khắc: Tượng thời Lý - Trần tại di tích cổ",
          titleEn: "Sculptural Evidence: Ly-Tran Statuary Artifacts",
          tagVi: "Khảo cổ học",
          tagEn: "Archaeology",
          contextVi: "Căn cứ theo chạm khắc tượng đá thời Lý tại chùa Phật Tích (1057) với cổ vắt chéo Hữu Nhậm và thường váy quây.",
          contextEn: "Archaeological stone reliefs at Phat Tich Pagoda (1057) showcasing left-over-right collar and pleated wrap skirt.",
          imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
        },
        {
          titleVi: "Góc chụp cận cổ áo Hữu Nhậm (Vạt trái đè lên vạt phải)",
          titleEn: "Macro: Authentic Left-over-Right Huu Nham Collar",
          tagVi: "Nguyên tắc sống còn",
          tagEn: "Sartorial Decorum",
          contextVi: "Cổ áo chéo hình chữ Y để lộ bờ cổ thanh tân, thắt lưng đai lụa buông dải hai bên eo mềm mại.",
          contextEn: "Y-shaped cross collar framing the neckline, secured with flowing dual silk waist ribbons.",
          imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
        },
        {
          titleVi: "Chuyển động váy thường bồng bềnh tại phố cổ Hội An",
          titleEn: "Flowing Pleated Skirt in Motion at Hoi An",
          tagVi: "Chụp ngoại cảnh",
          tagEn: "Outdoor Editorial",
          contextVi: "Tà áo the mỏng nhẹ bay trong gió chiều thu trên những con ngõ vàng cổ kính của Hội An.",
          contextEn: "Airy gauze tunic fluttering in autumn river breezes along the yellow heritage alleyways of Hoi An.",
          imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80"
        }
      ],
      editorialQuoteVi: "Hữu Nhậm thuận theo lẽ trời đất - Vạt trái đè vạt phải dưỡng trọn sinh khí Đại Việt ngàn năm.",
      editorialQuoteEn: "Left overlapping right honors cosmic natural law - preserving Dai Viet vibrant life vitality through the ages.",
      macroHotspots: [
        {
          id: "collar",
          x: 50,
          y: 22,
          titleVi: "Cổ Chéo Hữu Nhậm",
          titleEn: "Huu Nham Cross Collar",
          descVi: "Cổ áo vắt chéo hình chữ Y, vạt trái đè lên vạt phải là nguyên tắc sống còn đại diện cho ánh sáng và dương khí.",
          descEn: "Y-shaped cross collar with left lapel firmly over right, strictly adhering to ancestral Huu Nham rules of life.",
          icon: "check-circle"
        },
        {
          id: "sleeve",
          x: 75,
          y: 40,
          titleVi: "Tay Áo Thụng Bay Bổng",
          titleEn: "Voluminous Flared Sleeves",
          descVi: "Ống tay thụng dài rộng đặc trưng thời Lý - Trần - Lê, tung bay uyển chuyển theo từng nhịp bước chân.",
          descEn: "Sweeping wide sleeves fluttering gracefully in the wind, evoking classical medieval Dai Viet nobility.",
          icon: "wind"
        },
        {
          id: "sash",
          x: 50,
          y: 48,
          titleVi: "Đai Lụa Buông Dài",
          titleEn: "Flowing Silk Sash",
          descVi: "Dải đai lụa quấn ngang eo cố định vạt áo, hai dải ruy băng lụa buông rủ dài trước thân váy tạo nét thanh tao.",
          descEn: "Long flowing silk waist sash fastening cross-panels with twin decorative ribbons streaming downward.",
          icon: "ribbon"
        },
        {
          id: "skirt",
          x: 50,
          y: 85,
          titleVi: "Thường (Váy) Xếp Ly Thướt Tha",
          titleEn: "Pleated Wrap Skirt",
          descVi: "Váy quây (thường) xếp ly nhẹ nhàng bên dưới, uyển chuyển bồng bềnh như mây khi lướt đi.",
          descEn: "Pleated wrap skirt (thuong) draping down to floor, moving effortlessly like floating clouds.",
          icon: "layers"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Tiên Phong Đón Gió (Vạt Áo Bay)",
        poseTitleEn: "Ethereal Wind-Catching Pose",
        poseInstructionVi: "Bước nghiêng người 30-45 độ so với ống kính, một tay nhẹ nâng vạt tay áo thụng để gió thổi tung bay, tạo cảm giác phiêu bồng tựa mây trời Đại Việt.",
        poseInstructionEn: "Angle body 30-45° toward the camera. Gently lift the wide sleeve to catch passing breeze, evoking airy ethereal grace of medieval Dai Viet.",
        cameraTipsVi: "Chụp bắt chuyển động (Shutter speed 1/500s) bắt trọn làn vải tung bay, tiêu cự 70-200mm chụp từ xa với hậu cảnh chùa cổ hoặc rặng tre rêu phong.",
        cameraTipsEn: "High shutter speed (1/500s) freezing fabric motion, 70-200mm telephoto lens with compressed backdrop of ancient pagoda moss or bamboo.",
        accessoriesVi: "Trâm gỗ mun / trâm đồng cổ truyền, quạt xếp nan tre, túi gấm thêu dây rút, hài mũi cong cổ phong.",
        accessoriesEn: "Ebony or bronze hairpins, bamboo folding fan, embroidered drawstring pouch, upturned tip shoes."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <defs>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4E705B"/>
          <stop offset="50%" stop-color="#2D4A3E"/>
          <stop offset="100%" stop-color="#1B332A"/>
        </linearGradient>
      </defs>
      <circle cx="150" cy="180" r="110" fill="#EBF2ED" stroke="#2D4A3E" stroke-width="2"/>
      <!-- Giao Linh Robe -->
      <path d="M115 70 L65 125 L15 220 L60 240 L105 165 L95 350 L205 350 L195 165 L240 240 L285 220 L235 125 L185 70 Z" fill="url(#emeraldGrad)"/>
      <!-- Inner White Garment Collar -->
      <path d="M125 70 L150 115 L175 70" stroke="#FAF7F2" stroke-width="6" fill="none"/>
      <!-- Crossed Collar: Huu Nham (Left Over Right) -->
      <path d="M175 70 L130 140" stroke="#D4AF37" stroke-width="5"/>
      <path d="M125 70 L170 145 L175 220" stroke="#F4EBD9" stroke-width="6" stroke-linecap="round"/>
      <path d="M125 70 L170 145 L175 220" stroke="#800000" stroke-width="2"/>
      <!-- Flowing Silk Belt (Dai Lung) -->
      <rect x="110" y="190" width="80" height="15" fill="#800000" rx="3"/>
      <!-- Belt Ribbon Drops -->
      <path d="M145 205 L140 290 L148 290 L153 205 Z" fill="#800000"/>
      <path d="M155 205 L160 310 L168 310 L163 205 Z" fill="#D4AF37"/>
      <!-- Sweeping Lower Skirt (Thuong) Border -->
      <path d="M95 350 L205 350" stroke="#D4AF37" stroke-width="3"/>
      <!-- Headdress / Topknot -->
      <circle cx="150" cy="48" r="14" fill="#222222"/>
      <line x1="130" y1="48" x2="170" y2="48" stroke="#D4AF37" stroke-width="2"/>
    </svg>`
  },
  {
    id: "tu-than",
    nameVi: "Áo Tứ Thân",
    nameEn: "Ao Tu Than (Four-Part Tunic)",
    era: "Vùng Đồng bằng Bắc Bộ (Thế kỷ XII - XX)",
    eraCategory: "folk",
    form: "Nữ giới miền Bắc (Lễ hội & Dân gian)",
    colors: ["#6B4226", "#9E1B1B", "#2D4A3E", "#E5C158"],
    shortDescVi: "Vẻ đẹp trữ tình Kinh Bắc với nón Quai Thao, yếm đào và dải lụa thắt lưng buông lơi.",
    shortDescEn: "Northern lyricism featuring four loose panels, scarlet yem halter, and Quai Thao flat hat.",
    detailsVi: `Áo Tứ Thân gắn liền với không gian quan họ Bắc Ninh và nét duyên mộc mạc của phụ nữ Bắc Bộ. Áo gồm 4 vạt: 2 vạt sau khâu liền thành sống lưng, 2 vạt trước thả dài tự do để buộc vạt trước bụng hoặc buông thướt tha. Phía trong là chiếc Yếm đào thắm sắc che ngực, bên ngoài khoác áo tứ thân màu nâu trầm hoặc đen huyền bí, điểm xuyết thắt lưng lụa hồng đào buông thả tạo nên sự mềm mại, ý nhị và phóng khoáng của thiếu nữ thôn dã.`,
    detailsEn: `Deeply tied to northern Quan Ho folk singing and delta villages. Comprising four panels: two sewn together along the back, and two front panels left unbuttoned to be gently tied at the abdomen. Underneath rests the vibrant silk 'Yem' halter top. Complemented by the expansive 'Non Quai Thao' palm hat and delicate pink waist sashes, reflecting rural grace and subtle charm.`,
    anatomyHighlights: {
      panelsVi: "4 thân vải (2 thân sau khâu liền, 2 vạt trước buông tự do buộc nút trước eo)",
      panelsEn: "4 panels (2 back panels stitched down spine, 2 front panels left open to tie gracefully at waist)",
      collarVi: "Cổ tròn khoét sâu để lộ yếm đào cổ xây hoặc yếm cánh sen rực rỡ bên trong",
      collarEn: "Deep collarless neckline showcasing the vibrant silk yem halter underneath",
      buttonsVi: "Không sử dụng nút khuy, vạt trước được thắt nút mềm mại cùng dải đai lụa hồng",
      buttonsEn: "Buttonless front; gently tied at the waist with pastel silk sashes",
      seamVi: "Đường sống lưng khâu chắc chắn; kết hợp nón quai thao to bản và khăn mỏ quạ đen tuyền",
      seamEn: "Sturdy spine stitch; accessorized with broad palm hat (quai thao) and black scarf"
    },
    fabricsVi: "Vải đũi tơ tằm thô mộc, Lụa the nhuộm củ nâu thảo mộc, Yếm lụa tơ sống.",
    fabricsEn: "Raw textured tussah, natural yam-dyed brown silk, crisp pure silk halter.",
    philosophyVi: "Biểu trưng cho vẻ đẹp lao động cần cù, đức hy sinh và nét duyên ngầm đằm thắm của người phụ nữ nông thôn Việt Nam.",
    philosophyEn: "Celebrates humble rural labor, gentle endurance, and subtle folk feminine charm.",
    genzStylingVi: "Biến tấu chiếc Yếm đào lụa thành áo corset/halter top kết hợp blazer oversize và quần ống suông tôn dáng.",
    genzStylingEn: "Style the silk yem as an elevated halter-top layered beneath an oversized tailored blazer.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Làng Quan Họ Diềm Xá (Bắc Ninh) & Cổng Làng Cổ",
      locationEn: "Diem Village (Bac Ninh) & Ancient Village Gates",
      photoTitleVi: "Áo Tứ Thân Kinh Bắc (Mặt trước)",
      photoTitleEn: "Kinh Bac Four-Panel Dress (Front View)",
      shootingNotesVi: "Phục dựng chuẩn mực cổ phục Áo Tứ Thân liền chị Kinh Bắc góc nhìn mặt trước và mặt sau.",
      shootingNotesEn: "Authentic historical reproduction of Kinh Bac Tu Than dress showing front and back views.",
      heroPhoto: "/costumes/ai/tu-than-front.webp",
      frontPhoto: "/costumes/ai/tu-than-front.webp",
      backPhoto: "/costumes/ai/tu-than-back.webp",
      gallery: [
        {
          titleVi: "Tư liệu thực tế: Liền chị Quan họ Bắc Ninh hát đối đáp",
          titleEn: "Real-Life Showcase: Bac Ninh Folk Singers in Performance",
          tagVi: "Di sản UNESCO",
          tagEn: "UNESCO Heritage",
          contextVi: "Hình ảnh các nghệ nhân quan họ diện áo tứ thân the thâm, yếm đào, đầu đội khăn mỏ quạ tại hội Lim.",
          contextEn: "Master folk singers performing in dark silk Tu Than, scarlet yem, and raven-beak headscarves at Lim Festival.",
          imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85"
        },
        {
          titleVi: "Chi tiết nón quai thao đan lá cọ & quai thao dệt tơ",
          titleEn: "Close-up: Handwoven Quai Thao Hat & Silk Cords",
          tagVi: "Thủ công Kinh Bắc",
          tagEn: "Artisan Craft",
          contextVi: "Chiếc nón tròn to bản phẳng phiu đường kính gần 80cm, đính quai thao tơ tằm tím than sang trọng.",
          contextEn: "Expansive 80cm flat palm hat adorned with rich purple braided silk hanging cords.",
          imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
        },
        {
          titleVi: "Bốn vạt áo tứ thân buông rủ bên bến nước sân đình",
          titleEn: "Four Panels Draped by Village Pond Courtyard",
          tagVi: "Bối cảnh làng quê",
          tagEn: "Village Atmosphere",
          contextVi: "Hai vạt trước buộc nút bồng duyên dáng phía trước bụng, hai vạt sau may ghép sống lưng chính giữa.",
          contextEn: "Two front panels gracefully tied in front, while two back panels are seamed along the central spine.",
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
        }
      ],
      editorialQuoteVi: "Nón quai thao nghiêng che nụ cười e ấp - Yếm thắm lưng ong dệt trọn nghĩa tình Kinh Bắc.",
      editorialQuoteEn: "Under the wide palm hat shines a bashful smile - scarlet yem and gentle waist weaving Kinh Bac devotion.",
      macroHotspots: [
        {
          id: "yem",
          x: 50,
          y: 25,
          titleVi: "Yếm Đào Cổ Xây",
          titleEn: "Scarlet Silk Yem",
          descVi: "Yếm lụa đào dệt thủ công che ngực, cổ xây tròn thanh tân lấp ló sau vạt áo the mỏng tao nhã.",
          descEn: "Pure scarlet silk yem halter framing the collarbone delicately beneath sheer dark outer panels.",
          icon: "heart"
        },
        {
          id: "knot",
          x: 50,
          y: 52,
          titleVi: "Hai Vạt Trước Buộc Nút",
          titleEn: "Front Knot Flaps",
          descVi: "Hai vạt áo trước được thắt nút nhẹ nhàng trước bụng, tạo điểm nhấn tôn vòng eo thon thắt đáy lưng ong.",
          descEn: "Two front panels tied in a decorative knot over the lower abdomen, accentuating slender waistlines.",
          icon: "link"
        },
        {
          id: "sash",
          x: 48,
          y: 48,
          titleVi: "Bao Xanh Bao Đào Thắt Lưng",
          titleEn: "Dual Silk Sashes",
          descVi: "Dải lụa kép màu xanh lục và hồng đào mềm mại quấn quanh eo và buông dải dài tha thướt.",
          descEn: "Twin flowing silk sashes in emerald and rose hues draped gracefully across hips.",
          icon: "palette"
        },
        {
          id: "hat",
          x: 72,
          y: 15,
          titleVi: "Nón Quai Thao Ba Tầm",
          titleEn: "Quai Thao Palm Hat",
          descVi: "Nón tròn to bản phẳng phiu đan từ lá cọ phơi sương, quai thao tơ tằm thắt nút thả dài chấm ngực.",
          descEn: "Broad circular flat palm hat with braided silk cords cascading down to mid-chest.",
          icon: "disc"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Liền Chị Nghiêng Nón (E Ấp Nụ Cười)",
        poseTitleEn: "Kinh Bac Maiden with Slanted Palm Hat",
        poseInstructionVi: "Một tay nâng nhẹ vành nón quai thao nghiêng che nửa khuôn mặt, đầu hơi cúi e ấp, miệng hé nụ cười duyên. Dáng đứng hơi chùng gối mềm mại.",
        poseInstructionEn: "One hand gently tilts the rim of the quai thao hat half-framing the face, head tilted in modest shyness with a gentle smile. Soft relaxed knee stance.",
        cameraTipsVi: "Chụp chân dung bán thân (Medium Close-up), tiêu cự 85mm f/1.4 tập trung vào ánh mắt và nụ cười sau vành nón, ánh sáng ven nắng sớm bến đò/cổng làng.",
        cameraTipsEn: "Medium close-up portrait, 85mm f/1.4 focusing on eyes and shy smile beneath hat rim, soft morning rim light by ancient village gates.",
        accessoriesVi: "Nón quai thao, khăn mỏ quạ nhung đen, hoa tai quả nhót bạc, xà tích bạc bên hông, guốc mộc.",
        accessoriesEn: "Broad palm hat, black velvet raven-beak scarf, silver berry earrings, silver hip chains, wooden clogs."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <circle cx="150" cy="180" r="110" fill="#FAF1E6" stroke="#6B4226" stroke-width="2"/>
      <!-- Broad Quai Thao Hat (Background) -->
      <ellipse cx="150" cy="70" rx="90" ry="16" fill="#F4EBD9" stroke="#B38B59" stroke-width="2"/>
      <!-- Scarlet Yem (Halter Top) -->
      <polygon points="150,85 116,140 126,205 174,205 184,140" fill="#B32B2B" stroke="#800000" stroke-width="1.5"/>
      <line x1="150" y1="85" x2="150" y2="70" stroke="#B32B2B" stroke-width="2"/>
      <!-- Dark Outer Tu Than Coat -->
      <path d="M120 100 L75 140 L35 220 L70 235 L105 170 L100 340 L125 340 L135 200 L120 100 Z" fill="#4A2E1B"/>
      <path d="M180 100 L225 140 L265 220 L230 235 L195 170 L200 340 L175 340 L165 200 L180 100 Z" fill="#4A2E1B"/>
      <!-- Tied Waist Sash (Dai Lụa Hồng) -->
      <ellipse cx="150" cy="195" rx="25" ry="8" fill="#E88288"/>
      <path d="M145 200 L138 310 L146 310 L150 200 Z" fill="#E88288"/>
      <path d="M152 200 L158 325 L166 325 L157 200 Z" fill="#F3E5AB"/>
      <!-- Long Flowing Skirt underneath -->
      <rect x="110" y="200" width="80" height="150" fill="#222222" opacity="0.9"/>
      <!-- Hair wrapped in scarf (Khan Mo Qua) -->
      <path d="M135 65 Q150 48 165 65 L150 78 Z" fill="#222222"/>
    </svg>`
  },
  {
    id: "ba-ba",
    nameVi: "Áo Bà Ba",
    nameEn: "Ao Ba Ba (Southern Vietnamese Silk Shirt)",
    era: "Nam Bộ (Thế kỷ XIX - Hiện đại)",
    eraCategory: "folk",
    form: "Nam & Nữ (Dân dã, duyên dáng sông nước)",
    colors: ["#1C3144", "#2D4A3E", "#FAF7F2", "#6B4226"],
    shortDescVi: "Biểu tượng hồn hậu miền Tây sông nước với hàng cúc bấm và chiếc khăn rằn mộc mạc.",
    shortDescEn: "The soul of the Southern Mekong Delta, featuring snap buttons and checkered bandana.",
    detailsVi: `Áo Bà Ba xuất hiện vào khoảng thế kỷ 19 ở miền Tây Nam Bộ, được cải tiến để thuận tiện cho đời sống lao động sông nước nhưng vẫn tôn lên đường cong mềm mại của phụ nữ Việt. Áo may cổ tròn, không bâu, thân trước xẻ thẳng có hàng cúc bấm (nút bấm), hai bên hông xẻ tà ngắn và có 2 túi vuông tiện dụng. Phối cùng quần đen lụa ống rộng và khăn rằn Nam Bộ, chiếc Áo Bà Ba toát lên vẻ đẹp chân phương, phóng khoáng, kiên cường của con người phương Nam.`,
    detailsEn: `Emerging in the 19th-century Mekong Delta, Ao Ba Ba was adapted for agile agricultural and river living while gracefully following feminine silhouettes. Collarless with a round neckline, front-slit snap buttons, side slits, and two deep hip pockets. Styled with flowing black silk trousers and the iconic black-and-white checkered bandana (khan ran), embodying warmth, sincerity, and resilient southern charm.`,
    anatomyHighlights: {
      panelsVi: "Thân áo trước xẻ đôi cài cúc, thân sau liền mảnh, hai bên hông xẻ tà ngắn từ eo xuống",
      panelsEn: "Front split buttoned down middle, seamless back, short side slits at hips",
      collarVi: "Cổ tròn thanh thoát, không có bâu, tạo sự mát mẻ, khoáng đạt",
      collarEn: "Clean collarless scoop neck offering breeziness in tropical climate",
      buttonsVi: "Hàng cúc bấm (khuy bấm) kim loại hoặc nút bọc vải nhỏ nhắn chạy dọc giữa ngực",
      buttonsEn: "Central row of neat snap buttons or fabric-covered buttons",
      seamVi: "Hai túi vuông may nổi phía dưới tà áo trước; may chít eo nhẹ nhàng tôn dáng",
      seamEn: "Two patch pockets on the lower front; subtle waist darting enhancing feminine form"
    },
    fabricsVi: "Vải lụa mỏng mượt, Lãnh Mỹ A đen bóng trứ danh Tân Châu, Kate mềm.",
    fabricsEn: "Silky soft satin, legendary glossy black Lanh My A silk from Tan Chau, soft cotton.",
    philosophyVi: "Hồn hậu, hào sảng, kiên định và gắn liền với tinh thần khai hoang mở cõi phương Nam.",
    philosophyEn: "Warm-hearted openness and resilient pioneering spirit of the Southern riverways.",
    genzStylingVi: "Phối áo bà ba lụa màu pastel cùng quần jeans ống rộng cạp cao và guốc mộc quai nhung đỏ.",
    genzStylingEn: "Pair pastel silk Ao Ba Ba with high-waisted wide-leg denim and traditional wooden clogs.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Chợ Nổi Cái Răng & Bến Ninh Kiều (Cần Thơ)",
      locationEn: "Cai Rang Floating Market & Ninh Kieu Wharf",
      photoTitleVi: "Áo Bà Ba Nam Bộ (Mặt trước)",
      photoTitleEn: "Southern Silk Ao Ba Ba (Front View)",
      shootingNotesVi: "Phục dựng chuẩn mực phục trang Áo Bà Ba Nam Bộ với góc nhìn mặt trước và mặt sau.",
      shootingNotesEn: "Authentic reproduction of Southern Ao Ba Ba showing front and back views.",
      heroPhoto: "/costumes/ai/ba-ba-front.png",
      frontPhoto: "/costumes/ai/ba-ba-front.png",
      backPhoto: "/costumes/ai/ba-ba-back.webp",
      gallery: [
        {
          titleVi: "Thiếu nữ Nam Bộ chèo xuồng diện Áo Bà Ba lụa xanh",
          titleEn: "Mekong Woman in Sky-Blue Silk Ao Ba Ba on Canoe",
          tagVi: "Đời sống sông nước",
          tagEn: "Riverfront Life",
          contextVi: "Áo bà ba xẻ tà hai bên hông cao ngang eo, giúp vận động khoan thai, linh hoạt khi chèo xuồng trên kênh rạch.",
          contextEn: "Waist-height side slits allow fluid unrestricted motion while navigating southern delta canals.",
          imageUrl: "/costumes/ba-ba-hero.png"
        },
        {
          titleVi: "Cận cảnh hai túi may ốp phía trước & cúc bấm cài",
          titleEn: "Detail: Two Front Patch Pockets & Snap Buttons",
          tagVi: "Đặc trưng may đo",
          tagEn: "Tailoring Signature",
          contextVi: "Hai túi vuông nhỏ phía trước vạt áo - nét đặc trưng không thể trộn lẫn để đựng trầu cau, tiền lẻ của người miền Tây.",
          contextEn: "Twin front patch pockets, the unmistakable southern signature designed for betel leaves and small coins.",
          imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
        },
        {
          titleVi: "Khăn rằn Nam Bộ dệt kẻ sọc caro đen - trắng",
          titleEn: "Authentic Black & White Checkered Mekong Bandana",
          tagVi: "Phụ kiện linh hồn",
          tagEn: "Soul Accessory",
          contextVi: "Chiếc khăn rằn mộc mạc vắt qua vai che nắng gió, thấm đẫm ân tình phù sa của người phương Nam.",
          contextEn: "Humble checkered bandana draped across the shoulder, enduring symbol of southern warmth and resilience.",
          imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
        }
      ],
      editorialQuoteVi: "Chiếc áo bà ba ngạt ngào hương phù sa - Khăn rằn mộc mạc thắm đượm tình người phương Nam.",
      editorialQuoteEn: "Ao Ba Ba fragrant with Mekong silt - humble checkered scarf weaving warm southern devotion.",
      macroHotspots: [
        {
          id: "collar",
          x: 50,
          y: 20,
          titleVi: "Cổ Tròn & Hàng Cúc Bấm",
          titleEn: "Round Collar & Snaps",
          descVi: "Cổ áo tròn xẻ giữa mềm mại, nẹp áo trước đính hàng cúc bấm kim loại hoặc nút ngọc bấm nhẹ nhàng, tiện lợi.",
          descEn: "Collarless soft scoop neck with vertical front placket fastened by smooth snap buttons.",
          icon: "circle"
        },
        {
          id: "pockets",
          x: 38,
          y: 54,
          titleVi: "Hai Túi Đắp Tiện Dụng",
          titleEn: "Two Front Patch Pockets",
          descVi: "Hai túi vuông may nổi phía trước vạt áo - nét đặc trưng không thể nhầm lẫn của người Nam Bộ để đựng trầu cau, tiền lẻ.",
          descEn: "Signature twin patch pockets on the lower front panels, designed for betel leaves and small coins.",
          icon: "box"
        },
        {
          id: "slit",
          x: 64,
          y: 52,
          titleVi: "Xẻ Tà Hông Thoải Mái",
          titleEn: "Waist-High Side Slits",
          descVi: "Đường xẻ tà ngắn từ eo xuống hông giúp người mặc cử động tự do, linh hoạt chèo xuồng trên kênh rạch.",
          descEn: "Short side slits starting at waist level ensuring fluid agility for river canoeing and daily motion.",
          icon: "scissors"
        },
        {
          id: "scarf",
          x: 32,
          y: 36,
          titleVi: "Khăn Rằn Kẻ Sọc Caro",
          titleEn: "Checkered Bandana",
          descVi: "Chiếc khăn rằn bông dệt thủ công đen trắng vắt nhẹ qua vai, thấm đượm giọt mồ hôi và ân tình sông nước.",
          descEn: "Handwoven black-and-white checkered bandana draped over shoulder, soul of Mekong heritage.",
          icon: "flag"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Cô Ba Nam Bộ (Bên Mạn Thuyền & Nón Lá)",
        poseTitleEn: "Southern River Maiden by Wooden Sampan",
        poseInstructionVi: "Đứng bên mũi xuồng hoặc mạn cầu khỉ, một tay cầm nón lá nghiêng che ngực, một tay buông tự nhiên hoặc vịn mạn thuyền. Ánh nhìn hồn hậu, nụ cười rạng rỡ.",
        poseInstructionEn: "Stand by wooden canoe bow or rustic bridge. One hand rests on conical hat, other rests naturally or touches boat rim. Warm candid smile.",
        cameraTipsVi: "Chụp ngoại cảnh toàn cảnh hoặc 3/4 người, tiêu cự 35mm hoặc 50mm bắt trọn khung cảnh sông nước chợ nổi, ánh nắng nhiệt đới rực rỡ buổi sớm 7:00 - 8:30.",
        cameraTipsEn: "Environmental wide to 3/4 portrait, 35mm or 50mm capturing vibrant floating market river background, early tropical morning sun 7:00 - 8:30 AM.",
        accessoriesVi: "Khăn rằn Nam Bộ (kẻ caro đen-trắng hoặc đỏ-trắng), nón lá chóp nhọn lá buông, guốc mộc gót thấp quai nhung.",
        accessoriesEn: "Southern checkered scarf, conical palm hat, velvet-strap wooden clogs."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <circle cx="150" cy="180" r="110" fill="#E8EEF5" stroke="#1C3144" stroke-width="2"/>
      <!-- Black Silk Trousers (Quần lụa đen giắt gọn gàng bên trong áo, rủ mềm mại từ vạt áo) -->
      <polygon points="124,185 118,212 108,358 147,358 149,228 149,185" fill="#18181B" stroke="#09090B" stroke-width="1"/>
      <polygon points="176,185 182,212 192,358 153,358 151,228 151,185" fill="#18181B" stroke="#09090B" stroke-width="1"/>
      <line x1="127" y1="216" x2="127" y2="355" stroke="#374151" stroke-width="1" opacity="0.6"/>
      <line x1="173" y1="216" x2="173" y2="355" stroke="#374151" stroke-width="1" opacity="0.6"/>
      <!-- Ao Ba Ba Body (Độ dài ngang hông chuẩn mực, eo lượn nhẹ, xẻ tà hai bên) -->
      <path d="M125 74 Q150 90 175 74 L208 102 L246 172 L224 184 L184 138 Q180 168 184 212 Q150 216 116 212 Q120 168 116 138 L76 184 L54 172 L92 102 Z" fill="#2C5E82" stroke="#1B3A52" stroke-width="1.5"/>
      <!-- Round Collar Line (Cổ tròn thoáng mát không bâu) -->
      <path d="M125 74 Q150 90 175 74" stroke="#FAF7F2" stroke-width="2" fill="none"/>
      <!-- Southern Checkered Bandana (Khăn Rằn Nam Bộ buông rủ qua vai) -->
      <path d="M106 82 Q136 115 132 205 L118 205 Q120 115 95 82 Z" fill="#FAF7F2" stroke="#222222" stroke-width="1.2"/>
      <line x1="98" y1="102" x2="132" y2="114" stroke="#222222" stroke-width="2"/>
      <line x1="103" y1="124" x2="133" y2="136" stroke="#222222" stroke-width="2"/>
      <line x1="108" y1="146" x2="133" y2="158" stroke="#222222" stroke-width="2"/>
      <line x1="112" y1="168" x2="132" y2="178" stroke="#222222" stroke-width="2"/>
      <line x1="115" y1="190" x2="130" y2="198" stroke="#222222" stroke-width="2"/>
      <!-- Side Slits (Xẻ tà hai bên hông) -->
      <line x1="116" y1="180" x2="116" y2="212" stroke="#162E40" stroke-width="2"/>
      <line x1="184" y1="180" x2="184" y2="212" stroke="#162E40" stroke-width="2"/>
      <!-- Front Placket with Buttons (Hàng cúc cài ngực) -->
      <line x1="150" y1="90" x2="150" y2="216" stroke="#1B3A52" stroke-width="2"/>
      <circle cx="150" cy="108" r="2.8" fill="#FAF7F2" stroke="#1B3A52" stroke-width="1"/>
      <circle cx="150" cy="132" r="2.8" fill="#FAF7F2" stroke="#1B3A52" stroke-width="1"/>
      <circle cx="150" cy="156" r="2.8" fill="#FAF7F2" stroke="#1B3A52" stroke-width="1"/>
      <circle cx="150" cy="180" r="2.8" fill="#FAF7F2" stroke="#1B3A52" stroke-width="1"/>
      <circle cx="150" cy="204" r="2.8" fill="#FAF7F2" stroke="#1B3A52" stroke-width="1"/>
      <!-- Two Traditional Front Pockets (Hai túi bà ba phía trước) -->
      <rect x="122" y="180" width="20" height="24" rx="3" fill="#244F6E" stroke="#1B3A52" stroke-width="1.2"/>
      <line x1="122" y1="185" x2="142" y2="185" stroke="#FAF7F2" stroke-width="0.8" opacity="0.8"/>
      <rect x="158" y="180" width="20" height="24" rx="3" fill="#244F6E" stroke="#1B3A52" stroke-width="1.2"/>
      <line x1="158" y1="185" x2="178" y2="185" stroke="#FAF7F2" stroke-width="0.8" opacity="0.8"/>
    </svg>`
  },
  {
    id: "ao-dai",
    nameVi: "Áo Dài Truyền Thống (Tân Thời & Raglan)",
    nameEn: "Vietnamese Traditional Ao Dai",
    era: "Thế kỷ XX - Hiện đại",
    eraCategory: "hien-dai",
    form: "Nữ & Nam (Quốc phục biểu trưng)",
    colors: ["#FFFDF9", "#FED7E2", "#DB2777", "#10B981"],
    shortDescVi: "Quốc phục biểu trưng trường tồn của dân tộc, kế thừa từ Áo Ngũ Thân với kỹ thuật ráp tay Raglan và hai tà lụa thướt tha.",
    shortDescEn: "Timeless national garment of Vietnam, evolving from the Five-Part Dress with raglan sleeve joins and ankle-skimming silk panels.",
    detailsVi: `Áo Dài là bước tiến hóa rực rỡ khởi nguồn từ chiếc Áo Ngũ Thân truyền thống Đàng Trong. Vào thập niên 1930, phong trào canh tân với sự góp sức của họa sĩ Cát Tường (Le Mur) và Lê Phổ đã cách điệu tà áo ôm khít đường cong cơ thể. Đến năm 1960 tại Sài Gòn, nhà may Dung Đakao đã sáng tạo bước đột phá với kỹ thuật ráp tay Raglan (nối chéo từ chân cổ xuống nách), giải quyết triệt để vấn đề nhăn nách và tôn lên bờ vai thon thả của người phụ nữ Việt. Áo Dài gồm hai tà trước và sau dài chấm mắt cá chân, xẻ tà cao đến tận eo, phối cùng chiếc quần lụa suông rộng mềm mại. Áo Dài đã trở thành Quốc phục - biểu tượng văn hóa sống động của tâm hồn, cốt cách đoan trang và nét duyên ngầm của phụ nữ Việt Nam trên trường quốc tế.`,
    detailsEn: `The Ao Dai is a magnificent evolution derived directly from the traditional Five-Part Dress (Áo Ngũ Thân). In the 1930s, artists Cat Tuong (Le Mur) and Le Pho innovated the silhouette to embrace natural curves. In 1960s Saigon, the Dung Dakao atelier introduced the diagonal raglan sleeve seam, perfectly eliminating underarm creasing while accentuating slender shoulders. Featuring two floor-skimming panels slit high to the waistline over wide-leg silk trousers, the Ao Dai stands today as Vietnam's official national attire: celebrating grace, modesty, and modern pride.`,
    anatomyHighlights: {
      panelsVi: "2 tà lụa trước và sau buông dài thướt tha, xẻ tà hai bên hông cao ngang eo",
      panelsEn: "Two flowing front and back silk panels, slit high at both sides to the natural waist",
      collarVi: "Cổ đứng lập lĩnh cao 2.5-4cm ôm gọn thanh thoát, hoặc cổ thuyền, cổ tròn cách tân",
      collarEn: "High mandarin stand collar 2.5-4cm snug around neck, or modernized boat/round neckline",
      buttonsVi: "Hàng nút bấm (hoặc móc cài ngọc trai) kín đáo viền chéo từ cổ xuống nách phải",
      buttonsEn: "Concealed snap fasteners or pearl hooks running diagonally from collar to right underarm",
      seamVi: "Kỹ thuật may nối tay Raglan phẳng phiu, đường chít eo (ben ngực & ben eo) tôn đường cong",
      seamEn: "Raglan shoulder seams preventing underarm puckering, darts highlighting natural waistline"
    },
    fabricsVi: "Lụa Hà Đông, Tơ tằm Bảo Lộc, Voan tơ thêu tay hoa sen, Gấm dệt vân mây, Nhung the sang trọng.",
    fabricsEn: "Ha Dong mulberry silk, Bao Loc pure silk, hand-embroidered lotus chiffon, brocade, crushed velvet.",
    philosophyVi: "Vẻ đẹp kín đáo mà gợi cảm, e ấp nhưng kiêu hãnh. Tà áo dài bay trong gió gợi nhắc sự tự do, khoan thai và cốt cách đoan trang, dịu dàng của người phụ nữ Việt.",
    philosophyEn: "Elegance blending modesty with subtle allure. Flowing panels caught in the breeze symbolize freedom, serenity, and refined Vietnamese femininity.",
    genzStylingVi: "Phối áo dài lụa trắng hoặc pastel cùng kiềng bạc nguyên khối, túi cói đan tay thủ công, kẹp tóc ngọc trai và giày cao gót mũi nhọn hoặc mary janes cổ điển.",
    genzStylingEn: "Style pastel or pristine white silk Ao Dai with a solid silver torque choker, artisan woven tote, pearl hairpins, and classic Mary Jane pumps.",
    youtubeId: "2G8125IkyjE",
    realPhotography: {
      locationVi: "Hồ Gươm & Phố Cổ Hà Nội / Bảo Tàng Áo Dài TP.HCM",
      locationEn: "Hoan Kiem Lake & Hanoi Old Quarter / Ao Dai Museum",
      photoTitleVi: "Áo Dài Truyền Thống (Mặt trước)",
      photoTitleEn: "Traditional Ao Dai (Front View)",
      shootingNotesVi: "Phục dựng chuẩn mực phom dáng Áo Dài truyền thống với góc nhìn mặt trước và mặt sau.",
      shootingNotesEn: "Authentic reproduction of traditional Vietnamese Ao Dai showing front and back views.",
      heroPhoto: "/costumes/ai/ao-dai-front.webp",
      frontPhoto: "/costumes/ai/ao-dai-front.webp",
      backPhoto: "/costumes/ai/ao-dai-back.png",
      gallery: [
        {
          titleVi: "Khoảnh khắc hai tà áo dài lụa trắng tung bay trong gió",
          titleEn: "Pure White Silk Panels Billowing in the Breeze",
          tagVi: "Vẻ đẹp bất hủ",
          tagEn: "Timeless Grace",
          contextVi: "Áo dài tân thời chít eo nhẹ nhàng tôn đường cong, tà áo thướt tha chấm mắt cá chân kết hợp quần lụa suông.",
          contextEn: "Fitted bodice accentuating natural contours, floor-length silk panels dancing over relaxed trousers.",
          imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85"
        },
        {
          titleVi: "Đặc tả đường ráp tay Raglan & hàng cúc chéo kín đáo",
          titleEn: "Close-up: Raglan Sleeve Seam & Concealed Snaps",
          tagVi: "Đột phá thập niên 1960",
          tagEn: "1960s Innovation",
          contextVi: "Đường may chéo từ cổ xuống nách triệt tiêu nếp nhăn nhúm, cổ lập lĩnh cao 3cm ôm sát đoan trang.",
          contextEn: "Diagonal seam from collar to armpit eliminating wrinkles, framed by a tailored 3cm stand collar.",
          imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
        },
        {
          titleVi: "Tư liệu Áo Dài tân thời Le Mur thập niên 1930",
          titleEn: "Historical Archive: 1930s Le Mur Modern Ao Dai",
          tagVi: "Tư liệu lịch sử",
          tagEn: "Historical Innovation",
          contextVi: "Bản vẽ và hình ảnh tư liệu áo dài Le Mur của họa sĩ Cát Tường - khởi đầu kỷ nguyên áo dài hiện đại.",
          contextEn: "Original sketches and vintage photographs of Cat Tuong's Le Mur Ao Dai inaugurating modern design.",
          imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
        }
      ],
      editorialQuoteVi: "Tà áo dài lụa trắng nhẹ bay trong gió biếc - Tôn vinh cốt cách thanh tao và tâm hồn người phụ nữ Việt.",
      editorialQuoteEn: "Pristine white silk panels fluttering in azure breeze - exalting the serene grace and soul of Vietnamese womanhood.",
      macroHotspots: [
        {
          id: "collar",
          x: 50,
          y: 18,
          titleVi: "Cổ Đứng Lập Lĩnh Thanh Thoát",
          titleEn: "Slender Stand Collar",
          descVi: "Cổ áo cao 2.5-3cm ôm nhẹ cần cổ thanh tân, tạo phong thái đoan trang quý phái.",
          descEn: "Upright 2.5-3cm stand collar gently contouring the throat with classic modesty.",
          icon: "shield"
        },
        {
          id: "waist",
          x: 50,
          y: 44,
          titleVi: "Đường Chít Eo & Khuy Bấm Chéo",
          titleEn: "Waist Darts & Diagonal Snaps",
          descVi: "Kỹ thuật chít eo ôm trọn vòng eo thon gọn, hàng khuy bấm chéo từ cổ xuống nách phải kín đáo, tinh tế.",
          descEn: "Fitted waist darts accentuating curves with concealed diagonal snaps from neck to right armpit.",
          icon: "sparkles"
        },
        {
          id: "flap",
          x: 58,
          y: 72,
          titleVi: "Tà Áo Lụa Thướt Tha Chạm Gót",
          titleEn: "Floor-Length Silk Panels",
          descVi: "Hai tà áo trước sau phẳng phiu, nhẹ bay theo từng nhịp chân khoan thai mang lại vẻ đẹp bay bổng.",
          descEn: "Twin flowing silk panels fluttering gracefully with each measured step.",
          icon: "wind"
        },
        {
          id: "pants",
          x: 46,
          y: 90,
          titleVi: "Quần Lụa Suông Trắng Chạm Đất",
          titleEn: "Flowing White Silk Trousers",
          descVi: "Ống quần lụa suông rộng mềm mại chấm gót, tạo hiệu ứng thị giác đôi chân dài miên man và bước đi uyển chuyển.",
          descEn: "Relaxed wide-leg silk trousers flowing to floor, enhancing elegance and fluid stride.",
          icon: "layers"
        }
      ],
      posingGuide: {
        poseTitleVi: "Dáng Nữ Sinh Duyên Dáng (Tay Khẽ Nâng Tà Áo)",
        poseTitleEn: "Classic Grace (Delicate Flap Hold)",
        poseInstructionVi: "Bước đi nghiêng 45 độ so với máy ảnh, một tay khẽ dùng ngón tay nâng nhẹ mép tà áo sau để tránh chạm đất, tay kia ôm bó hoa sen hoặc cuốn sổ tay trước ngực. Nụ cười dịu dàng.",
        poseInstructionEn: "Walk at a 45° angle to camera, one hand delicately holding back hem of panel, the other holding fresh lotus bouquet or leather notebook to chest. Gentle serene smile.",
        cameraTipsVi: "Chụp bắt tốc độ cao (Continuous shooting) khi người mẫu bước đi, tiêu cự 85mm f/1.4 hoặc 105mm tạo độ nổi khối chủ thể trên phố cổ hoặc cầu Long Biên.",
        cameraTipsEn: "Burst capture during natural walking movement, 85mm f/1.4 or 105mm isolating subject sharply against historic streets or French colonial bridge.",
        accessoriesVi: "Kiềng bạc nguyên khối, hoa sen hồng thơm ngát, túi cói/mây đan thủ công, kẹp tóc ngọc trai, giày cao gót mũi nhọn.",
        accessoriesEn: "Solid silver torque collar, fresh pink lotus bouquet, artisan woven bag, pearl hairpin, pointed-toe heels."
      }
    },
    svgIllustration: `<svg viewBox="0 0 300 400" class="w-full h-full object-contain filter drop-shadow-md">
      <defs>
        <linearGradient id="aodaiLotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF5F7"/>
          <stop offset="40%" stop-color="#FED7E2"/>
          <stop offset="100%" stop-color="#F472B6"/>
        </linearGradient>
      </defs>
      <circle cx="150" cy="180" r="110" fill="#FFFDF9" stroke="#E88288" stroke-width="1.8" stroke-dasharray="3 3"/>
      <!-- Flowing White Silk Trousers underneath -->
      <polygon points="122,175 106,365 146,365 148,220" fill="#FAF7F2" stroke="#E2DCD0" stroke-width="1.2"/>
      <polygon points="178,175 194,365 154,365 152,220" fill="#FAF7F2" stroke="#E2DCD0" stroke-width="1.2"/>
      <line x1="126" y1="225" x2="126" y2="360" stroke="#E2DCD0" stroke-width="1"/>
      <line x1="174" y1="225" x2="174" y2="360" stroke="#E2DCD0" stroke-width="1"/>
      <!-- Ao Dai Flowing Body Silhouette (Raglan Tay & Eo Chít Tà Bay) -->
      <path d="M135 62 L115 100 L68 185 L92 198 L122 135 Q120 170 125 180 L115 360 L185 360 L175 180 Q180 170 178 135 L208 198 L232 185 L185 100 L165 62 Z" fill="url(#aodaiLotusGrad)" stroke="#DB2777" stroke-width="1.5"/>
      <!-- Raglan Seams (Đường ráp tay Raglan đặc trưng) -->
      <line x1="135" y1="78" x2="122" y2="135" stroke="#DB2777" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>
      <line x1="165" y1="78" x2="178" y2="135" stroke="#DB2777" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>
      <!-- Mandarin Stand Collar (Cổ Đứng Lập Lĩnh Thanh Thoát) -->
      <rect x="137" y="52" width="26" height="18" rx="2" fill="#FED7E2" stroke="#DB2777" stroke-width="1.5"/>
      <line x1="137" y1="70" x2="163" y2="70" stroke="#DB2777" stroke-width="1"/>
      <!-- Diagonal Pearl Snap Fasteners (Hàng nút bấm chéo sang nách) -->
      <circle cx="150" cy="72" r="2.2" fill="#FFFFFF" stroke="#DB2777" stroke-width="0.8"/>
      <circle cx="158" cy="85" r="2.2" fill="#FFFFFF" stroke="#DB2777" stroke-width="0.8"/>
      <circle cx="166" cy="102" r="2.2" fill="#FFFFFF" stroke="#DB2777" stroke-width="0.8"/>
      <circle cx="174" cy="120" r="2.2" fill="#FFFFFF" stroke="#DB2777" stroke-width="0.8"/>
      <!-- High Waist Slits (Đường xẻ tà cao ngang eo) -->
      <path d="M125 180 L125 190" stroke="#DB2777" stroke-width="1.5"/>
      <path d="M175 180 L175 190" stroke="#DB2777" stroke-width="1.5"/>
      <!-- Hand Embroidered Lotus Motif on Front Hem -->
      <path d="M142 325 Q150 310 158 325 Q150 340 142 325" fill="#F43F5E" stroke="#DB2777" stroke-width="1" opacity="0.8"/>
      <path d="M135 330 Q150 320 165 330" stroke="#10B981" stroke-width="1.5" fill="none"/>
    </svg>`
  }
];
