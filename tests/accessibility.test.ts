import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { useFocusTrap } from "../src/shared/hooks/useFocusTrap.ts";

/**
 * Calculates relative luminance following WCAG 2.2 specs.
 */
function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates WCAG 2.2 contrast ratio between two hex colors.
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Accessibility & Human Factor Refactor (M1)", () => {
  it("exports useFocusTrap hook as a callable function", () => {
    assert.equal(typeof useFocusTrap, "function");
  });

  it("verifies WCAG 2.2 AA contrast ratios for updated theme palette", () => {
    const linen = "#FAF7F2";
    const white = "#FFFFFF";
    const crimson = "#8B0000";
    const charcoal = "#222222";
    const oldGold = "#D4AF37";
    const darkGold = "#8A6D1C";
    const stone600 = "#57534E";

    // Old gold fails AA on light background (< 4.5:1)
    const oldGoldLinenContrast = getContrastRatio(oldGold, linen);
    assert.ok(oldGoldLinenContrast < 4.5, `Old gold on linen should fail AA: ${oldGoldLinenContrast}`);

    // Dark gold passes AA on linen and white (>= 4.5:1)
    const darkGoldLinenContrast = getContrastRatio(darkGold, linen);
    const darkGoldWhiteContrast = getContrastRatio(darkGold, white);
    assert.ok(darkGoldLinenContrast >= 4.5, `Dark gold on linen must pass AA (>=4.5): ${darkGoldLinenContrast}`);
    assert.ok(darkGoldWhiteContrast >= 4.5, `Dark gold on white must pass AA (>=4.5): ${darkGoldWhiteContrast}`);

    // Gold on crimson and charcoal preserves passing contrast
    const goldCrimsonContrast = getContrastRatio(oldGold, crimson);
    const goldCharcoalContrast = getContrastRatio(oldGold, charcoal);
    assert.ok(goldCrimsonContrast >= 4.5, `Gold on crimson must pass AA (>=4.5): ${goldCrimsonContrast}`);
    assert.ok(goldCharcoalContrast >= 7.0, `Gold on charcoal must pass AAA (>=7.0): ${goldCharcoalContrast}`);

    // Stone-600 on white passes AAA
    const stone600WhiteContrast = getContrastRatio(stone600, white);
    assert.ok(stone600WhiteContrast >= 7.0, `Stone-600 on white must pass AAA (>=7.0): ${stone600WhiteContrast}`);
  });

  it("verifies src/index.css includes focus-visible, reduced-motion, and theme tokens", () => {
    const cssPath = path.resolve(process.cwd(), "src/index.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Tokens
    assert.ok(cssContent.includes("--color-gold-dark: #8A6D1C"), "Must declare --color-gold-dark token");
    assert.ok(cssContent.includes("--color-bronze: #8A6D1C"), "Must declare --color-bronze token");

    // Focus visible dual-ring indicator
    assert.ok(cssContent.includes(":focus-visible"), "Must declare :focus-visible ruleset");
    assert.ok(cssContent.includes("outline: 2px solid #8B0000"), "Focus visible must have 2px #8B0000 solid outline");
    assert.ok(cssContent.includes("rgba(212, 175, 55, 0.45)"), "Focus visible must have gold glow box-shadow");

    // Prefers-reduced-motion reset
    assert.ok(cssContent.includes("prefers-reduced-motion: reduce"), "Must support prefers-reduced-motion media query");
    assert.ok(cssContent.includes("animation-duration: 0.01ms !important"), "Must reduce animation duration to 0.01ms");

    // Font override !important must be removed
    assert.ok(!cssContent.includes("font-family: 'Be Vietnam Pro', -apple-system"), "Universal font override !important must be purged");
  });

  it("verifies CostumeCard resolves nested interactive violations with semantic article and accessible CTA button", () => {
    const cardPath = path.resolve(process.cwd(), "src/features/museum/components/CostumeCard.tsx");
    const content = fs.readFileSync(cardPath, "utf-8");

    // Container must be semantic article, NOT role="button" or tabIndex={0}
    assert.ok(content.includes("<article"), "CostumeCard container must use semantic <article>");
    assert.ok(!content.includes('role="button"\n      tabIndex={0}'), "Outer container must not declare role='button' or tabIndex={0}");
    assert.ok(!content.includes("aria-label={isEn ? `Hồ sơ lịch sử:"), "Outer article must not have button-style aria-label");

    // Bottom CTA must be a dedicated accessible button
    assert.ok(content.includes('<button\n          type="button"\n          onClick={(e) => {\n            e.stopPropagation();\n            onOpenModal(c.id);'), "Bottom CTA must be explicit button");
    assert.ok(content.includes("aria-label={isEn ? `Xem hồ sơ lịch sử chi tiết"), "Bottom CTA button must have descriptive accessible name");
  });

  it("verifies VirtualTryOn implements WAI-ARIA APG roving tabindex and arrow navigation for radiogroups", () => {
    const vtoPath = path.resolve(process.cwd(), "src/features/studio/components/VirtualTryOn.tsx");
    const content = fs.readFileSync(vtoPath, "utf-8");

    // Roving tabindex on radio buttons
    assert.ok(content.includes("role=\"radiogroup\""), "Must contain radiogroup containers");
    assert.ok(content.includes("onKeyDown={handleCostumeKeyDown}"), "Costume radiogroup must attach key handler");
    assert.ok(content.includes("onKeyDown={handleDestinationKeyDown}"), "Destination radiogroup must attach key handler");
    assert.ok(content.includes("tabIndex={isSelected || (!state.selectedCostumeId && index === 0) ? 0 : -1}"), "Costume radio buttons must use roving tabindex");
    assert.ok(content.includes("tabIndex={isSelected || (!state.selectedDestination && index === 0) ? 0 : -1}"), "Destination radio buttons must use roving tabindex");

    // Arrow keys logic
    assert.ok(content.includes("e.key === 'ArrowRight' || e.key === 'ArrowDown'"), "Arrow keys navigation logic for forward traversal");
    assert.ok(content.includes("e.key === 'ArrowLeft' || e.key === 'ArrowUp'"), "Arrow keys navigation logic for backward traversal");
  });

  it("verifies Navbar exposes aria-current='page' for active navigation hub", () => {
    const navPath = path.resolve(process.cwd(), "src/shared/components/Navbar.tsx");
    const content = fs.readFileSync(navPath, "utf-8");

    // Desktop tabs
    assert.ok(content.includes("aria-current={activeHub === 'hub1' ? 'page' : undefined}"), "Hub 1 tab must communicate active state via aria-current");
    assert.ok(content.includes("aria-current={activeHub === 'hub2' ? 'page' : undefined}"), "Hub 2 tab must communicate active state via aria-current");
  });
});
