import React from 'react';
import { useDragLayer } from 'react-dnd';

const ItemTypes = { BOX: 'box' };

export default function DragLayer() {
    const { item, itemType, isDragging, clientOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        clientOffset: monitor.getClientOffset(),
    }));

    if (!isDragging || itemType !== ItemTypes.BOX || !clientOffset) {
        return null;
    }

    // ВНИМАНИЕ: Мы больше не делим clientOffset на scale внутри слоя,
    // так как браузер автоматически учитывает трансформации родителя при расчете
    // позиции в fixed-контейнере.

    return (
        <div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                transform: `translate(${clientOffset.x}px, ${clientOffset.y}px)`,
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: 0.9,
            }}
        >
            <div style={{
                width: '120px', // Соответствует размеру коробок в WarehouseLoading.tsx
                height: '120px',
                transform: 'translate(-50%, -50%)',
            }}>
                <img
                    src={`/${(item as any).type}.png`}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
        </div>
    );
}