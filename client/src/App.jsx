import React from 'react';
import TerminalWindow from './components/TerminalWindow';
import './App.css';

// Hidden Clue #1: Cipher Challenge
// Detective, you've found the first clue! 
// The legal team left this encrypted message:
// 
// Cipher: "MHJBM-JBHMJ-2024"
// Hint: Replace each letter with the one that comes before it in the alphabet
// 
// Once deciphered, use the command: decipher <your-answer>
// 
// Example: If the cipher was "BCD", the answer would be "ABC"
// 
// Good luck, detective! The case depends on you.

/*
  DETECTIVE NOTES:
  - This is a simple Caesar cipher with shift of +1
  - M->L, H->G, J->I, B->A, M->L, etc.
  - The answer should unlock the next phase of investigation
  - Remember: Diddy's legal team is counting on you!
*/

/**
 * Main Application Component
 * Root component that renders the retro-cyber terminal interface
 */
function App() {
  return (
    <div className="App">
      <TerminalWindow />
    </div>
  );
}

export default App;