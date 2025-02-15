import { AppSidebar } from "@/components/settings/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireUser } from "@/lib/hooks";
import { ChevronDown } from "lucide-react";
import { redirect } from "next/navigation";

import { Toaster } from "@/components/ui/sonner";
export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="relative top-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  <ChevronDown className="size-4" />
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4 w-full flex justify-center">
          {children}

          <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
