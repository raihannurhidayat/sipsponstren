import { authClient } from "@/lib/auth-client";

export default function useGetUserClient() {
  const { data: session, error, isPending } = authClient.useSession();

  return {
    session,
    error,
    isPending,
  };
}
