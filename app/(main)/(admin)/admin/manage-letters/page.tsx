import withAuthAdmin from "@/layout/withAuthAdmin";
import React from "react";
import { TemplateList } from "./_components/TemplateList";

function ManageLettersPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="pt-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Document Template Management
          </h1>
        </div>
        <div className="py-4">
          <TemplateList />
        </div>
      </div>
    </main>
  );
}

export default withAuthAdmin(ManageLettersPage);
