import React, { useRef, useState } from 'react';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';

/**
 * Traditional dye swatch metadata for the photocard.
 */
export interface PhotocardDye {
  hex: string;
  nameVi: string;
  nameEn: string;
}

/**
 * Properties for PhotocardModal component.
 */
export interface PhotocardModalProps {
  isOpen: boolean;
  onClose: () => void;
  portraitUrl: string;
  costumeName: string;
  seasonText: string;
  dyes?: PhotocardDye[];
  score?: number;
  destination?: string;
  lang?: 'vi' | 'en';
}

/**
 * Editorial photocard generator rendering an Indochine High-Fashion Editorial Card with HTML5 Canvas export.
 */
export const PhotocardModal: React.FC<PhotocardModalProps> = ({
  isOpen,
  onClose,
  portraitUrl,
  costumeName,
  seasonText,
  dyes = [],
  score = 100,
  destination = 'Hoàng Thành Thăng Long',
  lang = 'vi'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const isEn = lang === 'en';

  const dialogRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    lockScroll: true,
    closeOnEscape: true
  });

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1800;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, 1200, 1800);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, 1128, 1728);

    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(52, 52, 1096, 1696);

    ctx.fillStyle = '#8B0000';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✦ VIETHERITAGE REMIX · SỨ GIẢ DI SẢN ✦', 600, 120);

    ctx.fillStyle = '#666666';
    ctx.font = '22px sans-serif';
    ctx.fillText('INDOCHINE HIGH-FASHION EDITORIAL ARCHIVE', 600, 160);

    const finishCanvas = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(100, 1230, 1000, 460);
      ctx.strokeStyle = '#E5E0D8';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, 1230, 1000, 460);

      ctx.fillStyle = '#8B0000';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('TRANG PHỤC DI SẢN / COSTUME', 140, 1280);

      ctx.fillStyle = '#1C1917';
      ctx.font = 'bold 44px serif';
      ctx.fillText(costumeName, 140, 1340);

      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(140, 1365, 920, 3);

      ctx.fillStyle = '#78716C';
      ctx.font = '24px sans-serif';
      ctx.fillText(`📍 Không Gian Di Sản: ${destination}`, 140, 1415);
      ctx.fillText(`🌸 Sắc Tố Cá Nhân: ${seasonText}`, 140, 1455);

      ctx.fillStyle = '#065F46';
      ctx.fillRect(140, 1490, 340, 48);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(`CULTURAL DECORUM: ${score}%`, 160, 1522);

      if (dyes && dyes.length > 0) {
        ctx.fillStyle = '#78716C';
        ctx.font = '20px monospace';
        ctx.fillText('BẢNG MÀU NHUỘM TỰ NHIÊN:', 520, 1515);

        dyes.slice(0, 3).forEach((dye, index) => {
          const x = 520 + index * 180;
          const y = 1550;
          ctx.beginPath();
          ctx.arc(x + 16, y + 16, 16, 0, Math.PI * 2);
          ctx.fillStyle = dye.hex;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = '#292524';
          ctx.font = '18px sans-serif';
          ctx.fillText(dye.nameVi, x + 42, y + 22);
        });
      }

      ctx.fillStyle = '#A8A29E';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('VIETHERITAGE REMIX © 1744 - 2026 · SỐ HÓA & BẢO TỒN CỔ PHỤC VIỆT', 600, 1735);

      try {
        const link = document.createElement('a');
        link.download = `vietheritage-envoy-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (e) {
        console.error('Failed to export canvas', e);
      } finally {
        setIsExporting(false);
      }
    };

    if (portraitUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(100, 200, 1000, 1000);
        ctx.clip();
        ctx.drawImage(img, 100, 200, 1000, 1000);
        ctx.restore();

        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 4;
        ctx.strokeRect(100, 200, 1000, 1000);

        finishCanvas();
      };
      img.onerror = () => {
        ctx.fillStyle = '#292524';
        ctx.fillRect(100, 200, 1000, 1000);
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText(costumeName, 600, 700);
        finishCanvas();
      };
      img.src = portraitUrl;
    } else {
      ctx.fillStyle = '#292524';
      ctx.fillRect(100, 200, 1000, 1000);
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.fillText(costumeName, 600, 700);
      finishCanvas();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photocard-modal-title"
        tabIndex={-1}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-[#D4AF37] shadow-2xl p-6 md:p-8 relative flex flex-col items-center outline-none"
        onClick={e => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-base flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
          aria-label={isEn ? "Close photocard" : "Đóng thẻ sứ giả di sản"}
        >
          ✕
        </button>

        <div className="w-full text-center mb-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-mono font-bold uppercase border border-[#8B0000]/20 mb-2">
            <span>✦ INDOCHINE EDITORIAL PHOTOCARD ✦</span>
          </div>
          <h3 id="photocard-modal-title" className="font-serif text-2xl font-bold text-[#222222]">
            {isEn ? 'Heritage Envoy Card' : 'Thẻ Sứ GiẢ Di Sản'}
          </h3>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            {isEn ? 'Share your personal heritage co-creation lookbook' : 'Thẻ định danh phong cách cổ phục dành riêng cho bạn'}
          </p>
        </div>

        <div className="w-full max-w-[360px] bg-[#FAF7F2] rounded-2xl p-4 border-2 border-[#D4AF37] shadow-lg relative flex flex-col items-center space-y-4">
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-900 border-2 border-[#D4AF37]/50 relative shadow-inner flex items-center justify-center">
            {portraitUrl ? (
              <img 
                src={portraitUrl} 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6 text-stone-400 font-serif">
                <span className="text-3xl block mb-2">👘</span>
                <span className="text-sm font-bold text-stone-300">{costumeName}</span>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white font-mono text-[10px] border border-white/20">
              1744 · 2026
            </div>
            <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-white font-mono text-[10px] font-bold border border-white/20">
              Decorum: {score}%
            </div>
          </div>

          <div className="w-full bg-white rounded-xl p-3.5 border border-stone-200/80 space-y-2.5">
            <div className="border-b border-stone-100 pb-2">
              <span className="text-[10px] font-mono text-[#8B0000] uppercase font-bold tracking-wider block">Cổ Phục Chuẩn Sử</span>
              <h4 className="font-serif font-bold text-lg text-[#222222] truncate">{costumeName}</h4>
            </div>

            <div className="text-xs space-y-1 font-sans">
              <p className="text-stone-600 truncate">
                <strong className="text-stone-800">📍 Điểm đến:</strong> {destination}
              </p>
              <p className="text-stone-600 truncate">
                <strong className="text-stone-800">🌸 Sắc tố:</strong> {seasonText}
              </p>
            </div>

            {dyes && dyes.length > 0 && (
              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-mono text-stone-500 uppercase block mb-1">Màu Nhuộm Truyền Thống:</span>
                <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                  {dyes.map(dye => (
                    <div 
                      key={dye.hex} 
                      className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-stone-200 text-[10px] font-mono"
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: dye.hex }}></span>
                      <span className="text-stone-700">{isEn ? dye.nameEn : dye.nameVi}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-stone-600 text-center tracking-tight">
            VIETHERITAGE REMIX · DI SẢN TRONG HƠI THỞ ĐƯƠNG ĐẠI
          </div>
        </div>

        <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">
          <button 
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-3 px-5 rounded-xl bg-[#8B0000] text-white hover:bg-red-800 transition-all font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
          >
            {isExporting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{isEn ? 'Exporting...' : 'Đang Kết Xuất...'}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{isEn ? 'Download Photocard (PNG)' : 'Tải Thẻ Về Máy (Download PNG)'}</span>
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-stone-700 font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
