"use client";

import { authClient } from "@/lib/auth-client";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import TableUser from "./table/table-user";
import { useQuery } from "@tanstack/react-query";

export default function ManageUSerSection() {
  const { data: users } = useQuery({
    queryKey: ["get-data-users-table"],
    queryFn: async () => {
      const dataUser = await authClient.admin.listUsers({
        query: {
          limit: 10,
        },
      });

      return dataUser.data?.users;
    },
  });

  return (
    <div>
      <TableUser users={users ?? []} />
    </div>
  );
}
