"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Field Notes" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-40 border-b border-hairline">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-10">
        <Link
          href="/"
          className="group flex items-baseline gap-3 text-ink"
          aria-label="Reform Consulting home"
        >
          <span className="font-display text-[28px] leading-none tracking-tight">
            Reform
          </span>
          <span className="font-display italic text-[15px] text-ink-soft tracking-wide">
            consulting
          </span>
        </Link>

        <nav className="flex items-center gap-8 text-[13px] uppercase tracking-[0.18em]">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-clay" : "text-ink-soft transition-colors hover:text-clay"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="hidden rounded-full border border-ink/80 px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-canvas md:inline-block"
          >
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  );
}
