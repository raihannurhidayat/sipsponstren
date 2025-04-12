import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

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

  return <div>DashboardPage {session.user.name}</div>;
}
