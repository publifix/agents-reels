import "./index.css";
import { Composition } from "remotion";
import { AgentReel, calculateAgentReelMetadata } from "./AgentReel";
import { restauranteCase } from "./data/cases/restaurante";

export const FPS = 30;
export const DEFAULT_DURATION_IN_FRAMES = 360;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgentReel"
        component={AgentReel}
        durationInFrames={DEFAULT_DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={restauranteCase}
        calculateMetadata={calculateAgentReelMetadata}
      />
    </>
  );
};
