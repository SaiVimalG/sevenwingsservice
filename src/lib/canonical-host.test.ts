import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { canonicalHostRedirect } from "./canonical-host";

describe("canonical host", () => {
  test("test Lovable address permanently moves to www custom domain, keeping the path", () => {
    for (const path of ["/", "/sitemap.xml", "/robots.txt", "/blog/germany/x?a=1"]) {
      const r = canonicalHostRedirect(new Request(`https://sevenwingsservice.lovable.app${path}`));
      assert.equal(r?.status, 301);
      assert.equal(r?.headers.get("Location"), `https://www.7wingsimmigration.com${path}`);
    }
  });
  test("apex and legacy home subdomain move to www", () => {
    for (const host of ["7wingsimmigration.com", "home.7wingsimmigration.com"]) {
      assert.equal(canonicalHostRedirect(new Request(`https://${host}/contact`))?.headers.get("Location"), "https://www.7wingsimmigration.com/contact");
    }
  });
  test("www, admin, preview and local hosts are untouched", () => {
    for (const origin of ["https://www.7wingsimmigration.com", "https://admin.7wingsimmigration.com", "https://id-preview--194042d7-d400-4563-a5dc-ee36f53cbdd1.lovable.app", "http://localhost:8080"]) {
      assert.equal(canonicalHostRedirect(new Request(`${origin}/`)), null);
    }
  });
});
