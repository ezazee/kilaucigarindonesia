"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { logActivity } from "@/lib/activity-log";
import { hashPassword, verifyPassword } from "@/lib/password";
import { sanitizeUrl } from "@/lib/url-safety";

const ADMIN_PATH = process.env.ADMIN_PATH;

export async function saveSettings(formData: FormData) {
  const session = await verifySession();

  const value = {
    siteTitle: String(formData.get("siteTitle") ?? ""),
    siteDescription: String(formData.get("siteDescription") ?? ""),
    instagramUrl: sanitizeUrl(String(formData.get("instagramUrl") ?? "")),
    facebookUrl: sanitizeUrl(String(formData.get("facebookUrl") ?? "")),
    youtubeUrl: sanitizeUrl(String(formData.get("youtubeUrl") ?? "")),
    whatsappNumber: String(formData.get("whatsappNumber") ?? ""),
    contactEmail: String(formData.get("contactEmail") ?? ""),
    officeLocation: String(formData.get("officeLocation") ?? ""),
    footerDescriptionId: String(formData.get("footerDescriptionId") ?? ""),
    footerDescriptionEn: String(formData.get("footerDescriptionEn") ?? ""),
    operatingHoursId: String(formData.get("operatingHoursId") ?? ""),
    operatingHoursEn: String(formData.get("operatingHoursEn") ?? ""),
    waProductTemplateId: String(formData.get("waProductTemplateId") ?? ""),
    waProductTemplateEn: String(formData.get("waProductTemplateEn") ?? ""),
    waContactTemplateId: String(formData.get("waContactTemplateId") ?? ""),
    waContactTemplateEn: String(formData.get("waContactTemplateEn") ?? ""),
  };

  await prisma.setting.upsert({
    where: { key: "general" },
    update: { value },
    create: { key: "general", value },
  });

  await logActivity(session.userId, "UPDATE", "Setting", "general");

  revalidateTag("settings", "max");
  revalidatePath(`/${ADMIN_PATH}/pengaturan`);
  revalidatePath("/", "layout");
}

export async function changePassword(formData: FormData) {
  const session = await verifySession();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) {
    throw new Error("Password baru minimal 8 karakter.");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("Konfirmasi password baru tidak cocok.");
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) throw new Error("User tidak ditemukan.");

  const valid = await verifyPassword(currentPassword, user.password);
  if (!valid) throw new Error("Password saat ini salah.");

  const hashed = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  await logActivity(session.userId, "UPDATE", "User", user.id);
  revalidatePath(`/${ADMIN_PATH}/pengaturan`);
}
