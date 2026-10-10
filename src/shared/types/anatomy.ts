/**
 * Headwear configuration and graphic representation for an anatomy preset.
 */
export interface AnatomyHeadwear {
  svg: string;
  labelVi: string;
  labelEn: string;
}

/**
 * Layer descriptor for costume deconstruction.
 */
export interface AnatomyLayer {
  id: string;
  labelVi: string;
  labelEn: string;
}

/**
 * Interactive hotspot detailing tailored anatomy points and cultural symbolism.
 */
export interface AnatomyHotspot {
  id: string;
  pos: string;
  color: string;
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  contentVi: string;
  contentEn: string;
  philosophyVi: string;
  philosophyEn: string;
  tailoringVi: string;
  tailoringEn: string;
  quickLabelVi: string;
  quickLabelEn: string;
  quickSubVi: string;
  quickSubEn: string;
}

/**
 * Complete 2D layered anatomy preset for a Vietnamese heritage costume.
 */
export interface AnatomyPreset {
  id: string;
  nameVi: string;
  nameEn: string;
  eraVi: string;
  eraEn: string;
  headwear: AnatomyHeadwear;
  layers: AnatomyLayer[];
  innerSvg: string;
  midSvg: string;
  flapLeftSvg: string;
  flapRightSvg: string;
  hotspots: AnatomyHotspot[];
}
