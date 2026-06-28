import React from 'react';

export default function ContractBriefing({ onNext }: { onNext: () => void }) {
  return (
    <div 
      style={{
        backgroundImage: 'url(/contract.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div 
        onClick={onNext}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '400px',
          padding: '18px 32px',
          borderRadius: '12px',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)';
          e.currentTarget.style.backgroundColor = '#16a34a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = '#22c55e';
        }}
      >
        <span style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#000',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center',
        }}>
          ПЕРЕЙТИ К ЗАЯВКЕ
        </span>
      </div>
    </div>
  );
}