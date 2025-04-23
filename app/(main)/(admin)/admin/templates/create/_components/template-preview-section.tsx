import { cn } from "@/lib/utils";
import { FieldsTemplateSchema } from "@/lib/validation/fields-template-validation";
import React from "react";
import TemplatePreview from "./template-preview";

interface TemplatePreviewSectionProps {
  templateFields: FieldsTemplateSchema; // Replace with the actual type if available
  setTemplateFields: (fields: FieldsTemplateSchema) => void; // Replace with the actual type if available
  className?: string;
}

export default function TemplatePreviewSection(
  props: TemplatePreviewSectionProps
) {
  return (
    <div
      className={cn(
        "group relative hidden md:w-1/2 md:flex w-full",
        props.className
      )}
    >
      <div className="flex w-full justify-center p-8 overflow-y-auto bg-secondary">
        <TemplatePreview
          templatesFields={props.templateFields}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
