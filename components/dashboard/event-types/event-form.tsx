"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event type name must be at least 2 characters.",
  }),
  description: z.string(),
  duration: z.number(),
  url: z.string(),
  videoCallSoftware: z.string(),
});

interface EventFormProps {}

export function EventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 15,
      url: "",
      videoCallSoftware: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Event Type</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] flex flex-col ">
        <SheetHeader className="px-4">
          <SheetTitle>Create Event Type</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <ScrollArea className="max-h-[72%] px-6 mb-3">
              <ScrollBar orientation="vertical" className="Absolute right-0" />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-8">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="mx-auto"
                        placeholder="Quick Chat"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollArea>
            <SheetFooter>
              <Button type="submit" className=" ">
                Submit
              </Button>
              <SheetClose asChild>
                <Button type="button" className=" ">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
