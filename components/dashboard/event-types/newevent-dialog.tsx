"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, X } from "lucide-react"; // Tambahkan icon X untuk hapus badge
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icons } from "@/components/icons";
import { createEventTypeAction } from "@/app/action";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/submit-button";

interface iAppProps {
  userName: string;
}
export function NewEventDialog({ userName }: iAppProps) {
  const [lastResult, action] = useActionState(createEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedVideoCall, setSelectedVideoCall] = useState(
    fields.videoCallSoftware.initialValue || ""
  );

  // State untuk menandai jika user sudah mencoba memilih
  const [touched, setTouched] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold">
          <Plus />
          Add Event Type
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4 w-[95vw]">
        <ScrollArea className="max-h-[80vh] w-full">
          <DialogHeader className="border-b px-4 pb-4 mb-4">
            <DialogTitle className="text-xl">Add a new event type</DialogTitle>
            <DialogDescription>
              Create a new event type for people to book times with.
            </DialogDescription>
          </DialogHeader>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <div className="px-4 flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Quick Chat"
              />
              <p className="text-sm text-red-600">{fields.title.errors}</p>

              <Label>URL slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center pl-3 rounded-l-md border border-r-0 bg-muted text-sm">
                  calandri.com/{userName}/
                </span>
                <Input
                  key={fields.url.key}
                  name={fields.url.name}
                  defaultValue={fields.url.initialValue}
                  placeholder="example-url"
                  className="rounded-none rounded-r-md pl-0"
                />
              </div>
              <p className="text-sm text-red-600">{fields.url.errors}</p>

              <Label>Duration</Label>
              <div className="flex justify-between items-center border rounded-md">
                <Input
                  key={fields.duration.key}
                  name={fields.duration.name}
                  defaultValue={fields.duration.initialValue}
                  placeholder="15"
                  className="border-0 rounded-none rounded-l-md"
                />
                <div className="flex gap-1 pl-3 items-center">
                  <span className="mr-3">minutes</span>
                </div>
              </div>
              <p className="text-sm text-red-600">{fields.duration.errors}</p>
              <Label>Videocall Provider</Label>
              {/* Input hidden agar form tetap mengirim nilai */}
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={selectedVideoCall}
              />
              <ToggleGroup
                type="single"
                variant="outline"
                className="w-full"
                value={selectedVideoCall}
                onValueChange={(value) => {
                  setSelectedVideoCall(value);
                  setTouched(true); // Menandai bahwa user telah mencoba memilih
                }}
              >
                <ToggleGroupItem value="Google Meet" className="w-full">
                  <Icons.googleMeet />
                  Google Meet
                </ToggleGroupItem>
                <ToggleGroupItem value="Zoom Meeting" className="w-full">
                  <Icons.zoomVideo />
                  Zoom Video
                </ToggleGroupItem>
              </ToggleGroup>
              {/* Tampilkan error jika belum memilih dan form sudah di-submit */}
              {touched && !selectedVideoCall && (
                <p className="text-sm text-red-600">
                  Please select a valid video call software
                </p>
              )}
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-sm text-red-600">
                {fields.description.errors}
              </p>
            </div>
          </form>
          <DialogFooter className="px-4 mt-4 pt-4 flex flex-row border-t">
            <SubmitButton text="Add Event" />
            <DialogClose asChild>
              <Button className="ml-2" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
