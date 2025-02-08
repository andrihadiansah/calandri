import Link from "next/link";
import { Calendar } from "lucide-react";
import { AuthModal } from "./auth/auth-modal";
export function SiteHeader() {
  return (
    <header className=" sticky top-0 content-center  border-b ">
      <nav className="flex items-center justify-between px-6 container-wrapper h-16 bg-secondary/40">
        <Link href={"/"} className="flex items-center gap-2">
          <Calendar className="h-9 w-9 text-green-600" />
          <h1 className="text-2xl font-semibold tracking-wider">
            Cal<span className="text-green-500">Andri</span>
          </h1>
        </Link>
        <div className="flex gap-4">
          <AuthModal />
        </div>
      </nav>
    </header>
  );
}
