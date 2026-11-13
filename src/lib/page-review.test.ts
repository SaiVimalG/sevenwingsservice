import { test } from "node:test";
import assert from "node:assert/strict";
import { customPageUrl, reviewInput } from "./page-review";

test("accepts only the two production custom domains", () => {
  assert.equal(customPageUrl("https://www.7wingsimmigration.com/blog"), "https://www.7wingsimmigration.com/blog");
  assert.equal(customPageUrl("https://7wingsimmigration.com/"), "https://7wingsimmigration.com/");
  for (const url of ["https://sevenwingsservice.lovable.app/", "https://home.7wingsimmigration.com/", "https://127.0.0.1/", "https://www.7wingsimmigration.com.evil.com/", "http://7wingsimmigration.com/", "https://x@7wingsimmigration.com/", "https://7wingsimmigration.com:8080/"]) assert.throws(() => customPageUrl(url));
});

test("private pages and query parameters cannot be sent for review", () => {
  for (const path of ["admin/blog", "%61dmin/blog", "api/public/leads", "email/unsubscribe", "unsubscribe", "blog?token=secret"]) assert.throws(() => customPageUrl(`https://www.7wingsimmigration.com/${path}`));
});

test("invalid URLs return validation errors instead of throwing", () => {
  assert.equal(reviewInput.safeParse({ url: "https://sevenwingsservice.lovable.app/" }).success, false);
  assert.equal(reviewInput.safeParse({ url: "not a url" }).success, false);
});