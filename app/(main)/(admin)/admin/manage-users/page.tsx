import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import ManageUSerSection from "./_components/manageUserSection";

function ManageUserPage({ user }: WithAuthAdminProps) {
  return (
    <React.Fragment>
      <div className="pt-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Daftar Pengguna
        </h1>
        <p className="text-muted-foreground">
          kelola pengguna yang terdaftar di aplikasi ini.
        </p>
      </div>
      <ManageUSerSection />
    </React.Fragment>
  );
}

export default withAuthAdmin(ManageUserPage);
