"use client";

import useGetUser from "@/hooks/useGetUser";
import { AirVent, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import useGetUserClient from "@/hooks/useGetUserClient";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Navigation() {
  const { session, isPending, error } = useGetUserClient();

  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut(
      {},
      {
        onSuccess: (ctx) => {
          toast.success("Proses Berhasil Dilakukan", { id: "sign-out", richColors: true });
          router.push("/");
        },
        onRequest: (ctx) => {
          toast.loading("Proses Sedang Berjalan", { id: "sign-out", richColors: true });
        },
      }
    );
  }

  return (
    <nav className="border-b px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <Link href={"/"} className="flex items-center gap-2">
          <AirVent className="size-6" />
          <span className="font-bold">sipsponstren</span>
        </Link>

        <div>
          {isPending ? (
            <Button>
              <Loader2 className="size-3 animate-spin" />
            </Button>
          ) : (
            <Button onClick={handleSignOut} className="cursor-pointer">Sign Out</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
