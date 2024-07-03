import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ChatDisplay: React.FC = () => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <Text>Chat messages will be displayed here.</Text>
    </Box>
  );
};

export default ChatDisplay;
