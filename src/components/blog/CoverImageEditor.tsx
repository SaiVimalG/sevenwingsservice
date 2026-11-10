import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, Loader2, RefreshCw, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogBrand, saveBlogBrand } from "@/lib/blog-brand.functions";
import { generateCover, brandCover } from "@/lib/blog-cover-image";
import { SITE } from "@/lib/site";

type Props = {
  token: string; title: string; country: string; topic: string; content: string; value: string;
  onChange: (url: string) => void; onUpload: (file: File) => Promise<string>;
};

export function CoverImageEditor({ token, title, country, topic, content, value, onChange, onUpload }: Props) {
  const getBrand = useServerFn(getBlogBrand);
  const saveBrand = useServerFn(saveBlogBrand);
  const [logo, setLogo] = useState("");
  const [brandReady, setBrandReady] = useState(false);
  const [busy, setBusy] = useState<"generate" | "upload" | "logo" | "use" | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [raw, setRaw] = useState("");
  const [final, setFinal] = useState(false);
  const [refine, setRefine] = useState(false);
  const [instructions, setInstructions] = useState("");
  const coverInput = useRef<HTMLInputElement>(null);
  const logoInput = useRef<HTMLInputElement>(null);
  const inputClass = "w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold";

  useEffect(() => {
    let active = true;
    getBrand({ data: { token } }).then(({ url }) => {
      if (active) { setLogo(url || SITE.logoUrl); setBrandReady(true); }
    }).catch((e) => { if (active) setError(e instanceof Error ? e.message : "Cannot load brand logo."); });
    return () => { active = false; };
  }, [token, getBrand]);

  const upload = async (file: File, isLogo = false) => {
    setBusy(isLogo ? "logo" : "upload"); setError("");
    try {
      if (isLogo) {
        if (file.size > 5 * 1024 * 1024) throw new Error("Logo must be under 5 MB.");
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader(); reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error("Cannot read logo.")); reader.readAsDataURL(file);
        });
        const result = await saveBrand({ data: { token, contentType: file.type, base64: dataUrl.split(",")[1] || "" } });
        setLogo(result.url); setBrandReady(true);
        // A changed logo invalidates any earlier preview, avoiding stale branding.
        setPreview(""); setRaw(""); setFinal(false);
      } else onChange(await onUpload(file));
    } catch (e) { setError(e instanceof Error ? e.message : "Upload failed."); }
    finally { setBusy(null); }
  };

  const run = async (again = false) => {
    setBusy("generate"); setError(""); setFinal(false);
    const oldPreview = preview;
    try {
      const source = await generateCover(token, {
        title, country, topic: topic || title, content,
        instructions: again ? instructions : "", ...(again && raw ? { previous: raw } : {}),
      }, setPreview);
      const branded = await brandCover(source, logo);
      setRaw(source); setPreview(branded); setFinal(true); setRefine(false);
    } catch (e) {
      setPreview(oldPreview); setFinal(Boolean(oldPreview));
      setError(e instanceof Error ? e.message : "Image generation failed.");
    } finally { setBusy(null); }
  };

  const useImage = async () => {
    if (!final || !preview) return;
    setBusy("use"); setError("");
    try {
      const blob = await (await fetch(preview)).blob();
      const url = await onUpload(new File([blob], "blog-cover.jpg", { type: "image/jpeg" }));
      onChange(url); setPreview(""); setRaw(""); setFinal(false); setRefine(false);
    } catch (e) { setError(e instanceof Error ? e.message : "Cannot save cover image."); }
    finally { setBusy(null); }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-sm font-semibold text-navy-deep">Cover image</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-full" disabled={Boolean(busy)} onClick={() => coverInput.current?.click()}>
            {busy === "upload" ? <Loader2 className="animate-spin" /> : <Upload />}
            {busy === "upload" ? "Uploading…" : "Upload Image"}
          </Button>
          <Button variant="outline" className="rounded-full border-gold/40 text-navy-deep" disabled={Boolean(busy) || !brandReady || title.trim().length < 3 || country.trim().length < 2} onClick={() => run()}>
            {busy === "generate" ? <Loader2 className="animate-spin" /> : <ImagePlus />}
            {busy === "generate" ? "Generating…" : "Generate Image"}
          </Button>
          <input aria-label="Cover image URL" placeholder="…or paste an image URL" value={value} disabled={busy === "use"} onChange={(e) => onChange(e.target.value)} className={`${inputClass} flex-1 basis-56`} />
          <input ref={coverInput} aria-label="Upload cover image" type="file" className="hidden" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.target.value = ""; }} />
        </div>
        {value && <img src={value} alt="Selected blog cover" className="mt-3 aspect-video w-full max-w-lg rounded-lg border border-border object-cover" />}
      </div>

      {(preview || busy === "generate") && (
        <div className="space-y-3" aria-live="polite">
          <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-muted">
            {preview && <img src={preview} alt="Generated blog cover preview" className={`h-full w-full object-cover transition-[filter] ${final ? "blur-0" : "blur-2xl"}`} />}
            {busy === "generate" && <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/70 text-sm text-foreground"><Loader2 className="size-5 animate-spin" /> Generating cover image…</div>}
          </div>
          {final && <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={Boolean(busy)} onClick={() => setRefine(!refine)}><RefreshCw /> Recreate Image</Button>
            <Button disabled={Boolean(busy)} onClick={useImage}>{busy === "use" ? <Loader2 className="animate-spin" /> : <Check />} {busy === "use" ? "Saving image…" : "Use Image"}</Button>
          </div>}
          {refine && final && <div className="max-w-2xl space-y-2">
            <textarea aria-label="Image suggestions" value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={3} maxLength={4000} className={inputClass} placeholder="Enter your image suggestions…" disabled={Boolean(busy)} />
            <Button disabled={Boolean(busy) || !instructions.trim()} onClick={() => run(true)}><ImagePlus /> Generate Again</Button>
          </div>}
        </div>
      )}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
        <span className="text-sm font-semibold text-navy-deep">Brand Logo</span>
        {logo && <img src={logo} alt="Saved brand logo" className="h-12 w-28 rounded-lg border border-border bg-background object-contain p-2" />}
        <Button variant="outline" size="sm" disabled={Boolean(busy)} onClick={() => logoInput.current?.click()}>{busy === "logo" ? <Loader2 className="animate-spin" /> : <Upload />} {busy === "logo" ? "Saving logo…" : logo ? "Replace Logo" : "Upload Logo"}</Button>
        <input ref={logoInput} aria-label="Upload brand logo" type="file" className="hidden" accept="image/png,image/jpeg,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file, true); e.target.value = ""; }} />
      </div>
    </div>
  );
}