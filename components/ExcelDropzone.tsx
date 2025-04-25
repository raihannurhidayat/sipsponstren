"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { FileBoxIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExcelDropzone({
  onFileAccepted,
  fileName,
}: {
  onFileAccepted: (file: File) => void;
  fileName?: string;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-dashed border-2 p-6 cursor-pointer transition-all duration-300 text-center",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      )}
    >
      <input {...getInputProps()} />
      <CardContent className="flex flex-col items-center gap-2">
        {fileName ? (
          <FileBoxIcon className="h-10 w-10 text-muted-foreground" />
        ) : (
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
        )}

        <div className="text-sm text-muted-foreground">
          {isDragActive ? (
            "Lepaskan file Excel di sini..."
          ) : fileName ? (
            <p className="text-sm">
              File excel terpilih{" "}
              <span className="text-green-600">{fileName}</span>. Seret file
              Excel lain ke sini, atau klik untuk mengganti
            </p>
          ) : (
            "Seret file Excel ke sini, atau klik untuk memilih"
          )}
        </div>
        <p className="text-xs text-gray-400">Hanya mendukung .xlsx dan .xls</p>
      </CardContent>
    </Card>
  );
}
