import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Ellipsis, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { times } from "@/lib/times";
import { SubmitButton } from "@/components/submit-button";
import { updateAvailabilityAction } from "@/app/action";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function AvailabilityRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      <header>
        <div className="">Availability</div>
      </header>
    </>
  );
}

{
  /* <Card>
<form action={updateAvailabilityAction}>
  <CardHeader>
    <div className="flex justify-between items-center">
      <div className="flex flex-col space-y-2">
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Configure times when you are available for bookings.
        </CardDescription>
      </div>
      <SubmitButton text="Save" variant={"secondary"} />
    </div>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Active</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <input
                type="hidden"
                name={`id-${item.id}`}
                value={item.id}
              />
              <Switch
                name={`isActive-${item.id}`}
                defaultChecked={item.isActive}
              />
            </TableCell>
            <TableCell>{item.day}</TableCell>
            <TableCell>
              <Select
                name={`fromTime-${item.id}`}
                defaultValue={item.fromTime}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent className="min-w-fit h-[200px]">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem
                        key={time.id}
                        value={time.time.toString()}
                      >
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select
                name={`tillTime-${item.id}`}
                defaultValue={item.tillTime}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent className="min-w-fit h-[200px]">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem
                        key={time.id}
                        value={time.time.toString()}
                      >
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</form>
</Card> */
}
