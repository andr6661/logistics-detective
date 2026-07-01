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
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '18px 50px',
                    fontSize: '22px',
                    fontWeight: '700',
                    borderRadius: '14px',
                    border: 'none',
                    backgroundColor: '#22c55e',
                    color: '#fff',
                    cursor: 'pointer',
                    zIndex: 9999,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    minWidth: '250px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#16a34a';
                    e.currentTarget.style.transform = 'translateX(-50%) scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(34, 197, 94, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#22c55e';
                    e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
                }}
            >
                ПЕРЕЙТИ К ЗАЯВКЕ
            </button>
        </div>
    );
}