"use client";

import { Player } from "@remotion/player";
import type { ComponentType } from "react";

type VideoCardProps = {
  title: string;
  caption: string;
  composition: ComponentType<Record<string, unknown>>;
  durationInFrames: number;
  fps?: number;
  width?: number;
  height?: number;
};

export function VideoCard({
  title,
  caption,
  composition,
  durationInFrames,
  fps = 30,
  width = 1280,
  height = 720,
}: VideoCardProps) {
  return (
    <figure className="flex flex-col gap-4 border border-hairline bg-canvas p-4">
      <div className="relative w-full overflow-hidden bg-ink/95">
        <Player
          component={composition}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={width}
          compositionHeight={height}
          controls
          autoPlay={false}
          loop={false}
          clickToPlay
          doubleClickToFullscreen
          style={{
            width: "100%",
            aspectRatio: `${width} / ${height}`,
          }}
        />
      </div>
      <figcaption className="px-1 pb-1">
        <h3 className="font-display text-xl leading-tight tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-soft leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}
