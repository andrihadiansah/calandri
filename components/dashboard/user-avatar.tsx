import { auth } from "@/auth";
import Image from "next/image";

export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <Image
      src={session.user.image as string}
      height={20}
      width={20}
      alt="User Avatar"
    />
  );
}
