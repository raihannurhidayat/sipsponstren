"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status, User } from "@prisma/client";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import React from "react";

interface DashboardViewProps {
  letter: {
    id: string;
    userId: string;
    template: string;
    data: string;
    status: string;
    submitted_at: Date;
    approved_at: Date | null;
    pdfUrl: string | null;
    user: User;
  }[];
}

export default function DashboardView(props: DashboardViewProps) {
  const stats = {
    submissions: props.letter.length,
    approved: props.letter.filter((v) => v.status === "Approved").length,
    rejected: props.letter.filter((v) => v.status === "Rejected").length,
    pending: props.letter.filter((v) => v.status === "Review").length,
  };

  const recentLetter = props.letter.slice(0, 5);

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "Approved":
        return (
          <div className="flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2 text-green-800" />
            Approved
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center text-red-800">
            <XCircle className="h-5 w-5 mr-2 text-red-800" />
            Rejected
          </div>
        );
      case "Review":
        return (
          <div className="flex items-center text-yellow-800">
            <Clock className="h-5 w-5 mr-2 text-yellow-800" />
            Review
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Submissions
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.submissions}</div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Approved Letters
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Rejected Letters
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>
                The 5 most recently updated letters in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Letter Title</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLetter.map((update) => (
                    <TableRow key={update.id}>
                      <TableCell className="font-medium">
                        {update.template}
                      </TableCell>
                      <TableCell>{update.user.name}</TableCell>
                      <TableCell>25 April 2025</TableCell>
                      <TableCell>
                        {getStatusBadge(update.status as Status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {recentLetter.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No submissions yet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start creating letter templates and submissions will appear
                    here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </React.Fragment>
  );
}
