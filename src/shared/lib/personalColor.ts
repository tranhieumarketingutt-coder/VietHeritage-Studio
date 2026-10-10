import { evaluateGuardrails, OutfitConfig } from './guardrails';

/**
 * Traditional Vietnamese natural dye color palette.
 */
export const TRADITIONAL_DYES = {
  'cu-den': { nameVi: 'Màu Củ Dền', nameEn: 'Beetroot Crimson', hex: '#8B1E3F', descVi: 'Sắc đỏ tía sâu thẳm từ củ dền tự nhiên, tôn vinh khí chất quý phái.', descEn: 'Deep crimson from natural beetroot, exuding noble aura.' },
  'xanh-cham': { nameVi: 'Xanh Chàm', nameEn: 'Indigo Blue', hex: '#1C3144', descVi: 'Chiết xuất từ lá chàm miền sơn cước, biểu trưng cho sự trầm tĩnh, nội lực.', descEn: 'Mountain indigo extract, symbolizing calm inner strength.' },
  'do-son': { nameVi: 'Đỏ Son', nameEn: 'Vermilion Red', hex: '#9E1B1B', descVi: 'Màu chu sa may mắn, quyền quý của phẩm phục cung đình và hỷ sự.', descEn: 'Auspicious vermilion, royal majesty for imperial ceremonies.' },
  'hoang-yen': { nameVi: 'Vàng Hoàng Yến', nameEn: 'Imperial Canary Gold', hex: '#D4AF37', descVi: 'Màu ánh kim của hoa mai và tơ hoàng yến, thanh nhã và vương giả.', descEn: 'Golden shimmer of apricot blossoms, elegant and imperial.' },
  'xanh-com': { nameVi: 'Xanh Hương Cốm', nameEn: 'Young Rice Mint', hex: '#6B8E23', descVi: 'Sắc xanh dịu mát của lúa non Hà thành, tôn da sáng trẻ trung.', descEn: 'Refreshing mint of young Hanoi rice, brightens youthful skin.' },
  'nau-gu': { nameVi: 'Nâu Củ Nâu / Nâu Gụ', nameEn: 'Natural Yam Brown', hex: '#6B4226', descVi: 'Nhuộm từ củ nâu cổ truyền, bền bỉ, mộc mạc và phong thái hoài niệm.', descEn: 'Traditional yam dye, durable, rustic with a nostalgic flair.' }
};

export interface PersonalColorParams extends OutfitConfig {
  undertoneChoice?: string;
  height?: number | string;
  weight?: number | string;
  bodyShape?: string;
  weather?: string;
}

/**
 * Analyzes the user's personal color profile and returns styling recommendations.
 * @param params The user's physical attributes and outfit choices.
 * @returns An object containing styling suggestions, color recommendations, and guardrail results.
 */
