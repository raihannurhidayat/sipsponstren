"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { steps } from "./steps";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./footer";
import { FieldsTemplateSchema } from "@/lib/validation/fields-template-validation";
import TemplatePreviewSection from "./template-preview-section";

export default function CreateTemplateEditor() {
  const searchParams = useSearchParams();
  const [templateFields, setTemplateFields] =
    React.useState<FieldsTemplateSchema>();

  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponents = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex flex-col grow">
      <section className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your template</h1>
      </section>

      <section className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full md:w-1/2 p-3 overflow-y-auto space-y-6 md:block"
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponents && (
              <FormComponents
                fieldsTemplate={
                  templateFields ? templateFields : ({} as FieldsTemplateSchema)
                }
                setFieldsTemplate={setTemplateFields}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <TemplatePreviewSection
            templateFields={
              templateFields ? templateFields : ({} as FieldsTemplateSchema)
            }
            setTemplateFields={setTemplateFields}
          />
        </div>
      </section>

      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
