import React from 'react';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';
import type { SavedDressUpLook, DressUpState } from '../types';

export interface SavedLooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedLooks: SavedDressUpLook[];
  onApplyLook: (state: DressUpState) => void;
  onDeleteLook: (id: string) => void;
  lang?: 'vi' | 'en';
}

export const SavedLooksModal: React.FC<SavedLooksModalProps> = ({
  isOpen,
  onClose,
  savedLooks,
  onApplyLook,
  onDeleteLook,
  lang = 'vi'
}) => {
  const isEn = lang === 'en';
  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    lockScroll: true,
    closeOnEscape: true
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-looks-title"
        className="relative w-full max-w-lg bg-[#FAF7F2] border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] outline-none"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">♡</span>
            <div>
              <h3 id="saved-looks-title" className="font-serif font-bold text-base text-[#222222]">
                {isEn ? 'Saved Heritage Outfits' : 'Bộ Trang Phục Đã Lưu'}
              </h3>
              <p className="text-[11px] font-mono text-stone-500">
                {isEn ? `${savedLooks.length} looks in wardrobe` : `${savedLooks.length} bộ đồ trong tủ di sản`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-xs flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            aria-label={isEn ? 'Close saved looks dialog' : 'Đóng danh sách bộ đồ đã lưu'}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {savedLooks.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="text-4xl">👘</div>
              <p className="font-serif text-sm font-semibold text-stone-700">
                {isEn ? 'No saved looks yet' : 'Chưa có bộ trang phục nào được lưu'}
              </p>
              <p className="font-sans text-xs text-stone-500 max-w-xs mx-auto">
                {isEn 
                  ? 'Mix and match traditional layers in the 2D studio and click "Save Outfit" to build your collection.' 
                  : 'Hãy thỏa sức phối trang phục trong xưởng 2D và bấm "♡ Lưu bộ đồ" để lưu lại những bản phối ưng ý nhé.'}
              </p>
            </div>
          ) : (
            savedLooks.map(look => (
              <div 
                key={look.id}
                className="p-3 bg-white rounded-xl border border-stone-200 hover:border-[#D4AF37] shadow-xs flex items-center justify-between gap-3 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-xs text-[#222222] truncate">
                    {look.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 font-sans truncate">
                    {isEn ? look.previewSummaryEn : look.previewSummaryVi}
                  </p>
                  <p className="text-[10px] font-mono text-stone-400 mt-0.5">
                    {new Date(look.createdAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onApplyLook(look.state);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-mono font-semibold cursor-pointer transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                  >
                    {isEn ? 'Wear' : 'Mặc ngay'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteLook(look.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                    aria-label={isEn ? `Delete outfit ${look.title}` : `Xóa bộ đồ ${look.title}`}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
