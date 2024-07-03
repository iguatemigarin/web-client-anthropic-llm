import React, { createContext, useState, useContext, ReactNode } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils';

interface Assistant {
  name: string;
  prompt: string;
  apiKey: string;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

interface AppContextProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  chatConfig: any;
  setChatConfig: (config: any) => void;
  currentAssistant: Assistant | null;
  setCurrentAssistant: (assistant: Assistant) => void;
  assistants: Assistant[];
  setAssistants: (assistants: Assistant[]) => void;
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(getFromLocalStorage('apiKey') || '');
  const [chatConfig, setChatConfigState] = useState<any>(getFromLocalStorage('chatConfig') || {});
  const [currentAssistant, setCurrentAssistantState] = useState<Assistant | null>(getFromLocalStorage('currentAssistant') || null);
  const [assistants, setAssistantsState] = useState<Assistant[]>(getFromLocalStorage('assistants') || []);
  const [chatMessages, setChatMessagesState] = useState<ChatMessage[]>(getFromLocalStorage('chatMessages') || []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    saveToLocalStorage('apiKey', key);
  };

  const setChatConfig = (config: any) => {
    setChatConfigState(config);
    saveToLocalStorage('chatConfig', config);
  };

  const setCurrentAssistant = (assistant: Assistant) => {
    setCurrentAssistantState(assistant);
    saveToLocalStorage('currentAssistant', assistant);
  };

  const setAssistants = (assistants: Assistant[]) => {
    setAssistantsState(assistants);
    saveToLocalStorage('assistants', assistants);
  };

  const setChatMessages = (messages: ChatMessage[]) => {
    setChatMessagesState(messages);
    saveToLocalStorage('chatMessages', messages);
  };

  return (
    <AppContext.Provider value={{ apiKey, setApiKey, chatConfig, setChatConfig, currentAssistant, setCurrentAssistant, assistants, setAssistants, chatMessages, setChatMessages }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
