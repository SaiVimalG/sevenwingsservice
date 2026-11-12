import { test } from "node:test";
import assert from "node:assert/strict";

test("published sitemap URLs use the project's public origin", async () => {
  const response = await fetch("http://localhost:8080/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  assert.ok(urls.length > 0);
  assert.ok(urls.some((url) => url.pathname === "/"));
  for (const url of urls) assert.equal(url.origin, "https://sevenwingsservice.lovable.app");
});