import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { stepsRequest } from "./stepsRequest";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function Crumbs(props: BreadcrumbsProps) {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          <React.Fragment>
            <BreadcrumbItem>
              {stepsRequest[0].key === props.currentStep ? (
                <BreadcrumbPage>{stepsRequest[0].title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button
                    onClick={() => props.setCurrentStep(stepsRequest[0].key)}
                  >
                    {stepsRequest[0].title}
                  </button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="last:hidden" />
          </React.Fragment>
          {/* {stepsRequest.map((step) => (
          ))} */}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
