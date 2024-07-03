import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, Textarea } from '@chakra-ui/react';
import { useAppContext } from '../contexts/AppContext';

const AssistantManager: React.FC = () => {
  const { assistants, setAssistants, setCurrentAssistant } = useAppContext();
  const [newAssistant, setNewAssistant] = useState('');
  const [newPrompt, setNewPrompt] = useState('');

  const handleAddAssistant = () => {
    if (newAssistant.trim() !== '' && newPrompt.trim() !== '') {
      const newAssistantData = { name: newAssistant, prompt: newPrompt };
      setAssistants([...assistants, newAssistantData]);
      setNewAssistant('');
      setNewPrompt('');
    }
  };

  const handleSwitchAssistant = (assistantName: string) => {
    setCurrentAssistant(assistantName);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4}>
        <Input
          value={newAssistant}
          onChange={(e) => setNewAssistant(e.target.value)}
          placeholder="Enter new assistant name..."
        />
        <Textarea
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          placeholder="Enter system prompt for the new assistant..."
        />
        <Button onClick={handleAddAssistant} colorScheme="teal">
          Add Assistant
        </Button>
        <Box>
          <Text fontWeight="bold">Available Assistants:</Text>
          {assistants.map((assistant: { name: string; prompt: string }, index: number) => (
            <Box key={index} onClick={() => handleSwitchAssistant(assistant.name)}>
              <Text>{assistant.name}</Text>
              <Text fontSize="sm">{assistant.prompt}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default AssistantManager;
