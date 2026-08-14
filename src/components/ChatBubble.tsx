import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { theme } from "../theme";
import { MessageSender } from "../types";

const FADE_FRAMES = 15;

export const ChatBubble: React.FC<{
  sender: MessageSender;
  text: string;
  label: string;
  avatarSrc: string;
  appearAtFrame: number;
  disappearAtFrame: number;
  bottom: number;
  left?: number;
  right?: number;
  width: number;
  avatarBackground?: string;
}> = ({
  sender,
  text,
  label,
  avatarSrc,
  appearAtFrame,
  disappearAtFrame,
  bottom,
  left,
  right,
  width,
  avatarBackground,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(
    frame,
    [appearAtFrame, appearAtFrame + FADE_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fadeOut = interpolate(
    frame,
    [disappearAtFrame - FADE_FRAMES, disappearAtFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  if (opacity <= 0) {
    return null;
  }

  const slideDistance = 50;
  const slideProgress = interpolate(
    frame,
    [appearAtFrame, appearAtFrame + FADE_FRAMES],
    [sender === "client" ? -slideDistance : slideDistance, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        right,
        width,
        opacity,
        transform: `translateX(${slideProgress}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backgroundColor: theme.bubbleBackground,
        backdropFilter: `blur(${theme.bubbleBlur}px)`,
        WebkitBackdropFilter: `blur(${theme.bubbleBlur}px)`,
        borderRadius: theme.bubbleRadius,
        padding: "16px 20px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {avatarBackground ? (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              backgroundColor: avatarBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile(avatarSrc)}
              style={{ width: 20, height: 20, objectFit: "contain" }}
            />
          </div>
        ) : (
          <Img
            src={staticFile(avatarSrc)}
            width={34}
            height={34}
            style={{ borderRadius: "50%", flexShrink: 0 }}
          />
        )}
        <span
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 500,
            color: theme.textSecondary,
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontFamily,
          fontSize: 27,
          fontWeight: 500,
          lineHeight: 1.35,
          color: theme.textPrimary,
        }}
      >
        {text}
      </span>
    </div>
  );
};
