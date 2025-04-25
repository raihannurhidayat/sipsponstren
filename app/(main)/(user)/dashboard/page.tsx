import Link from "next/link";
import {
  FileText,
  FilePlus,
  CheckCircle,
  Clock,
  Bell,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  }

  const letterCountAwait = prisma.letter.count();

  const letterPendingCountAwait = prisma.letter.count({
    where: {
      approved_at: null, // belum diset (pending)
    },
  });

  const letterApproveCountAwait = prisma.letter.count({
    where: {
      approved_at: {
        not: null, // sudah diset (approved)
      },
    },
  });

  const [letterCount, letterPendingCount, letterApproveCount] =
    await Promise.all([
      letterCountAwait,
      letterPendingCountAwait,
      letterApproveCountAwait,
    ]);

  const stats = {
    created: letterCount,
    approved: letterApproveCount,
    pending: letterPendingCount,
  };

  const user = {
    name: session.user.name,
    role: session.user.role,
    id: session.user.id,
  };

  const recentLetters = [
    {
      id: 1,
      title: "Request for Transcript",
      date: "2023-04-20",
      status: "approved",
    },
    {
      id: 2,
      title: "Application for Leave",
      date: "2023-04-18",
      status: "pending",
    },
    {
      id: 3,
      title: "Recommendation Letter",
      date: "2023-04-15",
      status: "approved",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "Your leave application has been approved",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New template available: Recommendation Letter",
      time: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground capitalize">{user.role}</p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/create">
              <FilePlus className="h-4 w-4" />
              Create New Letter
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Letters</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.created}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">-1 from last month</p>
          </CardContent>
        </Card>
      </section>

      {/* <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Letters</CardTitle>
            <CardDescription>Your recently created letters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLetters.map((letter) => (
              <div
                key={letter.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="font-medium">{letter.title}</p>
                  <p className="text-sm text-muted-foreground">{letter.date}</p>
                </div>
                <Badge variant={"outline"}>
                  {"approved" === "approved" ? "Approved" : "Pending"}
                </Badge>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/letters">
                View all letters
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and alerts</CardDescription>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col space-y-1 rounded-lg border p-3"
              >
                <p>{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </div> */}
    </div>
  );
}
