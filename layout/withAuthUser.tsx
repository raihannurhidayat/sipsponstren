import { auth } from "@/lib/auth";
import { User } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type WithAuthUserProps = {
  user: User;
};

export default function withAuthUser<P extends WithAuthUserProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function WithAuthUser(
    props: Omit<P, keyof WithAuthUserProps>
  ) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/");
    }

    if (session.user.role !== "user") {
      redirect("/admin");
    }

    return <WrappedComponent {...(props as P)} user={session.user} />;
  };
}
