"use client";

import { AbsoluteFill, Easing, interpolate } from "remotion";

const C = {
  canvas: "#F4EFE6",
  canvasDeep: "#ECE5D6",
  ink: "#211D17",
  inkSoft: "#5C5347",
  inkFaint: "#9A9085",
  clay: "#B8553A",
  moss: "#5C6B4F",
  ochre: "#D4A24A",
  hairline: "#D4C9B8",
};

const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.inOut(Easing.cubic);

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

// ── Layout (1280 × 720) ───────────────────────────────────────────────────────
const W = 1280;
const H = 720;
const HDR_H = 56;
const LEFT_W = 430;
const PAD = 32;
const CARD_W = 244;
const CARD_H = 88;
const CARD_GAP = 12;
const GRID_X0 = LEFT_W + PAD;
const GRID_Y0 = HDR_H + 68;
const ZOOM = 2.2;

// Play button: 30px circle, marginRight 16 → center offset from card right = 31px
// After zoom, always lands at the same screen-space x regardless of which card
const PLAY_BTN_DELTA = CARD_W / 2 - 31; // offset from card center to play btn center
const PLAY_SX = W / 2 + ZOOM * PLAY_BTN_DELTA; // ~840
const PLAY_SY = H / 2; // ~360

const SKILLS = [
  { label: "Find My Voice", color: C.clay },
  { label: "Good Morning", color: C.ochre },
  { label: "Email Triage", color: C.moss },
  { label: "Report Builder", color: C.clay },
  { label: "Review Manager", color: C.moss },
  { label: "Pricing Digest", color: C.ochre },
];

const FEED = [
  { text: "Good Morning Briefing sent", time: "8:04 AM", color: C.ochre },
  { text: "Find My Voice updated", time: "Yesterday", color: C.clay },
  { text: "Email triage: 12 sorted", time: "Mon 4 PM", color: C.moss },
];

