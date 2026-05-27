@AGENTS.md

# Reform Consulting — Project Notes for Claude

A marketing site for Reform Consulting, a one-studio AI-implementation practice serving small businesses. Three independent service offerings, a tutorial-video skills library built with Remotion, and a Cal.com + form contact flow.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) — read `node_modules/next/dist/docs/` before assuming APIs from older versions
- **Tailwind CSS v4** with CSS-variable design tokens in `app/globals.css`
- **Motion** (Framer Motion successor) for animation when needed
- **Remotion** (`remotion`, `@remotion/cli`, `@remotion/player`) for tutorial videos
- **Cal.com embed** (`@calcom/embed-react`) + **Resend** for contact email
- No shadcn CLI — primitives are hand-written under `components/` to keep full control of the editorial aesthetic

## Design System

Warm + organic + professional. Editorial / atelier aesthetic, not SaaS.

- **Fonts**: `Fraunces` (display, variable axes incl. SOFT/WONK) + `Newsreader` (body). Loaded via `next/font/google` in `app/layout.tsx`. Use class `font-display` for headings; `font-display-wonky` for the one signature wonky headline per page.
- **Palette** (CSS vars in `app/globals.css`, available as Tailwind colors):
  - `canvas` `#F4EFE6` (parchment background)
  - `canvas-deep` `#ECE5D6`
  - `ink` `#211D17` / `ink-soft` / `ink-faint`
  - `clay` `#B8553A` (primary accent — terracotta)
  - `moss` `#5C6B4F` (secondary accent — sage)
  - `ochre` `#D4A24A` (highlight, used sparingly)
- **Texture**: subtle SVG grain overlay via `<Grain />` (fixed, ~6% opacity, multiply blend)
- **Rules**: hairline dividers using `var(--hairline)`; class `.rule` for the common 1px horizontal divider
- **Layout**: 12-column grid, asymmetric placement (eyebrow tag in the left margin, body offset right). Max width `1400px`, padded `px-6 md:px-10`.

When adding new sections or components, keep to this vocabulary. Avoid generic "SaaS card with rounded shadow" patterns — prefer hairline borders, generous whitespace, oversize numerals, and italic Fraunces emphasis.

## File Layout

```
app/
  layout.tsx           # fonts, header/footer, grain overlay
  page.tsx             # home
  services/page.tsx    # three offerings, anchor links #operating-system / #audit / #implementation
  skills/page.tsx      # Remotion video grid
  contact/
    page.tsx           # Cal embed + form
    actions.ts         # server action posting to Resend

components/
  site-header.tsx, site-footer.tsx, grain.tsx
  service-card.tsx     # used on home grid
  video-card.tsx       # wraps @remotion/player; autoPlay={false}
  cal-embed.tsx, contact-form.tsx

remotion/
  index.ts             # registerRoot entry point
  Root.tsx             # <Composition /> registry
  compositions/        # individual tutorial videos (one file each)

lib/utils.ts           # cn() helper
```

## Remotion Workflow

Tutorial videos live in `remotion/compositions/`. Each composition is a React component that uses Remotion primitives (`AbsoluteFill`, `useCurrentFrame`, `interpolate`, etc.).

### Authoring with the Remotion MCP

When the user asks for a new tutorial video, prefer driving it through the **Remotion MCP server** so the user can iterate visually. The MCP generates composition code; Claude should:

1. Place the generated component at `remotion/compositions/<SkillName>.tsx` (PascalCase filename matching the composition id).
2. Register it in `remotion/Root.tsx` by adding a `<Composition>` entry with a unique `id`, the `durationInFrames`, `fps` (default 30), and `width`/`height` (default 1280×720 for the site grid).
3. Import the component on `app/skills/page.tsx` and add an entry to the `skills` array (title, caption, composition, durationInFrames).

### Local preview & render

- Preview a composition interactively: `npm run remotion:studio`
- Render an MP4: `npm run remotion:render <CompositionId> out/<file>.mp4`
- Studio entry point is `remotion/index.ts` (configured in `remotion.config.ts`)

### Scene hold timing

After all animations in a scene have finished, hold the final frame for **2 seconds** before the scene fades out and the next one begins. At 30 fps that is 60 frames; at 20 fps it is 40 frames.

In practice: identify the frame at which the last animation in the scene settles (call it `DONE`). Set the fade-out to start at `DONE + HOLD` where `HOLD` is 60 (30 fps) or 40 (20 fps). The next scene's fade-in should begin at `DONE + HOLD` as well, so the two transitions overlap cleanly.

Example at 20 fps — scene content finishes at frame 168, hold 40 frames, fade-out starts at 208:
```ts
const opacity = fi(frame, [fadeIn, fullyVisible, 208, 218], [0, 1, 1, 0]);
```

This applies to every scene in every composition, including the final scene (hold before the video ends).

### Important — videos do NOT autoplay

The skills page uses `<Player autoPlay={false} clickToPlay controls />`. Do not change this; the user explicitly chose click-to-play. If a future page wants an autoplaying hero, use a separate component, not `VideoCard`.

## Env Vars

Copy `.env.example` to `.env.local`. Variables:

- `NEXT_PUBLIC_CAL_USERNAME` — Cal.com slug, e.g. `jane-doe/intro-call`
- `RESEND_API_KEY` — Resend key for the contact form (server-only)
- `CONTACT_TO_EMAIL` — where form submissions are emailed

If `RESEND_API_KEY` / `CONTACT_TO_EMAIL` are missing, the contact server action logs to console instead of erroring (useful for local dev).

## Local Dev

```bash
npm run dev              # Next.js dev server (Turbopack) on :3000
npm run build            # production build
npm run remotion:studio  # Remotion preview studio
```

## Conventions

- Server components by default; mark client components with `"use client"` only when needed (forms, embeds, the Remotion `<Player>`).
- Copy is written in a quiet, plainspoken, slightly editorial voice — write like a small-studio newsletter, not a SaaS landing page. Avoid words like "leverage," "empower," "supercharge," "revolutionize."
- Never use em dashes (—) in any copy, content, or comments. Use a comma, a period, or restructure the sentence.
- Headlines use Fraunces with one wonky italic per page as the visual signature. Don't sprinkle wonky everywhere — it loses meaning.
- New images / assets go in `public/`. Prefer SVG and original photography over stock illustrations.
