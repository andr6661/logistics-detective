import React, { useState } from 'react';
import { CORRECT_DECLARATION } from '../types';

export default function DeclarationForm({ onSubmit, onNext }: any) {
    const [weight, setWeight] = useState('');
    const [temp, setTemp] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!weight || !temp || !time) {
            setError('Заполните все поля!');
            return;
        }

        const w = Number(weight);
        const t = Number(temp);
        const d = Number(time);

        const isCorrect =
            w === CORRECT_DECLARATION.weight &&
            t === CORRECT_DECLARATION.temperature &&
            d === CORRECT_DECLARATION.deliveryTime;

        onSubmit({
            weight: w,
            temperature: t,
            deliveryTime: d,
            isCorrect: isCorrect
        });

        setError('');
        onNext();
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/declaration.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        }}>
            {/* Поля для ввода */}
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{
                    position: 'absolute',
                    top: '385px',
                    left: '985px',
                    width: '170px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '2px solid #000',
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '20px',
                    color: '#000',
                    textAlign: 'center',
                    outline: 'none',
                    zIndex: 10,
                }}
            />

            <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                style={{
                    position: 'absolute',
                    top: '495px',
                    left: '1225px',
                    width: '130px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '2px solid #000',
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '20px',
                    color: '#000',
                    textAlign: 'center',
                    outline: 'none',
                    zIndex: 10,
                }}
            />

            <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                    position: 'absolute',
                    top: '620px',
                    left: '1085px',
                    width: '70px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '2px solid #000',
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '20px',
                    color: '#000',
                    textAlign: 'center',
                    outline: 'none',
                    zIndex: 10,
                }}
            />

            {error && (
                <div style={{
                    position: 'absolute',
                    bottom: '250px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#ef4444',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '10px 30px',
                    borderRadius: '12px',
                    zIndex: 999,
                }}>
                    {error}
                </div>
            )}

            <button
                onPointerUp={handleSubmit}
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
                УТВЕРДИТЬ
            </button>
        </div>
    );
}