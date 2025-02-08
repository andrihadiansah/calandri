import { auth } from "@/auth";

export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return <img src={session.user.image as string} alt="User Avatar" />;
}
