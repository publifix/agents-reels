import { AgentReelProps } from "../../types";

export const persianasCase: AgentReelProps = {
  backgroundVideoSrc: "videos/persianas-01.mp4",
  clientName: "Paola",
  clientGender: "female",
  businessName: "Persianas del Bajío",
  messages: [
    {
      sender: "client",
      text: "buenas tardes, vi su anuncio de persianas motorizadas, hacen visita a domicilio?",
      appearAtFrame: 20,
    },
    {
      sender: "agent",
      text: "Claro que sí, mandamos a alguien a medir sin costo. ¿Para cuántas ventanas sería aprox?",
      appearAtFrame: 70,
    },
    {
      sender: "client",
      text: "son 4 ventanas grandes, sala y recámara",
      appearAtFrame: 120,
    },
    {
      sender: "agent",
      text: "Perfecto, con eso ya te puedo dar una cotización estimada. ¿Qué día te queda bien la visita?",
      appearAtFrame: 165,
    },
  ],
  closingLine: "Un agente para cada tipo de negocio",
  websiteUrl: "agents.publifix.net",
};
