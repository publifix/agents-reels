import { AgentReelProps } from "../../types";

export const restauranteCase: AgentReelProps = {
  backgroundVideoSrc: "videos/restaurante-01.mp4",
  clientName: "Diego",
  clientGender: "male",
  businessName: "La Terraza",
  messages: [
    {
      sender: "client",
      text: "hola, tienen mesa disponible el viernes en la noche?",
      appearAtFrame: 20,
    },
    {
      sender: "agent",
      text: "¡Hola! Sí tenemos. ¿Para cuántas personas y a qué hora te gustaría?",
      appearAtFrame: 70,
    },
    {
      sender: "client",
      text: "somos 4, como a las 9",
      appearAtFrame: 120,
    },
    {
      sender: "agent",
      text: "Perfecto, quedas reservado viernes 9pm para 4 personas. ¿Algún requerimiento especial?",
      appearAtFrame: 165,
    },
  ],
  closingLine: "Un agente para cada tipo de negocio",
  websiteUrl: "agents.publifix.net",
};
