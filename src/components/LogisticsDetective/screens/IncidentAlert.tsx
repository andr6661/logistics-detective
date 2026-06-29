import React, { useEffect, useState } from 'react';

interface IncidentAlertProps {
    onNext: () => void;
}

export default function IncidentAlert({ onNext }: IncidentAlertProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
        }}>
            <div style={{
                maxWidth: '800px',
                width: '100%',
                padding: '40px',
                background: 'rgba(239, 68, 68, 0.05)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '30px',
                textAlign: 'center',
                transform: show ? 'scale(1)' : 'scale(0.9)',
                opacity: show ? 1 : 0,
                transition: 'all 0.5s ease-out',
            }}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚨</div>

                <h1 style={{
                    fontSize: '40px',
                    fontWeight: 900,
                    color: '#ef4444',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                }}>
                    ГРУЗ ПРИЕХАЛ ИСПОРЧЕННЫМ!
                </h1>

                <p style={{
                    fontSize: '20px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6',
                    marginBottom: '30px',
                }}>
                    Получатель сообщил, что <strong style={{ color: '#facc15' }}>100% фруктов сгнили</strong>.<br/>
                    Клиент выставил претензию на <strong style={{ color: '#facc15' }}>100 000 ₽</strong>
                </p>

                <p style={{
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: '1.6',
                    marginBottom: '40px',
                }}>
                    🔍 Необходимо провести расследование на таможне.
                </p>

                <button
                    onClick={onNext}
                    style={{
                        padding: '20px 40px',
                        background: 'linear-gradient(135deg, #facc15, #f97316)',
                        color: '#000',
                        fontSize: '20px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        border: 'none',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 15px rgba(250, 204, 21, 0.3)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                    🕵️‍♂️ ПЕРЕЙТИ НА ТАМОЖНЮ
                </button>
            </div>
        </div>
    );
}