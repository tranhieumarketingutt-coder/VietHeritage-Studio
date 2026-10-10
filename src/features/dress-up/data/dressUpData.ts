import type { 
  LayerItem, 
  ColorOption, 
  EventFilterId, 
  RegionFilterId, 
  CharacterId, 
  DressUpState 
} from '../types';

export interface CharacterProfile {
  id: CharacterId;
  nameVi: string;
  nameEn: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  gender: 'female' | 'male';
  defaultState: DressUpState;
}

export const CHARACTERS_DATA: CharacterProfile[] = [
  {
    id: 'female-01',
    nameVi: 'An Nhã',
    nameEn: 'An Nha',
    titleVi: 'Thiếu Nữ Hà Thành',
    titleEn: 'Northern Maiden',
    descVi: 'Nét đẹp thanh tao, thuần hậu, dáng vẻ yêu kiều phù hợp với các dáng áo dài, ngũ thân và lễ phục hoàng gia.',
    descEn: 'Graceful and gentle demeanor, ideal for styling Ao Dai, Ngu Than, and royal court robes.',
    gender: 'female',
    defaultState: {
      character: 'female-01',
      outfitId: 'outfit-ao-dai',
      colorId: 'color-do-son',
      hairId: 'hair-van-tran',
      headwearId: 'headwear-khan-van-den',
      accessoryId: 'acc-kieng-bac',
      bottomId: 'bottom-quan-trang'
    }
  },
  {
    id: 'male-01',
    nameVi: 'Minh Triết',
    nameEn: 'Minh Triet',
    titleVi: 'Nho Sinh Tràng An',
    titleEn: 'Scholar of the Realm',
    descVi: 'Khí chất đĩnh đạc, nho nhã, phù hợp với áo ngũ thân tay chẽn, áo tấc và các dáng áo cổ truyền tôn vinh đạo học.',
    descEn: 'Dignified scholar presence, ideal for styling Tay Chen robes, Ao Tac, and classic academic attire.',
    gender: 'male',
    defaultState: {
      character: 'male-01',
      outfitId: 'outfit-ngu-than',
      colorId: 'color-xanh-cham',
      hairId: 'hair-bui-nam',
      headwearId: 'headwear-khan-dong-nam',
      accessoryId: 'acc-quat-tram',
      bottomId: 'bottom-quan-trang'
    }
  }
];

export const COLOR_PALETTES: ColorOption[] = [
  {
    id: 'color-do-son',
    nameVi: 'Đỏ Son',
    nameEn: 'Cinnabar Red',
    hex: '#C23B22',
    secondaryHex: '#8B0000',
    traditionalNameVi: 'Màu Đỏ Cinnabar / Đỏ Chu Sa',
    traditionalNameEn: 'Imperial Cinnabar Dye',
    meaningVi: 'Sắc màu của điềm lành, sinh khí và đại lễ hân hoan trong phong tục Việt.',
    meaningEn: 'Color of auspicious fortune, life energy, and grand celebration in Vietnamese tradition.'
  },
  {
    id: 'color-vang-hoang-yen',
    nameVi: 'Vàng Hoàng Yến',
    nameEn: 'Imperial Gold',
    hex: '#D4AF37',
    secondaryHex: '#B8860B',
    traditionalNameVi: 'Màu Vàng Nghệ / Vàng Hoàng Kim',
    traditionalNameEn: 'Turmeric Gold Dye',
    meaningVi: 'Sắc vàng quyền quý, ấm áp, tượng trưng cho hành Thổ và sự thịnh vượng trung tâm.',
    meaningEn: 'Noble warm yellow representing the Earth element and centered prosperity.'
  },
  {
    id: 'color-xanh-cham',
    nameVi: 'Xanh Chàm',
    nameEn: 'Indigo Blue',
    hex: '#1C3B57',
    secondaryHex: '#122538',
    traditionalNameVi: 'Màu Chàm Dân Tộc / Thanh Lam',
    traditionalNameEn: 'Natural Indigo Dye',
    meaningVi: 'Sắc chàm thâm trầm, tượng trưng cho sự điềm đạm, trí tuệ và chiều sâu tri thức.',
    meaningEn: 'Deep indigo symbolizing composure, quiet wisdom, and scholarly depth.'
  },
  {
    id: 'color-xanh-ngoc',
    nameVi: 'Xanh Ngọc Bích',
    nameEn: 'Emerald Jade',
    hex: '#2E6F62',
    secondaryHex: '#1E4D43',
    traditionalNameVi: 'Màu Xanh Thúy / Phỉ Thúy',
    traditionalNameEn: 'Jadeite Green Dye',
    meaningVi: 'Thanh nhã như ngọc bích, gợi sự tươi mới, sinh sôi và cốt cách thanh cao.',
    meaningEn: 'Graceful as jadeite, representing renewal, vitality, and moral purity.'
  },
  {
    id: 'color-trang-lua',
    nameVi: 'Trắng Tinh Khôi',
    nameEn: 'Silk White',
    hex: '#FDFBF7',
    secondaryHex: '#EAE5D9',
    traditionalNameVi: 'Màu Trắng Ngà Lụa Tơ Tằm',
    traditionalNameEn: 'Raw Mulberry Silk White',
    meaningVi: 'Màu của tơ tằm nguyên bản, thuần khiết, biểu trưng cho sự trong sáng và mực thước.',
    meaningEn: 'Pristine raw silk tone representing innocence, clarity, and modesty.'
  },
  {
    id: 'color-tim-hue',
    nameVi: 'Tím Cố Đô',
    nameEn: 'Hue Royal Violet',
    hex: '#5E2D79',
    secondaryHex: '#411C54',
    traditionalNameVi: 'Màu Tím Mực / Tím Hoàng Tộc',
    traditionalNameEn: 'Court Purple Dye',
    meaningVi: 'Sắc tím đặc trưng chốn kinh kỳ, kín đáo, sâu lắng và đài các.',
    meaningEn: 'Iconic Hue royal purple signifying poetic elegance and dignified nobility.'
  },
  {
    id: 'color-hong-sen',
    nameVi: 'Hồng Sen',
    nameEn: 'Lotus Blossom',
    hex: '#D97D8F',
    secondaryHex: '#B25468',
    traditionalNameVi: 'Màu Hồng Phấn Hoa Sen',
    traditionalNameEn: 'Lotus Petal Pink',
    meaningVi: 'Sắc hồng dịu dàng, biểu tượng của quốc hoa sen thơm ngát thanh cao.',
    meaningEn: 'Soft petal pink evoking the fragrant, upright Vietnamese national lotus.'
  },
  {
    id: 'color-nau-dat',
    nameVi: 'Nâu Sồng',
    nameEn: 'Earth Brown',
    hex: '#684735',
    secondaryHex: '#472E21',
    traditionalNameVi: 'Màu Củ Nâu Đồng Quê',
    traditionalNameEn: 'Dioscorea Yam Brown Dye',
    meaningVi: 'Sắc nâu bền bỉ của củ nâu, gắn liền với nét đẹp bình dị, chân phương của người dân đất Việt.',
    meaningEn: 'Rustic brown from wild forest yams, evoking enduring simplicity and Vietnamese folk spirit.'
  }
];

