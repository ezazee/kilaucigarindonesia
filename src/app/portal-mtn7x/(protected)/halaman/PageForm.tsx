"use client";

import { useState } from "react";
import Image from "next/image";
import { Panel, inputClass, labelClass } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { PageSchema } from "./schema";

type MediaItem = { id: string; url: string; alt: string | null };

function ImagePicker({ name, label, currentUrl, media }: { name: string; label: string; currentUrl: string; media: MediaItem[] }) {
  const [selected, setSelected] = useState(currentUrl);
  const [open, setOpen] = useState(false);
  const selectedMedia = media.find((m) => m.url === selected);

  return (
    <div>
      <p className={labelClass}>{label}</p>
      {media.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada media. Upload dulu di menu Media.</p>
      ) : (
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-[#0c0c0e] border-2 border-[#C5A059]">
            {selectedMedia ? (
              <Image src={selectedMedia.url} alt={selectedMedia.alt ?? ""} fill className="object-contain p-1" sizes="80px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600 text-center px-1">Belum dipilih</div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-colors"
          >
            Ganti Gambar
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-3xl max-h-[85vh] rounded-lg border border-white/10 bg-[#111113] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 shrink-0">
              <h3 className="text-sm font-semibold text-white">Pilih Gambar &mdash; {label}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              className="p-5 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 gap-3 [scrollbar-color:#333_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/25"
            >
              {media.map((m) => (
                <label key={m.id} className="cursor-pointer group relative">
                  <input
                    type="radio"
                    name={`${name}__picker`}
                    value={m.url}
                    checked={selected === m.url}
                    onChange={() => {
                      setSelected(m.url);
                      setOpen(false);
                    }}
                    className="peer sr-only"
                  />
                  <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#0c0c0e] border-2 border-white/10 peer-checked:border-[#C5A059] transition-colors">
                    <Image src={m.url} alt={m.alt ?? ""} fill className="object-contain p-1" sizes="120px" />
                    <div className="absolute inset-0 bg-black/0 peer-checked:bg-[#C5A059]/10 transition-colors" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full border border-white/30 bg-black/50 peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-2.5 h-2.5"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <input type="hidden" name={name} value={selected} />
    </div>
  );
}

export default function PageForm({
  action,
  schema,
  media,
  defaults,
}: {
  action: (formData: FormData) => void;
  schema: PageSchema;
  media: MediaItem[];
  defaults: {
    titleId?: string;
    titleEn?: string;
    status?: string;
    contentId: Record<string, unknown>;
    contentEn: Record<string, unknown>;
    images: Record<string, string>;
  };
}) {
  const groups = Array.from(new Set(schema.fields.map((f) => f.group)));

  return (
    <form action={action} className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 items-start">
    <div className="space-y-5 min-w-0">
      <Panel title="Judul Halaman">
        <div className="grid sm:grid-cols-2 gap-5">
          <label>
            <span className={labelClass}>Indonesia</span>
            <input name="titleId" defaultValue={defaults.titleId} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>English</span>
            <input name="titleEn" defaultValue={defaults.titleEn} className={inputClass} />
          </label>
        </div>
      </Panel>

      {groups.map((group) => {
        const groupFields = schema.fields.filter((f) => f.group === group);
        return (
          <Panel key={group} title={`Section: ${group}`}>
            <div className="space-y-6">
              {groupFields.map((field, i) => (
                <div key={field.key} className={i > 0 ? "pt-6 border-t border-white/[0.06]" : ""}>
                  <p className={labelClass}>{field.label}</p>
                  {field.bilingual ? (
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label>
                        <span className={labelClass}>Indonesia</span>
                        {field.type === "textarea" ? (
                          <textarea
                            name={`${field.key}_id`}
                            defaultValue={String(defaults.contentId[field.key] ?? "")}
                            rows={4}
                            className={`${inputClass} resize-y`}
                          />
                        ) : (
                          <input name={`${field.key}_id`} defaultValue={String(defaults.contentId[field.key] ?? "")} className={inputClass} />
                        )}
                      </label>
                      <label>
                        <span className={labelClass}>English</span>
                        {field.type === "textarea" ? (
                          <textarea
                            name={`${field.key}_en`}
                            defaultValue={String(defaults.contentEn[field.key] ?? "")}
                            rows={4}
                            className={`${inputClass} resize-y`}
                          />
                        ) : (
                          <input name={`${field.key}_en`} defaultValue={String(defaults.contentEn[field.key] ?? "")} className={inputClass} />
                        )}
                      </label>
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea name={field.key} defaultValue={String(defaults.contentId[field.key] ?? "")} rows={3} className={`${inputClass} resize-y`} />
                  ) : (
                    <input name={field.key} defaultValue={String(defaults.contentId[field.key] ?? "")} className={inputClass} />
                  )}
                </div>
              ))}
            </div>
          </Panel>
        );
      })}
    </div>

    <div className="space-y-5 xl:sticky xl:top-8">
      {schema.images.length === 0 && (
        <div className="rounded-lg border border-dashed border-white/15 py-10 px-5 text-center">
          <p className="text-sm text-zinc-500">Halaman ini tidak memiliki gambar.</p>
        </div>
      )}
      {groups.map((group) => {
        const groupImages = schema.images.filter((i) => i.group === group);
        if (groupImages.length === 0) return null;
        return (
          <Panel key={group} title={`Gambar: ${group}`}>
            <div className="space-y-6">
              {groupImages.map((img) => (
                <ImagePicker
                  key={img.key}
                  name={`img_${img.key}`}
                  label={img.label}
                  currentUrl={defaults.images[img.key] ?? ""}
                  media={media}
                />
              ))}
            </div>
          </Panel>
        );
      })}

      <SubmitButton className="w-full justify-center" pendingText="Menyimpan..." successMessage="Halaman berhasil disimpan">Simpan Perubahan</SubmitButton>
    </div>
    </form>
  );
}
