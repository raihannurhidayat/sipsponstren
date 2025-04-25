import { auth } from "@/lib/auth";
import { User } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type WithAuthAdminProps = {
  user: User;
};

export default function withAuthAdmin<P extends WithAuthAdminProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function WithAuthAdmin(
    props: Omit<P, keyof WithAuthAdminProps>
  ) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/");
    }

    if (session.user.role !== "admin") {
      redirect("/dashboard");
    }

    return <WrappedComponent {...(props as P)} user={session.user} />;
  };
}
