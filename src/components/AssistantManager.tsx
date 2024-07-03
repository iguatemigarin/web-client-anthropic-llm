import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, Textarea } from '@chakra-ui/react';
import { useAppContext } from '../contexts/AppContext';

const AssistantManager: React.FC = () => {
  const { assistants, setAssistants, setCurrentAssistant, currentAssistant } = useAppContext();
  const [newAssistant, setNewAssistant] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

  const handleAddAssistant = () => {
    if (newAssistant.trim() !== '' && newPrompt.trim() !== '' && newApiKey.trim() !== '') {
      const newAssistantData = { name: newAssistant, prompt: newPrompt, apiKey: newApiKey };
      setAssistants([...assistants, newAssistantData]);
      setNewAssistant('');
      setNewPrompt('');
      setNewApiKey('');
    }
  };

  const handleSwitchAssistant = (assistant: { name: string; prompt: string; apiKey: string }) => {
    setCurrentAssistant(assistant);
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
        <Input
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          placeholder="Enter API key for the new assistant..."
        />
        <Button onClick={handleAddAssistant} colorScheme="teal">
          Add Assistant
        </Button>
        <Box>
          <Text fontWeight="bold">Available Assistants:</Text>
          {assistants.map((assistant: { name: string; prompt: string; apiKey: string }, index: number) => (
            <Box key={index} onClick={() => handleSwitchAssistant(assistant)} data-devin-id={`assistant-${index}`}>
              <Text>{assistant.name}</Text>
              <Text fontSize="sm">{assistant.prompt}</Text>
            </Box>
          ))}
        </Box>
        <Box>
          <Text fontWeight="bold">Current Assistant:</Text>
          {currentAssistant ? (
            <Box>
              <Text>{currentAssistant.name}</Text>
              <Text fontSize="sm">{currentAssistant.prompt}</Text>
            </Box>
          ) : (
            <Text>No assistant selected</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default AssistantManager;
