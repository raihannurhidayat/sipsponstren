import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { RequestLetterProps } from "@/lib/types";
import { GraduationCapIcon, FileTextIcon, FileOutput } from "lucide-react";
import Image from "next/image";
import React from "react";

const suratOptions = [
  {
    id: "SKS",
    title: "Surat Keterangan Santri",
    icon: <GraduationCapIcon className="size-10 text-slate-600" />,
  },
  {
    id: "SIR",
    title: "Surat Izin Rombongan",
    icon: <FileTextIcon className="size-10 text-slate-600" />,
  },
  {
    id: "s3",
    title: "Surat Izin",
    icon: <FileOutput className="size-10 text-slate-600" />,
  },
];

export default function RequestList(props: RequestLetterProps) {
  return (
    <div className="w-full py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {suratOptions.map((surat) => (
        <div
          onClick={() => {
            props.setRequestLetterData({
              ...props.requestLetterData,
              template: surat.title,
            });
            props.setCurrentStep(surat.id);
          }}
          key={surat.id}
          className="border-2 border-dashed border-slate-400 rounded-2xl p-6 hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
        >
          <div className="mb-4">{surat.icon}</div>
          <p className="font-semibold text-slate-800">{surat.title}</p>
        </div>
      ))}
    </div>
  );
}
