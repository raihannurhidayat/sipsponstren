import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import ManageUSerSection from "./_components/manageUserSection";

function ManageUserPage({ user }: WithAuthAdminProps) {

  return (
    <React.Fragment>
      <h1>Selamat Datang {user.name}</h1>
      <ManageUSerSection />
    </React.Fragment>
  );
}

export default withAuthAdmin(ManageUserPage);
