export function ContactForm() {
  return (
    <div className="space-y-6">
      <p className="font-body text-lg leading-relaxed text-ink-soft">
        Drop a line directly and we&rsquo;ll write back within a working day.
        Tell us the bottleneck, the curiosity, or the half-formed idea.
      </p>
      <a
        href="mailto:digitalbridgeenv@gmail.com"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-clay"
      >
        Open email client
        <span aria-hidden>&rarr;</span>
      </a>
    </div>
  );
}
