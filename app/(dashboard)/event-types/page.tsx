import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Ellipsis, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <header className="flex justify-between">
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
              <DropdownMenuContent className="bg-muted mt-2 border rounded-lg p-2">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
