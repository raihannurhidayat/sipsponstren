"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function ButtonSignOut() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut(
      {},
      {
        onSuccess: (ctx) => {
          toast.success("Proses Berhasil Dilakukan", {
            id: "sign-out",
            richColors: true,
          });
          router.push("/");
        },
        onRequest: (ctx) => {
          toast.loading("Proses Sedang Berjalan", {
            id: "sign-out",
            richColors: true,
          });
        },
      }
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
      size="lg"
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
