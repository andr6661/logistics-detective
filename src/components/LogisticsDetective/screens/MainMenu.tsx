import React from 'react';

export default function MainMenu({ onStart }: { onStart: () => void }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/helloImage.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                onClick={onStart}
                style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    backgroundColor: '#facc15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 0 60px rgba(250, 204, 21, 0.5)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                <span style={{
                    fontSize: '40px',
                    fontWeight: '900',
                    color: '#000',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textAlign: 'center',
                    lineHeight: '1.2'
                }}>
                    НАЧАТЬ<br/>ИГРУ
                </span>
            </div>
        </div>
    );
}