import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { executeTryOnHandler } from "../server/handlers.ts";

describe("Virtual Try-On AI Flow & Studio Integration", () => {
  it("validates malformed payload returns status 400", async () => {
    const res = await executeTryOnHandler(null);
    assert.equal(res.statusCode, 400);
    assert.ok((res.data as Record<string, unknown>).error);
  });

  it("handles valid try-on input payload and returns structured response", async () => {
    const res = await executeTryOnHandler({
      costumeId: "ngu-than",
      costumeName: "Áo Ngũ Thân Tay Chẽn",
      colorHex: "#8B0000",
      destinationId: "hoang-thanh",
      gender: "vietnamese"
    });

    assert.equal(res.statusCode, 200);
    const data = res.data as {
      imageUrl?: string;
      model?: string;
      promptUsed?: string;
      isLive?: boolean;
      notes?: string;
    };
    assert.ok(data.imageUrl, "Must contain imageUrl");
    assert.ok(data.model, "Must contain model identifier");
    assert.ok(typeof data.isLive === "boolean", "Must define isLive flag");
    assert.ok(data.promptUsed, "Must contain generated prompt");
  });

  it("verifies StudioSection wires fetch to /api/gemini/try-on", () => {
    const content = fs.readFileSync(
      path.resolve(process.cwd(), "src/features/studio/components/StudioSection.tsx"),
      "utf-8"
    );
    assert.ok(
      content.includes("fetch('/api/gemini/try-on'"),
      "StudioSection must call /api/gemini/try-on"
    );
    assert.ok(
      content.includes("tryOnMeta"),
      "StudioSection must manage tryOnMeta state"
    );
    assert.ok(
      content.includes("dai-noi-hue"),
      "StudioSection must map dai-noi-hue destination correctly"
    );
    assert.ok(
      content.includes("chua-den"),
      "StudioSection must map chua-den destination correctly"
    );
  });

  it("verifies StylingResults renders tryOnMeta status banner and rotating progress steps", () => {
    const content = fs.readFileSync(
      path.resolve(process.cwd(), "src/features/studio/components/StylingResults.tsx"),
      "utf-8"
    );
    assert.ok(
      content.includes("tryOnMeta"),
      "StylingResults must accept tryOnMeta prop"
    );
    assert.ok(
      content.includes("ROTATING_TRY_ON_STEPS"),
      "StylingResults must define rotating progress steps"
    );
    assert.ok(
      content.includes("role=\"status\""),
      "StylingResults must include accessible status alert"
    );
  });

  it("verifies zero em dashes in newly modified files", () => {
    const files = [
      "src/features/studio/components/StudioSection.tsx",
      "src/features/studio/components/StylingResults.tsx",
      "server/geminiService.ts"
    ];
    const emDashRegex = /\u2014/;
    for (const file of files) {
      const code = fs.readFileSync(path.resolve(process.cwd(), file), "utf-8");
      assert.equal(
        emDashRegex.test(code),
        false,
        `File ${file} must contain zero em dashes`
      );
    }
  });
});
