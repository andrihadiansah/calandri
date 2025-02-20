"use client";
import { ProfileAction } from "@/app/action";
import { SubmitButton } from "@/components/submit-button";
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
import { UploadButton } from "@/lib/uploadthing";
import { profileSchemas } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus, Trash } from "lucide-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
  userName: string;
}

export function ProfileForm({
  fullName,
  email,
  profileImage,
  userName,
}: iAppProps) {
  const data = {
    fullName,
    email,
    profileImage,
    userName,
  };
  const [lastResult, action] = useActionState(ProfileAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: profileSchemas(),
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  console.log("🚀 ProfileForm Rendered!");
  console.log("🔗 Form ID:", form.id);
  console.log("📩 Form Action:", action);
  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };
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
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="p-6 flex flex-col space-y-6">
            <div className="flex space-x-6">
              <Input
                type="hidden"
                name={fields.profileImage.name}
                key={fields.profileImage.key}
                defaultValue={currentProfileImage}
              />
              {currentProfileImage ? (
                <>
                  <Avatar className="bg-muted size-28">
                    <AvatarImage src={currentProfileImage} />
                  </Avatar>
                  <div className="flex flex-col justify-center space-y-3">
                    <span className="text-xl">Profile Picture</span>
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        onClick={handleDeleteImage}
                        variant={"outline"}
                      >
                        Change Picture
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Avatar className="bg-muted size-28">
                    <AvatarImage />
                    <AvatarFallback>No Image</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center space-y-3">
                    <span className="text-xl">Profile Picture</span>
                    <div className="flex space-x-3">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          setCurrentProfileImage(res[0].ufsUrl);
                          console.log("Files: ", res);
                          toast.success("Profile Image has been.");
                        }}
                        onUploadError={(error) => {
                          console.error("Error: ", error);
                          toast.error("Error uploading image");
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="">
              <Label className="text-lg">Username</Label>
              <Input
                name={fields.userName.name}
                key={fields.userName.key}
                defaultValue={userName}
              />
              <p className="text-sm text-red-600">{fields.userName.errors}</p>
            </div>
            <div className="">
              <Label className="text-lg">Fullname</Label>
              <Input
                name={fields.fullName.name}
                key={fields.fullName.key}
                defaultValue={fullName}
              />
              <p className="text-sm text-red-600">{fields.fullName.errors}</p>
            </div>
            <div className="flex gap-3 flex-col">
              <Label className="text-lg">Email</Label>
              <div className="flex gap-3">
                <Input disabled defaultValue={email} />
                <Button className="hidden">
                  <Plus />
                  Add Email
                </Button>
              </div>
            </div>
            <div className="">
              <Label className="text-lg">About (on work)</Label>
              <Textarea disabled className="" />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-6 w-full justify-end">
            <SubmitButton text="Save Changes" variant={"secondary"} />
          </CardFooter>
        </form>
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