export const OUTFIT_ITEMS: LayerItem[] = [
  {
    id: 'outfit-ao-dai',
    nameVi: 'Áo Dài Truyền Thống',
    nameEn: 'Traditional Ao Dai',
    category: 'outfit',
    gender: 'female',
    region: 'toan-quoc',
    events: ['tet', 'wedding', 'school', 'cultural-day', 'ceremony'],
    eraVi: 'Thế kỷ 20 - Hiện đại',
    eraEn: '20th Century - Contemporary',
    shortDescVi: 'Biểu tượng trang phục nữ giới Việt Nam với cổ lập lĩnh ôm khít, hai tà áo buông dài thướt tha.',
    shortDescEn: 'National feminine silhouette with high stand collar and graceful flowing panels.',
    culturalNoteVi: 'Áo dài phát triển từ phom dáng áo ngũ thân truyền thống, được tinh chỉnh ôm vừa vặn thân người, tôn lên nét duyên dáng kín đáo của người phụ nữ Việt Nam.',
    culturalNoteEn: 'Evolved from the traditional five-panel robe, tailored to hug the silhouette while preserving modest poise.',
    defaultColorId: 'color-do-son',
    relatedMuseumId: 'ao-dai'
  },
  {
    id: 'outfit-nhat-binh',
    nameVi: 'Áo Nhật Bình',
    nameEn: 'Ao Nhat Binh Court Robe',
    category: 'outfit',
    gender: 'female',
    region: 'trung-bo',
    events: ['wedding', 'ceremony', 'cultural-day', 'performance'],
    eraVi: 'Triều Nguyễn (1802 - 1945)',
    eraEn: 'Nguyen Dynasty (1802 - 1945)',
    shortDescVi: 'Lễ phục cung đình của bậc hoàng thái hậu, hoàng hậu, công chúa và cung tần triều Nguyễn.',
    shortDescEn: 'Imperial court robe worn by empresses, princesses, and noble consorts.',
    culturalNoteVi: 'Đặc trưng bởi dải viền cổ hình chữ nhật ngay ngắn trước ngực tượng trưng cho mặt trời và đức đoan chính; tay áo viền ngũ hành rực rỡ và gấu áo thêu sóng nước Tam Sơn Thủy Ba.',
    culturalNoteEn: 'Distinguished by a rectangular embroidered collar band, five-element sleeve cuffs, and wave embroidery on the hem.',
    defaultColorId: 'color-vang-hoang-yen',
    relatedMuseumId: 'nhat-binh'
  },
  {
    id: 'outfit-ngu-than',
    nameVi: 'Áo Ngũ Thân Tay Chẽn',
    nameEn: 'Ao Ngu Than (Fitted Sleeves)',
    category: 'outfit',
    gender: 'unisex',
    region: 'toan-quoc',
    events: ['tet', 'festival', 'cultural-day', 'school', 'ceremony'],
    eraVi: 'Từ 1744 - Triều Nguyễn',
    eraEn: 'From 1744 - Nguyen Dynasty',
    shortDescVi: 'Cổ phục chuẩn mực gồm 5 thân vải, 5 khuy cài tượng trưng cho Ngũ Thường và Tứ Thân Phụ Mẫu.',
    shortDescEn: 'Canonical five-panel dress representing Confucian virtues and filial devotion.',
    culturalNoteVi: 'Ống tay bó gọn ghẽ (tay chẽn) thuận tiện cho đời sống thường nhật và công việc. Đường trung phùng thẳng tắp biểu thị tinh thần cương trực của người quân tử.',
    culturalNoteEn: 'Fitted sleeves provide everyday comfort. The center spine seam represents upright moral integrity.',
    defaultColorId: 'color-xanh-cham',
    relatedMuseumId: 'ngu-than'
  },
  {
    id: 'outfit-ao-tac',
    nameVi: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    nameEn: 'Ao Tac (Wide-Sleeved Ceremonial)',
    category: 'outfit',
    gender: 'unisex',
    region: 'trung-bo',
    events: ['ceremony', 'wedding', 'cultural-day', 'tet'],
    eraVi: 'Triều Nguyễn (1802 - 1945)',
    eraEn: 'Nguyen Dynasty (1802 - 1945)',
    shortDescVi: 'Lễ phục trang trọng với ống tay thụng rộng chấm gối, dùng trong các đại lễ, tế tự và hôn lễ.',
    shortDescEn: 'Solemn ceremonial robe with flowing wide sleeves used for sacred rites and weddings.',
    culturalNoteVi: 'Vẫn giữ cấu trúc 5 thân và cổ lập lĩnh nhưng ống tay xòe rộng bay bổng, khi chắp tay tạo thế bái lễ trang nghiêm uy kính.',
    culturalNoteEn: 'Maintains five panels with high stand collar but extends wide sleeves creating a regal stance during reverent salutations.',
    defaultColorId: 'color-do-son',
    relatedMuseumId: 'ngu-than'
  },
  {
    id: 'outfit-tu-than',
    nameVi: 'Áo Tứ Thân Kinh Bắc',
    nameEn: 'Ao Tu Than (Four-Panel Dress)',
    category: 'outfit',
    gender: 'female',
    region: 'bac-bo',
    events: ['festival', 'performance', 'cultural-day'],
    eraVi: 'Thế kỷ 17 - 19',
    eraEn: '17th - 19th Century',
    shortDescVi: 'Trang phục mộc mạc bốn thân lụa mềm mại của phụ nữ Kinh Bắc, thường đi cùng yếm đào và nón quai thao.',
    shortDescEn: 'Classic four-panel folk tunic of Northern women, worn over silk camisole and broad quai thao hat.',
    culturalNoteVi: 'Hai thân sau may sống lưng, hai thân trước buông xõa hoặc buộc thắt nút trước bụng, hé lộ màu yếm thắm bên trong như lời ca quan họ duyên dáng.',
    culturalNoteEn: 'Two back panels are stitched together while the front panels tie softly at the waist, showing peek of vibrant camisole beneath.',
    defaultColorId: 'color-nau-dat',
    relatedMuseumId: 'tu-than'
  },
  {
    id: 'outfit-giao-linh',
    nameVi: 'Áo Giao Lĩnh Hữu Nhậm',
    nameEn: 'Ao Giao Linh (Crossover Lapel)',
    category: 'outfit',
    gender: 'unisex',
    region: 'bac-bo',
    events: ['cultural-day', 'performance', 'ceremony'],
    eraVi: 'Thời Lý - Trần - Hậu Lê',
    eraEn: 'Ly - Tran - Later Le Dynasties',
    shortDescVi: 'Dáng áo cổ chéo vạt sang phải (Hữu Nhậm) thanh nhã, thắt đai lưng lụa mang phong thái cổ xưa.',
    shortDescEn: 'Crossover V-lapel robe wrapping right over left, tied with silk sash in ancient style.',
    culturalNoteVi: 'Dáng áo tiêu biểu thời Lý - Trần được tìm thấy trên nhiều pho tượng cổ như tượng A Di Đà chùa Phật Tích (1057). Giữ đúng vạt Hữu Nhậm là quy tắc văn hóa quan trọng.',
    culturalNoteEn: 'Iconic ancient silhouette found on historic Buddhist statues. Wrapping right over left is an essential cultural rule.',
    defaultColorId: 'color-xanh-ngoc',
    relatedMuseumId: 'giao-linh'
  },
  {
    id: 'outfit-ba-ba',
    nameVi: 'Áo Bà Ba Nam Bộ',
    nameEn: 'Southern Ao Ba Ba',
    category: 'outfit',
    gender: 'unisex',
    region: 'nam-bo',
    events: ['cultural-day', 'performance', 'festival'],
    eraVi: 'Thế kỷ 19 - Hiện đại',
    eraEn: '19th Century - Contemporary',
    shortDescVi: 'Tà áo mộc mạc cổ tròn xẻ ngực, hai túi trước tiện dụng, gắn liền với người dân sông nước phương Nam.',
    shortDescEn: 'Simple round-neck tunic with two front pockets, embodying Southern waterways culture.',
    culturalNoteVi: 'Thiết kế xẻ tà hai bên hông tạo sự thoải mái, phóng khoáng, thường may bằng vải ú, gấm đen hoặc lụa mềm kết hợp với khăn rằn mộc mạc.',
    culturalNoteEn: 'Side splits allow freedom of movement, traditionally cut from natural silk or black satin paired with a checkered scarf.',
    defaultColorId: 'color-nau-dat',
    relatedMuseumId: 'ba-ba'
  },
  {
    id: 'outfit-tho-cam',
    nameVi: 'Trang Phục Thổ Cẩm Vùng Cao',
    nameEn: 'Highland Brocade Ensemble',
    category: 'outfit',
    gender: 'unisex',
    region: 'tay-bac',
    events: ['festival', 'cultural-day', 'performance'],
    eraVi: 'Dân tộc truyền thống',
    eraEn: 'Ethnic Heritage Tradition',
    shortDescVi: 'Áo chẽn thổ cẩm dệt tay với hoa văn hình học, đính hạt cườm và viền chỉ ngũ sắc rực rỡ.',
    shortDescEn: 'Handwoven brocade jacket featuring vibrant geometric embroidery and metallic charms.',
    culturalNoteVi: 'Đại diện cho vẻ đẹp đa dạng của 54 dân tộc anh em, thổ cẩm Tây Bắc thể hiện tài hoa xe lanh, dệt vải và nhuộm chàm của phụ nữ vùng cao.',
    culturalNoteEn: 'Showcases rich diversity of Vietnamese ethnic groups, celebrating craftsmanship in hemp spinning and indigo dyeing.',
    defaultColorId: 'color-xanh-cham'
  },
  {
    id: 'outfit-ao-dai-cach-tan',
    nameVi: 'Áo Dài Cách Tân Gen Z',
    nameEn: 'Contemporary Fusion Ao Dai',
    category: 'outfit',
    gender: 'female',
    region: 'hien-dai',
    events: ['streetwear', 'cultural-day', 'school', 'festival'],
    eraVi: 'Hiện đại - Phong cách Fusion',
    eraEn: 'Contemporary - Modern Fusion',
    shortDescVi: 'Tà lửng năng động, cổ tròn thanh thoát, tay áo bồng nhẹ kết hợp hài hòa giữa phom dáng truyền thống và nét tươi trẻ.',
    shortDescEn: 'Knee-length dynamic tunic with round neckline and soft puff sleeves blending tradition and youthful energy.',
    culturalNoteVi: 'Bản biến tấu hiện đại của Áo Dài dành cho giới trẻ: giữ trọn sự ý nhị, đoan trang nhưng giúp người mặc thuận tiện di chuyển trong nhịp sống đô thị sôi động.',
    culturalNoteEn: 'A modern evolution of the classic Ao Dai: retaining modest poise while empowering freedom of movement in bustling city life.',
    defaultColorId: 'color-hong-sen',
    isModern: true
  },
  {
    id: 'outfit-blazer-ngu-than',
    nameVi: 'Blazer Phom Dáng Ngũ Thân',
    nameEn: 'Ngu Than Tailored Blazer',
    category: 'outfit',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day', 'ceremony'],
    eraVi: 'Hiện đại - Phong cách Urban Heritage',
    eraEn: 'Contemporary - Urban Heritage Style',
    shortDescVi: 'Áo khoác vest hiện đại cách điệu từ phom dáng 5 thân, cổ lập lĩnh đứng dáng và khuy cài lệch tinh xảo.',
    shortDescEn: 'Contemporary tailored jacket echoing five-panel architecture, stand collar, and asymmetric fastener buttons.',
    culturalNoteVi: 'Sự kết hợp táo bạo giữa áo ngũ thân Việt Nam và âu phục đương đại. Thể hiện niềm tự hào bản sắc của thế hệ trẻ trong môi trường công sở hay sự kiện sáng tạo.',
    culturalNoteEn: 'Bold synthesis between traditional five-panel robe and modern suit tailoring, embodying heritage pride in creative professional settings.',
    defaultColorId: 'color-xanh-cham',
    isModern: true
  },
  {
    id: 'outfit-ao-ba-ba-crop',
    nameVi: 'Áo Bà Ba Cropped Năng Động',
    nameEn: 'Cropped Modern Ba Ba Top',
    category: 'outfit',
    gender: 'female',
    region: 'hien-dai',
    events: ['streetwear', 'cultural-day', 'festival'],
    eraVi: 'Hiện đại - Gen Z Street Style',
    eraEn: 'Contemporary - Gen Z Street Style',
    shortDescVi: 'Thiết kế dáng ngắn trẻ trung, tay áo lửng phóng khoáng nhưng giữ nét cổ tròn xẻ ngực đặc trưng Nam Bộ.',
    shortDescEn: 'Youthful cropped silhouette preserving the signature round neck and front split of Southern heritage.',
    culturalNoteVi: 'Chiếc áo bà ba quen thuộc được biến tấu đầy sức sống, vừa mang hơi thở sông nước Nam Bộ vừa đậm chất thời trang đường phố trẻ trung.',
    culturalNoteEn: 'The beloved rustic Southern tunic reimagined as a vibrant street-style piece full of youth and vitality.',
    defaultColorId: 'color-vang-hoang-yen',
    isModern: true
  }
];

