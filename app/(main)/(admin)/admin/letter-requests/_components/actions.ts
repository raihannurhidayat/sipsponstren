"use server";

import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function changeStatusLetterRequest(
  requestLetterId: string,
  status: Status
) {
  try {
    await prisma.letter.update({
      where: { id: requestLetterId }, // Cari letter berdasarkan ID
      data: {
        status: status, // Update status
      },
    });
  } catch (error) {
    throw new Error("Failed to update status");
  }
}

export async function updatePdfUrl(requestLetterId: string, pdfUrl: string) {
  try {
    await prisma.letter.update({
      data: {
        pdfUrl,
      },
      where: {
        id: requestLetterId,
      },
    });
  } catch (error) {
    throw new Error("Failed to update status");
  }
}
