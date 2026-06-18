import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Upload, Eye, ArrowLeft, LogOut, Pencil, Users, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

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

function staticToListRow(p: BlogPost): ListRow {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    published: true,
    listed: true,
    source: "static",
  };
}

function staticToPostInput(p: BlogPost): PostInput {
  const parts: string[] = [];
  if (p.intro?.trim()) parts.push(`<p>${p.intro.trim()}</p>`);
  for (const s of p.sections) {
    if (s.heading?.trim()) parts.push(`<h2>${s.heading.trim()}</h2>`);
    for (const para of s.paragraphs) {
      const t = para?.trim();
      if (t) parts.push(`<p>${t.replace(/\n/g, "<br/>")}</p>`);
    }
  }
  const imageUrl =
    typeof window !== "undefined" && p.image && !/^https?:\/\//.test(p.image)
      ? new URL(p.image, window.location.origin).toString()
      : p.image;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    imageUrl,
    readTime: p.readTime,
    contentHtml: parts.join("\n") || "<p></p>",
    intro: "",
    sections: [],
    why7Wings: p.why7Wings ?? [],
    ctaLabel: p.cta?.label ?? "",
    ctaSlug: p.cta?.slug ?? "",
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
          <PostList
            token={token}
            onEdit={(slug, source) => setMode({ kind: "edit", slug, source })}
            onNew={() => setMode({ kind: "edit" })}
          />
        ) : (
          <PostEditor token={token} slug={mode.slug} source={mode.source} onBack={() => setMode({ kind: "list" })} />
        )}
      </section>
    </div>
  );
}

function PostList({ token, onEdit, onNew }: { token: string; onEdit: (slug: string) => void; onNew: () => void }) {
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof adminListPosts>>>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    try {
      const list = await adminListPosts({ data: { token } });
      setPosts(list);
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
                    {!p.published && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-red-600">Draft</span>}
                    {p.published && !p.listed && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-700">SEO only · hidden</span>}
                  </div>
                  <p className="mt-1 truncate font-display text-base font-semibold text-navy-deep">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">/blog/{slugify(p.category)}/{p.slug} · {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleListed(p.slug, !p.listed)}
                    disabled={!p.published}
                    title={
                      !p.published
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

                  <button onClick={() => onEdit(p.slug)} className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-navy-deep hover:border-gold">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => onDelete(p.slug)} className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">
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

function PostEditor({ token, slug, onBack }: { token: string; slug?: string; onBack: () => void }) {
  const [form, setForm] = useState<PostInput>(EMPTY);
  const [originalSlug, setOriginalSlug] = useState<string | undefined>(slug);
  const [loading, setLoading] = useState<boolean>(!!slug);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
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
  }, [slug, token]);

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
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 btn-gold btn-gold-hover disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save post"}
        </button>
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
