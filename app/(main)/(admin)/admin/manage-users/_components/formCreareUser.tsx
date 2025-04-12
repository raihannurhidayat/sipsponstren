"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { createUserFormSchema, CreateUserFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateUser() {
  const form = useForm<CreateUserFormSchema>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    resolver: zodResolver(createUserFormSchema),
  });

  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (values: CreateUserFormSchema) => {
      const { email, password, name, role } = values;

      const newUser = await authClient.admin.createUser(
        {
          name,
          email,
          password,
          role,
        },
        {
          onRequest: (ctx) => {
            toast.loading("Proses Sedang Berlangsung", { id: "sign-up" });
          },
          onSuccess: (ctx) => {
            form.reset();
            toast.success("Proses Berhasil Dilakukan", { id: "sign-up" });
          },
          onError: (ctx) => {
            toast.dismiss("sign-up");
            console.log(ctx);

            if (ctx.error.code === "USER_ALREADY_EXISTS") {
              form.setError("email", {
                type: "required",
                message: "Email telah digunakan, silahkan gunakan email lain",
              });
            }
          },
        }
      );
    },
  });

  async function onSubmit(values: CreateUserFormSchema) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full max-w-md mask-x-to-background">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Create account for another access</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex. muhamad raihan nurhidayat"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex. raihannurhidayat@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
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

            <FormField
              control={form.control}
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

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
