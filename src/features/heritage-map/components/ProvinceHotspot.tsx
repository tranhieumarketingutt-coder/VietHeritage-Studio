import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

/**
 * Props for the ProvinceHotspot component.
 */
export interface ProvinceHotspotProps {
  type: 'sovereign' | 'city';
  lat: number;
  lng: number;
  labelVi: string;
  labelEn: string;
  initial?: string;
  color?: string;
  popupTitleVi: string;
  popupTitleEn: string;
  popupDescVi: string;
  popupDescEn: string;
  lang: 'vi' | 'en';
  onSelect: () => void;
}

/**
 * Component representing a marker hotspot on the map.
 */
export const ProvinceHotspot: React.FC<ProvinceHotspotProps> = ({
  type, lat, lng, labelVi, labelEn, initial, color, popupTitleVi, popupTitleEn, popupDescVi, popupDescEn, lang, onSelect
}) => {
  const isEn = lang === 'en';

  const icon = type === 'sovereign'
    ? L.divIcon({
        className: 'custom-sovereignty-pin',
        html: `
          <div style="background:#8B0000;color:#FFD700;border:2px solid #FFD700;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:bold;box-shadow:0 0 10px rgba(255,215,0,0.85);cursor:pointer;" title="${isEn ? labelEn : labelVi}">
            ★
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    : L.divIcon({
        className: 'custom-city-pin',
        html: `
          <div style="background:${color || '#8B0000'};color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;box-shadow:0 1px 5px rgba(0,0,0,0.3);cursor:pointer;">
            ${initial || '📍'}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

  return (
    <Marker 
      position={[lat, lng]} 
      icon={icon} 
      eventHandlers={{ click: onSelect }}
    >
      <Popup>
        <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", padding: '4px' }}>
          <div style={{ color: '#8B0000', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #D4AF37', paddingBottom: '3px', marginBottom: '4px' }}>
            {type === 'sovereign' ? '🇻🇳 ' : ''}{isEn ? popupTitleEn : popupTitleVi}
          </div>
          <div style={{ fontSize: '11px', color: '#222', fontWeight: 600 }}>
            {isEn ? labelEn : labelVi}
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
            {isEn ? popupDescEn : popupDescVi}
          </div>
          <button 
            style={{ marginTop: '6px', background: '#8B0000', color: 'white', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', cursor: 'pointer' }}
            onClick={onSelect}
          >
            {isEn ? 'View Costumes Here →' : 'Xem Cổ Phục Vùng Này →'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
