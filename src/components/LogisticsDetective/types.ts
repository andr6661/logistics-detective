export type ScreenType =
  | 'mainMenu'
  | 'contractBriefing'
  | 'declarationForm'
  | 'warehouseLoading'
  | 'transportRoute'
  | 'investigation'
  | 'courtRoom'
  | 'final';

export interface DeclarationData {
  weight: number;
  temperature: number;
  deliveryTime: number;
  isCorrect: boolean;
}

export type BoxType = 'banana' | 'mango' | 'apple' | 'orange';
export type VerdictType = 'company' | 'thirdParty';
export type CompensationSource = 'company' | 'insurance';

export interface BoxItem {
  id: string;
  type: BoxType;
  label: string;
  weight: number;
  icon: string;
  color: string;
}

export interface GameState {
  currentScreen: ScreenType;
  declaration: DeclarationData | null;
  warehouse: WarehouseState;
  route: RouteState;
  investigation: InvestigationState;
  court: CourtState;
  final: FinalState | null;
}

export interface WarehouseState {
  loadedBoxes: BoxType[];
  correctBoxesCount: number;
  isComplete: boolean;
}

export interface RouteState {
  progress: number;
  isComplete: boolean;
  hasIncident: boolean;
}

export interface InvestigationState {
  viewedClues: string[];
  allViewed: boolean;
  currentClueText: string | null;
}

export interface CourtState {
  selectedVerdict: VerdictType | null;
  selectedSource: CompensationSource | null;
  isSubmitted: boolean;
}

export interface FinalState {
  isWin: boolean;
  title: string;
  message: string;
  details: string;
  amount: number;
}

export const CONTRACT = {
  client: 'ФрешМаркет',
  cargo: 'Свежие экзотические фрукты',
  bananaWeight: 300,
  mangoWeight: 300,
  totalWeight: 600,
  temperature: 3,
  deliveryTime: 24,
  penalty: 100000,
} as const;

export const CORRECT_DECLARATION = {
  weight: 600,
  temperature: 3,
  deliveryTime: 24,
} as const;

export const CORRECT_BOXES: BoxType[] = ['banana', 'banana', 'banana', 'mango', 'mango', 'mango'];

export const AVAILABLE_BOXES: BoxType[] = [
  'banana', 'banana', 'banana',
  'mango', 'mango', 'mango',
  'apple', 'apple',
  'orange', 'orange',
];

export const BOXES_DATA: Record<BoxType, BoxItem> = {
  banana: {
    id: 'banana',
    type: 'banana',
    label: 'БАНАНЫ',
    weight: 100,
    icon: '🍌',
    color: '#4CAF50',
  },
  mango: {
    id: 'mango',
    type: 'mango',
    label: 'МАНГО',
    weight: 100,
    icon: '🥭',
    color: '#FF9800',
  },
  apple: {
    id: 'apple',
    type: 'apple',
    label: 'ЯБЛОКИ',
    weight: 100,
    icon: '🍎',
    color: '#F44336',
  },
  orange: {
    id: 'orange',
    type: 'orange',
    label: 'АПЕЛЬСИНЫ',
    weight: 100,
    icon: '🍊',
    color: '#FF5722',
  },
};

export const CLUES = {
  clue1: {
    id: 'clue1',
    title: 'УЛИКА №1: Официальный ответ Таможни',
    icon: '📄',
    correctText: 'Транспортное средство остановлено для планового ручного пересчета коробок. Нарушений не обнаружено. Выгрузка паллет: 12:00. Обратная загрузка: 18:00. Машина выпущена.',
    wrongText: 'Транспортное средство остановлено. При сканировании обнаружено несоответствие в декларации. Отказ в проезде. Машина заблокирована до исправления документов. Время простоя: 18 часов.',
  },
  clue2: {
    id: 'clue2',
    title: 'УЛИКА №2: Показания водителя Петрова',
    icon: '🧑‍✈️',
    text: 'Я ехал строго по приборам, рефрижератор работал на +3°C, я его вообще не выключал! Но на таможне нас стопорнули. Если бы не эта задержка, мы бы успели вовремя.',
  },
  clue3: {
    id: 'clue3',
    title: 'УЛИКА №3: Данные регистратора температуры',
    icon: '📊',
    text: 'График температуры: рефрижератор работал идеально (+3°C) всю дорогу. С 12:00 до 18:00 датчик веса в кузове показывал 0 кг, хотя холодильник морозил пустой кузов.',
  },
};