import { VideoCard } from "@/components/video-card";
import { FindMyVoice } from "@/remotion/compositions/FindMyVoice";
import { GoodMorning } from "@/remotion/compositions/GoodMorning";
import { EmailTriage } from "@/remotion/compositions/EmailTriage";
import { ReportConsolidation } from "@/remotion/compositions/ReportConsolidation";
import { ReviewManager } from "@/remotion/compositions/ReviewManager";
import { PricingDigest } from "@/remotion/compositions/PricingDigest";

const skills = [
  {
    title: "Find My Voice",
    caption:
      "Reads your sent emails, maps your tone and signature phrases, then writes every future response the way you actually talk.",
    composition: FindMyVoice,
    durationInFrames: 512,
    fps: 20,
  },
  {
    title: "Good Morning Briefing",
    caption:
      "One button at 8am. Flagged emails, today's calendar, and a financial snapshot — ready before your first coffee.",
    composition: GoodMorning,
    durationInFrames: 345,
    fps: 20,
  },
  {
    title: "Intelligent Email Triage",
    caption:
      "AI reads every message to your generic inboxes, routes it to the right team, and escalates anything urgent before it gets buried.",
    composition: EmailTriage,
    durationInFrames: 348,
    fps: 20,
  },
  {
    title: "Automated Report Consolidation",
    caption:
      "Pulls data from your CRM, accounting software, and ad platform into one clean executive view. No spreadsheet required.",
    composition: ReportConsolidation,
    durationInFrames: 348,
    fps: 20,
  },
  {
    title: "Automated Review Manager",
    caption:
      "Scans every new review across platforms, drafts warm replies for the good ones, and pings your team the moment something needs attention.",
    composition: ReviewManager,
    durationInFrames: 348,
    fps: 20,
  },
  {
    title: "Competitor Pricing Digest",
    caption:
      "Watches competitor sites overnight, flags price drops and product changes, and delivers a plain-English briefing to your inbox each morning.",
    composition: PricingDigest,
    durationInFrames: 348,
    fps: 20,
  },
];

export default function SkillsPage() {
  return (
    <div className="relative">
      <section className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">
              <div className="mb-3 h-px w-10 bg-ink-faint" />
              The library
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h1 className="font-display text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.03em]">
              Watch the{" "}
              <em className="font-display-wonky text-moss">work</em> do itself.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Every skill we install ships with a one-minute film. No
              voice-over, no marketing fluff. See the result and how these skills deliver value. Press play on what you find interesting.
            </p>
          </div>
        </div>
      </section>

      <div className="rule mx-auto mt-20 max-w-[1400px]" />

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-10 md:grid-cols-2">
          {skills.map((skill) => (
            <VideoCard key={skill.title} {...skill} />
          ))}
        </div>

        <div className="mt-16 max-w-xl font-display italic text-ink-soft">
          More on the way. Each skill becomes a film once it ships to a client.
        </div>
      </section>
    </div>
  );
}
