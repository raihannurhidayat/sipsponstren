import dynamic from "next/dynamic";

const PreviewLetter = dynamic(() => import("./download/PreviewLetter"), {
  ssr: false,
  loading: () => <p>Memuat preview...</p>,
});

export default function PreviewPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Preview Dokumen</h1>
      <PreviewLetter />
    </div>
  );
}