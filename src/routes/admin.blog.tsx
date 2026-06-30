import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Upload, Eye, ArrowLeft, LogOut, Pencil, Users, EyeOff, ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";

import {
  verifyAdminToken,
  adminListPosts,
  adminGetPost,
  upsertPost,
  deletePost,
  uploadBlogImage,
  setPostListed,
  type PostInput,
} from "@/lib/blog.functions";
import { generateBlogWithAI } from "@/lib/blog-ai.functions";
import { SERVICES, BLOG, type BlogPost } from "@/lib/site";
import { RichTextEditor } from "@/components/blog/RichTextEditor";

type ListRow = {
  slug: string;
  title: string;
  category: string;
  date: string;
  published: boolean;
  listed: boolean;
  source: "db" | "static";
};

function mdInline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function staticPostToHtml(post: BlogPost): string {
  const parts: string[] = [];
  if (post.intro?.trim()) parts.push(`<p>${mdInline(post.intro.trim())}</p>`);
  for (const s of post.sections) {
    if (s.heading?.trim()) parts.push(`<h2>${mdInline(s.heading.trim())}</h2>`);
    for (const p of s.paragraphs) {
      const t = p.trim();
      if (t) parts.push(`<p>${mdInline(t)}</p>`);
    }
  }
  if (post.why7Wings?.length) {
    parts.push("<h2>Why 7 Wings</h2><ul>" + post.why7Wings.map((w) => `<li>${mdInline(w)}</li>`).join("") + "</ul>");
  }
  return parts.join("\n") || "<p></p>";
}

function staticToPostInput(post: BlogPost): PostInput {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    imageUrl: typeof post.image === "string" ? post.image : "",
    readTime: post.readTime,
    contentHtml: staticPostToHtml(post),
    intro: "",
    sections: [],
    why7Wings: [],
    faqs: [],
    ctaLabel: post.cta?.label ?? "Book a free consultation",
    ctaSlug: post.cta?.slug ?? "",
    published: true,
    listed: true,
  };
}

