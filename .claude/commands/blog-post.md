# /blog-post

Write a new Field Notes post for Reform Consulting and add it to the site.

## Philosophy

Field Notes are practical, not theoretical. The reader is a small business owner who is curious about AI but skeptical of hype. They have limited time and no patience for jargon. Every post should leave them with one clear thing they can do or understand that they could not before.

Write like a knowledgeable friend who runs a small studio, not like a content marketer. Short sentences. Plain words. Concrete examples over abstract principles. The goal is to be useful, not to sound impressive.

## Voice rules

- No em dashes. Use a comma, a period, or restructure.
- No buzzwords: leverage, empower, supercharge, revolutionize, unlock, game-changer, seamless, robust, cutting-edge, circle back, touch base.
- No hollow openers: "In today's world...", "AI is changing everything...", "As a small business owner..."
- First person plural (we/our) when speaking as the studio. Second person (you/your) when addressing the reader.
- Contractions are fine and preferred over stiff constructions.
- One italic Fraunces emphasis per post, used at the most resonant moment, not sprinkled.

## Post structure

Every post has: a slug, title, date ("Month YYYY"), readingTime ("N min"), excerpt (1-2 sentences, plain), and content (JSX).

The content follows this rough shape:

1. **Callout** (the lede): the single sharpest thing the post argues. 1-3 sentences. This is what earns the read.
2. **Body**: 3-6 H2 sections, each with 2-4 paragraphs. Use numbered H2s when the post is a sequence of steps.
3. **Close**: a paragraph that lands the takeaway, followed (when natural) by a link to the relevant service.

## JSX components available in lib/posts.tsx

```tsx
// Opening hook — use once per post, near the top
<Callout>One sharp sentence that earns the read.</Callout>

// Body paragraph
<P>Plain prose. Short sentences. One idea per paragraph.</P>

// Section heading
<H2>Section title</H2>

// Sub-section (use sparingly)
<H3>Sub-section</H3>

// Code or file examples
<Code>{`your example here`}</Code>

// Inline code (used inside <P>)
<code className="rounded bg-canvas-deep px-1.5 py-0.5 font-mono text-sm text-clay">term</code>

// Link to another page (used inside <P>)
<Link href="/services#operating-system" className="border-b border-clay/50 text-clay hover:border-clay">
  anchor text
</Link>
```

## How to add a post

1. Open `lib/posts.tsx`.
2. Add a new object to the `posts` array. Prepend it (newest first).
3. Fill in all fields: `slug`, `title`, `date`, `readingTime`, `excerpt`, `content`.
4. `slug` must be URL-safe kebab-case and unique.
5. `readingTime` is approximate — 200 words per minute, rounded to the nearest minute.
6. `content` is a JSX fragment (`<> ... </>`).

## Checklist before finishing

- [ ] Post opens with a Callout
- [ ] No em dashes anywhere
- [ ] No banned words
- [ ] Reading time is accurate (count words, divide by 200)
- [ ] Excerpt is plain and specific, not clever
- [ ] Closes with a natural link to a service if the topic warrants it
- [ ] Slug added to `generateStaticParams` automatically (it reads from the `posts` array, no extra step needed)

## Example skeleton

```tsx
{
  slug: "your-slug-here",
  title: "Your title here",
  date: "Month YYYY",
  readingTime: "N min",
  excerpt:
    "One or two plain sentences that describe exactly what the reader will learn.",
  content: (
    <>
      <Callout>
        The sharpest version of the post's argument. If you can't write this
        sentence, the post isn't ready.
      </Callout>

      <P>Opening paragraph that earns the next one.</P>

      <H2>1. First section</H2>
      <P>...</P>

      <H2>2. Second section</H2>
      <P>...</P>

      <H2>The payoff</H2>
      <P>
        Landing paragraph. One thing the reader now knows or can do.{" "}
        <Link href="/services#..." className="border-b border-clay/50 text-clay hover:border-clay">
          If this connects to a service, say so plainly.
        </Link>
      </P>
    </>
  ),
},
```
