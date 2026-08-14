import React from "react";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { BackgroundMedia } from "./components/BackgroundMedia";
import { ChatOverlay } from "./components/ChatOverlay";
import {
  ClosingSequence,
  CLOSING_DURATION_IN_FRAMES,
} from "./sequences/ClosingSequence";
import { getRandomName } from "./data/names";
import { AgentReelProps } from "./types";

type AgentReelComponentProps = AgentReelProps & {
  backgroundVideoExists?: boolean;
};

const checkStaticFileExists = async (relativeSrc: string): Promise<boolean> => {
  try {
    const response = await fetch(staticFile(relativeSrc), { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

export const calculateAgentReelMetadata: CalculateMetadataFunction<
  AgentReelComponentProps
> = async ({ props }) => {
  const backgroundVideoExists = await checkStaticFileExists(
    props.backgroundVideoSrc,
  );

  return {
    props: {
      ...props,
      clientName: props.clientName ?? getRandomName(props.clientGender),
      backgroundVideoExists,
    },
  };
};

export const AgentReel: React.FC<AgentReelComponentProps> = ({
  backgroundVideoSrc,
  backgroundVideoExists = true,
  clientName,
  clientGender,
  messages,
  closingLine,
  websiteUrl,
}) => {
  const { durationInFrames } = useVideoConfig();
  const closingStartFrame = durationInFrames - CLOSING_DURATION_IN_FRAMES;
  const resolvedClientName = clientName ?? getRandomName(clientGender);

  return (
    <AbsoluteFill>
      <BackgroundMedia
        backgroundVideoSrc={backgroundVideoSrc}
        backgroundVideoExists={backgroundVideoExists}
      />
      <Sequence durationInFrames={closingStartFrame}>
        <ChatOverlay
          messages={messages}
          clientLabel={resolvedClientName}
          clientAvatarSrc="logo/avatar-generic.svg"
          agentAvatarSrc="logo/avatar-labs.png"
        />
      </Sequence>
      <Sequence from={closingStartFrame}>
        <ClosingSequence closingLine={closingLine} websiteUrl={websiteUrl} />
      </Sequence>
    </AbsoluteFill>
  );
};
