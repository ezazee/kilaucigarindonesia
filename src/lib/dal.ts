import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, getSessionCookie } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const ADMIN_PATH = process.env.ADMIN_PATH;

export const verifySession = cache(async () => {
  const cookie = await getSessionCookie();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect(`/${ADMIN_PATH}/login`);
  }

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  return user;
});

export async function requireSuperadmin() {
  const session = await verifySession();
  if (session.role !== "SUPERADMIN") {
    throw new Error("Aksi ini hanya untuk superadmin.");
  }
  return session;
}