export const HEADWEAR_ITEMS: LayerItem[] = [
  {
    id: 'headwear-khan-van-den',
    nameVi: 'Khăn Vấn Nhung Đen',
    nameEn: 'Black Velvet Turban',
    category: 'headwear',
    gender: 'female',
    region: 'toan-quoc',
    events: ['tet', 'wedding', 'school', 'cultural-day', 'ceremony'],
    eraVi: 'Thế kỷ 19 - Hiện đại',
    eraEn: '19th Century - Contemporary',
    shortDescVi: 'Khăn vấn nhiều vòng bằng nhung đen thanh nhã, tôn đường nét khuôn mặt.',
    shortDescEn: 'Classic layered velvet headwrap elevating facial contours.',
    culturalNoteVi: 'Phụ nữ Việt xưa thường dùng tóc độn hoặc vấn trực tiếp tóc vào khăn vải, tạo dáng đầu thon gọn, đài các.',
    culturalNoteEn: 'Vietnamese women historically wrapped hair in velvet bands, framing the visage with neat dignity.',
    defaultColorId: 'color-do-son'
  },
  {
    id: 'headwear-khan-dong-nam',
    nameVi: 'Khăn Đóng Chữ Nhân',
    nameEn: 'Scholar Folded Turban',
    category: 'headwear',
    gender: 'male',
    region: 'toan-quoc',
    events: ['ceremony', 'tet', 'wedding', 'cultural-day'],
    eraVi: 'Triều Nguyễn - Hiện đại',
    eraEn: 'Nguyen Dynasty - Contemporary',
    shortDescVi: 'Khăn đóng xếp nếp hình chữ Nhân (人) ngay ngắn chính giữa trán dành cho nam giới.',
    shortDescEn: 'Structured turban folded into the character Ren (Humanity) centered on the forehead.',
    culturalNoteVi: 'Nếp gấp chữ Nhân biểu thị đạo làm người, lòng nhân từ và thái độ mực thước của người quân tử.',
    culturalNoteEn: 'The character Nhân represents humanity and benevolent virtue expected of scholars.',
    defaultColorId: 'color-xanh-cham'
  },
  {
    id: 'headwear-man-hoang-gia',
    nameVi: 'Mấn Hoàng Gia Thếp Vàng',
    nameEn: 'Imperial Gilded Headdress',
    category: 'headwear',
    gender: 'female',
    region: 'trung-bo',
    events: ['wedding', 'ceremony', 'performance'],
    eraVi: 'Triều Nguyễn (1802 - 1945)',
    eraEn: 'Nguyen Dynasty (1802 - 1945)',
    shortDescVi: 'Khăn vấn bọc gấm thêu kim tuyến và đính hoa văn hoàng gia lộng lẫy.',
    shortDescEn: 'Opulent gold-threaded headdress reserved for court ladies and weddings.',
    culturalNoteVi: 'Thường phối cùng Áo Nhật Bình hoặc Áo Tấc trong các ngày đại lễ và ngày tân hôn trọng đại.',
    culturalNoteEn: 'Commonly paired with Ao Nhat Binh or ceremonial robes during imperial rituals and weddings.',
    defaultColorId: 'color-vang-hoang-yen'
  },
  {
    id: 'headwear-non-la',
    nameVi: 'Nón Lá Bài Thơ Xứ Huế',
    nameEn: 'Hue Poem Conical Hat',
    category: 'headwear',
    gender: 'female',
    region: 'trung-bo',
    events: ['school', 'cultural-day', 'festival', 'tet'],
    eraVi: 'Truyền thống dân gian',
    eraEn: 'Folk Tradition',
    shortDescVi: 'Nón lá gồi mỏng nhẹ, khi soi lên ánh nắng hé lộ bức tranh phong cảnh và câu thơ triết lý.',
    shortDescEn: 'Delicate leaf hat revealing landscape silhouettes and poems when held to sunlight.',
    culturalNoteVi: 'Vật dụng vừa che mưa nắng vừa là phụ kiện biểu tượng cho vẻ đẹp e ấp, dịu dàng của thiếu nữ Việt.',
    culturalNoteEn: 'Practical shade hat turned iconic symbol of gentle Vietnamese feminine poise.',
    defaultColorId: 'color-trang-lua'
  },
  {
    id: 'headwear-non-quai-thao',
    nameVi: 'Nón Quai Thao (Nón Ba Tầm)',
    nameEn: 'Non Quai Thao Flat Hat',
    category: 'headwear',
    gender: 'female',
    region: 'bac-bo',
    events: ['festival', 'performance', 'cultural-day'],
    eraVi: 'Thế kỷ 17 - 19',
    eraEn: '17th - 19th Century',
    shortDescVi: 'Nón tròn phẳng đường kính lớn đan bằng lá cọ mỏng, kèm dải quai thao thao lụa rủ dài duyên dáng.',
    shortDescEn: 'Large flat disc hat woven from palm leaves with flowing silk ties.',
    culturalNoteVi: 'Gắn liền với hình ảnh liền chị quan họ Kinh Bắc trong các ngày hội xuân rộn rã câu ca tiếng hát.',
    culturalNoteEn: 'Inseparable from Quan Ho folk singers during joyous spring village festivals.',
    defaultColorId: 'color-trang-lua'
  },
  {
    id: 'headwear-khan-ran',
    nameVi: 'Khăn Rằn Nam Bộ',
    nameEn: 'Southern Checkered Scarf',
    category: 'headwear',
    gender: 'unisex',
    region: 'nam-bo',
    events: ['cultural-day', 'festival', 'performance'],
    eraVi: 'Thế kỷ 19 - Hiện đại',
    eraEn: '19th Century - Contemporary',
    shortDescVi: 'Chiếc khăn dệt sợi bông ca-rô trắng đen quấn đầu hoặc vắt vai mộc mạc.',
    shortDescEn: 'Black-and-white checkered cotton scarf draped over the shoulder or head.',
    culturalNoteVi: 'Vật bất ly thân của người nông dân Nam Bộ, đồng hành qua mưa nắng, lau giọt mồ hôi trên đồng ruộng bến sông.',
    culturalNoteEn: 'Indispensable companion of Southern farmers through sunshine and rainfall along riverbanks.',
    defaultColorId: 'color-trang-lua'
  },
  {
    id: 'headwear-mu-tho-cam',
    nameVi: 'Mũ Đội Thổ Cẩm Vùng Cao',
    nameEn: 'Highland Brocade Cap',
    category: 'headwear',
    gender: 'unisex',
    region: 'tay-bac',
    events: ['festival', 'cultural-day', 'performance'],
    eraVi: 'Dân tộc truyền thống',
    eraEn: 'Ethnic Heritage Tradition',
    shortDescVi: 'Mũ thêu họa tiết dệt tay đính lục lạc đồng nhỏ phát ra âm thanh vui tai.',
    shortDescEn: 'Intricately embroidered cap with tiny brass jingling charms.',
    culturalNoteVi: 'Mỗi họa tiết dệt trên mũ đều mang biểu tượng hoa rừng, mắt chim và các vì tinh tú dẫn đường.',
    culturalNoteEn: 'Motifs depict forest flowers and guiding stars cherished by highland communities.',
    defaultColorId: 'color-do-son'
  },
  {
    id: 'headwear-beret-hien-dai',
    nameVi: 'Mũ Nồi Beret Cổ Điển',
    nameEn: 'Classic Wool Beret',
    category: 'headwear',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day'],
    eraVi: 'Hiện đại - Vintage Retro',
    eraEn: 'Contemporary - Vintage Retro',
    shortDescVi: 'Mũ beret dạ len thanh lịch mang hơi thở hoài cổ giao thoa phương Tây đầu thế kỷ 20.',
    shortDescEn: 'Sophisticated wool beret evoking early 20th century Indochine vintage charm.',
    culturalNoteVi: 'Từng là trào lưu thịnh hành của giới trí thức văn nghệ sĩ Hà Nội và Sài Gòn xưa khi kết hợp cùng áo dài hoặc âu phục.',
    culturalNoteEn: 'A favorite fashion hallmark among Hanoi and Saigon intellectuals paired with Ao Dai or tailored suits.',
    defaultColorId: 'color-xanh-cham',
    isModern: true
  },
  {
    id: 'headwear-bucket-tho-cam',
    nameVi: 'Mũ Bucket Thổ Cẩm Streetwear',
    nameEn: 'Heritage Brocade Bucket Hat',
    category: 'headwear',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'festival', 'cultural-day'],
    eraVi: 'Hiện đại - Gen Z Streetwear',
    eraEn: 'Contemporary - Gen Z Streetwear',
    shortDescVi: 'Mũ tai bèo vành tròn phối dải thổ cẩm dệt tay năng động, phong cách trẻ trung.',
    shortDescEn: 'Dynamic bucket hat accented with handwoven ethnic brocade band for street vibes.',
    culturalNoteVi: 'Sự hòa quyện giữa văn hóa thời trang đường phố toàn cầu và hoa văn dân tộc bản địa đặc sắc.',
    culturalNoteEn: 'Harmonious fusion of global urban street culture and indigenous Vietnamese textile art.',
    defaultColorId: 'color-xanh-cham',
    isModern: true
  }
];

