// heritageLogic.js - Core Algorithms, Guardrails, Web Audio, Storage, and AI Engine
import { COSTUMES_DATA } from './costumes.js';

// --- 1. WEB AUDIO SYNTHESIZER: VIETNAMESE TRADITIONAL PENTATONIC AMBIENT ---
class HeritageAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timerId = null;
    // Vietnamese Bac & Nam Pentatonic Scale: C4, D4, F4, G4, A4, C5, D5, F5
    this.scale = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46];
    this.melody = [0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 4, 2, 3, 4, 1, 2];
    this.step = 0;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playPluck(freq) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Dan Tranh simulated overtone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope: quick attack, plucked decay with traditional shimmer
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }

  toggle(onStateChange) {
    this.init();
    if (this.isPlaying) {
      clearInterval(this.timerId);
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.timerId = setInterval(() => {
        const noteIdx = this.melody[this.step % this.melody.length];
        const freq = this.scale[noteIdx];
        this.playPluck(freq);
        this.step++;
      }, 480);
    }
    if (onStateChange) onStateChange(this.isPlaying);
    return this.isPlaying;
  }
}

export const heritageAudio = new HeritageAudioPlayer();

// --- 2. PERSONAL COLOR & TRADITIONAL DYES ENGINE ---
export const TRADITIONAL_DYES = {
  'cu-den': { nameVi: 'Màu Củ Dền', nameEn: 'Beetroot Crimson', hex: '#8B1E3F', descVi: 'Sắc đỏ tía sâu thẳm từ củ dền tự nhiên, tôn vinh khí chất quý phái.' },
  'xanh-cham': { nameVi: 'Xanh Chàm', nameEn: 'Indigo Blue', hex: '#1C3144', descVi: 'Chiết xuất từ lá chàm miền sơn cước, biểu trưng cho sự trầm tĩnh, nội lực.' },
  'do-son': { nameVi: 'Đỏ Son', nameEn: 'Vermilion Red', hex: '#9E1B1B', descVi: 'Màu chu sa may mắn, quyền quý của phẩm phục cung đình và hỷ sự.' },
  'hoang-yen': { nameVi: 'Vàng Hoàng Yến', nameEn: 'Imperial Canary Gold', hex: '#D4AF37', descVi: 'Màu ánh kim của hoa mai và tơ hoàng yến, thanh nhã và vương giả.' },
  'xanh-com': { nameVi: 'Xanh Hương Cốm', nameEn: 'Young Rice Mint', hex: '#6B8E23', descVi: 'Sắc xanh dịu mát của lúa non Hà thành, tôn da sáng trẻ trung.' },
  'nau-gu': { nameVi: 'Nâu Củ Nâu / Nâu Gụ', nameEn: 'Natural Yam Brown', hex: '#6B4226', descVi: 'Nhuộm từ củ nâu cổ truyền, bền bỉ, mộc mạc và phong thái hoài niệm.' }
};

