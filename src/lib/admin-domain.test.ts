import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { adminEntryRedirect } from "./admin-domain";

describe("admin domain entry point", () => {
  test("opens blog administration on the same admin hostname", () => {
    const response = adminEntryRedirect(new Request("https://admin.7wingsimmigration.com/"));
    assert.equal(response?.status, 302);
    assert.equal(response?.headers.get("Location"), "https://admin.7wingsimmigration.com/admin/blog");
  });
  test("leaves leads and blog administration directly accessible", () => {
    for (const path of ["/admin/leads", "/admin/blog"]) {
      assert.equal(adminEntryRedirect(new Request(`https://admin.7wingsimmigration.com${path}`)), null);
    }
  });
  test("does not change the public homepage or preview", () => {
    for (const origin of ["https://www.7wingsimmigration.com", "https://7wingsimmigration.com", "http://localhost:8080"]) {
      assert.equal(adminEntryRedirect(new Request(`${origin}/`)), null);
    }
  });
});