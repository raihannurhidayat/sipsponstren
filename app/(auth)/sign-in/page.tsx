import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import SignInForm from "./_components/form/signInForm";
import useGetUser from "@/hooks/useGetUser";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { session } = await useGetUser();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <Card className="w-full max-w-md mask-x-to-background">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      {/* <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Dont&apos; t have an account yet?{" "}
          <Link href={"/sign-up"} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter> */}
    </Card>
  );
}
