import React, { useState, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { useAppContext, ChatMessage } from "../contexts/AppContext";

const ChatInput: React.FC = () => {
  const { currentAssistant, chatMessages, setChatMessages } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const newWorker = new Worker(new URL('../apiWorker.js', import.meta.url));
    setWorker(newWorker);

    newWorker.onmessage = (event) => {
      const { success, data, error } = event.data;
      if (success) {
        const assistantMessage: ChatMessage = {
          sender: "assistant",
          text: data.content,
        };
        setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        console.error("Error from web worker:", error);
      }
    };

    return () => {
      newWorker.terminate();
    };
  }, [setChatMessages]);

  const handleSendMessage = () => {
    if (!currentAssistant) return;

    const newMessage: ChatMessage = { sender: "user", text: inputValue };
    setChatMessages([...chatMessages, newMessage]);

    if (worker) {
      worker.postMessage({
        currentAssistant,
        chatMessages,
        inputValue,
      });
    }

    setInputValue("");
  };

  return (
    <Box mt={4}>
      <Input
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isDisabled={!currentAssistant}
      />
      <Button
        onClick={handleSendMessage}
        isDisabled={!currentAssistant || !inputValue}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
