import React, { useEffect, useState } from 'react';

interface IncidentAlertProps {
  onNext: () => void;
}

export default function IncidentAlert({ onNext }: IncidentAlertProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

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
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 200,
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        padding: '48px 40px',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '2px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '24px',
        textAlign: 'center',
        transform: show ? 'scale(1)' : 'scale(0.9)',
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-out',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚨</div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#ef4444',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '12px',
        }}>
          ГРУЗ ПРИЕХАЛ ИСПОРЧЕННЫМ!
        </h1>

        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}>
          Получатель сообщил, что <strong style={{ color: '#facc15' }}>100% фруктов сгнили</strong>.<br/>
          Клиент выставил претензию на <strong style={{ color: '#facc15' }}>100 000 ₽</strong>
        </p>

        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}>
          🔍 Необходимо провести расследование на таможне.
        </p>

        <button
          onClick={onNext}
          style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #facc15, #f97316)',
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
          🕵️‍♂️ ПЕРЕЙТИ НА ТАМОЖНЮ
        </button>
      </div>
    </div>
  );
}