"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";

const ADMIN_PATH = process.env.ADMIN_PATH;

export interface LoginState {
  error?: string;
}

// A bcrypt hash of a random, never-used password. Compared against on a
// "user not found" path so failed logins take roughly the same time whether
// the email exists or not — otherwise the skipped bcrypt.compare() call
// would make "unknown email" responses measurably faster, letting an
// attacker enumerate registered admin emails via response timing.
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8Q4wqbTutQNlWsvsmY0ZTObNRPnH7q";

// In-memory login throttle: 5 attempts per email per 15 minutes. Resets on
// process restart and isn't shared across instances — acceptable for this
// single-instance admin panel, not a substitute for a real rate limiter if
// this app is ever deployed behind multiple server instances.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  if (isRateLimited(email)) {
    return { error: "Terlalu banyak percobaan. Coba lagi dalam beberapa menit." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const passwordValid = await verifyPassword(password, user?.password ?? DUMMY_HASH);

  if (!user || !passwordValid) {
    return { error: "Email atau password salah." };
  }

  attempts.delete(email);
  await createSession(user.id, user.role);
  redirect(`/${ADMIN_PATH}`);
}

export async function logout() {
  await deleteSession();
  redirect(`/${ADMIN_PATH}/login`);
}
