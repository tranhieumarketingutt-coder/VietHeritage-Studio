import React from 'react';
import { GuardrailItem } from '../../../shared/lib/guardrails';

export interface CulturalGuardrailProps {
  alerts: GuardrailItem[];
}

export const CulturalGuardrail: React.FC<CulturalGuardrailProps> = ({ alerts }) => {
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  if (!alerts || alerts.length === 0) {
    return (
      <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/80 text-emerald-900 text-xs font-mono flex items-center space-x-2.5 shadow-2xs">
        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
          ✓
        </span>
        <div>
          <span className="font-bold block tracking-wide">
            {isEn ? '✓ 100% CANONICAL DECORUM ACHIEVED' : '✓ ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%'}
          </span>
          <span className="text-[11px] font-sans text-emerald-800">
            {isEn
              ? 'Garment, lapels, and destination context fully comply with traditional statutes.'
              : 'Trang phục, cấu trúc nếp vạt và bối cảnh hoàn toàn chuẩn mực, trang nghiêm theo điển chế cổ truyền.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 pt-2">
      {alerts.map((alert, index) => {
        const isError = alert.severity === 'error';
        return (
          <div 
            key={`${alert.code}-${index}`} 
            className={`p-3 rounded-lg border flex items-start space-x-2 text-xs font-mono 
              ${isError ? 'bg-red-50 text-red-800 border-red-200 shadow-sm animate-shake' : 'bg-amber-50 text-amber-800 border-amber-200'}`}
          >
            <span className="text-base shrink-0">
              {isError ? '🚨' : '⚠️'}
            </span>
            <div className="flex-1">
              <span className="font-bold block uppercase mb-0.5">
                {isEn ? alert.titleEn : alert.titleVi || alert.titleEn}
              </span>
              <span className="text-[11px] leading-relaxed block font-sans">
                {isEn ? alert.messageEn : alert.messageVi || alert.messageEn}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
