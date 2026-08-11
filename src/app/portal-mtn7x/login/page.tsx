"use client";

import Image from "next/image";
import { useActionState } from "react";
import { login, LoginState } from "../actions/auth";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] px-4">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <Image src="/logo/kci-logo-png-300x175.png" alt="Kilau Cigar Indonesia" width={120} height={70} className="mx-auto mb-3" style={{ height: "auto" }} />
          <h1 className="mt-2 text-xl font-serif font-bold text-white">Admin Panel</h1>
        </div>

        <form
          action={formAction}
          className="rounded-lg border border-white/[0.06] bg-[#111113] p-7"
        >
          <label className="block mb-4">
            <span className="block text-xs font-medium text-zinc-500 mb-1.5">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full rounded-md border border-white/10 bg-[#0c0c0e] px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/60 focus:border-[#C5A059]/60"
            />
          </label>

          <label className="block mb-5">
            <span className="block text-xs font-medium text-zinc-500 mb-1.5">Password</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/10 bg-[#0c0c0e] px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/60 focus:border-[#C5A059]/60"
            />
          </label>

          {state?.error && (
            <p className="mb-4 rounded-md bg-[#d03b3b]/10 border border-[#d03b3b]/30 px-3 py-2 text-xs text-[#e57373]">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-[#C5A059] py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d9b672] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
