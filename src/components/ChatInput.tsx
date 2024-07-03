import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { useAppContext, ChatMessage } from '../contexts/AppContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { currentAssistant, setChatMessages, chatMessages } = useAppContext();

  const handleSendMessage = async () => {
    if (message.trim() === '' || !currentAssistant) return;

    // Placeholder function to handle sending the message
    console.log('Message sent:', message);

    // Send the message to the Anthropic LLM API
    try {
      const response = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentAssistant.apiKey}`,
        },
        body: JSON.stringify({
          prompt: `${currentAssistant.prompt}\nUser: ${message}\nAssistant:`,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const assistantMessage = data.choices[0].text.trim();

      // Update the chat messages in the context
      const newMessages: ChatMessage[] = [
        ...chatMessages,
        { sender: 'user', text: message },
        { sender: 'assistant', text: assistantMessage },
      ];
      setChatMessages(newMessages);
    } catch (error) {
      console.error('Error sending message to Anthropic LLM API', error);
    }

    setMessage('');
  };

  return (
    <Box display="flex" mt={4}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        mr={2}
      />
      <Button onClick={handleSendMessage} colorScheme="teal">
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
