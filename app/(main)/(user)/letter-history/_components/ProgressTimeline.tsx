import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface ProgressTimelineProps {
  currentStep: string; // "Review", "Approved", or "Rejected"
  status: string;      // Status akhir untuk menentukan apakah rejected atau tidak
}

export function ProgressTimeline({ currentStep, status }: ProgressTimelineProps) {
  // Tentukan langkah-langkah berdasarkan status akhir
  const steps =
    status === "Rejected"
      ? ["Submitted", "Review", "Rejected"]
      : ["Submitted", "Review", "Completed"];

  // Menentukan status tiap langkah: completed, current, upcoming
  const getStepStatus = (step: string) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  // Menentukan warna garis antar langkah
  const getLineColor = (step: string) => {
    const stepIndex = steps.indexOf(step);
    const nextStep = steps[stepIndex + 1];
    const currentStatus = getStepStatus(step);
    const nextStatus = getStepStatus(nextStep);

    if (
      status === "Rejected" &&
      (currentStatus === "current" || nextStatus === "current")
    ) {
      return "bg-red-200";
    }

    if (currentStatus === "completed") {
      return "bg-green-500";
    }

    return "bg-slate-200";
  };

  // Menentukan ikon untuk tiap langkah
  const getStepIcon = (step: string) => {
    const stepStatus = getStepStatus(step);

    if (step === "Rejected" && stepStatus === "current") {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }

    if (status === "Approved" && step === "Completed" && stepStatus === "current") {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }

    if (stepStatus === "completed") {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }

    if (stepStatus === "current") {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    }

    return (
      <div className="h-5 w-5 rounded-full border-2 border-slate-200 bg-white" />
    );
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  {getStepIcon(step)}
                </div>
                <span className="mt-1 text-xs text-muted-foreground">{step}</span>
              </div>

              {!isLast && (
                <div
                  className={`h-1 flex-1 mx-2 rounded ${getLineColor(step)}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
