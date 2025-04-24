import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import React from "react";
import CreateTemplateEditor from "./_components/create-template-editor";

function CreateTemplatePage({ user }: WithAuthAdminProps) {
  return <CreateTemplateEditor />;
}

export default withAuthAdmin(CreateTemplatePage);
