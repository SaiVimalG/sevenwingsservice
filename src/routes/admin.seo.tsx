import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Copy, Download, Loader2, Search, Square, LogOut } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { verifyAdminToken } from "@/lib/blog.functions";
import { reviewInput, type ReviewEvidence } from "@/lib/page-review";

export const Route = createFileRoute("/admin/seo")({
  head: () => ({ meta: [
    { title: "Page SEO Review | 7 Wings Admin" },
    { name: "description", content: "Private custom-domain content and indexing-signal reviews for 7 Wings Immigration." },
    { property: "og:title", content: "Page SEO Review | 7 Wings Admin" },
    { property: "og:description", content: "Review production page content and crawler evidence with specific AI recommendations." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: SeoReview,
});

function SeoReview() {
  const verify = useServerFn(verifyAdminToken);
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState("");
  const [evidence, setEvidence] = useState<ReviewEvidence | null>(null);
  const [copied, setCopied] = useState(false);
  const active = useRef<AbortController | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem("admin_blog_token");
    if (saved) { setToken(saved); verify({ data: { token: saved } }).then(() => setAuthed(true)).catch(() => setToken("")); }
    return () => active.current?.abort();
  }, [verify]);

  async function review(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const parsed = reviewInput.safeParse({ url });
    if (!parsed.success) { setError("Enter a public HTTPS page on www.7wingsimmigration.com or 7wingsimmigration.com."); return; }
    const controller = new AbortController();
    active.current = controller;
    setBusy(true); setAnswer(""); setThinking(""); setEvidence(null); setCopied(false); setStatus("Checking page…");
    try {
      const response = await fetch("/api/page-review", { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(parsed.data) });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error ?? "Review unavailable."); }
      if (!response.body) throw new Error("The review stream is unavailable.");
      const reader = response.body.getReader();
      controller.signal.addEventListener("abort", () => { void reader.cancel(); }, { once: true });
      const decoder = new TextDecoder();
      let buffer = "";
      let completed = false;
      while (true) {
        const chunk = await reader.read();
        if (controller.signal.aborted) throw new DOMException("Stopped", "AbortError");
        buffer += decoder.decode(chunk.value, { stream: !chunk.done });
        const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const event = JSON.parse(line);
          if (event.type === "status") setStatus(event.text);
          if (event.type === "evidence") { setEvidence(event.evidence); setStatus("Reviewing with Lovable AI…"); }
          if (event.type === "thinking") setThinking((old) => old + event.text);
          if (event.type === "text") setAnswer((old) => old + event.text);
          if (event.type === "error") { completed = true; setError(event.error); }
          if (event.type === "done") { completed = true; setStatus("Review complete"); }
        }
        if (chunk.done) break;
      }
      if (!completed) throw new Error("The review was interrupted. Any partial results are preserved.");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") setStatus("Stopped — partial results preserved");
      else setError(err instanceof Error ? err.message : "Review failed.");
    } finally { if (active.current === controller) { setBusy(false); active.current = null; } }
  }

  const exportText = () => `${evidence?.finalUrl ?? url}\n${evidence?.checkedAt ?? ""}\n\n${answer}\n\nObserved signals\n${JSON.stringify(evidence, null, 2)}`;
  return <main className="min-h-screen bg-background text-foreground"><section className="mx-auto max-w-5xl px-5 py-12">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div><Button asChild variant="link" className="px-0"><Link to="/admin/blog"><ArrowLeft /> Blog editor</Link></Button><h1 className="font-display text-3xl font-bold">Page SEO Review</h1></div>
      {authed && <Button variant="outline" onClick={() => { active.current?.abort(); localStorage.removeItem("admin_blog_token"); setAuthed(false); setToken(""); setAnswer(""); setEvidence(null); }}><LogOut /> Sign out</Button>}
    </div>
    {!authed ? <form className="max-w-sm space-y-4" onSubmit={async (e) => { e.preventDefault(); setError(""); try { await verify({ data: { token } }); localStorage.setItem("admin_blog_token", token); setAuthed(true); } catch { setError("The blog admin password is incorrect."); } }}>
      <label htmlFor="seo-password" className="block text-sm font-medium">Blog admin password</label><input id="seo-password" type="password" autoComplete="current-password" value={token} onChange={(e) => setToken(e.target.value)} required className="w-full rounded-md border border-input bg-background px-3 py-2" /><Button type="submit">Sign in</Button>
    </form> : <>
      <form onSubmit={review} className="border-b border-border pb-8">
        <label htmlFor="page-url" className="mb-2 block font-medium">Custom-domain page URL</label>
        <div className="flex flex-col gap-3 sm:flex-row"><input id="page-url" type="url" required maxLength={2000} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.7wingsimmigration.com/germany-opportunity-card-hyderabad" disabled={busy} className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-3" />
          {busy ? <Button key="stop" type="button" variant="outline" onClick={() => { active.current?.abort(); active.current = null; setBusy(false); setStatus("Stopped — partial results preserved"); }}><Square /> Stop</Button> : <Button key="review" type="submit" size="lg"><Search /> Review page</Button>}
        </div>
      </form>
      <div role="status" className="my-5 flex items-center gap-2 text-sm text-muted-foreground">{busy && <Loader2 className="animate-spin" />}{status}</div>
      {evidence && <section className="mb-8 border-b border-border pb-8">
        <h2 className="mb-4 text-xl font-semibold">Observed indexing signals</h2>
        <a href={evidence.finalUrl} target="_blank" rel="noreferrer" className="break-all text-primary underline">{evidence.finalUrl}</a>
        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">{[
          ["Page response", String(evidence.status)], ["Googlebot rules", evidence.googlebotAllowed === null ? "Unverified" : evidence.googlebotAllowed ? "Allowed" : "Blocked"],
          ["In sitemap", evidence.inSitemap === null ? "Unverified" : evidence.inSitemap ? "Yes" : "Not found"], ["Content words", String(evidence.wordCount)],
        ].map(([label, value]) => <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl>
        <p className="mt-5 text-sm text-muted-foreground">Google index status: not checked. These signals do not confirm inclusion in Google Search.</p>
        <details className="mt-4"><summary className="cursor-pointer text-sm font-medium">All page evidence</summary><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-md bg-muted p-4 text-xs">{JSON.stringify(evidence, null, 2)}</pre></details>
      </section>}
      {thinking && <details className="mb-5 text-sm text-muted-foreground"><summary className="cursor-pointer">AI review notes</summary><p className="mt-2 whitespace-pre-wrap">{thinking}</p></details>}
      {answer && <section><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Recommended improvements</h2><div className="flex gap-2"><Button variant="outline" title="Copy review" onClick={async () => { try { await navigator.clipboard.writeText(exportText()); setCopied(true); } catch { setError("Copy is unavailable in this browser; download the review instead."); } }}><Copy />{copied ? "Copied" : "Copy"}</Button><Button variant="outline" title="Download review" onClick={() => { const href = URL.createObjectURL(new Blob([exportText()], { type: "text/markdown" })); const a = document.createElement("a"); a.href = href; a.download = "7wings-page-review.md"; a.click(); URL.revokeObjectURL(href); }}><Download /> Download</Button></div></div><div className="prose max-w-none break-words"><ReactMarkdown components={{ h2: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold">{children}</h3>, h3: ({ children }) => <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>, p: ({ children }) => <p className="mb-4 leading-7">{children}</p>, ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>, ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>, blockquote: ({ children }) => <blockquote className="my-4 border-l-2 border-primary pl-4 text-muted-foreground">{children}</blockquote>, a: ({ href, children }) => <a href={href} className="text-primary underline" target="_blank" rel="noreferrer">{children}</a> }}>{answer}</ReactMarkdown></div></section>}
    </>}
    {error && <p role="alert" className="mt-5 rounded-md border border-destructive p-4 text-destructive">{error}</p>}
  </section></main>;
}