import Link from "next/link";
import { ServiceCard } from "@/components/service-card";

const services = [
  {
    number: "01",
    title: "AI Operating System",
    blurb:
      "We install an AI workspace wired to the tools you already use, with one-click skills behind plain English buttons. No console required.",
    href: "/services#operating-system",
    accent: "clay" as const,
  },
  {
    number: "02",
    title: "Automation Audit",
    blurb:
      "We walk through a day in your business and surface the seams: where AI fits, where automation pays, and where a human still should win.",
    href: "/services#audit",
    accent: "moss" as const,
  },
  {
    number: "03",
    title: "Project Implementation",
    blurb:
      "Bring us a specific knot — a stubborn workflow, a missed-opportunity inbox, a back-office bottleneck — and we&rsquo;ll untangle it end-to-end.",
    href: "/services#implementation",
    accent: "ochre" as const,
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-24 pt-24 md:px-10 md:pt-32">
          <div className="col-span-12 md:col-span-2">
            <div className="rise text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              Est.
              <br />
              2026
            </div>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h1 className="rise font-display text-[clamp(56px,10vw,168px)] leading-[0.92] tracking-[-0.035em] text-ink">
              AI for the
              <br />
              <span className="font-display-wonky italic text-clay">
                quietly
              </span>{" "}
              <span className="italic">ambitious</span>
              <br />
              small business.
            </h1>

            <div className="mt-16 grid grid-cols-12 gap-6">
              <p className="col-span-12 max-w-2xl text-lg leading-relaxed text-ink-soft md:col-span-7 md:col-start-3">
                Reform Consulting is a one-studio practice helping owners adopt
                AI without the jargon, the dashboards, or the dread. We install
                the operating system, audit the day, and ship the project. You
                keep doing the work that made the business worth running.
              </p>

              <div className="col-span-12 md:col-span-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-clay"
                >
                  Begin
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial corner mark */}
        <div className="pointer-events-none absolute right-6 top-6 hidden font-display italic text-ink-faint md:block md:right-10">
          Vol. I &middot; No. 01
        </div>
      </section>

      <div className="rule mx-auto max-w-[1400px]" />

      {/* THREE OFFERINGS */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              Three ways in
            </div>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Pick the
              <br />
              <em className="font-display-wonky">door</em>
              <br />
              that fits.
            </h2>
            <p className="mt-6 max-w-xs text-ink-soft leading-relaxed">
              The three offerings are independent. Start anywhere — most clients
              do.
            </p>
          </div>

          <div className="col-span-12 grid gap-6 md:col-span-9 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.number} {...s} />
            ))}
          </div>
        </div>
      </section>

      <div className="rule mx-auto max-w-[1400px]" />

      {/* PHILOSOPHY STRIP */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              How we work
            </div>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Quietly. Plainly.
              <br />
              <em className="font-display-wonky text-moss">In your voice.</em>
            </h2>
          </div>

          <div className="col-span-12 grid gap-10 text-ink-soft md:col-span-7 md:grid-cols-2">
            <p className="text-lg leading-relaxed">
              We start with one promise: nothing we build should require you to
              think like an engineer. The buttons say what they do. The
              automations explain themselves. The AI sounds like you, not a
              chatbot.
            </p>
            <p className="text-lg leading-relaxed">
              Then we measure success on the only thing that matters &mdash;
              hours returned to the owner. Every audit, every install, every
              shipped project ends with a number: how much of the week did we
              just buy back.
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto max-w-[1400px]" />

      {/* SKILLS TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              Skills library
            </div>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Short films,
              <br />
              <em className="font-display-wonky text-clay">real workflows.</em>
            </h2>
            <p className="mt-6 max-w-md text-ink-soft leading-relaxed">
              We document each skill we install with a one-minute video so you
              can see exactly what your AI operating system can do &mdash;
              before the call.
            </p>
            <Link
              href="/skills"
              className="mt-6 inline-block border-b border-ink pb-0.5 font-display italic text-lg tracking-tight hover:border-clay hover:text-clay"
            >
              Browse the library &rarr;
            </Link>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-7">
            {[
              { tag: "Inbox triage", color: "bg-clay/90" },
              { tag: "Quote drafting", color: "bg-moss/90" },
              { tag: "Lead follow-up", color: "bg-ochre/90" },
              { tag: "Weekly summary", color: "bg-ink/90" },
            ].map((tile) => (
              <div
                key={tile.tag}
                className={`flex aspect-video items-end ${tile.color} p-4 text-canvas`}
              >
                <span className="font-display text-xl">{tile.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule mx-auto max-w-[1400px]" />

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              Coda
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-display text-3xl leading-[1.15] tracking-tight text-ink md:text-5xl">
              If any of this sounds like the conversation you&rsquo;ve been
              meaning to have, the next move is{" "}
              <Link
                href="/contact"
                className="text-clay underline decoration-clay/40 decoration-2 underline-offset-[6px] hover:decoration-clay"
              >
                a thirty&#8209;minute call
              </Link>
              . No deck, no pitch. We listen, you talk, we tell you whether
              we&rsquo;re the studio for it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
