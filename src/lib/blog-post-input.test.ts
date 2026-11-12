import { test } from "node:test";
import { strict as assert } from "node:assert";
import { PostInputSchema } from "./blog-post-input";

const unfinished = {
  slug: "draft-germany-guide", title: "Germany guide", excerpt: "", category: "Germany",
  author: "7 Wings Editorial", imageUrl: "", readTime: "5 min read", contentHtml: "<p></p>",
};

test("unfinished posts can be saved as private drafts without a cover or excerpt", () => {
  const result = PostInputSchema.parse({ ...unfinished, published: false });
  assert.equal(result.published, false);
  assert.equal(result.imageUrl, "");
  assert.equal(result.excerpt, "");
});
test("new posts default to unpublished", () => {
  assert.equal(PostInputSchema.parse(unfinished).published, false);
});
test("publishing still requires an excerpt and cover image", () => {
  assert.equal(PostInputSchema.safeParse({ ...unfinished, published: true, imageUrl: "https://example.com/cover.jpg" }).success, false);
  assert.equal(PostInputSchema.safeParse({ ...unfinished, published: true, excerpt: "A complete article excerpt." }).success, false);
  assert.equal(PostInputSchema.safeParse({ ...unfinished, published: true, excerpt: "A complete article excerpt.", imageUrl: "https://example.com/cover.jpg" }).success, true);
});