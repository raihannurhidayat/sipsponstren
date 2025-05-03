"use client";

import * as React from "react";
import {
  ArrowUp,
  FileText,
  LayoutDashboard,
  User,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";


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
  ],
};

export function SidebarUser({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader onClick={() => router.push("/")} className="cursor-pointer">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.projects} items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
