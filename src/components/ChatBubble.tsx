import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { theme } from "../theme";
import { MessageSender } from "../types";
import {
  BUBBLE_BORDER_WIDTH,
  BUBBLE_HEADER_HEIGHT,
  BUBBLE_HEADER_TO_TEXT_GAP,
  BUBBLE_PADDING_H,
  BUBBLE_PADDING_V,
  MESSAGE_FONT_SIZE,
  MESSAGE_LINE_HEIGHT,
} from "../utils/bubbleLayout";

const FADE_FRAMES = 15;

export const ChatBubble: React.FC<{
  sender: MessageSender;
  text: string;
  label: string;
  avatarSrc: string;
  appearAtFrame: number;
  disappearAtFrame: number | null;
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
  // A null disappearAtFrame means this bubble is the last one in its slot:
  // it stays fully visible until the chat Sequence itself ends, instead of
  // fading out (which would otherwise collide with its own fade-in).
  const fadeOut =
    disappearAtFrame === null
      ? 1
      : interpolate(
          frame,
          [disappearAtFrame - FADE_FRAMES, disappearAtFrame],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
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
        gap: BUBBLE_HEADER_TO_TEXT_GAP,
        backgroundColor: theme.bubbleBackground,
        backdropFilter: `blur(${theme.bubbleBlur}px)`,
        WebkitBackdropFilter: `blur(${theme.bubbleBlur}px)`,
        borderRadius: theme.bubbleRadius,
        padding: `${BUBBLE_PADDING_V}px ${BUBBLE_PADDING_H}px`,
        border: `${BUBBLE_BORDER_WIDTH}px solid rgba(255, 255, 255, 0.08)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {avatarBackground ? (
          <div
            style={{
              width: BUBBLE_HEADER_HEIGHT,
              height: BUBBLE_HEADER_HEIGHT,
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
            width={BUBBLE_HEADER_HEIGHT}
            height={BUBBLE_HEADER_HEIGHT}
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
          fontSize: MESSAGE_FONT_SIZE,
          fontWeight: 500,
          lineHeight: MESSAGE_LINE_HEIGHT,
          color: theme.textPrimary,
        }}
      >
        {text}
      </span>
    </div>
  );
};
