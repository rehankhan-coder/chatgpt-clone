
import React from 'react';
import { GeminiIcon } from './icons/GeminiIcon';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const ExamplePrompt: React.FC<{ title: string; subtitle: string; onClick: () => void }> = ({ title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 border border-gpt-gray rounded-lg hover:bg-gpt-gray transition-colors"
  >
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </button>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptClick }) => {
  const prompts = [
    { title: "Design a database schema", subtitle: "for an online learning platform" },
    { title: "Plan a trip", subtitle: "to see the best of Japan's national parks" },
    { title: "Write a thank-you note", subtitle: "to my interviewer" },
    { title: "Tell me a fun fact", subtitle: "about the Roman Empire" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-block p-3 bg-white rounded-full mb-4">
          <GeminiIcon className="w-8 h-8"/>
        </div>
        <h1 className="text-4xl font-bold mb-10">How can I help you today?</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((prompt, i) => (
            <ExamplePrompt 
              key={i} 
              title={prompt.title} 
              subtitle={prompt.subtitle} 
              onClick={() => onPromptClick(`${prompt.title} ${prompt.subtitle}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
