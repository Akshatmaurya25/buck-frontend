"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatHistory {
  id: string;
  timestamp: string;
  preview: string;
}

interface ChatContextType {
  chatHistory: ChatHistory[];
  addChat: (chat: ChatHistory) => void;
  clearHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  // Load chat history from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('chatHistory');
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  }, []);

  // Save chat history to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addChat = (chat: ChatHistory) => {
    setChatHistory(prev => [chat, ...prev].slice(0, 10)); // Keep last 10 chats
  };

  const clearHistory = () => {
    setChatHistory([]);
    sessionStorage.removeItem('chatHistory');
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addChat, clearHistory }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}