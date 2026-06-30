import React from 'react';

export default function Intro({ onNext }: { onNext: () => void }) {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative', // Нужно для позиционирования фона
            overflow: 'hidden'
        }}>
            {/* Слой с фоном и блюром */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/Intro.png)', // Убедись, что картинка лежит в папке public
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px) brightness(0.7)', // 10px - степень блюра, 0.7 - затемнение для читаемости
                transform: 'scale(1.1)', // Убирает белые края от блюра
                zIndex: 0
            }} />

            {/* Слой с контентом (текст и кнопка) */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'sans-serif',
                padding: '40px',
                background: 'rgba(0, 0, 0, 0.6)', // Едва заметная подложка под текст
                borderRadius: '20px'
            }}>
                <h1 style={{ fontSize: '48px', color: '#facc15', marginBottom: '30px' }}>ГЛОБАЛ ТРАНС</h1>

                <div style={{ maxWidth: '600px', fontSize: '20px', lineHeight: '1.6', marginBottom: '40px' }}>
                    <p>Добро пожаловать в команду. Ваша задача — обеспечить безупречную логистику.</p>
                    <ul style={{ textAlign: 'left', listStyleType: 'none', padding: 0, marginTop: '20px' }}>
                        <li>🔹 <b>Заявка:</b> Запомните параметры</li>
                        <li>🔹 <b>Декларация:</b> Внесите данные</li>
                        <li>🔹 <b>Грузовик:</b> Распределите товар</li>
                        <li>🔹 <b>Маршрут:</b> Контролируйте груз</li>
                    </ul>
                </div>

                <button
                    onClick={onNext}
                    style={{
                        padding: '20px 50px',
                        fontSize: '24px',
                        backgroundColor: '#facc15',
                        color: '#000',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s'
                    }}
                >
                    ПРИСТУПИТЬ К СМЕНЕ
                </button>
            </div>
        </div>
    );
}