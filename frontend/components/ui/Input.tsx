import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 transition-colors placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/70",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

