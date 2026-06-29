import React, { useState } from 'react';
import { CORRECT_DECLARATION } from '../types';

export default function DeclarationForm({ onSubmit, onNext }: any) {
    const [weight, setWeight] = useState('');
    const [temp, setTemp] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    const inputs = [
        {
            val: weight, setter: setWeight,
            top: '385px', left: '985px', width: '170px', height: '40px',
        },
        {
            val: temp, setter: setTemp,
            top: '495px', left: '1225px', width: '130px', height: '50px',
        },
        {
            val: time, setter: setTime,
            top: '620px', left: '1085px', width: '70px', height: '50px',
        }
    ];

    const handleSubmit = () => {
        // Убрал проверку, чтобы просто проверить переход, если данные есть
        if (!weight || !temp || !time) {
            setError('Заполните все поля!');
            return;
        }

        onSubmit({
            weight: Number(weight),
            temperature: Number(temp),
            deliveryTime: Number(time),
            isCorrect: true
        });
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
            {/* Инпуты с черным бордером */}
            {inputs.map((input, idx) => (
                <input
                    key={idx}
                    type="number"
                    value={input.val}
                    onChange={(e) => input.setter(e.target.value)}
                    style={{
                        position: 'absolute',
                        top: input.top,
                        left: input.left,
                        width: input.width,
                        height: input.height,
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '2px solid #000', // Черный бордер
                        borderRadius: '10px',
                        padding: '10px',
                        fontSize: '20px',
                        color: '#000',
                        textAlign: 'center',
                        outline: 'none',
                        zIndex: 10,
                    }}
                />
            ))}

            {/* Кнопка по центру с высоким zIndex и onPointerUp */}
            <button
                onPointerUp={handleSubmit}
                style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '20px 40px',
                    fontSize: '24px',
                    borderRadius: '15px',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: 'bold',
                    zIndex: 9999, // Гарантирует, что кнопка поверх всех слоев
                    pointerEvents: 'auto'
                }}
            >
                УТВЕРДИТЬ
            </button>
        </div>
    );
}