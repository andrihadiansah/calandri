import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  // Jika user belum login, redirect ke halaman utama
  if (!session?.user) {
    return redirect("/");
  }

  const userId = session.user.id;

  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { grantEmail: true },
  });

  if (data?.grantEmail) {
    return redirect("/event-types/");
  }

  return <section>{children}</section>;
}
