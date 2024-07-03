import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from './contexts/AppContext';
import AssistantManager from './components/AssistantManager';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './components/ChatInput';

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <div className="App">
          <header className="App-header">
            <AssistantManager />
            <ChatDisplay />
            <ChatInput />
          </header>
        </div>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
