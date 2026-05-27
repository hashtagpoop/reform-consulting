import Link from "next/link";

const offerings = [
  {
    id: "operating-system",
    number: "01",
    eyebrow: "Installation",
    title: "AI Operating System",
    accent: "text-clay",
    paragraphs: [
      "Most small businesses don't need another tool — they need one calm surface that ties the tools together. We install a private AI workspace, wired to the apps you already use (Gmail, Calendar, QuickBooks, Square, your CRM, your docs), and put a row of plain-language buttons on top.",
      "Each button does a real job: draft this week's invoices, summarise yesterday's calls, write the follow-up email, prep the morning huddle. No console, no prompt engineering, no remembering what to type — just click the skill, review the result, hit send.",
      "We hand you the keys, train you and the team, and stay on call while the new habits set.",
    ],
    deliverables: [
      "Connected workspace with your existing apps & data",
      "Custom skill buttons designed around your week",
      "Two onboarding sessions with the owner & team",
      "30 days of post-install support",
    ],
    timeline: "2–4 weeks",
    demoLink: "/assets/Demo-OS.html",
  },
  {
    id: "audit",
    number: "02",
    eyebrow: "Diagnosis",
    title: "Automation Audit",
    accent: "text-moss",
    paragraphs: [
      "Before we automate anything, we sit beside you for a day. We watch how the work actually flows — the messages, the spreadsheets, the small frustrations you've stopped noticing — and we mark every place AI or automation could quietly take a chore off the list.",
      "You leave with a written report: ranked opportunities, expected hours returned, rough implementation cost, and what to leave alone. It's a map. Use it with us, hand it to your operations person, or sit on it for six months.",
      "Half of our clients start here. The other half wish they had.",
    ],
    deliverables: [
      "Half-day shadow session (in-person or remote)",
      "Workflow map of the business as it runs today",
      "Ranked list of automation & AI opportunities",
      "Written report with cost, effort, and time-saved estimates",
    ],
    timeline: "1 week",
  },
  {
    id: "implementation",
    number: "03",
    eyebrow: "Build",
    title: "Project Implementation",
    accent: "text-ochre",
    paragraphs: [
      "You already know the knot you want untied. The inbox that no one has time for. The proposals that take three hours each. The reconciliation that eats every Friday. Bring it to us and we'll ship the fix.",
      "We scope the project in a single conversation, agree on what success looks like (usually measured in hours or in errors avoided), and build. You see progress weekly. We don't bill for surprises.",
      "If we don't think we can solve it, we'll tell you on the first call.",
    ],
    deliverables: [
      "Single-page scope agreed before any code is written",
      "Weekly demos until the problem is gone",
      "Fixed-price quote — no hourly surprises",
      "Handoff documentation written for a human, not a developer",
    ],
    timeline: "Project-dependent",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative">
      {/* Page header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              The work
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h1 className="font-display text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.03em]">
              Three offerings.{" "}
              <em className="font-display-wonky text-clay">Pick one.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
              They&rsquo;re sequenced here for readability, but each stands on
              its own. Many clients begin with the audit, some commission a
              project first, others go straight to the operating system. Read
              what fits the moment you&rsquo;re in.
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto mt-24 max-w-[1400px]" />

      {/* Offerings */}
      {offerings.map((o, i) => (
        <section
          key={o.id}
          id={o.id}
          className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
                {o.eyebrow}
              </div>
              <div
                className={`mt-2 font-display text-[120px] leading-none tracking-tight md:text-[180px] ${o.accent}`}
              >
                {o.number}
              </div>
            </div>

            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
                {o.title}
              </h2>

              <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
                <div className="space-y-6">
                  {o.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-lg leading-relaxed text-ink-soft"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="border-l border-hairline pl-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                    What you get
                  </div>
                  <ul className="mt-4 space-y-3 text-ink">
                    {o.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-[15px] leading-snug"
                      >
                        <span
                          aria-hidden
                          className={`mt-2 inline-block h-1 w-3 flex-shrink-0 ${o.accent.replace("text-", "bg-")}`}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                    Timeline
                  </div>
                  <div className="mt-2 font-display italic text-2xl">
                    {o.timeline}
                  </div>

                  {o.demoLink && (
                    <a
                      href={o.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 border border-hairline px-5 py-3 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-clay hover:text-clay"
                    >
                      See a working example
                      <span aria-hidden>&#8599;</span>
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-clay${o.demoLink ? " mt-3" : " mt-8"}`}
                  >
                    Discuss this offering
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {i < offerings.length - 1 && (
            <div className="rule mt-24" />
          )}
        </section>
      ))}
    </div>
  );
}
