
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { default as ReactMarkdown } from 'https://esm.sh/react-markdown@9';
import { default as rehypeRaw } from 'https://esm.sh/rehype-raw@7';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`py-6 ${isModel ? 'bg-gpt-light-dark' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 flex">
        <div className="w-8 h-8 flex-shrink-0 mr-4">
          {isModel ? 
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <GeminiIcon className="w-6 h-6"/>
            </div>
             : 
            <UserIcon className="w-8 h-8 rounded-full" />}
        </div>
        <div className="flex-1 text-gpt-text prose prose-invert max-w-none prose-p:my-0 prose-pre:bg-[#202123] prose-pre:p-4 prose-pre:rounded-md">
           <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
