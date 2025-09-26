
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ChatEntry {
    id: string;
    title: string;
}
