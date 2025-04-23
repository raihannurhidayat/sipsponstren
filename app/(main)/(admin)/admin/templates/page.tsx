import { Button } from "@/components/ui/button";
import withAuthAdmin, { WithAuthAdminProps } from "@/layout/withAuthAdmin";
import { prisma } from "@/lib/prisma";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

async function TemplatesPage({ user }: WithAuthAdminProps) {
  const templates = await prisma.template.findMany({});

  console.log({ templates });

  return (
    <section className="">
      <h1 className="font-semibold ">List Template</h1>
      <div className="mt-4">
        <Button asChild>
          <Link
            className="flex items-center gap-1 cursor-pointer"
            href="/admin/templates/create"
          >
            <PlusSquare className="size-4" />
            <span>Create New Template</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default withAuthAdmin(TemplatesPage);
