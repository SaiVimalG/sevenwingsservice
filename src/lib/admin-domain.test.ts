import { describe, expect, test } from "bun:test";
import { adminEntryRedirect } from "./admin-domain";

describe("admin domain entry point", () => {
  test("opens blog administration on the same admin hostname", () => {
    const response = adminEntryRedirect(new Request("https://admin.7wingsimmigration.com/"));
    expect(response?.status).toBe(302);
    expect(response?.headers.get("Location")).toBe("https://admin.7wingsimmigration.com/admin/blog");
  });
  test("leaves leads and blog administration directly accessible", () => {
    for (const path of ["/admin/leads", "/admin/blog"]) {
      expect(adminEntryRedirect(new Request(`https://admin.7wingsimmigration.com${path}`))).toBeNull();
    }
  });
  test("does not change the public homepage or preview", () => {
    for (const origin of ["https://www.7wingsimmigration.com", "https://7wingsimmigration.com", "http://localhost:8080"]) {
      expect(adminEntryRedirect(new Request(`${origin}/`))).toBeNull();
    }
  });
});