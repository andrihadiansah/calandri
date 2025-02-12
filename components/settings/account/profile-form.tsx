import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";

export function ProfileForm() {
  return (
    <>
      <Card className="w-full flex flex-col justify-center">
        <CardHeader className="">
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage settings for your CalAndri Profile
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-6 flex flex-col space-y-6">
          <div className="flex space-x-6">
            <Avatar className="bg-muted size-24">
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center space-y-3">
              <span className="text-xl">Profile Picture</span>
              <div className="flex space-x-3">
                <Button variant={"outline"}>Upload Avatar</Button>
                <Button variant={"outline"}>Remove</Button>
              </div>
            </div>
          </div>
          <div className="">
            <Label className="text-lg">Username</Label>
            <Input></Input>
          </div>
          <div className="">
            <Label className="text-lg">Fullname</Label>
            <Input></Input>
          </div>
          <div className="flex gap-3 flex-col">
            <Label className="text-lg">Email</Label>
            <div className="flex gap-3">
              <Input></Input>
              <Button>
                <Plus />
                Add Email
              </Button>
            </div>
          </div>
          <div className="" aria-disabled>
            <Label className="text-lg">About</Label>
            <Textarea className="" />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-6 w-full justify-end">
          <Button className="font-bold" variant={"secondary"}>
            Save
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full flex flex-col justify-center">
        <CardHeader className="">
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Be careful. Account deletion cannot be undone.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter className="p-6 w-full justify-end">
          <Button className="font-bold" variant={"destructive"}>
            <Trash />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
