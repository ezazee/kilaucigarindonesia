"use client";

import { useState } from "react";
import Image from "next/image";
import { Panel, inputClass, labelClass } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { PACKAGING_LABEL } from "../_lib/theme";

type Category = { id: string; name: string };
type MediaItem = { id: string; url: string; alt: string | null; product?: { nameId: string } | null };

function filenameOf(url: string) {
  return url.split("/").pop() ?? url;
}
type Variant = { packagingType: string; price: number; qtyPerBox: number | null; stockStatus: string };

type ProductDefaults = {
  nameId?: string;
  nameEn?: string;
  shortDescId?: string;
  shortDescEn?: string;
  descriptionId?: string;
  descriptionEn?: string;
  length?: string | null;
  ring?: string | null;
  shape?: string | null;
  strengthId?: string | null;
  strengthEn?: string | null;
  wrapper?: string | null;
  binder?: string | null;
  filler?: string | null;
  categoryId?: string;
  stockStatus?: string;
  published?: boolean;
  variants?: Variant[];
  imageIds?: string[];
};

function Field({ label, name, defaultValue, textarea = false, placeholder }: { label: string; name: string; defaultValue?: string; textarea?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} placeholder={placeholder} className={`${inputClass} resize-y`} />
      ) : (
        <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={inputClass} />
      )}
    </label>
  );
}

const PACKAGING = [
  { key: "SATUAN", label: PACKAGING_LABEL.SATUAN },
  { key: "CARD_BOX", label: PACKAGING_LABEL.CARD_BOX },
  { key: "WOODEN_BOX", label: PACKAGING_LABEL.WOODEN_BOX },
];

