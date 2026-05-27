"use client";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type PlaceholderSkillProps = {
  title?: string;
  caption?: string;
};

export const PlaceholderSkill: React.FC<PlaceholderSkillProps> = ({
  title = "Tutorial coming soon",
  caption = "Remotion compositions will live here.",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const translate = interpolate(frame, [0, 30], [16, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#211D17",
        color: "#F4EFE6",
        fontFamily: "Georgia, serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translate}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#D4A24A",
            marginBottom: 24,
          }}
        >
          Reform Consulting
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: -2,
            fontStyle: "italic",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#8A8073",
          }}
        >
          {caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};
