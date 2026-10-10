import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateGuardrails } from "../src/shared/lib/guardrails.ts";

describe("evaluateGuardrails", () => {
  it("evaluates canon outfits with 0 breaches", () => {
    const result = evaluateGuardrails({
      costumeId: "ngu-than",
      bottomChoice: "quan-lua-trang",
      collarChoice: "huu-nham",
      destination: "pho-co"
    });
    assert.equal(result.guardrails.length, 0);
    assert.equal(result.score, 98);
  });

  it("triggers ERR_NGU_THAN_SHORT when bottomChoice is short for traditional costumes", () => {
    const traditionalCostumes = ["ngu-than", "nhat-binh", "giao-linh", "ao-dai"];

    for (const costumeId of traditionalCostumes) {
      const result = evaluateGuardrails({
        costumeId,
        bottomChoice: "short"
      });

      const breach = result.guardrails.find((item) => item.code === "ERR_NGU_THAN_SHORT");
      assert.ok(breach, `Expected ERR_NGU_THAN_SHORT for ${costumeId}`);
      assert.equal(breach.severity, "error");
    }
  });

  it("triggers ERR_GIAO_LINH_COLLAR when collarChoice is ta for giao-linh", () => {
    const result = evaluateGuardrails({
      costumeId: "giao-linh",
      collarChoice: "ta"
    });

    const collarBreach = result.guardrails.find((item) => item.code === "ERR_GIAO_LINH_COLLAR");
    assert.ok(collarBreach);
    assert.equal(collarBreach.severity, "error");
    assert.equal(result.score, 58);
  });

  it("enforces sacred destination decorum rules", () => {
    const sacredDestinations = ["chua-den", "hoang-thanh", "van-mieu"];

    for (const destination of sacredDestinations) {
      const violated = evaluateGuardrails({
        costumeId: "ao-ba-ba",
        bottomChoice: "short",
        destination
      });

      const respectBreach = violated.guardrails.find((item) => item.code === "ERR_LOCATION_RESPECT");
      assert.ok(respectBreach, `Expected ERR_LOCATION_RESPECT for ${destination}`);
      assert.equal(respectBreach.severity, "error");

      const compliant = evaluateGuardrails({
        costumeId: "ao-ba-ba",
        bottomChoice: "quan-dai",
        destination
      });

      const noRespectBreach = compliant.guardrails.some((item) => item.code === "ERR_LOCATION_RESPECT");
      assert.equal(noRespectBreach, false);
    }
  });

  it("calculates cumulative score reductions and clamps to lower bound", () => {
    const singleBreach = evaluateGuardrails({
      costumeId: "ngu-than",
      bottomChoice: "short"
    });
    assert.equal(singleBreach.score, 53);

    const royalWarning = evaluateGuardrails({
      costumeId: "nhat-binh",
      colorHex: "#D4AF37"
    });
    assert.equal(royalWarning.score, 93);

    const multipleBreaches = evaluateGuardrails({
      costumeId: "giao-linh",
      bottomChoice: "short",
      collarChoice: "ta",
      destination: "chua-den"
    });
    assert.equal(multipleBreaches.score, 10);
  });
});
