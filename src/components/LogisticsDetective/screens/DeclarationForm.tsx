import React, { useState } from 'react';
import { CORRECT_DECLARATION } from '../hooks/useGameState';

export default function DeclarationForm({ onSubmit, onNext }: any) {
  const [weight, setWeight] = useState('');
  const [temp, setTemp] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const w = Number(weight);
    const t = Number(temp);
    const d = Number(time);
    
    if (!w || !t || !d) {
      setError('Заполните все поля!');
      return;
    }

    // Проверяем правильность
    const isCorrect = 
      w === CORRECT_DECLARATION.weight &&
      t === CORRECT_DECLARATION.temperature &&
      d === CORRECT_DECLARATION.deliveryTime;

    // Отправляем данные (даже если неправильные)
    onSubmit({ weight: w, temperature: t, deliveryTime: d, isCorrect });
    setError('');
    onNext();
  };

  return (
    <div style={{
      backgroundImage: 'url(/declaration.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Формы прозрачные */}
      <div style={{
        width: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '20px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px',
            letterSpacing: '0.5px',
          }}>
            Заявленный вес груза, кг
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              color: '#ffffff',
              fontSize: '20px',
              textAlign: 'center',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#facc15';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px',
            letterSpacing: '0.5px',
          }}>
            Требуемый температурный режим, °C
          </label>
          <input
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              color: '#ffffff',
              fontSize: '20px',
              textAlign: 'center',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#facc15';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px',
            letterSpacing: '0.5px',
          }}>
            Лимит времени на доставку, час
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '16px',
              color: '#ffffff',
              fontSize: '20px',
              textAlign: 'center',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#facc15';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          />
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center',
            color: '#ef4444',
            fontWeight: '600',
          }}>
            {error}
          </div>
        )}
      </div>

      {/* Кнопка внизу */}
      <div 
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '400px',
          padding: '18px 32px',
          borderRadius: '12px',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)';
          e.currentTarget.style.backgroundColor = '#16a34a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = '#22c55e';
        }}
      >
        <span style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#000',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center',
        }}>
          УТВЕРДИТЬ ЗАЯВКУ
        </span>
      </div>
    </div>
  );
}