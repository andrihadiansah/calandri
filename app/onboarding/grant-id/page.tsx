import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OnboardingRouteTwo() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Almost Done!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Link
            href={"/api/auth"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Connect Calendar to your Account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
