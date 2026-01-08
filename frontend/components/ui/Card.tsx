import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-soft backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

