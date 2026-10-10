import React from 'react';
import { GuardrailItem } from '../../../shared/lib/guardrails';

export interface CulturalGuardrailProps {
  alerts: GuardrailItem[];
}

export const CulturalGuardrail: React.FC<CulturalGuardrailProps> = ({ alerts }) => {
  const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('vheritage_lang') || 'vi' : 'vi';
  const isEn = lang === 'en';

  if (!alerts || alerts.length === 0) {
    return null;
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
