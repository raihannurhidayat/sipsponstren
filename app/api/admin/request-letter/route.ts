// app/api/letters/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan ini sesuai path kamu

export async function GET() {
  const letters = await prisma.letter.findMany({
    include: { user: true },
    orderBy: { submitted_at: "desc" },
  });

  const formattedLetters = letters.map((letter) => ({
    ...letter,
    username: letter.user?.name,
  }));

  return NextResponse.json(formattedLetters);
}
