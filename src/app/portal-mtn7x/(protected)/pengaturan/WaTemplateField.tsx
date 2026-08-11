"use client";

import { useState } from "react";
import { inputClass, labelClass } from "../_components/ui";
import { renderWaTemplate } from "@/lib/wa-template";

export default function WaTemplateField({
  name,
  label,
  defaultValue,
  placeholder,
  example,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder: string;
  example: Record<string, string>;
}) {
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div>
      <label className="block">
        <span className={labelClass}>{label}</span>
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`${inputClass} resize-y font-mono text-xs`}
        />
      </label>
      <div className="mt-2 rounded-md border border-dashed border-white/10 bg-[#0a0a0a] p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1.5">Contoh Hasil</p>
        <p className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
          {renderWaTemplate(value || placeholder, example)}
        </p>
      </div>
    </div>
  );
}
