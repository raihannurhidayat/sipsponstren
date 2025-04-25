// components/PdfDocument.tsx
"use client";
import { Document, Page, Font } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { templateSuratKeterangan } from "@/constants/templates";

// Registrasi font hanya di client side
if (typeof window !== "undefined") {
  Font.register({
    family: "Times New Roman",
    src: "/fonts/times new roman.ttf",
  });
}

export const PdfDocument = () => (
  <Document>
    <Page size="A4" style={{ fontFamily: "Times New Roman" }}>
      <Html>{templateSuratKeterangan}</Html>
    </Page>
  </Document>
);
