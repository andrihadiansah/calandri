"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Calendar,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  Link,
  Send,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DatePicker } from "./date-picker";
import { Calendars } from "./calendars";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading" && !session;
  const data = {
    user: {
      name: session?.user?.name || status,
      email: session?.user?.email || status,
      avatar: session?.user?.image || status,
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
        url: "/settings/account/general",
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
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible className="group/collapsible">
                <SidebarMenuButton asChild disabled>
                  <CollapsibleTrigger>
                    <CalendarDays />
                    <span>My Calendars</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarMenuButton>
                <SidebarGroupContent>
                  <CollapsibleContent>
                    <DatePicker />
                    <Calendars calendars={data.calendars} />
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <ExternalLink />
                  <span className="text-sm font-medium">View Public Page</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
}