export const Route = createFileRoute("/admin/blog")({
  head: () => ({
    meta: [
      { title: "Blog Editor | 7 Wings Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminBlogPage,
});

const TOKEN_KEY = "admin_blog_token";

type Mode = { kind: "list" } | { kind: "edit"; slug?: string; source?: "db" | "static" };

const EMPTY: PostInput = {
  slug: "",
  title: "",
  excerpt: "",
  category: "Germany",
  author: "7 Wings Editorial",
  imageUrl: "",
  readTime: "5 min read",
  contentHtml: "<p></p>",
  intro: "",
  sections: [],
  why7Wings: [],
  faqs: [],
  ctaLabel: "Book a free consultation",
  ctaSlug: "",
  published: true,
  listed: true,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

function AdminBlogPage() {
  const [token, setToken] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>({ kind: "list" });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!saved) return;
    setToken(saved);
    verifyAdminToken({ data: { token: saved } })
      .then(() => setAuthed(true))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      });
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await verifyAdminToken({ data: { token } });
      localStorage.setItem(TOKEN_KEY, token);
      setAuthed(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Failed to verify token");
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream/30">
        <section className="mx-auto max-w-md px-6 py-24">

          <h1 className="font-display text-3xl font-bold text-navy-deep">Blog Editor</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to manage blog posts.</p>
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <input
              type="password"
              autoFocus
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />
            {authError && <p className="text-sm text-red-600">{authError}</p>}
            <button type="submit" className="w-full btn-gold btn-gold-hover justify-center">
              Unlock editor
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-deep">Blog Editor</h1>
            <p className="text-sm text-muted-foreground">Create and manage posts shown on /blog and the home page.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/leads" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
              <Users className="h-4 w-4" /> Leads
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {mode.kind === "list" ? (
          <PostList token={token} onEdit={(slug, source) => setMode({ kind: "edit", slug, source })} onNew={() => setMode({ kind: "edit" })} />
        ) : (
          <PostEditor token={token} slug={mode.slug} source={mode.source} onBack={() => setMode({ kind: "list" })} />
        )}
      </section>
    </div>
  );
}

function PostList({ token, onEdit, onNew }: { token: string; onEdit: (slug: string, source: "db" | "static") => void; onNew: () => void }) {
  const [posts, setPosts] = useState<ListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    try {
      const dbList = await adminListPosts({ data: { token } });
      const dbRows: ListRow[] = dbList.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        published: p.published,
        listed: p.listed,
        source: "db",
      }));
      const dbSlugs = new Set(dbRows.map((r) => r.slug));
      const staticRows: ListRow[] = BLOG.filter((b) => !dbSlugs.has(b.slug)).map((b) => ({
        slug: b.slug,
        title: b.title,
        category: b.category,
        date: b.date,
        published: true,
        listed: true,
        source: "static",
      }));
      setPosts([...dbRows, ...staticRows]);
      setErr(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (slug: string) => {
    if (!confirm(`Delete post "${slug}"? This cannot be undone.`)) return;
    try {
      await deletePost({ data: { token, slug } });
      reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const onToggleListed = async (slug: string, next: boolean) => {
    // optimistic update
    setPosts((prev) => prev.map((p) => (p.slug === slug ? { ...p, listed: next } : p)));
    try {
      await setPostListed({ data: { token, slug, listed: next } });
    } catch (e) {
      // revert on failure
      setPosts((prev) => prev.map((p) => (p.slug === slug ? { ...p, listed: !next } : p)));
      alert(e instanceof Error ? e.message : "Failed to update visibility");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : `${posts.length} post${posts.length === 1 ? "" : "s"}`}</p>
        <button onClick={onNew} className="inline-flex items-center gap-2 btn-gold btn-gold-hover">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>
      {err && <p className="mb-4 text-sm text-red-600">{err}</p>}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        {posts.length === 0 && !loading ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No posts yet. Click "New post" to publish your first article.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {posts.map((p) => (
              <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-deep">{p.category}</span>
                    {p.source === "static" && <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky-700">Built-in</span>}
                    {!p.published && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-red-600">Draft</span>}
                    {p.published && !p.listed && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-700">SEO only · hidden</span>}
                  </div>
                  <p className="mt-1 truncate font-display text-base font-semibold text-navy-deep">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">/blog/{slugify(p.category)}/{p.slug} · {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleListed(p.slug, !p.listed)}
                    disabled={!p.published || p.source === "static"}
                    title={
                      p.source === "static"
                        ? "Built-in post — open Edit and Save to make it manageable"
                        : !p.published
                          ? "Publish the post first to show it on the website"
                          : p.listed
                            ? "Showing on website — click to hide from the blog section"
                            : "Hidden from the blog section — click to show on website"
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                      p.listed
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-black/10 bg-white text-muted-foreground hover:border-gold"
                    }`}
                  >
                    {p.listed ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {p.listed ? "Shown" : "Hidden"}
                  </button>
                  <Link to="/blog/$country/$slug" params={{ country: slugify(p.category), slug: p.slug }} className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-navy-deep hover:border-gold" target="_blank">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>

                  <button onClick={() => onEdit(p.slug, p.source)} className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-navy-deep hover:border-gold">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.slug)}
                    disabled={p.source === "static"}
                    title={p.source === "static" ? "Built-in post — cannot be deleted" : "Delete this post"}
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function sectionsToHtml(intro: string, sections: { heading: string; markdown: string }[]): string {
  const parts: string[] = [];
  if (intro?.trim()) parts.push(`<p>${intro.trim()}</p>`);
  for (const s of sections) {
    if (s.heading?.trim()) parts.push(`<h2>${s.heading.trim()}</h2>`);
    if (s.markdown?.trim()) {
      s.markdown.split(/\n{2,}/).forEach((para) => {
        const t = para.trim();
        if (t) parts.push(`<p>${t.replace(/\n/g, "<br/>")}</p>`);
      });
    }
  }
  return parts.join("\n") || "<p></p>";
}

function PostEditor({ token, slug, source, onBack }: { token: string; slug?: string; source?: "db" | "static"; onBack: () => void }) {
  const [form, setForm] = useState<PostInput>(EMPTY);
  const [originalSlug, setOriginalSlug] = useState<string | undefined>(source === "static" ? undefined : slug);
  const [loading, setLoading] = useState<boolean>(!!slug && source !== "static");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (source === "static") {
      const sp = BLOG.find((b) => b.slug === slug);
      if (sp) setForm(staticToPostInput(sp));
      setOriginalSlug(undefined);
      setLoading(false);
      return;
    }
    adminGetPost({ data: { token, slug } })
      .then((p) => {
        if (p) {
          setForm({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            author: p.author,
            imageUrl: p.image,
            readTime: p.readTime,
            contentHtml: p.contentHtml?.trim() ? p.contentHtml : sectionsToHtml(p.intro, p.sections),
            intro: "",
            sections: [],
            why7Wings: [],
            faqs: p.faqs ?? [],
            ctaLabel: p.cta?.label ?? "",
            ctaSlug: p.cta?.slug ?? "",
            published: p.published,
            listed: p.listed ?? true,
          });
          setOriginalSlug(p.slug);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [slug, token, source]);

  const update = <K extends keyof PostInput>(k: K, v: PostInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const readFileAsBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const uploadImage = async (file: File): Promise<string> => {
    if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB.");
    const base64 = await readFileAsBase64(file);
    const res = await uploadBlogImage({ data: { token, filename: file.name, contentType: file.type, base64 } });
    return res.url;
  };

  const handleCoverFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      update("imageUrl", url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      const cleaned: PostInput = {
        ...form,
        slug: slugify(form.slug || form.title),
        intro: "",
        sections: [],
        why7Wings: [],
        ctaLabel: form.ctaLabel || undefined,
        ctaSlug: form.ctaSlug || undefined,
      };
      const res = await upsertPost({ data: { token, post: cleaned, originalSlug } });
      setOriginalSlug(res.slug);
      onBack();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading post…</p>;

  const country = slugify(form.category) || "country";
  const urlSlug = slugify(form.slug || form.title) || "post-title";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy-deep">
          <ArrowLeft className="h-4 w-4" /> Back to list
        </button>
        <div className="flex items-center gap-2">
          <AIWriteButton
            token={token}
            onGenerated={({ title, excerpt, contentHtml }) =>
              setForm((f) => ({
                ...f,
                title: title || f.title,
                slug: originalSlug ? f.slug : slugify(title || f.title),
                excerpt: excerpt || f.excerpt,
                contentHtml: contentHtml || f.contentHtml,
              }))
            }
          />
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 btn-gold btn-gold-hover disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save post"}
          </button>
        </div>
      </div>
      {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="space-y-4">
        <Section title="Main details" subtitle="Title, country, slug, author, excerpt and cover image" defaultOpen>
          <Field label="Title">
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({ ...f, title, slug: originalSlug ? f.slug : slugify(title) }));
              }}
              className={inputCls}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Country (used in the URL & category badge)">
              <input type="text" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls} placeholder="e.g. Germany" />
            </Field>
            <Field label="Slug (the title part of the URL)">
              <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputCls} />
            </Field>
          </div>

          {/* URL preview */}
          <div className="rounded-xl border border-gold/30 bg-cream/60 px-4 py-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">Article URL</span>
            <p className="mt-1 break-all font-mono text-navy-deep">/blog/{country}/{urlSlug}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Author"><input type="text" value={form.author} onChange={(e) => update("author", e.target.value)} className={inputCls} /></Field>
            <Field label="Read time"><input type="text" value={form.readTime} onChange={(e) => update("readTime", e.target.value)} className={inputCls} /></Field>
          </div>

          <Field label="Excerpt (1-2 sentences shown on the home and blog list)">
            <textarea rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className={inputCls} />
          </Field>

          <Field label="Cover image">
            <div className="flex flex-wrap items-center gap-3">
              {form.imageUrl && <img src={form.imageUrl} alt="cover" className="h-20 w-32 rounded-lg border border-black/10 object-cover" />}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading…" : form.imageUrl ? "Replace image" : "Upload image"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleCoverFile(e.target.files[0])}
                />
              </label>
              <input
                type="text"
                placeholder="…or paste an image URL"
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                className={`${inputCls} flex-1 min-w-[200px]`}
              />
            </div>
          </Field>
        </Section>

        <Section title="Body" subtitle="The article content shown on the page" defaultOpen>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">
              Use the toolbar for headings, font sizes, colors, links, lists, tables and images. Everything you add here is responsive on mobile.
            </p>
            <RichTextEditor value={form.contentHtml} onChange={(html) => update("contentHtml", html)} onUploadImage={uploadImage} />
          </div>
        </Section>

        <Section title="CTA" subtitle="Call-to-action button at the end of the article" defaultOpen={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="CTA label"><input type="text" value={form.ctaLabel ?? ""} onChange={(e) => update("ctaLabel", e.target.value)} className={inputCls} /></Field>
            <Field label="CTA link (service)">
              <select value={form.ctaSlug ?? ""} onChange={(e) => update("ctaSlug", e.target.value || null)} className={inputCls}>
                <option value="">Book a consultation (default)</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        <Section title="FAQs" subtitle="Question & answer pairs shown as a collapsible accordion at the bottom of the article" defaultOpen={false}>
          <div className="space-y-3">
            {(form.faqs ?? []).length === 0 && (
              <p className="text-xs text-muted-foreground">No FAQs yet. Add a question to display the FAQ accordion on the published article.</p>
            )}
            {(form.faqs ?? []).map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-black/10 bg-cream/30 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() =>
                      update("faqs", (form.faqs ?? []).filter((_, i) => i !== idx))
                    }
                    className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <Field label="Question">
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) =>
                      update(
                        "faqs",
                        (form.faqs ?? []).map((f, i) => (i === idx ? { ...f, q: e.target.value } : f)),
                      )
                    }
                    className={inputCls}
                    placeholder="e.g. How long does the Germany Opportunity Card take?"
                  />
                </Field>
                <div className="h-2" />
                <Field label="Answer">
                  <textarea
                    value={faq.a}
                    onChange={(e) =>
                      update(
                        "faqs",
                        (form.faqs ?? []).map((f, i) => (i === idx ? { ...f, a: e.target.value } : f)),
                      )
                    }
                    rows={3}
                    className={inputCls}
                    placeholder="Plain-text answer shown when the user expands this question."
                  />
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={() => update("faqs", [...(form.faqs ?? []), { q: "", a: "" }])}
              className="inline-flex items-center gap-2 rounded-full border border-navy-deep/20 px-4 py-2 text-sm font-semibold text-navy-deep hover:border-gold-deep hover:text-gold-deep"
            >
              <Plus className="h-4 w-4" /> Add FAQ
            </button>
          </div>
        </Section>

        <Section title="Visibility" subtitle="Publish and blog listing options" defaultOpen={false}>
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-sm text-navy-deep">
              <input type="checkbox" className="mt-1" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
              <span>
                <span className="font-semibold">Published</span> — the article is live, indexable and crawlable at its own URL.
                <span className="block text-xs text-muted-foreground">Turn off to make it a private draft (not visible to anyone or search engines).</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-navy-deep">
              <input type="checkbox" className="mt-1" checked={form.listed} disabled={!form.published} onChange={(e) => update("listed", e.target.checked)} />
              <span>
                <span className="font-semibold">Show in blog section</span> — list this post on /blog and the home page.
                <span className="block text-xs text-muted-foreground">Turn off for SEO-only posts: still indexed &amp; crawlable at its URL, but hidden from the blog listing.</span>
              </span>
            </label>
          </div>
        </Section>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-deep">{label}</label>
      {children}
    </div>
  );
}

function Section({
  title,
  subtitle,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-cream/40"
      >
        <span>
          <span className="block font-display text-base font-semibold text-navy-deep">{title}</span>
          {subtitle && <span className="mt-0.5 block text-xs text-muted-foreground">{subtitle}</span>}
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && <div className="space-y-5 border-t border-black/5 px-5 py-5">{children}</div>}
    </div>
  );
}

function AIWriteButton({
  token,
  onGenerated,
}: {
  token: string;
  onGenerated: (out: { title: string; excerpt: string; contentHtml: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await generateBlogWithAI({ data: { token, topic: topic.trim() } });
      onGenerated(res);
      setOpen(false);
      setTopic("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-r from-gold/10 to-amber-100/40 px-4 py-2 text-sm font-semibold text-navy-deep transition-colors hover:border-gold hover:bg-gold/20"
      >
        <Sparkles className="h-4 w-4 text-gold-deep" /> Write with Gemini
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !loading && setOpen(false)}>
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-navy-deep flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-deep" /> Write with Gemini
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">Describe the topic — AI will fill the title, excerpt and body.</p>
              </div>
              <button onClick={() => !loading && setOpen(false)} className="rounded-full p-1 text-muted-foreground hover:bg-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Blog topic</label>
            <textarea
              autoFocus
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Canada Express Entry CRS score breakdown for Indian IT professionals in 2026"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
              disabled={loading}
            />

            {err && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={run}
                disabled={loading || !topic.trim()}
                className="inline-flex items-center gap-2 btn-gold btn-gold-hover disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? "Generating…" : "Generate article"}
              </button>
            </div>

            <p className="mt-4 text-[11px] text-muted-foreground">
              Tip: review and edit the generated text before saving. Generation typically takes 10-20 seconds.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
