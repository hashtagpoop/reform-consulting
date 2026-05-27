import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Reform Consulting`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="relative">
      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              <Link
                href="/blog"
                className="hover:text-clay transition-colors"
              >
                Field notes
              </Link>
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {post.date}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {post.readingTime} read
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-[clamp(36px,5.5vw,80px)] leading-[1.0] tracking-[-0.025em] text-ink">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto mt-16 max-w-[1400px]" />

      {/* Body */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <div className="prose-reform">{post.content}</div>
          </div>
        </div>
      </section>

      <div className="rule mx-auto max-w-[1400px]" />

      {/* Footer nav */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="font-display italic text-lg text-ink-soft hover:text-clay transition-colors"
          >
            &larr; All field notes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.18em] text-canvas transition-colors hover:bg-clay"
          >
            Work with us
          </Link>
        </div>
      </section>
    </div>
  );
}
