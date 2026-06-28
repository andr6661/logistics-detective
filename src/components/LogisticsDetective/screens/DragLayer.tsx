import React, { useEffect, useState } from 'react';
import { useDragLayer } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

export default function DragLayer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    item,
    itemType,
    isDragging: isDraggingGlobal,
    clientOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  }));

  useEffect(() => {
    if (isDraggingGlobal && clientOffset && itemType === ItemTypes.BOX) {
      setPosition({
        x: clientOffset.x,
        y: clientOffset.y,
      });
      setDraggedType((item as any)?.type || null);
      setIsDragging(true);
    } else {
      setIsDragging(false);
      setDraggedType(null);
    }
  }, [isDraggingGlobal, clientOffset, itemType, item]);

  const getImageName = (type: string) => {
    switch(type) {
      case 'banana': return 'banana.png';
      case 'mango': return 'mango.png';
      case 'apple': return 'apple.png';
      case 'apelsin': return 'apelsin.png';
      default: return '';
    }
  };

  if (!isDragging || !draggedType) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x - 125,
        top: position.y - 125,
        width: '250px',
        height: '250px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'scale(1.15)',    // ← убрал rotate(-5deg)
        opacity: 0.9,
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
      }}
    >
      <img
        src={`/${getImageName(draggedType)}`}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
    </div>
  );
}