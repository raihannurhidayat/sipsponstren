import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";

function AdminPage({ user }: WithAuthAdminProps) {
  return <div>AdminPage</div>;
}

export default withAuthAdmin(AdminPage);
