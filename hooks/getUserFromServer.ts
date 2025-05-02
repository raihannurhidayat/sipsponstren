import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function getUserFromServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return { session };
}
