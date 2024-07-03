import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

const AssistantManager: React.FC = () => {
  const [assistants, setAssistants] = useState<string[]>([]);
  const [newAssistant, setNewAssistant] = useState('');

  const handleAddAssistant = () => {
    if (newAssistant.trim() !== '') {
      setAssistants([...assistants, newAssistant]);
      setNewAssistant('');
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4}>
        <Input
          value={newAssistant}
          onChange={(e) => setNewAssistant(e.target.value)}
          placeholder="Enter new assistant name..."
        />
        <Button onClick={handleAddAssistant} colorScheme="teal">
          Add Assistant
        </Button>
        <Box>
          <Text fontWeight="bold">Available Assistants:</Text>
          {assistants.map((assistant, index) => (
            <Text key={index}>{assistant}</Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default AssistantManager;
