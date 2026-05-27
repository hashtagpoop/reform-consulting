import { CalEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "";

  return (
    <div className="relative">
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              Begin
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h1 className="font-display text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.03em]">
              Let&rsquo;s have a{" "}
              <em className="font-display-wonky text-clay">conversation</em>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Pick a thirty-minute slot, or send a note and we&rsquo;ll write
              back. Either way, the first call is free and the only goal is to
              decide together whether we&rsquo;re a fit.
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto mt-20 max-w-[1400px]" />

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
              On the calendar
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight">
              Book the call
            </h2>

            <div className="mt-6">
              {calLink ? (
                <CalEmbed calLink={calLink} />
              ) : (
                <div className="border border-dashed border-hairline-strong bg-canvas-deep/40 p-8">
                  <p className="font-display italic text-ink-soft">
                    The Cal.com embed will appear here once{" "}
                    <code className="font-mono text-sm not-italic text-ink">
                      NEXT_PUBLIC_CAL_USERNAME
                    </code>{" "}
                    is set in <code className="font-mono text-sm not-italic text-ink">.env.local</code>.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
              Or send a note
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight">
              Write to the studio
            </h2>

            <div className="mt-6 border-l border-hairline pl-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
