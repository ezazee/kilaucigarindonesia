import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/dal";
import { logout } from "../actions/auth";
import AdminShell from "./_components/AdminShell";

const ADMIN_PATH = process.env.ADMIN_PATH!;

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <AdminShell adminPath={ADMIN_PATH} userName={user?.name} userRole={user?.role} logoutAction={logout}>
      {children}
    </AdminShell>
  );
}
