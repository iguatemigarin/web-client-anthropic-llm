import React, { useEffect, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { useAppContext } from "../contexts/AppContext";

const AssistantManager: React.FC = () => {
  const { assistants, setAssistants, currentAssistant, setCurrentAssistant } =
    useAppContext();
  const [newAssistantName, setNewAssistantName] = useState("");
  const [newAssistantPrompt, setNewAssistantPrompt] = useState("");
  const [newAssistantApiKey, setNewAssistantApiKey] = useState("");

  const handleAddAssistant = () => {
    const newAssistant = {
      name: newAssistantName,
      prompt: newAssistantPrompt,
      apiKey: newAssistantApiKey,
    };
    setAssistants([...assistants, newAssistant]);
    console.log("Assistants after addition:", [...assistants, newAssistant]);
    setNewAssistantName("");
    setNewAssistantPrompt("");
    setNewAssistantApiKey("");
  };

  const handleSelectAssistant = (index: number) => {
    setCurrentAssistant(assistants[index]);
  };

  useEffect(() => {
    console.log("Current Assistant:", currentAssistant);
  }, [currentAssistant]);

  return (
    <Box>
      <Input
        placeholder="Assistant Name"
        value={newAssistantName}
        onChange={(e) => setNewAssistantName(e.target.value)}
      />
      <Input
        placeholder="Assistant Prompt"
        value={newAssistantPrompt}
        onChange={(e) => setNewAssistantPrompt(e.target.value)}
      />
      <Input
        placeholder="API Key"
        value={newAssistantApiKey}
        onChange={(e) => setNewAssistantApiKey(e.target.value)}
      />
      <Button onClick={handleAddAssistant} devin-id="0">
        Add Assistant
      </Button>
      {assistants.map((assistant, index) => (
        <Button
          key={index}
          onClick={() => handleSelectAssistant(index)}
          devin-id={`assistant-${index}`}
        >
          {assistant.name}
        </Button>
      ))}
      {currentAssistant && (
        <Box>
          <Input
            placeholder="Assistant Prompt"
            value={currentAssistant.prompt}
            onChange={(e) => {
              const updatedAssistant = {
                ...currentAssistant,
                prompt: e.target.value,
              };
              const updatedAssistants = assistants.map((assistant, i) =>
                i === assistants.indexOf(currentAssistant)
                  ? updatedAssistant
                  : assistant
              );
              setAssistants(updatedAssistants);
            }}
          />
          <Input
            placeholder="API Key"
            value={currentAssistant.apiKey}
            onChange={(e) => {
              const updatedAssistant = {
                ...currentAssistant,
                apiKey: e.target.value,
              };
              const updatedAssistants = assistants.map((assistant, i) =>
                i === assistants.indexOf(currentAssistant)
                  ? updatedAssistant
                  : assistant
              );
              setAssistants(updatedAssistants);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AssistantManager;
