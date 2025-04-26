"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressTimeline } from "./ProgressTimeline";
import { Letter, Status } from "@prisma/client";
import { formattedDate } from "@/lib/utils";

interface SubmissionHistoryProps {
  letter: Letter[];
}

export function SubmissionHistory(props: SubmissionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = props.letter.filter((submission) => {
    const matchesSearch = submission.template
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      submission.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))
        ) : (
          <div className="text-center py-10">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              Tidak ada pengajuan yang ditemukan
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Coba sesuaikan pencarian atau filter Anda untuk menemukan apa yang
              Anda cari.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SubmissionCard({ submission }: { submission: Letter }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case Status.Review:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case Status.Approved:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case Status.Rejected:
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-start">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
            <FileText className="h-6 w-6 text-slate-600" />
          </div>

          <div className="flex-grow space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-lg">{submission.template}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  <span>
                    Submitted on {formattedDate(submission.submitted_at)}
                  </span>
                </div>
              </div>

              <Badge
                className={`${getStatusColor(
                  submission.status
                )} px-2.5 py-0.5 text-xs font-medium`}
              >
                {submission.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <span className="font-medium mr-2">Request ID:</span>{" "}
                {submission.id}
              </div>
            </div>

            <ProgressTimeline
              currentStep={
                submission.status === "Review"
                  ? "Review"
                  : submission.status === "Approved"
                  ? "Completed"
                  : "Rejected"
              }
              status={submission.status}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-slate-50 flex flex-wrap gap-2 justify-end">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          <span>View Details</span>
        </Button>
        {submission.status === "Approved" ? (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </Button>
        ) : undefined}
      </CardFooter>
    </Card>
  );
}
