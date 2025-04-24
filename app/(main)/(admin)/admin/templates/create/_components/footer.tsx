import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  // showSmResumePreview?: boolean;
  // setShowSmResumePreview: (show: boolean) => void;
  // isSaving: boolean;
}

export default function Footer(props: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === props.currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === props.currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 pt-3">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            className="cursor-pointer"
            disabled={!previousStep}
            variant={"secondary"}
            onClick={
              previousStep
                ? () => props.setCurrentStep(previousStep)
                : undefined
            }
          >
            Previous step
          </Button>
          <Button
            className="cursor-pointer"
            disabled={!nextStep}
            variant={"default"}
            onClick={
              nextStep ? () => props.setCurrentStep(nextStep) : undefined
            }
          >
            Next step
          </Button>
        </div>

        {/* <Button
          variant={"outline"}
          size={"icon"}
          onClick={() =>
            props.setShowSmResumePreview(!props.showSmResumePreview)
          }
          className="md:hidden"
          title={
            props.showSmResumePreview
              ? "Show input form"
              : "Show resume preview"
          }
        >
          {props.showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button> */}

        <div className="flex items-center gap-3">
          <Button asChild variant={"secondary"}>
            <Link href={"/admin/templates"}>Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0"
              // props.isSaving && "opacity-100"
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}
