import { SiteFooter } from "@/components/landing-page/site-footer";
import { SiteHeader } from "@/components/landing-page/site-header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    return redirect("/onboarding");
  }
  return (
    <div className="">
      <SiteHeader />
      <main className="container h-[calc(100vh-132px)] flex flex-1 flex-col my-3 py-3 px-6">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
