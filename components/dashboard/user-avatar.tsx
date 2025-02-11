import type { Session } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";

export async function UserAvatar({ session }: { session: Session | null }) {
  return (
    <Avatar>
      <AvatarImage
        src={session?.user?.image as string}
        alt={session?.user?.name as string}
      />
      <AvatarFallback className="rounded-lg">
        <Skeleton />
      </AvatarFallback>
    </Avatar>
  );
}
