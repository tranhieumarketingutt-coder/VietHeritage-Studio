import React, { useRef } from 'react';
import { COSTUMES_DATA } from '../../../costumes';
import { compressImage } from '../../../shared/lib/imageCompression';

export interface VirtualTryOnState {
  userPhotoUrl: string;
  selectedCostumeId: string;
  selectedDestination: string;
  selectedUndertone: string;
  height: number;
  weight: number;
  bodyShape: string;
  bottomChoice: string;
  weather: string;
  collarChoice: string;
  colorHex: string;
  isAnalyzing: boolean;
}

export interface VirtualTryOnProps {
  state: VirtualTryOnState;
  setState: React.Dispatch<React.SetStateAction<VirtualTryOnState>>;
  onAnalyze: () => void;
  onTryOn: () => void;
}

const COSTUME_OPTIONS = COSTUMES_DATA.slice(0, 6);
const DESTINATION_OPTIONS = ['hoang-thanh', 'dai-noi-hue', 'hoi-an', 'chua-den', 'cafe'];

const DESTINATION_LABELS: Record<string, string> = {
  'hoang-thanh': 'Hoàng Thành Thăng Long',
  'dai-noi-hue': 'Đại Nội Huế',
  'hoi-an': 'Phố Cổ Hội An',
  'chua-den': 'Chốn Tôn Nghiêm',
  'cafe': 'Dạo Phố Cà Phê'
};

/**
 * Interactive virtual try-on configuration panel with client-side image compression.
 */
