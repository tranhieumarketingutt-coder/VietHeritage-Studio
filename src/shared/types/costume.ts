/**
 * Macro hotspot coordinate and description on a costume photograph.
 */
export interface CostumeMacroHotspot {
  id: string;
  x: number;
  y: number;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: string;
}

/**
 * Editorial or historical gallery item with bilingual captions.
 */
export interface GalleryItem {
  titleVi: string;
  titleEn: string;
  tagVi: string;
  tagEn: string;
  contextVi: string;
  contextEn: string;
  imageUrl: string;
}

/**
 * Historical photography posing and styling instructions.
 */
export interface PosingGuide {
  poseTitleVi: string;
  poseTitleEn: string;
  poseInstructionVi: string;
  poseInstructionEn: string;
  cameraTipsVi: string;
  cameraTipsEn: string;
  accessoriesVi: string;
  accessoriesEn: string;
}

/**
 * Realistic photography metadata, hotspots, and curated visual assets.
 */
export interface RealPhotography {
  locationVi: string;
  locationEn: string;
  photoTitleVi: string;
  photoTitleEn: string;
  shootingNotesVi: string;
  shootingNotesEn: string;
  heroPhoto: string;
  frontPhoto?: string;
  backPhoto?: string;
  gallery: GalleryItem[];
  editorialQuoteVi: string;
  editorialQuoteEn: string;
  macroHotspots: CostumeMacroHotspot[];
  posingGuide: PosingGuide;
}

/**
 * Tailoring structure and anatomical highlights of a costume.
 */
export interface CostumeAnatomyHighlights {
  panelsVi: string;
  panelsEn: string;
  collarVi: string;
  collarEn: string;
  buttonsVi: string;
  buttonsEn: string;
  seamVi: string;
  seamEn: string;
}

/**
 * Comprehensive master costume data structure.
 */
export interface CostumeData {
  id: string;
  nameVi: string;
  nameEn: string;
  era: string;
  eraCategory: string;
  form: string;
  colors: string[];
  shortDescVi: string;
  shortDescEn: string;
  detailsVi: string;
  detailsEn: string;
  anatomyHighlights: CostumeAnatomyHighlights;
  fabricsVi: string;
  fabricsEn: string;
  philosophyVi: string;
  philosophyEn: string;
  genzStylingVi: string;
  genzStylingEn: string;
  youtubeId: string;
  realPhotography: RealPhotography;
  svgIllustration: string;
}
