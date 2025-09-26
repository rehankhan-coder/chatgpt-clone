
import React from 'react';
import type { ChatEntry } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { MessageIcon } from './icons/MessageIcon';
import { UserIcon } from './icons/UserIcon';

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  chatHistory: ChatEntry[];
  onSelectChat: (id: string) => void;
  activeChatId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNewChat, chatHistory, onSelectChat, activeChatId }) => {
  return (
    <div className={`
      bg-[#202123] text-white
      flex flex-col
      h-full
      w-64
      p-2
      transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      absolute z-10 md:z-auto
    `}>
      <button 
        onClick={onNewChat}
        className="flex items-center w-full p-3 rounded-md text-sm hover:bg-gpt-gray transition-colors mb-2"
      >
        <PlusIcon className="w-4 h-4 mr-3" />
        New chat
      </button>
      
      <div className="flex-1 overflow-y-auto">
        <nav>
          <ul>
            {chatHistory.map((chat) => (
              <li key={chat.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectChat(chat.id);
                  }}
                  className={`flex items-center p-3 my-1 rounded-md text-sm truncate transition-colors ${
                    activeChatId === chat.id ? 'bg-gpt-gray' : 'hover:bg-gpt-gray'
                  }`}
                >
                  <MessageIcon className="w-4 h-4 mr-3 flex-shrink-0"/>
                  {chat.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="border-t border-gray-700 pt-2">
         <a
          href="#"
          className="flex items-center p-3 rounded-md text-sm hover:bg-gpt-gray transition-colors"
        >
          <UserIcon className="w-5 h-5 mr-3 rounded-full"/>
          <span className="truncate">User Profile</span>
        </a>
      </div>
    </div>
  );
};
