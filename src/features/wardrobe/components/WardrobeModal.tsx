import React, { useState, useEffect } from 'react';
import { storageHelper, WardrobeItem } from '../../../shared/lib/storage';
import { useFocusTrap } from '../../../shared/hooks/useFocusTrap';

/**
 * Properties for WardrobeModal component.
 */
export interface WardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'vi' | 'en';
}

/**
 * Modal dialog for browsing and managing saved looks in the personal heritage wardrobe.
 */
export const WardrobeModal: React.FC<WardrobeModalProps> = ({ isOpen, onClose, lang = 'vi' }) => {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const isEn = lang === 'en';

  const dialogRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    lockScroll: true,
    closeOnEscape: true
  });

  useEffect(() => {
    if (isOpen) {
      setItems(storageHelper.getWardrobe());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    const updated = storageHelper.removeFromWardrobe(id);
    setItems(updated);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wardrobe-modal-title"
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden outline-none"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B0000] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-base border border-[#D4AF37]">
              ✦
            </div>
            <div>
              <h3 id="wardrobe-modal-title" className="font-serif font-bold text-lg text-[#222222]">
                {isEn ? 'Heritage Wardrobe' : 'Tủ Đồ Di Sản'}
              </h3>
              <p className="text-[11px] text-stone-600 font-mono">
                {isEn ? 'Your saved looks and personal styling archives' : 'Bộ sưu tập trang phục & bản phối cá nhân của bạn'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-sm flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
            onClick={onClose}
            aria-label={isEn ? "Close wardrobe" : "Đóng tủ đồ di sản"}
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 flex items-center justify-center text-2xl text-stone-600">
                👘
              </div>
              <h4 className="font-serif font-bold text-base text-[#222222]">
                {isEn ? 'Your Wardrobe is Empty' : 'Tủ đồ của bạn đang trống'}
              </h4>
              <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
                {isEn 
                  ? 'Explore the Heritage Co-Creation Studio, analyze your personal palette, and click "Save to Heritage Wardrobe" to store your favorite looks here.' 
                  : 'Hãy trải nghiệm Xưởng Sáng Tạo Di Sản, phân tích bảng màu cá nhân và nhấn "Lưu vào Tủ Đồ Di Sản" để lưu giữ các bản phối tâm đắc tại đây.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className="bg-[#FAF7F2] rounded-xl border border-stone-200 p-3.5 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                >
                  <div className="flex space-x-3 items-start">
                    {item.photoUrl ? (
                      <img 
                        src={item.photoUrl} 
                        alt={item.costumeName || 'Heritage look'} 
                        className="w-16 h-20 object-cover rounded-lg border border-stone-200 shrink-0 bg-stone-100"
                      />
                    ) : (
                      <div className="w-16 h-20 rounded-lg bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-700 text-xs shrink-0 font-serif">
                        1744
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-sm text-[#222222] truncate">
                        {item.costumeName || (isEn ? 'Vietnamese Costume' : 'Cổ Phục Việt')}
                      </h5>
                      {item.destination && (
                        <p className="text-[11px] text-stone-600 truncate mt-0.5">
                          📍 {item.destination}
                        </p>
                      )}
                      {item.date && (
                        <p className="text-[10px] text-stone-600 font-mono mt-0.5">
                          {item.date}
                        </p>
                      )}
                      {typeof item.score === 'number' && (
                        <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                          Decorum: {item.score}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex justify-end">
                    {confirmDeleteId === item.id ? (
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-red-800 font-bold text-[11px]">{isEn ? 'Confirm delete?' : 'Xác nhận xóa?'}</span>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(item.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-0.5 rounded bg-red-700 hover:bg-red-800 text-white font-bold text-[10px] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-900"
                        >
                          {isEn ? 'Delete' : 'Xóa'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-[10px] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400"
                        >
                          {isEn ? 'Cancel' : 'Hủy'}
                        </button>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="text-[11px] font-mono text-stone-700 hover:text-red-800 flex items-center space-x-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                        title={isEn ? 'Delete from wardrobe' : 'Xóa khỏi tủ đồ'}
                        aria-label={isEn ? `Remove ${item.costumeName || 'costume'} from wardrobe` : `Xóa ${item.costumeName || 'trang phục'} khỏi tủ đồ`}
                      >
                        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>{isEn ? 'Remove' : 'Xóa'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-stone-200 bg-[#FAF7F2] flex justify-between items-center text-xs font-mono text-stone-600">
          <span>{items.length} {isEn ? 'looks stored' : 'bản phối đã lưu'}</span>
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#8B0000] text-white hover:bg-red-800 transition-colors font-sans cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>
        </div>
      </div>
    </div>
  );
};
