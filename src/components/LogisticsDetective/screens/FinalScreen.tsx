import React from 'react';

export default function FinalScreen({ finalState, onRestart }: any) {
    if (!finalState) return null;

    const isWin = finalState.isWon ?? false;
    const message = finalState.message || (isWin ? 'Вердикт в пользу Глобал Транс' : 'Вердикт против компании');
    const amount = Number(finalState.amount || 100000);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
        }}>
            {/* Фон на весь экран с блюром */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/final.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) brightness(0.5)',
                transform: 'scale(1.05)',
                zIndex: 0,
            }} />

            {/* Затемнение поверх фона */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1,
            }} />

            {/* Блок с текстом по центру — шире и выше */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '850px',
                width: '92%',
                maxHeight: '85vh',
                height: 'auto',
                padding: '50px 50px',
                borderRadius: '24px',
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'sans-serif',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${isWin ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
                boxShadow: `0 0 60px ${isWin ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                <div style={{
                    fontSize: '64px',
                    marginBottom: '10px',
                }}>
                    {isWin ? '🏆' : '❌'}
                </div>

                <h1 style={{
                    color: isWin ? '#4ade80' : '#f87171',
                    fontSize: '38px',
                    fontWeight: 900,
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}>
                    {isWin ? 'ВЫ ОТЛИЧНО СПРАВИЛИСЬ С ЗАДАНИЕМ!' : 'ПОРАЖЕНИЕ!'}
                </h1>

                <div style={{
                    fontSize: '17px',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                    color: 'rgba(255,255,255,0.85)',
                    textAlign: 'left',
                    whiteSpace: 'pre-line',
                    maxHeight: '42vh',
                    overflow: 'hidden',
                    padding: '0 10px',
                }}>
                    {message}
                </div>

                {amount > 0 && (
                    <div style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        marginBottom: '20px',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        background: isWin ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                        color: isWin ? '#4ade80' : '#f87171',
                        display: 'inline-block',
                        alignSelf: 'center',
                    }}>
                        {isWin ? '✅' : '❌'} {amount.toLocaleString()} ₽
                    </div>
                )}

                <button
                    onClick={onRestart}
                    style={{
                        padding: '16px 50px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '700',
                        borderRadius: '12px',
                        border: 'none',
                        background: '#facc15',
                        color: '#000',
                        transition: 'transform 0.2s, background 0.2s',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        alignSelf: 'center',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = '#fde047';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = '#facc15';
                    }}
                >
                    ИГРАТЬ СНОВА
                </button>
            </div>
        </div>
    );
}