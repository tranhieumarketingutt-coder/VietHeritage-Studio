import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  storageHelper,
  type CommunityLook
} from "../src/shared/lib/storage.ts";

interface StorageMock {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

class MemoryStorage implements StorageMock {
  private readonly store = new Map<string, string>();

  public getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  public setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  public removeItem(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
  }
}

interface GlobalEnvironment {
  window?: unknown;
  localStorage?: StorageMock;
}

describe("storageHelper", () => {
  const env = globalThis as unknown as GlobalEnvironment;
  let mockStorage: MemoryStorage;

  beforeEach(() => {
    mockStorage = new MemoryStorage();
    env.window = env;
    env.localStorage = mockStorage;
  });

  afterEach(() => {
    delete env.window;
    delete env.localStorage;
  });

  it("handles server-side rendering gracefully when window is undefined", () => {
    delete env.window;
    delete env.localStorage;

    assert.doesNotThrow(() => {
      const looks = storageHelper.getCommunityLooks();
      assert.deepEqual(looks, []);

      const wardrobe = storageHelper.getWardrobe();
      assert.deepEqual(wardrobe, []);

      const user = storageHelper.getUser();
      assert.equal(user.isLoggedIn, false);
      assert.equal(user.name, "Khách Di Sản (Guest)");
    });
  });

  it("returns seeded community looks when storage is empty", () => {
    const looks = storageHelper.getCommunityLooks();

    assert.equal(looks.length, 4);
    assert.equal(looks[0].id, "look-seed-1");
    assert.equal(looks[1].id, "look-seed-2");

    const persisted = mockStorage.getItem("vheritage_community_v1");
    assert.ok(persisted);
    const parsed = JSON.parse(persisted) as CommunityLook[];
    assert.equal(parsed.length, 4);
  });

  it("saves a new community look and increments likes on interaction", () => {
    const initial = storageHelper.getCommunityLooks();
    const originalLikes = initial[0].likes;

    const customLook: CommunityLook = {
      id: "look-custom-1",
      author: "Ha Noi Creator",
      titleVi: "Ngu Than Pho Co",
      titleEn: "Ancient Quarter Ngu Than",
      costumeId: "ngu-than",
      costumeName: "Áo Ngũ Thân",
      destination: "Hanoi",
      score: 99,
      likes: 10,
      date: "Today",
      photoUrl: "",
      accentHex: "#8B0000",
      tags: ["#Heritage"]
    };

    const updated = storageHelper.saveCommunityLook(customLook);
    assert.equal(updated.length, 5);
    assert.equal(updated[0].id, "look-custom-1");

    const liked = storageHelper.likeCommunityLook("look-seed-1");
    const seedLook = liked.find((item) => item.id === "look-seed-1");
    assert.ok(seedLook);
    assert.equal(seedLook.likes, originalLikes + 1);
  });

  it("falls back to default guest profile when user record is absent or corrupted", () => {
    const defaultUser = storageHelper.getUser();
    assert.equal(defaultUser.isLoggedIn, false);
    assert.equal(defaultUser.name, "Khách Di Sản (Guest)");
    assert.equal(defaultUser.email, "khach@vietheritage.vn");

    storageHelper.setUser({
      isLoggedIn: true,
      name: "Minh Anh",
      email: "minhanh@vietheritage.vn"
    });

    const activeUser = storageHelper.getUser();
    assert.equal(activeUser.isLoggedIn, true);
    assert.equal(activeUser.name, "Minh Anh");

    mockStorage.setItem("vheritage_current_user_v1", "invalid-json-payload");
    const recoveredUser = storageHelper.getUser();
    assert.equal(recoveredUser.isLoggedIn, false);
    assert.equal(recoveredUser.name, "Guest");
  });
});
