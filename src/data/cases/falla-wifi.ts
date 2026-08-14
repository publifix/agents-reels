import { AgentReelProps } from "../../types";

export const fallaWifiCase: AgentReelProps = {
  backgroundVideoSrc: "videos/falla-wifi-01.mp4",
  clientGender: "male",
  businessName: "Conecta+",
  messages: [
    {
      sender: "client",
      text: "hola buenas, se me anda cayendo el wifi desde ayer",
      appearAtFrame: 20,
    },
    {
      sender: "agent",
      text: "Hola, qué pena. ¿Me confirmas tu número de servicio o la dirección donde está instalado?",
      appearAtFrame: 70,
    },
    {
      sender: "client",
      text: "Av. Constituyentes 245, depa 3B",
      appearAtFrame: 120,
    },
    {
      sender: "agent",
      text: "Perfecto, ya veo tu línea. Hay una intermitencia en tu zona, la estamos resolviendo, debería normalizarse en un par de horas",
      appearAtFrame: 165,
    },
  ],
  closingLine: "Un agente para cada tipo de negocio",
  websiteUrl: "agents.publifix.net",
};
