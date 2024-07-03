import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Placeholder function to handle sending the message
    console.log('Message sent:', message);
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
