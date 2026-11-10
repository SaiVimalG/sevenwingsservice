import { useEffect, useState } from "react";
import { Copy, ExternalLink, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buildCoverPrompt, COVER_SPEC, MOODS, SUBJECTS } from "@/lib/cover-prompt";

const COUNTRIES = ["Germany", "Canada", "Australia", "UK", "USA", "India", "New Zealand", "Ireland", "Japan", "Global"];

export function ImgPromptDialog({ title: initialTitle, country: initialCountry }: { title: string; country: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [country, setCountry] = useState(initialCountry || "Global");
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [mood, setMood] = useState<string>(MOODS[0]);
  const [overlay, setOverlay] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (open) { setTitle(initialTitle); if (initialCountry) setCountry(initialCountry); }
  }, [open, initialTitle, initialCountry]);

  const field = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold";
  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full"><Wand2 />IMG Prompt</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader><DialogTitle>AI Banner Prompt Generator</DialogTitle></DialogHeader>
        <div className="space-y-3 text-sm">
          <label className="block">Blog title<input className={field} value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label className="block">Target country / region
            <input className={field} list="img-prompt-countries" value={country} onChange={(e) => setCountry(e.target.value)} />
            <datalist id="img-prompt-countries">{COUNTRIES.map((c) => <option key={c} value={c} />)}</datalist>
          </label>
          <label className="block">Subject / character style
            <select className={field} value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <label className="block">Visual mood & lighting
            <select className={field} value={mood} onChange={(e) => setMood(e.target.value)}>{MOODS.map((m) => <option key={m}>{m}</option>)}</select>
          </label>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs">Target Dimensions: {COVER_SPEC.width}x{COVER_SPEC.height}px ({COVER_SPEC.ratio})</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">Upload Max: {COVER_SPEC.maxKB} KB</span>
          </div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={overlay} onChange={(e) => setOverlay(e.target.checked)} />Include title text overlay</label>
          <Button type="button" className="w-full rounded-full" disabled={!title.trim()} onClick={() => setPrompt(buildCoverPrompt({ title, country, subject, mood, overlay }))}>Generate Prompt</Button>
          {prompt && (
            <div className="space-y-2">
              <textarea readOnly value={prompt} rows={Math.min(16, prompt.split("\n").length + 2)} className={`${field} font-mono text-xs`} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={copy}><Copy />Copy Prompt</Button>
                <Button type="button" size="sm" variant="outline" asChild><a href="https://chatgpt.com/" target="_blank" rel="noreferrer"><ExternalLink />Open ChatGPT</a></Button>
                <Button type="button" size="sm" variant="outline" asChild><a href="https://gemini.google.com/app" target="_blank" rel="noreferrer"><ExternalLink />Open Google Gemini</a></Button>
              </div>
              <p className="rounded-lg border border-gold/40 bg-gold/10 p-3 text-xs">
                Website Upload Constraint: Max {COVER_SPEC.maxKB} KB at {COVER_SPEC.width}x{COVER_SPEC.height}px. AI models output full-resolution PNGs (1–3 MB); please compress or convert to WebP before uploading to stay under the site limit.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
