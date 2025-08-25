import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { ASCII_ART } from '../constants/asciiArt';
import TypingText from './TypingText';
import CommandInput from './CommandInput';
import Scanlines from './effects/Scanlines';
import GlitchEffect from './effects/GlitchEffect';

/**
 * Main Terminal Window Component
 * Renders the retro-cyber terminal interface with all visual effects
 */
const TerminalWindow = () => {
  const {
    output,
    isAuthenticated,
    currentUser,
    executeCommand,
    clearTerminal
  } = useTerminal();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeStage, setWelcomeStage] = useState(0);
  const terminalRef = useRef(null);

  // Auto-scroll terminal to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Handle welcome sequence completion
  const handleWelcomeComplete = () => {
    if (welcomeStage === 2) {
      setTimeout(() => setShowWelcome(false), 2500);
    }
    setWelcomeStage(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-terminal-bg overflow-hidden">
      {/* Scanlines Effect */}
      <Scanlines />
      
      {/* Main Terminal Container */}
      <div className="relative z-10 min-h-screen p-4 flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full">
          
          {/* Terminal Header */}
          <div className="border border-cyber-green rounded-t-lg bg-terminal-bg bg-opacity-90">
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-green">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
              </div>
              <div className="text-cyber-green text-sm font-mono">
                RETRO_CYBER_TERMINAL_v2.1.4
              </div>
              <div className="text-cyber-green text-sm font-mono">
                {isAuthenticated ? `USER: ${currentUser?.username}` : 'GUEST'}
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="border-x border-cyber-green bg-terminal-bg bg-opacity-90 p-6 font-terminal text-cyber-green min-h-[500px] max-h-[70vh] overflow-y-auto scrollbar-terminal"
          >
            
            {/* Welcome Screen */}
            {showWelcome && (
              <div className="mb-8">
                {/* ASCII Art */}
                <div className="text-cyber-blue text-xs leading-none mb-4 whitespace-pre">
                  {ASCII_ART.CYBER_SHIELD}
                </div>
                
                {/* Welcome Message with Typing Effect */}
                <TypingText 
                  text="INITIALIZING OPERATION... ACCESSING DIGITAL VAULT..."
                  className="text-cyber-magenta text-2xl font-bold mb-2"
                  speed={50}
                  onComplete={handleWelcomeComplete}
                  showCursor={welcomeStage === 0}
                />
                
                {welcomeStage > 0 && (
                  <div className="mt-4 space-y-2">
                    <TypingText 
                      text="PROTOCOL 'CLASSIFIED_LEGAL_FILE_RETRIEVAL' ACTIVE"
                      className="text-cyber-blue"
                      speed={50}
                      onComplete={handleWelcomeComplete}
                      showCursor={welcomeStage === 1}
                    />
                  </div>
                )}
                
                {welcomeStage > 1 && (
                  <div className="mt-4 space-y-2">
                    <TypingText 
                      text="DECRYPTION_PROTOCOL_V1.1.2_ACTIVE"
                      className="text-cyber-blue"
                      speed={50}
                      delay={500}s
                      onComplete={handleWelcomeComplete}
                      showCursor={welcomeStage === 2}
                    />
                  </div>
                )}

                {/* Final message after welcome screen */}
                {welcomeStage > 2 && (
                    <div className="mt-4 text-cyber-green animate-typing overflow-hidden whitespace-nowrap">
                        ENTER `help` TO SEE ALL AVAILABLE COMMANDS
                    </div>
                )}
                
                    {/* =========================================================
                                  HIDDEN_CLUE_1: Cipher Challenge
                      ========================================================= */}

                    {/* Cipher: "ohjdo-ohjoh-2024" */}
                    {/* Hint: Sometimes justice is just 3 steps back... */}
                    {/* Once deciphered, use the command: decipher <your-answer> */}

                
              </div>
            )}

            {/* Terminal Output */}
            {!showWelcome && (
              <div className="space-y-2">
                {output.map((line, index) => (
                  <div key={index} className="flex">
                    {line.type === 'command' && (
                      <span className="text-cyber-blue mr-2">$&gt;</span>
                    )}
                    <GlitchEffect 
                      text={line.content} 
                      className={line.type === 'error' ? 'text-red-500' : 'text-cyber-green'}
                      shouldGlitch={line.type === 'error'}
                    />
                  </div>
                ))}
              </div>
            )}
            
          </div>

          {/* Command Input */}
          {!showWelcome && (
            <CommandInput 
              onCommandExecute={executeCommand}
              isAuthenticated={isAuthenticated}
            />
          )}

        </div>
      </div>

      {/* Hidden Interactive Element for Puzzle Clue #2 */}
      {!showWelcome && isAuthenticated && (
        <div 
          className="fixed bottom-4 right-4 w-2 h-2 bg-terminal-bg cursor-pointer hover-secret-element"
          title="Investigate this..."
          style={{ zIndex: 1000 }}
        >
          <span className="hidden-command-clue opacity-0 hover:opacity-100 transition-opacity duration-300 absolute bottom-full right-0 bg-terminal-bg border border-cyber-green p-2 text-xs whitespace-nowrap">
            Execute: access-evidence
          </span>
        </div>
      )}
    </div>
  );
};

export default TerminalWindow;
