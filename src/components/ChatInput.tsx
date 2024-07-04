import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { useAppContext, ChatMessage } from '../contexts/AppContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { currentAssistant, setChatMessages, chatMessages } = useAppContext();

  const handleSendMessage = async () => {
    console.log('handleSendMessage function entered');
    if (message.trim() === '' || !currentAssistant) {
      console.log('Early return: message is empty or currentAssistant is missing');
      return;
    }

    // Placeholder function to handle sending the message
    console.log('Message sent:', message);

    // Send the message to the Anthropic LLM API
    try {
      console.log('Sending request to Anthropic LLM API...');
      const requestBody = {
        prompt: `${currentAssistant.prompt}\nUser: ${message}\nAssistant:`,
        max_tokens: 100,
      };
      console.log('Request body:', requestBody);

      const apiUrl = 'http://localhost:3001/proxy';
      console.log('API URL:', apiUrl);

      console.log('Before fetch call');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${currentAssistant.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log('After fetch call');

      console.log('Response received from Anthropic LLM API:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
        throw new Error('Invalid response format: content array is missing or empty');
      }

      const assistantMessage = data.content[0].text.trim();

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
      <Button onClick={() => { console.log('Send button clicked'); handleSendMessage(); }} colorScheme="teal" isDisabled={!currentAssistant}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
