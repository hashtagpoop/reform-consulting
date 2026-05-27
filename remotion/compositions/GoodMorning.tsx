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

// ── Scene 1 · Button ──────────────────────────────────────────────────────────
// Content done ~50. Short hold 50-65, fade 65-75.

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 12, 50, 65, 75], [0, 1, 1, 1, 0]);
  const btnScale = fi(frame, [28, 33, 42], [1, 0.92, 1]);
  const rippleSize = fi(frame, [33, 54], [20, 280]);
  const rippleOpacity = fi(frame, [33, 54], [0.5, 0]);
  const showRipple = frame >= 33 && frame <= 54;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.ochre, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting
      </div>
      <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 28 }}>
        Skill · Morning Briefing
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {showRipple && (
          <div style={{ position: "absolute", width: rippleSize, height: rippleSize, borderRadius: "50%", border: `1.5px solid ${C.ochre}`, opacity: rippleOpacity }} />
        )}
        <div style={{ backgroundColor: C.ochre, color: C.ink, padding: "18px 52px", fontSize: 18, letterSpacing: 0.4, fontFamily: "Georgia, serif", transform: `scale(${btnScale})` }}>
          Good Morning Briefing
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Agents Processing ───────────────────────────────────────────────
// Agents done at ~175. Hold 175-210, fade 210-220.

const AGENTS = [
  {
    label: "Email Scanner",
    color: C.clay,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="7" width="26" height="19" rx="2" stroke={c} strokeWidth="1.8" />
        <polyline points="3,7 16,17 29,7" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    label: "Calendar Briefing",
    color: C.moss,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="5" width="26" height="23" rx="2" stroke={c} strokeWidth="1.8" />
        <line x1="3" y1="12" x2="29" y2="12" stroke={c} strokeWidth="1.8" />
        <line x1="10" y1="2" x2="10" y2="8" stroke={c} strokeWidth="2" />
        <line x1="22" y1="2" x2="22" y2="8" stroke={c} strokeWidth="2" />
        <rect x="8" y="17" width="4" height="4" fill={c} />
        <rect x="14" y="17" width="4" height="4" fill={c} />
        <rect x="20" y="17" width="4" height="4" fill={c} />
      </svg>
    ),
  },
  {
    label: "Financial Analyst",
    color: C.ochre,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="19" width="5" height="9" fill={c} />
        <rect x="11" y="13" width="5" height="15" fill={c} />
        <rect x="18" y="7" width="5" height="21" fill={c} />
        <line x1="2" y1="28" x2="28" y2="28" stroke={c} strokeWidth="1.5" />
      </svg>
    ),
  },
];

function AgentsScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [65, 80, 210, 220], [0, 1, 1, 0]);
  const overallProgress = fi(frame, [80, 175], [0, 1], easeInOut);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 52 }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.ochre, fontFamily: "Georgia, serif" }}>
        Preparing your briefing
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {AGENTS.map((agent, i) => {
          const agentIn = fi(frame, [82 + i * 14, 98 + i * 14], [0, 1], easeOut);
          const progress = fi(frame, [85 + i * 12, 155 + i * 8], [0, 1], easeInOut);
          const done = progress >= 1;
          const ic = done ? agent.color : C.inkFaint;
          return (
            <div key={agent.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: agentIn }}>
              <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress progress={progress} color={agent.color} size={80} />
                {done ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 11l4 4 8-8" stroke={agent.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : agent.icon(ic)}
              </div>
              <div style={{ fontSize: 12, color: done ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 0.2, textAlign: "center" }}>
                {agent.label}
              </div>
              <div style={{ fontSize: 10, color: agent.color, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>
                {done ? "Complete" : progress > 0.5 ? "Processing" : "Working"}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ width: 440 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 1, marginBottom: 8 }}>
          <span>Overall</span>
          <span>{Math.round(overallProgress * 100)}%</span>
        </div>
        <div style={{ height: 2, backgroundColor: "#3A342D", borderRadius: 1 }}>
          <div style={{ width: `${overallProgress * 100}%`, height: "100%", backgroundColor: C.moss, borderRadius: 1 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 3 · Morning Report ──────────────────────────────────────────────────
// Report elements done at ~266. Hold 266-330 (64f = 3.2s), fade 330-345.

const EMAIL_FLAGS = [
  { from: "David Chen", text: "Contract renewal needs signature by Friday", urgent: true },
  { from: "Maria Santos", text: "Q2 review rescheduled to Thursday at 2pm", urgent: false },
  { from: "bank@notices.com", text: "June statement now available", urgent: false },
];

const SCHEDULE = [
  { time: "9:00 AM", title: "Team standup", note: "No prep needed" },
  { time: "11:30 AM", title: "Client call, Apex Industries", note: "Review proposal first" },
  { time: "3:00 PM", title: "Focus block", note: "Henderson report" },
];

const FINANCES = [
  { label: "Budget used (May)", value: "68%", note: "+3% vs April" },
  { label: "Outstanding invoices", value: "$12,400", note: "2 overdue" },
  { label: "Runway", value: "8.2 mo", note: "On track" },
];

function ReportScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [210, 225, 330, 345], [0, 1, 1, 0]);
  const headerIn = fi(frame, [228, 238], [0, 1], easeOut);
  const col1In = fi(frame, [238, 250], [0, 1], easeOut);
  const col2In = fi(frame, [246, 258], [0, 1], easeOut);
  const col3In = fi(frame, [254, 266], [0, 1], easeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvas, opacity, display: "flex", flexDirection: "column", padding: "44px 60px" }}>
      <div style={{ opacity: headerIn, marginBottom: 22 }}>
        <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 6 }}>
          Reform Consulting · Morning Intelligence Brief
        </div>
        <div style={{ fontSize: 24, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.ink, letterSpacing: -0.5 }}>
          Good morning. Here is what needs your attention today.
        </div>
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 22 }} />
      <div style={{ display: "flex", gap: 28, flex: 1 }}>
        <div style={{ flex: 1, opacity: col1In }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 14 }}>Email Flags</div>
          {EMAIL_FLAGS.map((item, i) => (
            <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < EMAIL_FLAGS.length - 1 ? "1px solid #D4C9B8" : "none" }}>
              <div style={{ fontSize: 11, color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 3 }}>{item.from}</div>
              <div style={{ fontSize: 13, color: item.urgent ? C.clay : C.ink, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>{item.text}</div>
            </div>
          ))}
        </div>
        <div style={{ width: 1, backgroundColor: "#D4C9B8" }} />
        <div style={{ flex: 1, opacity: col2In }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif", marginBottom: 14 }}>Today's Schedule</div>
          {SCHEDULE.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: i < SCHEDULE.length - 1 ? "1px solid #D4C9B8" : "none" }}>
              <div style={{ fontSize: 11, color: C.inkFaint, fontFamily: "Georgia, serif", width: 58, flexShrink: 0, paddingTop: 1 }}>{item.time}</div>
              <div>
                <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif" }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.inkFaint, fontFamily: "Georgia, serif", marginTop: 2 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 1, backgroundColor: "#D4C9B8" }} />
        <div style={{ flex: 1, opacity: col3In }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.ochre, fontFamily: "Georgia, serif", marginBottom: 14 }}>Financial Snapshot</div>
          {FINANCES.map((item, i) => (
            <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < FINANCES.length - 1 ? "1px solid #D4C9B8" : "none" }}>
              <div style={{ fontSize: 11, color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 26, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -0.5 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: C.inkSoft, fontFamily: "Georgia, serif" }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const GoodMorning: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={1} duration={75} />
      <AgentsScene frame={frame} />
      <ReportScene frame={frame} />
    </AbsoluteFill>
  );
};
