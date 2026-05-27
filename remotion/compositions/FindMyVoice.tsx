"use client";

import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { OsIntro } from "./OsIntro";

// ── Palette ──────────────────────────────────────────────────────────────────
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

// 20 fps, so 40 frames = 2 s hold between scenes.

function fi(
  frame: number,
  input: number[],
  output: number[],
  easing?: (t: number) => number,
) {
  return interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// ── Scene 1 · Button ─────────────────────────────────────────────────────────
// Content finishes at frame 65 (ripple done). Hold 20 frames, fade 85→95.

function ButtonScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [0, 15, 65, 85, 95], [0, 1, 1, 1, 0]);
  const btnScale = fi(frame, [38, 42, 50], [1, 0.91, 1]);
  const labelOpacity = fi(frame, [50, 64], [1, 0]);
  const rippleSize = fi(frame, [42, 65], [30, 340]);
  const rippleOpacity = fi(frame, [42, 65], [0.7, 0]);
  const showRipple = frame >= 42 && frame <= 65;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.ink,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: 7,
          textTransform: "uppercase",
          color: C.ochre,
          fontFamily: "Georgia, serif",
          opacity: labelOpacity,
          marginBottom: 16,
        }}
      >
        Reform Consulting
      </div>

      <div
        style={{
          fontSize: 16,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: C.inkFaint,
          fontFamily: "Georgia, serif",
          opacity: labelOpacity,
          marginBottom: 32,
        }}
      >
        Skill · Voice Calibration
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {showRipple && (
          <div
            style={{
              position: "absolute",
              width: rippleSize,
              height: rippleSize,
              borderRadius: "50%",
              border: `1.5px solid ${C.clay}`,
              opacity: rippleOpacity,
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            backgroundColor: C.clay,
            color: C.canvas,
            padding: "20px 60px",
            fontSize: 20,
            letterSpacing: 0.5,
            fontFamily: "Georgia, serif",
            transform: `scale(${btnScale})`,
            cursor: "default",
          }}
        >
          Find My Voice
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 2 · Gmail ───────────────────────────────────────────────────────────
// Starts at 85. Email finishes typing at 178; hold 40 frames; fade 218→228.

const SENT_EMAILS = [
  {
    to: "Marcus, Priya",
    subject: "Henderson report, Friday deadline",
    time: "Thu 2:14 PM",
    preview: "Hey team, just a heads up that the Henderson report is due…",
  },
  {
    to: "Sarah K.",
    subject: "Re: Q2 budget review",
    time: "Wed 11:02 AM",
    preview: "Looks good to me. Let's go with option B and revisit in…",
  },
  {
    to: "All Staff",
    subject: "Office closed Monday",
    time: "Mon 9:45 AM",
    preview: "Quick note: we'll be closed Monday for the holiday. Enjoy…",
  },
  {
    to: "Tom at Apex",
    subject: "Proposal: revised scope",
    time: "Last week",
    preview: "Tom, attached is the revised scope. I've trimmed the…",
  },
];

const EMAIL_BODY = `Hey team,

The Henderson report is due this Friday. We're in good shape but I want to make sure we're aligned on the last mile.

Marcus, can you get me the updated financials by Thursday noon? I'll handle the exec summary once I have those numbers.

Priya, still on for the charts? Let me know if you need anything from me.

Shouldn't be a late night if we stay on track. Thanks for pushing on this one.

Jordan`;

function GmailScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [85, 102, 218, 228], [0, 1, 1, 0]);
  const listOpacity = fi(frame, [125, 140], [1, 0]);
  const emailOpacity = fi(frame, [136, 154], [0, 1]);
  const emailReveal = fi(frame, [156, 178], [0, 1], easeOut);
  const visibleChars = Math.floor(EMAIL_BODY.length * emailReveal);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F6F8FC",
        opacity,
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 60,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E0E0E0",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 18, height: 2, backgroundColor: "#757575", borderRadius: 1 }} />
          ))}
        </div>
        <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: -0.5 }}>
          <span style={{ color: "#EA4335" }}>G</span>
          <span style={{ color: "#4285F4" }}>m</span>
          <span style={{ color: "#FBBC04" }}>a</span>
          <span style={{ color: "#34A853" }}>i</span>
          <span style={{ color: "#EA4335" }}>l</span>
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 560,
            backgroundColor: "#EAF1FB",
            borderRadius: 24,
            height: 38,
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            fontSize: 15,
            color: "#555",
          }}
        >
          Search mail
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 190,
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid #E8EAED",
            padding: "16px 0",
            flexShrink: 0,
          }}
        >
          {["Inbox", "Starred", "Sent", "Drafts", "More"].map((label) => (
            <div
              key={label}
              style={{
                padding: "9px 26px",
                fontSize: 14,
                color: label === "Sent" ? C.clay : "#202124",
                fontWeight: label === "Sent" ? 700 : 400,
                backgroundColor: label === "Sent" ? "#FDE8E6" : "transparent",
                borderRadius: label === "Sent" ? "0 20px 20px 0" : 0,
                marginRight: label === "Sent" ? 8 : 0,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* List view */}
          <div style={{ opacity: listOpacity, position: "absolute", inset: 0 }}>
            <div
              style={{
                padding: "10px 24px",
                borderBottom: "1px solid #E8EAED",
                fontSize: 13,
                color: "#555",
                backgroundColor: "#FFFFFF",
              }}
            >
              Sent Mail
            </div>
            {SENT_EMAILS.map((email, i) => {
              const rowIn = fi(frame, [100 + i * 9, 118 + i * 9], [0, 1], easeOut);
              const highlighted = i === 0 && frame > 120;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "13px 24px",
                    gap: 18,
                    borderBottom: "1px solid #E8EAED",
                    backgroundColor: highlighted ? "#E8F0FE" : "#FFFFFF",
                    opacity: rowIn,
                    transform: `translateX(${fi(rowIn, [0, 1], [12, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#202124",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexShrink: 0,
                    }}
                  >
                    To: {email.to}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: 13,
                      color: "#202124",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{email.subject}</span>
                    <span style={{ color: "#777", fontWeight: 400 }}> · {email.preview}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#777", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {email.time}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Single email view */}
          <div
            style={{
              opacity: emailOpacity,
              position: "absolute",
              inset: 0,
              backgroundColor: "#FFFFFF",
              padding: "36px 48px",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 400, color: "#202124", marginBottom: 20 }}>
              Henderson report, Friday deadline
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#777", marginBottom: 28 }}>
              <span>To: Marcus, Priya</span>
              <span>·</span>
              <span>Thu 2:14 PM</span>
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#202124",
                lineHeight: 1.75,
                whiteSpace: "pre-wrap",
              }}
            >
              {EMAIL_BODY.slice(0, visibleChars)}
              {emailReveal < 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1em",
                    backgroundColor: "#202124",
                    verticalAlign: "text-bottom",
                    marginLeft: 1,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 3 · Processing → Complete ──────────────────────────────────────────
// Starts at 228. Calibrate fills 238→278; processing fades 298→307;
// complete rendered at ~320; hold 40 frames; fade 360→370.

const STEPS = [
  "Reading sent emails…",
  "Analysing tone + rhythm…",
  "Mapping signature phrases…",
  "Building voice profile…",
];

function ProcessScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [228, 243, 360, 370], [0, 1, 1, 0]);
  const processingOpacity = fi(frame, [298, 307], [1, 0]);
  const completeOpacity = fi(frame, [307, 320], [0, 1]);
  const progress = fi(frame, [238, 278], [0, 1], easeInOut);
  const checkScale = fi(frame, [307, 318], [0.5, 1], easeOut);
  const checkOpacity = fi(frame, [307, 315], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.ink,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Processing */}
      <div
        style={{
          opacity: processingOpacity,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: C.ochre,
            fontFamily: "Georgia, serif",
          }}
        >
          Calibrating
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STEPS.map((step, i) => {
            const stepIn = fi(frame, [238 + i * 8, 250 + i * 8], [0, 1]);
            const done = frame > 262 + i * 4;
            return (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: stepIn,
                  fontSize: 16,
                  color: done ? C.canvas : C.inkFaint,
                  fontFamily: "Georgia, serif",
                  letterSpacing: 0.2,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: done ? C.moss : C.inkFaint,
                    flexShrink: 0,
                  }}
                />
                {step}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: 320,
            height: 2,
            backgroundColor: "#3A342D",
            borderRadius: 1,
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: C.moss,
              borderRadius: 1,
            }}
          />
        </div>
      </div>

      {/* Complete */}
      <div
        style={{
          opacity: completeOpacity,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: C.moss,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${checkScale})`,
            opacity: checkOpacity,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M7 14l5 5 9-10"
              stroke={C.canvas}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 44,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            color: C.canvas,
            letterSpacing: -1,
          }}
        >
          Voice profile saved.
        </div>
        <div
          style={{
            fontSize: 15,
            color: C.inkFaint,
            fontFamily: "Georgia, serif",
            letterSpacing: 0.3,
          }}
        >
          36 emails analysed · 4 patterns identified
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Scene 4 · Before / After ──────────────────────────────────────────────────
// Starts at 370. Content fully visible at 422. Hold 80 frames; fade 502→512.

const AI_TEXT =
  "I am writing to follow up on our previous discussion and to inquire as to your current status regarding the proposal we submitted. I want to ensure that you have had the opportunity to review all relevant materials and would welcome the chance to address any outstanding questions or concerns at your earliest convenience.";

const USER_TEXT = `Hi Lisa,

Just following up on the proposal from last week. Happy to hop on a quick call if anything needs clarifying, or I can answer questions over email.

No pressure either way. Let me know what works.

Jordan`;

function VoiceScene({ frame }: { frame: number }) {
  const opacity = fi(frame, [370, 385, 502, 512], [0, 1, 1, 0]);
  const aiOpacity = fi(frame, [388, 400], [0, 1], easeOut);
  const arrowOpacity = fi(frame, [403, 411], [0, 1]);
  const userOpacity = fi(frame, [410, 422], [0, 1], easeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.canvas,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "56px 80px",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 10,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: C.inkFaint,
          fontFamily: "Georgia, serif",
          marginBottom: 36,
        }}
      >
        Reform Consulting · Find My Voice
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 36 }}>
        {/* AI draft */}
        <div
          style={{
            opacity: aiOpacity,
            flex: 1,
            border: "1px solid #D4C9B8",
            padding: "28px 30px",
            backgroundColor: C.canvasDeep,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.inkFaint,
              fontFamily: "Georgia, serif",
              marginBottom: 18,
            }}
          >
            Generic AI draft
          </div>
          <div
            style={{
              fontSize: 14,
              color: C.inkSoft,
              lineHeight: 1.75,
              fontFamily: "Georgia, serif",
            }}
          >
            {AI_TEXT}
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            opacity: arrowOpacity,
            display: "flex",
            alignItems: "center",
            paddingTop: 90,
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative", width: 48, height: 2, backgroundColor: C.clay }}>
            <div
              style={{
                position: "absolute",
                right: -1,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderLeft: `9px solid ${C.clay}`,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
              }}
            />
          </div>
        </div>

        {/* User voice */}
        <div
          style={{
            opacity: userOpacity,
            flex: 1,
            border: `1px solid ${C.clay}`,
            padding: "28px 30px",
            backgroundColor: "#FDF8F5",
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.clay,
              fontFamily: "Georgia, serif",
              marginBottom: 18,
            }}
          >
            Your voice
          </div>
          <div
            style={{
              fontSize: 14,
              color: C.ink,
              lineHeight: 1.75,
              fontFamily: "Georgia, serif",
              whiteSpace: "pre-wrap",
            }}
          >
            {USER_TEXT}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export const FindMyVoice: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <OsIntro frame={frame} skillIndex={0} duration={95} />
      <GmailScene frame={frame} />
      <ProcessScene frame={frame} />
      <VoiceScene frame={frame} />
    </AbsoluteFill>
  );
};
