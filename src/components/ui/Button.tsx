import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent2 hover:-translate-y-0.5"
      : "border border-line text-ink hover:border-accent/60 hover:text-accent hover:-translate-y-0.5";

  return (
    <a
      href={href}
      className={cn(base, styles, className)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
