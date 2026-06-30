import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DragLayer from './DragLayer';

const ItemTypes = { BOX: 'box' };

interface Box {
    id: string;
    type: 'banana' | 'mango' | 'apple' | 'apelsin';
    x: string;
    y: string;
}

export default function WarehouseLoading({ loadedBoxes, onLoadBox, onUnloadBox, onComplete }: any) {
    // Доступные коробки на складе
    const availableBoxes: Box[] = [
        { id: 'banana1', type: 'banana', x: '100px', y: '260px' },
        { id: 'banana2', type: 'banana', x: '100px', y: '170px' },
        { id: 'banana3', type: 'banana', x: '220px', y: '260px' },
        { id: 'mango1', type: 'mango', x: '380px', y: '260px' },
        { id: 'mango2', type: 'mango', x: '380px', y: '170px' },
        { id: 'mango3', type: 'mango', x: '500px', y: '260px' },
        { id: 'apple1', type: 'apple', x: '100px', y: '570px' },
        { id: 'apple2', type: 'apple', x: '100px', y: '480px' },
        { id: 'apple3', type: 'apple', x: '220px', y: '570px' },
        { id: 'apelsin1', type: 'apelsin', x: '380px', y: '570px' },
        { id: 'apelsin2', type: 'apelsin', x: '380px', y: '480px' },
        { id: 'apelsin3', type: 'apelsin', x: '500px', y: '570px' },
    ];

    const isBoxInTruck = (id: string) => loadedBoxes.some((b: any) => b.id === id);

    const DraggableBox = ({ box }: { box: Box }) => {
        if (isBoxInTruck(box.id)) return null;

        const [{ isDragging }, drag] = useDrag(() => ({
            type: ItemTypes.BOX,
            item: { id: box.id, type: box.type },
            collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        }));

        return (
            <div
                ref={drag}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    position: 'absolute',
                    left: box.x,
                    top: box.y,
                    width: '120px',
                    height: '120px',
                    cursor: 'grab',
                    opacity: isDragging ? 0 : 1,
                    transition: 'all 0.2s',
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}
            >
                <img
                    src={`/${box.type}.png`}
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                    alt=""
                />
            </div>
        );
    };

    const TruckDropZone = () => {
        const [{ isOver }, drop] = useDrop(() => ({
            accept: ItemTypes.BOX,
            drop: (item: any) => onLoadBox(item),
            collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        }));

        return (
            <div ref={drop} style={{
                position: 'absolute',
                right: '500px',
                top: '470px',
                transform: 'translateY(-50%)',
                width: '350px',
                height: '400px',
                background: isOver ? 'rgba(250, 204, 21, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                border: '3px solid rgba(250, 204, 21, 0.6)',
                borderRadius: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px',
                justifyContent: 'center',
                alignContent: 'center',
                overflow: 'hidden',
                touchAction: 'none',
            }}>
                {loadedBoxes.map((box: any) => (
                    <div
                        key={box.id}
                        onPointerDown={(e) => { e.stopPropagation(); onUnloadBox(box.id); }}
                        style={{ width: '120px', height: '120px', cursor: 'pointer', touchAction: 'none' }}
                    >
                        <img src={`/${box.type}.png`} style={{ width: '100%', height: '100%' }} alt="" />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/ScladObj.png)',
            backgroundSize: 'cover',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <DragLayer />
            {availableBoxes.map((box) => (
                <DraggableBox key={box.id} box={box} />
            ))}
            <TruckDropZone />

            <button
                onPointerUp={() => {
                    const counts = loadedBoxes.reduce((acc: any, box: any) => {
                        acc[box.type] = (acc[box.type] || 0) + 1;
                        return acc;
                    }, {});

                    // Условие: 3 манго, 2 банана, 1 яблоко = всего 6 коробок
                    const isCorrect =
                        counts.mango === 3 &&
                        counts.banana === 2 &&
                        counts.apple === 1 &&
                        loadedBoxes.length === 6;

                    onComplete(isCorrect);
                }}
                style={{
                    position: 'absolute',
                    bottom: '50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '400px',
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#22c55e',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    border: 'none',
                    color: 'white',
                    zIndex: 9999,
                    touchAction: 'manipulation'
                }}
            >
                ОПЕЧАТАТЬ КУЗОВ
            </button>
        </div>
    );
}