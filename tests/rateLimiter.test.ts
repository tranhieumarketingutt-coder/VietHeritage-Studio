import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RateLimiter } from "../server/handlers.ts";

describe("RateLimiter", () => {
  it("allows requests up to the configured limit", () => {
    const limiter = new RateLimiter(3, 5000);

    assert.equal(limiter.isAllowed("client-1"), true);
    assert.equal(limiter.isAllowed("client-1"), true);
    assert.equal(limiter.isAllowed("client-1"), true);
  });

  it("rejects subsequent requests when the limit is exceeded", () => {
    const limiter = new RateLimiter(2, 5000);

    assert.equal(limiter.isAllowed("client-2"), true);
    assert.equal(limiter.isAllowed("client-2"), true);
    assert.equal(limiter.isAllowed("client-2"), false);

    assert.equal(limiter.isAllowed("client-isolated"), true);
  });

  it("resets tracked quotas manually and when sliding window elapses", async () => {
    const limiter = new RateLimiter(1, 50);

    assert.equal(limiter.isAllowed("client-3"), true);
    assert.equal(limiter.isAllowed("client-3"), false);

    limiter.reset();
    assert.equal(limiter.isAllowed("client-3"), true);
    assert.equal(limiter.isAllowed("client-3"), false);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 60);
    });

    assert.equal(limiter.isAllowed("client-3"), true);
  });

  it("executes automatic eviction for expired records when cache capacity is exceeded", async () => {
    const limiter = new RateLimiter(5, 40);

    for (let index = 0; index <= 5000; index += 1) {
      limiter.isAllowed(`batch-client-${index}`);
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 50);
    });

    const triggerAllowed = limiter.isAllowed("trigger-client");
    assert.equal(triggerAllowed, true);

    assert.equal(limiter.isAllowed("batch-client-0"), true);
  });
});
