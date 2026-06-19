import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-800",
        className,
      )}
    >
      {children}
    </span>
  );
}
