import { RequestLetterProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  GraduationCapIcon,
  FileTextIcon,
  LucideIcon,
  Users,
  Loader2,
} from "lucide-react";
import React from "react";

const iconComponents: { [key: string]: LucideIcon } = {
  GraduationCapIcon,
  FileTextIcon,
};

export const getLucideIcon = (iconName: string): LucideIcon => {
  return iconComponents[iconName] || Users; // Fallback ke icon default
};

interface DynamicIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

export const DynamicIcon = ({
  iconName,
  size = 24,
  className,
}: DynamicIconProps) => {
  const IconComponent = getLucideIcon(iconName);

  return (
    <IconComponent size={size} className={className} aria-label={iconName} />
  );
};

export default function RequestList(props: RequestLetterProps) {
  const query = useQuery({
    queryKey: ["letters"],
    queryFn: async () => {
      const surat = await fetch("/api/letters");
      const data = await surat.json();

      return data;
    },
  });

  if (query.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {query.data?.length === 0 ? (
        <div className="col-span-full text-center flex flex-col items-center justify-center py-12 text-slate-500 border rounded-md">
          <FileTextIcon className="w-16 h-16 mb-4 animate-pulse text-slate-400" />
          <h3 className="text-xl font-semibold mb-2">
            Belum ada template surat
          </h3>
          <p className="max-w-md">
            Tidak ditemukan template surat yang tersedia saat ini. Silakan
            hubungi admin atau coba beberapa saat lagi.
          </p>
        </div>
      ) : (
        query.data?.map((surat: any) => (
          <div
            onClick={() => {
              props.setRequestLetterData({
                ...props.requestLetterData,
                template: surat?.name!,
              });
              props.setCurrentStep(surat?.slug!);
            }}
            key={surat.id}
            className="border-2 border-dashed border-slate-400 rounded-2xl p-6 hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
          >
            <div className="mb-4">
              <DynamicIcon
                iconName={surat.icon!}
                className="size-10 text-slate-600"
              />
            </div>
            <p className="font-semibold text-slate-800">{surat.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
