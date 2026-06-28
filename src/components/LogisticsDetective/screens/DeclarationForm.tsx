import React, { useState } from 'react';
import { DeclarationData, CORRECT_DECLARATION } from '../types';

interface DeclarationFormProps {
  onSubmit: (data: DeclarationData) => void;
  onNext: () => void;
}

const DeclarationForm: React.FC<DeclarationFormProps> = ({ onSubmit, onNext }) => {
  const [weight, setWeight] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    const w = Number(weight);
    const t = Number(temperature);
    const d = Number(deliveryTime);

    if (!w || !t || !d) {
      setError('Заполните все поля!');
      return;
    }

    if (w !== CORRECT_DECLARATION.weight) {
      setError('Неверный вес груза!');
      return;
    }

    if (t !== CORRECT_DECLARATION.temperature) {
      setError('Неверный температурный режим!');
      return;
    }

    if (d !== CORRECT_DECLARATION.deliveryTime) {
      setError('Неверный лимит времени!');
      return;
    }

    const isCorrect = 
      w === CORRECT_DECLARATION.weight &&
      t === CORRECT_DECLARATION.temperature &&
      d === CORRECT_DECLARATION.deliveryTime;

    onSubmit({ weight: w, temperature: t, deliveryTime: d, isCorrect });
    setError('');
    onNext();
  };

  return (
    <div className="centered-screen">
      <div className="card" style={{ maxWidth: '550px' }}>
        <div className="card-header">
          <span className="contract-label">📋 ТАМОЖЕННАЯ ДЕКЛАРАЦИЯ</span>
          <span className="pulse-badge">ЗАПОЛНИТЕ</span>
        </div>

        <div className="form-group">
          <label className="form-label">Заявленный вес груза, кг</label>
          <input
            type="number"
            className="form-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Требуемый температурный режим, °C</label>
          <input
            type="number"
            className="form-input"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Лимит времени на доставку, час</label>
          <input
            type="number"
            className="form-input"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            placeholder="ВВЕДИТЕ ЧИСЛО"
          />
        </div>

        {error && <p style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

        <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%' }}>
          УТВЕРДИТЬ ЗАЯВКУ
        </button>
      </div>
    </div>
  );
};

export default DeclarationForm;