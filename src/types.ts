export type ClientGender = "female" | "male";

export type MessageSender = "client" | "agent";

export type ChatMessage = {
  sender: MessageSender;
  text: string;
  appearAtFrame: number;
};

export type AgentReelProps = {
  backgroundVideoSrc: string;
  clientName?: string;
  clientGender: ClientGender;
  businessName: string;
  messages: ChatMessage[];
  closingLine: string;
  websiteUrl: string;
};
