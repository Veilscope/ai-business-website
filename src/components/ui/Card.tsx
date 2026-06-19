import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
