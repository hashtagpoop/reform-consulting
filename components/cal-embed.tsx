"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

type CalEmbedProps = {
  calLink: string;
};

export function CalEmbed({ calLink }: CalEmbedProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#B8553A" },
        },
      });
    })();
  }, []);

  return (
    <div className="w-full overflow-hidden border border-hairline bg-canvas">
      <iframe
        src={`https://cal.com/${calLink}?embed=true&theme=light`}
        title="Book a call"
        className="h-[720px] w-full"
        loading="lazy"
      />
    </div>
  );
}
