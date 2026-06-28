import React, { useState } from 'react';
import { CLUES } from '../hooks/useGameState';

interface InvestigationProps {
  viewedClues: string[];
  onViewClue: (clueId: string) => void;
  onNext: () => void;
  hasIncident: boolean;
}

export default function Investigation({ 
  viewedClues, 
  onViewClue, 
  onNext,
  hasIncident 
}: InvestigationProps) {
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const handleViewClue = (clueId: string) => {
    onViewClue(clueId);
    setModalOpen(clueId);
    
    let text = '';
    if (clueId === 'clue1') {
      text = hasIncident ? CLUES.clue1.wrongText : CLUES.clue1.correctText;
    } else if (clueId === 'clue2') {
      text = CLUES.clue2.text;
    } else if (clueId === 'clue3') {
      text = CLUES.clue3.text;
    }
    setCurrentText(text);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const allViewed = viewedClues.length === 3;

  // ===== КООРДИНАТЫ УЛИК =====
  const cluePositions = [
    { 
      id: 'clue1', 
      x: '10%', 
      y: '25%', 
      width: '250px', 
      height: '250px' 
    },
    { 
      id: 'clue2', 
      x: '52.2%', 
      y: '13.5%', 
      width: '270px', 
      height: '270px' 
    },
    { 
      id: 'clue3', 
      x: '60%', 
      y: '63%', 
      width: '470px', 
      height: '200px' 
    },
  ];

  return (
    <div style={{
      backgroundImage: 'url(/tamozhna.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* УЛИКИ - ПРОЗРАЧНЫЕ */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100vh',
      }}>
        {Object.values(CLUES).map((clue: any) => {
          const isViewed = viewedClues.includes(clue.id);
          const pos = cluePositions.find((p) => p.id === clue.id);
          
          return (
            <div
              key={clue.id}
              onClick={() => handleViewClue(clue.id)}
              style={{
                position: 'absolute',
                left: pos?.x || '0%',
                top: pos?.y || '0%',
                width: pos?.width || '200px',
                height: pos?.height || '200px',
                background: 'transparent',  // ← ПОЛНОСТЬЮ ПРОЗРАЧНЫЕ
                border: isViewed 
                  ? '3px solid rgba(250,204,21,0.3)' 
                  : '2px dashed rgba(255,255,255,0.15)',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isViewed ? '0 0 40px rgba(250,204,21,0.05)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isViewed) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isViewed) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {!isViewed && (
                <div style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}>
                  🔍
                </div>
              )}
              {isViewed && (
                <div style={{
                  fontSize: '24px',
                  color: 'rgba(250,204,21,0.3)',
                }}>
                  ✅
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out',
        }} onClick={closeModal}>
          <div style={{
            maxWidth: '600px',
            width: '90%',
            background: 'rgba(20,20,30,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
              }}
            >
              ✕
            </button>

            {/* Заголовок улики */}
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#facc15',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {CLUES[modalOpen as keyof typeof CLUES]?.title || 'Улика'}
            </div>

            {/* Фото улики */}
            <div style={{
              width: '100%',
              height: '300px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <img
                src={`/clue-${modalOpen}.png`}
                alt={CLUES[modalOpen as keyof typeof CLUES]?.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  // Если картинка не найдена - показываем текст
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div style="color: rgba(255,255,255,0.3); font-size: 14px; text-align: center;">
                        📄 <br/>
                        Улика найдена
                      </div>
                    `;
                  }
                }}
              />
            </div>

            {/* Текст улики */}
            <div style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              lineHeight: '1.7',
              padding: '12px 0',
            }}>
              {currentText}
            </div>

            {/* Кнопка закрыть */}
            <button
              onClick={closeModal}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '16px',
                background: 'rgba(250,204,21,0.1)',
                border: '1px solid rgba(250,204,21,0.2)',
                borderRadius: '12px',
                color: '#facc15',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(250,204,21,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(250,204,21,0.1)';
              }}
            >
              ЗАКРЫТЬ
            </button>
          </div>
        </div>
      )}

      {/* Область для текста улики (если нужно) - убрал, так как теперь модалка */}

      {/* Кнопка внизу */}
      <button
        onClick={onNext}
        disabled={!allViewed}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '400px',
          padding: '18px 32px',
          background: allViewed ? '#22c55e' : '#444',
          color: allViewed ? '#000' : '#888',
          fontSize: '18px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          border: 'none',
          borderRadius: '12px',
          cursor: allViewed ? 'pointer' : 'default',
          transition: 'transform 0.2s, background-color 0.2s',
          boxShadow: allViewed ? '0 4px 20px rgba(34,197,94,0.3)' : 'none',
          opacity: allViewed ? 1 : 0.5,
          zIndex: 3,
        }}
        onMouseEnter={(e) => {
          if (allViewed) {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)';
            e.currentTarget.style.backgroundColor = '#16a34a';
          }
        }}
        onMouseLeave={(e) => {
          if (allViewed) {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            e.currentTarget.style.backgroundColor = '#22c55e';
          }
        }}
      >
        {allViewed ? 'ПЕРЕЙТИ В ЗАЛ СУДА' : `ИЗУЧИТЕ УЛИКИ (${viewedClues.length}/3)`}
      </button>

      {/* Анимация */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}