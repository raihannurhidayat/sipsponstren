import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TemplateDetail } from "./_components/TemplateDetail";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex gap-2 justify-between pt-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Template Details
          </h1>
          <Link href="/admin/manage-letters">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Templates
            </Button>
          </Link>
        </div>
        <TemplateDetail id={id} />
      </div>
    </main>
  );
}
