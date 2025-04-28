"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FieldsTemplateSchema } from "@/lib/validation/fields-template-validation";
// import Preview from "./_components/Preview";
import dynamic from "next/dynamic";

const PDFViewClient = dynamic(() => import("./_components/Preview"), {
  ssr: false,
});

export default function ReviewPage() {
  const [templateFields, setTemplateFields] =
    React.useState<FieldsTemplateSchema>();

  return (
    <div className="flex flex-col grow">
      <section className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Preview your template</h1>
      </section>

      <section className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <PDFViewClient />
        </div>
      </section>
    </div>
  );
}
