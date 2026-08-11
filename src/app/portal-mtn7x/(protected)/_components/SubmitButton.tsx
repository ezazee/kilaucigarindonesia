"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "./Toast";

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type Variant = "primary" | "danger" | "ghost";

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-md bg-[#C5A059] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d9b672] disabled:opacity-60 disabled:cursor-not-allowed",
  danger:
    "inline-flex items-center gap-1.5 rounded-md border border-[#d03b3b]/30 px-2.5 py-1.5 text-xs font-medium text-[#e57373] transition-colors hover:bg-[#d03b3b]/10 disabled:opacity-60 disabled:cursor-not-allowed",
  ghost:
    "inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#C5A059] transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
};

export function SubmitButton({
  children,
  pendingText,
  successMessage,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  pendingText?: string;
  successMessage?: string;
  variant?: Variant;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const toast = useToast();
  const wasSubmitting = useRef(false);

  useEffect(() => {
    if (pending) {
      wasSubmitting.current = true;
      return;
    }
    if (wasSubmitting.current) {
      wasSubmitting.current = false;
      if (successMessage) toast.push(successMessage, "success");
    }
  }, [pending, successMessage, toast]);

  return (
    <button type="submit" disabled={pending} className={`${VARIANT_CLASS[variant]} ${className}`}>
      {pending && <Spinner className="w-3.5 h-3.5 shrink-0" />}
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
