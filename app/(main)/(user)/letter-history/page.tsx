import { prisma } from "@/lib/prisma";
import { SubmissionHistory } from "./_components/SubmissionHistory";
import withAuthUser, { WithAuthUserProps } from "@/layout/withAuthUser";

async function LetterHistoryPage({ user }: WithAuthUserProps) {
  const letter = await prisma.letter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      submitted_at: "desc"
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Riwayat Pengajuan</h1>
      <SubmissionHistory letter={letter} />
    </div>
  );
}

export default withAuthUser(LetterHistoryPage);
