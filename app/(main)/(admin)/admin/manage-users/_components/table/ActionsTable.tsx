import React, { useState } from "react";
import { toast } from "sonner";
import useGetUserClient from "@/hooks/useGetUserClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordUserFormSchema,
  updatePasswordUserFormSchema,
} from "@/lib/validation/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@prisma/client";
import { Loader2, MoreHorizontal, PenLine, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface ActionsTableProps {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ActionsTable({
  email,
  id,
  name,
  role,
}: ActionsTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const queryClient = useQueryClient();
  const { session } = useGetUserClient();

  const formInput = useForm<UpdatePasswordUserFormSchema>({
    mode: "onChange",
    resolver: zodResolver(updatePasswordUserFormSchema),
    defaultValues: {
      role: (role as Role) || "user",
      name: name || "",
      email: email || "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["update-password-user"],
    mutationFn: async (data: UpdatePasswordUserFormSchema) => {
      if (data.password) {
        await authClient.admin.setUserPassword(
          {
            userId: id,
            newPassword: data.password ? data.password : "",
          },
          {
            onRequest: () => {
              toast.loading("Mengubah password user...", {
                id: "update-user",
              });
            },
            onSuccess: () => {
              toast.success("Password user berhasil diubah", {
                id: "update-user",
              });
            },
            onError: (ctx) => {
              console.log(ctx);

              toast.error("Gagal mengubah password user", {
                id: "update-user",
              });
            },
          }
        );
      }

      if (data.role !== role) {
        await authClient.admin.setRole(
          {
            userId: id,
            role: data.role,
          },
          {
            onRequest: () => {
              toast.loading("Mengubah role user...", {
                id: "update-user",
              });
            },
            onSuccess: () => {
              toast.success("Role user berhasil diubah", {
                id: "update-user",
              });
            },
            onError: (ctx) => {
              console.log(ctx);

              toast.error("Gagal mengubah role user", {
                id: "update-user",
              });
            },
          }
        );
      }

      setIsEditOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-data-users-table"],
      });
    },
  });

  async function handleDelete() {
    setIsOpen(false);

    if (session?.user.id === id) {
      toast.error("Tidak bisa menghapus akun yang sedang digunakan", {
        richColors: true,
      });
      return;
    }

    try {
      toast.loading("Menghapus user...", { id: "delete-user" });
      await authClient.admin.removeUser({
        userId: id,
      });
    } catch (error) {
      toast.error("Gagal menghapus user");
    } finally {
      toast.success("User berhasil dihapus", { id: "delete-user" });
      queryClient.invalidateQueries({ queryKey: ["get-data-users-table"] });
    }
  }

  function handleUpdate(values: UpdatePasswordUserFormSchema) {
    mutation.mutate(values);
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
        <DropdownMenuContent align="end" className="space-y-2 p-2">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-1">
              <Trash2 className="size-4" />
              Delete User
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            <div className="flex items-center gap-1">
              <PenLine className="size-4" />
              Update User
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data secara
              permanen.
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

      <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password User</AlertDialogTitle>
            <AlertDialogDescription>
              Perbarui password pengguna di bawah ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...formInput}>
            <form
              className="space-y-4 py-2"
              onSubmit={formInput.handleSubmit(handleUpdate)}
            >
              <FormField
                control={formInput.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={formInput.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Email</Label>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={formInput.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formInput.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2 justify-end">
                <Button
                  disabled={mutation.isPending}
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Batal
                </Button>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
