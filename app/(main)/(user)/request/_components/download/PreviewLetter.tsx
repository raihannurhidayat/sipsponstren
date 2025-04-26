// components/PreviewWithSave.tsx
'use client';
import dynamic from "next/dynamic";
import { PdfDocument } from "./PdfDocument";
import DownloadButton from "./DownloadButton";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PreviewLetter() {
  return (
    <div className="space-y-6">
      <div className="h-[600px] border rounded-lg overflow-hidden shadow-lg">
        <PDFViewer width="100%" height="100%">
          <PdfDocument />
        </PDFViewer>
      </div>
      
      <DownloadButton />
    </div>
  );
}