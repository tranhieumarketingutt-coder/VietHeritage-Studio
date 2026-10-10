/**
 * Detailed sartorial features for a historical dynasty silhouette.
 */
export interface DynastyFeatures {
  collarVi: string;
  collarEn: string;
  sleevesVi: string;
  sleevesEn: string;
  hemlineVi: string;
  hemlineEn: string;
  hairAccessoryVi: string;
  hairAccessoryEn: string;
}

/**
 * Historical timeline entry representing a dynasty's silhouette evolution.
 */
export interface DynastyTimelineItem {
  id: string;
  dynastyVi: string;
  dynastyEn: string;
  period: string;
  centuryVi: string;
  centuryEn: string;
  taglineVi: string;
  taglineEn: string;
  signatureCostumeVi: string;
  signatureCostumeEn: string;
  silhouetteTypeVi: string;
  silhouetteTypeEn: string;
  features: DynastyFeatures;
  philosophyVi: string;
  philosophyEn: string;
  archeologySourceVi: string;
  archeologySourceEn: string;
  accentColor: string;
  primaryCostumeId: string;
  svgSilhouette: string;
  imageUrl?: string;
}
