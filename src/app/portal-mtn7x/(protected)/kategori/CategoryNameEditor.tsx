"use client";

import { useState } from "react";
import { updateCategory } from "./actions";
import { inputClass } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { IconEdit } from "../_components/icons";

export default function CategoryNameEditor({ id, name, color }: { id: string; name: string; color: string }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateCategory(formData);
          setEditing(false);
        }}
        className="flex items-center gap-2"
      >
        <input type="hidden" name="id" value={id} />
        <input name="name" defaultValue={name} autoFocus className={`${inputClass} py-1.5 text-sm max-w-[180px]`} />
        <SubmitButton variant="ghost" pendingText="Menyimpan..." successMessage="Nama kategori berhasil diubah">
          Simpan
        </SubmitButton>
        <button type="button" onClick={() => setEditing(false)} className="text-xs text-zinc-500 hover:text-white shrink-0">
          Batal
        </button>
      </form>
    );
  }

  return (
    <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-2.5 group">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-white font-medium group-hover:text-[#C5A059] transition-colors">{name}</span>
      <IconEdit className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
