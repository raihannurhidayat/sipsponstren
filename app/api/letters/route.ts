// app/api/letters/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan ini sesuai path kamu

export async function GET() {
  const letter = await prisma.letterType.findMany({
    where: {
      status: "active",
    },
  });

  return NextResponse.json(letter);
}
