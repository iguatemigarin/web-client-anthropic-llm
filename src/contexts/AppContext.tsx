import React, { createContext, useContext, useState, ReactNode } from "react";

interface Assistant {
  name: string;
  prompt: string;
  apiKey: string;
}

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

interface AppContextProps {
  assistants: Assistant[];
  setAssistants: React.Dispatch<React.SetStateAction<Assistant[]>>;
  currentAssistant: Assistant | null;
  setCurrentAssistant: React.Dispatch<React.SetStateAction<Assistant | null>>;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null>(
    null
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  return (
    <AppContext.Provider
      value={{
        assistants,
        setAssistants,
        currentAssistant,
        setCurrentAssistant,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export type { Assistant, ChatMessage };
