import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, Trash2, Save, Upload, Eye, ArrowLeft, LogOut, Pencil } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import {
  verifyAdminToken,
  adminListPosts,
  adminGetPost,
  upsertPost,
  deletePost,
  uploadBlogImage,
  type PostInput,
} from "@/lib/blog.functions";
import { SERVICES } from "@/lib/site";

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

type Mode = { kind: "list" } | { kind: "edit"; slug?: string };

interface AdminPost extends PostInput {
  // identical to PostInput
}

const EMPTY: PostInput = {
  slug: "",
  title: "",
  excerpt: "",
  category: "Germany",
  author: "7 Wings Editorial",
  imageUrl: "",
  readTime: "5 min read",
  intro: "",
  sections: [{ heading: "Overview", markdown: "" }],
  why7Wings: [""],
  ctaLabel: "Book a free consultation",
  ctaSlug: "",
  published: true,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

function AdminBlogPage() {
  const [token, setToken] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>({ kind: "list" });

  // restore token from localStorage and validate
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
      <PageShell>
        <section className="mx-auto max-w-md px-6 py-40">
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
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 py-32">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-deep">Blog Editor</h1>
            <p className="text-sm text-muted-foreground">Create and manage posts shown on /blog and the home page.</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        {mode.kind === "list" ? (
          <PostList token={token} onEdit={(slug) => setMode({ kind: "edit", slug })} onNew={() => setMode({ kind: "edit" })} />
        ) : (
          <PostEditor
            token={token}
            slug={mode.slug}
            onBack={() => setMode({ kind: "list" })}
          />
        )}
      </section>
    </PageShell>
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
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-deep">{p.category}</span>
                    {!p.published && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-red-600">Draft</span>}
                  </div>
                  <p className="mt-1 truncate font-display text-base font-semibold text-navy-deep">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">/{p.slug} · {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-xs text-navy-deep hover:border-gold" target="_blank">
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

function PostEditor({ token, slug, onBack }: { token: string; slug?: string; onBack: () => void }) {
  const [form, setForm] = useState<PostInput>(EMPTY);
  const [originalSlug, setOriginalSlug] = useState<string | undefined>(slug);
  const [loading, setLoading] = useState<boolean>(!!slug);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
            intro: p.intro,
            sections: p.sections,
            why7Wings: p.why7Wings.length > 0 ? p.why7Wings : [""],
            ctaLabel: p.cta?.label ?? "",
            ctaSlug: p.cta?.slug ?? "",
            published: p.published,
          });
          setOriginalSlug(p.slug);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [slug, token]);

  const update = <K extends keyof PostInput>(k: K, v: PostInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const updateSection = (i: number, k: "heading" | "markdown", v: string) =>
    setForm((f) => ({ ...f, sections: f.sections.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)) }));

  const addSection = () => setForm((f) => ({ ...f, sections: [...f.sections, { heading: "", markdown: "" }] }));
  const removeSection = (i: number) => setForm((f) => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));

  const updateBenefit = (i: number, v: string) =>
    setForm((f) => ({ ...f, why7Wings: f.why7Wings.map((b, idx) => (idx === i ? v : b)) }));
  const addBenefit = () => setForm((f) => ({ ...f, why7Wings: [...f.why7Wings, ""] }));
  const removeBenefit = (i: number) => setForm((f) => ({ ...f, why7Wings: f.why7Wings.filter((_, idx) => idx !== i) }));

  const handleImageFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1] ?? "");
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
      const res = await uploadBlogImage({
        data: { token, filename: file.name, contentType: file.type, base64 },
      });
      update("imageUrl", res.url);
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
        why7Wings: form.why7Wings.map((b) => b.trim()).filter(Boolean),
        ctaLabel: form.ctaLabel || undefined,
        ctaSlug: form.ctaSlug || undefined,
      };
      const res = await upsertPost({
        data: { token, post: cleaned, originalSlug },
      });
      setOriginalSlug(res.slug);
      onBack();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading post…</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy-deep">
          <ArrowLeft className="h-4 w-4" /> Back to list
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview((p) => !p)} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
            <Eye className="h-4 w-4" /> {showPreview ? "Hide preview" : "Preview"}
          </button>
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 btn-gold btn-gold-hover disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save post"}
          </button>
        </div>
      </div>
      {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : ""}`}>
        {/* Form */}
        <div className="space-y-5">
          <Field label="Title">
            <input type="text" value={form.title} onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({ ...f, title, slug: originalSlug ? f.slug : slugify(title) }));
            }} className={inputCls} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Slug (URL)"><input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputCls} /></Field>
            <Field label="Category"><input type="text" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls} /></Field>
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
              {form.imageUrl && (
                <img src={form.imageUrl} alt="cover" className="h-20 w-32 rounded-lg border border-black/10 object-cover" />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-navy-deep hover:border-gold">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading…" : form.imageUrl ? "Replace image" : "Upload image"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
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

          <Field label="Intro (lead paragraph)">
            <textarea rows={3} value={form.intro} onChange={(e) => update("intro", e.target.value)} className={inputCls} />
          </Field>

          <div>
            <label className="text-sm font-semibold text-navy-deep">Sections (markdown supported)</label>
            <div className="mt-2 space-y-4">
              {form.sections.map((s, i) => (
                <div key={i} className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Section {i + 1}</span>
                    {form.sections.length > 1 && (
                      <button onClick={() => removeSection(i)} className="text-xs text-red-600 hover:underline">
                        <Trash2 className="inline h-3.5 w-3.5" /> Remove
                      </button>
                    )}
                  </div>
                  <input
                    placeholder="Section heading"
                    value={s.heading}
                    onChange={(e) => updateSection(i, "heading", e.target.value)}
                    className={`${inputCls} mt-2`}
                  />
                  <textarea
                    rows={6}
                    placeholder="Write the section body in Markdown. Supports **bold**, *italic*, lists, links, > quotes, etc."
                    value={s.markdown}
                    onChange={(e) => updateSection(i, "markdown", e.target.value)}
                    className={`${inputCls} mt-2 font-mono text-sm`}
                  />
                </div>
              ))}
              <button onClick={addSection} className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/20 px-4 py-2 text-sm text-navy-deep hover:border-gold">
                <Plus className="h-4 w-4" /> Add section
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-navy-deep">Why apply through 7 Wings (benefits list)</label>
            <div className="mt-2 space-y-2">
              {form.why7Wings.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input value={b} onChange={(e) => updateBenefit(i, e.target.value)} className={`${inputCls} flex-1`} placeholder="e.g. Full ZAB recognition support included." />
                  {form.why7Wings.length > 1 && (
                    <button onClick={() => removeBenefit(i)} className="rounded-full border border-red-200 px-3 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addBenefit} className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/20 px-4 py-2 text-sm text-navy-deep hover:border-gold">
                <Plus className="h-4 w-4" /> Add benefit
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="CTA label"><input type="text" value={form.ctaLabel ?? ""} onChange={(e) => update("ctaLabel", e.target.value)} className={inputCls} /></Field>
            <Field label="CTA link (service)">
              <select value={form.ctaSlug ?? ""} onChange={(e) => update("ctaSlug", e.target.value || null)} className={inputCls}>
                <option value="">Book a consultation (default)</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              </select>
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm text-navy-deep">
            <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
            Published (visible on the public blog)
          </label>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-widest text-gold-deep">{form.category || "Category"}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-navy-deep">{form.title || "Post title"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{form.excerpt}</p>
            {form.imageUrl && <img src={form.imageUrl} alt="" className="mt-4 aspect-[16/9] w-full rounded-2xl object-cover" />}
            <p className="mt-6 font-display text-lg leading-relaxed text-navy-deep">{form.intro}</p>
            <div className="mt-6 space-y-6">
              {form.sections.map((s, i) => (
                <div key={i}>
                  <h3 className="font-display text-xl font-bold text-navy-deep">{s.heading}</h3>
                  <div className="prose prose-sm mt-2 max-w-none text-muted-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.markdown}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            {form.why7Wings.filter(Boolean).length > 0 && (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">Why 7 Wings</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-navy-deep">
                  {form.why7Wings.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
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
