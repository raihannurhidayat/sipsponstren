"use client";

import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Search,
  ThumbsDown,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Status } from "@prisma/client";
import { formattedDate } from "@/lib/utils";
import { changeStatusLetterRequest, updatePdfUrl } from "./actions";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import { PdfDocument } from "./download/PdfDocument";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";

type LetterSubmission = {
  id: string;
  userId: string;
  template: string;
  data: string;
  status: Status;
  submitted_at: Date;
  approved_at: Date | null;
  pdfUrl: string | null;
  username: string;
};

export default function TableRequestsLetter() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State for selected letter and modal
  const [selectedLetter, setSelectedLetter] = useState<LetterSubmission | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["request-letter-admin"],
    queryFn: async () => {
      const res = await fetch("/api/admin/request-letter");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // Sample data
  const letterSubmissions: {
    id: string;
    userId: string;
    template: string;
    data: string;
    status: Status;
    submitted_at: Date;
    approved_at: Date | null;
    pdfUrl: string | null;
    username: string;
  }[] = data;

  const filtered = letterSubmissions?.filter((submission) => {
    const matchesSearchByUsername = submission.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesSearchByTemplate = submission.template
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      submission.status.toLowerCase() === statusFilter.toLowerCase();

    return (
      matchesStatus && (matchesSearchByTemplate || matchesSearchByUsername)
    );
  });

  // Calculate pagination
  const totalItems = filtered?.length!;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filtered?.slice(startIndex, endIndex);

  const queryClient = useQueryClient();

  const handleGeneratePDF = async (
    requestLetterId: string,
    templateType: string,
    data: string,
    username: string
  ) => {
    try {
      // 1. Generate PDF as Blob
      const pdfBlob = await pdf(
        <PdfDocument templateType={templateType} data={data} />
      ).toBlob();

      // 2. Upload ke Firebase Storage
      const storageRef = ref(
        storage,
        `sipspontren/${username}_${templateType}_surat.pdf`
      );
      const snapshot = await uploadBytes(storageRef, pdfBlob);

      // 3. Dapatkan download URL
      const url = await getDownloadURL(snapshot.ref);

      // 4. Simpan ke database
      await updatePdfUrl(requestLetterId, url);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal membuat dokumen");
    } finally {
      // setIsLoading(false);
    }
  };

  const mutation = useMutation({
    mutationKey: ["change-status-letter"],
    mutationFn: async (data: {
      requestLetterId: string;
      status: Status;
      templateType: string;
      data: string;
      username: string;
    }) => {
      if (data.status === "Approved") {
        handleGeneratePDF(
          data.requestLetterId,
          data.templateType,
          data.data,
          data.username
        );
      }

      await changeStatusLetterRequest(data.requestLetterId, data.status);
    },
    onMutate: () => {
      toast.loading("Proses Sedang Berlangsung", {
        id: "change-status-request-letter",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request-letter-admin"] });
      toast.success("Proses Berhasil Dilakukan", {
        id: "change-status-request-letter",
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Proses gagal dilakukan", {
        id: "change-status-request-letter",
      });
    },
  });

  // Handle status change
  const handleStatusChange = (letter: LetterSubmission, newStatus: Status) => {
    mutation.mutate({
      requestLetterId: letter.id,
      status: newStatus,
      templateType: letter.template,
      data: letter.data,
      username: letter.username,
    });
  };

  // Handle view details
  const handleViewDetails = (letter: LetterSubmission) => {
    setSelectedLetter(letter);
    setIsDetailModalOpen(true);
  };

  // Render status badge
  const renderStatusBadge = (status: Status) => {
    switch (status) {
      case "Review":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            In Review
          </Badge>
        );
      case "Approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
          >
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto py-6 space-y-6 min-h-screen">
      <div className="flex justify-between md:items-center md:flex-row flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Letter Submissions
          </h1>
          <p className="text-muted-foreground">
            Manage student letter requests and submissions
          </p>
        </div>
        <div className="flex md:items-center gap-2 flex-col md:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[250px] pl-8 w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Bungkus table dengan div overflow-x-auto dan force scroll */}
          <div className="w-full overflow-x-scroll">
            <div className="min-w-[900px]">
              {currentItems?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-[80px]">No.</TableHead>
                      <TableHead>Letter Type</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems?.map((letter, key) => (
                      <TableRow key={key} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{key + 1}</TableCell>
                        <TableCell>{letter.template}</TableCell>
                        <TableCell>{letter.username}</TableCell>
                        <TableCell>
                          {formattedDate(letter.submitted_at)}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(letter.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(letter)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {letter.status !== "Approved" &&
                              letter.status !== "Rejected" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                                  onClick={() =>
                                    handleStatusChange(letter, "Approved")
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                              )}
                            {letter.status !== "Approved" &&
                              letter.status !== "Rejected" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                  onClick={() =>
                                    handleStatusChange(letter, "Rejected")
                                  }
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    Tidak ada pengajuan yang ditemukan
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Coba sesuaikan pencarian atau filter Anda untuk menemukan
                    apa yang Anda cari.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{endIndex} of {totalItems} entries
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number.parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant={currentPage === number ? "default" : "outline"}
                size="sm"
                className="w-9"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        {selectedLetter && (
          <DialogContent className="max-h-[80%] overflow-y-auto md:w-full w-96 max-w-screen">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Letter Request Details
              </DialogTitle>
              <DialogDescription>
                View complete information about this letter request
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Request Information
                  </h3>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Request ID:</div>
                        <div className="text-sm col-span-2">
                          {selectedLetter.id}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Letter Type:</div>
                        <div className="text-sm col-span-2">
                          {selectedLetter.template}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Status:</div>
                        <div className="text-sm col-span-2">
                          {renderStatusBadge(selectedLetter.status)}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Submitted On:</div>
                        <div className="text-sm col-span-2">
                          {formattedDate(selectedLetter.submitted_at)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Student Information
                  </h3>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Name:</div>
                        <div className="text-sm col-span-2">
                          {selectedLetter.username}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Student ID:</div>
                        <div className="text-sm col-span-2">
                          {selectedLetter.userId}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between sm:justify-between">
              <div className="flex gap-2">
                {selectedLetter.status !== "Approved" &&
                  selectedLetter.status !== "Rejected" && (
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      onClick={() => {
                        handleStatusChange(selectedLetter, "Approved");
                        setIsDetailModalOpen(false);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Letter
                    </Button>
                  )}

                {selectedLetter.status !== "Rejected" &&
                  selectedLetter.status !== "Approved" && (
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        handleStatusChange(selectedLetter, "Rejected");
                        setIsDetailModalOpen(false);
                      }}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Reject Letter
                    </Button>
                  )}
              </div>

              <Button
                variant="outline"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
