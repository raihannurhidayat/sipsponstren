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

  const suratTypeKeteranganSantri = await prisma.letterType.findFirst({
    where: { name: "Surat Keterangan Santri" },
  });
  const suratTypeIzinRombongan = await prisma.letterType.findFirst({
    where: { name: "Surat Keterangan Santri" },
  });

  const data = {
    suratKeteranganSantri: {
      total: suratKeteranganSantri,
      suratTypeKeteranganSantri,
    },
    suratIzinRombongan: {
      total: suratIzinRombongan,
      suratTypeIzinRombongan,
    },
  };

  return NextResponse.json(data);
}
