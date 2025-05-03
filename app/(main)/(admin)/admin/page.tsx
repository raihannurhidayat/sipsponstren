import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import DashboardView from "../_components/DashboardView";
import { prisma } from "@/lib/prisma";
import { orderBy } from "firebase/firestore";

async function AdminPage({ user }: WithAuthAdminProps) {
  const letter = await prisma.letter.findMany({
    orderBy: { submitted_at: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <div className="pt-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome Back, <span className="capitalize">{user.name}</span>
        </h1>
        <p className="text-muted-foreground">Silakan Kelola Dengan Bahagia ❤</p>
      </div>
      <DashboardView letter={letter} />
    </div>
  );
}

export default withAuthAdmin(AdminPage);