export const ACCESSORY_ITEMS: LayerItem[] = [
  {
    id: 'acc-kieng-bac',
    nameVi: 'Kiềng Bạc Hoa Sen',
    nameEn: 'Silver Lotus Torque Necklace',
    category: 'accessory',
    gender: 'female',
    region: 'toan-quoc',
    events: ['wedding', 'ceremony', 'tet', 'cultural-day', 'school'],
    eraVi: 'Truyền thống cổ truyền',
    eraEn: 'Traditional Heritage',
    shortDescVi: 'Kiềng tròn bằng bạc nguyên khối chạm khắc hoa văn hoa sen tối giản, thanh khiết.',
    shortDescEn: 'Solid circular silver torque engraved with minimalist lotus motifs.',
    culturalNoteVi: 'Biểu tượng của nét đẹp thuần khiết, quý phái của phụ nữ Việt, thường được trao làm của hồi môn ngày cưới.',
    culturalNoteEn: 'Symbol of pure noble dignity, traditionally gifted as bridal dowry.',
    defaultColorId: 'color-trang-lua'
  },
  {
    id: 'acc-quat-tram',
    nameVi: 'Quạt Giấy Trầm Hương',
    nameEn: 'Incense Paper Folding Fan',
    category: 'accessory',
    gender: 'unisex',
    region: 'toan-quoc',
    events: ['cultural-day', 'school', 'ceremony', 'tet'],
    eraVi: 'Thế kỷ 18 - Hiện đại',
    eraEn: '18th Century - Contemporary',
    shortDescVi: 'Chiếc quạt giấy dó nan tre tỏa hương trầm dịu nhẹ khi phe phẩy.',
    shortDescEn: 'Handmade Do-paper fan with bamboo ribs releasing subtle agarwood scent.',
    culturalNoteVi: 'Vật tùy thân của nho sĩ và tao nhân mặc khách, tượng trưng cho phong thái tao nhã, ung dung.',
    culturalNoteEn: 'Scholarly accessory symbolizing unhurried composure and literary refinement.',
    defaultColorId: 'color-vang-hoang-yen'
  },
  {
    id: 'acc-chuoi-ngoc',
    nameVi: 'Chuỗi Vòng Ngọc Bích',
    nameEn: 'Jadeite Beaded Necklace',
    category: 'accessory',
    gender: 'female',
    region: 'trung-bo',
    events: ['ceremony', 'wedding', 'cultural-day'],
    eraVi: 'Triều Nguyễn (1802 - 1945)',
    eraEn: 'Nguyen Dynasty (1802 - 1945)',
    shortDescVi: 'Chuỗi hạt ngọc bích xanh mướt sang trọng, quý phái chuẩn phong thái cung đình.',
    shortDescEn: 'Lustrous green jade bead strand radiating royal court elegance.',
    culturalNoteVi: 'Được các mệnh phụ và cung tần triều đình ưa chuộng để tôn vinh làn da và phẩm hạnh.',
    culturalNoteEn: 'Cherished by court noblewomen to highlight gentle complexion and virtue.',
    defaultColorId: 'color-xanh-ngoc'
  },
  {
    id: 'acc-hoa-tai-vang',
    nameVi: 'Hoa Tai Búp Sen Vàng',
    nameEn: 'Gold Lotus Bud Earrings',
    category: 'accessory',
    gender: 'female',
    region: 'toan-quoc',
    events: ['wedding', 'ceremony', 'tet'],
    eraVi: 'Truyền thống',
    eraEn: 'Traditional',
    shortDescVi: 'Đôi hoa tai vàng chạm hình búp sen e ấp, đung đưa nhẹ nhàng theo bước đi.',
    shortDescEn: 'Gold earrings sculpted like delicate lotus buds swaying gracefully.',
    culturalNoteVi: 'Tôn vinh sự tinh tế, kín đáo và nụ cười rạng rỡ của người con gái Việt Nam.',
    culturalNoteEn: 'Highlights understated refinement and warmth of Vietnamese women.',
    defaultColorId: 'color-vang-hoang-yen'
  },
  {
    id: 'acc-tui-gam',
    nameVi: 'Túi Gấm Thêu Tay',
    nameEn: 'Embroidered Brocade Pouch',
    category: 'accessory',
    gender: 'female',
    region: 'toan-quoc',
    events: ['tet', 'cultural-day', 'festival', 'wedding'],
    eraVi: 'Thế kỷ 19 - Hiện đại',
    eraEn: '19th Century - Contemporary',
    shortDescVi: 'Chiếc túi cầm tay bằng lụa gấm thêu hoa mai hoa đào tinh xảo.',
    shortDescEn: 'Silk brocade clutch embroidered with delicate apricot and peach blossoms.',
    culturalNoteVi: 'Vật dụng đựng gương lược, hương hoa hoặc tiền mừng tuổi may mắn trong dịp đầu năm mới.',
    culturalNoteEn: 'Used to carry lucky red envelopes and perfumed sachets during Lunar New Year.',
    defaultColorId: 'color-do-son'
  },
  {
    id: 'acc-hoa-sen',
    nameVi: 'Cành Hoa Sen Hồng Cầm Tay',
    nameEn: 'Handheld Pink Lotus Flower',
    category: 'accessory',
    gender: 'female',
    region: 'toan-quoc',
    events: ['school', 'cultural-day', 'performance', 'wedding'],
    eraVi: 'Truyền thống',
    eraEn: 'Traditional',
    shortDescVi: 'Đóa sen hồng hàm tiếu tỏa hương thơm ngát tôn nét thanh tao trong trẻo.',
    shortDescEn: 'Fresh pink lotus blossom conveying purity and poetic calm.',
    culturalNoteVi: 'Sen là quốc hoa của dân tộc, biểu trưng cho vẻ đẹp gần bùn mà chẳng hôi tanh mùi bùn.',
    culturalNoteEn: 'The national flower symbolizing upright dignity rising untarnished from water.',
    defaultColorId: 'color-hong-sen'
  },
  {
    id: 'acc-kinh-ram-retro',
    nameVi: 'Kính Râm Gọng Đồi Mồi Retro',
    nameEn: 'Retro Tortoiseshell Sunglasses',
    category: 'accessory',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day'],
    eraVi: 'Hiện đại - Y2K Vintage',
    eraEn: 'Contemporary - Y2K Vintage',
    shortDescVi: 'Mắt kính râm gọng bo tròn thời thượng, tạo điểm nhấn cá tính khi phối cùng cổ phục cách tân.',
    shortDescEn: 'Stylish rounded sunglasses adding bold contemporary personality to heritage styling.',
    culturalNoteVi: 'Phụ kiện thể hiện gu thời trang tự tin, phá cách của thế hệ trẻ khi mix & match cổ phục dạo phố.',
    culturalNoteEn: 'Expresses confident self-styling of younger generations taking heritage pieces to modern streets.',
    defaultColorId: 'color-nau-dat',
    isModern: true
  },
  {
    id: 'acc-tui-tote-canvas',
    nameVi: 'Túi Tote Canvas Họa Tiết Di Sản',
    nameEn: 'Heritage Motif Canvas Tote',
    category: 'accessory',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day', 'festival'],
    eraVi: 'Hiện đại - Gen Z Eco-Friendly',
    eraEn: 'Contemporary - Gen Z Eco-Friendly',
    shortDescVi: 'Túi vải bố thân thiện môi trường in họa tiết hoa sen và hoa văn thời Lý trang nhã.',
    shortDescEn: 'Eco-conscious canvas tote printed with elegant Ly Dynasty lotus motifs.',
    culturalNoteVi: 'Vật dụng thường nhật quen thuộc của học sinh, sinh viên, lan tỏa tình yêu di sản vào đời sống thường nhật.',
    culturalNoteEn: 'Everyday campus essential carrying cultural symbols into contemporary active lifestyles.',
    defaultColorId: 'color-trang-lua',
    isModern: true
  },
  {
    id: 'acc-tai-nghe-chup-tai',
    nameVi: 'Tai Nghe Chụp Tai Hi-Fi Bạc',
    nameEn: 'Hi-Fi Silver Over-Ear Headphones',
    category: 'accessory',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school'],
    eraVi: 'Hiện đại - Tech Lifestyle',
    eraEn: 'Contemporary - Tech Lifestyle',
    shortDescVi: 'Tai nghe chụp tai kim loại đeo quanh cổ, nét chấm phá công nghệ cực chất cho trang phục.',
    shortDescEn: 'Metallic wireless headphones worn around the neck, adding sleek modern tech accent.',
    culturalNoteVi: 'Biểu tượng phong cách sống năng động của Gen Z: yêu công nghệ hiện đại nhưng trân quý cội nguồn truyền thống.',
    culturalNoteEn: 'Emblem of Gen Z youth: embracing cutting-edge tech while celebrating cultural roots.',
    defaultColorId: 'color-trang-lua',
    isModern: true
  }
];

