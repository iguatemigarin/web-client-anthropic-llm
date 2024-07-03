import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Text, Textarea, HStack } from '@chakra-ui/react';
import { useAppContext } from '../contexts/AppContext';

const AssistantManager: React.FC = () => {
  const { assistants, setAssistants, setCurrentAssistant, currentAssistant } = useAppContext();
  const [newAssistant, setNewAssistant] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

  useEffect(() => {
    console.log('Assistants:', assistants);
  }, [assistants]);

  const handleAddAssistant = () => {
    if (newAssistant.trim() !== '' && newPrompt.trim() !== '' && newApiKey.trim() !== '') {
      const newAssistantData = { name: newAssistant, prompt: newPrompt, apiKey: newApiKey };
      setAssistants([...assistants, newAssistantData]);
      console.log('Added new assistant:', newAssistantData);
      setNewAssistant('');
      setNewPrompt('');
      setNewApiKey('');
    }
  };

  const handleSwitchAssistant = (assistant: { name: string; prompt: string; apiKey: string }) => {
    console.log('Switching to assistant:', assistant);
    setCurrentAssistant(assistant);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <VStack spacing={4} align="stretch">
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
        <Button onClick={handleAddAssistant} colorScheme="teal" width="100%" _hover={{ bg: 'teal.600' }}>
          Add Assistant
        </Button>
        <Box>
          <Text fontWeight="bold" mb={2}>Available Assistants:</Text>
          {assistants.map((assistant: { name: string; prompt: string; apiKey: string }, index: number) => {
            console.log(`Rendering assistant-${index}`);
            return (
              <Button key={index} onClick={() => handleSwitchAssistant(assistant)} devin-id={`assistant-${index}`} variant="outline" colorScheme="teal" width="100%" mb={2}>
                <HStack justify="space-between" width="100%">
                  <Text>{assistant.name}</Text>
                  <Text fontSize="sm" color="gray.500">{assistant.prompt}</Text>
                </HStack>
              </Button>
            );
          })}
        </Box>
        <Box>
          <Text fontWeight="bold" mb={2}>Current Assistant:</Text>
          {currentAssistant ? (
            <Box p={2} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{currentAssistant.name}</Text>
              <Text fontSize="sm" color="gray.500">{currentAssistant.prompt}</Text>
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
