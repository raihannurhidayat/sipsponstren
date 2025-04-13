// app/page.tsx atau app/excel-upload/page.tsx

"use client";

import { useState } from "react";
import ExcelDropzone from "@/components/ExcelDropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { CreateUserFormSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const REQUIRED_FIELDS = ["name", "email", "password", "role"];

export default function InputFileExcel() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<any[]>([]);

  const handleFileAccepted = (file: File) => {
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);

      if (!Array.isArray(json) || json.length === 0) {
        toast.error("File kosong atau tidak valid.");
        resetFile();
        return;
      }

      // Cek apakah kolom yang diperlukan ada
      const firstRow = json[0] as any;
      const actualFields = Object.keys(firstRow);

      const missingFields = REQUIRED_FIELDS.filter(
        (field) => !(field in firstRow)
      );

      const extraFields = actualFields.filter(
        (field) => !REQUIRED_FIELDS.includes(field)
      );

      if (missingFields.length > 0) {
        toast.error(`Kolom berikut wajib ada: ${missingFields.join(", ")}`, {
          richColors: true,
        });
        resetFile();
        return;
      }

      if (extraFields.length > 0) {
        toast.error(`Kolom tidak diizinkan: ${extraFields.join(", ")}`, {
          richColors: true,
        });
        resetFile();
        return;
      }

      setExcelData(json);
      console.log("Data Excel (JSON):", json);
    };

    reader.readAsBinaryString(file);
  };

  const resetFile = () => {
    setFileName(null);
    setExcelData([]);
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const mutation = useMutation({
    mutationKey: ["create-multi-user"],
    mutationFn: async () => {
      if (excelData.length === 0) return;

      toast.info("Memulai proses pembuatan user...");

      for (let i = 0; i < excelData.length; i++) {
        const user = excelData[i];

        try {
          await authClient.admin.createUser(
            {
              name: user.name,
              email: user.email,
              password: String(user.password), // pastikan string!
              role: user.role,
            },
            {
              onRequest: () => {
                toast.loading(`Membuat akun untuk ${user.name}...`, {
                  id: `create-${i}`,
                });
              },
              onSuccess: () => {
                toast.success(`Akun ${user.name} berhasil dibuat ✅`, {
                  id: `create-${i}`,
                });
              },
              onError: async (ctx) => {
                console.log(ctx);
                toast.error(
                  `Gagal membuat user dengan email ${user.email}: ${
                    ctx.error.message || "Unknown error"
                  }`,
                  {
                    id: `create-${i}`,
                  }
                );
                await delay(1500);
              },
            }
          );
        } catch (err) {
          console.error("Error creating user:", err);
          toast.error(`Gagal membuat ${user.name}`);
          await delay(1500);
        } finally {
          resetFile()
        }
      }
    },
  });

  async function onSubmit() {
    mutation.mutate();
  }

  return (
    <Card className="w-full mask-x-to-background">
      <CardHeader>
        <CardTitle>Create Account With Excel</CardTitle>
        <CardDescription>Create account for excel file</CardDescription>
      </CardHeader>
      <CardContent>
        <ExcelDropzone
          onFileAccepted={handleFileAccepted}
          fileName={fileName ?? ""}
        />

        {fileName && (
          <p className="text-sm text-green-600">File terpilih: {fileName}</p>
        )}
        {excelData.length > 0 && (
          <pre className="mt-4 p-2 bg-gray-100 text-xs rounded">
            {JSON.stringify(excelData, null, 2)}
          </pre>
        )}
      </CardContent>
      {excelData.length > 0 && (
        <CardFooter>
          <Button
            disabled={mutation.isPending}
            className="w-full"
            onClick={() => onSubmit()}
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin cursor-pointer" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
