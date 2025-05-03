import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, LogOut, UserCog, Clock } from "lucide-react";
import withAuthUser, { WithAuthUserProps } from "@/layout/withAuthUser";
import ChangePasswordModal from "./_components/ChangePasswordModal";
import { formattedDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import ButtonSignOut from "./_components/ButtonSignOut";

async function ProfilePage({ user }: WithAuthUserProps) {
  // This would typically come from your authentication system
  const userInfo = {
    name: user.name,
    email: user.email,
    role: user.role,
    registeredSince: formattedDate(user.createdAt),
    studentId: user.id,
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const letters = await prisma.letter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      submitted_at: "desc",
    },
    take: 5,
  });

  return (
    <div className="container mx-auto mb-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {/* Profile Card */}
      <Card className="mb-8 shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50 pb-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-4">
            <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
              <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                {getInitials(userInfo.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2 flex-1">
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <p className="text-slate-600">{userInfo.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="font-normal">
                  {userInfo.role}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-slate-500 justify-center md:justify-start mt-2">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>Terdaftar sejak {userInfo.registeredSince}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">User ID</p>
                    <p className="font-medium">{userInfo.studentId}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm text-slate-500">Program of Study</p>
                    <p className="font-medium">{userInfo.program}</p>
                  </div> */}
                  {/* {userInfo.phone && (
                    <div>
                      <p className="text-sm text-slate-500">Phone Number</p>
                      <p className="font-medium">{userInfo.phone}</p>
                    </div>
                  )} */}
                  {/* {userInfo.address && (
                    <div>
                      <p className="text-sm text-slate-500">Address</p>
                      <p className="font-medium">{userInfo.address}</p>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Right Column - Account Management */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Account Management
                </h3>
                <div className="space-y-3">
                  <ChangePasswordModal />
                  <ButtonSignOut />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-4">
              Surat Terkini
            </h3>
            <div className="space-y-2">
              {letters.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium">{activity.template}</p>
                    <p className="text-sm text-slate-500">
                      {formattedDate(activity.submitted_at)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "Approved"
                        ? "default"
                        : activity.status === "Review"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default withAuthUser(ProfilePage);
