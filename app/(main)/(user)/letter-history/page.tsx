import { prisma } from "@/lib/prisma";
import { SubmissionHistory } from "./_components/SubmissionHistory";

export default async function LetterHistoryPage() {
  const letter = await prisma.letter.findMany({});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Submission History</h1>
      <SubmissionHistory letter={letter} />
    </div>
  );
}
