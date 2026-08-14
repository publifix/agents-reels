import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { ChatMessage, MessageSender } from "../types";
import { estimateBubbleHeight } from "../utils/bubbleLayout";
import { ChatBubble } from "./ChatBubble";

const MAX_VISIBLE = 4;
const BUBBLE_GAP = 18; // vertical air between stacked bubbles
const SLOT_STEP_X = 44;
const CLIENT_WIDTH = 560;
const AGENT_WIDTH = 620;
const CONTAINER_BOTTOM_MARGIN = 210;
const NEWEST_BUBBLE_BOTTOM = 40;

const AGENT_LABEL = "LABS Agent";

const widthForSender = (sender: MessageSender): number =>
  sender === "client" ? CLIENT_WIDTH : AGENT_WIDTH;

export const ChatOverlay: React.FC<{
  messages: ChatMessage[];
  clientLabel: string;
  clientAvatarSrc: string;
  agentAvatarSrc: string;
}> = ({ messages, clientLabel, clientAvatarSrc, agentAvatarSrc }) => {
  const frame = useCurrentFrame();

  const sorted = [...messages].sort(
    (a, b) => a.appearAtFrame - b.appearAtFrame,
  );

  // Each of the MAX_VISIBLE vertical slots cycles through messages
  // (slot = index % MAX_VISIBLE) as the conversation grows. Group
  // messages by slot up front so we can find each slot's current
  // occupant at the current frame.
  const messagesBySlot: ChatMessage[][] = Array.from(
    { length: MAX_VISIBLE },
    () => [],
  );
  sorted.forEach((message, index) => {
    messagesBySlot[index % MAX_VISIBLE].push(message);
  });

  const slotOccupant = (slot: number): ChatMessage | undefined => {
    const slotMessages = messagesBySlot[slot];
    for (let i = slotMessages.length - 1; i >= 0; i -= 1) {
      if (slotMessages[i].appearAtFrame <= frame) {
        return slotMessages[i];
      }
    }
    return undefined;
  };

  // Stack slots bottom-up (slot MAX_VISIBLE-1 nearest the baseline, slot 0
  // farthest away), using each slot's *current* occupant real height —
  // measured from its actual text/width, not a fixed guess — plus a fixed
  // air gap. This keeps every new bubble positioned right below the real
  // bottom edge of the one above it, with no overlap regardless of how
  // many lines a message wraps to.
  const slotBottom: number[] = new Array(MAX_VISIBLE).fill(
    NEWEST_BUBBLE_BOTTOM,
  );
  let cursor = NEWEST_BUBBLE_BOTTOM;
  for (let slot = MAX_VISIBLE - 1; slot >= 0; slot -= 1) {
    slotBottom[slot] = cursor;
    const occupant = slotOccupant(slot);
    if (occupant) {
      const height = estimateBubbleHeight(
        occupant.text,
        widthForSender(occupant.sender),
      );
      cursor += height + BUBBLE_GAP;
    }
  }

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
        const disappearAtFrame = nextSameSlot?.appearAtFrame ?? null;
        const isClient = message.sender === "client";
        const slotX = slot * SLOT_STEP_X;

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
            bottom={slotBottom[slot]}
            left={isClient ? slotX : undefined}
            right={isClient ? undefined : slotX}
            width={widthForSender(message.sender)}
          />
        );
      })}
    </div>
  );
};
