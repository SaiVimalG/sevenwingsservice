import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import {
  adminListPosts,
  adminUpsertPost,
  adminDeletePost,
  adminUploadImage,
  verifyAdminToken,
  type DbBlogPost,
} from "@/lib/blog.functions";

const TOKEN_KEY = "blog_admin_token";

export const Route = createFileRoute("/admin/blog")({
  ssr: false,
  head: () => ({ meta: [{ title: "Blog Admin · 7 Wings" }, { name: "robots", content: "noindex,nofollow" }] }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="p-8">
        <p className="text-red-600 mb-4">{error.message}</p>
        <Button onClick={() => { reset(); router.invalidate(); }}>Retry</Button>
      </div>
    );
  },
  notFoundComponent: () => <div className="p-8">Not found</div>,
  component: AdminBlogPage,
});

function emptyDraft(): Partial<DbBlogPost> {
  return {
    slug: "",
    title: "",
    excerpt: "",
    category: "Germany",
    author: "7 Wings Editorial",
    image_url: "",
    read_time: "5 min read",
    intro: "<p>Start writing…</p>",
    cta_label: "",
    cta_slug: "",
    published: true,
  };
}

function AdminBlogPage() {
  const [token, setToken] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [draft, setDraft] = useState<Partial<DbBlogPost>>(emptyDraft());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (t) {
      verifyAdminToken({ data: { token: t } })
        .then(() => { setToken(t); setAuthed(true); refresh(t); })
        .catch(() => localStorage.removeItem(TOKEN_KEY));
    }
  }, []);

  async function refresh(t = token) {
    if (!t) return;
    try {
      const rows = await adminListPosts({ data: { token: t } });
      setPosts(rows);
    } catch (e: any) { toast.error(e.message); }
  }

  const loginMut = useMutation({
    mutationFn: async (pw: string) => {
      await verifyAdminToken({ data: { token: pw } });
      return pw;
    },
    onSuccess: (pw) => {
      localStorage.setItem(TOKEN_KEY, pw);
      setToken(pw); setAuthed(true); refresh(pw);
    },
    onError: (e: any) => toast.error(e.message ?? "Invalid token"),
  });

  async function handleUploadImage(file: File): Promise<string> {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    const b64 = btoa(bin);
    const { url } = await adminUploadImage({
      data: { token, filename: file.name, contentType: file.type || "image/png", dataBase64: b64 },
    });
    return url;
  }

  async function save() {
    setLoading(true);
    try {
      const required = ["slug", "title", "excerpt", "category", "image_url", "intro"] as const;
      for (const k of required) {
        if (!draft[k]) throw new Error(`Field "${k}" is required`);
      }
      const saved = await adminUpsertPost({
        data: {
          token,
          post: {
            id: draft.id,
            slug: draft.slug!,
            title: draft.title!,
            excerpt: draft.excerpt!,
            category: draft.category!,
            author: draft.author || "7 Wings Editorial",
            image_url: draft.image_url!,
            read_time: draft.read_time || "5 min read",
            intro: draft.intro!,
            cta_label: draft.cta_label || null,
            cta_slug: draft.cta_slug || null,
            published: draft.published ?? true,
          },
        },
      });
      toast.success("Saved");
      setDraft(saved);
      refresh();
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      await adminDeletePost({ data: { token, id } });
      toast.success("Deleted");
      if (draft.id === id) setDraft(emptyDraft());
      refresh();
    } catch (e: any) { toast.error(e.message); }
  }

  async function uploadCover(file: File) {
    try {
      const url = await handleUploadImage(file);
      setDraft({ ...draft, image_url: url });
      toast.success("Cover uploaded");
    } catch (e: any) { toast.error(e.message); }
  }

  if (!authed) {
    return (
      <PageShell>
        <div className="container max-w-md py-24">
          <h1 className="text-2xl font-bold mb-6">Blog Admin</h1>
          <form
            onSubmit={(e) => { e.preventDefault(); loginMut.mutate(pwInput); }}
            className="space-y-4"
          >
            <Label htmlFor="pw">Admin token</Label>
            <Input id="pw" type="password" value={pwInput} onChange={(e) => setPwInput(e.target.value)} />
            <Button type="submit" disabled={loginMut.isPending}>Sign in</Button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Posts</h2>
            <Button size="sm" variant="outline" onClick={() => setDraft(emptyDraft())}>New</Button>
          </div>
          <ul className="space-y-1 max-h-[70vh] overflow-auto">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
                <button className="text-left flex-1 truncate hover:underline" onClick={() => setDraft(p)}>
                  {p.published ? "✅" : "📝"} {p.title || p.slug}
                </button>
                <button className="text-red-600 text-xs" onClick={() => remove(p.id)}>del</button>
              </li>
            ))}
            {posts.length === 0 && <li className="text-sm text-muted-foreground">No posts yet</li>}
          </ul>
          <Button variant="ghost" size="sm" onClick={() => {
            localStorage.removeItem(TOKEN_KEY); setAuthed(false); setToken("");
          }}>Sign out</Button>
        </aside>

        <main className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input value={draft.title ?? ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={draft.slug ?? ""} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={draft.category ?? ""} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            </div>
            <div>
              <Label>Author</Label>
              <Input value={draft.author ?? ""} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
            </div>
            <div>
              <Label>Read time</Label>
              <Input value={draft.read_time ?? ""} onChange={(e) => setDraft({ ...draft, read_time: e.target.value })} />
            </div>
            <div>
              <Label>CTA label</Label>
              <Input value={draft.cta_label ?? ""} onChange={(e) => setDraft({ ...draft, cta_label: e.target.value })} />
            </div>
            <div>
              <Label>CTA slug/href</Label>
              <Input value={draft.cta_slug ?? ""} onChange={(e) => setDraft({ ...draft, cta_slug: e.target.value })} />
            </div>
            <div className="flex items-end gap-3">
              <div className="flex items-center gap-2">
                <Switch checked={draft.published ?? true} onCheckedChange={(v) => setDraft({ ...draft, published: v })} />
                <span className="text-sm">Published</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Excerpt</Label>
            <Textarea rows={2} value={draft.excerpt ?? ""} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
          </div>

          <div>
            <Label>Cover image</Label>
            <div className="flex gap-3 items-center">
              <Input value={draft.image_url ?? ""} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} placeholder="https://…" />
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
            </div>
            {draft.image_url && <img src={draft.image_url} alt="" className="mt-2 max-h-32 rounded" />}
          </div>

          <div>
            <Label>Body</Label>
            <RichTextEditor
              value={draft.intro ?? ""}
              onChange={(html) => setDraft({ ...draft, intro: html })}
              onUploadImage={handleUploadImage}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={save} disabled={loading}>{loading ? "Saving…" : "Save"}</Button>
            {draft.slug && draft.published && (
              <Button asChild variant="outline">
                <Link to="/blog/$slug" params={{ slug: draft.slug }}>View</Link>
              </Button>
            )}
          </div>
        </main>
      </div>
    </PageShell>
  );
}
