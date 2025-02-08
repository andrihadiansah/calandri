import { SiteFooter } from "@/components/landing-page/site-footer";
import { SiteHeader } from "@/components/landing-page/site-header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    return redirect("/event-types");
  }
  return (
    <div className="">
      <SiteHeader />
      <main className="container h-[calc(100vh-132px)] flex flex-1 flex-col my-3 py-3 px-6">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
