import { requireUser } from "@/lib/hooks";
import { nylasConfig } from "@/lib/nylas";
import { NextRequest } from "next/server";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we didn't get a code", { status: 400 });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId as string,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });
    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("Error something went wrong", error);
  }
  redirect("/event-types");
}
