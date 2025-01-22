import React, { useState, useCallback, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight, ChevronLeft } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  toggleTerminal: () => void;
}

const MIN_WIDTH = 300;
const MAX_WIDTH = 800;

const Terminal: React.FC<TerminalProps> = ({ isOpen, toggleTerminal }) => {
  const [logs] = useState<string[]>([
    '> WebSocket connection established',
    '> Listening for messages...'
  ]);
  const [width, setWidth] = useState(384);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newWidth = window.innerWidth - e.clientX;
      setWidth(Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH));
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      className={`h-full bg-gray-900 text-green-400 transition-all duration-300 flex ${
        isOpen ? '' : 'w-10'
      }`}
      style={{ width: isOpen ? width : 40 }}
    >
      <div
        className={`w-1 cursor-col-resize hover:bg-blue-500 active:bg-blue-600 ${
          isDragging ? 'bg-blue-600' : 'bg-transparent'
        }`}
        onMouseDown={handleMouseDown}
      />
      <button 
        onClick={toggleTerminal}
        className="self-center -mr-3 z-10 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
        aria-label={isOpen ? 'Collapse terminal' : 'Expand terminal'}
      >
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
      <div className="flex flex-col flex-1">
        {isOpen && (
          <>
            <div className="flex items-center justify-between p-2 bg-gray-800">
              <div className="flex items-center space-x-2">
                <TerminalIcon size={16} />
                <span className="text-sm font-mono">Console</span>
              </div>
            </div>
            <div className="flex-1 p-2 overflow-y-auto font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Terminal;