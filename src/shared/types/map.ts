/**
 * Heritage venue, museum, photo coordinate, or rental atelier location.
 */
export interface MapLocation {
  id: string;
  nameVi: string;
  nameEn?: string;
  type: string;
  categoryVi: string;
  categoryEn?: string;
  region: 'Hà Nội' | 'Huế' | 'Đà Nẵng' | 'Hội An' | 'TP. Hồ Chí Minh' | string;
  address: string;
  hours: string;
  priceVi: string;
  priceEn?: string;
  featuresVi: string;
  featuresEn?: string;
  mapQuery?: string;
}

/**
 * Geographic center coordinate and map view parameters.
 */
export interface RegionCoordinates {
  lat: number;
  lng: number;
  zoom: number;
  labelVi: string;
  labelEn: string;
}

/**
 * Contextual relationship between a costume and a geographic region.
 */
export interface CostumeHighlight {
  costumeId: string;
  reasonVi: string;
}

/**
 * Cultural and geographic region definition with costume relationships.
 */
export interface VietnamRegion {
  id: string;
  nameVi: string;
  nameEn: string;
  tagVi: string;
  tagEn: string;
  eraVi: string;
  eraEn: string;
  color: string;
  icon: string;
  coords: RegionCoordinates;
  descriptionVi: string;
  descriptionEn: string;
  craftVillagesVi: string;
  craftVillagesEn: string;
  provincesVi: string[];
  costumeIds: string[];
  costumeHighlightsVi: CostumeHighlight[];
}

/**
 * Interactive provincial coordinate hotspot on the heritage map.
 */
export interface ProvinceHotspot {
  id: string;
  provinceVi: string;
  provinceEn: string;
  regionId: string;
  top: number;
  left: number;
  isMajor: boolean;
  hasCostume: boolean;
  icon: string;
  costumeId: string | null;
  costumeVi: string;
  costumeEn: string;
  craftVi: string;
  craftEn: string;
  descVi: string;
  descEn: string;
}

/**
 * Dictionary mapping province or territory names to cultural region identifiers.
 */
export type ProvinceToRegionMap = Record<string, string>;
