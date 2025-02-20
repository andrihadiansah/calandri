// app>dashboard>layout.tsx
import { requireUser } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/db";

// Fungsi getData untuk mengambil informasi user
async function getData(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      grantEmail: true,
    },
  });
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  if (!session?.user) {
    return redirect("/");
  }
  const userId = session.user.id;
  const data = await getData(userId as string);
  if (!data?.userName) {
    return redirect("/onboarding");
  }
  if (!data?.grantEmail) {
    return redirect("/onboarding/grant-id");
  }
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex justify-center w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
              <div className="flex flex-col w-full max-w-full sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px]">
                {children}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
