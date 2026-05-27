"use client";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { OsIntro } from "./OsIntro";

const C = {
  canvas: "#F4EFE6",
  canvasDeep: "#ECE5D6",
  ink: "#211D17",
  inkSoft: "#5C5347",
  inkFaint: "#9A9085",
  clay: "#B8553A",
  moss: "#5C6B4F",
  ochre: "#D4A24A",
};

const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.inOut(Easing.cubic);
const easeSpring = Easing.out(Easing.elastic(1.2));

function fi(frame: number, input: number[], output: number[], easing?: (t: number) => number) {
  return interpolate(frame, input, output, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
}

function CircularProgress({ progress, color, size = 80 }: { progress: number; color: string; size?: number }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", top: 0, left: 0 }}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#3A342D" strokeWidth="2.5" />
      <circle
        cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - Math.min(1, progress))}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </svg>
  );
}

// ── Scene 1 · Toggle Switch ───────────────────────────────────────────────────

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 12, 50, 65, 75], [0, 1, 1, 1, 0]);
  const toggleOn = frame >= 30;
  const thumbX = fi(frame, [26, 35], [2, 22]);
  const trackColor = toggleOn ? C.clay : "#3A342D";
  const networkIn = fi(frame, [14, 28], [0, 1], easeOut);
  const nodePulse = Math.sin((frame / 5) * Math.PI) * 0.15 + 1;

  const nodes = [[120, 40], [60, 90], [180, 90], [30, 140], [120, 140], [210, 140]];

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: networkIn, position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)" }}>
        <svg width="240" height="160" viewBox="0 0 240 160">
          {nodes.map(([x, y], i) =>
            nodes.slice(i + 1).map(([x2, y2], j) =>
              Math.abs(x - x2) < 120 && Math.abs(y - y2) < 80 ? (
                <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#3A342D" strokeWidth="0.8" opacity="0.6" />
              ) : null
            )
          )}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 5 * nodePulse : 3} fill={i === 2 ? C.clay : C.inkFaint} opacity={i === 2 ? 0.9 : 0.5} />
          ))}
        </svg>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting
      </div>
      <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 36 }}>
        Skill · Competitor Intelligence
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="48" height="28" viewBox="0 0 48 28">
          <rect x="0" y="0" width="48" height="28" rx="14" fill={trackColor} />
          <circle cx={thumbX + 12} cy="14" r="10" fill={C.canvas} />
        </svg>
        <span style={{ fontSize: 16, color: toggleOn ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 0.3 }}>
          Initialize Market Intelligence
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Source Scraping ─────────────────────────────────────────────────

const SOURCES = [
  {
    label: "Competitor Sites",
    color: C.clay,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M3,23 L7,23 L11,19 L24,19 L28,9 L9,9" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="13" cy="25" r="2.5" stroke={c} strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="25" r="2.5" stroke={c} strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: "Pricing Pages",
    color: C.moss,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M4,4 L22,4 L28,16 L22,28 L4,28 Z" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="9" cy="14" r="2.5" stroke={c} strokeWidth="1.5" fill="none" />
        <line x1="14" y1="10" x2="22" y2="10" stroke={c} strokeWidth="1.4" />
        <line x1="14" y1="14" x2="22" y2="14" stroke={c} strokeWidth="1.4" />
        <line x1="14" y1="18" x2="19" y2="18" stroke={c} strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Industry News",
    color: C.ochre,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="26" rx="1" stroke={c} strokeWidth="1.8" fill="none" />
        <rect x="8" y="8" width="10" height="7" stroke={c} strokeWidth="1.2" fill="none" />
        <line x1="20" y1="8" x2="24" y2="8" stroke={c} strokeWidth="1.4" />
        <line x1="20" y1="12" x2="24" y2="12" stroke={c} strokeWidth="1.4" />
        <line x1="8" y1="18" x2="24" y2="18" stroke={c} strokeWidth="1.4" />
        <line x1="8" y1="22" x2="24" y2="22" stroke={c} strokeWidth="1.4" />
        <line x1="8" y1="26" x2="18" y2="26" stroke={c} strokeWidth="1.4" />
      </svg>
    ),
  },
];

const SCAN_TEXTS = ["Scraping daily catalogs...", "Running price anomaly detection...", "Summarising announcements..."];

function ScrapeScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [65, 80, 178, 188], [0, 1, 1, 0]);
  const overallProgress = fi(frame, [80, 165], [0, 1], easeInOut);
  const textIndex = Math.min(2, Math.floor(Math.max(0, frame - 80) / 25));
  const statusText = frame >= 80 && frame < 168 ? SCAN_TEXTS[textIndex] : "Complete";

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif" }}>
        Monitoring market intelligence
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {SOURCES.map((src, i) => {
          const agentIn = fi(frame, [82 + i * 14, 98 + i * 14], [0, 1], easeOut);
          const progress = fi(frame, [85 + i * 12, 152 + i * 8], [0, 1], easeInOut);
          const done = progress >= 1;
          const ic = done ? src.color : C.inkFaint;
          return (
            <div key={src.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: agentIn }}>
              <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress progress={progress} color={src.color} size={80} />
                {done ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 11l4 4 8-8" stroke={src.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : src.icon(ic)}
              </div>
              <div style={{ fontSize: 12, color: done ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", textAlign: "center", letterSpacing: 0.2 }}>{src.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: 440 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 1, marginBottom: 8 }}>
          <span>{statusText}</span>
          <span>{Math.round(overallProgress * 100)}%</span>
        </div>
        <div style={{ height: 2, backgroundColor: "#3A342D", borderRadius: 1 }}>
          <div style={{ width: `${overallProgress * 100}%`, height: "100%", backgroundColor: C.clay, borderRadius: 1 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 3 · Findings Split Screen ──────────────────────────────────────────

function FindingsScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [178, 193, 233, 243], [0, 1, 1, 0]);
  const leftIn = fi(frame, [196, 210], [0, 1], easeOut);
  const rightIn = fi(frame, [204, 218], [0, 1], easeOut);
  const strikeWidth = fi(frame, [206, 220], [0, 1], easeOut);
  const newPriceIn = fi(frame, [214, 224], [0, 1], easeOut);
  const newPriceScale = fi(frame, [214, 224], [0.7, 1], easeSpring);

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvasDeep, opacity, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {/* Left: price drop */}
      <div style={{ flex: 1, padding: "40px 36px", opacity: leftIn, borderRight: "1px solid #D4C9B8", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 18 }}>Price drop detected</div>
        <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif", marginBottom: 20 }}>Rival Co. — Pro Plan</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 32, color: C.inkFaint, fontFamily: "Georgia, serif" }}>$149</span>
            <svg style={{ position: "absolute", top: "50%", left: 0, overflow: "visible" }} width="70" height="3">
              <line x1="0" y1="1.5" x2={strikeWidth * 70} y2="1.5" stroke={C.clay} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ opacity: newPriceIn, transform: `scale(${newPriceScale})`, transformOrigin: "left center" }}>
            <span style={{ fontSize: 40, color: C.clay, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -1 }}>$99</span>
          </div>
        </div>
        <div style={{ opacity: newPriceIn, fontSize: 11, color: C.clay, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>
          33% reduction vs previous price
        </div>
      </div>

      {/* Right: news summary */}
      <div style={{ flex: 1, padding: "40px 36px", opacity: rightIn, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.ochre, fontFamily: "Georgia, serif", marginBottom: 18 }}>Product announcement</div>
        <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif", marginBottom: 16 }}>Rival Co. · New Feature Rollout</div>
        <div style={{ border: "1px solid #D4C9B8", padding: "16px 18px", backgroundColor: C.canvas }}>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: C.ochre, fontFamily: "Georgia, serif", marginBottom: 10 }}>AI summary</div>
          {["New AI assistant launched for Enterprise tier", "Mobile app redesign shipping next quarter", "API access added to all paid plans"].map((bullet, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, color: C.inkSoft, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>
              <span style={{ color: C.ochre, flexShrink: 0 }}>·</span>
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 4 · Daily Intelligence Dashboard ────────────────────────────────────
// Content done ~278. Hold 278-338 (60f = 3s), fade 338-348.

function DashboardScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [233, 248, 338, 348], [0, 1, 1, 0]);
  const m1In = fi(frame, [252, 262], [0, 1], easeOut);
  const m2In = fi(frame, [259, 269], [0, 1], easeOut);
  const m3In = fi(frame, [266, 276], [0, 1], easeOut);
  const btnIn = fi(frame, [273, 283], [0, 1], easeOut);

  const metrics = [
    { label: "Competitors monitored", value: "3", note: "Daily scrape complete", color: C.clay },
    { label: "Price adjustments found", value: "4", note: "1 significant drop flagged", color: C.moss },
    { label: "Product launches flagged", value: "1", note: "Major rollout announced", color: C.ochre },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvas, opacity, display: "flex", flexDirection: "column", padding: "56px 80px" }}>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 8 }}>
        Reform Consulting · Daily Intelligence Digest
      </div>
      <div style={{ fontSize: 26, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.ink, letterSpacing: -0.5, marginBottom: 32 }}>
        The market moved while you slept.
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 36 }} />
      <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
        {metrics.map((m, i) => (
          <div key={m.label} style={{ flex: 1, paddingRight: 40, opacity: [m1In, m2In, m3In][i] }}>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: m.color, fontFamily: "Georgia, serif", marginBottom: 10 }}>{m.label}</div>
            <div style={{ fontSize: 56, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -2, lineHeight: 1, marginBottom: 6 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: C.inkSoft, fontFamily: "Georgia, serif" }}>{m.note}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 28 }} />
      <div style={{ opacity: btnIn, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ border: `1px solid ${C.clay}`, padding: "10px 28px", fontSize: 12, color: C.clay, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>
          Export to Slack / Inbox
        </div>
        <div style={{ fontSize: 11, color: C.inkFaint, fontFamily: "Georgia, serif" }}>Delivered automatically at 7am</div>
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const PricingDigest: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={5} duration={75} />
      <ScrapeScene frame={frame} />
      <FindingsScene frame={frame} />
      <DashboardScene frame={frame} />
    </AbsoluteFill>
  );
};
