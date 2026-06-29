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

    useEffect(() => {
        if (isComplete) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [isComplete]);

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
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/doroga.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
        }}>
            <div style={{
                width: '600px',
                padding: '40px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <div style={{ fontSize: '24px', color: '#facc15', fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>
                    🚛 ДОСТАВКА ГРУЗА
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '18px', marginBottom: '15px' }}>
                    <span>⏱️ Осталось: {timeLeft} ч</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                <div style={{ height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '30px', position: 'relative' }}>
                    <div style={{
                        height: '100%',
                        width: `${Math.min(progress, 100)}%`,
                        background: 'linear-gradient(90deg, #facc15, #f97316, #ef4444)',
                        borderRadius: '12px',
                        transition: 'width 0.15s ease-out',
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: `${Math.min(progress, 100)}%`,
                        transform: 'translate(-50%, -50%)', fontSize: '32px',
                    }}>🚛</div>
                </div>

                {isComplete && (
                    <div style={{ padding: '20px', borderRadius: '15px', textAlign: 'center', background: hasIncident ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)' }}>
                        <p style={{ fontSize: '22px', color: hasIncident ? '#ef4444' : '#10b981', margin: 0, fontWeight: 700 }}>
                            {hasIncident ? '⚠️ ГРУЗ ДОСТАВЛЕН С НАРУШЕНИЯМИ!' : '✅ ГРУЗ ДОСТАВЛЕН УСПЕШНО!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}