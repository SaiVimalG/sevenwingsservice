import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("published sitemap URLs use the project's public origin", async () => {
  const response = await fetch("http://localhost:8080/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
  assert.ok(urls.length > 0);
  assert.ok(urls.some((url) => url.pathname === "/"));
  for (const url of urls) assert.equal(url.origin, "https://www.7wingsimmigration.com");
});

test("robots advertises only the custom-domain sitemap", async () => {
  const robots = await readFile("public/robots.txt", "utf8");
  const sitemaps = robots.split("\n").filter((line) => line.startsWith("Sitemap:"));
  assert.deepEqual(sitemaps, ["Sitemap: https://www.7wingsimmigration.com/sitemap.xml"]);
});