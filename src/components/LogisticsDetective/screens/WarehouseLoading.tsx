import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CORRECT_BOXES } from '../hooks/useGameState';
import DragLayer from './DragLayer';

const ItemTypes = {
  BOX: 'box',
};

export default function WarehouseLoading({
  loadedBoxes,
  correctBoxes,
  onLoadBox,
  onUnloadBox,
  onComplete,
}: any) {
  const availableBoxes = [
    { id: 'banana1', type: 'banana', x: '5%', y: '23.5%' },
    { id: 'banana2', type: 'banana', x: '5%', y: '14.5%' },
    { id: 'banana3', type: 'banana', x: '11.5%', y: '23.5%' },
    { id: 'mango1', type: 'mango', x: '20%', y: '23.5%' },
    { id: 'mango2', type: 'mango', x: '20%', y: '14.5%' },
    { id: 'mango3', type: 'mango', x: '26.5%', y: '23.5%' },
    { id: 'apple1', type: 'apple', x: '5%', y: '52.5%' },
    { id: 'apple2', type: 'apple', x: '5%', y: '44%' },
    { id: 'apple3', type: 'apple', x: '11.5%', y: '52.5%' },
    { id: 'apelsin1', type: 'apelsin', x: '20%', y: '52.5%' },
    { id: 'apelsin2', type: 'apelsin', x: '20%', y: '44%' },
    { id: 'apelsin3', type: 'apelsin', x: '26.5%', y: '52.5%' },
  ];

  const getImageName = (type: string) => {
    switch(type) {
      case 'banana': return 'banana.png';
      case 'mango': return 'mango.png';
      case 'apple': return 'apple.png';
      case 'apelsin': return 'apelsin.png';
      default: return '';
    }
  };

  const isBoxLoaded = (type: string) => {
    const count = loadedBoxes.filter((b: string) => b === type).length;
    const totalInAvailable = availableBoxes.filter((b) => b.type === type).length;
    return count >= totalInAvailable;
  };

  // ===== ПРОВЕРКА ЗАГРУЗКИ =====
  const isCorrectLoad = () => {
    const bananaCount = loadedBoxes.filter((b: string) => b === 'banana').length;
    const mangoCount = loadedBoxes.filter((b: string) => b === 'mango').length;
    const correct = bananaCount === 3 && mangoCount === 3 && loadedBoxes.length === 6;
    
    console.log('🔍 Проверка загрузки:');
    console.log('🍌 Бананы:', bananaCount, '(нужно 3)');
    console.log('🥭 Манго:', mangoCount, '(нужно 3)');
    console.log('📦 Всего:', loadedBoxes.length, '(нужно 6)');
    console.log('✅ Результат:', correct ? 'ПРАВИЛЬНО!' : 'НЕПРАВИЛЬНО!');
    
    return correct;
  };

  const DraggableBox = ({ box }: { box: any }) => {
    const isLoaded = isBoxLoaded(box.type);
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.BOX,
      item: { type: box.type, id: box.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: !isLoaded,
    }));

    return (
      <div
        ref={drag}
        style={{
          position: 'absolute',
          left: box.x,
          top: box.y,
          width: '250px',
          height: '250px',
          cursor: isLoaded ? 'default' : 'grab',
          opacity: isDragging ? 0 : (isLoaded ? 0.3 : 1),
          transition: 'opacity 0.2s',
          transform: isLoaded ? 'scale(0.95)' : 'scale(1)',
          zIndex: isLoaded ? 1 : 2,
          touchAction: 'none',
        }}
        onMouseEnter={(e) => {
          if (!isLoaded && !isDragging) {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoaded && !isDragging) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <img
          src={`/${getImageName(box.type)}`}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          draggable={false}
        />
      </div>
    );
  };

  const TruckDropZone = () => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.BOX,
      drop: (item: { type: string, id: string }) => {
        if (!isBoxLoaded(item.type)) {
          onLoadBox(item.type);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        style={{
          position: 'absolute',
          right: '29.5%',
          top: '44.5%',
          transform: 'translateY(-50%) perspective(800px)',
          width: '550px',
          height: '700px',
          background: isOver ? 'rgba(250, 204, 21, 0.15)' : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: isOver 
            ? '3px solid rgba(250, 204, 21, 0.9)' 
            : '3px solid rgba(250, 204, 21, 0.6)',
          borderRadius: '20px',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignContent: 'flex-end',
          justifyContent: 'center',
          overflow: 'auto',
          boxShadow: isOver 
            ? '0 0 50px rgba(250, 204, 21, 0.3)' 
            : '0 0 30px rgba(250, 204, 21, 0.15)',
          transition: 'all 0.3s ease',
        }}
      >
        {loadedBoxes.length === 0 && (
          <div style={{
            width: '100%',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px',
            alignSelf: 'center',
          }}>
            🚛 ПЕРЕТАЩИТЕ<br/>КОРОБКИ СЮДА
          </div>
        )}
        {loadedBoxes.map((type: string, index: number) => (
          <div
            key={index}
            onClick={() => onUnloadBox(index)}
            style={{
              width: '150px',
              height: '150px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={`/${getImageName(type)}`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      style={{
        backgroundImage: 'url(/ScladObj.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <DragLayer />

      {availableBoxes.map((box) => (
        <DraggableBox key={box.id} box={box} />
      ))}

      <TruckDropZone />

      <div 
        onClick={() => {
          const isCorrect = isCorrectLoad();
          console.log('🚛 Отправка! isCorrect =', isCorrect);
          onComplete(isCorrect);
        }}
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
          🚛 ОПЕЧАТАТЬ КУЗОВ И ОТПРАВИТЬ
        </span>
      </div>
    </div>
  );
}