import React, { useState, useEffect } from 'react';

/**
 * Typing Animation Component
 * Creates realistic character-by-character typing effect
 */
const TypingText = ({ 
  text, 
  speed = 100, 
  className = '', 
  onComplete,
  delay = 0,
  showCursor = true 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      
      return () => clearTimeout(delayTimer);
    } else {
      setHasStarted(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed + Math.random() * 50); // Add slight randomness for realism

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, hasStarted, isComplete, onComplete]);

  if (!hasStarted) {
    return null;
  }

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="animate-blink text-cyber-green">█</span>
      )}
    </span>
  );
};

export default TypingText;