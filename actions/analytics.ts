'use server';

import { prisma } from '@/lib/prisma';
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { renderToStream } from '@react-pdf/renderer';
import { AnalyticsReportPdf } from '@/components/pdf/AnalyticsReportPdf';
import { createElement } from 'react';

// Helper to convert stream to buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (err) => reject(err));
    });
}

interface DateRange {
    from: Date;
    to: Date;
}

export async function generateReport(dateRange: DateRange) {
    try {
        const { from, to } = dateRange;

        // 1. Calculate Stats
        const totalSubmissions = await prisma.letter.count({
            where: {
                submitted_at: {
                    gte: from,
                    lte: to,
                },
            },
        });

        const approvedCount = await prisma.letter.count({
            where: {
                submitted_at: {
                    gte: from,
                    lte: to,
                },
                status: 'Approved',
            },
        });

        const approvalRate = totalSubmissions > 0 ? (approvedCount / totalSubmissions) * 100 : 0;

        // Find most frequent letter type (template)
        const letters = await prisma.letter.groupBy({
            by: ['template'],
            where: {
                submitted_at: {
                    gte: from,
                    lte: to,
                },
            },
            _count: {
                template: true,
            },
            orderBy: {
                _count: {
                    template: 'desc',
                },
            },
            take: 1,
        });

        const topLetterType = letters.length > 0 ? letters[0].template : 'N/A';

        // 2. Mock AI Analysis
        const aiSummary = await getAIAnalysis({
            totalSubmissions,
            approvalRate,
            topLetterType,
            startDate: from,
            endDate: to,
        });

        // 3. Generate PDF
        const pdfStream = await renderToStream(
            createElement(AnalyticsReportPdf, {
                startDate: from,
                endDate: to,
                totalSubmissions,
                approvalRate,
                topLetterType,
                aiSummary,
            })
        );

        const pdfBuffer = await streamToBuffer(pdfStream);

        // 4. Upload to Firebase
        const fileName = `reports/analytics-${Date.now()}.pdf`;
        const storageRef = ref(storage, fileName);

        // Note: In a Node.js environment, the Firebase Web SDK might require polyfills (like XMLHttpRequest) 
        // or you might need to use firebase-admin. Assuming the environment supports it or polyfills are present.
        // We cast buffer to any to satisfy type checks if needed, but uploadBytes accepts Buffer in some contexts or Uint8Array.
        const snapshot = await uploadBytes(storageRef, pdfBuffer);
        const pdfUrl = await getDownloadURL(snapshot.ref);

        // 5. Save to DB
        const report = await prisma.analyticReport.create({
            data: {
                startDate: from,
                endDate: to,
                totalSubmissions,
                approvalRate,
                topLetterType,
                aiSummary,
                pdfUrl,
            },
        });

        return { success: true, report };

    } catch (error) {
        console.error('Error generating report:', error);
        return { success: false, error: 'Failed to generate report' };
    }
}

async function getAIAnalysis(stats: any) {
    // Mock AI call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    return `Based on the data from ${stats.startDate.toLocaleDateString()} to ${stats.endDate.toLocaleDateString()}, there were a total of ${stats.totalSubmissions} submissions. 
The approval rate stands at ${stats.approvalRate.toFixed(1)}%, indicating a ${stats.approvalRate > 80 ? 'healthy' : 'moderate'} acceptance flow. 
The most requested letter type was "${stats.topLetterType}". 
Overall, the system usage is ${stats.totalSubmissions > 50 ? 'high' : 'stable'}. Recommendation: Monitor rejection reasons for further optimization.`;
}

export async function getReports(page: number = 1, limit: number = 5) {
    try {
        const skip = (page - 1) * limit;

        const [reports, totalCount] = await Promise.all([
            prisma.analyticReport.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.analyticReport.count(),
        ]);

        return {
            success: true,
            reports,
            metadata: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit
            }
        };
    } catch (error) {
        console.error('Error fetching reports:', error);
        return { success: false, error: 'Failed to fetch reports' };
    }
}
