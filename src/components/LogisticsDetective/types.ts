export type ScreenType =
    | 'mainMenu'
    | 'contractBriefing'
    | 'declarationForm'
    | 'warehouseLoading'
    | 'transportRoute'
    | 'incidentAlert'
    | 'investigation'
    | 'courtRoom'
    | 'final';

export interface DeclarationData {
    weight: number;
    temperature: number;
    deliveryTime: number;
    isCorrect: boolean;
}

export type BoxType = 'banana' | 'mango' | 'apple' | 'apelsin';

export const CONTRACT = {
    client: 'ФрешМаркет',
    cargo: 'Свежие экзотические фрукты',
    bananaPallets: 3,
    mangoPallets: 3,
    totalWeight: 600,
    temperature: 3,
    deliveryTime: 24,
    penalty: 100000,
};

export const CORRECT_DECLARATION = {
    weight: 600,
    temperature: 3,
    deliveryTime: 24,
};

export const CORRECT_BOXES: BoxType[] = ['banana', 'banana', 'banana', 'mango', 'mango', 'mango'];

export const AVAILABLE_BOXES: BoxType[] = [
    'banana', 'banana', 'banana',
    'mango', 'mango', 'mango',
    'apple', 'apple',
    'apelsin', 'apelsin',
];

export const BOXES_DATA = {
    banana: { label: 'БАНАНЫ', weight: 100, icon: '🍌', color: '#4CAF50' },
    mango: { label: 'МАНГО', weight: 100, icon: '🥭', color: '#FF9800' },
    apple: { label: 'ЯБЛОКИ', weight: 100, icon: '🍎', color: '#F44336' },
    apelsin: { label: 'АПЕЛЬСИНЫ', weight: 100, icon: '🍊', color: '#FF5722' },
};

export const CLUES = {
    clue1: {
        id: 'clue1',
        title: 'Показания водителя Петрова',
        icon: '📄',
        text: 'Транспортное средство остановлено для планового ручного пересчета коробок. Нарушений не обнаружено. Выгрузка: 12:00. Загрузка: 18:00.',
    },
    clue2: {
        id: 'clue2',
        title: 'Данные термометра в помещении',
        icon: '🧑‍✈️',
        text: 'В помещении зоны досмотра весь день работал неисправный кондиционер.',
    },
    clue3: {
        id: 'clue3',
        title: 'Официальный ответ Таможни',
        icon: '📊',
        text: 'Был проведен досмотр груза. Никаких нарушений не было выявлено, документы и груз в порядке.',
    },
    clue4: {
        id: 'clue4',
        title: 'Акт погрузки на складе',
        icon: '📦',
        text: 'Фрукты были загружены правильно (3 манго, 2 банана, 1 яблоко) и опломбированы на складе перед отправкой.',
    },
    clue5: {
        id: 'clue5',
        title: 'Выдержка из регламента Федеральной Таможенной Службы',
        icon: '⚖️',
        text: 'Таможня имеет полное право вскрывать пломбы для досмотра, но обязана обеспечить сохранность груза и температурный режим.',
    },
};