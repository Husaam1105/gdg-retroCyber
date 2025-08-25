import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { commandProcessor } from '../utils/commandProcessor';

/**
 * Terminal Hook
 * Manages terminal state, command execution, and output
 */
export const useTerminal = () => {
  const [output, setOutput] = useState([]);
  const { isAuthenticated, currentUser, login, register, logout } = useAuth();

  // Add output line to terminal
  const addOutput = useCallback((content, type = 'response') => {
    setOutput(prev => [...prev, { content, type }]);
  }, []);

  // Execute terminal command
  const executeCommand = useCallback(async (command) => {
    // Add command to output
    addOutput(command, 'command');

    try {
      // Process command through command processor
      const result = await commandProcessor(command, {
        isAuthenticated,
        currentUser,
        login,
        register,
        logout
      });

      // Add result to output
      if (result.success) {
        if (Array.isArray(result.output)) {
          result.output.forEach(line => addOutput(line, result.type || 'response'));
        } else {
          addOutput(result.output, result.type || 'response');
        }
      } else {
        addOutput(result.error, 'error');
      }

    } catch (error) {
      addOutput(`SYSTEM_ERROR: ${error.message}`, 'error');
    }
  }, [isAuthenticated, currentUser, login, register, logout, addOutput]);

  // Clear terminal
  const clearTerminal = useCallback(() => {
    setOutput([]);
  }, []);

  return {
    output,
    isAuthenticated,
    currentUser,
    executeCommand,
    clearTerminal,
    addOutput
  };
};