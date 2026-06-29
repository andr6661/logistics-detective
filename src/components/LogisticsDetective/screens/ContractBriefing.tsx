import React from 'react';

export default function ContractBriefing({ onNext }: { onNext: () => void }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/contract.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative', // Контент будет позиционироваться относительно этого блока
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end', // Кнопка будет внизу
                paddingBottom: '50px',
            }}
        >
            <button
                onClick={onNext}
                style={{
                    width: '400px',
                    padding: '20px 40px',
                    borderRadius: '12px',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, background-color 0.2s',
                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#000',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.backgroundColor = '#16a34a';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#22c55e';
                }}
            >
                ПЕРЕЙТИ К ЗАЯВКЕ
            </button>
        </div>
    );
}