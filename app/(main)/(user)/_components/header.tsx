"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useGetUserClient from "@/hooks/useGetUserClient";
import { getInitials } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Header() {
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     title: "Letter approved",
  //     description: "Your request letter has been approved",
  //     time: "2 hours ago",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     title: "New comment",
  //     description: "Admin commented on your letter",
  //     time: "Yesterday",
  //     read: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Template updated",
  //     description: "The official template has been updated",
  //     time: "3 days ago",
  //     read: true,
  //   },
  // ]);

  // const unreadCount = notifications.filter((n) => !n.read).length;

  const router = useRouter();

  const { session } = useGetUserClient();

  async function handleSignOut() {
    await authClient.signOut(
      {},
      {
        onSuccess: (ctx) => {
          toast.success("Proses Berhasil Dilakukan", {
            id: "sign-out",
            richColors: true,
          });
          router.push("/");
        },
        onRequest: (ctx) => {
          toast.loading("Proses Sedang Berjalan", {
            id: "sign-out",
            richColors: true,
          });
        },
      }
    );
  }

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background px-4 md:px-6 w-full">
      <div className="hidden w-full max-w-sm md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search letters..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px]"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start p-3"
              >
                <div className="flex w-full justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {notification.description}
                </span>
                {!notification.read && (
                  <Badge variant="secondary" className="mt-1">
                    New
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {session?.user ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="User" />
                  <AvatarFallback>
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
