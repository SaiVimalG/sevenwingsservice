import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { COVER_HEIGHT, COVER_WIDTH, BRAND_LOGO_KEY, validBlogAdmin } from "./blog-cover";

describe("blog cover rules", () => {
  it("uses the requested 16:9 high-resolution output", () => {
    assert.deepEqual([COVER_WIDTH, COVER_HEIGHT], [1920, 1080]);
    assert.equal(COVER_WIDTH / COVER_HEIGHT, 16 / 9);
  });
  it("keeps one reusable brand asset across posts", () => {
    assert.equal(BRAND_LOGO_KEY, "brand/cover-logo");
  });
  it("rejects missing or incorrect admin credentials", () => {
    assert.equal(validBlogAdmin("", undefined), false);
    assert.equal(validBlogAdmin("wrong", "test-only-secret"), false);
    assert.equal(validBlogAdmin("test-only-secret", "test-only-secret"), true);
  });
});