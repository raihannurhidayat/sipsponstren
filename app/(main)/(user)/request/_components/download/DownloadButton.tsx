// components/DownloadButton.tsx
'use client';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PdfDocument } from './PdfDocument';
import { storage, db } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      // 1. Generate PDF as Blob
      const pdfBlob = await pdf(<PdfDocument />).toBlob();
      
      // 2. Upload ke Firebase Storage
      const storageRef = ref(storage, `documents/${Date.now()}_surat.pdf`);
      const snapshot = await uploadBytes(storageRef, pdfBlob);
      
      // 3. Dapatkan download URL
      const url = await getDownloadURL(snapshot.ref);
      
      // 4. Simpan ke Firestore
      // await addDoc(collection(db, 'documents'), {
      //   url,
      //   fileName: snapshot.ref.name,
      //   createdAt: serverTimestamp(),
      //   size: snapshot.metadata.size
      // });
      
      setDownloadUrl(url);
      
      // 5. Trigger download otomatis
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'surat_pengantar.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error('Error:', error);
      alert('Gagal membuat dokumen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleGeneratePDF}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {isLoading ? 'Menyimpan dan Mengunduh...' : 'Simpan & Download PDF'}
      </button>
      
      {downloadUrl && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">
            Dokumen tersimpan di: 
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" 
               className="ml-2 text-blue-500 break-all">
              {downloadUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}