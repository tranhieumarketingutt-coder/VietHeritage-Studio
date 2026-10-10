import React, { useRef } from 'react';
// @ts-ignore
import { COSTUMES_DATA } from '../../../costumes.js';

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

export const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ state, setState, onAnalyze, onTryOn }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setState(prev => ({ ...prev, userPhotoUrl: url }));
    }
  };

  const handlePresetAvatar = (url: string) => {
    setState(prev => ({ ...prev, userPhotoUrl: url }));
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D4AF37]/40 p-5 md:p-6 shadow-sm space-y-5">
      {/* STEP 1 */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Tải Ảnh Chân Dung</span>
          </label>
        </div>
        <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30">
          <div 
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white border-2 border-dashed border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0 shadow-inner group cursor-pointer hover:border-[#8B0000] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {state.userPhotoUrl ? (
              <img src={state.userPhotoUrl} className="w-full h-full object-cover" alt="User Portrait" />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-400">
                <span className="text-[9px] font-mono mt-0.5 text-stone-500">Tải ảnh</span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono text-stone-500 shrink-0">Mẫu sẵn:</span>
              <div className="grid grid-cols-3 gap-1.5 w-full">
                <button onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs">Nam Gen Z</button>
                <button onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs">Nữ Gen Z</button>
                <button onClick={() => handlePresetAvatar('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80')} className="px-2 py-1 rounded-lg text-[10px] font-mono bg-white hover:bg-[#8B0000] hover:text-white text-stone-700 border border-stone-200 transition-colors shadow-2xs">Nàng Thơ</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="space-y-2.5 pt-3 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Chọn Cổ Phục Muốn Mặc Thử</span>
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {COSTUMES_DATA.slice(0, 6).map((c: { id: string; nameVi: string; realPhotography?: { heroPhoto: string } }) => {
            const isSelected = state.selectedCostumeId === c.id;
            return (
              <div 
                key={c.id}
                onClick={() => setState(prev => ({ ...prev, selectedCostumeId: c.id }))}
                className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected ? 'border-[#8B0000] ring-2 ring-[#8B0000]/40 shadow-sm bg-rose-50/20' : 'border-stone-200 hover:border-[#D4AF37] bg-white'}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                  <img src={c.realPhotography?.heroPhoto || ''} alt={c.nameVi} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-2 text-left">
                  <h4 className="font-serif font-bold text-xs text-[#222222] truncate group-hover:text-[#8B0000] transition-colors">{c.nameVi}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3 */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5">
          <span className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-[10px] font-bold">3</span>
          <span>Chọn Bối Cảnh Di Sản Check-In</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['hoang-thanh', 'dai-noi-hue', 'hoi-an', 'chua-den', 'cafe'].map(dest => (
            <button 
              key={dest} 
              onClick={() => setState(prev => ({ ...prev, selectedDestination: dest }))}
              className={`px-2.5 py-2 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${state.selectedDestination === dest ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold shadow-xs' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'}`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* ADVANCED */}
      <details className="pt-2 border-t border-stone-200 group">
        <summary className="text-xs font-mono text-stone-500 hover:text-[#8B0000] cursor-pointer flex items-center justify-between py-1 select-none">
          <span>Tùy chọn nâng cao</span>
        </summary>
        <div className="mt-3 space-y-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
          <div>
            <label className="block text-xs font-mono text-stone-600 mb-1">Undertone 4 Mùa (Personal Color):</label>
            <select value={state.selectedUndertone} onChange={e => setState(prev => ({ ...prev, selectedUndertone: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 font-sans text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white">
              <option value="autumn">Mùa Thu (Warm Olive)</option>
              <option value="spring">Mùa Xuân (Warm Fair)</option>
              <option value="summer">Mùa Hạ (Cool Light)</option>
              <option value="winter">Mùa Đông (Cool Deep)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-mono text-stone-600 mb-1">Chiều cao (cm):</label>
              <input type="number" value={state.height} onChange={e => setState(prev => ({ ...prev, height: Number(e.target.value) }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white" />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-600 mb-1">Cân nặng (kg):</label>
              <input type="number" value={state.weight} onChange={e => setState(prev => ({ ...prev, weight: Number(e.target.value) }))} className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono text-xs focus:ring-1 focus:ring-[#8B0000] outline-none bg-white" />
            </div>
          </div>
        </div>
      </details>

      <div className="space-y-2 pt-2">
        <button onClick={onTryOn} disabled={state.isAnalyzing} className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#8B0000] via-[#A01625] to-[#8B0000] hover:from-[#700000] hover:to-[#700000] text-white font-mono font-bold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50">
          ✨ Thử Cổ Phục Bằng AI
        </button>
        <button onClick={onAnalyze} disabled={state.isAnalyzing} className="w-full py-2.5 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#8B0000] border border-[#8B0000]/30 font-mono font-bold text-xs transition-colors cursor-pointer disabled:opacity-50">
          Phân Tích Personal Color & Cultural Guardrail
        </button>
      </div>
    </div>
  );
};