export function analyzePersonalColor({ undertoneChoice, height, weight, bodyShape, destination, weather, costumeId, bottomChoice, collarChoice, colorHex }) {
  // Deterministic 4-season personal color logic for Asian skin tones
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
    // Default Autumn
    seasonKey = 'autumn';
    season = 'Mùa Thu (Autumn - Warm)';
    skinToneDesc = 'Da ngăm ấm / vàng olive (Warm Undertone)';
    paletteSuggestions = 'Cam đất, Đỏ tía Burgundy, Vàng mù tạt, Xanh rêu Olive';
    recommendedCostume = 'Áo Tấc bánh quy cam, Nhật Bình gấm Vọng Nguyệt đỏ trầm, Giao Lĩnh the vàng đất';
    dyeList = [TRADITIONAL_DYES['nau-gu'], TRADITIONAL_DYES['hoang-yen'], TRADITIONAL_DYES['cu-den']];
    descriptionVi = 'Nền da ngăm ấm hoặc vàng olive tự nhiên (phổ biến nhất tại Việt Nam). Rất tôn sắc vóc khi diện tông Cam đất, Đỏ tía Burgundy, Vàng mù tạt, hoặc Xanh rêu Olive.';
    descriptionEn = 'Golden olive honey complexion. Superbly complemented by terracotta, burgundy, mustard amber, and olive green hues.';
  }

  // Body shape advice
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

  // BMI Check
  const hM = (parseFloat(height) || 165) / 100;
  const wKg = parseFloat(weight) || 55;
  const bmi = (wKg / (hM * hM)).toFixed(1);

  // --- CONTEXTUAL LOOKBOOK RECOMMENDATIONS (Destination + Weather) ---
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
  const isStreet = destination === 'cafe' || destination === 'hoi-an' || destination === 'prom';

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
    // Warm / Summer
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

  // --- 3. CULTURAL GUARDRAIL EVALUATION ---
  const guardrails = [];
  let score = 98; // Base high respect score

  // Rule 1: ERR_NGU_THAN_SHORT
  // Trigger if paired with shorts/miniskirt
  if ((costumeId === 'ngu-than' || costumeId === 'ao-tac' || costumeId === 'nhat-binh' || costumeId === 'giao-linh' || costumeId === 'ao-dai') && bottomChoice === 'short') {
    score -= 45;
    guardrails.push({
      code: 'ERR_NGU_THAN_SHORT',
      severity: 'error',
      titleVi: '⚠️ Cảnh báo: Áo Dài & Cổ phục truyền thống biểu trưng cho sự kín đáo, đoan trang. Phối với quần ngắn/váy ngắn phá vỡ triết lý văn hóa. Vui lòng chọn quần lụa dài qua mắt cá chân.',
      titleEn: '⚠️ Cultural Breach: Broken Decorum with Short Bottoms',
      messageVi: '⚠️ Cảnh báo: Áo Dài & Cổ phục truyền thống biểu trưng cho sự kín đáo, đoan trang. Phối với quần ngắn/váy ngắn phá vỡ triết lý văn hóa. Vui lòng chọn quần lụa dài qua mắt cá chân.',
      messageEn: 'Warning: The Ao Dai and traditional robes represent modesty and cultural decorum. Pairing with miniskirts/shorts violates decorum. Please select full-length silk trousers.'
    });
  }

  // Rule 2: ERR_GIAO_LINH_TA
  // Trigger if collar is folded left-under-right (Tả Nhậm)
  if (costumeId === 'giao-linh' && collarChoice === 'ta-nham') {
    score -= 40;
    guardrails.push({
      code: 'ERR_GIAO_LINH_TA',
      severity: 'error',
      titleVi: '⚠️ Lỗi sai nguyên tắc: Vạt Tả Nhậm chỉ dành cho người đã khuất. Trang phục Việt luôn tuân thủ Hữu Nhậm (vạt trái đè lên vạt phải).',
      titleEn: '⚠️ Critical Rule Breach: Ta Nham Lapel',
      messageVi: '⚠️ Lỗi sai nguyên tắc: Vạt Tả Nhậm chỉ dành cho người đã khuất. Trang phục Việt luôn tuân thủ Hữu Nhậm (vạt trái đè lên vạt phải).',
      messageEn: 'Critical Rule Error: Crossing right-over-left (Ta Nham) was reserved exclusively for funerary garments. Vietnamese tradition mandates left-over-right (Huu Nham).'
    });
  }

  // Rule 3: ERR_LOCATION_RESPECT
  // Sacred site (Chùa/Đền/Lăng) + revealing outfit
  if ((destination === 'chua-den' || destination === 'hoang-thanh' || destination === 'van-mieu') && bottomChoice === 'short') {
    score -= 30;
    guardrails.push({
      code: 'ERR_LOCATION_RESPECT',
      severity: 'error',
      titleVi: '⚠️ Lưu ý tôn nghiêm: Vui lòng chọn trang phục kín đáo như Áo Tấc hoặc Ngũ Thân tay chẽn khi đến di tích thờ cúng.',
      titleEn: '⚠️ Sanctuary Etiquette Warning',
      messageVi: '⚠️ Lưu ý tôn nghiêm: Vui lòng chọn trang phục kín đáo như Áo Tấc hoặc Ngũ Thân tay chẽn khi đến di tích thờ cúng.',
      messageEn: 'Sanctuary Etiquette Note: Please select dignified, fully covered attire such as Ao Tac or formal Ngu Than when visiting sacred worship sites.'
    });
  }

  // Rule 4: WARN_ROYAL_YELLOW
  // If Áo Nhật Bình Vàng Chính Sắc
  if (costumeId === 'nhat-binh' && (colorHex === '#D4AF37' || colorHex === 'yellow' || colorHex === '#FFD700')) {
    score -= 5;
    guardrails.push({
      code: 'WARN_ROYAL_YELLOW',
      severity: 'warning',
      titleVi: '💡 Lưu ý lịch sử: Sắc Vàng Chính Sắc từng là phẩm phục độc quyền của Hoàng Hậu triều Nguyễn.',
      titleEn: '💡 Imperial Decree: Royal Yellow Distinction',
      messageVi: '💡 Lưu ý lịch sử: Sắc Vàng Chính Sắc từng là phẩm phục độc quyền của Hoàng Hậu triều Nguyễn.',
      messageEn: 'Imperial History Note: Pure Yellow on Nhat Binh robes was strictly reserved for the Empress and Queen Mother of the Nguyen Dynasty.'
    });
  }

  score = Math.max(10, Math.min(100, score));

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

