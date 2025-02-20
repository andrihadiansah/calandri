import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" top-14">
      <header className="flex flex-col ">
        <h3>Meetings</h3>
        <p>
          See upcoming and past events booked through your event type links.
        </p>
        <nav className="w-full flex my-6">
          <Link
            href="/meetings/upcoming"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-r-0 rounded-r-none w-full"
            )}
          >
            Upcoming
          </Link>
          <Link
            href="/meetings/unconfirmed"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-none w-full"
            )}
          >
            Unconfirmed
          </Link>
          <Link
            href="/meetings/past"
            className={cn(
              buttonVariants({ variant: "outline" }),
              " rounded-none border-s-0 w-full"
            )}
          >
            Past
          </Link>
          <Link
            href="/meetings/canceled"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-s-0 rounded-s-none w-full"
            )}
          >
            Canceled
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </section>
  );
}
