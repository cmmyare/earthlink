"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const isDashboard = pathname.startsWith("/dashboard");

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
            <span className="text-lg font-semibold text-sky-400">N</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              EirthLink
            </span>
            <span className="text-[11px] text-slate-400">
              AI Studio
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <NavLink href="/pricing" label="Pricing" />
          <NavLink href="/dashboard" label="Dashboard" active={isDashboard} />
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-xs text-slate-300 sm:inline">
                {user.email} •{" "}
                <span className="text-sky-400">{user.credits} credits</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-xs text-slate-300 hover:text-white md:inline"
              >
                Login
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

function NavLink({ href, label, active }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative text-xs font-medium text-slate-300 transition-colors hover:text-sky-400",
        isActive && "text-sky-400"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      )}
    </Link>
  );
}

