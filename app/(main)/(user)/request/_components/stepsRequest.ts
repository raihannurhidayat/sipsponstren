import React from "react";
import RequestList from "./request-list";
import { RequestLetterProps } from "@/lib/types";
import FormSuratKeterangan from "./form/FormSuratKeterangan";
import Preview from "./Preview";
import FormSuratIzinRombongan from "./form/FormSuratIzinRombongan";

export const stepsRequest: {
  key: string;
  title: string;
  component: React.ComponentType<RequestLetterProps>;
}[] = [
  {
    title: "Pilih Jenis Dokumen",
    key: "jenis-dokumen",
    component: RequestList,
  },
  {
    title: "Pengisian Data",
    key: "SKS",
    component: FormSuratKeterangan,
  },
  {
    title: "Pengisian Data",
    key: "SIR",
    component: FormSuratIzinRombongan,
  },
];