export const BOTTOM_ITEMS: LayerItem[] = [
  {
    id: 'bottom-quan-trang',
    nameVi: 'Quần Lụa Trắng Thụng',
    nameEn: 'Flowing White Silk Trousers',
    category: 'bottom',
    gender: 'unisex',
    region: 'toan-quoc',
    events: ['tet', 'wedding', 'school', 'cultural-day', 'ceremony'],
    eraVi: 'Truyền thống',
    eraEn: 'Traditional',
    shortDescVi: 'Quần lụa ống rộng màu trắng tinh khôi, dài chấm mắt cá chân.',
    shortDescEn: 'Wide-legged pure white silk trousers falling gracefully to the ankles.',
    culturalNoteVi: 'Phối chuẩn mực nhất cho Áo Dài, Áo Ngũ Thân và Áo Tấc, tạo bước đi thanh thoát, trang trọng.',
    culturalNoteEn: 'Canonical pairing with Ao Dai and Ngu Than robes ensuring elegant stride.',
    defaultColorId: 'color-trang-lua'
  },
  {
    id: 'bottom-quan-den',
    nameVi: 'Quần Lụa Đen',
    nameEn: 'Black Silk Trousers',
    category: 'bottom',
    gender: 'unisex',
    region: 'toan-quoc',
    events: ['cultural-day', 'festival', 'performance'],
    eraVi: 'Truyền thống',
    eraEn: 'Traditional',
    shortDescVi: 'Quần lụa tơ bóng màu đen tuyền đoan trang, sạch sẽ và thuận tiện di chuyển.',
    shortDescEn: 'Modest black silk trousers easy for movement and daily wear.',
    culturalNoteVi: 'Rất phổ biến khi phối cùng Áo Ngũ Thân sinh hoạt thường nhật hoặc Áo Bà Ba Nam Bộ.',
    culturalNoteEn: 'Widely worn with everyday Ngu Than robes or Southern Ao Ba Ba.',
    defaultColorId: 'color-xanh-cham'
  },
  {
    id: 'bottom-yem-dao',
    nameVi: 'Yếm Đào Lụa Tơ',
    nameEn: 'Silk Camisole (Yem)',
    category: 'bottom',
    gender: 'female',
    region: 'bac-bo',
    events: ['festival', 'performance', 'cultural-day'],
    eraVi: 'Truyền thống dân gian',
    eraEn: 'Folk Tradition',
    shortDescVi: 'Tấm yếm lụa màu hoa đào mềm mại mặc lót bên trong Áo Tứ Thân.',
    shortDescEn: 'Soft peach-pink silk under-camisole worn beneath Ao Tu Than.',
    culturalNoteVi: 'Nội y truyền thống của phụ nữ Việt, khi phối cùng áo tứ thân hé lộ nét thắm duyên dáng nơi cổ áo.',
    culturalNoteEn: 'Historic undergarment offering subtle contrast along the collarline.',
    defaultColorId: 'color-hong-sen'
  },
  {
    id: 'bottom-vay-thuong',
    nameVi: 'Váy Thường Xếp Nếp Thời Lý',
    nameEn: 'Ly Dynasty Pleated Skirt (Thuong)',
    category: 'bottom',
    gender: 'unisex',
    region: 'bac-bo',
    events: ['cultural-day', 'performance', 'ceremony'],
    eraVi: 'Thời Lý - Trần',
    eraEn: 'Ly - Tran Dynasties',
    shortDescVi: 'Váy quây xếp nếp mềm mại buông rủ kết hợp cùng Áo Giao Lĩnh.',
    shortDescEn: 'Soft pleated wrap skirt worn in ensemble with Ao Giao Linh robes.',
    culturalNoteVi: 'Phục dựng theo nếp tượng chùa Phật Tích, tạo phong thái thong dong, bay bổng như mây.',
    culturalNoteEn: 'Reconstructed from Buddhist statue drapery creating cloud-like flowing posture.',
    defaultColorId: 'color-xanh-ngoc'
  },
  {
    id: 'bottom-quan-tay-ong-rong',
    nameVi: 'Quần Tây Ống Rộng Minimalist',
    nameEn: 'Wide-Leg Minimalist Trousers',
    category: 'bottom',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day', 'ceremony'],
    eraVi: 'Hiện đại - Modern Tailoring',
    eraEn: 'Contemporary - Modern Tailoring',
    shortDescVi: 'Quần tây cạp cao ống suông thanh lịch, tạo cảm giác kéo dài đôi chân và đứng phom chuẩn mực.',
    shortDescEn: 'High-waisted wide-leg tailored trousers providing clean lines and comfortable stride.',
    culturalNoteVi: 'Món đồ quốc dân trong phong cách phối đồ hiện đại, cực kỳ ăn ý khi đi cùng blazer ngũ thân hoặc áo dài cách tân.',
    culturalNoteEn: 'A versatile modern wardrobe staple pairing seamlessly with tailored heritage blazers and fusion tunics.',
    defaultColorId: 'color-trang-lua',
    isModern: true
  },
  {
    id: 'bottom-chan-vay-midi-xep-ly',
    nameVi: 'Chân Váy Xếp Ly Midi Nữ Tính',
    nameEn: 'Pleated Midi Skirt',
    category: 'bottom',
    gender: 'female',
    region: 'hien-dai',
    events: ['streetwear', 'school', 'cultural-day', 'festival'],
    eraVi: 'Hiện đại - Elegant Chic',
    eraEn: 'Contemporary - Elegant Chic',
    shortDescVi: 'Chân váy lụa dập ly tinh tế dáng xòe nhẹ, uyển chuyển trong từng nhịp bước.',
    shortDescEn: 'Delicate sunray pleated midi skirt offering graceful movement and modern femininity.',
    culturalNoteVi: 'Kế thừa tinh thần của chiếc váy thường cổ truyền nhưng mang độ dài và chất liệu bay bổng của thời trang hiện đại.',
    culturalNoteEn: 'Echoes the fluid elegance of historic wrap skirts in a lightweight, contemporary silhouette.',
    defaultColorId: 'color-hong-sen',
    isModern: true
  },
  {
    id: 'bottom-quan-jeans-indigo',
    nameVi: 'Quần Jeans Xanh Indigo Năng Động',
    nameEn: 'Indigo Denim Straight Jeans',
    category: 'bottom',
    gender: 'unisex',
    region: 'hien-dai',
    events: ['streetwear', 'festival'],
    eraVi: 'Hiện đại - Casual Streetwear',
    eraEn: 'Contemporary - Casual Streetwear',
    shortDescVi: 'Quần jeans ống đứng màu xanh chàm cổ điển, thoải mái và đậm chất bụi bặm đường phố.',
    shortDescEn: 'Classic straight-leg indigo denim jeans delivering effortless urban versatility.',
    culturalNoteVi: 'Đại diện tiêu biểu cho tinh thần streetwear Gen Z: phối áo bà ba hoặc áo tứ thân cùng quần denim tạo nên phong cách tương phản ấn tượng.',
    culturalNoteEn: 'Quintessential street-style statement creating high-contrast aesthetic when paired with traditional tunics.',
    defaultColorId: 'color-xanh-cham',
    isModern: true
  }
];

