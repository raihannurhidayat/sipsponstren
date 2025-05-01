"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  User,
  Search,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Letter, letterType } from "@prisma/client";
import {
  decrementNomenclature,
  resetTo001WithCurrentYear,
} from "@/constants/helpers";
import { nomenclatureLetterRequest } from "../../../letter-requests/_components/actions";
import { updateNomenclatureLetterRequest } from "@/app/(main)/(user)/request/_components/form/action";
import { toast } from "sonner";

export function TemplateDetail({ id }: { id: string }) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const queryClient = useQueryClient();

  const template = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/templates/${id}`);
      const data = await res.json();

      return data;
    },
  });
  const [isAvailable, setIsAvailable] = useState(
    template?.data?.status === "active"
  );

  if (template.isLoading) {
    return (
      <div className="min-h-screen min-w-[90%] flex items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  // Filter submissions based on search and status filter
  const filteredSubmissions = template?.data?.letters?.filter(
    (submission: any) => {
      const matchesSearch =
        submission?.template
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        submission?.user?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || submission.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const handleStatusChange = () => {
    setIsAvailable(!isAvailable);
    setStatusDialogOpen(false);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredSubmissions?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(filteredSubmissions?.length / itemsPerPage) || 1;

  // Pagination controls
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleDownload = (url: string) => {
    // Membuat elemen anchor sementara
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onResetNomenclature = async (currentNomenclature: string) => {
    const resetNomenClature = resetTo001WithCurrentYear(currentNomenclature);

    try {
      toast.loading("Reset Nomenclature ", { id: "reset" });
      await updateNomenclatureLetterRequest(
        template.data.letterType.name,
        resetNomenClature
      );
      queryClient.invalidateQueries({ queryKey: ["template", id] });
      toast.success("Success Reset Nomenclature ", { id: "reset" });
    } catch (error) {
      toast.error("Failed Reset Nomenclature ", { id: "reset" });
    } finally {
      toast.dismiss("reset");
      setResetDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Overview Section */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">
              {template.data.letterType.name}
            </CardTitle>
            <CardDescription>
              {template.data.letterType.description}
            </CardDescription>
          </div>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className="px-3 py-1"
          >
            {isAvailable ? (
              <CheckCircle className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <div className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-500">
                <span>Nomenclature Format</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Nomenclature is automatically generated for each
                        submission. The format includes letter type, year,
                        department code, and a sequential number.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-3 rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-sm text-gray-500">Last Generated:</span>
                  <span className="text-sm font-medium">
                    {decrementNomenclature(
                      template.data.letterType.nomenclature
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-sm text-gray-500">Next Preview:</span>
                  <span className="text-sm font-medium">
                    {template.data.letterType.nomenclature}
                  </span>
                </div>

                <div className="pt-2">
                  <Dialog
                    open={resetDialogOpen}
                    onOpenChange={setResetDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Nomenclature Counter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Nomenclature Counter</DialogTitle>
                        <DialogDescription>
                          This will reset the nomenclature counter to 0001. The
                          next generated code will be{" "}
                          {/* {template.nomenclatureFormat.replace("XXXX", "0001")}. */}
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setResetDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            onResetNomenclature(
                              template.data.letterType.nomenclature
                            )
                          }
                        >
                          Reset Counter
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Status Control */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Status</CardTitle>
          <CardDescription>
            Control whether users can submit requests for this letter template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">
                {isAvailable
                  ? "Accepting Submissions"
                  : "Not Accepting Submissions"}
              </div>
            </div>
            <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status-toggle" className="sr-only">
                    Toggle status
                  </Label>
                  <Switch
                    id="status-toggle"
                    checked={isAvailable}
                    onClick={(e: any) => {
                      e.preventDefault(); // Prevent immediate toggle
                      setStatusDialogOpen(true);
                    }}
                  />
                  {isAvailable ? (
                    <ToggleRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isAvailable
                      ? "Disable Submissions for this Template?"
                      : "Enable Submissions for this Template?"}
                  </DialogTitle>
                  <DialogDescription>
                    {isAvailable
                      ? "Users will no longer be able to submit requests for this letter template."
                      : "Users will be able to submit requests for this letter template."}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setStatusDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleStatusChange}>
                    {isAvailable ? "Disable Submissions" : "Enable Submissions"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Submission Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Statistics</CardTitle>
          <CardDescription>
            Overview of submission activity for this template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gray-100 p-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {template.data.total}
                  </div>
                  <div className="text-xs text-gray-500">Total Submissions</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-50 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {template.data.approved}
                  </div>
                  <div className="text-xs text-gray-500">Approved</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-50 p-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {template.data.rejected}
                  </div>
                  <div className="text-xs text-gray-500">Rejected</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-yellow-50 p-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {template.data.review}
                  </div>
                  <div className="text-xs text-gray-500">Review</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Data and Activity Log Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Data</CardTitle>
          <CardDescription>
            View and manage all submissions for this template
          </CardDescription>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search submissions..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>

                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((submission: any) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.user.name}
                  </TableCell>

                  <TableCell>
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        submission.status === "Approved"
                          ? "default"
                          : submission.status === "Rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {submission.status === "Approved" && (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      )}
                      {submission.status === "Rejected" && (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {submission.status === "Review" && (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {submission.status === "Approved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(submission.pdfUrl)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {filteredSubmissions.length === 0 && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-gray-500">No submissions found</p>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredSubmissions.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} -{" "}
                  {Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
                  {filteredSubmissions.length} results
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
