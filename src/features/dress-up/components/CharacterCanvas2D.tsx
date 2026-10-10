import React, { useId } from 'react';
import type { DressUpState, ColorOption } from '../types';
import { COLOR_PALETTES } from '../data/dressUpData';

export interface CharacterCanvas2DProps {
  state: DressUpState;
  isSparkling?: boolean;
}

/**
 * High-definition layered 2D traditional costume character renderer.
 * Features independent z-index layers for body, hair, inner/bottom,
 * main outfit, color tints, patterns, headwear, and accessories.
 */
export const CharacterCanvas2D: React.FC<CharacterCanvas2DProps> = ({
  state,
  isSparkling = false
}) => {
  const uid = useId().replace(/:/g, '');
  const activeColor = COLOR_PALETTES.find(c => c.id === state.colorId) || COLOR_PALETTES[0];
  const isFemale = state.character === 'female-01';

  const robeColor = activeColor.hex;
  const robeColorDark = activeColor.secondaryHex;

  return (
    <div className="relative w-full max-w-[340px] aspect-[1/1.55] mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-[#F7F2E7] via-[#FAF7F2] to-[#EFE7D8] border-2 border-[#D4AF37]/50 shadow-2xl flex items-center justify-center p-2 select-none">
      {/* Background Heritage Ambience */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8B0000_1px,transparent_1px)] [background-size:16px_16px]" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-4 left-4 right-4 h-24 rounded-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent blur-xl pointer-events-none" 
      />

      {/* Heritage Vignette Corner Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-lg pointer-events-none" />

      {/* Sparkle particle overlay when randomizing */}
      {isSparkling && (
        <div aria-hidden="true" className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full animate-ping opacity-25 bg-[#D4AF37]/30 rounded-3xl" />
          <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">✨</div>
          <div className="absolute top-1/3 right-1/4 text-2xl animate-pulse">🌸</div>
          <div className="absolute bottom-1/3 left-1/3 text-2xl animate-bounce [animation-delay:0.2s]">✨</div>
        </div>
      )}

      {/* Vector Layered Character */}
      <svg
        viewBox="0 0 400 620"
        className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300"
        role="img"
        aria-label={isFemale ? 'Nhân vật 2D An Nhã trong trang phục truyền thống' : 'Nhân vật 2D Minh Triết trong trang phục truyền thống'}
      >
        <defs>
          {/* Skin Gradients */}
          <linearGradient id={`${uid}-skin`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2E2" />
            <stop offset="50%" stopColor="#FFE8D2" />
            <stop offset="100%" stopColor="#FBD5BB" />
          </linearGradient>
          <linearGradient id={`${uid}-skin-shadow`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5C4A3" />
            <stop offset="100%" stopColor="#E6AC89" />
          </linearGradient>

          {/* Robe Fabric Gradients */}
          <linearGradient id={`${uid}-robe-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={robeColor} />
            <stop offset="100%" stopColor={robeColorDark} />
          </linearGradient>
          <linearGradient id={`${uid}-robe-sheen`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor={robeColor} />
            <stop offset="100%" stopColor={robeColorDark} />
          </linearGradient>
          <linearGradient id={`${uid}-gold-trim`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE599" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A15" />
          </linearGradient>

          {/* Hair Gradient */}
          <linearGradient id={`${uid}-hair`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2B2625" />
            <stop offset="40%" stopColor="#1A1818" />
            <stop offset="100%" stopColor="#0D0B0B" />
          </linearGradient>

          {/* Trousers White Silk Gradient */}
          <linearGradient id={`${uid}-silk-white`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F7F5EE" />
            <stop offset="100%" stopColor="#E8E4D8" />
          </linearGradient>
          <linearGradient id={`${uid}-silk-black`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2B2E33" />
            <stop offset="50%" stopColor="#1C1E21" />
            <stop offset="100%" stopColor="#101114" />
          </linearGradient>

          {/* Silver Torque Gradient */}
          <linearGradient id={`${uid}-silver`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#D8DCE0" />
            <stop offset="100%" stopColor="#8A939E" />
          </linearGradient>

          {/* Jade Gradient */}
          <linearGradient id={`${uid}-jade`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CD1B8" />
            <stop offset="100%" stopColor="#2E6F62" />
          </linearGradient>
        </defs>

        {/* ========================================================
            LAYER 0: Halo & Stand Shadow
            ======================================================== */}
        <ellipse cx="200" cy="590" rx="95" ry="14" fill="#000000" opacity="0.12" />
        <ellipse cx="200" cy="590" rx="60" ry="7" fill="#000000" opacity="0.16" />

        {/* ========================================================
            LAYER 1: Character Body & Expressive Face
            ======================================================== */}
        <g id="layer-body">
          {/* Neck */}
          <path d="M188 170 L188 220 L212 220 L212 170 Z" fill={`url(#${uid}-skin)`} />
          <path d="M188 190 Q200 202 212 190 L212 210 Q200 216 188 210 Z" fill={`url(#${uid}-skin-shadow)`} opacity="0.4" />

          {/* Shoulders & Chest Base */}
          <path 
            d="M150 240 Q200 220 250 240 L260 380 L140 380 Z" 
            fill={`url(#${uid}-skin)`} 
          />

          {/* Head & Jawline */}
          <path 
            d="M165 130 Q165 75 200 75 Q235 75 235 130 Q235 178 200 185 Q165 178 165 130 Z" 
            fill={`url(#${uid}-skin)`} 
            stroke="#DDB899" 
            strokeWidth="1.2"
          />

          {/* Ears */}
          <ellipse cx="163" cy="135" rx="5.5" ry="9" fill={`url(#${uid}-skin)`} stroke="#DDB899" strokeWidth="0.8" />
          <ellipse cx="237" cy="135" rx="5.5" ry="9" fill={`url(#${uid}-skin)`} stroke="#DDB899" strokeWidth="0.8" />
          <path d="M164 133 Q166 136 164 139" stroke="#CC9D7A" strokeWidth="1" fill="none" />
          <path d="M236 133 Q234 136 236 139" stroke="#CC9D7A" strokeWidth="1" fill="none" />

          {/* Gentle Blush on Cheeks (Warm Vietnamese Beauty) */}
          <ellipse cx="178" cy="144" rx="8" ry="4.5" fill="#FF7B7B" opacity="0.25" />
          <ellipse cx="222" cy="144" rx="8" ry="4.5" fill="#FF7B7B" opacity="0.25" />

          {/* Soulful Eyes & Long Lashes */}
          {isFemale ? (
            <g id="female-eyes">
              {/* Left Eye */}
              <path d="M174 133 Q182 128 190 134" stroke="#2B211E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M175 133 Q182 138 189 134" stroke="#684A3B" strokeWidth="0.8" fill="#FFFFFF" />
              <circle cx="182" cy="133" r="3.2" fill="#2E2018" />
              <circle cx="183.2" cy="132" r="1.1" fill="#FFFFFF" /> {/* Twinkle highlight */}
              <circle cx="181" cy="134" r="0.6" fill="#FFFFFF" opacity="0.8" />
              {/* Right Eye */}
              <path d="M210 134 Q218 128 226 133" stroke="#2B211E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M211 134 Q218 138 225 133" stroke="#684A3B" strokeWidth="0.8" fill="#FFFFFF" />
              <circle cx="218" cy="133" r="3.2" fill="#2E2018" />
              <circle cx="219.2" cy="132" r="1.1" fill="#FFFFFF" /> {/* Twinkle highlight */}
              <circle cx="217" cy="134" r="0.6" fill="#FFFFFF" opacity="0.8" />
              {/* Willow Leaf Eyebrows */}
              <path d="M172 125 Q181 121 190 126" stroke="#4A3B32" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M210 126 Q219 121 228 125" stroke="#4A3B32" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g id="male-eyes">
              {/* Left Eye */}
              <path d="M173 133 Q182 129 190 133" stroke="#231E1C" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              <path d="M174 133 Q182 137 189 133" stroke="#5E4336" strokeWidth="0.8" fill="#FFFFFF" />
              <circle cx="182" cy="133" r="3" fill="#241B16" />
              <circle cx="183" cy="132" r="1" fill="#FFFFFF" />
              {/* Right Eye */}
              <path d="M210 133 Q218 129 227 133" stroke="#231E1C" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              <path d="M211 133 Q218 137 226 133" stroke="#5E4336" strokeWidth="0.8" fill="#FFFFFF" />
              <circle cx="218" cy="133" r="3" fill="#241B16" />
              <circle cx="219" cy="132" r="1" fill="#FFFFFF" />
              {/* Stronger Scholar Eyebrows */}
              <path d="M171 125 L189 123" stroke="#332720" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M211 123 L229 125" stroke="#332720" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* Nose */}
          <path d="M198 135 L200 148 Q202 150 204 148" stroke="#D19E7B" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Soft Lips */}
          <path 
            d="M193 162 Q200 160 207 162 Q200 167 193 162 Z" 
            fill={isFemale ? "#DE5252" : "#B85D5D"} 
            opacity="0.85" 
          />
          <path d="M194 162 Q200 163 206 162" stroke="#871A1A" strokeWidth="0.7" fill="none" />

          {/* Hands and Wrists */}
          {/* Left Hand */}
          <path d="M130 360 Q122 390 126 420 Q130 425 136 415 L144 365 Z" fill={`url(#${uid}-skin)`} />
          {/* Right Hand */}
          <path d="M270 360 Q278 390 274 420 Q270 425 264 415 L256 365 Z" fill={`url(#${uid}-skin)`} />
        </g>

        {/* ========================================================
            LAYER 2: Hair Layer (Under Headwear)
            ======================================================== */}
        <g id="layer-hair">
          {state.hairId === 'hair-van-tran' && (
            <g id="hair-van-tran">
              {/* Back chignon roll silhouette behind head */}
              <ellipse cx="200" cy="64" rx="38" ry="16" fill={`url(#${uid}-hair)`} />
              
              {/* Full Rolled Hair Halo (Vanh Toc Van Tran day dan om dau) */}
              <path 
                d="M156 126 C152 64, 172 52, 200 52 C228 52, 248 64, 244 126 C240 76, 226 66, 200 66 C174 66, 160 76, 156 126 Z" 
                fill={`url(#${uid}-hair)`} 
                stroke="#1A1514" 
                strokeWidth="1.2"
              />
              {/* Lustrous halo ring highlights */}
              <path d="M164 78 Q200 58 236 78" stroke="#4A3F3D" strokeWidth="2.2" fill="none" opacity="0.6" />
              <path d="M168 85 Q200 66 232 85" stroke="#635552" strokeWidth="1.2" fill="none" opacity="0.45" />

              {/* Main Parted Hair - Left Wing (Mai toc muot re ngoi trai) */}
              <path 
                d="M200 66 L200 102 Q186 105 174 114 Q166 124 164 140 Q160 120 160 92 Q162 66 200 66 Z" 
                fill={`url(#${uid}-hair)`} 
              />
              {/* Main Parted Hair - Right Wing (Mai toc muot re ngoi phai) */}
              <path 
                d="M200 66 L200 102 Q214 105 226 114 Q234 124 236 140 Q240 120 240 92 Q238 66 200 66 Z" 
                fill={`url(#${uid}-hair)`} 
              />

              {/* Crisp Center Part Line (Duong re ngoi giua thanh thoat) */}
              <line x1="200" y1="66" x2="200" y2="102" stroke="#161211" strokeWidth="1.4" strokeLinecap="round" />

              {/* Hair Flow Strands & Sheen (Van toc luon theo ngoi dau) */}
              <path d="M198 74 Q186 86 174 112" stroke="#3D3331" strokeWidth="0.9" fill="none" opacity="0.75" />
              <path d="M197 84 Q188 94 178 116" stroke="#4E4240" strokeWidth="0.8" fill="none" opacity="0.6" />
              <path d="M182 86 Q178 96 172 112" stroke="#5E4F4C" strokeWidth="1.4" fill="none" opacity="0.45" />

              <path d="M202 74 Q214 86 226 112" stroke="#3D3331" strokeWidth="0.9" fill="none" opacity="0.75" />
              <path d="M203 84 Q212 94 222 116" stroke="#4E4240" strokeWidth="0.8" fill="none" opacity="0.6" />
              <path d="M218 86 Q222 96 228 112" stroke="#5E4F4C" strokeWidth="1.4" fill="none" opacity="0.45" />

              {/* Soft, Natural Tapered Sideburns (Mai toc thanh tu om nhe guong mat) */}
              <path d="M165 128 Q163 140 166 150 Q168 140 170 130 Z" fill="#241E1D" />
              <path d="M235 128 Q237 140 234 150 Q232 140 230 130 Z" fill="#241E1D" />

              {/* Hairline Edge Softening (Vien chan toc mem mai, khong bi cung hay hoi) */}
              <path d="M174 114 Q186 105 200 102 Q214 105 226 114" stroke="#382C29" strokeWidth="1.2" fill="none" opacity="0.9" />
            </g>
          )}

          {state.hairId === 'hair-bui-cao' && (
            <g id="hair-bui-cao">
              {/* High royal bun */}
              <ellipse cx="200" cy="58" rx="22" ry="17" fill={`url(#${uid}-hair)`} />
              {/* Sleek updo hair hugging skull down to natural hairline */}
              <path 
                d="M162 125 C160 84, 172 68, 200 68 C228 68, 240 84, 238 125 Q230 102 200 98 Q170 102 162 125 Z" 
                fill={`url(#${uid}-hair)`} 
              />
              <path d="M174 102 Q200 96 226 102" stroke="#3D3331" strokeWidth="1" fill="none" opacity="0.8" />
              {/* Golden Lotus Hairpin */}
              <path d="M178 56 L222 60" stroke={`url(#${uid}-gold-trim)`} strokeWidth="3" strokeLinecap="round" />
              <circle cx="222" cy="60" r="4.5" fill="#FFE599" stroke="#997A15" strokeWidth="1" />
            </g>
          )}

          {state.hairId === 'hair-bui-nam' && (
            <g id="hair-bui-nam">
              {/* Scholar topknot bun */}
              <ellipse cx="200" cy="62" rx="15" ry="14" fill={`url(#${uid}-hair)`} />
              {/* Main hair combed back neatly */}
              <path 
                d="M164 125 C162 86, 172 72, 200 72 C228 72, 238 86, 236 125 Q228 102 200 98 Q172 102 164 125 Z" 
                fill={`url(#${uid}-hair)`} 
              />
              <path d="M172 102 Q200 96 228 102" stroke="#3D3331" strokeWidth="1" fill="none" opacity="0.8" />
              <rect x="194" y="60" width="12" height="10" rx="3" fill="#754719" />
              <path d="M188 65 L212 65" stroke="#D1A76E" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {state.hairId === 'hair-ngan' && (
            <g id="hair-ngan">
              <path d="M164 125 Q164 70 200 70 Q236 70 236 125 Q228 135 233 150 Q225 115 200 110 Q175 115 167 150 Q172 135 164 125 Z" fill={`url(#${uid}-hair)`} />
            </g>
          )}
        </g>

        {/* ========================================================
            LAYER 3: Bottom / Inner Trousers & Skirt
            ======================================================== */}
        <g id="layer-bottom">
          {state.bottomId === 'bottom-quan-trang' && (
            <g id="bottom-white-trousers">
              {/* Left leg flowing */}
              <path d="M165 370 L145 570 Q165 576 185 570 L195 400 Z" fill={`url(#${uid}-silk-white)`} stroke="#D4CDBF" strokeWidth="1" />
              {/* Right leg flowing */}
              <path d="M235 370 L255 570 Q235 576 215 570 L205 400 Z" fill={`url(#${uid}-silk-white)`} stroke="#D4CDBF" strokeWidth="1" />
              {/* Inner fold shadows */}
              <path d="M195 400 L200 560 L205 400 Z" fill="#D6CFC0" opacity="0.5" />
            </g>
          )}

          {state.bottomId === 'bottom-quan-den' && (
            <g id="bottom-black-trousers">
              <path d="M165 370 L145 570 Q165 576 185 570 L195 400 Z" fill={`url(#${uid}-silk-black)`} stroke="#111317" strokeWidth="1" />
              <path d="M235 370 L255 570 Q235 576 215 570 L205 400 Z" fill={`url(#${uid}-silk-black)`} stroke="#111317" strokeWidth="1" />
              <path d="M195 400 L200 560 L205 400 Z" fill="#0A0B0D" opacity="0.5" />
            </g>
          )}

          {state.bottomId === 'bottom-yem-dao' && (
            <g id="bottom-yem-camisole">
              {/* Camisole diamond shape on upper chest */}
              <path d="M185 220 L215 220 L230 290 L170 290 Z" fill="#E66A7D" stroke="#B8394C" strokeWidth="1" />
              <path d="M200 220 L200 290" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
              {/* Under-skirt */}
              <path d="M160 360 L140 575 Q200 585 260 575 L240 360 Z" fill={`url(#${uid}-silk-black)`} />
            </g>
          )}

          {state.bottomId === 'bottom-vay-thuong' && (
            <g id="bottom-pleated-skirt">
              <path d="M160 340 L135 575 Q200 585 265 575 L240 340 Z" fill={`url(#${uid}-robe-grad)`} opacity="0.9" />
              {/* Skirt pleats */}
              <line x1="165" y1="360" x2="160" y2="575" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="185" y1="360" x2="182" y2="577" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="200" y1="360" x2="200" y2="578" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="215" y1="360" x2="218" y2="577" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              <line x1="235" y1="360" x2="240" y2="575" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
            </g>
          )}

          {/* Modern Wide-Leg Minimalist Trousers */}
          {state.bottomId === 'bottom-quan-tay-ong-rong' && (
            <g id="bottom-wide-leg-trousers">
              {/* Left leg wide flare */}
              <path d="M166 360 L140 575 L188 575 L196 410 Z" fill="#EAE6DF" stroke="#B8B2A6" strokeWidth="1.2" />
              {/* Right leg wide flare */}
              <path d="M234 360 L260 575 L212 575 L204 410 Z" fill="#F4F1EA" stroke="#B8B2A6" strokeWidth="1.2" />
              {/* Center crease line (Đường ly quần tây) */}
              <line x1="164" y1="380" x2="164" y2="570" stroke="#CAC4B7" strokeWidth="1.5" />
              <line x1="236" y1="380" x2="236" y2="570" stroke="#CAC4B7" strokeWidth="1.5" />
              {/* Waistband accent */}
              <rect x="165" y="358" width="70" height="8" rx="2" fill="#D3CCC0" />
            </g>
          )}

          {/* Modern Sunray Pleated Midi Skirt */}
          {state.bottomId === 'bottom-chan-vay-midi-xep-ly' && (
            <g id="bottom-pleated-midi">
              <path d="M165 350 L142 550 Q200 560 258 550 L235 350 Z" fill="#FCE8EC" stroke="#E5B2BD" strokeWidth="1.2" />
              {/* Multiple fine sunray pleats */}
              <line x1="168" y1="365" x2="152" y2="548" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="180" y1="365" x2="172" y2="550" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="192" y1="365" x2="190" y2="552" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="200" y1="365" x2="200" y2="553" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="208" y1="365" x2="210" y2="552" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="220" y1="365" x2="228" y2="550" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              <line x1="232" y1="365" x2="248" y2="548" stroke="#D98A9C" strokeWidth="1" opacity="0.7" />
              {/* Lower calves exposed */}
              <rect x="175" y="550" width="14" height="28" rx="3" fill={`url(#${uid}-skin)`} />
              <rect x="211" y="550" width="14" height="28" rx="3" fill={`url(#${uid}-skin)`} />
            </g>
          )}

          {/* Modern Indigo Denim Jeans */}
          {state.bottomId === 'bottom-quan-jeans-indigo' && (
            <g id="bottom-indigo-jeans">
              {/* Left leg */}
              <path d="M166 360 L152 575 L188 575 L196 415 Z" fill="#2E4A62" stroke="#1C3144" strokeWidth="1.2" />
              {/* Right leg */}
              <path d="M234 360 L248 575 L212 575 L204 415 Z" fill="#3B5975" stroke="#1C3144" strokeWidth="1.2" />
              {/* Yellow denim stitch details */}
              <line x1="166" y1="370" x2="153" y2="570" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,2" />
              <line x1="234" y1="370" x2="247" y2="570" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,2" />
              {/* Crotch shadow */}
              <path d="M196 415 L200 445 L204 415 Z" fill="#142331" opacity="0.6" />
            </g>
          )}
        </g>

        {/* ========================================================
            LAYER 4: Main Traditional Outfit (Interactive Color Tint)
            ======================================================== */}
        <g id="layer-outfit">
          {/* 1. ÁO DÀI TRUYỀN THỐNG */}
          {state.outfitId === 'outfit-ao-dai' && (
            <g id="outfit-ao-dai-body">
              {/* Main Body & Front Panel */}
              <path 
                d="M175 220 Q200 216 225 220 L242 270 Q246 320 236 345 L248 555 Q200 562 152 555 L164 345 Q154 320 158 270 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.5" 
              />
              {/* Left Sleeve */}
              <path 
                d="M175 220 L132 300 Q124 350 128 380 L146 380 Q148 340 158 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              {/* Right Sleeve */}
              <path 
                d="M225 220 L268 300 Q276 350 272 380 L254 380 Q252 340 242 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              {/* Stand Collar (Lập lĩnh) */}
              <path 
                d="M184 204 L184 224 Q200 228 216 224 L216 204 Q200 200 184 204 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={`url(#${uid}-gold-trim)`} 
                strokeWidth="1.5" 
              />
              {/* Diagonal Placket & Tiny Gold Buttons */}
              <path d="M200 226 Q218 240 236 265" stroke={`url(#${uid}-gold-trim)`} strokeWidth="2" fill="none" />
              <circle cx="204" cy="230" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="215" cy="240" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="226" cy="252" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="236" cy="265" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              {/* Center Panel Shimmer */}
              <path d="M198 230 L198 558" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
            </g>
          )}

          {/* 2. ÁO NHẬT BÌNH TRIỀU NGUYỄN */}
          {state.outfitId === 'outfit-nhat-binh' && (
            <g id="outfit-nhat-binh-body">
              {/* Outer Robe Body (Wider, imperial cut) */}
              <path 
                d="M168 220 Q200 216 232 220 L260 270 L266 545 Q200 554 134 545 L140 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.8" 
              />
              {/* Broad Sleeves */}
              <path 
                d="M168 220 L108 300 L110 410 L146 390 L140 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.5" 
              />
              <path 
                d="M232 220 L292 300 L290 410 L254 390 L260 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.5" 
              />

              {/* Five-Element Sleeve Bands (Ngũ Hành Cuffs: Blue, Red, Yellow, White, Purple) */}
              <g id="cuff-left">
                <rect x="108" y="380" width="38" height="5" fill="#1C3B57" />
                <rect x="108" y="385" width="38" height="5" fill="#C23B22" />
                <rect x="108" y="390" width="38" height="5" fill="#D4AF37" />
                <rect x="108" y="395" width="38" height="5" fill="#FDFBF7" />
                <rect x="108" y="400" width="38" height="5" fill="#5E2D79" />
              </g>
              <g id="cuff-right">
                <rect x="254" y="380" width="38" height="5" fill="#1C3B57" />
                <rect x="254" y="385" width="38" height="5" fill="#C23B22" />
                <rect x="254" y="390" width="38" height="5" fill="#D4AF37" />
                <rect x="254" y="395" width="38" height="5" fill="#FDFBF7" />
                <rect x="254" y="400" width="38" height="5" fill="#5E2D79" />
              </g>

              {/* The Distinctive Rectangular Collar Band (Dải Cổ Nhật Bình) */}
              <path 
                d="M174 212 L226 212 L234 330 L216 330 L216 234 L184 234 L184 330 L166 330 Z" 
                fill="#8B0000" 
                stroke={`url(#${uid}-gold-trim)`} 
                strokeWidth="2.5" 
              />
              {/* Gold Embroidery on Collar Band */}
              <circle cx="200" cy="222" r="3" fill="#FFE599" />
              <path d="M175 250 L183 250 M175 280 L183 280 M217 250 L225 250 M217 280 L225 280" stroke="#FFE599" strokeWidth="2" />

              {/* Hem Waves: Tam Sơn Thủy Ba (Three Mountains and Waves) */}
              <path 
                d="M136 530 Q150 515 165 530 Q180 515 200 530 Q220 515 235 530 Q250 515 264 530 L266 545 L134 545 Z" 
                fill="#1C3B57" 
                stroke={`url(#${uid}-gold-trim)`} 
                strokeWidth="1.5" 
              />
              <path d="M185 530 L200 505 L215 530 Z" fill={`url(#${uid}-gold-trim)`} opacity="0.8" />
            </g>
          )}

          {/* 3. ÁO NGŨ THÂN TAY CHẼN */}
          {state.outfitId === 'outfit-ngu-than' && (
            <g id="outfit-ngu-than-body">
              {/* Five panels silhouette */}
              <path 
                d="M174 218 Q200 214 226 218 L248 270 L254 540 Q200 548 146 540 L152 270 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.6" 
              />
              {/* Fitted Sleeves (Tay Chẽn) */}
              <path 
                d="M174 218 L138 290 L128 375 L144 375 L152 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              <path 
                d="M226 218 L262 290 L272 375 L256 375 L248 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              {/* Upright Stand Collar (Lập Lĩnh) */}
              <rect x="185" y="202" width="30" height="18" rx="2" fill={`url(#${uid}-robe-grad)`} stroke={`url(#${uid}-gold-trim)`} strokeWidth="1.5" />
              
              {/* 5 Fastener Buttons (Ngũ Thường) curving down to right armpit */}
              <path d="M200 220 Q215 230 230 250" stroke={robeColorDark} strokeWidth="1.8" fill="none" />
              <circle cx="200" cy="210" r="2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="200" cy="222" r="2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="208" cy="230" r="2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="218" cy="240" r="2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="230" cy="250" r="2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />

              {/* Unbroken Center Spine Seam (Trung Phùng) */}
              <line x1="200" y1="222" x2="200" y2="542" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" />
            </g>
          )}

          {/* 4. ÁO TẤC (NGŨ THÂN TAY THỤNG) */}
          {state.outfitId === 'outfit-ao-tac' && (
            <g id="outfit-ao-tac-body">
              {/* Robe Body */}
              <path 
                d="M174 218 Q200 214 226 218 L254 270 L260 550 Q200 560 140 550 L146 270 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.8" 
              />
              {/* Grand Flowing Wide Sleeves (Tay Thụng Rộng Chấm Gối) */}
              <path 
                d="M174 218 L114 280 L100 450 Q125 440 146 410 L146 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.6" 
              />
              <path 
                d="M226 218 L286 280 L300 450 Q275 440 254 410 L254 270 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.6" 
              />
              {/* Stand Collar */}
              <rect x="185" y="202" width="30" height="18" rx="2" fill={`url(#${uid}-robe-grad)`} stroke={`url(#${uid}-gold-trim)`} strokeWidth="1.5" />
              {/* 5 Knotted Buttons */}
              <circle cx="200" cy="210" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="200" cy="222" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="210" cy="232" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="222" cy="244" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              <circle cx="236" cy="256" r="2.2" fill="#FFE599" stroke="#997A15" strokeWidth="0.8" />
              {/* Vertical Spine Line */}
              <line x1="200" y1="222" x2="200" y2="552" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.4" />
            </g>
          )}

          {/* 5. ÁO TỨ THÂN KINH BẮC */}
          {state.outfitId === 'outfit-tu-than' && (
            <g id="outfit-tu-than-body">
              {/* Two flowing back panels and open front flaps */}
              <path 
                d="M174 225 L150 270 L140 480 Q155 490 170 470 L180 320 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.4" 
              />
              <path 
                d="M226 225 L250 270 L260 480 Q245 490 230 470 L220 320 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.4" 
              />
              {/* Sleeves */}
              <path d="M174 225 L130 295 L145 375 L158 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />
              <path d="M226 225 L270 295 L255 375 L242 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />

              {/* Silk Sash Tied at the Waist (Dải lụa thắt lưng hồng đào) */}
              <rect x="180" y="315" width="40" height="12" rx="3" fill="#E65576" stroke="#B8394C" strokeWidth="1" />
              <path d="M196 327 L192 410 L200 405 L204 327 Z" fill="#E65576" opacity="0.9" />
              <path d="M204 327 L208 418 L216 412 L212 327 Z" fill="#E65576" opacity="0.9" />
            </g>
          )}

          {/* 6. ÁO GIAO LĨNH HỮU NHẬM */}
          {state.outfitId === 'outfit-giao-linh' && (
            <g id="outfit-giao-linh-body">
              {/* Broad Crossover V-Neck Body */}
              <path 
                d="M168 220 Q200 216 232 220 L256 270 L264 545 Q200 554 136 545 L144 270 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.6" 
              />
              {/* Broad Sleeves */}
              <path d="M168 220 L118 290 L122 410 L152 385 L144 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.3" />
              <path d="M232 220 L282 290 L278 410 L248 385 L256 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.3" />

              {/* Crossover Lapel Wrapping Right (Hữu Nhậm) */}
              <path d="M180 220 L230 290 L170 330" stroke={`url(#${uid}-gold-trim)`} strokeWidth="3" fill="none" />
              <path d="M220 220 L195 255" stroke={`url(#${uid}-gold-trim)`} strokeWidth="2" fill="none" opacity="0.7" />

              {/* Silk Sash Tied at Waist */}
              <rect x="175" y="325" width="50" height="14" rx="3" fill="#D4AF37" stroke="#997A15" strokeWidth="1" />
              <circle cx="200" cy="332" r="5" fill="#FFE599" stroke="#997A15" strokeWidth="1" />
            </g>
          )}

          {/* 7. ÁO BÀ BA NAM BỘ */}
          {state.outfitId === 'outfit-ba-ba' && (
            <g id="outfit-ba-ba-body">
              {/* Fitted rustic tunic with side slits */}
              <path 
                d="M174 226 Q200 222 226 226 L242 270 L244 450 Q200 458 156 450 L158 270 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.4" 
              />
              {/* Sleeves */}
              <path d="M174 226 L138 295 L144 370 L156 368 L158 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />
              <path d="M226 226 L262 295 L256 370 L244 368 L242 270 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />

              {/* Modest Round Collar & Center Fastener Buttons */}
              <path d="M188 224 Q200 234 212 224" stroke="#2B211E" strokeWidth="1.5" fill="none" />
              <line x1="200" y1="232" x2="200" y2="445" stroke={robeColorDark} strokeWidth="1.2" />
              <circle cx="200" cy="245" r="1.8" fill="#1C1816" />
              <circle cx="200" cy="275" r="1.8" fill="#1C1816" />
              <circle cx="200" cy="305" r="1.8" fill="#1C1816" />
              <circle cx="200" cy="335" r="1.8" fill="#1C1816" />
              <circle cx="200" cy="365" r="1.8" fill="#1C1816" />

              {/* Two Front Lower Pockets */}
              <rect x="168" y="380" width="22" height="24" rx="2" fill={robeColorDark} opacity="0.6" stroke="#222222" strokeWidth="0.8" />
              <rect x="210" y="380" width="22" height="24" rx="2" fill={robeColorDark} opacity="0.6" stroke="#222222" strokeWidth="0.8" />
            </g>
          )}

          {/* 8. THỔ CẨM VÙNG CAO TÂY BẮC */}
          {state.outfitId === 'outfit-tho-cam' && (
            <g id="outfit-tho-cam-body">
              {/* Cropped indigo jacket */}
              <path 
                d="M174 224 L226 224 L244 270 L240 430 Q200 438 160 430 L156 270 Z" 
                fill="#1C3B57" 
                stroke="#122538" 
                strokeWidth="1.6" 
              />
              <path d="M174 224 L134 290 L138 370 L156 270 Z" fill="#1C3B57" stroke="#122538" strokeWidth="1.3" />
              <path d="M226 224 L266 290 L262 370 L244 270 Z" fill="#1C3B57" stroke="#122538" strokeWidth="1.3" />

              {/* Embroidered Geometric Borders (Red, Yellow, Green diamond checks) */}
              <rect x="160" y="415" width="80" height="15" fill="#C23B22" />
              <line x1="160" y1="422" x2="240" y2="422" stroke="#FFE599" strokeWidth="2" strokeDasharray="3,3" />
              <rect x="194" y="224" width="12" height="190" fill="#D4AF37" />
              <circle cx="200" cy="260" r="3" fill="#FDFBF7" stroke="#8B0000" strokeWidth="1" />
              <circle cx="200" cy="300" r="3" fill="#FDFBF7" stroke="#8B0000" strokeWidth="1" />
              <circle cx="200" cy="340" r="3" fill="#FDFBF7" stroke="#8B0000" strokeWidth="1" />
              <circle cx="200" cy="380" r="3" fill="#FDFBF7" stroke="#8B0000" strokeWidth="1" />
            </g>
          )}

          {/* 9. ÁO DÀI CÁCH TÂN GEN Z */}
          {state.outfitId === 'outfit-ao-dai-cach-tan' && (
            <g id="outfit-ao-dai-cach-tan-body">
              {/* Shorter knee-length modern tunic body */}
              <path 
                d="M176 222 Q200 218 224 222 L244 265 Q248 310 238 335 L246 450 Q200 458 154 450 L162 335 Q152 310 156 265 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.5" 
              />
              {/* Puffy 3/4 sleeves (Tay lửng bồng nhẹ) */}
              <path 
                d="M176 222 Q150 240 142 275 Q138 310 148 330 L160 326 Q156 300 156 265 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              <path 
                d="M224 222 Q250 240 258 275 Q262 310 252 330 L240 326 Q244 300 244 265 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.2" 
              />
              {/* Soft modern rounded collar */}
              <path d="M186 215 Q200 228 214 215" stroke={robeColorDark} strokeWidth="2" fill="none" />
              {/* Pearl or pearl button trim */}
              <circle cx="200" cy="235" r="2.5" fill="#FFFFFF" stroke="#DDB899" strokeWidth="0.8" />
              <circle cx="200" cy="255" r="2.5" fill="#FFFFFF" stroke="#DDB899" strokeWidth="0.8" />
              <circle cx="200" cy="275" r="2.5" fill="#FFFFFF" stroke="#DDB899" strokeWidth="0.8" />
              {/* Modern sheer mesh hem overlay */}
              <path d="M154 445 Q200 452 246 445 L247 458 Q200 465 153 458 Z" fill="#FFFFFF" opacity="0.4" />
            </g>
          )}

          {/* 10. BLAZER PHOM DÁNG NGŨ THÂN */}
          {state.outfitId === 'outfit-blazer-ngu-than' && (
            <g id="outfit-blazer-ngu-than-body">
              {/* Tailored structured jacket */}
              <path 
                d="M170 216 Q200 212 230 216 L254 265 L258 430 Q200 435 142 430 L146 265 Z" 
                fill={`url(#${uid}-robe-grad)`} 
                stroke={robeColorDark} 
                strokeWidth="1.8" 
              />
              {/* Structured suit sleeves */}
              <path d="M170 216 L130 280 L136 370 L152 368 L146 265 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.4" />
              <path d="M230 216 L270 280 L264 370 L248 368 L254 265 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.4" />
              
              {/* Lapel collar hybrid with stand collar */}
              <rect x="186" y="202" width="28" height="15" rx="2" fill={`url(#${uid}-gold-trim)`} opacity="0.85" />
              {/* Asymmetric overlap closure */}
              <path d="M188 217 L226 260 L226 430" stroke="#121820" strokeWidth="1.5" fill="none" />
              {/* Two metal buttons */}
              <circle cx="224" cy="275" r="3" fill="#D4AF37" stroke="#8B0000" strokeWidth="1" />
              <circle cx="224" cy="315" r="3" fill="#D4AF37" stroke="#8B0000" strokeWidth="1" />
              {/* Welt breast pocket with pocket square */}
              <line x1="160" y1="280" x2="182" y2="280" stroke="#121820" strokeWidth="1.5" />
              <polygon points="166,280 172,272 178,280" fill="#8B0000" />
            </g>
          )}

          {/* 11. ÁO BÀ BA CROPPED NĂNG ĐỘNG */}
          {state.outfitId === 'outfit-ao-ba-ba-crop' && (
            <g id="outfit-ba-ba-crop-body">
              {/* Cropped hem hitting at waist */}
              <path 
                d="M174 224 Q200 220 226 224 L244 265 L242 345 Q200 350 158 345 L156 265 Z" 
                fill={`url(#${uid}-robe-sheen)`} 
                stroke={robeColorDark} 
                strokeWidth="1.4" 
              />
              {/* Exposed midriff/waist base */}
              <path d="M165 345 Q200 350 235 345 L234 360 Q200 365 166 360 Z" fill={`url(#${uid}-skin)`} />
              {/* 3/4 sleeves */}
              <path d="M174 224 L138 285 L144 340 L156 338 L156 265 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />
              <path d="M226 224 L262 285 L256 340 L244 338 L244 265 Z" fill={`url(#${uid}-robe-grad)`} stroke={robeColorDark} strokeWidth="1.2" />
              
              {/* Round neckline & 3 modern coconut-shell buttons */}
              <path d="M188 222 Q200 232 212 222" stroke="#2B211E" strokeWidth="1.5" fill="none" />
              <line x1="200" y1="230" x2="200" y2="345" stroke={robeColorDark} strokeWidth="1" />
              <circle cx="200" cy="245" r="2" fill="#4A3B2C" />
              <circle cx="200" cy="275" r="2" fill="#4A3B2C" />
              <circle cx="200" cy="305" r="2" fill="#4A3B2C" />
            </g>
          )}
        </g>

        {/* ========================================================
            LAYER 5: Headwear Layer
            ======================================================== */}
        <g id="layer-headwear">
          {/* Black Velvet Turban (Khăn Vấn Nhung Đen) */}
          {state.headwearId === 'headwear-khan-van-den' && (
            <g id="headwear-khan-van-den">
              <path 
                d="M160 110 Q160 62 200 60 Q240 62 240 110 Q228 85 200 82 Q172 85 160 110 Z" 
                fill="#1C1818" 
                stroke="#0A0808" 
                strokeWidth="1.8" 
              />
              <path d="M164 100 Q175 76 200 74 Q225 76 236 100" stroke="#3D3534" strokeWidth="1.5" fill="none" />
              <path d="M168 90 Q180 68 200 66 Q220 68 232 90" stroke="#4F4645" strokeWidth="1" fill="none" />
            </g>
          )}

          {/* Scholar Folded Turban (Khăn Đóng Chữ Nhân) */}
          {state.headwearId === 'headwear-khan-dong-nam' && (
            <g id="headwear-khan-dong-nam">
              {/* Structured black folds */}
              <path 
                d="M162 110 Q162 66 200 64 Q238 66 238 110 Q226 90 200 86 Q174 90 162 110 Z" 
                fill="#20242B" 
                stroke="#121417" 
                strokeWidth="2" 
              />
              {/* The "Nhân" (人) character fold at center forehead */}
              <path d="M200 68 L194 88 M200 78 L206 88" stroke={`url(#${uid}-gold-trim)`} strokeWidth="2.2" strokeLinecap="round" />
            </g>
          )}

          {/* Imperial Gilded Headdress (Mấn Hoàng Gia) */}
          {state.headwearId === 'headwear-man-hoang-gia' && (
            <g id="headwear-man-hoang-gia">
              <path 
                d="M158 110 Q158 56 200 54 Q242 56 242 110 Q230 80 200 76 Q170 80 158 110 Z" 
                fill={`url(#${uid}-gold-trim)`} 
                stroke="#997A15" 
                strokeWidth="2" 
              />
              {/* Jewel centerpiece */}
              <circle cx="200" cy="74" r="5" fill="#8B0000" stroke="#FFE599" strokeWidth="1.2" />
              <circle cx="200" cy="74" r="2" fill="#FFE599" />
              {/* Gold bands */}
              <path d="M162 98 Q180 70 200 68 Q220 70 238 98" stroke="#FFE599" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {/* Hue Poem Conical Hat (Nón Lá Bài Thơ) */}
          {state.headwearId === 'headwear-non-la' && (
            <g id="headwear-non-la">
              {/* Conical hat resting slightly tilted on head */}
              <polygon points="200,30 140,115 260,115" fill="#F4E8D1" stroke="#D1BE9B" strokeWidth="1.5" />
              <ellipse cx="200" cy="115" rx="60" ry="12" fill="#E8D5B7" stroke="#D1BE9B" strokeWidth="1.2" />
              {/* Subtle palm leaf rib lines */}
              <line x1="200" y1="30" x2="160" y2="115" stroke="#DFCCA7" strokeWidth="1" />
              <line x1="200" y1="30" x2="180" y2="115" stroke="#DFCCA7" strokeWidth="1" />
              <line x1="200" y1="30" x2="220" y2="115" stroke="#DFCCA7" strokeWidth="1" />
              <line x1="200" y1="30" x2="240" y2="115" stroke="#DFCCA7" strokeWidth="1" />
              {/* Silk ribbon chin strap (Quai nón hồng sen) */}
              <path d="M160 115 Q175 160 200 170 Q225 160 240 115" stroke="#E66A7D" strokeWidth="2.5" fill="none" />
            </g>
          )}

          {/* Non Quai Thao (Nón Ba Tầm) */}
          {state.headwearId === 'headwear-non-quai-thao' && (
            <g id="headwear-non-quai-thao">
              {/* Broad flat disc hat */}
              <ellipse cx="200" cy="70" rx="90" ry="24" fill="#F4E8D1" stroke="#C2AB83" strokeWidth="2" />
              <ellipse cx="200" cy="65" rx="40" ry="10" fill="#E8D5B7" stroke="#C2AB83" strokeWidth="1.2" />
              {/* Hanging silk ties (Quai thao lụa) */}
              <path d="M130 80 Q140 220 145 350" stroke="#8B0000" strokeWidth="3" fill="none" opacity="0.85" />
              <path d="M270 80 Q260 220 255 350" stroke="#8B0000" strokeWidth="3" fill="none" opacity="0.85" />
            </g>
          )}

          {/* Southern Checkered Scarf (Khăn Rằn) */}
          {state.headwearId === 'headwear-khan-ran' && (
            <g id="headwear-khan-ran">
              {/* Checkered scarf draped over shoulders or neck */}
              <path d="M170 200 Q200 225 230 200 L234 320 Q200 310 166 320 Z" fill="#FDFBF7" stroke="#333333" strokeWidth="1.2" />
              <path d="M170 215 L230 215 M170 235 L230 235 M170 255 L230 255 M170 275 L230 275 M170 295 L230 295" stroke="#222222" strokeWidth="1.5" />
              <path d="M185 205 L185 315 M200 210 L200 315 M215 205 L215 315" stroke="#222222" strokeWidth="1.5" />
            </g>
          )}

          {/* Highland Brocade Cap (Mũ Đội Thổ Cẩm) */}
          {state.headwearId === 'headwear-mu-tho-cam' && (
            <g id="headwear-mu-tho-cam">
              <path d="M165 110 Q165 65 200 65 Q235 65 235 110 Z" fill="#C23B22" stroke="#8B0000" strokeWidth="1.8" />
              <rect x="165" y="98" width="70" height="12" fill="#1C3B57" stroke="#FFE599" strokeWidth="1" />
              {/* Silver coins dangling */}
              <circle cx="175" cy="114" r="2.5" fill={`url(#${uid}-silver)`} />
              <circle cx="187" cy="115" r="2.5" fill={`url(#${uid}-silver)`} />
              <circle cx="200" cy="116" r="2.5" fill={`url(#${uid}-silver)`} />
              <circle cx="213" cy="115" r="2.5" fill={`url(#${uid}-silver)`} />
              <circle cx="225" cy="114" r="2.5" fill={`url(#${uid}-silver)`} />
            </g>
          )}

          {/* Classic Wool Beret (Mũ Nồi Beret) */}
          {state.headwearId === 'headwear-beret-hien-dai' && (
            <g id="headwear-beret-modern">
              {/* Tilted woolen beret disc */}
              <ellipse cx="206" cy="74" rx="46" ry="16" transform="rotate(-8 206 74)" fill="#242830" stroke="#12151A" strokeWidth="1.5" />
              <ellipse cx="206" cy="71" rx="28" ry="10" transform="rotate(-8 206 71)" fill="#3A404D" opacity="0.6" />
              {/* Little top stalk of the beret */}
              <path d="M206 58 L207 53" stroke="#12151A" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Streetwear Brocade Bucket Hat (Mũ Bucket Thổ Cẩm) */}
          {state.headwearId === 'headwear-bucket-tho-cam' && (
            <g id="headwear-bucket-modern">
              {/* Flat crown top */}
              <ellipse cx="200" cy="58" rx="26" ry="8" fill="#1C3B57" />
              {/* Crown side body */}
              <path d="M174 58 L166 90 L234 90 L226 58 Z" fill="#1C3B57" stroke="#122538" strokeWidth="1.2" />
              {/* Colorful brocade ribbon band */}
              <rect x="166" y="80" width="68" height="10" fill="#C23B22" />
              <line x1="166" y1="85" x2="234" y2="85" stroke="#FFE599" strokeWidth="1.5" strokeDasharray="3,2" />
              {/* Downward sloped brim */}
              <path d="M166 90 L152 110 Q200 120 248 110 L234 90 Z" fill="#244B6E" stroke="#122538" strokeWidth="1.2" />
            </g>
          )}
        </g>

        {/* ========================================================
            LAYER 6: Accessories Layer
            ======================================================== */}
        <g id="layer-accessories">
          {/* Kiềng Bạc Hoa Sen */}
          {state.accessoryId === 'acc-kieng-bac' && (
            <g id="acc-kieng-bac">
              <path 
                d="M178 215 Q200 240 222 215" 
                stroke={`url(#${uid}-silver)`} 
                strokeWidth="5.5" 
                fill="none" 
                strokeLinecap="round" 
              />
              {/* Lotus engraved medallion at center */}
              <circle cx="200" cy="230" r="5" fill={`url(#${uid}-silver)`} stroke="#8A939E" strokeWidth="0.8" />
              <path d="M198 228 Q200 226 202 228 Q200 234 198 228 Z" fill="#8B0000" />
            </g>
          )}

          {/* Quạt Giấy Trầm Hương */}
          {state.accessoryId === 'acc-quat-tram' && (
            <g id="acc-quat-tram">
              {/* Handheld fan near right hip/chest */}
              <path 
                d="M245 350 L285 305 Q305 325 295 365 Z" 
                fill="#E8DFCE" 
                stroke="#BFA98A" 
                strokeWidth="1.2" 
              />
              <line x1="245" y1="350" x2="280" y2="310" stroke="#7A5633" strokeWidth="1.2" />
              <line x1="245" y1="350" x2="292" y2="330" stroke="#7A5633" strokeWidth="1.2" />
              <line x1="245" y1="350" x2="290" y2="355" stroke="#7A5633" strokeWidth="1.2" />
              {/* Red silk tassel */}
              <circle cx="245" cy="350" r="3" fill="#8B0000" />
              <path d="M245 350 L242 385" stroke="#C23B22" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Chuỗi Vòng Ngọc Bích */}
          {state.accessoryId === 'acc-chuoi-ngoc' && (
            <g id="acc-chuoi-ngoc">
              <path d="M176 215 Q200 255 224 215" stroke={`url(#${uid}-jade)`} strokeWidth="3.5" fill="none" strokeDasharray="3,3" />
              <circle cx="200" cy="240" r="4.5" fill={`url(#${uid}-jade)`} stroke="#1E4D43" strokeWidth="0.8" />
            </g>
          )}

          {/* Hoa Tai Búp Sen Vàng */}
          {state.accessoryId === 'acc-hoa-tai-vang' && (
            <g id="acc-hoa-tai-vang">
              <circle cx="163" cy="147" r="1.5" fill="#FFE599" />
              <path d="M163 148 L163 154" stroke="#D4AF37" strokeWidth="1" />
              <ellipse cx="163" cy="156" rx="2" ry="3.5" fill="#FFE599" stroke="#997A15" strokeWidth="0.6" />

              <circle cx="237" cy="147" r="1.5" fill="#FFE599" />
              <path d="M237 148 L237 154" stroke="#D4AF37" strokeWidth="1" />
              <ellipse cx="237" cy="156" rx="2" ry="3.5" fill="#FFE599" stroke="#997A15" strokeWidth="0.6" />
            </g>
          )}

          {/* Túi Gấm Thêu Tay */}
          {state.accessoryId === 'acc-tui-gam' && (
            <g id="acc-tui-gam">
              <path d="M136 365 Q130 405 138 425 Q150 425 152 405 L144 365 Z" fill="#8B0000" stroke={`url(#${uid}-gold-trim)`} strokeWidth="1.2" />
              <circle cx="144" cy="395" r="3" fill="#FFE599" />
              <path d="M136 365 Q140 350 144 365" stroke={`url(#${uid}-gold-trim)`} strokeWidth="1.2" fill="none" />
            </g>
          )}

          {/* Cành Hoa Sen Hồng Cầm Tay */}
          {state.accessoryId === 'acc-hoa-sen' && (
            <g id="acc-hoa-sen">
              {/* Green stem held in hand */}
              <path d="M260 410 L275 330" stroke="#3F5E4D" strokeWidth="3" strokeLinecap="round" />
              {/* Petals */}
              <ellipse cx="275" cy="325" rx="7" ry="12" fill="#E66A7D" />
              <ellipse cx="272" cy="327" rx="5" ry="10" fill="#FF8DA1" />
              <ellipse cx="278" cy="327" rx="5" ry="10" fill="#FF8DA1" />
              <circle cx="275" cy="324" r="3" fill="#FFE599" />
            </g>
          )}

          {/* Retro Tortoiseshell Sunglasses (Kính Râm Retro) */}
          {state.accessoryId === 'acc-kinh-ram-retro' && (
            <g id="acc-kinh-ram-modern">
              {/* Left dark round lens */}
              <circle cx="182" cy="133" r="8.5" fill="#1C1A18" stroke="#7A4B2A" strokeWidth="2" />
              <path d="M176 128 L184 136" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
              {/* Right dark round lens */}
              <circle cx="218" cy="133" r="8.5" fill="#1C1A18" stroke="#7A4B2A" strokeWidth="2" />
              <path d="M212 128 L220 136" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
              {/* Bridge between lenses */}
              <path d="M190.5 131 Q200 128 209.5 131" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
              {/* Outer frame temples */}
              <line x1="173.5" y1="133" x2="164" y2="132" stroke="#7A4B2A" strokeWidth="1.5" />
              <line x1="226.5" y1="133" x2="236" y2="132" stroke="#7A4B2A" strokeWidth="1.5" />
            </g>
          )}

          {/* Heritage Motif Canvas Tote (Túi Tote Canvas) */}
          {state.accessoryId === 'acc-tui-tote-canvas' && (
            <g id="acc-tui-tote-modern">
              {/* Shoulder straps */}
              <path d="M136 290 Q126 340 130 380 L146 380 Q142 340 148 290" stroke="#8A8275" strokeWidth="2" fill="none" />
              {/* Tote bag rectangular body */}
              <path d="M124 375 L160 375 L156 445 L120 445 Z" fill="#F4F1E8" stroke="#C2BAA8" strokeWidth="1.4" />
              {/* Subtle heritage lotus motif on bag */}
              <ellipse cx="140" cy="410" rx="8" ry="12" fill="#D4AF37" opacity="0.75" />
              <circle cx="140" cy="410" r="3" fill="#8B0000" />
            </g>
          )}

          {/* Hi-Fi Silver Over-Ear Headphones (Tai Nghe Chụp Tai Hi-Fi) */}
          {state.accessoryId === 'acc-tai-nghe-chup-tai' && (
            <g id="acc-tai-nghe-modern">
              {/* Headband draped comfortably around neck */}
              <path d="M174 195 Q200 235 226 195" stroke="#2B2D30" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M174 195 Q200 235 226 195" stroke={`url(#${uid}-silver)`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Left ear cup resting on collarbone */}
              <ellipse cx="170" cy="205" rx="8" ry="12" transform="rotate(-20 170 205)" fill="#1A1C1E" stroke={`url(#${uid}-silver)`} strokeWidth="1.8" />
              <circle cx="170" cy="205" r="3" fill="#8B0000" />
              {/* Right ear cup resting on collarbone */}
              <ellipse cx="230" cy="205" rx="8" ry="12" transform="rotate(20 230 205)" fill="#1A1C1E" stroke={`url(#${uid}-silver)`} strokeWidth="1.8" />
              <circle cx="230" cy="205" r="3" fill="#8B0000" />
            </g>
          )}
        </g>
      </svg>

      {/* Dynamic Layer Badge floating at bottom */}
      <div className="absolute bottom-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#D4AF37]/40 shadow-xs flex items-center space-x-1.5 text-[10px] font-mono text-stone-700 pointer-events-none">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: robeColor }} />
        <span className="font-semibold text-stone-900">{activeColor.nameVi}</span>
        <span className="text-stone-400">·</span>
        <span>2D Heritage Layered</span>
      </div>
    </div>
  );
};