export function analyzePersonalColor({
  undertoneChoice,
  height,
  weight,
  bodyShape,
  destination,
  weather,
  costumeId,
  bottomChoice,
  collarChoice,
  colorHex
}: PersonalColorParams) {
  let season = 'Mùa Thu (Autumn - Warm)';
  let seasonKey = 'autumn';
  let skinToneDesc = 'Da ngăm ấm / vàng olive';
  let paletteSuggestions = 'Cam đất, Đỏ tía Burgundy, Vàng mù tạt, Xanh rêu Olive';
  let recommendedCostume = 'Áo Tấc bánh quy cam, Nhật Bình gấm Vọng Nguyệt đỏ trầm, Giao Lĩnh the vàng đất';
  let dyeList = [TRADITIONAL_DYES['nau-gu'], TRADITIONAL_DYES['cu-den'], TRADITIONAL_DYES['hoang-yen']];
  let descriptionVi = 'Nền da vàng mật ong hoặc da ngăm khỏe khoắn (Warm Undertone kinh điển của người Việt). Cực kỳ tôn dáng với các gam màu đất: Nâu củ nâu, Đỏ tía củ dền, Gấm tơ vàng mù tạt.';
  let descriptionEn = 'Golden honey olive skin tone characteristic of Vietnamese ancestry. Exquisitely harmonized by wild-yam browns, deep beetroot burgundy, and warm amber brocades.';

  const u = (undertoneChoice || '').toLowerCase();
  if (u === 'spring' || u === 'warm-spring') {
    seasonKey = 'spring';
    season = 'Mùa Xuân (Spring - Warm)';
    skinToneDesc = 'Da sáng hồng / vàng nhạt (Warm Undertone)';
    paletteSuggestions = 'Vàng nhạt, Hồng đào, Mint, Be sáng';
    recommendedCostume = 'Áo Tấc tơ be thêu hoa cam, Nhật Bình Hương Cốm';
    dyeList = [TRADITIONAL_DYES['hoang-yen'], TRADITIONAL_DYES['xanh-com'], TRADITIONAL_DYES['do-son']];
    descriptionVi = 'Làn da sáng ấm ánh hồng đào, tĩnh mạch ánh xanh lá. Bạn hợp tuyệt đối với gam màu rực rỡ, tươi tắn như Vàng Hoàng Yến, Xanh Cốm non hoặc Áo Tấc tơ be thêu hoa cam, Nhật Bình Hương Cốm.';
    descriptionEn = 'Luminous warm undertone with peach glow. Best flattered by Canary Gold, Young Rice Mint, and Coral-embroidered Silk Robes.';
  } else if (u === 'summer' || u === 'cool-summer') {
    seasonKey = 'summer';
    season = 'Mùa Hạ (Summer - Cool)';
    skinToneDesc = 'Da sáng hồng lạnh (Cool Undertone)';
    paletteSuggestions = 'Xanh pastel, Tím Lavender, Trắng ngà';
    recommendedCostume = 'Áo Tấc xanh trời, Áo Ngũ Thân Thanh liên hoa';
    dyeList = [TRADITIONAL_DYES['xanh-cham'], TRADITIONAL_DYES['cu-den'], TRADITIONAL_DYES['xanh-com']];
    descriptionVi = 'Làn da trắng sáng ánh hồng lạnh hoặc xanh, tĩnh mạch xanh tím. Rất phù hợp với sắc xanh pastel, tím lavender, sa Hà Đông màu thanh liên hoa và trắng ngà dịu nhẹ.';
    descriptionEn = 'Cool undertone with delicate translucence. Ideal pairings include sky-blue Ao Tac, lavender purple, and lotus flower pastel tunics.';
  } else if (u === 'winter' || u === 'cool-winter') {
    seasonKey = 'winter';
    season = 'Mùa Đông (Winter - Cool)';
    skinToneDesc = 'Da trắng xanh / ngăm lạnh tương phản cao (Cool Undertone)';
    paletteSuggestions = 'Đen tuyền, Trắng tinh, Đỏ Ruby, Xanh Cobalt';
    recommendedCostume = 'Áo Ngũ Thân tay chẽn đỏ anh đào, Nhật Bình đen';
    dyeList = [TRADITIONAL_DYES['do-son'], TRADITIONAL_DYES['xanh-cham'], TRADITIONAL_DYES['cu-den']];
    descriptionVi = 'Độ tương phản cao giữa màu da và tóc đen tuyền. Trang phục sắc nét như Đỏ Ruby anh đào, Đen tuyền Lãnh Mỹ A hoặc Nhật Bình thêu kim tuyến sẽ bừng sáng đầy quyền lực.';
    descriptionEn = 'High-contrast striking cool undertone. Shines powerfully in ruby crimson, pitch-black silk, and jewel-toned royal tunics.';
  } else {
    seasonKey = 'autumn';
    season = 'Mùa Thu (Autumn - Warm)';
    skinToneDesc = 'Da ngăm ấm / vàng olive (Warm Undertone)';
    paletteSuggestions = 'Cam đất, Đỏ tía Burgundy, Vàng mù tạt, Xanh rêu Olive';
    recommendedCostume = 'Áo Tấc bánh quy cam, Nhật Bình gấm Vọng Nguyệt đỏ trầm, Giao Lĩnh the vàng đất';
    dyeList = [TRADITIONAL_DYES['nau-gu'], TRADITIONAL_DYES['hoang-yen'], TRADITIONAL_DYES['cu-den']];
    descriptionVi = 'Nền da ngăm ấm hoặc vàng olive tự nhiên (phổ biến nhất tại Việt Nam). Rất tôn sắc vóc khi diện tông Cam đất, Đỏ tía Burgundy, Vàng mù tạt, hoặc Xanh rêu Olive.';
    descriptionEn = 'Golden olive honey complexion. Superbly complemented by terracotta, burgundy, mustard amber, and olive green hues.';
  }

  let bodyAdviceVi = '';
  let bodyAdviceEn = '';
  if (bodyShape === 'pear') {
    bodyAdviceVi = 'Dáng Quả Lê: Thân trên thon gọn, hông nở. Khuyên dùng Áo Tấc tay thụng rộng hoặc Áo Giao Lĩnh cổ chữ V để mở rộng khung vai, cân bằng thị giác hoàn hảo với tà áo buông rủ.';
    bodyAdviceEn = 'Pear Shape: Slender shoulders, wider hips. Wide-sleeved Ao Tac or V-neck Giao Linh naturally expands upper proportions for editorial balance.';
  } else if (bodyShape === 'hourglass') {
    bodyAdviceVi = 'Dáng Đồng Hồ Cát: Tỷ lệ ba vòng chuẩn mực. Phù hợp hoàn hảo với Áo Ngũ Thân tay chẽn vuốt nhẹ eo hoặc Áo Bà Ba lụa bóng để tôn vinh đường cong tự nhiên mà vẫn giữ trọn nét kín đáo quý phái.';
    bodyAdviceEn = 'Hourglass Shape: Balanced proportions. Narrow-sleeved Ngu Than or tailored silk Ao Ba Ba highlights feminine contours with dignified elegance.';
  } else if (bodyShape === 'inverted-triangle') {
    bodyAdviceVi = 'Dáng Tam Giác Ngược: Khung vai ngang rộng, hông hẹp. Áo Nhật Bình tà suông chữ A kết hợp cùng chân váy thường dài xếp ly giúp làm mềm bờ vai và tạo độ phồng cân xứng.';
    bodyAdviceEn = 'Inverted Triangle: Broader shoulders, slim hips. A-line Nhat Binh robes paired with sweeping lower skirts soften the upper frame gracefully.';
  } else {
    bodyAdviceVi = 'Dáng Thước Kẻ: Thân hình thanh mảnh. Nên áp dụng phối đồ nhiều tầng lớp (Layering) với Áo lót trắng đơn y bên trong, khoác ngoài Áo Ngũ Thân gấm tơ dày dặn để tạo sự oai phong, bề thế.';
    bodyAdviceEn = 'Rectangle Shape: Slender straight frame. Multi-layering with crisp inner tunics and textured brocade coats adds majestic volume and regal presence.';
  }

  const hM = (parseFloat(height as string) || 165) / 100;
  const wKg = parseFloat(weight as string) || 55;
  const bmi = (wKg / (hM * hM)).toFixed(1);

  let contextLookbook = {
    outfitTitle: 'Áo Ngũ Thân Phối Quần Thụng Lụa Trắng',
    outfitDesc: 'Bộ phối cổ phục chuẩn mực thanh lịch, phù hợp cho mọi không gian văn hóa.',
    hairStyle: 'Búi tóc cao vấn khăn chữ Nhân hoặc trâm cài ngọc',
    makeupStyle: 'Lớp nền trong suốt bắt sáng, son đỏ chu sa nền nã',
    accessories: ['Kiềng bạc hoa mai', 'Nón lá truyền thống', 'Túi cối thủ công / Quạt xếp', 'Guốc mộc quai nhung'],
    youtubeGuides: [
      {
        title: 'Hướng dẫn vấn khăn & búi tóc cổ phục',
        url: 'https://www.youtube.com/watch?v=HHTXi9DvhAg',
        duration: '5:20'
      },
      {
        title: 'Trang điểm phong cách hoài cổ Indochine',
        url: 'https://www.youtube.com/watch?v=FBcvPdh4XoM',
        duration: '7:45'
      }
    ]
  };

  const isCold = weather === 'cold-18' || weather === 'cold' || weather === 'winter';
  const isSacred = destination === 'chua-den' || destination === 'hoang-thanh' || destination === 'van-mieu';
  
  if (isCold) {
    if (isSacred) {
      contextLookbook.outfitTitle = 'Áo Giao Lĩnh The Dày & Đối Khâm Gấm Nhũ Lót Lụa';
      contextLookbook.outfitDesc = 'Lookbook giữ ấm trang trọng tại không gian di tích cổ kính. Tầng lớp vải dày dặn giúp tạo phom dáng bề thế, tôn nghiêm.';
      contextLookbook.hairStyle = 'Búi tóc cao vấn khăn nhung đen chữ Nhân, cố định bằng trâm bạc';
      contextLookbook.makeupStyle = 'Tông makeup ấm áp (Autumn Warm), đánh má hồng đất nhẹ, son đỏ trầm';
      contextLookbook.accessories = ['Kiềng bạc bản lớn', 'Khăn choàng lụa tơ tằm', 'Nón quai thao / Nón lá', 'Guốc mộc đế cao'];
    } else {
      contextLookbook.outfitTitle = 'Áo Tấc Gấm Hoa & Khăn Vấn Nhung Dạo Phố';
      contextLookbook.outfitDesc = 'Sự kết hợp giữa nét cổ điển quý phái và phong cách street-style hiện đại ấm áp, nổi bật tại quán cà phê hay phố cổ.';
      contextLookbook.hairStyle = 'Tóc tết buông lơi tự nhiên kết hợp băng đô vải lụa hoặc kẹp ngọc';
      contextLookbook.makeupStyle = 'Makeup căng bóng trong veo, má hồng đào phớt nhẹ, son bóng cam gạch';
      contextLookbook.accessories = ['Túi cối vintage đan tay', 'Kiềng bạc mảnh', 'Khăn lụa giữ ấm', 'Guốc mộc quai nhung đỏ'];
    }
  } else {
    if (isSacred) {
      contextLookbook.outfitTitle = 'Áo Ngũ Thân Tay Chẽn Tơ Xước Thoáng Khí & Quần Lụa Trắng';
      contextLookbook.outfitDesc = 'Chất liệu tơ xước và sa mỏng nhẹ giúp thoáng mát dưới nắng hè nhưng vẫn bảo đảm 100% sự kín đáo, thành kính tại chốn tôn nghiêm.';
      contextLookbook.hairStyle = 'Tóc vấn gọn gàng cài trâm ngọc bích tinh xảo';
      contextLookbook.makeupStyle = 'Lớp nền kiềm dầu mỏng nhẹ tự nhiên, son đỏ cam tươi tắn';
      contextLookbook.accessories = ['Nón bài thơ / Nón lá mộc', 'Quạt xếp lụa thêu tay', 'Kiềng bạc', 'Guốc mộc quai da'];
    } else {
      contextLookbook.outfitTitle = 'Áo Ngũ Thân Tay Chẽn Tone Sáng & Quần Suông Dạo Phố';
      contextLookbook.outfitDesc = 'Phối đồ mùa hè năng động cho Gen Z: Áo ngũ thân tơ màu Mint/Hồng pastel kết hợp quần suông lụa, thoải mái check-in cà phê và dạo phố.';
      contextLookbook.hairStyle = 'Tóc xõa tự nhiên uốn lọn nhẹ hoặc buộc nửa đầu nữ tính';
      contextLookbook.makeupStyle = 'Phong cách "Clean Girl" tôn da mộc tự nhiên, son màu san hô';
      contextLookbook.accessories = ['Túi cối thủ công mộc mạc', 'Quạt xếp giấy dó', 'Kính râm retro', 'Guốc mộc trẻ trung'];
    }
  }

  const { score, guardrails } = evaluateGuardrails({ costumeId, bottomChoice, collarChoice, destination, colorHex });

  return {
    season,
    seasonKey,
    skinToneDesc,
    paletteSuggestions,
    recommendedCostume,
    dyeList,
    descriptionVi,
    descriptionEn,
    bodyAdviceVi,
    bodyAdviceEn,
    bmi,
    score,
    guardrails,
    contextLookbook
  };
}
