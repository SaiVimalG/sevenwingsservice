import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/**
 * Phone field with country-code + flag selector.
 * Defaults to India (+91) — does NOT auto-detect from browser/IP location.
 * Submits a single hidden input `name` with the full E.164 number (e.g. +919876543210).
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
  const [value, setValue] = useState<string | undefined>(defaultValue);
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <div className="rounded-xl border border-black/10 bg-white px-3 py-2.5 transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="IN"
          value={value}
          onChange={(v) => setValue(v)}
          placeholder="Enter phone number"
          className="seven-phone-input"
        />
      </div>
      {/* Hidden field actually submitted with the form */}
      <input type="hidden" name={name} value={value ?? ""} required={required} />
    </label>
  );
}
