import "./index.css";
import { Composition } from "remotion";
import { AgentReel, calculateAgentReelMetadata } from "./AgentReel";
import { AgentReelProps } from "./types";

export const FPS = 30;
export const DEFAULT_DURATION_IN_FRAMES = 270;

const defaultProps: AgentReelProps = {
  backgroundVideoSrc: "videos/demo-background.mp4",
  clientGender: "female",
  businessName: "Publifix",
  messages: [
    {
      sender: "client",
      text: "Hola, vi su anuncio, ¿siguen agendando citas?",
      appearAtFrame: 10,
    },
    {
      sender: "agent",
      text: "¡Claro! Puedo agendarte hoy mismo, ¿qué día te acomoda?",
      appearAtFrame: 55,
    },
    {
      sender: "client",
      text: "¿Tienen disponibilidad mañana por la tarde?",
      appearAtFrame: 100,
    },
    {
      sender: "agent",
      text: "Sí, tengo un espacio a las 4pm. Te confirmo por WhatsApp.",
      appearAtFrame: 145,
    },
  ],
  closingLine: "Así de fácil es automatizar tu negocio.",
  websiteUrl: "agents.publifix.net",
};

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
        defaultProps={defaultProps}
        calculateMetadata={calculateAgentReelMetadata}
      />
    </>
  );
};
