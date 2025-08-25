import React, { useState, useEffect } from 'react';

/**
 * Glitch Effect Component
 * Applies randomized glitch effects to text
 */
const GlitchEffect = ({ text, className = '', shouldGlitch = false }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (shouldGlitch) {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 2000 + Math.random() * 3000);

      return () => clearInterval(glitchInterval);
    }
  }, [shouldGlitch]);

  return (
    <span 
      className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}
      style={isGlitching ? {
        textShadow: `
          -1px 0 #ff006e,
          1px 0 #0066ff,
          0 -1px #00ff41,
          0 1px #ff006e
        `
      } : {}}
    >
      {text}
    </span>
  );
};

export default GlitchEffect;