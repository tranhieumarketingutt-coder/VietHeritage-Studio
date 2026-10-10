import type { VietnamRegion, ProvinceToRegionMap } from '../../../shared/types/map';

/**
 * Cultural and regional traditional costume mapping across Vietnam.
 */
export const VIETNAM_REGIONS_DATA: VietnamRegion[] = [
  {
    id: "bac-bo",
    nameVi: "Miền Bắc (Thăng Long - Hà Nội & Kinh Bắc)",
    nameEn: "Northern Vietnam (Hanoi & Kinh Bac)",
    tagVi: "Cái Nôi Văn Hiến Sông Hồng",
    tagEn: "Cradle of Red River Civilization",
    eraVi: "Thời Lý - Trần - Lê & Triều Nguyễn",
    eraEn: "Ly - Tran - Le & Nguyen Dynasties",
    color: "#8B0000",
    icon: "landmark",
    coords: { lat: 21.0285, lng: 105.8542, zoom: 7.5, labelVi: "Thăng Long - Hà Nội (Kinh Kỳ)", labelEn: "Hanoi (Imperial Citadel)" },
    descriptionVi: "Vùng đất cội nguồn ngàn năm văn hiến, nơi khởi phát áo Giao Lĩnh cổ kính thời Lý - Trần - Hậu Lê với quy tắc Hữu Nhậm, chiếc áo Tứ Thân quan họ duyên dáng xứ Kinh Bắc và áo ngũ thân thanh lịch của sĩ tử chốn kinh kỳ.",
    descriptionEn: "Millennial cultural heartland, birthplace of ancient Giao Linh robes upholding the Huu Nham rule, the lyrical Tu Than of Kinh Bac folk singers, and elegant Hanoi scholar tunics.",
    craftVillagesVi: "Làng lụa Vạn Phúc (Hà Đông), Dệt the La Khê, Nón Chuông Thanh Oai, Dệt đũi Nam Cao.",
    craftVillagesEn: "Van Phuc Silk Village (Ha Dong), La Khe Gauze, Chuong Palm Hats, Nam Cao Silk Weaving.",
    provincesVi: ["Hà Nội", "Bắc Ninh", "Hải Phòng", "Quảng Ninh", "Ninh Bình", "Hải Dương", "Nam Định", "Phú Thọ", "Hà Giang", "Sơn La", "Lào Cai", "Cao Bằng", "Lạng Sơn"],
    costumeIds: ["giao-linh", "tu-than", "ngu-than"],
    costumeHighlightsVi: [
      {
        costumeId: "giao-linh",
        reasonVi: "Cổ phục tráng lệ thời Lý - Trần - Hậu Lê ngự trị tại Hoàng thành Thăng Long với vạt Hữu Nhậm tôn nghiêm."
      },
      {
        costumeId: "tu-than",
        reasonVi: "Biểu tượng duyên dáng của phụ nữ Bắc Bộ, gắn liền với di sản Dân ca Quan họ Bắc Ninh và nón Quai Thao."
      },
      {
        costumeId: "ngu-than",
        reasonVi: "Phong cách chuẩn mực của bậc trí thức, sĩ tử và các bậc danh gia vọng tộc đất Thăng Long - Kẻ Chợ."
      }
    ]
  },
  {
    id: "mientrung-hue",
    nameVi: "Cố Đô Huế & Bắc Trung Bộ",
    nameEn: "Central Vietnam & Hue Imperial Capital",
    tagVi: "Kinh Đô Cung Đình Triều Nguyễn",
    tagEn: "Imperial Court of Nguyen Dynasty",
    eraVi: "Triều Nguyễn (1744 - 1945)",
    eraEn: "Nguyen Dynasty (1744 - 1945)",
    color: "#D4AF37",
    icon: "crown",
    coords: { lat: 16.4637, lng: 107.5909, zoom: 8, labelVi: "Đại Nội Kinh Thành Huế", labelEn: "Hue Imperial Citadel" },
    descriptionVi: "Kinh đô của vương triều phong kiến cuối cùng tại Việt Nam. Nơi Võ Vương Nguyễn Phúc Khoát ra sắc lệnh định hình Áo Ngũ Thân năm 1744, đỉnh cao là các tuyệt phẩm Áo Nhật Bình và Áo Tấc hoàng cung.",
    descriptionEn: "Imperial seat of Vietnam's last royal dynasty. Where Lord Nguyen Phuc Khoat decreed the 1744 national dress code, culminating in Empress Nhat Binh and ceremonial Ao Tac robes.",
    craftVillagesVi: "Dệt gấm hoa mai cung đình Huế, Làng nón lá bài thơ Tây Hồ, Thêu kim tuyến Phú Cát.",
    craftVillagesEn: "Hue Imperial Brocade Weaving, Tay Ho Poetic Conical Hats, Royal Gold-thread Embroidery.",
    provincesVi: ["Thừa Thiên Huế", "Quảng Trị", "Quảng Bình", "Hà Tĩnh", "Nghệ An", "Thanh Hóa"],
    costumeIds: ["nhat-binh", "ngu-than"],
    costumeHighlightsVi: [
      {
        costumeId: "nhat-binh",
        reasonVi: "Lễ phục đối khâm cao quý bậc nhất của Hoàng Hậu, Công chúa và Cung tần chốn Hoàng cung Đại Nội."
      },
      {
        costumeId: "ngu-than",
        reasonVi: "Áo Tấc (ống tay thụng) làm đại lễ phục và Áo Tay Chẽn làm thường phục của vua quan triều đình."
      }
    ]
  },
  {
    id: "namtrungbo-hoian",
    nameVi: "Duyên Hải Nam Trung Bộ & Đô Thị Cổ Hội An",
    nameEn: "South Central Coast & Hoi An Silk Port",
    tagVi: "Thương Cảng Tơ Lụa Quốc Tế",
    tagEn: "Cosmopolitan Maritime Silk Port",
    eraVi: "Thế kỷ XVI - XIX (Đàng Trong)",
    eraEn: "16th - 19th Century (Dang Trong Realm)",
    color: "#C47B89",
    icon: "ship",
    coords: { lat: 15.8801, lng: 108.3380, zoom: 8, labelVi: "Phố Cổ Hội An (Quảng Nam)", labelEn: "Hoi An Silk Port" },
    descriptionVi: "Thương cảng quốc tế sầm uất trên Con đường Tơ lụa trên biển. Trang phục nơi đây giao thoa giữa nét thanh nhã triều Nguyễn và phong thái hào hoa của các thương nhân Đàng Trong.",
    descriptionEn: "Bustling international maritime trading port. Attire reflected a blend of Nguyen royal decorum and cosmopolitan merchant elegance along the sea silk road.",
    craftVillagesVi: "Làng lụa Hội An (Quảng Nam), Làng dệt vải Mã Châu (Duy Xuyên), Lụa tơ tằm An Nhơn (Bình Định).",
    craftVillagesEn: "Hoi An Silk Village, Ma Chau Weaving (Duy Xuyen), An Nhon Mulberry Silk (Binh Dinh).",
    provincesVi: ["Đà Nẵng", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận"],
    costumeIds: ["ngu-than", "nhat-binh"],
    costumeHighlightsVi: [
      {
        costumeId: "ngu-than",
        reasonVi: "Áo ngũ thân bằng vải sa the, lụa tơ mát rượi rất được giới thương nhân Hội An và các bậc hào phú ưa chuộng."
      },
      {
        costumeId: "nhat-binh",
        reasonVi: "Trang phục dùng trong các dịp cưới hỏi nghi lễ long trọng của các gia đình danh gia vọng tộc duyên hải."
      }
    ]
  },
  {
    id: "hoang-sa-truong-sa",
    nameVi: "Quần Đảo Hoàng Sa & Trường Sa (Biển Đông Việt Nam)",
    nameEn: "Paracel & Spratly Sacred Archipelagos (East Sea)",
    tagVi: "Chủ Quyền Biển Đảo Thiêng Liêng",
    tagEn: "Sacred Sovereign Maritime Heritage",
    eraVi: "Thế kỷ XVII - Nay (Chúa Nguyễn, Triều Nguyễn đến Hiện đại)",
    eraEn: "17th Century - Present (Lord Nguyen to Modernity)",
    color: "#E65100",
    icon: "compass",
    coords: { lat: 16.5, lng: 112.0, zoom: 6, labelVi: "Quần Đảo Hoàng Sa & Trường Sa", labelEn: "Paracel & Spratly Islands" },
    descriptionVi: "Hai quần đảo tiền tiêu thiêng liêng đời đời là một phần máu thịt không thể tách rời của Tổ quốc Việt Nam trên Biển Đông. Gắn liền với Hải đội Hoàng Sa kiêm quản Bắc Hải từ thời các Chúa Nguyễn và vua Triều Nguyễn (Gia Long, Minh Mạng), những người nghĩa binh đã vượt bão gió cắm mốc chủ quyền, đo đạc hải trình và bảo vệ biên cương bờ cõi.",
    descriptionEn: "Sacred vanguard archipelagos representing eternal sovereignty over Vietnam's East Sea. Historically stewarded by the Hoang Sa Flotilla since the Nguyen Lords and Emperors.",
    craftVillagesVi: "Nghi lễ Khao Lề Thế Lính Hoàng Sa (Đảo Lý Sơn), Đan lưới cá truyền thống duyên hải miền Trung, Dệt cờ đỏ sao vàng bám biển.",
    craftVillagesEn: "Hoang Sa Soldier Commemoration Ceremony (Ly Son), Coastal Net Weaving, National Flag Crafting.",
    provincesVi: ["Huyện đảo Hoàng Sa (TP. Đà Nẵng)", "Huyện đảo Trường Sa (Tỉnh Khánh Hòa)"],
    costumeIds: ["ngu-than", "ba-ba"],
    costumeHighlightsVi: [
      {
        costumeId: "ngu-than",
        reasonVi: "Áo ngũ thân vải mộc tay chẽn, buộc đai điều và nón chóp sơn son của các nghĩa binh Hải đội Hoàng Sa khi vượt biển cắm mốc chủ quyền."
      },
      {
        costumeId: "ba-ba",
        reasonVi: "Y phục phong sương mộc mạc của các thế hệ ngư dân kiên cường bám biển, cùng cờ Tổ quốc bay phấp phới giữa biển trời bao la."
      }
    ]
  },
  {
    id: "tay-nguyen",
    nameVi: "Tây Nguyên Đại Ngàn",
    nameEn: "Central Highlands (Tay Nguyen)",
    tagVi: "Di Sản Dệt Thổ Cẩm & Sử Thi",
    tagEn: "Brocade Weaving & Epic Traditions",
    eraVi: "Cổ xưa - Đương đại",
    eraEn: "Ancient to Contemporary",
    color: "#3F5E4D",
    icon: "trees",
    coords: { lat: 12.6667, lng: 108.0500, zoom: 7.5, labelVi: "Tây Nguyên (Buôn Ma Thuột)", labelEn: "Highlands (Buon Ma Thuot)" },
    descriptionVi: "Vùng đất huyền sử với nghệ thuật dệt Zèng thổ cẩm độc đáo. Hoa văn hình mặt trời, chim muông trên váy tấm và áo chui đầu phản ánh thế giới quan tôn kính thiên nhiên của các dân tộc anh em.",
    descriptionEn: "Highland realm renowned for geometric Zeng brocade weaving, with motifs honoring the sun and spirits of the forest.",
    craftVillagesVi: "Dệt thổ cẩm buôn Akŏ Dhông (Đắk Lắk), Dệt Zèng A Lưới, Dệt chiếu hoa Kon Tum.",
    craftVillagesEn: "Ako Dhong Brocade Village, A Luoi Zeng Craft, Kon Tum Traditional Weaving.",
    provincesVi: ["Đắk Lắk", "Gia Lai", "Kon Tum", "Lâm Đồng", "Đắk Nông"],
    costumeIds: ["giao-linh", "tu-than"],
    costumeHighlightsVi: [
      {
        costumeId: "giao-linh",
        reasonVi: "Giao thoa giữa kỹ thuật dệt đũi tự nhiên của Đại Việt và nghệ thuật hoa văn thổ cẩm Tây Nguyên hoang dã."
      },
      {
        costumeId: "tu-than",
        reasonVi: "Hình mẫu y phục không khuy cài, biến tấu cùng dải đai lưng thổ cẩm rực rỡ sắc màu Tây Nguyên."
      }
    ]
  },
  {
    id: "nam-bo",
    nameVi: "Miền Nam (Sài Gòn - Gia Định & Tây Nam Bộ)",
    nameEn: "Southern Vietnam (Saigon & Mekong Delta)",
    tagVi: "Sông Nước Cửu Long & Hòn Ngọc Viễn Đông",
    tagEn: "Mekong River Delta & Pearl of the Far East",
    eraVi: "Thế kỷ XIX - XX (Khẩn hoang & Tiếp biến)",
    eraEn: "19th - 20th Century (Settlement & Modernity)",
    color: "#2C4E6B",
    icon: "waves",
    coords: { lat: 10.8231, lng: 106.6297, zoom: 7.5, labelVi: "Sài Gòn - Gia Định", labelEn: "Saigon - Gia Dinh" },
    descriptionVi: "Vùng đất phương Nam khoáng đạt, trù phú. Nổi bật với chiếc Áo Bà Ba mộc mạc và khăn rằn Nam Bộ, song hành cùng áo dài ngũ thân của giới điền chủ và tà áo dài tân thời Sài Gòn đầu TK XX.",
    descriptionEn: "Fertile southern realm. Embodying resilient warmth through the humble Ao Ba Ba and checkered bandana, alongside rich merchant tunics and early 20th-century modern Saigon Ao Dai styles.",
    craftVillagesVi: "Lãnh Mỹ A trứ danh Tân Châu (An Giang), Làng dệt lụa tơ tằm Bảo Lộc, Làng chiếu Định Yên (Đồng Tháp).",
    craftVillagesEn: "Tan Chau My A Lanh Silk (An Giang), Bao Loc Silk, Dinh Yen Mat Village.",
    provincesVi: ["TP. Hồ Chí Minh", "Cần Thơ", "An Giang", "Tiền Giang", "Bến Tre", "Cà Mau", "Đồng Tháp", "Kiên Giang (Phú Quốc)", "Bà Rịa - Vũng Tàu (Côn Đảo)"],
    costumeIds: ["ba-ba", "ao-dai", "ngu-than"],
    costumeHighlightsVi: [
      {
        costumeId: "ba-ba",
        reasonVi: "Biểu tượng hồn hậu, duyên dáng và cần lao của con người miền Tây sông nước Cửu Long."
      },
      {
        costumeId: "ao-dai",
        reasonVi: "Áo Dài tân thời và bước ngoặt kỹ thuật ráp tay Raglan thập niên 1960 tại Sài Gòn, tôn vinh vẻ đẹp kiều diễm của phụ nữ Nam Bộ."
      },
      {
        costumeId: "ngu-than",
        reasonVi: "Trang phục chỉnh tề của các bậc bô lão, hào phú và trí thức Nam Bộ trong các dịp giỗ chạp, cúng đình."
      }
    ]
  }
];

/**
 * Mapping of provinces and municipalities of Vietnam to cultural regions.
 */
export const PROVINCE_TO_REGION_MAP: ProvinceToRegionMap = {
  "Hà Nội": "bac-bo",
  "Bắc Ninh": "bac-bo",
  "Hải Phòng": "bac-bo",
  "Quảng Ninh": "bac-bo",
  "Ninh Bình": "bac-bo",
  "Hải Dương": "bac-bo",
  "Hưng Yên": "bac-bo",
  "Nam Định": "bac-bo",
  "Thái Bình": "bac-bo",
  "Hà Nam": "bac-bo",
  "Vĩnh Phúc": "bac-bo",
  "Bắc Giang": "bac-bo",
  "Phú Thọ": "bac-bo",
  "Thái Nguyên": "bac-bo",
  "Tuyên Quang": "bac-bo",
  "Hà Giang": "bac-bo",
  "Cao Bằng": "bac-bo",
  "Bắc Kạn": "bac-bo",
  "Lạng Sơn": "bac-bo",
  "Lào Cai": "bac-bo",
  "Yên Bái": "bac-bo",
  "Sơn La": "bac-bo",
  "Điện Biên": "bac-bo",
  "Lai Châu": "bac-bo",
  "Hòa Bình": "bac-bo",
  "Thừa Thiên Huế": "mientrung-hue",
  "Quảng Trị": "mientrung-hue",
  "Quảng Bình": "mientrung-hue",
  "Hà Tĩnh": "mientrung-hue",
  "Nghệ An": "mientrung-hue",
  "Thanh Hóa": "mientrung-hue",
  "Đà Nẵng": "namtrungbo-hoian",
  "Quảng Nam": "namtrungbo-hoian",
  "Quảng Ngãi": "namtrungbo-hoian",
  "Bình Định": "namtrungbo-hoian",
  "Phú Yên": "namtrungbo-hoian",
  "Khánh Hòa": "namtrungbo-hoian",
  "Ninh Thuận": "namtrungbo-hoian",
  "Bình Thuận": "namtrungbo-hoian",
  "Hoàng Sa": "hoang-sa-truong-sa",
  "Huyện Hoàng Sa": "hoang-sa-truong-sa",
  "Trường Sa": "hoang-sa-truong-sa",
  "Huyện Trường Sa": "hoang-sa-truong-sa",
  "Quần đảo Hoàng Sa": "hoang-sa-truong-sa",
  "Quần đảo Trường Sa": "hoang-sa-truong-sa",
  "Đắk Lắk": "tay-nguyen",
  "Gia Lai": "tay-nguyen",
  "Kon Tum": "tay-nguyen",
  "Lâm Đồng": "tay-nguyen",
  "Đắk Nông": "tay-nguyen",
  "TP. Hồ Chí Minh": "nam-bo",
  "Bình Dương": "nam-bo",
  "Đồng Nai": "nam-bo",
  "Bà Rịa - Vũng Tàu": "nam-bo",
  "Tây Ninh": "nam-bo",
  "Bình Phước": "nam-bo",
  "Long An": "nam-bo",
  "Tiền Giang": "nam-bo",
  "Bến Tre": "nam-bo",
  "Trà Vinh": "nam-bo",
  "Vĩnh Long": "nam-bo",
  "Đồng Tháp": "nam-bo",
  "An Giang": "nam-bo",
  "Kiên Giang": "nam-bo",
  "Cần Thơ": "nam-bo",
  "Hậu Giang": "nam-bo",
  "Sóc Trăng": "nam-bo",
  "Bạc Liêu": "nam-bo",
  "Cà Mau": "nam-bo",
  "Phú Quốc": "nam-bo",
  "Côn Đảo": "nam-bo"
};
