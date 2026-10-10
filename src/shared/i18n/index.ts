import { vi } from './vi';
import { en } from './en';

export type Language = 'vi' | 'en';
export type Translations = typeof vi;

export const I18N: Record<Language, Translations> = {
  vi,
  en
};
