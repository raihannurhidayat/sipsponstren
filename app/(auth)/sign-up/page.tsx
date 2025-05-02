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
import { authClient } from "@/lib/auth-client";
import {
  signUpFormSchema,
  SignUpFormSchema,
} from "@/lib/validation/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<SignUpFormSchema>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpFormSchema),
  });

  const mutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (values: SignUpFormSchema) => {
      const { email, password, name } = values;

      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: (ctx) => {
            toast.loading("Proses Sedang Berlangsung", { id: "sign-up" });
          },
          onSuccess: (ctx) => {
            form.reset();
            toast.success("Proses Berhasil Dilakukan", { id: "sign-up" });
            router.push("/sign-in");
          },
          onError: (ctx) => {
            toast.dismiss("sign-up");
            form.setError("email", {
              type: "required",
              message: "Email telah digunakan, silahkan gunakan email lain",
            });
          },
        }
      );
    },
  });

  async function onSubmit(values: SignUpFormSchema) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full max-w-md mask-x-to-background">
      <CardHeader>
        <CardTitle>Registrasi</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={"/sign-in"} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
