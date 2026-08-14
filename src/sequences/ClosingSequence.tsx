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

// How many of the composition's final frames are handed over to this
// closing screen. AgentReel derives closingStartFrame from this, and the
// fade timings below are tuned to fit comfortably inside this window with
// a bit of hold time at the end — if this changes, re-check that
// WEBSITE_START + WEBSITE_FADE_FRAMES still lands safely before it.
export const CLOSING_DURATION_IN_FRAMES = 60;

const BG_FADE_FRAMES = 15;
const LOGO_START = 10;
const LOGO_FADE_FRAMES = 16;
const CLOSING_LINE_START = 28;
const CLOSING_LINE_FADE_FRAMES = 12;
const WEBSITE_START = CLOSING_LINE_START + 15; // ~half a second later
const WEBSITE_FADE_FRAMES = 12;

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
