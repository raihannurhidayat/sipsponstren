import React from "react";
import RequestView from "./_components/request-view";
import withAuthUser from "@/layout/withAuthUser";

function RequestLetterPage() {
  return (
    <div>
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Pengajuan Surat</h1>
      </section>

      <RequestView />
    </div>
  );
}

export default withAuthUser(RequestLetterPage);
