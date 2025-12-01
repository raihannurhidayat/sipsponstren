'use client';

import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface PdfPreviewProps {
  url: string;
}

export default function PdfPreview({ url }: PdfPreviewProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let active = true;
    
    const fetchPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use proxy to avoid CORS and ensure we can get the blob
        // We use the proxy we created earlier to safely fetch the file server-side
        const fetchUrl = `/api/proxy-pdf?url=${encodeURIComponent(url)}`;
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('Failed to load PDF');
        
        const blob = await response.blob();
        
        if (active) {
          // Create a strictly "application/pdf" blob to force display
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(pdfBlob);
          setBlobUrl(objectUrl);
        }
      } catch (err) {
        console.error('Error fetching PDF:', err);
        if (active) {
          setError('Failed to load PDF preview.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      active = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50 rounded-md">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Loading preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50 rounded-md">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-50 rounded-md overflow-hidden border">
      {blobUrl && (
        <iframe
          src={`${blobUrl}#toolbar=0&navpanes=0`}
          className="w-full h-full border-none"
          title="PDF Preview"
        />
      )}
    </div>
  );
}
