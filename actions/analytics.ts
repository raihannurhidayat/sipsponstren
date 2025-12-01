'use server';

import { prisma } from '@/lib/prisma';
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { renderToStream, Document } from '@react-pdf/renderer';
import { AnalyticsReportPdf } from '@/components/pdf/AnalyticsReportPdf';
import { createElement } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

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
            createElement(Document, {},
                createElement(AnalyticsReportPdf, {
                    startDate: from,
                    endDate: to,
                    totalSubmissions,
                    approvalRate,
                    topLetterType,
                    aiSummary,
                })
            )
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
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.warn("GOOGLE_API_KEY is not set. Using fallback message.");
            return "Analisis AI tidak tersedia: API Key tidak ditemukan.";
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Menggunakan model yang sudah terbukti aksesnya di akun kamu
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // PROMPT DIUBAH KE BAHASA INDONESIA
        const prompt = `
            Bertindaklah sebagai Analis Data Administrasi senior.
            Analisis statistik pengajuan surat berikut: ${JSON.stringify(stats)}.
            
            Tugas:
            1. Berikan ringkasan eksekutif profesional (maksimal 3-4 kalimat) dalam Bahasa Indonesia yang formal.
            2. Soroti tren persetujuan (approval) atau penolakan (rejection).
            3. Berikan 1 rekomendasi yang dapat ditindaklanjuti oleh admin.
            
            Format: Gunakan paragraf teks biasa saja. JANGAN gunakan format markdown (seperti **bold** atau bullet points) agar kompatibel dengan PDF generator.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Error generating AI analysis:", error);
        // Fallback message juga dalam Bahasa Indonesia
        return "Analisis AI tidak tersedia karena terjadi kesalahan sistem. Silakan tinjau statistik secara manual.";
    }
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
