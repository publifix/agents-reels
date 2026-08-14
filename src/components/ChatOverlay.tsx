import React from "react";
import { theme } from "../theme";
import { ChatMessage } from "../types";
import { ChatBubble } from "./ChatBubble";

const MAX_VISIBLE = 4;
const SLOT_STEP_Y = 148;
const SLOT_STEP_X = 44;
const CLIENT_WIDTH = 560;
const AGENT_WIDTH = 620;
const CONTAINER_BOTTOM_MARGIN = 210;
const NEWEST_BUBBLE_BOTTOM = 40;

const AGENT_LABEL = "LABS Agent";

export const ChatOverlay: React.FC<{
  messages: ChatMessage[];
  clientLabel: string;
  clientAvatarSrc: string;
  agentAvatarSrc: string;
  closingStartFrame: number;
}> = ({
  messages,
  clientLabel,
  clientAvatarSrc,
  agentAvatarSrc,
  closingStartFrame,
}) => {
  const sorted = [...messages].sort(
    (a, b) => a.appearAtFrame - b.appearAtFrame,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: CONTAINER_BOTTOM_MARGIN,
      }}
    >
      {sorted.map((message, index) => {
        const slot = index % MAX_VISIBLE;
        const nextSameSlot = sorted[index + MAX_VISIBLE];
        const disappearAtFrame =
          nextSameSlot?.appearAtFrame ?? closingStartFrame;

        // Older bubbles (lower slot) sit higher up; each newer bubble
        // cascades further down and further right, toward the anchor line.
        const bottom =
          NEWEST_BUBBLE_BOTTOM + (MAX_VISIBLE - 1 - slot) * SLOT_STEP_Y;
        const slotX = slot * SLOT_STEP_X;

        const isClient = message.sender === "client";

        return (
          <ChatBubble
            key={`${message.sender}-${message.appearAtFrame}-${index}`}
            sender={message.sender}
            text={message.text}
            label={isClient ? clientLabel : AGENT_LABEL}
            avatarSrc={isClient ? clientAvatarSrc : agentAvatarSrc}
            avatarBackground={isClient ? undefined : theme.labsDark}
            appearAtFrame={message.appearAtFrame}
            disappearAtFrame={disappearAtFrame}
            bottom={bottom}
            left={isClient ? slotX : undefined}
            right={isClient ? undefined : slotX}
            width={isClient ? CLIENT_WIDTH : AGENT_WIDTH}
          />
        );
      })}
    </div>
  );
};
