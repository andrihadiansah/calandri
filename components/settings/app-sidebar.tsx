import * as React from "react";
import { GalleryVerticalEnd, StepBack } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Account",
      url: "#",
      items: [
        {
          title: "Profile",
          url: "/settings/account/profile",
        },
        {
          title: "General",
          url: "/settings/account/general",
        },
        {
          title: "Conferencing",
          url: "/settings/account/conferencing",
        },
        {
          title: "Calendar",
          url: "/settings/account/calendar",
        },
      ],
    },
    {
      title: "Security",
      url: "#",
      items: [
        {
          title: "Password",
          url: "/settings/security/password",
        },
      ],
    },

    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/event-types">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-700 text-sidebar-primary-foreground">
                  <StepBack className="size-4" />
                </div>
                <div className="flex flex-col items-center gap-0.5 leading-none">
                  <span className="font-semibold">Back to Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarGroup>
                  <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarGroup>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