export const HAIR_ITEMS: LayerItem[] = [
  {
    id: 'hair-van-tran',
    nameVi: 'Tóc Vấn Trần Ngôi Giữa',
    nameEn: 'Center-Parted Hair Wrap',
    category: 'hair',
    gender: 'female',
    region: 'toan-quoc',
    events: ['tet', 'wedding', 'school', 'cultural-day'],
    eraVi: 'Truyền thống',
    eraEn: 'Traditional',
    shortDescVi: 'Mái tóc rẽ ngôi giữa đều đặn, vấn gọn gàng quanh đầu.',
    shortDescEn: 'Neat center part wrapped smoothly around the head.',
    culturalNoteVi: 'Kiểu tóc truyền thống mộc mạc tôn trọn khuôn mặt trái xoan thuần hậu của người phụ nữ.',
    culturalNoteEn: 'Classic style showcasing oval facial harmony and serene eyes.',
    defaultColorId: 'color-do-son'
  },
  {
    id: 'hair-bui-cao',
    nameVi: 'Tóc Búi Cài Trâm Sen',
    nameEn: 'Lotus Hairpin High Bun',
    category: 'hair',
    gender: 'female',
    region: 'trung-bo',
    events: ['ceremony', 'wedding', 'performance'],
    eraVi: 'Thời Lý - Nguyễn',
    eraEn: 'Ly - Nguyen Dynasties',
    shortDescVi: 'Mái tóc búi cao thanh thoát đính trâm cài hoa sen bạc.',
    shortDescEn: 'High bun secured with a silver lotus hairpin.',
    culturalNoteVi: 'Thường thấy ở chốn cung đình hoặc các tầng lớp quyền quý thời xưa.',
    culturalNoteEn: 'Reflected in aristocratic portraits and court gatherings.',
    defaultColorId: 'color-vang-hoang-yen'
  },
  {
    id: 'hair-bui-nam',
    nameVi: 'Tóc Búi Nho Sinh Sau Gáy',
    nameEn: 'Scholar Nape Bun',
    category: 'hair',
    gender: 'male',
    region: 'toan-quoc',
    events: ['ceremony', 'cultural-day', 'tet'],
    eraVi: 'Thời phong kiến',
    eraEn: 'Historical Eras',
    shortDescVi: 'Tóc dài búi gọn gàng sau gáy, thuận tiện khi đội khăn đóng.',
    shortDescEn: 'Tied neatly at the nape, fitting snugly under turbans.',
    culturalNoteVi: 'Đàn ông Việt xưa có tục để tóc dài búi tó, thể hiện thân thể do cha mẹ sinh thành không được tùy tiện cắt bỏ.',
    culturalNoteEn: 'Vietnamese men traditionally kept uncut hair bundled as a sign of filial piety.',
    defaultColorId: 'color-xanh-cham'
  },
  {
    id: 'hair-ngan',
    nameVi: 'Tóc Tự Nhiên Gọn Gàng',
    nameEn: 'Modern Neat Silhouette',
    category: 'hair',
    gender: 'unisex',
    region: 'toan-quoc',
    events: ['school', 'cultural-day', 'festival'],
    eraVi: 'Hiện đại',
    eraEn: 'Contemporary',
    shortDescVi: 'Kiểu tóc hiện đại gọn gàng, phù hợp phong cách Gen Z năng động.',
    shortDescEn: 'Contemporary clean hairstyle for energetic young moderns.',
    culturalNoteVi: 'Sự giao thoa giữa nét đẹp truyền thống và phong thái tự tin đương đại.',
    culturalNoteEn: 'Bridge between cultural heritage and contemporary self-expression.',
    defaultColorId: 'color-trang-lua'
  }
];

