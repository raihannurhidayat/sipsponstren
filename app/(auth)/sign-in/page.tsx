import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SignInForm from "./_components/form/signInForm";
import { redirect } from "next/navigation";
import getUserFromServer from "@/hooks/getUserFromServer";

export default async function SignInPage() {
  const { session } = await getUserFromServer();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <Card className="w-full max-w-md mask-x-to-background mx-4">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Selamat datang kembali! Silakan masuk untuk melanjutkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
