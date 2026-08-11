import "server-only";
import { prisma } from "@/lib/prisma";

export async function logActivity(userId: string, action: string, entity: string, entityId?: string) {
  try {
    await prisma.activityLog.create({ data: { userId, action, entity, entityId } });
  } catch (e) {
    console.error("logActivity failed", e);
  }
}
