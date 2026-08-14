import { AgentReelProps } from "../../types";

export const hotelCase: AgentReelProps = {
  backgroundVideoSrc: "videos/hotel-01.mp4",
  clientGender: "female",
  businessName: "Hotel Casa Vista",
  messages: [
    {
      sender: "client",
      text: "hola! tienen disponibilidad para este fin de semana?",
      appearAtFrame: 20,
    },
    {
      sender: "agent",
      text: "¡Hola! Sí, nos queda una habitación doble para sábado y domingo. ¿Para cuántas personas sería?",
      appearAtFrame: 70,
    },
    {
      sender: "client",
      text: "para 2, vamos con mi pareja",
      appearAtFrame: 120,
    },
    {
      sender: "agent",
      text: "Perfecto, te la puedo apartar. ¿Te comparto el link de pago para confirmar tu reserva?",
      appearAtFrame: 165,
    },
  ],
  closingLine: "Un agente para cada tipo de negocio",
  websiteUrl: "agents.publifix.net",
};