export default function ProductForm({
  action,
  categories,
  media,
  defaults = {},
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  media: MediaItem[];
  defaults?: ProductDefaults;
}) {
  const variantByType: Record<string, Variant> = {};
  (defaults.variants ?? []).forEach((v) => (variantByType[v.packagingType] = v));

  const [selectedIds, setSelectedIds] = useState<string[]>(defaults.imageIds ?? []);
  const selectedMedia = selectedIds
    .map((id) => media.find((m) => m.id === id))
    .filter((m): m is MediaItem => Boolean(m));

  function toggleImage(id: string, checked: boolean) {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  }

  return (
    <form action={action} className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 items-start">
    <div className="space-y-5 min-w-0">
      <Panel title="Nama & Deskripsi">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nama (Indonesia)" name="nameId" defaultValue={defaults.nameId} />
          <Field label="Nama (English)" name="nameEn" defaultValue={defaults.nameEn} />
          <Field label="Deskripsi Singkat (ID)" name="shortDescId" defaultValue={defaults.shortDescId} textarea />
          <Field label="Deskripsi Singkat (EN)" name="shortDescEn" defaultValue={defaults.shortDescEn} textarea />
          <Field label="Deskripsi Lengkap (ID)" name="descriptionId" defaultValue={defaults.descriptionId} textarea />
          <Field label="Deskripsi Lengkap (EN)" name="descriptionEn" defaultValue={defaults.descriptionEn} textarea />
        </div>
      </Panel>

      <Panel title="Kategori & Status">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelClass}>Kategori</span>
            <select name="categoryId" defaultValue={defaults.categoryId} required className={inputClass}>
              <option value="">-- pilih kategori --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Stock Status</span>
            <select name="stockStatus" defaultValue={defaults.stockStatus ?? "READY"} className={inputClass}>
              <option value="READY">Ready</option>
              <option value="SOLD_OUT">Sold Out</option>
              <option value="DISCONTINUED">Discontinued</option>
            </select>
          </label>
        </div>
        <label className="flex items-center gap-2.5 mt-5">
          <input type="checkbox" name="published" defaultChecked={defaults.published ?? true} className="w-4 h-4 rounded accent-[#C5A059]" />
          <span className="text-sm text-zinc-300">Published (tampil di situs publik)</span>
        </label>
      </Panel>

      <Panel title="Spesifikasi">
        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Length (inci)" name="length" defaultValue={defaults.length ?? ""} placeholder='mis. 5½' />
          <Field label="Ring Gauge" name="ring" defaultValue={defaults.ring ?? ""} placeholder="mis. 52" />
          <Field label="Shape" name="shape" defaultValue={defaults.shape ?? ""} placeholder="mis. Toro" />
          <Field label="Strength (ID)" name="strengthId" defaultValue={defaults.strengthId ?? ""} />
          <Field label="Strength (EN)" name="strengthEn" defaultValue={defaults.strengthEn ?? ""} />
          <Field label="Wrapper" name="wrapper" defaultValue={defaults.wrapper ?? ""} />
          <Field label="Binder" name="binder" defaultValue={defaults.binder ?? ""} />
          <Field label="Filler" name="filler" defaultValue={defaults.filler ?? ""} />
        </div>
      </Panel>

      <Panel title="Varian Packaging & Harga" action={<span className="text-xs text-zinc-500">Kosongkan harga jika tidak tersedia</span>}>
        <div className="space-y-4">
          {PACKAGING.map((pkg) => {
            const v = variantByType[pkg.key];
            return (
              <div key={pkg.key} className="grid grid-cols-[90px_1fr_1fr_1fr] gap-3 items-end">
                <span className="text-sm text-zinc-300 pb-2.5">{pkg.label}</span>
                <label>
                  <span className={labelClass}>Harga (Rp)</span>
                  <input type="number" name={`price_${pkg.key}`} defaultValue={v?.price ?? ""} className={inputClass} />
                </label>
                <label>
                  <span className={labelClass}>Qty/Box</span>
                  <input type="number" name={`qty_${pkg.key}`} defaultValue={v?.qtyPerBox ?? ""} className={inputClass} />
                </label>
                <label>
                  <span className={labelClass}>Stock</span>
                  <select name={`stock_${pkg.key}`} defaultValue={v?.stockStatus ?? "READY"} className={inputClass}>
                    <option value="READY">Ready</option>
                    <option value="SOLD_OUT">Sold Out</option>
                    <option value="DISCONTINUED">Discontinued</option>
                  </select>
                </label>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>

    <div className="space-y-5 xl:sticky xl:top-8">
      <Panel title="Gambar Produk" action={<span className="text-xs text-zinc-500">{selectedIds.length} terpilih</span>}>
        {media.length === 0 ? (
          <p className="text-sm text-zinc-500">Belum ada media diupload. Buka menu Media untuk upload gambar dulu.</p>
        ) : (
          <>
            <div className="mb-5">
              <p className={labelClass}>Gambar terpilih untuk produk ini</p>
              {selectedMedia.length === 0 ? (
                <p className="text-sm text-zinc-500 rounded-md border border-dashed border-white/10 px-3 py-3">
                  Belum ada gambar dipilih — centang gambar di daftar bawah.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {selectedMedia.map((m, i) => (
                    <div key={m.id} className="relative w-20">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#0c0c0e] border-2 border-[#C5A059]">
                        <Image src={m.url} alt={m.alt ?? ""} fill className="object-contain p-1" sizes="80px" />
                        <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-500 truncate" title={filenameOf(m.url)}>
                        {filenameOf(m.url)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className={labelClass}>Pilih dari semua media</p>
            <div className="grid grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {media.map((m) => {
                const checked = selectedIds.includes(m.id);
                const usedByOther = m.product && !checked;
                return (
                  <label key={m.id} className="cursor-pointer group relative">
                    <input
                      type="checkbox"
                      name="imageIds"
                      value={m.id}
                      checked={checked}
                      onChange={(e) => toggleImage(m.id, e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#0c0c0e] border-2 border-white/10 peer-checked:border-[#C5A059] transition-colors">
                      <Image src={m.url} alt={m.alt ?? ""} fill className="object-contain p-1" sizes="120px" />
                      <div className="absolute inset-0 bg-black/0 peer-checked:bg-[#C5A059]/10 transition-colors" />
                    </div>
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full border border-white/30 bg-black/50 peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-2.5 h-2.5"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <p className="mt-1 text-[10px] text-zinc-500 truncate" title={filenameOf(m.url)}>
                      {filenameOf(m.url)}
                    </p>
                    {usedByOther && (
                      <p className="text-[9px] text-[#fab219] truncate" title={`Dipakai produk lain: ${m.product!.nameId}`}>
                        dipakai: {m.product!.nameId}
                      </p>
                    )}
                  </label>
                );
              })}
            </div>
          </>
        )}
      </Panel>

      <SubmitButton className="w-full justify-center" pendingText="Menyimpan..." successMessage="Produk berhasil disimpan">Simpan Produk</SubmitButton>
    </div>
    </form>
  );
}