function cardGeo(idx: number) {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = GRID_X0 + col * (CARD_W + CARD_GAP);
  const y = GRID_Y0 + row * (CARD_H + CARD_GAP);
  return { x, y, cx: x + CARD_W / 2, cy: y + CARD_H / 2 };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface OsIntroProps {
  frame: number;
  skillIndex: number;
  duration: number;
}

export function OsIntro({ frame, skillIndex, duration }: OsIntroProps) {
  const fadeInEnd = 12;
  const holdEnd = Math.round(duration * 0.28);
  const zoomEnd = Math.round(duration * 0.63);
  const cursorStart = zoomEnd + 4;
  const cursorEnd = Math.round(duration * 0.77);
  const clickF = cursorEnd + 2;
  const fadeOutStart = duration - 10;

  const outerOpacity = fi(frame, [0, fadeInEnd, fadeOutStart, duration], [0, 1, 1, 0]);

  // Zoom into target card
  const target = cardGeo(skillIndex);
  const zScale = fi(frame, [holdEnd, zoomEnd], [1, ZOOM], easeInOut);
  const zTx = fi(frame, [holdEnd, zoomEnd], [0, W / 2 - ZOOM * target.cx], easeInOut);
  const zTy = fi(frame, [holdEnd, zoomEnd], [0, H / 2 - ZOOM * target.cy], easeInOut);

  // Card hover highlight (grows as cursor approaches)
  const highlight = fi(frame, [zoomEnd, cursorEnd], [0, 1], easeOut);

  // Cursor (stays in screen space, outside the zoom)
  const cursorOpacity = fi(frame, [cursorStart, cursorStart + 8], [0, 1]);
  const cursorX = fi(frame, [cursorStart, cursorEnd], [PLAY_SX + 140, PLAY_SX - 12], easeOut);
  const cursorY = fi(frame, [cursorStart, cursorEnd], [PLAY_SY + 110, PLAY_SY - 14], easeOut);
  const cursorScale = fi(frame, [clickF, clickF + 4, clickF + 10], [1, 0.68, 1]);

  // Click ripple
  const rippleSize = fi(frame, [clickF, clickF + 16], [0, 110]);
  const rippleOpacity = fi(frame, [clickF, clickF + 16], [0.55, 0]);
  const showRipple = frame >= clickF && frame < clickF + 16;

  const skill = SKILLS[skillIndex] ?? SKILLS[0];
  const clicked = frame >= clickF;

  return (
    <AbsoluteFill style={{ opacity: outerOpacity, overflow: "hidden", backgroundColor: C.canvasDeep }}>
      {/* ── Zoomed OS dashboard ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          width: W,
          height: H,
          top: 0,
          left: 0,
          transformOrigin: "0px 0px",
          transform: `translate(${zTx}px, ${zTy}px) scale(${zScale})`,
          backgroundColor: C.canvas,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HDR_H,
            backgroundColor: C.ink,
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            gap: 28,
          }}
        >
          <div style={{ fontSize: 16, letterSpacing: 3, color: C.canvas }}>
            Reform
          </div>
          <div style={{ flex: 1 }} />
          {["Dashboard", "Skills", "Settings"].map((n) => (
            <div
              key={n}
              style={{
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: n === "Skills" ? C.ochre : C.inkFaint,
              }}
            >
              {n}
            </div>
          ))}
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              backgroundColor: C.clay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: C.canvas,
            }}
          >
            J
          </div>
        </div>

        {/* Left panel */}
        <div
          style={{
            position: "absolute",
            top: HDR_H,
            left: 0,
            width: LEFT_W,
            bottom: 0,
            backgroundColor: C.canvas,
            borderRight: `1px solid ${C.hairline}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: HDR_H + PAD,
            left: PAD,
            width: LEFT_W - PAD * 2,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: C.inkFaint,
              marginBottom: 24,
            }}
          >
            Today
          </div>
          {FEED.map((item, i) => {
            const itemIn = fi(frame, [8 + i * 6, 18 + i * 6], [0, 1], easeOut);
            const slide = fi(frame, [8 + i * 6, 18 + i * 6], [8, 0], easeOut);
            return (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 20,
                  opacity: itemIn,
                  transform: `translateY(${slide}px)`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.4 }}>
                    {item.text}
                  </div>
                  <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 3 }}>
                    {item.time}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              height: 1,
              backgroundColor: C.hairline,
              margin: "8px 0 20px",
            }}
          />
          <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 2 }}>
            3 skills ran this week
          </div>
          <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 2 }}>
            0 errors
          </div>
        </div>

        {/* Right panel background */}
        <div
          style={{
            position: "absolute",
            top: HDR_H,
            left: LEFT_W,
            right: 0,
            bottom: 0,
            backgroundColor: C.canvasDeep,
          }}
        />

        {/* Skills label */}
        <div
          style={{
            position: "absolute",
            top: HDR_H + PAD,
            left: GRID_X0,
            fontSize: 10,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: C.inkFaint,
          }}
        >
          Skills
        </div>

        {/* Skill cards */}
        {SKILLS.map((s, i) => {
          const geo = cardGeo(i);
          const cardIn = fi(frame, [8 + i * 4, 18 + i * 4], [0, 1], easeOut);
          const cardSlide = fi(frame, [8 + i * 4, 18 + i * 4], [8, 0], easeOut);
          const isTarget = i === skillIndex;
          const h = isTarget ? highlight : 0;

          return (
            <div
              key={s.label}
              style={{
                position: "absolute",
                left: geo.x,
                top: geo.y,
                width: CARD_W,
                height: CARD_H,
                backgroundColor: C.canvas,
                border: `1px solid ${C.hairline}`,
                opacity: cardIn,
                transform: `translateY(${cardSlide}px)`,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {/* Highlight overlay */}
              {isTarget && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: s.color,
                    opacity: h * 0.07,
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Highlight border */}
              {isTarget && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: `1.5px solid ${s.color}`,
                    opacity: h,
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Accent strip */}
              <div
                style={{
                  width: 4,
                  height: "100%",
                  backgroundColor: s.color,
                  flexShrink: 0,
                }}
              />
              {/* Label */}
              <div
                style={{
                  flex: 1,
                  padding: "0 14px",
                  fontSize: 13,
                  color: C.ink,
                  letterSpacing: 0.2,
                }}
              >
                {s.label}
              </div>
              {/* Play button */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: `1px solid ${isTarget && h > 0 ? s.color : C.hairline}`,
                  backgroundColor: isTarget && clicked ? s.color : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                  <path
                    d="M2 1.5L9 5.5L2 9.5V1.5Z"
                    fill={isTarget && clicked ? C.canvas : s.color}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Cursor overlay (screen space) ───────────────────────── */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {/* Ripple at play button */}
        {showRipple && (
          <div
            style={{
              position: "absolute",
              left: PLAY_SX - rippleSize / 2,
              top: PLAY_SY - rippleSize / 2,
              width: rippleSize,
              height: rippleSize,
              borderRadius: "50%",
              border: `1.5px solid ${skill.color}`,
              opacity: rippleOpacity,
            }}
          />
        )}
        {/* Cursor */}
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            transform: `scale(${cursorScale})`,
            transformOrigin: "0px 0px",
          }}
        >
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path
              d="M4 3L4 22L8.5 17.5L12.5 26L15 25L11 16.5L17 16.5Z"
              fill="white"
              stroke={C.ink}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
