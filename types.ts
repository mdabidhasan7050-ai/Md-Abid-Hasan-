
export type MessageRole = 'user' | 'model';

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface GenerationConfig {
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  quality: "1K" | "2K" | "4K";
}
