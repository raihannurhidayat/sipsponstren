import React from "react";
import RequestList from "./request-list";
import { RequestLetterProps } from "@/lib/types";
import FormSuratKeterangan from "./form/FormSuratKeterangan";
import Preview from "./Preview";

export const stepsRequest: {
  key: string;
  title: string;
  component: React.ComponentType<RequestLetterProps>;
}[] = [
  {
    title: "Jenis Dokumen",
    key: "jenis-dokumen",
    component: RequestList,
  },
  {
    title: "Pengisian Data",
    key: "pengisian-data",
    component: FormSuratKeterangan,
  },
  // {
  //   title: "Preview",
  //   key: "preview",
  //   component: Preview,
  // },
];
