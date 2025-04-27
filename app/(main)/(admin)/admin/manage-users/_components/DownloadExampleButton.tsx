import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, FileQuestion, FileQuestionIcon } from "lucide-react";

export function DownloadExampleButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/doc/example.xlsx"; // Pastikan file ini tersedia di public folder
    link.download = "/doc/example.xlsx";
    link.click();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleDownload} className="w-fit">
            <FileQuestionIcon className="size-4" />
            {/* Download Example File */}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Unduh contoh templat Excel untuk membuat pengguna secara massal.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
