"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const items = [
  { href: "/dashboard", label: "Generate Video" },
  { href: "/dashboard?tab=library", label: "My Videos" },
  { href: "/dashboard?tab=pricing", label: "Pricing" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 flex-col border-r border-slate-800/80 bg-slate-950/60 px-3 py-4 sm:flex">
      <p className="mb-4 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        Workspace
      </p>
      <nav className="flex flex-1 flex-col gap-1 text-sm">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            active={pathname === "/dashboard" && item.href === "/dashboard"}
          >
            {item.label}
          </SidebarItem>
        ))}
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

function SidebarItem({ href, children, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-slate-50",
        active && "bg-slate-800/80 text-sky-400"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
      {children}
    </Link>
  );
}

