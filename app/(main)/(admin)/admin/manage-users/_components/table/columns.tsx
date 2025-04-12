"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { UserWithRole } from "better-auth/plugins";
import { toast } from "sonner";
import useGetUserClient from "@/hooks/useGetUserClient";

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const [isOpen, setIsOpen] = useState(false);

      const queryClient = useQueryClient();
      const { session } = useGetUserClient();

      async function handleDelete() {
        setIsOpen(false);

        if (session?.user.id === id) {
          toast.error("Tidak bisa menghapus akun yang sedang digunakan", {
            richColors: true,
          });
          return;
        }

        try {
          await authClient.admin.removeUser({
            userId: id,
          });

          toast.loading("Menghapus user...", { id: "delete-user" });
        } catch (error) {
          toast.error("Gagal menghapus user");
        } finally {
          toast.success("User berhasil dihapus", { id: "delete-user" });
          queryClient.invalidateQueries({ queryKey: ["get-data-users-table"] });
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex items-center gap-1">
                  <Trash2 className="size-4" />
                  Delete User
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data
                  secara permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Ya, hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
