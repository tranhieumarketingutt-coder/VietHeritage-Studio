export type CharacterId = 'female-01' | 'male-01';

export type CostumeCategoryId = 'outfit' | 'headwear' | 'accessory' | 'hair' | 'bottom';

export type EventFilterId = 
  | 'all' 
  | 'tet' 
  | 'festival' 
  | 'wedding' 
  | 'cultural-day' 
  | 'performance' 
  | 'school' 
  | 'streetwear'
  | 'ceremony';

export type RegionFilterId = 
  | 'all' 
  | 'bac-bo' 
  | 'trung-bo' 
  | 'nam-bo' 
  | 'tay-bac' 
  | 'hien-dai'
  | 'toan-quoc';

export interface ColorOption {
  id: string;
  nameVi: string;
  nameEn: string;
  hex: string;
  secondaryHex: string;
  traditionalNameVi: string;
  traditionalNameEn: string;
  meaningVi: string;
  meaningEn: string;
}

export interface LayerItem {
  id: string;
  nameVi: string;
  nameEn: string;
  category: CostumeCategoryId;
  gender: 'female' | 'male' | 'unisex';
  region: RegionFilterId;
  events: EventFilterId[];
  eraVi: string;
  eraEn: string;
  shortDescVi: string;
  shortDescEn: string;
  culturalNoteVi: string;
  culturalNoteEn: string;
  defaultColorId: string;
  previewIcon?: string;
  relatedMuseumId?: string;
  isModern?: boolean;
}

export interface DressUpState {
  character: CharacterId;
  outfitId: string;
  colorId: string;
  hairId: string;
  headwearId: string | null;
  accessoryId: string | null;
  bottomId: string;
}

export interface SavedDressUpLook {
  id: string;
  title: string;
  createdAt: number;
  state: DressUpState;
  previewSummaryVi: string;
  previewSummaryEn: string;
}
