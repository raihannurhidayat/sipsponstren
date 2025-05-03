import Link from "next/link";
import {
  FileText,
  FilePlus,
  CheckCircle,
  Clock,
  Bell,
  ArrowRight,
  XCircleIcon,
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
import withAuthUser, { WithAuthUserProps } from "@/layout/withAuthUser";

async function DashboardPage({ user: userInfo }: WithAuthUserProps) {
  const letterCountAwait = prisma.letter.count({
    where: {
      userId: userInfo.id,
    },
  });

  const letterPendingCountAwait = prisma.letter.count({
    where: {
      status: "Review",
      userId: userInfo.id,
    },
  });

  const letterApproveCountAwait = prisma.letter.count({
    where: {
      userId: userInfo.id,
      status: "Approved",
    },
  });

  const letterRejectCountAwait = prisma.letter.count({
    where: {
      userId: userInfo.id,
      status: "Rejected",
    },
  });

  const [
    letterCount,
    letterPendingCount,
    letterApproveCount,
    letterRejectCount,
  ] = await Promise.all([
    letterCountAwait,
    letterPendingCountAwait,
    letterApproveCountAwait,
    letterRejectCountAwait,
  ]);

  const stats = {
    created: letterCount,
    approved: letterApproveCount,
    pending: letterPendingCount,
    rejected: letterRejectCount,
  };

  const user = {
    name: userInfo.name,
    role: userInfo.role,
    id: userInfo.id,
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Selamat Datang,{" "}
              <span className="text-muted-foreground">{user.name}</span>
            </h1>
            <p className="text-muted-foreground capitalize">{user.role}</p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/request">
              <FilePlus className="h-4 w-4" />
              Tambah Pengajuan
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pengajuan Surat</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.created}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
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

export default withAuthUser(DashboardPage);
