import React from 'react';

interface CourtRoomProps {
    onSelectVerdict: (verdict: string) => void;
    onSelectSource: (source: string) => void;
    onSubmit: () => void;
    selectedVerdict?: string | null;
    selectedSource?: string | null;
    isSubmitted?: boolean;
}

export default function CourtRoom({
                                      onSelectVerdict,
                                      onSelectSource,
                                      onSubmit,
                                      selectedVerdict = null,
                                      selectedSource = null,
                                      isSubmitted = false,
                                  }: CourtRoomProps) {
    const canSubmit = selectedVerdict !== null && selectedSource !== null;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden' // Чтобы блюр не вылезал за границы
        }}>
            {/* Слой с блюром (только фон) */}
            {/* Слой с фоном */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                zIndex: -1,
                overflow: 'hidden' // Чтобы блюр не вылезал
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/sud.png)',
                    // Вместо cover используем contain, если картинка не растягивается,
                    // или оставляем фиксированные размеры:
                    backgroundSize: '1920px 1080px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(8px)',
                    transform: 'scale(1.1)'
                }} />
            </div>

            {/* Модальное окно (оно поверх фона, поэтому остается четким) */}
            <div style={{
                width: '800px',
                padding: '40px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                zIndex: 1
            }}>
                <div style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '20px',
                    marginBottom: '30px',
                }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#facc15', letterSpacing: '2px' }}>
                        ⚖️ ЗАЛ СУДА
                    </span>
                </div>

                {/* Вопрос 1 */}
                <div style={{ marginBottom: '30px' }}>
                    <p style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>
                        <strong>Вопрос 1:</strong> Кто признан виновным в порче груза?
                    </p>
                    <button
                        style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', cursor: 'pointer',
                            background: selectedVerdict === 'company' ? '#facc15' : 'rgba(255,255,255,0.1)',
                            border: '1px solid #facc15', color: selectedVerdict === 'company' ? '#000' : '#fff', marginBottom: '10px', fontWeight: 600 }}
                        onClick={() => onSelectVerdict('company')}
                    >
                        ЛОГИСТ ГЛОБАЛ ТРАНС (Ошибка в оформлении)
                    </button>
                    <button
                        style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', cursor: 'pointer',
                            background: selectedVerdict === 'thirdParty' ? '#facc15' : 'rgba(255,255,255,0.1)',
                            border: '1px solid #facc15', color: selectedVerdict === 'thirdParty' ? '#000' : '#fff', fontWeight: 600 }}
                        onClick={() => onSelectVerdict('thirdParty')}
                    >
                        ОБСТОЯТЕЛЬСТВА НА ТАМОЖНЕ (Действия третьих лиц)
                    </button>
                </div>

                {/* Вопрос 2 */}
                <div style={{ marginBottom: '30px' }}>
                    <p style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>
                        <strong>Вопрос 2:</strong> Источник покрытия убытков?
                    </p>
                    <button
                        style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', cursor: 'pointer',
                            background: selectedSource === 'company' ? '#facc15' : 'rgba(255,255,255,0.1)',
                            border: '1px solid #facc15', color: selectedSource === 'company' ? '#000' : '#fff', marginBottom: '10px', fontWeight: 600 }}
                        onClick={() => onSelectSource('company')}
                    >
                        ВЫПЛАТА ИЗ БЮДЖЕТА ГЛОБАЛ ТРАНС
                    </button>
                    <button
                        style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px', cursor: 'pointer',
                            background: selectedSource === 'insurance' ? '#facc15' : 'rgba(255,255,255,0.1)',
                            border: '1px solid #facc15', color: selectedSource === 'insurance' ? '#000' : '#fff', fontWeight: 600 }}
                        onClick={() => onSelectSource('insurance')}
                    >
                        ПОКРЫТИЕ ПО СТРАХОВОМУ ПОЛИСУ
                    </button>
                </div>

                <button
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitted}
                    style={{
                        width: '100%',
                        padding: '20px',
                        background: canSubmit ? '#facc15' : '#444',
                        fontSize: '18px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        borderRadius: '12px',
                        cursor: canSubmit ? 'pointer' : 'default',
                        border: 'none',
                    }}
                >
                    {isSubmitted ? 'ВЕРДИКТ ВЫНЕСЕН' : 'УТВЕРДИТЬ ВЕРДИКТ'}
                </button>
            </div>
        </div>
    );
}