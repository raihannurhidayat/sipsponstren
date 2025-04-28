"use client";

import * as React from "react";
import {
  ArrowUp,
  AudioWaveform,
  BookOpen,
  BookTemplate,
  Bot,
  Command,
  FilePlus,
  FileText,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  LayoutDashboardIcon,
  LetterText,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  UsersRoundIcon,
  ViewIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
import { Separator } from "@/components/ui/separator";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/150?u=shadcn",
  },
  navMain: [],
  teams: {
    name: "Muhamad Raihan Nurhidayat",
    role: "User",
  },
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Pengajuan Surat",
      url: "/request",
      icon: ArrowUp,
    },
    {
      name: "Riwayat Surat",
      url: "/letter-history",
      icon: FileText,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      name: "Help & Guide",
      url: "/help",
      icon: HelpCircle,
    },
  ],
};

export function SidebarUser({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.projects} items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
