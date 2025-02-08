"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button variant={"outline"}>
          <Icons.google />
          Login with Google
        </Button>
      )}
    </>
  );
}

export function GithubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button variant={"outline"}>
          <Icons.gitHub />
          Sign in with GitHub
        </Button>
      )}
    </>
  );
}
