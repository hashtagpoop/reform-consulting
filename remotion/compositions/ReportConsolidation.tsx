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

// ── Scene 1 · Toggle Switch ───────────────────────────────────────────────────

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 12, 50, 65, 75], [0, 1, 1, 1, 0]);
  const toggleOn = frame >= 32;
  const thumbX = fi(frame, [28, 36], [2, 22]);
  const trackColor = toggleOn ? C.moss : "#3A342D";

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif", marginBottom: 10 }}>
        Reform Consulting
      </div>
      <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 36 }}>
        Skill · Report Consolidation
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="48" height="28" viewBox="0 0 48 28">
          <rect x="0" y="0" width="48" height="28" rx="14" fill={trackColor} />
          <circle cx={thumbX + 12} cy="14" r="10" fill={C.canvas} />
        </svg>
        <span style={{ fontSize: 16, color: toggleOn ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", letterSpacing: 0.3, transition: "color 0.3s" }}>
          Generate Consolidated Report
        </span>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Source Extraction ───────────────────────────────────────────────

const SOURCES = [
  {
    label: "CRM Sales",
    sublabel: "Fetching pipeline",
    color: C.clay,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="8" rx="11" ry="5" stroke={c} strokeWidth="1.8" fill="none" />
        <path d="M5,8 L5,22 C5,25 10,27 16,27 C22,27 27,25 27,22 L27,8" stroke={c} strokeWidth="1.8" fill="none" />
        <path d="M5,15 C5,18 10,20 16,20 C22,20 27,18 27,15" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    label: "Finance (QuickBooks)",
    sublabel: "Normalising ledger",
    color: C.moss,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M6,2 L26,2 L26,30 L22,27 L19,30 L16,27 L13,30 L10,27 L6,30 Z" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <line x1="10" y1="11" x2="22" y2="11" stroke={c} strokeWidth="1.5" />
        <line x1="10" y1="16" x2="22" y2="16" stroke={c} strokeWidth="1.5" />
        <line x1="10" y1="21" x2="18" y2="21" stroke={c} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Marketing (Google Ads)",
    sublabel: "Pulling spend data",
    color: C.ochre,
    icon: (c: string) => (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M5,13 L5,21 L10,21 L10,13 L26,5 L26,29 L10,21" stroke={c} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STATUS_TEXTS = ["Fetching API data...", "Normalising metrics...", "Compiling charts..."];

function ExtractionScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [65, 80, 178, 188], [0, 1, 1, 0]);
  const overallProgress = fi(frame, [80, 165], [0, 1], easeInOut);
  const textIndex = Math.min(2, Math.floor(Math.max(0, frame - 80) / 25));
  const statusText = frame >= 80 && frame < 168 ? STATUS_TEXTS[textIndex] : "Complete";

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif" }}>
        Pulling data from all sources
      </div>
      <div style={{ display: "flex", gap: 56 }}>
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
              <div style={{ fontSize: 11, color: done ? C.canvas : C.inkFaint, fontFamily: "Georgia, serif", textAlign: "center", letterSpacing: 0.2, maxWidth: 110 }}>
                {src.label}
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
          <div style={{ width: `${overallProgress * 100}%`, height: "100%", backgroundColor: C.moss, borderRadius: 1 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 3 · Merge Animation ─────────────────────────────────────────────────

function MergeScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [178, 193, 233, 243], [0, 1, 1, 0]);
  const src1Out = fi(frame, [196, 210], [1, 0]);
  const src2Out = fi(frame, [201, 215], [1, 0]);
  const src3Out = fi(frame, [206, 220], [1, 0]);
  const centralIn = fi(frame, [215, 228], [0, 1], easeOut);
  const centralScale = fi(frame, [215, 228], [0.6, 1], easeOut);

  const icons = [
    { label: "CRM", opacity: src1Out, color: C.clay },
    { label: "Finance", opacity: src2Out, color: C.moss },
    { label: "Marketing", opacity: src3Out, color: C.ochre },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvasDeep, opacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
        {icons.map((icon) => (
          <div key={icon.label} style={{ opacity: icon.opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 52, height: 52, border: `1px solid ${icon.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 10, color: icon.color, fontFamily: "Georgia, serif", letterSpacing: 1 }}>{icon.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ opacity: centralIn, transform: `scale(${centralScale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 88, height: 88, border: `1.5px solid ${C.ink}`, backgroundColor: C.canvas, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect x="3" y="3" width="26" height="26" rx="2" stroke={C.ink} strokeWidth="1.5" fill="none" />
            <rect x="7" y="7" width="8" height="8" rx="1" stroke={C.ink} strokeWidth="1.2" fill="none" />
            <rect x="17" y="7" width="8" height="4" fill={C.moss} />
            <rect x="17" y="13" width="5" height="2" fill={C.clay} />
            <rect x="7" y="17" width="18" height="2" fill={C.inkFaint} />
            <rect x="7" y="21" width="12" height="2" fill={C.inkFaint} />
          </svg>
        </div>
        <div style={{ fontSize: 13, color: C.ink, fontFamily: "Georgia, serif", letterSpacing: 0.3 }}>Executive Dashboard</div>
        <div style={{ fontSize: 10, color: C.moss, fontFamily: "Georgia, serif", letterSpacing: 1 }}>Ready</div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 4 · Executive Report ────────────────────────────────────────────────
// Content done ~278. Hold 278-338 (60f = 3s), fade 338-348.

const MONTHLY_REVENUE = [180, 195, 170, 215, 208, 232, 255];
const AD_SPEND = [40, 52, 38, 60, 55, 48, 64];
const AD_ROI = [28, 45, 30, 66, 58, 55, 80];

function DashboardScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [233, 248, 338, 348], [0, 1, 1, 0]);
  const lineReveal = fi(frame, [253, 270], [0, 1], easeOut);
  const barsIn = fi(frame, [260, 276], [0, 1], easeOut);
  const metricIn = fi(frame, [266, 278], [0, 1], easeOut);

  const W = 200, H = 80;
  const maxRev = 260;
  const revPoints = MONTHLY_REVENUE.map((v, i) => `${(i / 6) * W},${H - (v / maxRev) * H}`).join(" ");
  const clipW = lineReveal * W;

  return (
    <AbsoluteFill style={{ backgroundColor: C.canvas, opacity, display: "flex", flexDirection: "column", padding: "44px 60px" }}>
      <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 6 }}>
        Reform Consulting · Consolidated Executive Report
      </div>
      <div style={{ fontSize: 22, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.ink, letterSpacing: -0.5, marginBottom: 28 }}>
        All sources. One view.
      </div>
      <div style={{ height: 1, backgroundColor: "#D4C9B8", marginBottom: 28 }} />
      <div style={{ display: "flex", gap: 28, flex: 1 }}>
        <div style={{ flex: 1.4 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.clay, fontFamily: "Georgia, serif", marginBottom: 14 }}>Monthly Revenue Trend</div>
          <div style={{ border: "1px solid #D4C9B8", padding: "16px 14px", backgroundColor: C.canvasDeep }}>
            <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <defs>
                <clipPath id="revClip">
                  <rect x="0" y="0" width={clipW} height={H} />
                </clipPath>
              </defs>
              <polyline points={revPoints} fill="none" stroke={C.clay} strokeWidth="2" clipPath="url(#revClip)" />
              {MONTHLY_REVENUE.map((v, i) => {
                const px = (i / 6) * W;
                const py = H - (v / maxRev) * H;
                const dotOpacity = px <= clipW ? 1 : 0;
                return <circle key={i} cx={px} cy={py} r="3" fill={C.clay} opacity={dotOpacity} />;
              })}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.inkFaint, fontFamily: "Georgia, serif", marginTop: 6 }}>
              {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>

          <div style={{ marginTop: 20, fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.moss, fontFamily: "Georgia, serif", marginBottom: 14 }}>Ad Spend vs ROI</div>
          <div style={{ border: "1px solid #D4C9B8", padding: "16px 14px", backgroundColor: C.canvasDeep, opacity: barsIn }}>
            <svg width="100%" height={60} viewBox="0 0 200 60">
              {AD_SPEND.map((s, i) => {
                const x = (i / 7) * 200 + 4;
                const sh = (s / 80) * 50;
                const rh = (AD_ROI[i] / 80) * 50;
                return (
                  <g key={i}>
                    <rect x={x} y={60 - sh} width={9} height={sh} fill={C.ochre} opacity="0.7" />
                    <rect x={x + 11} y={60 - rh} width={9} height={rh} fill={C.moss} opacity="0.7" />
                  </g>
                );
              })}
            </svg>
            <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
              {[{ color: C.ochre, label: "Spend" }, { color: C.moss, label: "ROI" }].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: C.inkFaint, fontFamily: "Georgia, serif" }}>
                  <div style={{ width: 8, height: 8, backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 1, backgroundColor: "#D4C9B8" }} />

        <div style={{ flex: 1, opacity: metricIn, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 8 }}>Net Profit (May)</div>
            <div style={{ fontSize: 56, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -2, lineHeight: 1 }}>$38,400</div>
            <div style={{ fontSize: 12, color: C.moss, fontFamily: "Georgia, serif", marginTop: 6 }}>+18% vs April</div>
          </div>
          <div style={{ height: 1, backgroundColor: "#D4C9B8" }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 8 }}>Revenue Run Rate</div>
            <div style={{ fontSize: 28, color: C.ink, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: -0.5 }}>$461K / yr</div>
          </div>
          <div style={{ height: 1, backgroundColor: "#D4C9B8" }} />
          <div>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: C.inkFaint, fontFamily: "Georgia, serif", marginBottom: 8 }}>Report generated</div>
            <div style={{ fontSize: 13, color: C.inkSoft, fontFamily: "Georgia, serif" }}>3 sources. 0 manual steps.</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const ReportConsolidation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={3} duration={75} />
      <ExtractionScene frame={frame} />
      <MergeScene frame={frame} />
      <DashboardScene frame={frame} />
    </AbsoluteFill>
  );
};
