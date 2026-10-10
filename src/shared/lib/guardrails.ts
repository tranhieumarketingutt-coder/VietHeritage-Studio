export interface OutfitConfig {
  costumeId?: string;
  bottomChoice?: string;
  collarChoice?: string;
  destination?: string;
  colorHex?: string;
}

export interface GuardrailItem {
  code: string;
  severity: 'error' | 'warning' | 'info';
  titleVi?: string;
  titleEn: string;
  messageVi?: string;
  messageEn?: string;
}

export interface GuardrailResult {
  score: number;
  guardrails: GuardrailItem[];
}

/**
 * Evaluates the chosen outfit configuration against traditional Vietnamese clothing guardrails.
 * @param config The user's selected outfit options.
 * @returns A result object containing the styling score and any generated guardrail items.
 */
export function evaluateGuardrails({ costumeId, bottomChoice, collarChoice, destination, colorHex }: OutfitConfig): GuardrailResult {
  const guardrails: GuardrailItem[] = [];
  let score = 98;


  if ((costumeId === 'ngu-than' || costumeId === 'nhat-binh' || costumeId === 'giao-linh' || costumeId === 'ao-dai') && bottomChoice === 'short') {
    score -= 45;
    guardrails.push({
      code: 'ERR_NGU_THAN_SHORT',
      severity: 'error',
      titleEn: '⚠️ Cultural Breach: Broken Decorum with Short Bottoms',
      messageVi: '⚠️ Cảnh báo: Áo Dài & Cổ phục truyền thống biểu trưng cho sự kín đáo, đoan trang. Phối với quần ngắn/váy ngắn phá vỡ triết lý văn hóa. Vui lòng chọn quần lụa dài qua mắt cá chân.',
      messageEn: 'Warning: The Ao Dai and traditional robes represent modesty and cultural decorum. Pairing with miniskirts/shorts violates decorum. Please select full-length silk trousers.'
    });
  }


  if (costumeId === 'giao-linh' && collarChoice === 'ta-nham') {
    score -= 40;
    guardrails.push({
      code: 'ERR_GIAO_LINH_TA',
      severity: 'error',
      titleEn: '⚠️ Critical Rule Breach: Ta Nham Lapel',
      messageVi: '⚠️ Lỗi sai nguyên tắc: Vạt Tả Nhậm chỉ dành cho người đã khuất. Trang phục Việt luôn tuân thủ Hữu Nhậm (vạt trái đè lên vạt phải).',
      messageEn: 'Critical Rule Error: Crossing right-over-left (Ta Nham) was reserved exclusively for funerary garments. Vietnamese tradition mandates left-over-right (Huu Nham).'
    });
  }


  if ((destination === 'chua-den' || destination === 'hoang-thanh' || destination === 'van-mieu') && bottomChoice === 'short') {
    score -= 30;
    guardrails.push({
      code: 'ERR_LOCATION_RESPECT',
      severity: 'error',
      titleEn: '⚠️ Sanctuary Etiquette Warning',
      messageVi: '⚠️ Lưu ý tôn nghiêm: Vui lòng chọn trang phục kín đáo như Áo Tấc hoặc Ngũ Thân tay chẽn khi đến di tích thờ cúng.',
      messageEn: 'Sanctuary Etiquette Note: Please select dignified, fully covered attire such as Ao Tac or formal Ngu Than when visiting sacred worship sites.'
    });
  }


  if (costumeId === 'nhat-binh' && (colorHex === '#D4AF37' || colorHex === 'yellow' || colorHex === '#FFD700')) {
    score -= 5;
    guardrails.push({
      code: 'WARN_ROYAL_YELLOW',
      severity: 'warning',
      titleEn: '💡 Imperial Decree: Royal Yellow Distinction',
      messageVi: '💡 Lưu ý lịch sử: Sắc Vàng Chính Sắc từng là phẩm phục độc quyền của Hoàng Hậu triều Nguyễn.',
      messageEn: 'Imperial History Note: Pure Yellow on Nhat Binh robes was strictly reserved for the Empress and Queen Mother of the Nguyen Dynasty.'
    });
  }

  score = Math.max(10, Math.min(100, score));

  return { score, guardrails };
}
