import { requireUser } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();
  if (!session?.user) {
    return redirect("/");
  }
  const userId = session.user.id;
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { userName: true },
  });

  if (data?.userName) {
    return redirect("/event-types/");
  }
  return <section>{children}</section>;
}
