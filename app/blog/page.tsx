import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Field Notes — Reform Consulting",
  description:
    "Practical writing on AI for small businesses. No jargon, no hype — just what actually works.",
};

export default function BlogPage() {
  return (
    <div className="relative">
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              Field notes
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h1 className="font-display text-[clamp(44px,7vw,112px)] leading-[0.95] tracking-[-0.03em]">
              What we&rsquo;ve learned,{" "}
              <em className="font-display-wonky text-moss">written plainly.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Practical notes on AI for small businesses. No jargon, no hype —
              just what actually works, and what to do first.
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto mt-20 max-w-[1400px]" />

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="divide-y divide-hairline">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-12 gap-6 py-12 hover:no-underline"
            >
              <div className="col-span-12 md:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                  {post.date}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                  {post.readingTime} read
                </div>
              </div>

              <div className="col-span-12 md:col-span-8">
                <h2 className="font-display text-2xl leading-snug tracking-tight text-ink transition-colors group-hover:text-clay md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
              </div>

              <div className="col-span-12 flex items-start md:col-span-2 md:justify-end md:pt-1">
                <span className="font-display italic text-ink-faint transition-colors group-hover:text-clay">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
