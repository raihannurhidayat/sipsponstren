'use server';

import { prisma } from '@/lib/prisma';

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
    console.error('Create letter error:', err);
    return { success: false, error: 'Failed to create letter' };
  }
}
