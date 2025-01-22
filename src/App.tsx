import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Terminal from './components/Terminal';
import Chat from './components/Chat';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Navigation isOpen={isNavOpen} toggleNav={() => setIsNavOpen(!isNavOpen)} />
      
      <main className="flex-1 flex">
        <div className="flex-1 bg-white shadow-lg m-4 rounded-lg overflow-hidden">
          <Chat />
        </div>
        <Terminal isOpen={isTerminalOpen} toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} />
      </main>
    </div>
  );
}

export default App;