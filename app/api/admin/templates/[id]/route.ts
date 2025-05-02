import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatSlugToTitle } from "@/constants/helpers";
import { rejects } from "assert";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const template = formatSlugToTitle(id);

    const letters = await prisma.letter.findMany({
      where: {
        template,
      },
      include: {
        user: true,
      },

      orderBy: {
        submitted_at: "desc",
      },
    });

    const letterType = await prisma.letterType.findFirst({
      where: { name: template },
    });

    return NextResponse.json({
      letters,
      status: letterType?.status,
      letterType,
      total: letters.length,
      approved: letters.filter((letter) => letter.status === "Approved").length,
      rejected: letters.filter((letter) => letter.status === "Rejected").length,
      review: letters.filter((letter) => letter.status === "Review").length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the data." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();

    const { id } = await params;

    const template = formatSlugToTitle(id);

    const updatedTemplate = await prisma.letterType.update({
      where: { name: template },
      data: {
        status: status,
      },
    });

    return NextResponse.json(updatedTemplate);
  } catch (error) {
    console.error("[TEMPLATE_STATUS_UPDATE]", error);
    return NextResponse.json(
      { error: "Failed to update template status" },
      { status: 500 }
    );
  }
}
