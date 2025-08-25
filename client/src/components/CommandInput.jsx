import React, { useState, useRef, useEffect } from 'react';

/**
 * Command Input Component
 * Handles user input for the terminal interface
 */
const CommandInput = ({ onCommandExecute, isAuthenticated }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus input on mount and keep it focused
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentCommand.trim()) {
      // Add to history
      setCommandHistory(prev => [...prev, currentCommand.trim()]);
      setHistoryIndex(-1);
      
      // Execute command
      onCommandExecute(currentCommand.trim());
      
      // Clear input
      setCurrentCommand('');
    }
  };

  // Handle key navigation for command history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-cyber-green rounded-b-lg bg-terminal-bg bg-opacity-90 p-4">
      <div className="flex items-center space-x-2">
        <span className="text-cyber-blue font-mono">
          {isAuthenticated ? '🔓' : '🔒'}
        </span>
        <span className="text-cyber-green font-mono">$&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-cyber-green font-terminal border-none outline-none caret-cyber-green"
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck="false"
        />
        <span className="animate-blink text-cyber-green">█</span>
      </div>
    </form>
  );
};

export default CommandInput;