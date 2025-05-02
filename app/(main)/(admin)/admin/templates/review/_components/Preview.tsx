"use client";

import { cn } from "@/lib/utils";
import { FieldsTemplateSchema } from "@/lib/validation/fields-template-validation";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { templateSuratIzin, templateSuratIzinRombongan, templateSuratKeterangan } from "@/constants/templates";


interface PreviewProps {
  templateFields: FieldsTemplateSchema; // Replace with the actual type if available
  setTemplateFields: (fields: FieldsTemplateSchema) => void; // Replace with the actual type if available
  className?: string;
}

export default function Preview() {
  Font.register({
    family: "Times New Roman",
    src: "/fonts/times new roman.ttf",
  });
  
  const html = templateSuratIzinRombongan("");


  return (
    <PDFViewer className="min-h-screen w-full">
      <Document>
        <Page size={"A4"}>
          <Html>{html}</Html>
        </Page>
      </Document>
    </PDFViewer>
  );
}
