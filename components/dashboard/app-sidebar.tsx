"use client";
import { useSession } from "next-auth/react";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Calendar,
  Frame,
  LifeBuoy,
  Link,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePicker } from "./date-picker";
import { Calendars } from "./calendars";

const data = {
  session: {
    user: {
      name: <Skeleton className="h-4 w-[75%] mb-1" />,
      email: <Skeleton className="h-3 w-full" />,
      image: <Skeleton className="h-8 w-8 rounded-full" />,
    },
  },
  navMain: [
    {
      title: "Event Types",
      url: "/event-types",
      icon: Link,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: Bot,
    },
    {
      title: "Availability",
      url: "/availability",
      icon: BookOpen,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "https://github.com/andrihadiansah/calandri/discussions",
      icon: Send,
    },
  ],
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession(); // Add status to check loading state

  const user = status === "loading" ? data.session.user : session?.user;

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
      collapsible="icon"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-sidebar-primary-foreground">
                  <Calendar className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Cal<span>Andri</span>
                  </span>
                  <span className=" text-xs">
                    Plan, Sync, Meet – All in One
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <DatePicker />
        <Calendars calendars={data.calendars} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name as string,
            email: user?.email as string,
            avatar: user?.image as string,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
