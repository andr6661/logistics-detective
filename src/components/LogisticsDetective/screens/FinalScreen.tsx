import React from 'react';

interface FinalScreenProps {
  finalState: {
    isWin: boolean;
    title: string;
    message: string;
    details: string;
    amount: number;
  };
  onRestart: () => void;
}

export default function FinalScreen({ finalState, onRestart }: FinalScreenProps) {
  const { isWin, title, message, details, amount } = finalState;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isWin ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
      backdropFilter: 'blur(10px)',
      zIndex: 300,
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        padding: '48px 40px',
        borderRadius: '24px',
        textAlign: 'center',
        border: `2px solid ${isWin ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>
          {isWin ? '🏆' : '❌'}
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: isWin ? '#10b981' : '#ef4444',
          marginBottom: '12px',
        }}>
          {title}
        </h1>

        <p style={{
          fontSize: '20px',
          fontWeight: '700',
          color: isWin ? '#10b981' : '#ef4444',
          marginBottom: '16px',
        }}>
          {message}
        </p>

        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: '1.8',
          marginBottom: '24px',
          textAlign: 'left',
          whiteSpace: 'pre-line',
        }}>
          {details}
        </p>

        <div style={{
          fontSize: '20px',
          fontWeight: '700',
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '24px',
          background: isWin ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: isWin ? '#a7f3d0' : '#fca5a5',
        }}>
          {isWin ? '✅' : '❌'} {amount.toLocaleString()} ₽
        </div>

        <button
          onClick={onRestart}
          style={{
            padding: '16px 48px',
            background: '#facc15',
            color: '#000',
            fontSize: '18px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 20px rgba(250, 204, 21, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isWin ? 'ИГРАТЬ СНОВА' : 'ПОПРОБОВАТЬ ЕЩЕ РАЗ'}
        </button>
      </div>
    </div>
  );
}