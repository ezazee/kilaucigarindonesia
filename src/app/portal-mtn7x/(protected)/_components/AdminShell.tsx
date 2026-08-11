"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SidebarNav from "./SidebarNav";
import { IconLogout } from "./icons";
import { ToastProvider } from "./Toast";

export default function AdminShell({
  adminPath,
  userName,
  userRole,
  logoutAction,
  children,
}: {
  adminPath: string;
  userName?: string;
  userRole?: string;
  logoutAction: (formData: FormData) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile drawer on navigation (adjusting state during render
  // avoids the setState-in-effect cascading-render anti-pattern).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  const sidebarContent = (
    <>
      <div className="px-2 mb-8 flex items-center gap-2.5">
        <Image src="/logo/kci-logo-png-300x175.png" alt="Kilau Cigar Indonesia" width={34} height={20} className="shrink-0" style={{ height: "auto" }} />
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#C5A059] leading-tight">Kilau Cigar Indonesia</div>
          <div className="text-sm font-serif font-bold text-white leading-tight">Admin Panel</div>
        </div>
      </div>
      <SidebarNav adminPath={adminPath} />

      <div className="mt-auto pt-6 border-t border-white/[0.06]">
        <div className="px-2 mb-3">
          <p className="text-sm text-white font-medium truncate">{userName}</p>
          <p className="text-[11px] text-zinc-500">{userRole === "SUPERADMIN" ? "Superadmin" : "Editor"}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white hover:bg-white/5"
          >
            <IconLogout className="w-[18px] h-[18px]" />
            Logout
          </button>
        </form>
      </div>
    </>
  );

  return (
    <ToastProvider>
    <div className="min-h-screen bg-[#0a0a0b] lg:flex">
      {/* Mobile topbar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.06] bg-[#0c0c0e] px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="rounded-md p-1.5 text-zinc-300 hover:bg-white/5 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <Image src="/logo/kci-logo-png-300x175.png" alt="Kilau Cigar Indonesia" width={26} height={15} className="shrink-0" style={{ height: "auto" }} />
        <span className="text-sm font-serif font-bold text-white">Admin Panel</span>
      </div>

      {/* Mobile drawer backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/70" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar: static on desktop, slide-in drawer on mobile/tablet */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 lg:w-60 shrink-0 overflow-y-auto border-r border-white/[0.06] bg-[#0c0c0e] px-4 py-6 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10">{children}</main>
    </div>
    </ToastProvider>
  );
}
