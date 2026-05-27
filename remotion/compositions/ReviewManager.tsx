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

function Star({ filled, color, size = 12 }: { filled: boolean; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12">
      <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9 3,11 3.5,7.5 1,5 4.5,4.5" fill={filled ? color : "none"} stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

// ── Scene 1 · Button + Bell ───────────────────────────────────────────────────

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 12, 50, 65, 75], [0, 1, 1, 1, 0]);
  const btnScale = fi(frame, [28, 33, 42], [1, 0.92, 1]);
  const bellPulse = Math.sin((frame / 4) * Math.PI) * 0.08 + 1;
  const bellOpacity = fi(frame, [14, 24], [0, 1]);
  const rippleSize = fi(frame, [33, 54], [20, 260]);
  const rippleOpacity = fi(frame, [33, 54], [0.5, 0]);
  const showRipple = frame >= 33 && frame <= 54;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: bellOpacity, marginBottom: 32, transform: `scale(${bellPulse})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <path d="M16 3C11 3 7 7 7 13V20L4 23H28L25 20V13C25 7 21 3 16 3Z" stroke={C.ochre} strokeWidth="1.8" fill="none" />
          <path d="M13 23C13 24.7 14.3 26 16 26C17.7 26 19 24.7 19 23" stroke={C.ochre} strokeWidth="1.8" fill="none" />
          <circle cx="16" cy="3" r="1.5" fill={C.ochre} />
        </svg>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting
      </div>
      <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 28 }}>
        Skill · Review Manager
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {showRipple && (
          <div style={{ position: "absolute", width: rippleSize, height: rippleSize, borderRadius: "50%", border: `1.5px solid ${C.clay}`, opacity: rippleOpacity }} />
        )}
        <div style={{ backgroundColor: C.clay, color: C.canvas, padding: "18px 52px", fontSize: 18, letterSpacing: 0.4, fontFamily: "Georgia, serif", transform: `scale(${btnScale})` }}>
          Initialize Review Monitor
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Platform Scanning ───────────────────────────────────────────────

const PLATFORMS = [
  {
    label: "Google Reviews",
    color: C.clay,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <polygon points="16,3 19.5,12 29,12.5 22,19 24.5,29 16,24 7.5,29 10,19 3,12.5 12.5,12" stroke={c} strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: "Yelp",
    color: C.ochre,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <polygon points="16,3 19.5,12 29,12.5 22,19 24.5,29 16,24 7.5,29 10,19 3,12.5 12.5,12" stroke={c} strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="3" fill={c} />
      </svg>
    ),
  },
  {
    label: "Trustpilot",
    color: C.moss,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <polygon points="16,3 19.5,12 29,12.5 22,19 24.5,29 16,24 7.5,29 10,19 3,12.5 12.5,12" stroke={c} strokeWidth="1.5" fill={c} opacity="0.3" />
        <path d="M5 11l4 4 8-8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(6,7)" />
      </svg>
    ),
  },
];

const SCAN_TEXTS = ["Scanning new mentions...", "Running sentiment analysis...", "Drafting responses..."];

function ScanScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [65, 80, 178, 188], [0, 1, 1, 0]);
  const overallProgress = fi(frame, [80, 165], [0, 1], easeInOut);
  const textIndex = Math.min(2, Math.floor(Math.max(0, frame - 80) / 25));
  const statusText = frame >= 80 && frame < 168 ? SCAN_TEXTS[textIndex] : "Complete";

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif" }}>
        Monitoring all platforms
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {PLATFORMS.map((p, i) => {
          const agentIn = fi(frame, [82 + i * 14, 98 + i * 14], [0, 1], easeOut);
          const progress = fi(frame, [85 + i * 12, 152 + i * 8], [0, 1], easeInOut);
          const done = progress >= 1;
          const ic = done ? p.color : C.inkFaint;
          return (
            <div key={p.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: agentIn }}>
              <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress progress={progress} color={p.color} size={80} />
                {done ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 11l4 4 8-8" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : p.icon(ic)}
              </div>
              <div style={{ fontSize: 12, color: done ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", textAlign: "center", letterSpacing: 0.2 }}>{p.label}</div>
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

// ── Scene 3 · Action Split ────────────────────────────────────────────────────

const REPLY_BODY = "Thank you so much for the kind words! We are glad you had a great experience and look forward to seeing you again soon.";

function ActionScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [178, 193, 233, 243], [0, 1, 1, 0]);
  const leftIn = fi(frame, [196, 210], [0, 1], easeOut);
  const rightIn = fi(frame, [204, 218], [0, 1], easeOut);
  const replyReveal = fi(frame, [208, 228], [0, 1], easeOut);
  const visibleChars = Math.floor(REPLY_BODY.length * replyReveal);
  const alertIn = fi(frame, [210, 222], [0, 1], easeOut);
  const alertScale = fi(frame, [210, 220], [0.8, 1], easeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvasDeep, opacity, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {/* Left: 5-star review + AI response */}
      <div style={{ flex: 1, padding: "40px 36px", opacity: leftIn, borderRight: "1px solid #D4C9B8", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif", marginBottom: 14 }}>5-star review</div>
        <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
          {[0,1,2,3,4].map(i => <Star key={i} filled color={C.ochre} size={14} />)}
        </div>
        <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif", lineHeight: 1.6, marginBottom: 20, fontStyle: "italic" }}>
          "Best service we have had in years. The team was responsive, professional, and went above and beyond."
        </div>
        <div style={{ border: `1px solid ${C.moss}`, padding: "14px 16px", backgroundColor: "#F0F5F1" }}>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif", marginBottom: 8 }}>AI drafting response</div>
          <div style={{ fontSize: 12, color: C.inkSoft, fontFamily: "Georgia, serif", lineHeight: 1.6 }}>
            {REPLY_BODY.slice(0, visibleChars)}
            {replyReveal < 1 && <span style={{ display: "inline-block", width: 1.5, height: "1em", backgroundColor: C.moss, verticalAlign: "text-bottom", marginLeft: 1 }} />}
          </div>
        </div>
      </div>

      {/* Right: 1-star escalation */}
      <div style={{ flex: 1, padding: "40px 36px", opacity: rightIn, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 14 }}>1-star review</div>
        <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
          {[0,1,2,3,4].map(i => <Star key={i} filled={i === 0} color={C.clay} size={14} />)}
        </div>
        <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif", lineHeight: 1.6, marginBottom: 20, fontStyle: "italic" }}>
          "Waited 45 minutes and nobody helped us. Really disappointing experience."
        </div>
        <div style={{ opacity: alertIn, transform: `scale(${alertScale})`, border: `1.5px solid ${C.clay}`, padding: "14px 16px", backgroundColor: "#FDF0EC" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L29 26L3 26Z" stroke={C.clay} strokeWidth="2" fill="none" strokeLinejoin="round" />
              <line x1="16" y1="13" x2="16" y2="20" stroke={C.clay} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="16" cy="23" r="1.5" fill={C.clay} />
            </svg>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif" }}>Escalated to Manager</span>
          </div>
          <div style={{ fontSize: 11, color: C.inkSoft, fontFamily: "Georgia, serif" }}>Notified via Slack · Response needed within 2h</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 4 · Reputation Dashboard ───────────────────────────────────────────
// Content done ~278. Hold 278-338 (60f = 3s), fade 338-348.

function DashboardScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [233, 248, 338, 348], [0, 1, 1, 0]);
  const m1In = fi(frame, [252, 262], [0, 1], easeOut);
  const m2In = fi(frame, [260, 270], [0, 1], easeOut);
  const m3In = fi(frame, [268, 278], [0, 1], easeOut);

  const metrics = [
    { label: "Reviews scanned", value: "100%", note: "All platforms covered", color: C.clay },
    { label: "Average sentiment", value: "4.2", note: "Positive trend", color: C.ochre },
    { label: "AI response rate", value: "95%", note: "5% escalated to team", color: C.moss },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvas, opacity, display: "flex", flexDirection: "column", padding: "56px 80px" }}>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 8 }}>
        Reform Consulting · Reputation Dashboard
      </div>
      <div style={{ fontSize: 26, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.ink, letterSpacing: -0.5, marginBottom: 36 }}>
        Your brand's voice is covered.
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 40 }} />
      <div style={{ display: "flex", gap: 0 }}>
        {metrics.map((m, i) => (
          <div key={m.label} style={{ flex: 1, paddingRight: 40, opacity: [m1In, m2In, m3In][i] }}>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: m.color, fontFamily: "Georgia, serif", marginBottom: 12 }}>{m.label}</div>
            <div style={{ fontSize: 64, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -3, lineHeight: 1, marginBottom: 8 }}>{m.value}</div>
            <div style={{ fontSize: 12, color: C.inkSoft, fontFamily: "Georgia, serif" }}>{m.note}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const ReviewManager: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={4} duration={75} />
      <ScanScene frame={frame} />
      <ActionScene frame={frame} />
      <DashboardScene frame={frame} />
    </AbsoluteFill>
  );
};
