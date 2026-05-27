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

function donutArc(cx: number, cy: number, r: number, ri: number, s0: number, s1: number) {
  const a0 = s0 * 2 * Math.PI - Math.PI / 2;
  const a1 = s1 * 2 * Math.PI - Math.PI / 2;
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0);
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
  const ix1 = cx + ri * Math.cos(a1), iy1 = cy + ri * Math.sin(a1);
  const ix2 = cx + ri * Math.cos(a0), iy2 = cy + ri * Math.sin(a0);
  const large = s1 - s0 > 0.5 ? 1 : 0;
  return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix1},${iy1} A${ri},${ri} 0 ${large} 0 ${ix2},${iy2} Z`;
}

// ── Scene 1 · Button ──────────────────────────────────────────────────────────

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 12, 50, 65, 75], [0, 1, 1, 1, 0]);
  const btnScale = fi(frame, [28, 33, 42], [1, 0.92, 1]);
  const inboxIn = fi(frame, [12, 22], [0, 1], easeOut);
  const rippleSize = fi(frame, [33, 54], [20, 260]);
  const rippleOpacity = fi(frame, [33, 54], [0.5, 0]);
  const showRipple = frame >= 33 && frame <= 54;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: inboxIn, display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="7" width="26" height="19" rx="2" stroke={C.inkFaint} strokeWidth="1.8" />
          <polyline points="3,7 16,17 29,7" stroke={C.inkFaint} strokeWidth="1.8" fill="none" />
        </svg>
        <span style={{ fontSize: 12, color: C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 0.3 }}>info@company.com</span>
        <span style={{ fontSize: 11, color: C.canvas, backgroundColor: C.clay, padding: "2px 8px", fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>47 unread</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting
      </div>
      <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 28 }}>
        Skill · Intelligent Email Triage
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {showRipple && (
          <div style={{ position: "absolute", width: rippleSize, height: rippleSize, borderRadius: "50%", border: `1.5px solid ${C.clay}`, opacity: rippleOpacity }} />
        )}
        <div style={{ backgroundColor: C.clay, color: C.canvas, padding: "18px 52px", fontSize: 18, letterSpacing: 0.4, fontFamily: "Georgia, serif", transform: `scale(${btnScale})` }}>
          Activate AI Triage
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Three-Channel Processing ───────────────────────────────────────

const DEPTS = [
  {
    label: "Customer Support",
    color: C.moss,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M6 18C6 12 10 5 16 5C22 5 26 12 26 18" stroke={c} strokeWidth="1.8" fill="none" />
        <rect x="3" y="17" width="5" height="8" rx="2" stroke={c} strokeWidth="1.8" fill="none" />
        <rect x="24" y="17" width="5" height="8" rx="2" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    label: "Sales & Leads",
    color: C.clay,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <polyline points="3,23 10,16 17,20 26,8" stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <polyline points="21,8 26,8 26,13" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="3" y1="27" x2="29" y2="27" stroke={c} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Urgent Escalations",
    color: C.ochre,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L29 26L3 26Z" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="16" y2="20" stroke={c} strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="23" r="1.2" fill={c} />
      </svg>
    ),
  },
];

const STATUS_TEXTS = ["Scanning inbox...", "Categorising intent...", "Routing messages..."];

function ProcessingScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [65, 80, 178, 188], [0, 1, 1, 0]);
  const overallProgress = fi(frame, [80, 165], [0, 1], easeInOut);
  const textIndex = Math.min(2, Math.floor(Math.max(0, frame - 80) / 25));
  const statusText = frame >= 80 && frame < 168 ? STATUS_TEXTS[textIndex] : "Complete";

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif" }}>
        AI Triage Active
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {DEPTS.map((dept, i) => {
          const agentIn = fi(frame, [82 + i * 14, 98 + i * 14], [0, 1], easeOut);
          const progress = fi(frame, [85 + i * 12, 152 + i * 8], [0, 1], easeInOut);
          const done = progress >= 1;
          const ic = done ? dept.color : C.inkFaint;
          return (
            <div key={dept.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: agentIn }}>
              <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress progress={progress} color={dept.color} size={80} />
                {done ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 11l4 4 8-8" stroke={dept.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : dept.icon(ic)}
              </div>
              <div style={{ fontSize: 12, color: done ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", textAlign: "center", letterSpacing: 0.2 }}>
                {dept.label}
              </div>
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

// ── Scene 3 · Sorted Dashboard ────────────────────────────────────────────────

const SORTED = [
  { label: "Customer Support", count: 12, unit: "sorted", color: C.moss },
  { label: "Sales & Leads", count: 5, unit: "routed", color: C.clay },
  { label: "Urgent Escalations", count: 0, unit: "alerts", color: C.ochre },
];

function SortedScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [178, 193, 233, 243], [0, 1, 1, 0]);
  const doneScale = fi(frame, [193, 203], [0.7, 1], easeOut);
  const doneOpacity = fi(frame, [193, 200], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvasDeep, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
      <div style={{ transform: `scale(${doneScale})`, opacity: doneOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: C.moss, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3 3 7-7" stroke={C.canvas} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{ fontSize: 15, color: C.ink, fontFamily: "Georgia, serif", letterSpacing: 0.3 }}>Triage complete</span>
      </div>
      <div style={{ display: "flex", gap: 0, border: "1px solid #D4C9B8" }}>
        {SORTED.map((dept, i) => {
          const colIn = fi(frame, [200 + i * 8, 216 + i * 8], [0, 1], easeOut);
          const count = Math.round(fi(frame, [200 + i * 8, 222 + i * 8], [0, dept.count], easeOut));
          return (
            <div key={dept.label} style={{ width: 240, padding: "28px 30px", borderRight: i < SORTED.length - 1 ? "1px solid #D4C9B8" : "none", opacity: colIn }}>
              <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: dept.color, fontFamily: "Georgia, serif", marginBottom: 16 }}>
                {dept.label}
              </div>
              <div style={{ fontSize: 52, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>
                {dept.count === 0 ? "0" : `+${count}`}
              </div>
              <div style={{ fontSize: 12, color: C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>{dept.unit}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 4 · Executive Summary ───────────────────────────────────────────────
// Content done ~278. Hold 278-338 (60f = 3s), fade 338-348.

function SummaryScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [233, 248, 338, 348], [0, 1, 1, 0]);
  const chartIn = fi(frame, [252, 268], [0, 1], easeOut);
  const metricIn = fi(frame, [262, 278], [0, 1], easeOut);

  const seg1 = donutArc(70, 70, 54, 28, 0, 0.55);
  const seg2 = donutArc(70, 70, 54, 28, 0.55, 0.87);
  const seg3 = donutArc(70, 70, 54, 28, 0.87, 1.0);

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvas, opacity, display: "flex", flexDirection: "column", padding: "56px 80px" }}>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting · Email Triage Summary
      </div>
      <div style={{ fontSize: 28, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.ink, letterSpacing: -0.5, marginBottom: 32 }}>
        22 emails sorted in 4 seconds.
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 36 }} />
      <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
        <div style={{ opacity: chartIn }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 18 }}>Distribution</div>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <path d={seg1} fill={C.moss} opacity="0.85" />
            <path d={seg2} fill={C.clay} opacity="0.85" />
            <path d={seg3} fill={C.ochre} opacity="0.85" />
          </svg>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            {[{ color: C.moss, label: "Support", pct: "55%" }, { color: C.clay, label: "Sales", pct: "32%" }, { color: C.ochre, label: "Urgent", pct: "13%" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "Georgia, serif", color: C.inkSoft }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: l.color, flexShrink: 0 }} />
                {l.label} <span style={{ color: C.inkFaint }}>{l.pct}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 1, backgroundColor: "#D4C9B8", alignSelf: "stretch" }} />
        <div style={{ opacity: metricIn, flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 28 }}>Time recovered today</div>
          <div style={{ fontSize: 72, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -3, lineHeight: 1, marginBottom: 8 }}>
            2.5
          </div>
          <div style={{ fontSize: 18, color: C.inkSoft, fontFamily: "Georgia, serif", letterSpacing: 0.3, marginBottom: 32 }}>hours</div>
          <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 24 }} />
          <div style={{ fontSize: 12, color: C.inkFaint, fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
            No manual sorting needed. Urgent queue is clear.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const EmailTriage: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={2} duration={75} />
      <ProcessingScene frame={frame} />
      <SortedScene frame={frame} />
      <SummaryScene frame={frame} />
    </AbsoluteFill>
  );
};