export const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ state, setState, onAnalyze, onTryOn }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const compressed = await compressImage(file, 1024, 0.82);
      setState(prev => ({ ...prev, userPhotoUrl: compressed.dataUrl }));
    } catch {
      const fallbackUrl = URL.createObjectURL(file);
      setState(prev => ({ ...prev, userPhotoUrl: fallbackUrl }));
    }
  };

  const handlePresetAvatar = (url: string) => {
    setState(prev => ({ ...prev, userPhotoUrl: url }));
  };

  const handleCostumeKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = COSTUME_OPTIONS.findIndex(c => c.id === state.selectedCostumeId);
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === -1 || currentIndex === COSTUME_OPTIONS.length - 1 ? 0 : currentIndex + 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex <= 0 ? COSTUME_OPTIONS.length - 1 : currentIndex - 1;
    }
    if (nextIndex !== -1) {
      const nextCostume = COSTUME_OPTIONS[nextIndex];
      setState(prev => ({ ...prev, selectedCostumeId: nextCostume.id }));
      const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
      buttons[nextIndex]?.focus();
    }
  };

  const handleDestinationKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = DESTINATION_OPTIONS.indexOf(state.selectedDestination);
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === -1 || currentIndex === DESTINATION_OPTIONS.length - 1 ? 0 : currentIndex + 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex <= 0 ? DESTINATION_OPTIONS.length - 1 : currentIndex - 1;
    }
    if (nextIndex !== -1) {
      const nextDest = DESTINATION_OPTIONS[nextIndex];
      setState(prev => ({ ...prev, selectedDestination: nextDest }));
      const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
      buttons[nextIndex]?.focus();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D4AF37]/40 p-5 md:p-6 shadow-sm flex flex-col justify-between h-full space-y-4">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Tải Ảnh Chân Dung</span>
          </label>
        </div>
        <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30">
          <label 
            htmlFor="userPhotoUpload"
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white border-2 border-dashed border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0 shadow-inner group cursor-pointer hover:border-[#8B0000] focus-within:ring-2 focus-within:ring-[#8B0000] focus-within:border-[#8B0000] transition-colors"
          >
            {state.userPhotoUrl ? (
              <img src={state.userPhotoUrl} className="w-full h-full object-cover" alt="Ảnh chân dung đã tải lên" />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-600">
                <span className="text-[9px] font-mono mt-0.5 text-stone-600">Tải ảnh</span>
              </div>
            )}
          </label>
          <div className="flex-1 space-y-2">
            <input 
              id="userPhotoUpload"
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="sr-only" 
              aria-label="Tải ảnh chân dung cá nhân (định dạng JPG, PNG)"
            />
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono text-stone-600 shrink-0">Mẫu sẵn:</span>
              <div className="grid grid-cols-3 gap-1.5 w-full">
                <button type="button" onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">Nam Gen Z</button>
                <button type="button" onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">Nữ Gen Z</button>
                <button type="button" onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">Nàng Thơ</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Chọn Cổ Phục Muốn Mặc Thử</span>
          </label>
        </div>
        <div 
          role="radiogroup" 
          aria-label="Chọn cổ phục muốn mặc thử" 
          onKeyDown={handleCostumeKeyDown}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
        >
          {COSTUME_OPTIONS.map((c, index) => {
            const isSelected = state.selectedCostumeId === c.id;
            return (
              <button 
                type="button"
                role="radio"
                tabIndex={isSelected || (!state.selectedCostumeId && index === 0) ? 0 : -1}
                aria-checked={isSelected}
                aria-label={`Cổ phục: ${c.nameVi}${isSelected ? ', đang được chọn' : ''}`}
                key={c.id}
                onClick={() => setState(prev => ({ ...prev, selectedCostumeId: c.id }))}
                className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${isSelected ? 'border-[#8B0000] ring-2 ring-[#8B0000]/40 shadow-sm bg-rose-50/20' : 'border-stone-200 hover:border-[#D4AF37] bg-white'}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                  <img src={c.realPhotography?.heroPhoto || ''} alt="" aria-hidden="true" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-2 text-left">
                  <span className="block font-serif font-bold text-xs text-[#222222] truncate group-hover:text-[#8B0000] transition-colors">{c.nameVi}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
          <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">3</span>
          <span>Chọn Bối Cảnh Di Sản Check-In</span>
        </label>
        <div 
          role="radiogroup" 
          aria-label="Chọn bối cảnh di sản check-in" 
          onKeyDown={handleDestinationKeyDown}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {DESTINATION_OPTIONS.map((dest, index) => {
            const isSelected = state.selectedDestination === dest;
            const destLabel = DESTINATION_LABELS[dest] || dest;
            return (
              <button 
                type="button"
                role="radio"
                tabIndex={isSelected || (!state.selectedDestination && index === 0) ? 0 : -1}
                aria-checked={isSelected}
                aria-label={`Bối cảnh: ${destLabel}${isSelected ? ', đang được chọn' : ''}`}
                key={dest} 
                onClick={() => setState(prev => ({ ...prev, selectedDestination: dest }))}
                className={`px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${isSelected ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}
              >
                {destLabel}
              </button>
            );
          })}
        </div>
      </div>

      <details className="pt-2 border-t border-stone-200 group">
        <summary className="text-xs font-mono text-stone-600 hover:text-[#8B0000] cursor-pointer flex items-center justify-between py-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
          <span>Tùy chọn nâng cao</span>
        </summary>
        <div className="mt-3 space-y-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
          <div>
            <label htmlFor="undertoneSelect" className="block text-xs font-mono text-stone-600 mb-1">Undertone 4 Mùa (Personal Color):</label>
            <select id="undertoneSelect" value={state.selectedUndertone} onChange={e => setState(prev => ({ ...prev, selectedUndertone: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white">
              <option value="autumn">Mùa Thu (Warm Olive)</option>
              <option value="spring">Mùa Xuân (Warm Fair)</option>
              <option value="summer">Mùa Hạ (Cool Light)</option>
              <option value="winter">Mùa Đông (Cool Deep)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="userHeightInput" className="block text-[11px] font-mono text-stone-600 mb-1">Chiều cao (cm):</label>
              <input id="userHeightInput" type="number" value={state.height} onChange={e => setState(prev => ({ ...prev, height: Number(e.target.value) }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white" />
            </div>
            <div>
              <label htmlFor="userWeightInput" className="block text-[11px] font-mono text-stone-600 mb-1">Cân nặng (kg):</label>
              <input id="userWeightInput" type="number" value={state.weight} onChange={e => setState(prev => ({ ...prev, weight: Number(e.target.value) }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="userBodyShapeSelect" className="block text-[11px] font-mono text-stone-600 mb-1">Dáng người (Hình thể):</label>
              <select id="userBodyShapeSelect" value={state.bodyShape} onChange={e => setState(prev => ({ ...prev, bodyShape: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white">
                <option value="hourglass">Đồng hồ cát (Hourglass)</option>
                <option value="pear">Dáng quả lê (Pear)</option>
                <option value="rectangle">Dáng thước kẻ (Rectangle)</option>
                <option value="inverted-triangle">Tam giác ngược (Inverted)</option>
              </select>
            </div>
            <div>
              <label htmlFor="userBottomSelect" className="block text-[11px] font-mono text-stone-600 mb-1">Trang phục dưới (Hạ y):</label>
              <select id="userBottomSelect" value={state.bottomChoice} onChange={e => setState(prev => ({ ...prev, bottomChoice: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white">
                <option value="pant">Quần thụng lụa trắng (Chuẩn mực)</option>
                <option value="skirt">Váy quấn gấm dài</option>
                <option value="short">Quần short (Cảnh báo vi phạm)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="userWeatherSelect" className="block text-[11px] font-mono text-stone-600 mb-1">Thời tiết & Mùa:</label>
              <select id="userWeatherSelect" value={state.weather} onChange={e => setState(prev => ({ ...prev, weather: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white">
                <option value="cold-18">Thu đông / Se lạnh (18°C)</option>
                <option value="warm-28">Nắng ấm / Mùa hè (28°C)</option>
              </select>
            </div>
            <div>
              <label htmlFor="userColorSelect" className="block text-[11px] font-mono text-stone-600 mb-1">Sắc màu chủ đạo:</label>
              <select id="userColorSelect" value={state.colorHex} onChange={e => setState(prev => ({ ...prev, colorHex: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-sans text-xs focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white">
                <option value="#8B0000">Đỏ Son / Chu Sa (#8B0000)</option>
                <option value="#D4AF37">Vàng Hoàng Yến (#D4AF37)</option>
                <option value="#1C3144">Xanh Chàm (#1C3144)</option>
                <option value="#6B4226">Nâu Củ Nâu (#6B4226)</option>
                <option value="#8B1E3F">Đỏ Củ Dền (#8B1E3F)</option>
                <option value="#6B8E23">Xanh Hương Cốm (#6B8E23)</option>
              </select>
            </div>
          </div>
        </div>
      </details>

      <div className="space-y-2 pt-2">
        <button type="button" onClick={onTryOn} disabled={state.isAnalyzing} className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#8B0000] via-[#A01625] to-[#8B0000] hover:from-[#700000] hover:to-[#700000] text-white font-mono font-bold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B0000]">
          Phục Dựng Diện Mạo Di Sản
        </button>
        <button type="button" onClick={onAnalyze} disabled={state.isAnalyzing} className="w-full py-2.5 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/30 font-mono font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]">
          Phân Tích Personal Color & Cultural Guardrail
        </button>
      </div>
    </div>
  );
};
