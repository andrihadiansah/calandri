import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { notFound } from "next/navigation";
import EmptyState from "@/components/empty-state";
import { NewEventDialog } from "@/components/dashboard/event-types/newevent-dialog";

export const metadata: Metadata = {
  title: "Event Types",
  description: "Manage your event types for scheduling",
};

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      eventType: {
        select: {
          id: true,
          title: true,
          active: true,
          url: true,
          description: true,
          duration: true,
        },
      },
      userName: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
export default async function Page() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      <header className="flex justify-between items-center gap-4">
        <div className="flex flex-col flex-1">
          <h2 className="scroll-m-20 text-2xl font-bold">Event Types</h2>
          <p className="leading-2 [&:not(:first-child)]:mt-2">
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <NewEventDialog userName={data.userName as string} />
      </header>
      <div className="mt-4">
        {data.eventType.length === 0 ? (
          <EmptyState
            title="No Event"
            description="You can create first event type by clicking the button top right"
          />
        ) : (
          <p>has data</p>
        )}
      </div>
    </>
  );
}

{
  /* <header className="flex justify-between">
          <div className="">
            <h3>Event Types</h3>
            <p>Create events to share for people to book on your calendar.</p>
          </div>
          <div className="">OpenDialog</div>
        </header>
        <div className="flex flex-col bg-muted/30 border rounded-lg ">
          <div className="flex justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-all">
            <Link href={"#"} className="flex flex-col space-y-3">
              <div className="flex gap-2">
                <h3>Title</h3>
                <p className="text-muted-foreground">Link</p>
              </div>
              <p className="w-11/12 line-clamp-1 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, illo ratione? Accusamus alias error tempora ex,
                corrupti officia necessitatibus ducimus ipsam optio rem eveniet
                accusantium hic quos tenetur deleniti molestiae.
              </p>
              <div className="">
                <Badge variant={"secondary"}>30min</Badge>
              </div>
            </Link>
            <div className="flex items-center">
              <Button variant={"ghost"} className="border rounded-r-none">
                <ExternalLink />
              </Button>
              <Button variant={"ghost"} className="border-y rounded-none">
                <Copy />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="border rounded-l-none">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="">
                  <DropdownMenuItem asChild>
                    <Link href={"#"}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div> */
}
