import React from 'react';

export default function FinalScreen({ finalState, onRestart }: any) {
    // Если данных нет, ничего не рендерим, чтобы не было ошибки
    if (!finalState) return null;

    // Безопасное получение значений
    const isWin = finalState.isWin ?? false;
    const amount = Number(finalState.amount || 0);

    return (
        <div style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: '#1a1a1a', color: '#fff', fontFamily: 'sans-serif'
        }}>
            <div style={{ background: '#2d2d2d', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
                <h1>{isWin ? 'УСПЕШНАЯ СМЕНА' : 'ОШИБКА В РАБОТЕ'}</h1>
                <p>{isWin ? 'Вердикт в пользу Глобал Транс' : 'Вердикт против компании'}</p>

                <div style={{ fontSize: '24px', margin: '20px 0', color: isWin ? '#4ade80' : '#f87171' }}>
                    Сумма: {amount.toLocaleString()} ₽
                </div>

                <button onClick={onRestart} style={{ padding: '15px 30px', cursor: 'pointer' }}>
                    НАЧАТЬ ЗАНОВО
                </button>
            </div>
        </div>
    );
}