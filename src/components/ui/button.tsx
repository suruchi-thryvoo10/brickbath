import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/format";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-ink-50 hover:bg-ink-800 shadow-[0_1px_2px_rgb(23_20_15/0.18)] hover:shadow-[0_8px_24px_-10px_rgb(23_20_15/0.45)]",
  secondary: "bg-brass-600 text-white hover:bg-brass-700",
  outline: "border border-ink-300 text-ink-900 hover:border-ink-900 hover:bg-ink-50",
  ghost: "text-ink-700 hover:text-ink-900 hover:bg-ink-100",
  whatsapp: "bg-[#25D366] text-[#052e16] hover:bg-[#1ebe5a]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem] rounded-[8px]",
  md: "h-11 px-5 text-sm rounded-[10px]",
  lg: "h-13 px-7 text-[0.9375rem] rounded-[12px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: Omit<CommonProps, "children">): string {
  return cx(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...props
}: CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }) {
  const cls = buttonClass({ variant, size, className });
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
