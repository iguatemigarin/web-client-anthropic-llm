import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { AppProvider } from "./contexts/AppContext";
import AssistantManager from "./components/AssistantManager";
import ChatDisplay from "./components/ChatDisplay";
import ChatInput from "./components/ChatInput";

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <Box p={4}>
          <AssistantManager />
          <ChatDisplay />
          <ChatInput />
        </Box>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
