// app.
"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { onboardingSchemasValidation, profileSchemas } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemasValidation({
      async isUsernameUnique() {
        const exisitingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !exisitingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
  return redirect("/onboarding/grant-id");
}

export async function ProfileAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: profileSchemas,
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      email: submission.value.email,
      image: submission.value.profileImage,
    },
  });
  return redirect("/settings/account/profile");
}
