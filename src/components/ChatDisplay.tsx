import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAppContext, ChatMessage } from '../contexts/AppContext';

const ChatDisplay: React.FC = () => {
  const { chatMessages } = useAppContext();

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      {chatMessages.length > 0 ? (
        chatMessages.map((message: ChatMessage, index: number) => (
          <Box key={index} mb={2}>
            <Text fontWeight={message.sender === 'user' ? 'bold' : 'normal'}>
              {message.sender === 'user' ? 'User' : 'Assistant'}: {message.text}
            </Text>
          </Box>
        ))
      ) : (
        <Text>No messages yet.</Text>
      )}
    </Box>
  );
};

export default ChatDisplay;
