import { puzzleAPI, systemAPI } from './api';

/**
 * Command Processor
 * Handles all terminal commands and their execution
 */

// Track discovered clues
let discoveredClues = {
  clue1: false,
  clue2: false,
  clue3: false
};

export const commandProcessor = async (command, context) => {
  const { isAuthenticated, currentUser, login, register, logout } = context;
  const [cmd, ...args] = command.toLowerCase().split(' ');

  switch (cmd) {
    case 'case':
      return {
        success: true,
        output: [
          '=========================================================',
          '                 HIDDEN_CLUE_1: Cipher Challenge',
          '=========================================================',
          '',
          'Cipher: "ohjdo-ohjoh-2024"',
          'Hint: Sometimes justice is just 3 steps back...',
          '',
          'Once deciphered, use the command: decipher <your-answer>'
        ]
      };

    case 'decipher':
      if (args.length === 0) {
        return {
          success: false,
          error: 'Usage: decipher <code>'
        };
      }
      
      const code = args.join(' ').toLowerCase();

       if (!isAuthenticated) {
        return {
          success: false,
          error: 'ACCESS_DENIED: Detective authentication required for evidence access'
        };
      }

      const correctDecipheredCode = 'legal-eagle-2024';   
      if (code === correctDecipheredCode) {
        discoveredClues.clue1 = true;
        return {
          success: true,
          output: [
            '🔓 CIPHER DECODED SUCCESSFULLY!',
            '─────────────────────────────',
            '✅ CLUE 1/3 DISCOVERED',
            '',
            '📋 DECODED MESSAGE:',
            '"The defense team needs access to encrypted files. A corrupted command was found in the system. Your next step is to repair the command."',
            '',
            '⚠️ ERROR: Corrupted command detected!',
            '"oh looks like there\'s something wrong with the command..."',
            '',
            '💡 HINT: The corrupted command is "7226". It is encrypted with a classic mobile keypad (T9) encryption. Use the hint to decipher it.',
            '      7 = PQRS, 2 = ABC, 6 = MNO',
            '      Translate digits into letters to repair the command.',
            '',
            '🔧 FIX IT: Use the "repair" command to fix the corrupted command and reveal the next step.',

          ]
        };
      } else {
        return {
          success: false,
          error: 'CIPHER_ERROR: Invalid decryption key. Keep investigating...'
        };
      }

    case 'help':
      return {
        success: true,
        output: [
          '🕵️ LEGAL INVESTIGATION TERMINAL',
          '═══════════════════════════════════════',
          '         DETECTIVE COMMANDS',
          '═══════════════════════════════════════',
          '',
          '📋 BASIC OPERATIONS:',
          '  help              - Show this help menu',
          '  status            - Show system status',
          '  whoami            - Display current user info',
          '',
          '🔐 SECURITY ACCESS:',
          '  login <username> <password>  - Gain clearance',
          '  register <username> <password> - Create new agent profile',
          '  logout            - Revoke security clearance',
          '',
          '🔍 INVESTIGATION TOOLS:',
          '  case              - Get the current case briefing and clue',
          '  decipher <clue>   - Decipher a coded message',
          '  repair <code>   - Repair a corrupted command',
          '  scan              - Scan for system vulnerabilities',
          '',
          '💡 CASE BRIEFING:',
          '  Sean "Diddy" Combs legal team needs your help!',
          '  Critical evidence files are hidden in this system.',
          '  Find all 3 clues to recover the files and save the case.',
          '',
          '🎯 CURRENT OBJECTIVE:',
          '  Use the "case" command to begin your investigation.',
          '',
          '═══════════════════════════════════════'
        ]
      };
    case 'repair':
      if (!discoveredClues.clue1) {
        return {
          success: false,
          error: 'ACCESS_DENIED: Decipher the first clue to unlock this function.'
        };
      }
      
      const repairCode = args.join(' ').toLowerCase();
      if (repairCode === 'scan') {
        discoveredClues.clue2 = true;
        return {
          success: true,
          output: [
            '🛠️ COMMAND REPAIRED SUCCESSFULLY!',
            '─────────────────────────────',
            '✅ CLUE 2/3 DISCOVERED',
            '',
            '📋 NEXT STEP:',
            `"Evidence files are stored in an encrypted partition. Use the "scan" command to locate them."`,
            '',
            '🔍 NEXT STEP: Use the "scan" command to continue investigation',
            '',
            '💡 DETECTIVE TIP: The final clue requires system inspection after scanning.'
          ]
        };
      } else {
        return {
          success: false,
          error: 'COMMAND_REPAIR_FAILED: The command could not be fixed. Check your logic and try again.'
        };
      }

    case 'status':
      try {
        const health = await systemAPI.healthCheck();
        return {
          success: true,
          output: [
            '🖥️  LEGAL INVESTIGATION STATUS',
            '─────────────────────────',
            `System Status: ${health.data.status.toUpperCase()}`,
            `Case: SEAN COMBS DEFENSE`,
            `Investigation Progress: ${Object.values(discoveredClues).filter(Boolean).length}/3 CLUES FOUND`,
            `Authentication: ${isAuthenticated ? 'ACTIVE' : 'INACTIVE'}`,
            isAuthenticated ? `Detective: ${currentUser?.username}` : 'Access Level: GUEST',
            '─────────────────────────',
            Object.values(discoveredClues).filter(Boolean).length === 3 ?
              '🎉 ALL EVIDENCE RECOVERED - CASE READY!' :
              '⚠️  EVIDENCE RECOVERY IN PROGRESS...'
          ]
        };
      } catch (error) {
        return {
          success: false,
          error: 'Failed to retrieve system status'
        };
      }

    case 'whoami':
      return {
        success: true,
        output: isAuthenticated
          ? [
              '🕵️ DETECTIVE PROFILE',
              '─────────────────',
              `Detective ID: ${currentUser?.username}`,
              `Badge Number: ${currentUser?.id}`,
              `Assigned: ${new Date(currentUser?.created_at).toLocaleDateString()}`,
              `Clearance: AUTHORIZED ✅`,
              `Case: SEAN COMBS LEGAL DEFENSE`,
              `Evidence Found: ${Object.values(discoveredClues).filter(Boolean).length}/3`
            ]
          : [
              '🕵️ DETECTIVE PROFILE',
              '─────────────────',
              'Status: UNAUTHORIZED',
              'Clearance Level: NONE',
              'Case Access: DENIED',
              '',
              '💡 Use "login" or "register" to join the investigation'
            ]
      };

    case 'scan':
      if (!discoveredClues.clue2) {
        return {
          success: false,
          error: 'ACCESS_DENIED: Repair the corrupted command to unlock scan function'
        };
      }

      
      return {
        success: true,
        output: [
          '🔍 SYSTEM VULNERABILITY SCAN',
          '─────────────────',
          'Scanning system for security vulnerabilities...',
          '',
          '📊 SCAN RESULTS:',
          '• Encrypted partition detected: /evidence/sealed/ ⚠️',
          '• Hidden UI elements found in interface 👁️',
          '• Interactive access points require investigation 🕵️',
          '• Authentication bypass patterns detected 🔓',
          '',
          '',
          '📋 SCAN ANALYSIS:',
          '"Evidence files are stored in encrypted partition. Look for interactive elements in the terminal interface. Hover over suspicious areas to find access commands."',
          '',
          '🎯 FINAL STEP: Investigate the terminal interface carefully.',
          'Look for hidden interactive elements that might reveal',
          'the final access command needed to retrieve evidence.',
          '',
          '💡 DETECTIVE TIP: The final clue is hiding in plain sight. Check every corner!'
        ]
      };

    case 'login':
      if (args.length < 2) {
        return {
          success: false,
          error: 'Usage: login <username> <password>'
        };
      }
      
      if (isAuthenticated) {
        return {
          success: false,
          error: `Already authenticated as Detective ${currentUser?.username}. Use "logout" first.`
        };
      }

      try {
        const result = await login(args[0], args[1]);
        if (result.success) {
          return {
            success: true,
            output: [
              '🔓 DETECTIVE ACCESS GRANTED',
              '─────────────────',
              '✅ Authentication successful',
              `Welcome, Detective ${args[0]}!`,
              'You now have access to the legal investigation system.',
              '',
              '🎯 MISSION BRIEFING:',
              'Sean "Diddy" Combs legal team needs your help! Critical evidence',
              'files are hidden in this system. Your job is to find',
              'all 3 clues to recover the files and save the case.',
              '',
              '💡 START HERE: Look around the terminal for hidden clues...'
            ]
          };
        } else {
          return {
            success: false,
            error: result.error
          };
        }
      } catch (error) {
        return {
          success: false,
          error: 'Authentication system error'
        };
      }

    case 'register':
      if (args.length < 2) {
        return {
          success: false,
          error: 'Usage: register <username> <password>'
        };
      }
      
      if (isAuthenticated) {
        return {
          success: false,
          error: 'Already authenticated as detective. Logout first to register new account.'
        };
      }

      try {
        const result = await register(args[0], args[1]);
        if (result.success) {
          return {
            success: true,
            output: [
              '📝 DETECTIVE REGISTRATION COMPLETE',
              '─────────────────────────',
              '✅ New detective account created',
              `Detective ID: ${args[0]}`,
              'You are now authorized for the investigation.',
              '',
              '🎯 URGENT CASE ASSIGNMENT:',
              'Sean "Diddy" Combs legal team needs your immediate help!',
              'Critical evidence files are hidden in this system.',
              'Find all 3 clues to recover the files and save the case.',
              '',
              '💡 BEGIN INVESTIGATION: Look for hidden clues "IN" the TerminalWindow...',
              '',
              '',
              'HINT: Dig deeper into its blueprints (`TerminalWindow.jsx`) to uncover the hidden clue.'
            ]
          };
        } else {
          return {
            success: false,
            error: result.error
          };
        }
      } catch (error) {
        return {
          success: false,
          error: 'Registration system error'
        };
      }

    case 'logout':
      if (!isAuthenticated) {
        return {
          success: false,
          error: 'Not currently authenticated as detective'
        };
      }

      const logoutResult = logout();
      return {
        success: true,
        output: [
          '🔒 DETECTIVE SESSION ENDED',
          '──────────────────',
          '✅ Authentication session terminated',
          'All case access permissions revoked.',
          'Investigation progress saved.',
          '',
          '💡 Use "login" to resume your investigation'
        ]
      };

    case 'access-evidence':
      discoveredClues.clue3 = true;
      if (!isAuthenticated) {
        return {
          success: false,
          error: 'ACCESS_DENIED: Detective authentication required for evidence access'
        };
      }

      if (!discoveredClues.clue3) {
        return {
          success: false,
          error: 'EVIDENCE_LOCKED: Complete investigation steps to unlock evidence access'
        };
      }

      try {
        const secretData = await puzzleAPI.revealSecret();
        
        if (secretData.success) {
          return {
            success: true,
            output: [
              '🏆 CASE SOLVED! EVIDENCE RECOVERED! 🏆',
              '═══════════════════════════════════════',
              '',
              '📁 CRITICAL EVIDENCE FILES ACCESSED:',
              `🔑 Access Key: ${secretData.data.secretKey}`,
              '',
              '🎖️  DETECTIVE ACHIEVEMENT:',
              `     ${secretData.data.achievement}`,
              `     Rank: ${secretData.data.level}`,
              '',
              '📊 INVESTIGATION SUMMARY:',
              `   • Evidence Pieces: ${secretData.data.additionalInfo.cluesFound}/3 ✅`,
              `   • Case Complexity: ${secretData.data.additionalInfo.difficulty}`,
              `   • Solved: ${new Date(secretData.data.completedAt).toLocaleString()}`,
              '',
              '🛤️  INVESTIGATION PATHWAY:',
              ...secretData.data.additionalInfo.totalSteps.map((step, i) =>
                `   ${i + 1}. ${step.replace('_', ' ')} ✅`
              ),
              '',
              '⚖️  LEGAL IMPACT:',
              'The recovered evidence files contain crucial information',
              'that will significantly strengthen Sean "Diddy" Combs\'',
              'legal defense. Your detective work has potentially',
              'saved the case and ensured justice prevails!',
              '',
              '💭 DETECTIVE WISDOM:',
              `     "${secretData.data.additionalInfo.hint}"`,
              '',
              '═══════════════════════════════════════',
              '🎉 CONGRATULATIONS, DETECTIVE!',
              'You have successfully recovered all evidence files',
              'for the Sean Combs legal defense case!',
              '',
              'The legal team can now proceed with confidence.',
              'Justice will be served thanks to your skills!',
              '═══════════════════════════════════════'
            ]
          };
        } else {
          return {
            success: false,
            error: secretData.message
          };
        }
      } catch (error) {
        return {
          success: false,
          error: 'Failed to access evidence files: ' + error.message
        };
      }

    default:
      return {
        success: false,
        error: `Unknown command: ${cmd}. Type 'help' for investigation commands.`
      };
  }
};