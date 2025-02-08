// app>dashboard>layout.tsx
import { auth } from "@/auth";
import { requireUser } from "@/lib/hooks";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard CalAndri",
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  if (!session?.user) {
    return redirect("/");
  }
  return <>{children}</>;
}
