import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { COSTUMES_DATA } from '../src/shared/data/costumes.ts';
import { ANATOMY_PRESETS } from '../src/features/anatomy/data/anatomyPresets.ts';
import { DYNASTIES_TIMELINE_DATA } from '../src/features/timeline/data/dynastiesTimeline.ts';
import { CULTURAL_WISDOM_SNIPPETS } from '../src/features/wisdom/data/wisdomSnippets.ts';
import { LEAFLET_MARKERS } from '../src/features/heritage-map/data/leafletMarkers.ts';
import { vi } from '../src/shared/i18n/vi.ts';
import { en } from '../src/shared/i18n/en.ts';

describe('Milestone 2 & 3: Craftsmanship, Layout, Typography & Cultural Authenticity', () => {

  describe('Hard Gate R-02: Zero Em Dashes Across All Source and Data Files', () => {
    it('verifies 0 em dashes in COSTUMES_DATA', () => {
      const costumesJson = JSON.stringify(COSTUMES_DATA);
      assert.ok(!costumesJson.includes('—'), 'COSTUMES_DATA must not contain any em dash (—)');
    });

    it('verifies 0 em dashes in ANATOMY_PRESETS', () => {
      const presetsJson = JSON.stringify(ANATOMY_PRESETS);
      assert.ok(!presetsJson.includes('—'), 'ANATOMY_PRESETS must not contain any em dash (—)');
    });

    it('verifies 0 em dashes in DYNASTIES_TIMELINE_DATA and CULTURAL_WISDOM_SNIPPETS', () => {
      const timelineJson = JSON.stringify(DYNASTIES_TIMELINE_DATA);
      const wisdomJson = JSON.stringify(CULTURAL_WISDOM_SNIPPETS);
      assert.ok(!timelineJson.includes('—'), 'DYNASTIES_TIMELINE_DATA must not contain any em dash (—)');
      assert.ok(!wisdomJson.includes('—'), 'CULTURAL_WISDOM_SNIPPETS must not contain any em dash (—)');
    });

    it('scans all source files in src/ recursively and verifies 0 em dashes', () => {
      function scanDir(dir: string): string[] {
        let files: string[] = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            files = files.concat(scanDir(fullPath));
          } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.css') || entry.name.endsWith('.html'))) {
            files.push(fullPath);
          }
        }
        return files;
      }

      const srcFiles = scanDir(path.resolve(process.cwd(), 'src'));
      const filesWithEmDash: string[] = [];

      for (const file of srcFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('—')) {
          filesWithEmDash.push(path.relative(process.cwd(), file));
        }
      }

      assert.deepEqual(filesWithEmDash, [], `Found em dashes in files: ${filesWithEmDash.join(', ')}`);
    });
  });

  describe('R-06 & R3: Editorial Typography & Responsive Layout', () => {
    it('verifies index.html links Google Fonts Playfair Display and Noto Serif', () => {
      const htmlPath = path.resolve(process.cwd(), 'index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

      assert.ok(htmlContent.includes('fonts.googleapis.com'), 'index.html must include Google Fonts link');
      assert.ok(htmlContent.includes('Playfair+Display'), 'index.html must load Playfair Display');
      assert.ok(htmlContent.includes('Noto+Serif'), 'index.html must load Noto Serif');
    });

    it('verifies src/index.css defines font-serif cascading token and utility', () => {
      const cssPath = path.resolve(process.cwd(), 'src/index.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');

      assert.ok(cssContent.includes('--font-serif'), 'src/index.css must declare --font-serif variable');
      assert.ok(cssContent.includes('.font-serif'), 'src/index.css must provide .font-serif utility');
    });

    it('verifies HeroSection applies font-serif and removes whitespace-nowrap for 320px wrapping', () => {
      const heroPath = path.resolve(process.cwd(), 'src/features/home/components/HeroSection.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');

      assert.ok(heroContent.includes('font-serif'), 'HeroSection heading must have font-serif class');
      assert.ok(!heroContent.includes('whitespace-nowrap'), 'HeroSection must not have whitespace-nowrap preventing 320px wrapping');
    });

    it('verifies StylingResults grid is balanced at 12 columns with guided Empty State', () => {
      const stylingPath = path.resolve(process.cwd(), 'src/features/studio/components/StylingResults.tsx');
      const stylingContent = fs.readFileSync(stylingPath, 'utf-8');

      assert.ok(stylingContent.includes('md:col-span-5'), 'Left column must use md:col-span-5');
      assert.ok(stylingContent.includes('md:col-span-7'), 'Right column must use md:col-span-7');
      assert.ok(stylingContent.includes('Không Gian Phối Màu & Điển Chế Phục Trang'), 'StylingResults must render guided Empty State');
      assert.ok(stylingContent.includes('Palette className='), 'Empty State must include Palette icon');
    });

    it('verifies Heritage Map container has responsive heights without horizontal blowout', () => {
      const mapPath = path.resolve(process.cwd(), 'src/features/heritage-map/components/MapSection.tsx');
      const mapContent = fs.readFileSync(mapPath, 'utf-8');

      assert.ok(mapContent.includes('h-[380px] sm:h-[480px] lg:h-[600px]'), 'Map container must have responsive height breakpoints');
      assert.ok(mapContent.includes('overflow-hidden'), 'Map container must have overflow-hidden to prevent layout blowout');
    });
  });

  describe('R-04: Icon Migration to Native Lucide React', () => {
    it('verifies zero occurrences of <i data-lucide in src/', () => {
      function scanDir(dir: string): string[] {
        let files: string[] = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            files = files.concat(scanDir(fullPath));
          } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
            files.push(fullPath);
          }
        }
        return files;
      }

      const srcFiles = scanDir(path.resolve(process.cwd(), 'src'));
      const deadIconFiles: string[] = [];

      for (const file of srcFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('data-lucide')) {
          deadIconFiles.push(path.relative(process.cwd(), file));
        }
      }

      assert.deepEqual(deadIconFiles, [], `Found dead data-lucide tags in: ${deadIconFiles.join(', ')}`);
    });

    it('verifies native Lucide icons in Navbar and HeroSection', () => {
      const navContent = fs.readFileSync(path.resolve(process.cwd(), 'src/shared/components/Navbar.tsx'), 'utf-8');
      const heroContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/home/components/HeroSection.tsx'), 'utf-8');

      assert.ok(navContent.includes('Landmark') && navContent.includes('Palette'), 'Navbar must import Landmark and Palette');
      assert.ok(heroContent.includes('Landmark') && heroContent.includes('Palette'), 'HeroSection must import Landmark and Palette');
    });

    it('verifies native Lucide icons in TimelineSection and WisdomCarousel', () => {
      const timelineContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/timeline/components/TimelineSection.tsx'), 'utf-8');
      const wisdomContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/wisdom/components/WisdomCarousel.tsx'), 'utf-8');

      assert.ok(timelineContent.includes('Columns2'), 'TimelineSection must import Columns2');
      assert.ok(timelineContent.includes('Scissors'), 'TimelineSection must import Scissors');
      assert.ok(timelineContent.includes('BookOpen'), 'TimelineSection must import BookOpen');

      assert.ok(wisdomContent.includes('Shuffle'), 'WisdomCarousel must import Shuffle');
      assert.ok(wisdomContent.includes('Copy'), 'WisdomCarousel must import Copy');
      assert.ok(wisdomContent.includes('Check'), 'WisdomCarousel must import Check');
      assert.ok(wisdomContent.includes('ArrowRight'), 'WisdomCarousel must import ArrowRight');
    });
  });

  describe('R-26 / C-2: Interactive Wiring across All Sections', () => {
    it('verifies DYNASTIES_TIMELINE_DATA completeness and compare mode wiring in TimelineSection', () => {
      assert.equal(DYNASTIES_TIMELINE_DATA.length, 5, 'Timeline must cover 5 dynasties');
      for (const d of DYNASTIES_TIMELINE_DATA) {
        assert.ok(d.id, 'Dynasty must have id');
        assert.ok(d.period, 'Dynasty must have period');
        assert.ok(d.dynastyVi, 'Dynasty must have dynastyVi');
        assert.ok(d.philosophyVi, 'Dynasty must have philosophyVi');
        assert.ok(d.archeologySourceVi, 'Dynasty must have archeologySourceVi');
      }

      const timelineContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/timeline/components/TimelineSection.tsx'), 'utf-8');
      assert.ok(timelineContent.includes('btnToggleTimelineCompare'), 'TimelineSection must wire #btnToggleTimelineCompare');
      assert.ok(timelineContent.includes('isCompareMode'), 'TimelineSection must track isCompareMode state');
      assert.ok(timelineContent.includes('selectedDynastyId'), 'TimelineSection must track selectedDynastyId state');
    });

    it('verifies CULTURAL_WISDOM_SNIPPETS completeness and interactive buttons in WisdomCarousel', () => {
      assert.ok(CULTURAL_WISDOM_SNIPPETS.length >= 6, 'Wisdom snippets must have at least 6 quotes');
      for (const w of CULTURAL_WISDOM_SNIPPETS) {
        assert.ok(w.id, 'Wisdom must have id');
        assert.ok(w.titleVi, 'Wisdom must have titleVi');
        assert.ok(w.factVi, 'Wisdom must have factVi');
        assert.ok(w.philosophyVi, 'Wisdom must have philosophyVi');
        assert.ok(w.source, 'Wisdom must have source');
      }

      const wisdomContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/wisdom/components/WisdomCarousel.tsx'), 'utf-8');
      assert.ok(wisdomContent.includes('btnRandomWisdom'), 'WisdomCarousel must wire #btnRandomWisdom');
      assert.ok(wisdomContent.includes('btnCopyWisdom'), 'WisdomCarousel must wire #btnCopyWisdom');
      assert.ok(wisdomContent.includes('btnNextWisdom'), 'WisdomCarousel must wire #btnNextWisdom');
      assert.ok(wisdomContent.includes('navigator.clipboard.writeText'), 'WisdomCarousel must copy quote to clipboard');
      assert.ok(wisdomContent.includes('Đã sao chép'), 'WisdomCarousel must provide visual copied confirmation');
    });

    it('verifies LEAFLET_MARKERS regionId assignments and filter logic in MapSection', () => {
      assert.equal(LEAFLET_MARKERS.length, 7, 'Map markers must have 7 items');
      
      for (const m of LEAFLET_MARKERS) {
        assert.ok(m.regionId, `Marker ${m.id} must possess a defined regionId`);
        assert.ok(m.lat && m.lng, `Marker ${m.id} must have valid coordinates`);
        assert.ok(m.labelVi, `Marker ${m.id} must have labelVi`);
      }

      // Region filtering behavior checks
      const sovereignMarkers = LEAFLET_MARKERS.filter(m => m.regionId === 'hoang-sa-truong-sa');
      assert.equal(sovereignMarkers.length, 2, 'Hoang Sa - Truong Sa must have 2 markers');

      const bacBoMarkers = LEAFLET_MARKERS.filter(m => m.regionId === 'bac-bo');
      assert.equal(bacBoMarkers.length, 1, 'Bac Bo must have 1 marker (Hanoi)');

      const mapContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/heritage-map/components/MapSection.tsx'), 'utf-8');
      assert.ok(mapContent.includes('activeRegId'), 'MapSection must track activeRegId');
      assert.ok(mapContent.includes('filteredMarkers'), 'MapSection must compute filteredMarkers');
      assert.ok(mapContent.includes('filteredMarkers.length'), 'MapSection must dynamically display filtered count');
    });

    it('verifies AnatomySection wires 4K photo reference lightbox dialog', () => {
      const anatomyContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/anatomy/components/AnatomySection.tsx'), 'utf-8');
      assert.ok(anatomyContent.includes('isLightboxOpen'), 'AnatomySection must track isLightboxOpen state');
      assert.ok(anatomyContent.includes('role="dialog"'), 'Lightbox must declare role="dialog"');
      assert.ok(anatomyContent.includes('aria-modal="true"'), 'Lightbox must declare aria-modal="true"');
      assert.ok(anatomyContent.includes('Ảnh Chụp Đối Chiếu'), 'AnatomySection must have button trigger for 4K photo reference');
    });
  });

  describe('R-27 / C-4 & R-16: Cultural Decorum, Guardrails & Authentic Microcopy', () => {
    it('verifies CulturalGuardrail renders 100% decorum badge when zero alerts', () => {
      const guardrailContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/studio/components/CulturalGuardrail.tsx'), 'utf-8');
      assert.ok(guardrailContent.includes('ĐẠT CHUẨN MỰC ĐIỂN CHẾ 100%'), 'CulturalGuardrail must render 100% decorum badge on clean outfits');
    });

    it('verifies WardrobeModal has delete confirmation before item removal', () => {
      const wardrobeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/wardrobe/components/WardrobeModal.tsx'), 'utf-8');
      assert.ok(wardrobeContent.includes('confirmDeleteId'), 'WardrobeModal must track confirmDeleteId');
      assert.ok(wardrobeContent.includes('Xác nhận xóa?'), 'WardrobeModal must render inline delete confirmation prompt');
    });

    it('verifies VirtualTryOn maps raw slugs to localized Vietnamese destinations and authentic actions', () => {
      const tryOnContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/studio/components/VirtualTryOn.tsx'), 'utf-8');
      assert.ok(tryOnContent.includes('DESTINATION_LABELS'), 'VirtualTryOn must define DESTINATION_LABELS');
      assert.ok(tryOnContent.includes('Hoàng Thành Thăng Long'), 'VirtualTryOn must map Hoang Thanh');
      assert.ok(tryOnContent.includes('Phố Cổ Hội An'), 'VirtualTryOn must map Hoi An');
      assert.ok(tryOnContent.includes('Phục Dựng Diện Mạo Di Sản'), 'Action button must say Phục Dựng Diện Mạo Di Sản');
    });

    it('verifies ChatDrawer uses authentic Vietnamese titles and historical research prompts', () => {
      const chatContent = fs.readFileSync(path.resolve(process.cwd(), 'src/features/chat/components/ChatDrawer.tsx'), 'utf-8');
      assert.ok(chatContent.includes('Cố Vấn Điển Chế Phục Trang'), 'ChatDrawer title must be Cố Vấn Điển Chế Phục Trang');
      assert.ok(chatContent.includes('Tra cứu Điển chế & Sử liệu'), 'ChatDrawer badge must be Tra cứu Điển chế & Sử liệu');
      assert.ok(!chatContent.includes('Thinking Mode: High'), 'ChatDrawer must purge Thinking Mode: High');
    });

    it('verifies i18n dictionaries (vi.ts and en.ts) have purged AI buzzwords', () => {
      assert.equal(vi.navHub2, 'HUB 2: XƯỞNG SÁNG TẠO DI SẢN');
      assert.equal(en.navHub2, 'HUB 2: HERITAGE CO-CREATION STUDIO');
      assert.equal(vi.tryOnHeroBtn, 'Phối Màu Sắc Tố Tự Nhiên');
      assert.equal(en.tryOnHeroBtn, 'Natural Dye & Palette Styling');
      assert.equal(vi.studioTitle, 'V-Studio: Xưởng Sáng Tạo Di Sản & Điển Chế Phục Trang');
      assert.equal(en.studioTitle, 'V-Studio: Heritage Co-Creation Studio & Contextual Styling');
      assert.equal(vi.btnAnalyze, 'Phục Dựng & Phân Tích Sắc Tố');
      assert.equal(en.btnAnalyze, 'Analyze Palette & Heritage Styling');
      assert.equal(vi.chatDrawerTitle, 'Cố Vấn Điển Chế Phục Trang');
      assert.equal(en.chatDrawerTitle, 'Heritage Cultural Advisor');
    });
  });

});
