import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fontFamily } from "../fonts";
import { theme } from "../theme";

const BG_FADE_FRAMES = 20;
const LOGO_START = 15;
const LOGO_FADE_FRAMES = 20;
const CLOSING_LINE_START = 45;
const CLOSING_LINE_FADE_FRAMES = 18;
const WEBSITE_START = CLOSING_LINE_START + 15;
const WEBSITE_FADE_FRAMES = 15;

const fadeInAt = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const ClosingSequence: React.FC<{
  closingLine: string;
  websiteUrl: string;
}> = ({ closingLine, websiteUrl }) => {
  const frame = useCurrentFrame();

  const bgOpacity = fadeInAt(frame, 0, BG_FADE_FRAMES);
  const logoOpacity = fadeInAt(frame, LOGO_START, LOGO_FADE_FRAMES);
  const closingLineOpacity = fadeInAt(
    frame,
    CLOSING_LINE_START,
    CLOSING_LINE_FADE_FRAMES,
  );
  const websiteOpacity = fadeInAt(frame, WEBSITE_START, WEBSITE_FADE_FRAMES);

  return (
    <>
      <AbsoluteFill
        style={{ backgroundColor: theme.closingBackground, opacity: bgOpacity }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 34,
          padding: "0 100px",
        }}
      >
        <Img
          src={staticFile("labs-logo-cierre-video.png")}
          style={{
            width: 420,
            opacity: logoOpacity,
          }}
        />
        <span
          style={{
            fontFamily,
            fontSize: 46,
            fontWeight: 700,
            color: theme.closingText,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: closingLineOpacity,
          }}
        >
          {closingLine}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 500,
            color: theme.closingText,
            textAlign: "center",
            opacity: websiteOpacity,
          }}
        >
          {websiteUrl}
        </span>
      </AbsoluteFill>
    </>
  );
};
