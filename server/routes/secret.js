const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Protected Secret Key Endpoint
 * Returns the final secret key only to authenticated users
 * This is part of the investigative puzzle mechanism
 */
router.get('/reveal', authenticateToken, async (req, res) => {
  try {
    // Generate timestamp for uniqueness
    const timestamp = new Date().toISOString();
    
    // The final secret key - this is what users are hunting for!
    const secretKey = 'DIDDY_LEGAL_EVIDENCE_2024_CASE_FILES_RECOVERED';
    
    // Additional puzzle completion data
    const puzzleData = {
      secretKey,
      message: 'CASE SOLVED: You have successfully recovered all evidence files for Sean "Diddy" Combs legal defense!',
      achievement: 'ELITE_DETECTIVE',
      completedAt: timestamp,
      level: 'MASTER_INVESTIGATOR',
      additionalInfo: {
        cluesFound: 3,
        totalSteps: ['CIPHER_DECRYPTION', 'SYSTEM_SCAN', 'EVIDENCE_ACCESS'],
        difficulty: 'EXPERT_LEVEL',
        hint: 'Justice prevails when dedicated detectives never give up on the truth :)'
      }
    };

    res.json({
      success: true,
      message: 'EVIDENCE_RECOVERED: Critical case files successfully accessed',
      data: puzzleData
    });

  } catch (error) {
    console.error('Secret endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'EVIDENCE_ERROR: Unable to access case files'
    });
  }
});

/**
 * Puzzle Status Endpoint
 * Provides information about the puzzle mechanism
 */
router.get('/status', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'CASE_STATUS: Legal investigation protocol active',
      data: {
        investigationActive: true,
        stepsRequired: 3,
        currentStep: 'EVIDENCE_RECOVERY',
        hint: 'Execute the access command you discovered to recover the evidence files',
        warning: 'Only authorized detectives may access case files'
      }
    });

  } catch (error) {
    console.error('Status endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'CASE_ERROR: Investigation status unavailable'
    });
  }
});

module.exports = router;