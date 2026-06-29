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
    const allViewed = viewedClues.length === 3;

    const cluePositions = [
        { id: 'clue1', x: '220px', y: '270px', w: '200px', h: '200px' },
        { id: 'clue2', x: '1010px', y: '145px', w: '105px', h: '200px' },
        { id: 'clue3', x: '1150px', y: '680px', w: '235px', h: '100px' },
    ];

    // Функция для получения контента с фото и текстом
    const getClueContent = (id: string) => {
        const clueData = CLUES[id as keyof typeof CLUES];

        switch (id) {
            case 'clue1':
                return {
                    image: '/vodila.png',
                    text: "Сотрудники таможенной службы попросили выгрузить товар из грузовика для досмотра, после чего бесследно исчезли на 6 часов. Все это время кузов оставался открытым, а водитель был вынужден дожидаться в зоне ожидания без возможности контролировать сохранность груза."
                };
            case 'clue2':
                return {
                    image: '/termometr.png',
                    text: "В помещении зоны досмотра весь день работал неисправный кондиционер. Температурные датчики зафиксировали критические +25°C, что полностью нарушает правила транспортировки скоропортящихся продуктов."
                };
            case 'clue3':
                return {
                    image: '/tamozenik.png',
                    text: "Был проведен поверхностный досмотр коробок. В ходе проверки целостность заводских пломб была нарушена, однако в акте осмотра не зафиксировано ни одного замечания по состоянию упаковки."
                };
            default:
                return { image: '', text: 'Информация отсутствует.' };
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
                    <div key={clue.id} onClick={() => handleViewClue(clue.id)} style={{
                        position: 'absolute', left: pos?.x, top: pos?.y, width: pos?.w, height: pos?.h,
                        border: isViewed ? '4px solid rgba(250,204,21,0.5)' : '3px dashed rgba(255,255,255,0.3)',
                        borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '32px',
                    }}>
                        {isViewed ? '✅' : '🔍'}
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
                            <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
                                {getClueContent(modalOpen).text}
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <button onClick={closeModal} style={{ padding: '15px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '10px', border: 'none', background: '#facc15', fontWeight: 'bold' }}>
                                ЗАКРЫТЬ
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
                {allViewed ? 'ПЕРЕЙТИ В ЗАЛ СУДА' : `ИЗУЧИТЕ УЛИКИ (${viewedClues.length}/3)`}
            </button>
        </div>
    );
}