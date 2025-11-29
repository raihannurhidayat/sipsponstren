import { getReports } from '@/actions/analytics';
import AnalyticsView from './_components/AnalyticsView';

export const metadata = {
  title: 'Analytics | Document Submission System',
  description: 'Generate and view AI-powered performance reports.',
};

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = typeof resolvedSearchParams.limit === 'string' ? parseInt(resolvedSearchParams.limit) : 5;

  const { reports, metadata } = await getReports(page, limit);

  const serializedReports = reports?.map(report => ({
    ...report,
    startDate: report.startDate.toISOString(),
    endDate: report.endDate.toISOString(),
    createdAt: report.createdAt.toISOString(),
  })) || [];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
      </div>
      <AnalyticsView 
        initialReports={serializedReports} 
        pagination={metadata || { totalCount: 0, totalPages: 0, currentPage: 1, limit: 5 }}
      />
    </div>
  );
}