// --- 4. LOCAL STORAGE: COMMUNITY MUSEUM & WARDROBE ---
const COMMUNITY_KEY = 'vheritage_community_v1';
const WARDROBE_KEY = 'vheritage_wardrobe_v1';
const USER_KEY = 'vheritage_current_user_v1';

export const storageHelper = {
  getCommunityLooks() {
    const data = localStorage.getItem(COMMUNITY_KEY);
    if (!data) {
      // Seed initial high-fashion editorial looks
      const initial = [
        {
          id: 'look-seed-1',
          author: 'Trần Thục Uyên (Gen Z Huế)',
          titleVi: 'Hoàng Cung Trầm Mặc - Nhật Bình Viva Magenta',
          titleEn: 'Silent Citadel - Imperial Magenta Nhat Binh',
          costumeId: 'nhat-binh',
          costumeName: 'Áo Nhật Bình',
          destination: 'Cố đô Huế',
          score: 96,
          likes: 142,
          date: 'Hôm nay',
          photoUrl: '',
          accentHex: '#9E1B1B',
          tags: ['#HueCitadel', '#RoyalHighFashion', '#NhatBinh']
        },
        {
          id: 'look-seed-2',
          author: 'Lê Hoàng Nam (Đại học Quốc gia Hà Nội)',
          titleVi: 'Sĩ Tử Kinh Kỳ - Áo Ngũ Thân Tay Chẽn Xanh Chàm',
          titleEn: 'Capital Scholar - Indigo Narrow-Sleeve Ngu Than',
          costumeId: 'ngu-than',
          costumeName: 'Áo Ngũ Thân Tay Chẽn',
          destination: 'Hoàng Thành Thăng Long',
          score: 100,
          likes: 219,
          date: 'Hôm qua',
          photoUrl: '',
          accentHex: '#1C3144',
          tags: ['#HoangThanhThangLong', '#NguThan1744', '#CleanTailoring']
        },
        {
          id: 'look-seed-3',
          author: 'Nguyễn Mai Chi (Fashion Designer)',
          titleVi: 'Kinh Bắc Phong Vân - Giao Lĩnh Hữu Nhậm Tơ Đũi',
          titleEn: 'Kinh Bac Breezes - Cross-Collar Giao Linh',
          costumeId: 'giao-linh',
          costumeName: 'Áo Giao Lĩnh',
          destination: 'Phố cổ Hội An',
          score: 98,
          likes: 185,
          date: '3 ngày trước',
          photoUrl: '',
          accentHex: '#3F5E4D',
          tags: ['#GiaoLinh', '#HuuNham', '#HoiAnVibes']
        },
        {
          id: 'look-seed-4',
          author: 'Trần Thảo My (Gen Z Content Creator)',
          titleVi: 'Hương Sen Đất Việt - Áo Dài Lụa Trắng Hà Đông',
          titleEn: 'Lotus Bloom - Pristine White Silk Ao Dai',
          costumeId: 'ao-dai',
          costumeName: 'Áo Dài Truyền Thống',
          destination: 'Bảo tàng Áo Dài TP. Hồ Chí Minh',
          score: 100,
          likes: 342,
          date: 'Vừa xong',
          photoUrl: '',
          accentHex: '#DB2777',
          tags: ['#AoDaiVietNam', '#LuaHaDong', '#QuocPhucViet']
        }
      ];
      localStorage.setItem(COMMUNITY_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveCommunityLook(look) {
    const list = this.getCommunityLooks();
    list.unshift(look);
    localStorage.setItem(COMMUNITY_KEY, JSON.stringify(list));
    return list;
  },

  likeCommunityLook(id) {
    const list = this.getCommunityLooks();
    const target = list.find(item => item.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      localStorage.setItem(COMMUNITY_KEY, JSON.stringify(list));
    }
    return list;
  },

  getWardrobe() {
    const data = localStorage.getItem(WARDROBE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveToWardrobe(item) {
    const list = this.getWardrobe();
    list.unshift(item);
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(list));
    return list;
  },

  removeFromWardrobe(id) {
    const list = this.getWardrobe().filter(item => item.id !== id);
    localStorage.setItem(WARDROBE_KEY, JSON.stringify(list));
    return list;
  },

  getUser() {
    const data = localStorage.getItem(USER_KEY);
    if (!data) {
      return {
        isLoggedIn: false,
        name: 'Khách Di Sản (Guest)',
        email: 'khach@vietheritage.vn'
      };
    }
    try {
      return JSON.parse(data);
    } catch {
      return { isLoggedIn: false, name: 'Guest', email: '' };
    }
  },

  setUser(userObj) {
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    return userObj;
  }
};

// --- 5. GEMINI LIVE CULTURAL STYLIST ENGINE ---
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
