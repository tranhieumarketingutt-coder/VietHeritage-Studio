import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  analyzePersonalColor,
  TRADITIONAL_DYES
} from "../src/shared/lib/personalColor.ts";

describe("analyzePersonalColor", () => {
  it("determines correct color profiles for all 4 seasons", () => {
    const seasons = [
      { input: "spring", key: "spring", expectedSeason: "Mùa Xuân (Spring - Warm)" },
      { input: "summer", key: "summer", expectedSeason: "Mùa Hạ (Summer - Cool)" },
      { input: "autumn", key: "autumn", expectedSeason: "Mùa Thu (Autumn - Warm)" },
      { input: "winter", key: "winter", expectedSeason: "Mùa Đông (Winter - Cool)" }
    ];

    for (const { input, key, expectedSeason } of seasons) {
      const result = analyzePersonalColor({ undertoneChoice: input });
      assert.equal(result.seasonKey, key);
      assert.equal(result.season, expectedSeason);
      assert.ok(result.paletteSuggestions.length > 0);
      assert.ok(result.dyeList.length > 0);
    }
  });

  it("falls back to autumn warm when undertone choice is missing or unknown", () => {
    const defaultResult = analyzePersonalColor({});
    assert.equal(defaultResult.seasonKey, "autumn");
    assert.equal(defaultResult.season, "Mùa Thu (Autumn - Warm)");

    const unknownResult = analyzePersonalColor({ undertoneChoice: "non-existent-undertone" });
    assert.equal(unknownResult.seasonKey, "autumn");
    assert.equal(unknownResult.season, "Mùa Thu (Autumn - Warm)");
  });

  it("provides tailored silhouette advice across body shapes", () => {
    const pearResult = analyzePersonalColor({ bodyShape: "pear" });
    assert.ok(pearResult.bodyAdviceVi.includes("Dáng Quả Lê"));
    assert.ok(pearResult.bodyAdviceEn.includes("Pear Shape"));

    const hourglassResult = analyzePersonalColor({ bodyShape: "hourglass" });
    assert.ok(hourglassResult.bodyAdviceVi.includes("Dáng Đồng Hồ Cát"));
    assert.ok(hourglassResult.bodyAdviceEn.includes("Hourglass Shape"));

    const invertedTriangleResult = analyzePersonalColor({ bodyShape: "inverted-triangle" });
    assert.ok(invertedTriangleResult.bodyAdviceVi.includes("Dáng Tam Giác Ngược"));
    assert.ok(invertedTriangleResult.bodyAdviceEn.includes("Inverted Triangle"));

    const rectangleResult = analyzePersonalColor({ bodyShape: "rectangle" });
    assert.ok(rectangleResult.bodyAdviceVi.includes("Dáng Thước Kẻ"));
    assert.ok(rectangleResult.bodyAdviceEn.includes("Rectangle Shape"));
  });

  it("maps traditional natural dyes with full bilingual metadata", () => {
    const requiredDyes = [
      "cu-den",
      "xanh-cham",
      "do-son",
      "hoang-yen",
      "xanh-com",
      "nau-gu"
    ] as const;

    for (const dyeKey of requiredDyes) {
      const dye = TRADITIONAL_DYES[dyeKey];
      assert.ok(dye, `Expected dye entry for ${dyeKey}`);
      assert.ok(dye.nameVi.length > 0);
      assert.ok(dye.nameEn.length > 0);
      assert.match(dye.hex, /^#[0-9A-Fa-f]{6}$/);
      assert.ok(dye.descVi.length > 0);
      assert.ok(dye.descEn.length > 0);
    }

    const springResult = analyzePersonalColor({ undertoneChoice: "spring" });
    assert.deepEqual(springResult.dyeList, [
      TRADITIONAL_DYES["hoang-yen"],
      TRADITIONAL_DYES["xanh-com"],
      TRADITIONAL_DYES["do-son"]
    ]);
  });
});
