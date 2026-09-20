import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

const base =
  "group inline-flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-sm font-medium tracking-[0.01em] transition-colors duration-300";

const variantClasses: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: "bg-ink text-paper hover:bg-ink-soft",
    dark: "bg-paper text-ink hover:bg-white",
  },
  secondary: {
    light: "border border-ink/25 text-ink hover:border-ink",
    dark: "border border-line-dark text-paper hover:border-paper/70",
  },
  ghost: {
    light: "text-ink underline-offset-4 hover:underline px-0 py-0",
    dark: "text-paper underline-offset-4 hover:underline px-0 py-0",
  },
};

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  tone = "light",
  className = "",
  withArrow = true,
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant][tone]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}
