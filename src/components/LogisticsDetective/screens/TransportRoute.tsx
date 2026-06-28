import React, { useEffect, useState } from 'react';

interface TransportRouteProps {
  progress: number;
  isComplete: boolean;
  hasIncident: boolean;
  onUpdateProgress: (progress: number) => void;
  onComplete: () => void;
}

export default function TransportRoute({
  progress,
  isComplete,
  hasIncident,
  onUpdateProgress,
  onComplete,
}: TransportRouteProps) {
  const [timeLeft, setTimeLeft] = useState(24);

  // Таймер обратного отсчета
  useEffect(() => {
    if (isComplete) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isComplete]);

  // Прогресс-бар
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
      const newProgress = progress + 3;
      onUpdateProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [progress, isComplete, onUpdateProgress, onComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/doroga.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 100,
      }}
    >
      {/* Блюр поверх фона */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
      }} />

      {/* Контент */}
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '800px',
          padding: '40px',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Заголовок */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 32,
          color: '#facc15',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          🚛 ДОСТАВКА ГРУЗА
        </div>

        {/* Время и прогресс */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: 16,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 16,
        }}>
          <span>⏱️ Осталось: {timeLeft} ч</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Прогресс-бар */}
        <div style={{
          position: 'relative',
          height: 20,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 12,
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #facc15, #f97316, #ef4444)',
            borderRadius: 12,
            transition: 'width 0.15s ease-out',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.2)',
          }} />
          
          {/* Грузовик на прогресс-баре */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${Math.min(progress, 100)}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: 28,
            transition: 'left 0.15s ease-out',
            filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.3))',
          }}>
            🚛
          </div>
        </div>

        {/* Точки маршрута */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 24,
        }}>
          <span>🚩 Склад</span>
          <span>🛂 Таможня</span>
          <span>🏁 Получатель</span>
        </div>

        {/* Статус */}
        {isComplete && (
          <div style={{
            marginTop: 24,
            padding: '20px 24px',
            borderRadius: 16,
            textAlign: 'center',
            background: hasIncident 
              ? 'rgba(239, 68, 68, 0.15)' 
              : 'rgba(16, 185, 129, 0.15)',
            border: `1px solid ${hasIncident ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            animation: 'fadeIn 0.5s ease-out',
          }}>
            <p style={{
              fontSize: 22,
              fontWeight: 900,
              color: hasIncident ? '#ef4444' : '#10b981',
              margin: 0,
            }}>
              {hasIncident ? '⚠️ ГРУЗ ДОСТАВЛЕН С НАРУШЕНИЯМИ!' : '✅ ГРУЗ ДОСТАВЛЕН УСПЕШНО!'}
            </p>
            {hasIncident && (
              <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 8,
              }}>
                🔍 Начинаем расследование инцидента...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Анимация fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}