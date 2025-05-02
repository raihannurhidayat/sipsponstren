import { FileOutput, FileTextIcon, GraduationCapIcon } from "lucide-react";

export const suratOptions = [
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
