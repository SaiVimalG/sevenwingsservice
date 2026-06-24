import { useState } from "react";

/**
 * Lightweight phone field.
 * Defaults to India (+91) without rendering a 245-option country selector.
 */
export function PhoneField({
  name = "phone",
  label = "Phone",
  required,
  defaultValue,
}: {
  name?: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <div className="rounded-xl border border-black/10 bg-white px-3 py-2.5 transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded-md bg-cream px-2 py-1 text-sm font-semibold text-navy-deep" aria-hidden>
            +91
          </span>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-label={label || "Phone number"}
            required={required}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter phone number"
            className="min-h-9 w-full bg-transparent text-sm text-navy-deep outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <input
        type="hidden"
        name={name}
        value={value.trim().startsWith("+") ? value.trim() : `+91${value.replace(/\D/g, "")}`}
      />
    </label>
  );
}
