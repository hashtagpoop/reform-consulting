import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-30 mt-32 border-t border-hairline bg-canvas-deep/60">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl tracking-tight">Reform</span>
            <span className="font-display italic text-base text-ink-soft">
              consulting
            </span>
          </div>
          <p className="mt-4 max-w-sm text-ink-soft leading-relaxed">
            A small studio helping small businesses adopt AI without losing
            their voice. Made by hand, with patience.
          </p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
            Studio
          </div>
          <ul className="mt-4 space-y-2 text-ink">
            <li>
              <Link href="/services" className="hover:text-clay">
                Services
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-clay">
                Skills library
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-clay">
                Field Notes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-clay">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
            Begin
          </div>
          <p className="mt-4 text-ink leading-relaxed">
            A 30-minute conversation costs nothing and tells us both whether
            we&rsquo;re a fit.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block border-b border-ink pb-0.5 font-display italic text-lg tracking-tight hover:border-clay hover:text-clay"
          >
            Schedule it &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-6 text-xs text-ink-faint md:flex-row md:px-10">
          <span>&copy; {new Date().getFullYear()} Reform Consulting</span>
          <span className="font-display italic">
            Set in Fraunces &amp; Newsreader
          </span>
        </div>
      </div>
    </footer>
  );
}
