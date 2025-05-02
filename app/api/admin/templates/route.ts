// app/api/letters/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan ini sesuai path kamu

export async function GET() {
  const suratKeteranganSantri = await prisma.letter.count({
    where: {
      template: "Surat Keterangan Santri",
    },
  });

  const suratIzinRombongan = await prisma.letter.count({
    where: {
      template: "Surat Izin Rombongan",
    },
  });

  const suratTypeKeteranganSantri = await prisma.letterType.findUnique({
    where: { name: "Surat Keterangan Santri" },
  });

  const suratTypeIzinRombongan = await prisma.letterType.findUnique({
    where: { name: "Surat Izin Rombongan" },
  });

  const data = {
    suratKeteranganSantri: {
      total: suratKeteranganSantri,
      suratTypeKeteranganSantri: { ...suratTypeKeteranganSantri },
      status: suratTypeKeteranganSantri?.status,
    },
    suratIzinRombongan: {
      total: suratIzinRombongan,
      suratTypeIzinRombongan: { ...suratTypeIzinRombongan },
      status: suratTypeIzinRombongan?.status,
    },
  };

  return NextResponse.json(data);
}
