import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Download, Bookmark, Share2, RotateCcw, Copy, Check, Trash2, Heart } from 'lucide-react';

export interface SpreadCommunityHubProps {
  lang?: 'vi' | 'en';
}

interface FrameItem {
  id: string;
  group: 'culture' | 'seasons' | 'places';
  name: string;
  context: string;
  desc: string;
  hashtags: string[];
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, u: number, text: string) => void;
}

interface PlatformItem {
  id: string;
  name: string;
  ratio: string;
  width: number;
  height: number;
  peakTime: string;
}

interface EmotionItem {
  id: string;
  name: string;
  emoji: string;
  templates: string[];
  hashtags: string[];
}

interface LookbookItem {
  id: string;
  name: string;
  thumbUrl: string;
  sourcePhoto: string;
  frameId: string;
  platformId: string;
  platformName: string;
  emotionId: string;
  emotionName: string;
  filter: string;
  zoom: number;
  panX: number;
  panY: number;
  customPlaqueText: string;
  customContext: string;
  date: string;
}

// Ham ve tam bien chu bo tron o canh duoi
function drawPlaque(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, text: string, bgColor: string, textColor: string, borderColor: string) {
  if (!text) return;
  ctx.save();
  const fontSize = Math.max(16, Math.round(28 * u));
  ctx.font = `600 ${fontSize}px 'Be Vietnam Pro', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const metrics = ctx.measureText(text);
  const paddingX = 26 * u;
  const plaqueW = Math.min(w * 0.75, metrics.width + paddingX * 2);
  const plaqueH = fontSize + 22 * u;
  const x = (w - plaqueW) / 2;
  const y = h - plaqueH - 24 * u;
  const radius = 12 * u;

  ctx.beginPath();
  ctx.roundRect(x, y, plaqueW, plaqueH, radius);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.lineWidth = 2 * u;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.fillText(text, w / 2, y + plaqueH / 2 + 1 * u);
  ctx.restore();
}

// 11 Khung ảnh truyền thống vẽ bằng Canvas 2D
const FRAMES_CONFIG: FrameItem[] = [
  {
    id: 'tet-nguyen-dan',
    group: 'culture',
    name: 'Tết Nguyên Đán',
    context: 'dịp Tết cổ truyền sum vầy',
    desc: 'Sắc đỏ may mắn hòa cùng hoa mai vàng rạng rỡ đón xuân sang.',
    hashtags: ['#TetNguyenDan', '#XuanVietNam', '#TetSumVay', '#CoPhucViet'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 34 * u;
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4 * u;
      ctx.strokeRect(borderW + 6 * u, borderW + 6 * u, w - (borderW + 6 * u) * 2, h - (borderW + 6 * u) * 2);

      const drawMai = (cx: number, cy: number, r: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < 5; i++) {
          ctx.rotate((Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -r * 0.6, r * 0.45, r * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#F4C430';
          ctx.fill();
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 1.5 * u;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#8B0000';
        ctx.fill();
        ctx.restore();
      };
      drawMai(60 * u, 60 * u, 32 * u);
      drawMai(w - 60 * u, 60 * u, 32 * u);
      drawMai(60 * u, h - 60 * u, 32 * u);
      drawMai(w - 60 * u, h - 60 * u, 32 * u);

      drawPlaque(ctx, w, h, u, text || 'Tết Nguyên Đán', '#8B0000', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'sen-viet',
    group: 'culture',
    name: 'Sen Việt',
    context: 'không gian thanh tịnh của hoa sen',
    desc: 'Nét đẹp thuần khiết, thanh cao vươn lên từ bùn lầy của quốc hoa.',
    hashtags: ['#SenViet', '#QuocHoa', '#ThanhTinh', '#NetDepViet'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 28 * u;
      ctx.strokeStyle = '#14907C';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.strokeStyle = '#F8D7DA';
      ctx.lineWidth = 3 * u;
      ctx.strokeRect(borderW + 5 * u, borderW + 5 * u, w - (borderW + 5 * u) * 2, h - (borderW + 5 * u) * 2);

      const drawLotus = (cx: number, cy: number, s: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        ctx.ellipse(-15 * s, 10 * s, 35 * s, 18 * s, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#2A7B5E';
        ctx.fill();

        ctx.fillStyle = '#E88B9E';
        ctx.beginPath();
        ctx.ellipse(0, 0, 14 * s, 32 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#F3A4B5';
        ctx.beginPath();
        ctx.ellipse(-12 * s, 6 * s, 12 * s, 28 * s, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(12 * s, 6 * s, 12 * s, 28 * s, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawLotus(80 * u, h - 80 * u, 1.2 * u);
      drawLotus(w - 80 * u, 70 * u, 1.0 * u);

      drawPlaque(ctx, w, h, u, text || 'Sen Việt', '#14907C', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'trong-dong',
    group: 'culture',
    name: 'Trống Đồng',
    context: 'hào khí ngàn năm văn hiến Lạc Hồng',
    desc: 'Họa tiết hình học kỷ hà và vòng tròn đồng tâm gợi nhắc cội nguồn văn hóa Đông Sơn.',
    hashtags: ['#TrongDong', '#DongSon', '#HaoKhiVietNam', '#DiSanVanHoa'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 32 * u;
      ctx.strokeStyle = '#8C6225';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3 * u;
      ctx.strokeRect(borderW + 6 * u, borderW + 6 * u, w - (borderW + 6 * u) * 2, h - (borderW + 6 * u) * 2);

      const drawCircles = (cx: number, cy: number, maxR: number) => {
        ctx.save();
        ctx.strokeStyle = '#D4AF37';
        for (let r = 12 * u; r <= maxR; r += 12 * u) {
          ctx.lineWidth = 2 * u;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(cx, cy, 6 * u, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCircles(50 * u, 50 * u, 48 * u);
      drawCircles(w - 50 * u, 50 * u, 48 * u);
      drawCircles(50 * u, h - 50 * u, 48 * u);
      drawCircles(w - 50 * u, h - 50 * u, 48 * u);

      drawPlaque(ctx, w, h, u, text || 'Hồn Trống Đồng', '#8C6225', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'xuan-hoa-dao',
    group: 'seasons',
    name: 'Xuân Hoa Đào',
    context: 'những ngày đầu xuân ấm áp',
    desc: 'Sắc hoa đào thắm tươi mang theo lời chúc an khang và khởi sắc.',
    hashtags: ['#XuanHoaDao', '#DaoPhai', '#DuXuan', '#NhungNgayDauXuan'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 26 * u;
      ctx.strokeStyle = '#D47385';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.strokeStyle = '#5A3825';
      ctx.lineWidth = 4 * u;
      ctx.beginPath();
      ctx.moveTo(borderW, 120 * u);
      ctx.quadraticCurveTo(100 * u, 80 * u, 160 * u, 40 * u);
      ctx.stroke();

      const drawPeachFlower = (cx: number, cy: number, r: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < 5; i++) {
          ctx.rotate((Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -r * 0.6, r * 0.45, r * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#FF9EAF';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#8B0000';
        ctx.fill();
        ctx.restore();
      };
      drawPeachFlower(70 * u, 100 * u, 24 * u);
      drawPeachFlower(120 * u, 65 * u, 20 * u);
      drawPeachFlower(165 * u, 42 * u, 16 * u);
      drawPeachFlower(w - 70 * u, h - 90 * u, 18 * u);

      drawPlaque(ctx, w, h, u, text || 'Xuân Hoa Đào', '#8B0000', '#FFFFFF', '#FFD1DC');
    }
  },
  {
    id: 'ha-nang-bien',
    group: 'seasons',
    name: 'Hạ Nắng Biển',
    context: 'mùa hè đầy nắng gió biển xanh',
    desc: 'Khúc ca rộn rã của sóng biển dạt dào và ánh dương rạng ngời.',
    hashtags: ['#HaNangBien', '#BienVietNam', '#MuaHeRucRo', '#NangVang'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 28 * u;
      ctx.strokeStyle = '#1D70B8';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(w - 70 * u, 70 * u, 36 * u, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(29, 112, 184, 0.45)';
      ctx.beginPath();
      ctx.moveTo(0, h - 50 * u);
      for (let x = 0; x <= w; x += 60 * u) {
        ctx.quadraticCurveTo(x + 30 * u, h - 75 * u, x + 60 * u, h - 50 * u);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      drawPlaque(ctx, w, h, u, text || 'Hạ Nắng Biển', '#1D70B8', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'thu-la-vang',
    group: 'seasons',
    name: 'Thu Lá Vàng',
    context: 'tiết trời mùa thu êm đềm',
    desc: 'Khoảnh khắc dịu êm với gió heo may và sắc lá vàng xao xuyến.',
    hashtags: ['#ThuLaVang', '#HeoMay', '#MuaThuHaNoi', '#ChutThuEmDem'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 26 * u;
      ctx.strokeStyle = '#B86A25';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      const drawLeaf = (cx: number, cy: number, rot: number, size: number, color: string) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.7, 0, 0, size);
        ctx.quadraticCurveTo(-size * 0.7, 0, 0, -size);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      };
      drawLeaf(65 * u, 80 * u, 0.4, 28 * u, '#E8A02A');
      drawLeaf(100 * u, 130 * u, -0.6, 22 * u, '#C2581A');
      drawLeaf(w - 70 * u, h - 90 * u, 0.9, 26 * u, '#D97A22');
      drawLeaf(w - 110 * u, h - 60 * u, -0.3, 20 * u, '#D4AF37');

      drawPlaque(ctx, w, h, u, text || 'Thu Dịu Êm', '#B86A25', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'dong-se-lanh',
    group: 'seasons',
    name: 'Đông Se Lạnh',
    context: 'những ngày đông miền Bắc se lạnh',
    desc: 'Hơi thở se lạnh và làn sương bạc ấm áp bên tách trà nóng.',
    hashtags: ['#DongSeLanh', '#GioMua', '#MuaDongVietNam', '#BinhYen'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 28 * u;
      ctx.strokeStyle = '#5B7A9C';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      const drawSnowflake = (cx: number, cy: number, r: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5 * u;
        for (let i = 0; i < 6; i++) {
          ctx.rotate(Math.PI / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.moveTo(-r * 0.3, -r * 0.6);
          ctx.lineTo(0, -r * 0.8);
          ctx.lineTo(r * 0.3, -r * 0.6);
          ctx.stroke();
        }
        ctx.restore();
      };
      drawSnowflake(60 * u, 60 * u, 24 * u);
      drawSnowflake(w - 60 * u, 60 * u, 24 * u);
      drawSnowflake(70 * u, h - 70 * u, 20 * u);
      drawSnowflake(w - 70 * u, h - 70 * u, 20 * u);

      drawPlaque(ctx, w, h, u, text || 'Đông Se Lạnh', '#3C5B7D', '#FFFFFF', '#D9E8F5');
    }
  },
  {
    id: 'hanoi-ho-guom',
    group: 'places',
    name: 'Hà Nội - Hồ Gươm',
    context: 'bên bờ Hồ Gươm cổ kính thủ đô',
    desc: 'Bóng Tháp Rùa trầm mặc nghiêng mình soi bóng làn nước biếc.',
    hashtags: ['#HaNoi', '#HoGuom', '#ThapRua', '#ThuDoHaNoi', '#PhoCo'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 30 * u;
      ctx.strokeStyle = '#16213A';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.strokeStyle = '#14907C';
      ctx.lineWidth = 2 * u;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(borderW + i * 20 * u, borderW);
        ctx.quadraticCurveTo(borderW + (i + 1) * 25 * u, borderW + 60 * u, borderW + i * 18 * u, borderW + 110 * u);
        ctx.stroke();
      }

      ctx.fillStyle = '#D4AF37';
      const bx = w - 120 * u, by = h - 100 * u;
      ctx.fillRect(bx, by + 30 * u, 55 * u, 30 * u);
      ctx.fillRect(bx + 10 * u, by + 12 * u, 35 * u, 18 * u);
      ctx.fillRect(bx + 18 * u, by, 18 * u, 12 * u);

      drawPlaque(ctx, w, h, u, text || 'Hà Nội - Hồ Gươm', '#16213A', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'vinh-ha-long',
    group: 'places',
    name: 'Vịnh Hạ Long',
    context: 'kỳ quan Vịnh Hạ Long ngút ngàn',
    desc: 'Những đảo đá vôi kỳ vĩ soi bóng làn nước biếc và cánh buồm no gió.',
    hashtags: ['#HaLongBay', '#KyQuanTheGioi', '#QuangNinh', '#VietNamDep'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 28 * u;
      ctx.strokeStyle = '#185A7D';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.fillStyle = '#2C495E';
      ctx.beginPath();
      ctx.moveTo(30 * u, h - 30 * u);
      ctx.lineTo(70 * u, h - 110 * u);
      ctx.lineTo(110 * u, h - 70 * u);
      ctx.lineTo(150 * u, h - 120 * u);
      ctx.lineTo(190 * u, h - 30 * u);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#8C4325';
      ctx.beginPath();
      ctx.moveTo(w - 70 * u, h - 45 * u);
      ctx.lineTo(w - 70 * u, h - 105 * u);
      ctx.lineTo(w - 40 * u, h - 55 * u);
      ctx.closePath();
      ctx.fill();

      drawPlaque(ctx, w, h, u, text || 'Vịnh Hạ Long', '#185A7D', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'hoi-an-pho-co',
    group: 'places',
    name: 'Phố Cổ Hội An',
    context: 'phố cổ Hội An rực rỡ sắc màu',
    desc: 'Ánh đèn lồng ấm áp soi rọi mái ngói rêu phong và dòng sông Hoài.',
    hashtags: ['#HoiAn', '#PhoCoHoiAn', '#DenLong', '#DiSanVanHoa'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 30 * u;
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      const drawLantern = (cx: number, cy: number, color: string, r: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.5 * u;
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.5);
        ctx.lineTo(0, -r);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.7, r, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#D4AF37';
        ctx.beginPath();
        ctx.moveTo(0, r);
        ctx.lineTo(0, r * 1.6);
        ctx.stroke();
        ctx.restore();
      };
      drawLantern(70 * u, 65 * u, '#D4AF37', 18 * u);
      drawLantern(115 * u, 55 * u, '#14907C', 15 * u);
      drawLantern(w - 70 * u, 65 * u, '#D4AF37', 18 * u);
      drawLantern(w - 115 * u, 55 * u, '#8B0000', 15 * u);

      drawPlaque(ctx, w, h, u, text || 'Phố Cổ Hội An', '#8B0000', '#FFFFFF', '#D4AF37');
    }
  },
  {
    id: 'sai-gon-len-den',
    group: 'places',
    name: 'Sài Gòn Lên Đèn',
    context: 'Sài Gòn hoa lệ rực rỡ ánh đèn',
    desc: 'Nhịp sống năng động vươn cao với đường chân trời lung linh.',
    hashtags: ['#SaiGon', '#Landmark81', '#SaiGonVeDem', '#ThanhPhoTre'],
    draw: (ctx, w, h, u, text) => {
      const borderW = 28 * u;
      ctx.strokeStyle = '#16213A';
      ctx.lineWidth = borderW;
      ctx.strokeRect(borderW / 2, borderW / 2, w - borderW, h - borderW);

      ctx.fillStyle = '#D4AF37';
      const lx = w - 100 * u;
      ctx.fillRect(lx, h - 160 * u, 18 * u, 130 * u);
      ctx.fillRect(lx + 4 * u, h - 180 * u, 10 * u, 20 * u);
      ctx.fillRect(lx + 7 * u, h - 200 * u, 4 * u, 20 * u);

      ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.fillRect(lx - 40 * u, h - 90 * u, 35 * u, 60 * u);
      ctx.fillRect(lx + 22 * u, h - 110 * u, 30 * u, 80 * u);

      drawPlaque(ctx, w, h, u, text || 'Sài Gòn Lên Đèn', '#16213A', '#FFFFFF', '#D4AF37');
    }
  }
];

const PLATFORMS_CONFIG: PlatformItem[] = [
  { id: 'instagram', name: 'Instagram', ratio: '4:5', width: 1080, height: 1350, peakTime: '11:30 - 13:30 và 19:00 - 21:00' },
  { id: 'tiktok', name: 'TikTok', ratio: '9:16', width: 1080, height: 1920, peakTime: '18:00 - 20:00 và 21:30 - 22:30' },
  { id: 'facebook', name: 'Facebook', ratio: '1:1', width: 1200, height: 1200, peakTime: '08:00 - 09:30 và 20:00 - 22:00' },
  { id: 'zalo', name: 'Zalo', ratio: '1:1', width: 1080, height: 1080, peakTime: '07:30 - 09:00 và 17:30 - 19:00' },
  { id: 'x', name: 'X (Twitter)', ratio: '16:9', width: 1600, height: 900, peakTime: '12:00 - 13:00 và 17:00 - 18:30' }
];

const EMOTIONS_CONFIG: EmotionItem[] = [
  {
    id: 'vui-ve',
    name: 'Vui vẻ',
    emoji: '😄',
    templates: [
      'Một ngày tràn đầy năng lượng tích cực tại {c}!',
      'Cười thật tươi vì thanh xuân luôn rạng rỡ cùng {c}.',
      'Những nụ cười đẹp nhất nở rộ khi được đắm mình vào {c}.'
    ],
    hashtags: ['#VuiVeMoiNgay', '#NangLuongTichCuc', '#NuCuoiRangRo']
  },
  {
    id: 'binh-yen',
    name: 'Bình yên',
    emoji: '🌿',
    templates: [
      'Tìm thấy chút thảnh thơi nhẹ nhõm giữa {c}.',
      'Lắng lại một nhịp để cảm nhận sự bình yên dịu dàng tại {c}.',
      'Không ồn ào vội vã, chỉ có sự an yên hiện hữu cùng {c}.'
    ],
    hashtags: ['#BinhYen', '#ThanhThoi', '#GocYenBinh', '#SlowLiving']
  },
  {
    id: 'hoai-niem',
    name: 'Hoài niệm',
    emoji: '🍂',
    templates: [
      'Có những kỷ niệm xưa cũ ùa về khi ngắm nhìn {c}.',
      'Thước phim quá khứ như sống động lại trong từng góc nhỏ của {c}.',
      'Gửi gắm chút hoài niệm dấu yêu vào không gian {c}.'
    ],
    hashtags: ['#HoaiNiem', '#KyUcXua', '#NhungNgayDaQua', '#RetroVibes']
  },
  {
    id: 'tu-hao',
    name: 'Tự hào',
    emoji: '🇻🇳',
    templates: [
      'Thêm yêu nét đẹp văn hóa ngàn năm và tự hào về {c}!',
      'Tự hào khoác lên mình bản sắc quê hương tại {c}.',
      'Dòng máu Lạc Hồng và tình yêu non sông sáng ngời cùng {c}.'
    ],
    hashtags: ['#TuHaoVietNam', '#BanSacDanToc', '#YeuVietNam', '#VanHoaViet']
  },
  {
    id: 'hao-hung',
    name: 'Hào hứng',
    emoji: '✨',
    templates: [
      'Chuyến hành trình rực lửa với biết bao trải nghiệm mới tại {c}!',
      'Khám phá những góc nhìn tuyệt vời không thể bỏ lỡ ở {c}.',
      'Năng lượng bùng nổ cho một ngày đáng nhớ cùng {c}!'
    ],
    hashtags: ['#HaoHung', '#KhamPha', '#TraiNghiemMoi', '#CheckinVietNam']
  },
  {
    id: 'biet-on',
    name: 'Biết ơn',
    emoji: '🙏',
    templates: [
      'Biết ơn vì mỗi sớm mai thức dậy lại được trân quý khoảnh khắc bên {c}.',
      'Cảm ơn cuộc đời vì những món quà giản dị và ấm áp tại {c}.',
      'Gửi lời tri ân chân thành đến những người đã cùng ta đồng hành qua {c}.'
    ],
    hashtags: ['#BietOn', '#TranQuy', '#CuocSongYeuThuong', '#GiaTriGianDi']
  },
  {
    id: 'lang-man',
    name: 'Lãng mạn',
    emoji: '💖',
    templates: [
      'Khoảnh khắc ngọt ngào tựa như bản tình ca bên {c}.',
      'Nắm tay nhau đi qua những dịu êm lãng mạn ở {c}.',
      'Một thoáng mộng mơ gửi trao trong sắc màu của {c}.'
    ],
    hashtags: ['#LangMan', '#NgotNgao', '#ChuyenTinhYeu', '#KhoanhKhacDep']
  }
];

const STORAGE_KEY = 'vheritage_lookbook_items';

export const SpreadCommunityHub: React.FC<SpreadCommunityHubProps> = () => {
  const [selectedFrameId, setSelectedFrameId] = useState('tet-nguyen-dan');
  const [selectedPlatformId, setSelectedPlatformId] = useState('instagram');
  const [selectedEmotionId, setSelectedEmotionId] = useState('vui-ve');
  const [activeGroup, setActiveGroup] = useState<'all' | 'culture' | 'seasons' | 'places'>('all');
  const [filter, setFilter] = useState('none');
  const [zoom, setZoom] = useState(1.0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [customPlaque, setCustomPlaque] = useState('');
  const [customContext, setCustomContext] = useState('');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>([]);
  const [toastMsg, setToastMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Doc Look book tu localStorage
  useEffect(() => {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setLookbookItems(JSON.parse(raw));
    } catch {
      // safe fallback
    }
  }, []);

  const showToast = (text: string, isError = false) => {
    setToastMsg({ text, isError });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const currentPlatform = PLATFORMS_CONFIG.find(p => p.id === selectedPlatformId) || PLATFORMS_CONFIG[0];
  const currentFrame = FRAMES_CONFIG.find(f => f.id === selectedFrameId) || FRAMES_CONFIG[0];
  const currentEmotion = EMOTIONS_CONFIG.find(e => e.id === selectedEmotionId) || EMOTIONS_CONFIG[0];

  // Render Canvas
  const drawMainCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== currentPlatform.width || canvas.height !== currentPlatform.height) {
      canvas.width = currentPlatform.width;
      canvas.height = currentPlatform.height;
    }

    const w = canvas.width;
    const h = canvas.height;
    const u = w / 1080;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#E7EDF0';
    ctx.fillRect(0, 0, w, h);

    if (userImage) {
      ctx.save();
      switch (filter) {
        case 'warm': ctx.filter = 'sepia(0.2) saturate(1.2) brightness(1.03)'; break;
        case 'cool': ctx.filter = 'hue-rotate(15deg) saturate(1.1) brightness(1.02)'; break;
        case 'film': ctx.filter = 'contrast(1.1) brightness(0.95) saturate(0.9) sepia(0.15)'; break;
        case 'bw': ctx.filter = 'grayscale(1) contrast(1.15)'; break;
        case 'vibrant': ctx.filter = 'saturate(1.5) contrast(1.08)'; break;
        default: ctx.filter = 'none';
      }

      const imgAspect = userImage.width / userImage.height;
      const canvasAspect = w / h;
      let baseW = w, baseH = h;
      if (imgAspect > canvasAspect) {
        baseH = h;
        baseW = h * imgAspect;
      } else {
        baseW = w;
        baseH = w / imgAspect;
      }

      const drawW = baseW * zoom;
      const drawH = baseH * zoom;
      const drawX = (w - drawW) / 2 + panX;
      const drawY = (h - drawH) / 2 + panY;

      ctx.drawImage(userImage, drawX, drawY, drawW, drawH);
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = '#64748B';
      ctx.font = `500 ${Math.round(24 * u)}px 'Be Vietnam Pro', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Bấm "Chọn ảnh từ máy" để bắt đầu đồng sáng tạo', w / 2, h / 2 - 10 * u);
      ctx.font = `400 ${Math.round(18 * u)}px 'Be Vietnam Pro', sans-serif`;
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Hỗ trợ kéo thả và định dạng ảnh JPG, PNG, WEBP', w / 2, h / 2 + 25 * u);
      ctx.restore();
    }

    const plaqueText = customPlaque.trim() || currentFrame.name;
    currentFrame.draw(ctx, w, h, u, plaqueText);
  }, [currentPlatform, currentFrame, userImage, filter, zoom, panX, panY, customPlaque]);

  useEffect(() => {
    drawMainCanvas();
  }, [drawMainCanvas]);

  // Pointer events kéo thả ảnh
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!userImage || !wrapperRef.current) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - panX, y: e.clientY - panY };
    wrapperRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setPanX(e.clientX - dragStartRef.current.x);
    setPanY(e.clientY - dragStartRef.current.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try { wrapperRef.current?.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  // Tải ảnh từ máy
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn tệp ảnh hợp lệ.', true);
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        setPanX(0);
        setPanY(0);
        setZoom(1.0);
        showToast('Đã tải ảnh lên thành công.');
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Xuất ảnh PNG
  const handleDownload = () => {
    if (!userImage || !canvasRef.current) {
      showToast('Vui lòng chọn ảnh trước khi tải về.', true);
      return;
    }
    const link = document.createElement('a');
    link.download = `vietnam-heritage-frame-${selectedFrameId}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    showToast('Đang tải ảnh xuống máy...');
  };

  // Lưu vào Look book
  const handleSaveLookbook = () => {
    if (!userImage || !canvasRef.current) {
      showToast('Vui lòng chọn ảnh trước khi lưu vào Look book.', true);
      return;
    }

    const canvas = canvasRef.current;
    const thumbCanvas = document.createElement('canvas');
    const thumbW = 320;
    const thumbH = Math.round(thumbW * (canvas.height / canvas.width));
    thumbCanvas.width = thumbW;
    thumbCanvas.height = thumbH;
    thumbCanvas.getContext('2d')?.drawImage(canvas, 0, 0, thumbW, thumbH);
    const thumbDataUrl = thumbCanvas.toDataURL('image/jpeg', 0.82);

    const srcCanvas = document.createElement('canvas');
    const maxDim = 720;
    let sW = userImage.width, sH = userImage.height;
    if (sW > maxDim || sH > maxDim) {
      if (sW > sH) { sH = Math.round((sH * maxDim) / sW); sW = maxDim; }
      else { sW = Math.round((sW * maxDim) / sH); sH = maxDim; }
    }
    srcCanvas.width = sW;
    srcCanvas.height = sH;
    srcCanvas.getContext('2d')?.drawImage(userImage, 0, 0, sW, sH);
    const srcDataUrl = srcCanvas.toDataURL('image/jpeg', 0.82);

    const newItem: LookbookItem = {
      id: 'lb_' + Date.now(),
      name: customPlaque.trim() || currentFrame.name,
      thumbUrl: thumbDataUrl,
      sourcePhoto: srcDataUrl,
      frameId: selectedFrameId,
      platformId: selectedPlatformId,
      platformName: currentPlatform.name,
      emotionId: selectedEmotionId,
      emotionName: currentEmotion.name,
      filter,
      zoom,
      panX,
      panY,
      customPlaqueText: customPlaque,
      customContext,
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    };

    const nextItems = [newItem, ...lookbookItems];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      setLookbookItems(nextItems);
      showToast('Đã lưu vào Look book thành công!');
    } catch {
      showToast('Bộ nhớ trình duyệt đã đầy. Vui lòng xóa bớt tác phẩm cũ.', true);
    }
  };

  // Khôi phục Look book item
  const handleRestoreLookbook = (item: LookbookItem) => {
    setSelectedFrameId(item.frameId);
    setSelectedPlatformId(item.platformId);
    setSelectedEmotionId(item.emotionId);
    setFilter(item.filter);
    setZoom(item.zoom);
    setPanX(item.panX);
    setPanY(item.panY);
    setCustomPlaque(item.customPlaqueText || '');
    setCustomContext(item.customContext || '');

    if (item.sourcePhoto) {
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        showToast(`Đã mở lại tác phẩm "${item.name}".`);
      };
      img.src = item.sourcePhoto;
    }
  };

  // Xóa Look book item
  const handleDeleteLookbook = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const nextItems = lookbookItems.filter(i => i.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      setLookbookItems(nextItems);
      showToast('Đã xóa tác phẩm khỏi Look book.');
    } catch {}
  };

  // Chia sẻ Web Share
  const handleShare = async () => {
    if (!userImage || !canvasRef.current) return;
    canvasRef.current.toBlob(async blob => {
      if (!blob) return;
      const file = new File([blob], 'vietnam-heritage-frame.png', { type: 'image/png' });
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Cộng đồng Lan Tỏa - VietHeritage Remix',
            text: getGeneratedCaption(),
            files: [file]
          });
          showToast('Đã chia sẻ thành công.');
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') showToast('Không thể chia sẻ tác phẩm.', true);
      }
    }, 'image/png');
  };

  // Sinh caption thông minh theo nền tảng
  const getGeneratedCaption = () => {
    const rawContext = customContext.trim() || currentFrame.context;
    const template = currentEmotion.templates[templateIdx % currentEmotion.templates.length];
    const opening = template.replace('{c}', rawContext);

    switch (currentPlatform.id) {
      case 'instagram': {
        const igTags = [...new Set([...currentFrame.hashtags, ...currentEmotion.hashtags, '#VietNam', '#CheckinVietNam', '#DiSanViet'])].slice(0, 10).join(' ');
        return `${opening}\n\n${currentFrame.desc}\n\nĐừng quên lưu lại bài viết để lan tỏa nét đẹp văn hóa nhé!\n.\n.\n.\n${igTags}`;
      }
      case 'tiktok': {
        const ttTags = [...new Set([...currentFrame.hashtags.slice(0, 2), ...currentEmotion.hashtags.slice(0, 1), '#fyp', '#xuhuong'])].join(' ');
        return `${opening} Xem đến cuối để cảm nhận trọn vẹn nhé! ✨ ${ttTags}`;
      }
      case 'facebook': {
        const fbTags = [...new Set([...currentFrame.hashtags.slice(0, 2), ...currentEmotion.hashtags.slice(0, 1)])].join(' ');
        return `${opening}\n\n${currentFrame.desc}\n\nBạn đã từng trải nghiệm khoảnh khắc tuyệt vời này chưa? Chia sẻ cùng mình nhé!\n\n${fbTags}`;
      }
      case 'zalo':
        return `${opening} Một chút bình dị mà ấm lòng gửi tặng cả nhà yêu thương!`;
      case 'x': {
        const xTags = `${currentFrame.hashtags[0]} ${currentEmotion.hashtags[0]}`;
        let xContent = `${opening} ${currentFrame.desc}`;
        if (xContent.length > 250) xContent = xContent.substring(0, 245) + '...';
        return `${xContent}\n\n${xTags}`;
      }
      default:
        return opening;
    }
  };

  const filteredFrames = FRAMES_CONFIG.filter(f => activeGroup === 'all' || f.group === activeGroup);

  return (
    <div className="space-y-8">
      {/* Header Banner Hub */}
      <div className="bg-gradient-to-r from-[#FAF7F2] via-white to-[#F5EFE6] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider">✦ HUB 3: CO-CREATION & SHARE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#14907C]/15 text-[#14907C] font-mono font-bold">MỚI</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222] mt-1">
              Cộng Đồng Lan Tỏa: Hub Đăng Ảnh Việt
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl font-sans">
              Gắn khung ảnh mang bản sắc Việt Nam, định dạng tỉ lệ chuẩn mạng xã hội và tạo caption thông minh để sẵn sàng chia sẻ di sản đến mọi người.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-medium text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Chọn ảnh từ máy</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Bố cục 3 cột chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CỘT 1: LOOK BOOK (3 cột desktop) */}
        <div className="lg:col-span-3 bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-serif font-bold text-sm text-[#222222] flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-[#8B0000]" />
              <span>Look book cá nhân</span>
            </h3>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {lookbookItems.length} ảnh
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
            {lookbookItems.length === 0 ? (
              <div className="col-span-2 text-center py-10 px-2 text-stone-400">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#8B0000]" />
                <p className="text-xs font-medium text-[#222222]">Chưa có tác phẩm</p>
                <p className="text-[11px] text-stone-500 mt-1">Gắn khung ảnh và bấm "Lưu vào Look book" để lưu giữ tại đây.</p>
              </div>
            ) : (
              lookbookItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleRestoreLookbook(item)}
                  className="group relative border border-stone-200 hover:border-[#8B0000] rounded-xl overflow-hidden bg-stone-50 cursor-pointer transition-all hover:shadow-xs"
                >
                  <img src={item.thumbUrl} alt={item.name} className="w-full aspect-square object-cover" />
                  <div className="p-1.5 text-[10px]">
                    <div className="font-bold text-[#222222] truncate">{item.name}</div>
                    <div className="flex justify-between text-stone-500 mt-0.5">
                      <span>{item.platformName}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={e => handleDeleteLookbook(e, item.id)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#8B0000]"
                    title="Xóa tác phẩm"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CỘT 2: KHU VỰC CANVAS & CÔNG CỤ (5 cột desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-4">
            
            {/* Canvas Stage */}
            <div className="bg-[#E7EDF0] border border-dashed border-stone-300 rounded-xl p-3 flex items-center justify-center min-h-[380px] overflow-hidden relative">
              <div
                ref={wrapperRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative touch-none cursor-grab active:cursor-grabbing max-w-full flex items-center justify-center select-none"
                title="Kéo ảnh để điều chỉnh vị trí"
              >
                <canvas
                  ref={canvasRef}
                  width={currentPlatform.width}
                  height={currentPlatform.height}
                  className="max-w-full max-h-[460px] h-auto w-auto rounded-lg shadow-md block"
                />
              </div>
            </div>

            {/* Các nút hành động chính */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-medium text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Tải về máy (PNG)</span>
              </button>
              <button
                type="button"
                onClick={handleSaveLookbook}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#D4AF37] text-[#222222] font-medium text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8B0000]"
              >
                <Heart className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Lưu vào Look book</span>
              </button>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3.5 py-2.5 rounded-xl bg-[#14907C] hover:bg-[#0E7363] text-white font-medium text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  title="Chia sẻ tác phẩm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bảng công cụ chỉnh ảnh */}
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="text-xs font-bold text-[#222222] font-mono">CÔNG CỤ CHỈNH ẢNH</span>
              <button
                type="button"
                onClick={() => { setPanX(0); setPanY(0); setZoom(1.0); }}
                className="text-[11px] text-stone-500 hover:text-[#8B0000] flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại vị trí</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Thu phóng ảnh: <span className="text-[#8B0000] font-mono">{zoom.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-[#8B0000] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Chữ trên khung (tấm biển)</label>
                <input
                  type="text"
                  maxLength={30}
                  value={customPlaque}
                  onChange={e => setCustomPlaque(e.target.value)}
                  placeholder={currentFrame.name}
                  className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            {/* Bộ lọc sắc màu */}
            <div>
              <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">Bộ lọc sắc màu</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'none', label: 'Gốc' },
                  { id: 'warm', label: 'Ấm áp' },
                  { id: 'cool', label: 'Thanh mát' },
                  { id: 'film', label: 'Phim cổ' },
                  { id: 'bw', label: 'Đen trắng' },
                  { id: 'vibrant', label: 'Rực rỡ' }
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      filter === f.id
                        ? 'bg-[#8B0000] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT 3: 4 BƯỚC TUẦN TỰ (4 cột desktop) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* BƯỚC 1: CHỌN KHUNG ẢNH */}
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                <span className="font-serif font-bold text-sm text-[#222222]">Chọn khung ảnh</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1">
                <Check className="w-2.5 h-2.5" />
                <span>Đã chọn</span>
              </span>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'culture', label: 'Văn hóa' },
                { id: 'seasons', label: 'Bốn mùa' },
                { id: 'places', label: 'Thắng cảnh' }
              ].map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGroup(g.id as any)}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono font-medium whitespace-nowrap cursor-pointer ${
                    activeGroup === g.id
                      ? 'bg-[#222222] text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 max-h-[170px] overflow-y-auto pr-1">
              {filteredFrames.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFrameId(f.id)}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedFrameId === f.id
                      ? 'border-[#8B0000] bg-red-50/50 ring-1 ring-[#8B0000]'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                  }`}
                >
                  <div className="w-full aspect-square rounded bg-white flex items-center justify-center text-xs font-serif font-bold text-[#8B0000] border border-stone-200">
                    {f.name.slice(0, 2)}
                  </div>
                  <div className="text-[10px] font-medium text-[#222222] mt-1 truncate">{f.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* BƯỚC 2: CHỌN NỀN TẢNG */}
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                <span className="font-serif font-bold text-sm text-[#222222]">Nền tảng đăng</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1">
                <Check className="w-2.5 h-2.5" />
                <span>{currentPlatform.ratio}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS_CONFIG.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatformId(p.id)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPlatformId === p.id
                      ? 'border-[#8B0000] bg-[#8B0000] text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-[#222222]'
                  }`}
                >
                  <div className="text-xs font-bold">{p.name}</div>
                  <div className={`text-[10px] font-mono ${selectedPlatformId === p.id ? 'text-amber-200' : 'text-stone-500'}`}>
                    {p.ratio} • {p.width}x{p.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* BƯỚC 3: CHỌN CẢM XÚC */}
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                <span className="font-serif font-bold text-sm text-[#222222]">Chọn cảm xúc</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1">
                <Check className="w-2.5 h-2.5" />
                <span>{currentEmotion.name}</span>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {EMOTIONS_CONFIG.map(emo => (
                <button
                  key={emo.id}
                  type="button"
                  onClick={() => { setSelectedEmotionId(emo.id); setTemplateIdx(0); }}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedEmotionId === emo.id
                      ? 'border-[#14907C] bg-emerald-50 text-[#14907C] font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-[#222222]'
                  }`}
                >
                  <div className="text-base">{emo.emoji}</div>
                  <div className="text-[10px] truncate">{emo.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* BƯỚC 4: CAPTION GỢI Ý */}
          <div className="bg-white/95 rounded-2xl border border-[#D4AF37]/30 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white text-[11px] font-bold flex items-center justify-center">4</span>
                <span className="font-serif font-bold text-sm text-[#222222]">Caption gợi ý</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                Tự động tạo
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Địa điểm hoặc dịp (tùy chọn)</label>
              <input
                type="text"
                value={customContext}
                onChange={e => setCustomContext(e.target.value)}
                placeholder="Ví dụ: Tết phố cổ, Chuyến du xuân..."
                className="w-full text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2.5">
              <p className="text-xs text-[#222222] whitespace-pre-wrap leading-relaxed max-h-[110px] overflow-y-auto">
                {getGeneratedCaption()}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-[11px]">
                <span className="text-[#8B0000] font-mono text-[10px] truncate max-w-[150px]">
                  Giờ vàng: {currentPlatform.peakTime.split(' và ')[0]}
                </span>
                <div className="flex space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setTemplateIdx(prev => prev + 1)}
                    className="px-2 py-1 rounded-md bg-white border border-stone-300 hover:border-stone-500 text-stone-700 text-[10px] font-medium cursor-pointer"
                  >
                    Đổi mẫu câu
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(getGeneratedCaption()).then(() => {
                        showToast('Đã sao chép caption vào clipboard!');
                      }).catch(() => {
                        showToast('Không thể sao chép tự động.', true);
                      });
                    }}
                    className="px-2.5 py-1 rounded-md bg-[#8B0000] text-white text-[10px] font-medium flex items-center space-x-1 cursor-pointer hover:bg-[#700000]"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Sao chép</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl shadow-lg bg-[#222222] text-white text-xs font-medium border-l-4 border-[#D4AF37] animate-fade-in">
          <span>{toastMsg.isError ? '⚠️' : '✓'}</span>
          <span>{toastMsg.text}</span>
        </div>
      )}
    </div>
  );
};
