// components/PdfDocument.tsx
"use client";
import { Document, Page, Font } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import {
  templateSurat,
  templateSuratIzinRombongan,
  templateSuratKeterangan,
} from "@/constants/templates";


// Registrasi font hanya di client side
if (typeof window !== "undefined") {
  Font.register({
    family: "Times New Roman",
    src: "/fonts/times new roman.ttf",
  });
}

interface PdfDocumentProps {
  templateType: string;
  data: string;
}

export const PdfDocument = (props: PdfDocumentProps) => {
  let template;

  if (props.templateType === "Surat Keterangan Santri") {
    template = templateSurat(props.data);
  } else if (props.templateType === "Surat Izin Rombongan") {
    template = templateSuratIzinRombongan(props.data);
  } else {
    template = templateSuratKeterangan;
  }

  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Times New Roman" }}>
        <Html>{template}</Html>
      </Page>
    </Document>
  );
};
