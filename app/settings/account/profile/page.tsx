import { ProfileForm } from "@/components/settings/account/profile-form";
import { prisma } from "@/lib/db";

import { requireUser } from "@/lib/hooks";
export async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      userName: true,
    },
  });
  if (!data) {
    return null;
  }
  return data;
}

export default async function Page() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  if (!data) {
    return null;
  }

  return (
    <div className="max-w-[720px] w-full flex flex-col space-y-4 justify-center ">
      <ProfileForm
        email={data.email}
        fullName={data.name as string}
        profileImage={data.image as string}
        userName={data.userName as string}
      />
    </div>
  );
}
