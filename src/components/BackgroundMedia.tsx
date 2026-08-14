import React from "react";
import { AbsoluteFill, Loop, OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

// Our source background clips run ~10s natively. Looping at a safely
// shorter cycle keeps the video covering the full composition even as
// the composition's duration grows, without ever seeking past the end
// of the source file.
const BACKGROUND_LOOP_DURATION_IN_FRAMES = 300;

export const BackgroundMedia: React.FC<{
  backgroundVideoSrc: string;
  backgroundVideoExists: boolean;
}> = ({ backgroundVideoSrc, backgroundVideoExists }) => {
  if (!backgroundVideoExists) {
    return (
      <AbsoluteFill style={{ backgroundColor: theme.backgroundFallback }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.backgroundFallback }}>
      <Loop durationInFrames={BACKGROUND_LOOP_DURATION_IN_FRAMES}>
        <OffthreadVideo
          src={staticFile(backgroundVideoSrc)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Loop>
    </AbsoluteFill>
  );
};
