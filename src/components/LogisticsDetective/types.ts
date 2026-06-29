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
        title: 'УЛИКА №2: Показания водителя Петрова',
        icon: '📄',
        correctText: 'Транспортное средство остановлено для планового ручного пересчета коробок. Нарушений не обнаружено. Выгрузка: 12:00. Загрузка: 18:00.',
        wrongText: 'Транспортное средство остановлено. Обнаружено несоответствие в декларации. Время простоя: 18 часов.',
    },
    clue2: {
        id: 'clue2',
        title: 'УЛИКА №3: Данные регистратора температуры',
        icon: '🧑‍✈️',
        text: 'Я ехал строго по приборам, рефрижератор работал на +3°C. Но на таможне нас задержали.',
    },
    clue3: {
        id: 'clue3',
        title: 'УЛИКА №1: Официальный ответ Таможни',
        icon: '📊',
        text: 'Рефрижератор работал идеально (+3°C) всю дорогу. С 12:00 до 18:00 датчик веса показывал 0 кг.',
    },
};