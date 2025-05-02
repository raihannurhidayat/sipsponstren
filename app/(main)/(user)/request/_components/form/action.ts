"use server";

import { prisma } from "@/lib/prisma";

export async function createLetter({
  userId,
  data,
  template,
}: {
  userId: string;
  data: string;
  template: string;
}) {
  try {
    const newLetter = await prisma.letter.create({
      data: {
        userId,
        data,
        template,
      },
    });

    return { success: true, data: newLetter };
  } catch (err) {
    console.error("Create letter error:", err);
    return { success: false, error: "Failed to create letter" };
  }
}

export async function updateNomenclatureLetterRequest(
  templateType: string,
  nomenclature: string
) {
  try {
    await prisma.letterType.update({
      where: { name: templateType }, // Cari letter berdasarkan ID
      data: {
        nomenclature: nomenclature, // Update status
      },
    });
  } catch (error) {
    throw new Error("Failed to update status");
  }
}