export const EVENT_FILTERS: { id: EventFilterId; labelVi: string; labelEn: string; icon: string }[] = [
  { id: 'all', labelVi: 'Tất Cả Dịp', labelEn: 'All Occasions', icon: '✨' },
  { id: 'tet', labelVi: 'Tết Nguyên Đán', labelEn: 'Lunar New Year', icon: '🧧' },
  { id: 'festival', labelVi: 'Lễ Hội Truyền Thống', labelEn: 'Folk Festivals', icon: '🏮' },
  { id: 'wedding', labelVi: 'Cưới Hỏi / Đại Hỷ', labelEn: 'Weddings', icon: '💐' },
  { id: 'cultural-day', labelVi: 'Ngày Hội Văn Hóa', labelEn: 'Heritage Days', icon: '🎋' },
  { id: 'school', labelVi: 'Đi Học / Kỷ Yếu', labelEn: 'School / Graduation', icon: '🎓' },
  { id: 'streetwear', labelVi: 'Dạo Phố / Streetwear', labelEn: 'Streetwear & Casual', icon: '👟' },
  { id: 'ceremony', labelVi: 'Sự Kiện Trang Trọng', labelEn: 'Ceremonial Rites', icon: '👑' },
  { id: 'performance', labelVi: 'Biểu Diễn Nghệ Thuật', labelEn: 'Performances', icon: '🎭' }
];

