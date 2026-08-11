"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconOverview,
  IconProduct,
  IconCategory,
  IconMedia,
  IconPage,
  IconSettings,
  IconActivity,
} from "./icons";
import { PAGE_SCHEMAS } from "../halaman/schema";

const MONTENEGRO_CHILDREN = Object.entries(PAGE_SCHEMAS)
  .filter(([slug]) => slug.startsWith("montenegro-"))
  .map(([slug, schema]) => ({ slug, label: schema.label.replace("Koleksi Montenegro: ", "") }));

const PAGE_CHILDREN = Object.entries(PAGE_SCHEMAS)
  .filter(([slug]) => !slug.startsWith("montenegro-"))
  .map(([slug, schema]) => ({ slug, label: schema.label }));

const NAV_ITEMS = [
  { href: "", label: "Overview", icon: IconOverview },
  { href: "/produk", label: "Produk", icon: IconProduct },
  { href: "/kategori", label: "Kategori", icon: IconCategory },
  { href: "/media", label: "Media", icon: IconMedia },
  { href: "/pengaturan", label: "Pengaturan", icon: IconSettings },
  { href: "/aktivitas", label: "Aktivitas", icon: IconActivity },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-3.5 h-3.5 ml-auto shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function SidebarNav({ adminPath }: { adminPath: string }) {
  const pathname = usePathname();
  const base = `/${adminPath}`;
  const halamanBase = `${base}/halaman`;
  const isOnHalaman = pathname.startsWith(halamanBase);
  const [manualOpen, setManualOpen] = useState(false);
  const [prevIsOnHalaman, setPrevIsOnHalaman] = useState(isOnHalaman);

  if (isOnHalaman !== prevIsOnHalaman) {
    setPrevIsOnHalaman(isOnHalaman);
    if (isOnHalaman) setManualOpen(true);
  }

  const halamanOpen = isOnHalaman || manualOpen;

  const isOnMontenegro = MONTENEGRO_CHILDREN.some((p) => pathname === `${halamanBase}/${p.slug}`);
  const [montenegroManualOpen, setMontenegroManualOpen] = useState(false);
  const [prevIsOnMontenegro, setPrevIsOnMontenegro] = useState(isOnMontenegro);

  if (isOnMontenegro !== prevIsOnMontenegro) {
    setPrevIsOnMontenegro(isOnMontenegro);
    if (isOnMontenegro) setMontenegroManualOpen(true);
  }

  const montenegroOpen = isOnMontenegro || montenegroManualOpen;

  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.slice(0, 4).map((item) => {
        const href = `${base}${item.href}`;
        const isActive = item.href === "" ? pathname === base : pathname.startsWith(href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-[#C5A059]/10 text-[#C5A059] font-medium"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => setManualOpen((v) => !v)}
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
          isOnHalaman ? "bg-[#C5A059]/10 text-[#C5A059] font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <IconPage className="w-[18px] h-[18px] shrink-0" />
        Halaman
        <ChevronIcon open={halamanOpen} />
      </button>
      {halamanOpen && (
        <div className="ml-[27px] flex flex-col gap-0.5 border-l border-white/[0.06] pl-3 mb-1">
          {PAGE_CHILDREN.slice(0, 2).map((p) => {
            const href = `${halamanBase}/${p.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={p.slug}
                href={href}
                className={`rounded-md px-2.5 py-1.5 text-xs transition-colors truncate ${
                  isActive ? "text-[#C5A059] font-medium" : "text-zinc-500 hover:text-white"
                }`}
              >
                {p.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMontenegroManualOpen((v) => !v)}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
              isOnMontenegro ? "text-[#C5A059] font-medium" : "text-zinc-500 hover:text-white"
            }`}
          >
            Koleksi Montenegro
            <ChevronIcon open={montenegroOpen} />
          </button>
          {montenegroOpen && (
            <div className="ml-3 flex flex-col gap-0.5 border-l border-white/[0.06] pl-3">
              {MONTENEGRO_CHILDREN.map((p) => {
                const href = `${halamanBase}/${p.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={p.slug}
                    href={href}
                    className={`rounded-md px-2.5 py-1.5 text-xs transition-colors truncate ${
                      isActive ? "text-[#C5A059] font-medium" : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </div>
          )}

          {PAGE_CHILDREN.slice(2).map((p) => {
            const href = `${halamanBase}/${p.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={p.slug}
                href={href}
                className={`rounded-md px-2.5 py-1.5 text-xs transition-colors truncate ${
                  isActive ? "text-[#C5A059] font-medium" : "text-zinc-500 hover:text-white"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      )}

      {NAV_ITEMS.slice(4).map((item) => {
        const href = `${base}${item.href}`;
        const isActive = pathname.startsWith(href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-[#C5A059]/10 text-[#C5A059] font-medium"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
