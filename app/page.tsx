import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button asChild>
        <Link href={"/sign-in"} className="cursor-pointer">
          Click me for sign in
        </Link>
      </Button>
    </div>
  );
}
