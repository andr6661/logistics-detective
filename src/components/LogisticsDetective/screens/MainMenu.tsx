import React from 'react';

export default function MainMenu({ onStart }: { onStart: () => void }) {
  return (
    <div 
      style={{
        backgroundImage: 'url(/helloImage.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        onClick={onStart}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: '#facc15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          boxShadow: '0 0 40px rgba(250, 204, 21, 0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={{ 
          fontSize: '24px', 
          fontWeight: '900', 
          color: '#000',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textAlign: 'center',
        }}>
          НАЧАТЬ<br/>ИГРУ
        </span>
      </div>
    </div>
  );
}