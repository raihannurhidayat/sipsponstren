import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import FormCreateUser from "../_components/formCreareUser";
import InputFileExcel from "../_components/inputFileExcel";

function ManageCreateUserPage({ user }: WithAuthAdminProps) {
  return (
    <React.Fragment>
      <h1>Selamat Datang {user.name}</h1>
      <div className="flex flex-col lg:flex-row gap-2 ">
        <div className="w-1/2 flex items-start justify-center py-4">
          <FormCreateUser />
        </div>
        <div className="w-1/2 flex items-start justify-center py-4">
          <InputFileExcel />
        </div>
      </div>
    </React.Fragment>
  );
}

export default withAuthAdmin(ManageCreateUserPage);
