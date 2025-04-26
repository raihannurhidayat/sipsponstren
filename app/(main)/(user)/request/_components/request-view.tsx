"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { stepsRequest } from "./stepsRequest";
import Crumbs from "./crumbs";
import { RequestLetterSchema } from "@/lib/validation/validation-request-letter";

export default function RequestView() {
  const searchParams = useSearchParams();
  const [requestLetterData, setRequestLetterData] =
    useState<RequestLetterSchema>();

  const currentStep = searchParams.get("progress") || stepsRequest[0].key;

  const setCurrentStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("progress", key);

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const RequestLetterComponent = stepsRequest.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <section className="relative grow place-items-start">
      <Crumbs currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {RequestLetterComponent ? (
        <RequestLetterComponent
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          requestLetterData={
            requestLetterData ? requestLetterData : ({} as RequestLetterSchema)
          }
          setRequestLetterData={setRequestLetterData}
        />
      ) : undefined}
    </section>
  );
}
