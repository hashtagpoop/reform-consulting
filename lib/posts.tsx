import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  content: React.ReactNode;
};

// ── Shared prose primitives ───────────────────────────────────────────────────

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-lg leading-relaxed text-ink">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-14 text-3xl tracking-tight text-ink">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display mt-10 text-xl tracking-tight text-ink">
      {children}
    </h3>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-6 overflow-x-auto border border-hairline bg-canvas-deep px-6 py-5 text-sm leading-relaxed text-ink-soft">
      <code>{children}</code>
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 border-l-2 border-clay pl-6 text-lg italic leading-relaxed text-ink-soft">
      {children}
    </div>
  );
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export const posts: Post[] = [
  {
    slug: "claude-project-setup",
    title: "How to set up your Claude projects",
    date: "May 2026",
    readingTime: "7 min",
    excerpt:
      "Four plain-text files give Claude the context it needs to work well in any project: what it is, what it knows about you, where things stand, and what shortcuts to use.",
    content: (
      <>
        <Callout>
          Claude is only as useful as the context it has. Out of the box, every
          session starts blank. Four small files change that, and the setup
          takes under an hour.
        </Callout>

        <P>
          When you open a Claude Code project, Claude reads any{" "}
          <code className="rounded bg-canvas-deep px-1.5 py-0.5 font-mono text-sm text-clay">
            .md
          </code>{" "}
          files you&rsquo;ve placed in the right locations before it does
          anything else. That means you can hand it a briefing, in plain text,
          before the first message is ever typed.
        </P>

        <P>
          Four files cover most of what Claude needs to know. Here&rsquo;s what
          each one does and how to write it.
        </P>

        <H2>1. AGENTS.md</H2>

        <P>
          This is the project briefing. It tells Claude what kind of work it&rsquo;s
          doing, what tools and frameworks are in play, and any conventions
          that matter in this codebase or workflow.
        </P>

        <P>
          Think of it as onboarding a capable contractor who has never seen your
          setup before. They don&rsquo;t need a tutorial on React. They need to
          know you&rsquo;re on Next.js 16 with Tailwind v4, that server
          components are the default, and that you never use em dashes in copy.
          That&rsquo;s what AGENTS.md is for.
        </P>

        <Code>{`# AGENTS.md

This is a Next.js 16 project using the App Router, TypeScript, and
Tailwind CSS v4. Read node_modules/next/dist/docs/ before assuming
any API behavior — this version has breaking changes.

Conventions:
- Server components by default; use "use client" only when required
- CSS design tokens live in app/globals.css
- No shadcn — UI primitives are hand-written in components/
- Never use em dashes in any copy or comments`}</Code>

        <P>
          Keep it honest and specific. A vague instruction like "write clean
          code" does nothing. A specific one like "never mock the database in
          tests" prevents real mistakes.
        </P>

        <H2>2. MEMORY.md</H2>

        <P>
          Claude doesn&rsquo;t remember anything between sessions on its own.
          MEMORY.md is the fix for that. It&rsquo;s a short index file, always
          loaded, that points to a folder of individual context files, one per
          topic.
        </P>

        <P>
          The folder holds whatever Claude needs to carry forward: who you are,
          how you communicate, what you&rsquo;ve corrected it on before. The
          index stays brief. The detail lives in the files it links to.
        </P>

        <Code>{`# MEMORY.md

- [User role](memory/user_role.md) — who I am, working style, business context
- [Voice](memory/voice.md) — tone, word choices, things to avoid
- [Feedback](memory/feedback.md) — corrections and preferences from past sessions`}</Code>

        <P>
          Each linked file uses a simple frontmatter format so Claude knows what
          type of memory it&rsquo;s reading:
        </P>

        <Code>{`---
name: voice
description: Preferred tone and email conventions
metadata:
  type: user
---

Write directly and warmly. Short sentences. No bullet points in
client emails. Never use "leverage," "circle back," or "touch base."

Sign-offs: "Best," for new clients. "Talk soon," for ongoing.`}</Code>

        <P>
          The MEMORY.md index has a line limit before Claude stops reading it.
          Keep entries to one line each. If a memory no longer applies, remove
          it rather than leaving stale context in the folder.
        </P>

        <H2>3. CONTEXT.md</H2>

        <P>
          Where MEMORY.md holds what&rsquo;s stable, CONTEXT.md holds what&rsquo;s
          true right now. Active projects, open decisions, current sprint work,
          anything that changes week to week.
        </P>

        <P>
          This is the file you update most often. Think of it as the whiteboard
          in your office: accurate because you wrote on it this week, not because
          it&rsquo;s preserved from six months ago.
        </P>

        <Code>{`# CONTEXT.md

## Active work
- Redesigning the client onboarding flow. Wireframes approved, building now.
- Proposal for Holloway Group due Friday. Not confirmed — don't reference as won.

## Open decisions
- Whether to use Resend or Postmark for transactional email. Leaning Resend.

## Recently resolved
- Switched from Pages Router to App Router in March. All routes migrated.`}</Code>

        <P>
          Without a CONTEXT.md, Claude has no idea what&rsquo;s active. It will
          ask, or worse, assume. A two-minute update at the start of each week
          prevents most of those detours.
        </P>

        <H2>4. SKILLS.md</H2>

        <P>
          Skills are reusable prompts: named workflows you can invoke with a
          slash command rather than retyping the same instructions every session.
          Claude Code supports custom skills, and SKILLS.md is where you define
          what yours do.
        </P>

        <P>
          A skill entry describes what the workflow is, when to use it, and any
          specific steps Claude should follow. The name becomes the command.
        </P>

        <Code>{`# SKILLS.md

## /draft-proposal
Write a project proposal for a new client.
- Lead with the outcome the client gets, not the process
- Include three sections: situation, approach, investment
- Match the voice from memory/voice.md
- End with a clear next step, not a soft close

## /weekly-review
Summarise what shipped, what's in progress, and what's blocked.
- Pull from CONTEXT.md for current work
- Format as a short paragraph, not a list
- Flag anything that needs a decision`}</Code>

        <P>
          Skills compound. The first time you define a /draft-proposal skill,
          you write it once and get consistent output from then on. Over a few
          months, a good SKILLS.md becomes one of the more valuable files in the
          project.
        </P>

        <H2>The full picture</H2>

        <P>
          Together, the four files answer the four questions Claude needs before
          it can work well:
        </P>

        <Code>{`.
├── AGENTS.md      ← what kind of project is this?
├── MEMORY.md      ← who is the person I'm working with?
├── CONTEXT.md     ← what's happening right now?
├── SKILLS.md      ← what workflows should I know?
└── memory/
    ├── user_role.md
    ├── voice.md
    └── feedback.md`}</Code>

        <P>
          None of these files need to be long. A hundred words each, written
          plainly, beats a polished document nobody keeps current. The goal is
          accuracy, not completeness.
        </P>

        <P>
          Set them up once, keep them honest, and Claude stops feeling like
          something you have to re-brief. It starts feeling like something that
          already knows the project.
        </P>

        <P>
          If you want this wired up as part of a broader AI workflow for your
          business, the{" "}
          <Link
            href="/services#operating-system"
            className="border-b border-clay/50 text-clay hover:border-clay"
          >
            AI Operating System
          </Link>{" "}
          engagement covers exactly that.
        </P>
      </>
    ),
  },
];
