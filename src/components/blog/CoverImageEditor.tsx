import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
};

export function CoverImageEditor({ value, onChange, onUpload }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const coverInput = useRef<HTMLInputElement>(null);
  const inputClass = "w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold";

  const upload = async (file: File) => {
    setBusy(true); setError("");
    try { onChange(await onUpload(file)); }
    catch (e) { setError(e instanceof Error ? e.message : "Upload failed."); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-sm font-semibold text-navy-deep">Cover image</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-full" disabled={busy} onClick={() => coverInput.current?.click()}>
            {busy ? <Loader2 className="animate-spin" /> : <Upload />}
            {busy ? "Uploading…" : "Upload Image"}
          </Button>
          <input aria-label="Cover image URL" placeholder="…or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} flex-1 basis-56`} />
          <input ref={coverInput} aria-label="Upload cover image" type="file" className="hidden" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.target.value = ""; }} />
        </div>
        {value && <img src={value} alt="Selected blog cover" className="mt-3 aspect-video w-full max-w-lg rounded-lg border border-border object-cover" />}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
