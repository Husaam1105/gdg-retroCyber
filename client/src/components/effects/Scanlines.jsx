import React from 'react';

/**
 * Scanlines Effect Component
 * Creates the CRT monitor scanlines overlay
 */
const Scanlines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #00ff41 2px,
            #00ff41 4px
          )`,
        }}
      />
      {/* Moving scanline */}
      <div 
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-20 animate-scanlines"
        style={{
          animation: 'scanlines 3s linear infinite'
        }}
      />
    </div>
  );
};

export default Scanlines;