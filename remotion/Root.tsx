import { Composition } from "remotion";
import { PlaceholderSkill } from "./compositions/PlaceholderSkill";
import { FindMyVoice } from "./compositions/FindMyVoice";
import { GoodMorning } from "./compositions/GoodMorning";
import { EmailTriage } from "./compositions/EmailTriage";
import { ReportConsolidation } from "./compositions/ReportConsolidation";
import { ReviewManager } from "./compositions/ReviewManager";
import { PricingDigest } from "./compositions/PricingDigest";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PlaceholderSkill"
        component={PlaceholderSkill}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          title: "Tutorial coming soon",
          caption: "Remotion compositions will live here.",
        }}
      />
      <Composition
        id="FindMyVoice"
        component={FindMyVoice}
        durationInFrames={512}
        fps={20}
        width={1280}
        height={720}
      />
      <Composition
        id="GoodMorning"
        component={GoodMorning}
        durationInFrames={345}
        fps={20}
        width={1280}
        height={720}
      />
      <Composition
        id="EmailTriage"
        component={EmailTriage}
        durationInFrames={348}
        fps={20}
        width={1280}
        height={720}
      />
      <Composition
        id="ReportConsolidation"
        component={ReportConsolidation}
        durationInFrames={348}
        fps={20}
        width={1280}
        height={720}
      />
      <Composition
        id="ReviewManager"
        component={ReviewManager}
        durationInFrames={348}
        fps={20}
        width={1280}
        height={720}
      />
      <Composition
        id="PricingDigest"
        component={PricingDigest}
        durationInFrames={348}
        fps={20}
        width={1280}
        height={720}
      />
    </>
  );
};
