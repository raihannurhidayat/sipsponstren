import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserWithRole } from "better-auth/plugins";

type TableUserProps = {
  users: UserWithRole[];
};

export default function TableUser(props: TableUserProps) {
  return (
    <div className="">
      <DataTable columns={columns} data={props.users} />
    </div>
  );
}
