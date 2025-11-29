"use client";

import * as React from "react";
import {
  Inbox,
  LayoutDashboardIcon,
  LetterText,
  UsersRoundIcon,
  ChartPie,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/150?u=shadcn",
  },
  teams: {
    name: "Acme Inc",
    role: "Admin"
  },
  navMain: [
    {
      title: "Kelola Pengguna",
      url: "/admin/manage-users",
      icon: UsersRoundIcon,
      isActive: false,
      items: [
        {
          title: "Daftar Pengguna",
          url: "/admin/manage-users",
        },
        {
          title: "Buat Akun Pengguna",
          url: "/admin/manage-users/create",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Beranda",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Pengajuan Surat",
      url: "/admin/letter-requests",
      icon: LetterText,
    },
    {
      name: "Kelola Surat",
      url: "/admin/manage-letters",
      icon: Inbox,
    },
    {
      name: "Analytics",
      url: "/admin/analytics",
      icon: ChartPie,
    },
    // {
    //   name: "Kelola Template Surat",
    //   url: "/admin/templates",
    //   icon: BookTemplate,
    // },
    // {
    //   name: "Preview Surat",
    //   url: "/admin/templates/review",
    //   icon: ViewIcon,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
