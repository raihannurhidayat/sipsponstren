import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import FormCreateUser from "../_components/formCreareUser";
import InputFileExcel from "../_components/inputFileExcel";

function ManageCreateUserPage({ user }: WithAuthAdminProps) {
  return (
    <React.Fragment>
      <div className="pt-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Create User
        </h1>
        <p className="text-muted-foreground">
          Create User Account For access the System
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="md:w-1/2 flex items-start justify-center py-4">
          <FormCreateUser />
        </div>
        <div className="md:w-1/2 flex items-start justify-center py-4">
          <InputFileExcel />
        </div>
      </div>
    </React.Fragment>
  );
}

export default withAuthAdmin(ManageCreateUserPage);
