
import React, { useState, useCallback, useRef } from 'react';
import type { Chat, Content } from '@google/genai';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { WelcomeScreen } from './components/WelcomeScreen';
import { createChatSession } from './services/geminiService';
import type { ChatMessage, ChatEntry } from './types';
import { MenuIcon } from './components/icons/MenuIcon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const chatRef = useRef<Chat | null>(null);
  const chatsRef = useRef<Record<string, ChatMessage[]>>({});

  const handleNewChat = () => {
    if (isLoading) return;
    setActiveChatId(null);
    setMessages([]);
    chatRef.current = null;
  };
  
  const handleSelectChat = (id: string) => {
    if (isLoading) return;
    setActiveChatId(id);
    const selectedMessages = chatsRef.current[id] || [];
    setMessages(selectedMessages);
    
    const geminiHistory: Content[] = selectedMessages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    chatRef.current = createChatSession(geminiHistory);
  };
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setIsLoading(true);

    let currentChatId = activeChatId;
    if (!currentChatId) {
        currentChatId = Date.now().toString();
        setActiveChatId(currentChatId);
        const newChatEntry: ChatEntry = { id: currentChatId, title: text.substring(0, 30) };
        setChatHistory(prev => [newChatEntry, ...prev]);
        chatRef.current = createChatSession();
    }

    const finalChatId = currentChatId;
    
    setMessages(prev => {
        const newMessages = [...prev, userMessage];
        chatsRef.current[finalChatId] = newMessages;
        return newMessages;
    });

    try {
        const stream = await chatRef.current!.sendMessageStream({ message: text });

        const modelMessage: ChatMessage = { role: 'model', content: '' };
        setMessages(prev => [...prev, modelMessage]);

        for await (const chunk of stream) {
            const chunkText = chunk.text;
            setMessages(prev => {
                const updatedMessages = prev.map((msg, index) =>
                    index === prev.length - 1 
                        ? { ...msg, content: msg.content + chunkText } 
                        : msg
                );
                chatsRef.current[finalChatId] = updatedMessages;
                return updatedMessages;
            });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, something went wrong. Please try again.' };
        setMessages(prev => {
            const newMessages = [...prev.slice(0, -1), errorMessage];
            chatsRef.current[finalChatId] = newMessages;
            return newMessages;
        });
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, activeChatId]);

  return (
    <div className="flex h-screen bg-gpt-dark text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
      />
      <div className="flex-1 flex flex-col relative">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="absolute top-4 left-4 p-2 rounded-md hover:bg-gpt-gray md:hidden z-20"
        >
          <MenuIcon />
        </button>
        <main className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onPromptClick={handleSendMessage} />
          ) : (
            <ChatWindow messages={messages} />
          )}
        </main>
        <div className="w-full px-4 pb-4">
            <div className="max-w-3xl mx-auto">
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                 <p className="text-xs text-center text-gray-400 pt-2">
                    Gemini may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