export const REGION_FILTERS: { id: RegionFilterId; labelVi: string; labelEn: string }[] = [
  { id: 'all', labelVi: 'Mọi Miền Đất Nước', labelEn: 'All Regions' },
  { id: 'bac-bo', labelVi: 'Bắc Bộ (Kinh Bắc - Thăng Long)', labelEn: 'Northern Realm' },
  { id: 'trung-bo', labelVi: 'Trung Bộ (Cố Đô Huế)', labelEn: 'Central Realm' },
  { id: 'nam-bo', labelVi: 'Nam Bộ (Phương Nam Trù Phú)', labelEn: 'Southern Realm' },
  { id: 'tay-bac', labelVi: 'Tây Bắc (Bản Làng Vùng Cao)', labelEn: 'Highland Culture' },
  { id: 'hien-dai', labelVi: 'Hiện Đại (Gen Z Fusion)', labelEn: 'Contemporary Fusion' },
  { id: 'toan-quoc', labelVi: 'Toàn Quốc (Giao Thoa Di Sản)', labelEn: 'National Heritage' }
];

/**
 * Evaluates dynamic styling suggestions based on active layer items and color.
 */
export function getStylingRecommendation(
  state: DressUpState,
  lang: 'vi' | 'en' = 'vi'
): { tipVi: string; tipEn: string; decorumVi: string; decorumEn: string } {
  const isEn = lang === 'en';
  
  if (state.outfitId === 'outfit-nhat-binh') {
    if (state.headwearId !== 'headwear-man-hoang-gia' && state.headwearId !== 'headwear-khan-van-den') {
      return {
        tipVi: 'Áo Nhật Bình là lễ phục hoàng cung. Bộ trang phục sẽ uy nghi trọn vẹn hơn khi kết hợp cùng Mấn Hoàng Gia hoặc Khăn Vấn Nhung Đen!',
        tipEn: 'Ao Nhat Binh is an imperial court robe. Pair with a Gilded Headdress or Velvet Turban to honor its regal decorum.',
        decorumVi: 'Chuẩn quy chế cung đình 98%',
        decorumEn: 'Imperial Decorum 98%'
      };
    }
    return {
      tipVi: 'Bản phối Áo Nhật Bình cùng khăn vấn và kiềng bạc tái hiện hoàn hảo phong thái hậu phi thời Nguyễn.',
      tipEn: 'This Ao Nhat Binh ensemble with royal headwrap captures authentic Nguyen court majesty.',
      decorumVi: 'Tuyệt mỹ điển chế 100%',
      decorumEn: 'Impeccable Decorum 100%'
    };
  }

  if (state.outfitId === 'outfit-ngu-than' || state.outfitId === 'outfit-ao-tac') {
    if (state.character === 'male-01' && state.headwearId !== 'headwear-khan-dong-nam') {
      return {
        tipVi: 'Với nam sĩ tử diện áo ngũ thân hoặc áo tấc, hãy đội Khăn Đóng Chữ Nhân để toát lên khí chất thư sinh đĩnh đạc!',
        tipEn: 'For male scholars in Ngu Than or Ao Tac, wear the Folded Scholar Turban to embody dignified poise.',
        decorumVi: 'Gợi ý nâng tầm phong thái',
        decorumEn: 'Recommended Refinement'
      };
    }
    return {
      tipVi: 'Tà áo ngũ thân kết hợp cùng quần lụa trắng và quạt trầm hương tạo nên hình ảnh văn nhân tao nhã, chuẩn mực.',
      tipEn: 'Ngu Than robe with white silk trousers and folding fan creates an elegant classic scholar look.',
      decorumVi: 'Đạt chuẩn mực Nho nhã 100%',
      decorumEn: 'Scholarly Decorum 100%'
    };
  }

  if (state.outfitId === 'outfit-tu-than') {
    if (state.headwearId !== 'headwear-non-quai-thao') {
      return {
        tipVi: 'Áo Tứ Thân Kinh Bắc sẽ duyên dáng gấp bội nếu đi kèm chiếc Nón Quai Thao (Nón Ba Tầm) thắt dải lụa mềm!',
        tipEn: 'Northern Ao Tu Than looks especially radiant when complemented by a broad Non Quai Thao hat.',
        decorumVi: 'Nét duyên Quan Họ',
        decorumEn: 'Quan Ho Charm'
      };
    }
    return {
      tipVi: 'Bản phối hoàn hảo như một liền chị trẩy hội Lim mùa xuân, đậm đà bản sắc văn hóa Bắc Bộ.',
      tipEn: 'Flawless festival ensemble evoking the poetic spirit of spring Quan Ho gatherings.',
      decorumVi: 'Hòa điệu văn hóa dân gian 100%',
      decorumEn: 'Folk Harmony 100%'
    };
  }

  if (state.outfitId === 'outfit-ba-ba') {
    return {
      tipVi: 'Áo Bà Ba kết hợp cùng Khăn Rằn vắt vai mang lại vẻ đẹp mộc mạc, phóng khoáng của miền đất phương Nam.',
      tipEn: 'Ao Ba Ba paired with the checkered scarf embodies the warm and rustic hospitality of Southern Vietnam.',
      decorumVi: 'Hồn hậu phương Nam 100%',
      decorumEn: 'Southern Soul 100%'
    };
  }

  if (state.outfitId === 'outfit-ao-dai-cach-tan') {
    return {
      tipVi: 'Áo Dài cách tân phối cùng chân váy midi hoặc quần tây ống rộng tạo diện mạo Gen Z hiện đại, năng động mà vẫn giữ vẹn nguyên nét duyên dáng người Việt!',
      tipEn: 'Fusion Ao Dai paired with pleated midi skirt or tailored trousers delivers a dynamic Gen Z aesthetic while honoring cultural modesty!',
      decorumVi: 'Gen Z Fusion phá cách 96%',
      decorumEn: 'Gen Z Fusion 96%'
    };
  }

  if (state.outfitId === 'outfit-blazer-ngu-than') {
    return {
      tipVi: 'Blazer phom dáng ngũ thân kết hợp cùng kính râm retro hoặc túi canvas mang lại phong cách Urban Heritage cực chất cho môi trường sáng tạo!',
      tipEn: 'Ngu Than tailored blazer styled with retro shades or canvas tote crafts a sharp Urban Heritage look for creative spaces!',
      decorumVi: 'Urban Heritage thời thượng 95%',
      decorumEn: 'Urban Heritage 95%'
    };
  }

  if (state.outfitId === 'outfit-ao-ba-ba-crop') {
    return {
      tipVi: 'Áo Bà Ba cropped phối cùng quần jeans indigo và mũ bucket thổ cẩm tạo nên bản hòa âm đường phố phóng khoáng, trẻ trung bất ngờ!',
      tipEn: 'Cropped Ba Ba top paired with indigo denim and brocade bucket hat produces a fresh, vibrant street-ready ensemble!',
      decorumVi: 'Streetwear cá tính 95%',
      decorumEn: 'Youth Streetwear 95%'
    };
  }

  return {
    tipVi: 'Áo Dài kết hợp cùng kiềng bạc hoa sen và đóa sen hồng cầm tay tạo nên biểu tượng thanh tao vượt thời gian.',
    tipEn: 'Ao Dai paired with a silver torque and fresh lotus conveys timeless Vietnamese serenity.',
    decorumVi: 'Thanh lịch truyền thống 100%',
    decorumEn: 'Traditional Poise 100%'
  };
}
