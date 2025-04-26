import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import TableRequestsLetter from "./_components/TableRequestsLetter";

function LetterRequestsAdminPage({ user }: WithAuthAdminProps) {
  
  return (
    <div>
      <TableRequestsLetter />
    </div>
  );
}

export default withAuthAdmin(LetterRequestsAdminPage);
