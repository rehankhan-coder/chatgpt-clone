
import { GoogleGenAI, Chat, Content } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (history?: Content[]): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: 'You are a helpful assistant, mimicking the style of ChatGPT. Your responses should be formatted in Markdown.',
    },
  });
  return chat;
};
