// app>dashboard>layout.tsx
import { requireUser } from "@/lib/hooks";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

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
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false}>
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
