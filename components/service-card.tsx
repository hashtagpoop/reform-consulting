import Link from "next/link";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  number: string;
  title: string;
  blurb: string;
  href: string;
  accent?: "clay" | "moss" | "ochre";
  className?: string;
};

const accentText: Record<NonNullable<ServiceCardProps["accent"]>, string> = {
  clay: "text-clay",
  moss: "text-moss",
  ochre: "text-ochre",
};

export function ServiceCard({
  number,
  title,
  blurb,
  href,
  accent = "clay",
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-6 border border-hairline bg-canvas p-8 transition-all hover:border-ink/40 hover:bg-canvas-deep/60",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-display text-[80px] leading-none tracking-tight",
            accentText[accent],
          )}
        >
          {number}
        </span>
        <span className="font-display italic text-sm text-ink-faint pt-3">
          offering
        </span>
      </div>

      <div className="mt-4">
        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 text-ink-soft leading-relaxed">{blurb}</p>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink uppercase tracking-[0.18em]">
        Read more
        <span className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  );
}
