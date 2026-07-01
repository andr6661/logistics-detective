import React, { useState } from 'react';
import { CLUES } from '../types';

interface InvestigationProps {
    viewedClues: string[];
    onViewClue: (clueId: string) => void;
    onNext: () => void;
    hasIncident: boolean;
}

export default function Investigation({ viewedClues, onViewClue, onNext, hasIncident }: InvestigationProps) {
    const [modalOpen, setModalOpen] = useState<string | null>(null);

    const handleViewClue = (clueId: string) => {
        onViewClue(clueId);
        setModalOpen(clueId);
    };

    const closeModal = () => setModalOpen(null);
    const allViewed = viewedClues.length === 5;

    const cluePositions = [
        { id: 'clue1', x: '100px', y: '300px', w: '200px', h: '440px' },
        { id: 'clue2', x: '1010px', y: '145px', w: '105px', h: '200px' },
        { id: 'clue3', x: '1050px', y: '400px', w: '300px', h: '300px' },
        { id: 'clue4', x: '520px', y: '250px', w: '300px', h: '300px' },
        { id: 'clue5', x: '1330px', y: '110px', w: '280px', h: '280px' },
    ];

    const getClueContent = (id: string) => {
        switch (id) {
            case 'clue1': return { image: '/vodila.png', text: "Сотрудники таможни попросили меня выгрузить все коробки из кузова для проведения полного досмотра. Я ждал возвращения сотрудника более 6 часов, чтобы загрузить товар обратно." };
            case 'clue2': return { image: '/termometr.png', text: "В зоне досмотра работал неисправный кондиционер." };
            case 'clue3': return { image: '/tamozenik.png', text: "Никаких нарушений при досмотре не выявлено." };
            case 'clue4': return { image: '/akt.png', text: "Акт погрузки подтверждает: товар был упакован строго по регламенту и опломбирован на складе." };
            case 'clue5': return { image: '/pravila.png', text: "Регламент таможенной службы: сотрудник имеет право вскрывать пломбы для досмотра, но несет полную ответственность за сохранность груза во время процесса." };
            default: return { image: '', text: 'Информация отсутствует.' };
        }
    };

    return (
        <div style={{
            width: '100%', height: '100%', backgroundImage: 'url(/tamozhna.png)',
            backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden',
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
                            left: pos?.x,
                            top: pos?.y,
                            width: pos?.w,
                            height: pos?.h,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',

                        }}
                        onMouseEnter={(e) => {
                            if (!isViewed) {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isViewed) {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                e.currentTarget.style.background = 'rgba(0,0,0,0.15)';
                            }
                        }}
                    >
                        {/* Лупа и галочка УБРАНЫ — теперь просто прозрачная зона */}
                    </div>
                );
            })}

            {modalOpen && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={closeModal}>
                    <div style={{
                        width: '800px', background: '#14141e', padding: '40px', borderRadius: '24px',
                        border: '1px solid #facc15', color: '#fff'
                    }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontSize: '32px', color: '#facc15', marginBottom: '30px', textAlign: 'center' }}>
                            {CLUES[modalOpen as keyof typeof CLUES].title}
                        </h2>
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                            <img src={getClueContent(modalOpen).image} style={{ width: '300px', borderRadius: '12px' }} alt="улика" />
                            <p style={{ fontSize: '20px', lineHeight: '1.6' }}>{getClueContent(modalOpen).text}</p>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <button onClick={closeModal} style={{ padding: '15px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '10px', border: 'none', background: '#facc15', fontWeight: 'bold' }}>
                                ПОНЯТНО
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={onNext} disabled={!allViewed} style={{
                position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                padding: '20px 40px', fontSize: '20px', background: allViewed ? '#22c55e' : '#444',
                color: '#fff', borderRadius: '12px', border: 'none', cursor: allViewed ? 'pointer' : 'default',
                fontWeight: '700', textTransform: 'uppercase'
            }}>
                {allViewed ? 'ПРИНЯТЬ РЕШЕНИЕ' : `ИЗУЧИТЕ ПОДСКАЗКИ (${viewedClues.length}/5)`}
            </button>
        </div>
    );
}