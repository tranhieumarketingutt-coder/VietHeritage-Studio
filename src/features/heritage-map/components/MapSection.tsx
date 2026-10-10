import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { VIETNAM_REGIONS_DATA } from '../../../costumes';
import { ProvinceHotspot } from './ProvinceHotspot';

/**
 * Props for the MapSection component.
 */
export interface MapSectionProps {
  lang: 'vi' | 'en';
}

import { LEAFLET_MARKERS } from '../data/leafletMarkers';
export { LEAFLET_MARKERS };

/**
 * MapSection component displaying an interactive leaflet map of Vietnam's heritage costumes and regions.
 */
export const MapSection: React.FC<MapSectionProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const [activeRegId, setActiveRegId] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(true);
  const [onlyCostumes, setOnlyCostumes] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  
  const filteredMarkers = LEAFLET_MARKERS.filter(marker => {
    if (activeRegId !== 'all' && marker.regionId !== activeRegId) {
      return false;
    }
    if (!showAll && marker.type !== 'city') {
      return false;
    }
    return true;
  });

  return (
    <section id="vietnamCostumeMapSection" className="bg-white rounded-2xl border border-[#D4AF37]/40 p-6 md:p-10 shadow-sm relative overflow-hidden space-y-8">
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#8B0000]/5 pointer-events-none blur-2xl"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{isEn ? 'GEOGRAPHICAL HERITAGE · VIETNAM COSTUME ATLAS' : 'ĐỊA LÝ DI SẢN · BẢN ĐỒ CỔ PHỤC VIỆT NAM'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">
            {isEn ? '63 Provinces & Maritime Territories Costume Atlas' : 'Bản Đồ Cổ Phục 63 Tỉnh Thành & Biển Đảo Việt Nam'}
          </h2>
          <p className="text-sm text-[#666666] mt-1 max-w-2xl font-sans leading-relaxed">
            {isEn 
              ? 'Comprehensive interactive map with cultural hotspots matching the official territorial geography of Vietnam. Click any province or sacred island pin to discover native costumes, weaving crafts, and history.' 
              : 'Bản đồ tương tác chi tiết với các tọa độ di sản khớp chuẩn xác theo địa lý lãnh thổ Việt Nam. Nhấp vào bất kỳ tỉnh thành hoặc hải đảo thiêng liêng nào để khám phá cổ phục, làng nghề dệt lụa và sử liệu triết học.'}
          </p>
        </div>

        <div className="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveRegId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${activeRegId === 'all' ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'}`}
          >
            <span>{isEn ? 'All Regions' : 'Toàn Quốc'}</span>
          </button>
          {VIETNAM_REGIONS_DATA.map(reg => (
            <button 
              key={reg.id}
              onClick={() => setActiveRegId(reg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${activeRegId === reg.id ? 'bg-[#8B0000] text-white font-bold shadow-sm' : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'}`}
            >
              <span>{isEn ? reg.nameEn.split('(')[0].trim() : reg.nameVi.split('(')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/40 p-4 md:p-6 shadow-sm relative flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono mb-3 pb-3 border-b border-stone-200">
            <span className="flex items-center space-x-1.5 font-bold text-[#8B0000]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isEn ? 'Vietnam Heritage Map' : 'Bản Đồ Cổ Phục Chuẩn Xác'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8B0000]/10 text-[#8B0000] font-mono">
                {filteredMarkers.length} điểm
              </span>
            </span>

            <div className="flex items-center space-x-1.5 flex-wrap justify-end">
              <button 
                onClick={() => setShowAll(!showAll)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${showAll ? 'bg-[#8B0000] text-white' : 'bg-white border border-stone-300 text-stone-700'} shadow-sm flex items-center space-x-1`}
              >
                <span>{showAll ? (isEn ? 'All' : 'Tất cả') : (isEn ? 'Key Hubs' : 'Tiêu biểu')}</span>
              </button>
              <button 
                onClick={() => setShowLabels(!showLabels)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${showLabels ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-white border border-stone-300 text-stone-600'} shadow-sm flex items-center space-x-1`}
              >
                <span>{showLabels ? (isEn ? 'Labels On' : 'Nhãn: Bật') : (isEn ? 'Labels Off' : 'Nhãn: Tắt')}</span>
              </button>
            </div>
          </div>

          <div className="w-full relative rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-inner h-[380px] sm:h-[480px] lg:h-[600px] z-10">
            <MapContainer 
              center={[16.0, 108.5]} 
              zoom={5.5} 
              minZoom={4}
              maxZoom={15}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a> · VietHeritage Remix'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
              />
              
              {filteredMarkers.map(marker => (
                <ProvinceHotspot 
                  key={marker.id}
                  type={marker.type}
                  lat={marker.lat}
                  lng={marker.lng}
                  labelVi={marker.labelVi}
                  labelEn={marker.labelEn}
                  initial={marker.initial}
                  color={marker.color}
                  popupTitleVi={marker.popupTitleVi}
                  popupTitleEn={marker.popupTitleEn}
                  popupDescVi={marker.popupDescVi}
                  popupDescEn={marker.popupDescEn}
                  lang={lang}
                  onSelect={() => console.log('Selected', marker.id)}
                />
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
