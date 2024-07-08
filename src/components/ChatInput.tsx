import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { useAppContext, ChatMessage } from "../contexts/AppContext";

const ChatInput: React.FC = () => {
  const { currentAssistant, chatMessages, setChatMessages } = useAppContext();
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (!currentAssistant) return;

    const newMessage: ChatMessage = { sender: "user", text: inputValue };
    setChatMessages([...chatMessages, newMessage]);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": currentAssistant.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          system: currentAssistant.prompt,
          messages: [
            ...chatMessages.map((msg) => ({
              role: msg.sender,
              content: msg.text,
            })),
            { role: "user", content: inputValue },
          ],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      if (data.content) {
        const assistantMessage: ChatMessage = {
          sender: "assistant",
          text: data.content,
        };
        setChatMessages([...chatMessages, newMessage, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
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
