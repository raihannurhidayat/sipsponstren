"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  ChevronRight,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TemplateList() {
  const query = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await fetch("/api/admin/templates");
      const data = await res.json();
      if (!res.ok) throw new Error("Network response was not ok");
      return data;
    },
  });

  const templates = [
    {
      id: "1",
      title: "Surat Keterangan Santri",
      href: "surat-keterangan-santri",
      status: query.data?.suratKeteranganSantri?.status,
      submissions: query?.data?.suratKeteranganSantri?.total || 0,
    },
    {
      id: "2",
      title: "Surat Izin Rombongan",
      href: "surat-izin-rombongan",
      status: query.data?.suratIzinRombongan?.status,
      submissions: query?.data?.suratIzinRombongan?.total || 0,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filter templates based on search and filters
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || template.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className="rounded-r-none"
            >
              Grid
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="rounded-l-none"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {query.isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <Badge
                    variant={
                      template.status === "active" ? "default" : "secondary"
                    }
                  >
                    {template.status === "active" ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {template.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {template.status}
                  </span>
                </div>
                <div className="mb-4 flex items-start space-x-3">
                  <div className="rounded-md bg-gray-100 p-2">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{template.title}</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{template.submissions}</span>{" "}
                  submissions
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <Link
                  href={`/admin/manage-letters/${template.href}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-between">
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 bg-gray-100 p-4 font-medium">
            <div className="col-span-5">Template</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Action</div>
          </div>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="grid grid-cols-12 gap-4 border-t p-4"
            >
              <div className="col-span-5 font-medium">{template.title}</div>

              <div className="col-span-2">
                <Badge
                  variant={
                    template.status === "active" ? "default" : "secondary"
                  }
                >
                  {template.status === "active" ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {template.status === "active" ? "Available" : "Unavailable"}
                </Badge>
              </div>

              <div className="col-span-1">
                <Link href={`/admin/manage-letters/${template.href}`}>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
