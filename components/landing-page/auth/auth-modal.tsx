import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "../../ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "@/auth";
import { GithubAuthButton, GoogleAuthButton } from "./submit-button";
import { Calendar } from "lucide-react";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "default", size: "sm" }),
          "bg-green-600 font-bold"
        )}
      >
        Try for Free
      </DialogTrigger>
      <DialogContent className="max-w-[300px]">
        <DialogTitle>
          <span className="flex gap-2 items-center justify-center">
            <Calendar className="text-green-600" />
            <h4 className="text-xl tracking-wide">
              Cal<span className="text-green-500">Andri</span>
            </h4>
          </span>
        </DialogTitle>{" "}
        <DialogHeader className="border-b pb-6"></DialogHeader>
        <div className="flex flex-col gap-2 items-center">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GithubAuthButton />
          </form>
        </div>
        <DialogDescription className="border-t pt-6 flex justify-center">
          It's free! Make your own now!
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
