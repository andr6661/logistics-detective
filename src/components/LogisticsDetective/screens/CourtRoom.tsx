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
      backgroundImage: 'url(/court-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '650px',
        width: '100%',
        padding: '32px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '16px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#facc15',
          }}>
            ⚖️ ЗАЛ СУДА
          </span>
          <span style={{
            padding: '4px 8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '4px',
            fontSize: '10px',
            color: '#ef4444',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>
            ВЫНЕСИТЕ ВЕРДИКТ
          </span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px' }}>
            <strong>Вопрос 1:</strong> Кто признан виновным в порче груза?
          </p>
          <button
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: selectedVerdict === 'company' ? '#facc15' : 'rgba(255,255,255,0.05)',
              border: selectedVerdict === 'company' ? '1px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: selectedVerdict === 'company' ? '#000' : '#ffffff',
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'all 0.2s',
            }}
            onClick={() => onSelectVerdict('company')}
            onMouseEnter={(e) => {
              if (selectedVerdict !== 'company') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedVerdict !== 'company') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            ЛОГИСТ ГЛОБАЛ ТРАНС (Ошибка в оформлении/погрузке)
          </button>
          <button
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: selectedVerdict === 'thirdParty' ? '#facc15' : 'rgba(255,255,255,0.05)',
              border: selectedVerdict === 'thirdParty' ? '1px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: selectedVerdict === 'thirdParty' ? '#000' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => onSelectVerdict('thirdParty')}
            onMouseEnter={(e) => {
              if (selectedVerdict !== 'thirdParty') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedVerdict !== 'thirdParty') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            ОБСТОЯТЕЛЬСТВА НА ТАМОЖНЕ (Действия третьих лиц)
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px' }}>
            <strong>Вопрос 2:</strong> Источник покрытия убытков в 100,000 ₽?
          </p>
          <button
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: selectedSource === 'company' ? '#facc15' : 'rgba(255,255,255,0.05)',
              border: selectedSource === 'company' ? '1px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: selectedSource === 'company' ? '#000' : '#ffffff',
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'all 0.2s',
            }}
            onClick={() => onSelectSource('company')}
            onMouseEnter={(e) => {
              if (selectedSource !== 'company') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSource !== 'company') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            ВЫПЛАТА ИЗ БЮДЖЕТА ГЛОБАЛ ТРАНС
          </button>
          <button
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: selectedSource === 'insurance' ? '#facc15' : 'rgba(255,255,255,0.05)',
              border: selectedSource === 'insurance' ? '1px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: selectedSource === 'insurance' ? '#000' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => onSelectSource('insurance')}
            onMouseEnter={(e) => {
              if (selectedSource !== 'insurance') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSource !== 'insurance') {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }
            }}
          >
            ПОКРЫТИЕ ПО СТРАХОВОМУ ПОЛИСУ
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitted}
          style={{
            width: '100%',
            padding: '16px',
            background: canSubmit && !isSubmitted ? '#facc15' : '#444',
            color: canSubmit && !isSubmitted ? '#000' : '#888',
            fontSize: '14px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: 'none',
            borderRadius: '12px',
            cursor: canSubmit && !isSubmitted ? 'pointer' : 'default',
            transition: 'transform 0.2s',
            opacity: canSubmit && !isSubmitted ? 1 : 0.4,
          }}
          onMouseEnter={(e) => {
            if (canSubmit && !isSubmitted) {
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (canSubmit && !isSubmitted) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {isSubmitted ? 'ВЕРДИКТ ВЫНЕСЕН' : 'УТВЕРДИТЬ ВЕРДИКТ'}
        </button>
      </div>
    </div>
  );
}