import React from 'react';

export default function FinalScreen({ finalState, onRestart }: any) {
    if (!finalState) return null;

    const isWin = finalState.isWon ?? false;
    const message = finalState.message || (isWin ? 'Вердикт в пользу Глобал Транс' : 'Вердикт против компании');
    const amount = Number(finalState.amount || 0);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Слой с фоном и блюром (как в Intro) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/final.png)', // Используем твой файл final.png
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px) brightness(0.6)', // Немного темнее, чтобы текст лучше читался
                transform: 'scale(1.1)',
                zIndex: 0
            }} />

            {/* Слой с текстом */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '40px',
                borderRadius: '24px',
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'sans-serif',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)'
            }}>
                <h1 style={{ color: isWin ? '#4ade80' : '#f87171', fontSize: '40px', marginBottom: '20px' }}>
                    {isWin ? 'УСПЕШНАЯ СМЕНА' : 'ОШИБКА В РАБОТЕ'}
                </h1>

                <p style={{ fontSize: '20px', marginBottom: '30px' }}>{message}</p>

                {amount > 0 && (
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: isWin ? '#4ade80' : '#f87171' }}>
                        Сумма: {amount.toLocaleString()} ₽
                    </div>
                )}

                <button
                    onClick={onRestart}
                    style={{
                        padding: '15px 40px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#facc15',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s'
                    }}
                >
                    НАЧАТЬ ЗАНОВО
                </button>
            </div>
        </div>
    );
}