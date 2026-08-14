import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { theme } from "../theme";

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
      <OffthreadVideo
        src={staticFile(backgroundVideoSrc)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
