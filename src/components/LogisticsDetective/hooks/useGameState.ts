import { useState, useCallback } from 'react';

// ===== ВСЕ ТИПЫ =====
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

// ===== КОНСТАНТЫ =====
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
    title: 'УЛИКА №1: Официальный ответ Таможни',
    icon: '📄',
    correctText: 'Транспортное средство остановлено для планового ручного пересчета коробок. Нарушений не обнаружено. Выгрузка: 12:00. Загрузка: 18:00.',
    wrongText: 'Транспортное средство остановлено. Обнаружено несоответствие в декларации. Время простоя: 18 часов.',
  },
  clue2: {
    id: 'clue2',
    title: 'УЛИКА №2: Показания водителя Петрова',
    icon: '🧑‍✈️',
    text: 'Я ехал строго по приборам, рефрижератор работал на +3°C. Но на таможне нас задержали.',
  },
  clue3: {
    id: 'clue3',
    title: 'УЛИКА №3: Данные регистратора температуры',
    icon: '📊',
    text: 'Рефрижератор работал идеально (+3°C) всю дорогу. С 12:00 до 18:00 датчик веса показывал 0 кг.',
  },
};

// ===== СОСТОЯНИЕ =====
interface GameState {
  currentScreen: ScreenType;
  declaration: DeclarationData | null;
  declarationCorrect: boolean;
  loadingCorrect: boolean;
  loadedBoxes: BoxType[];
  routeProgress: number;
  routeComplete: boolean;
  hasIncident: boolean;
  viewedClues: string[];
  finalState: any;
  courtVerdict: string | null;
  courtSource: string | null;
}

const initialState: GameState = {
  currentScreen: 'mainMenu',
  declaration: null,
  declarationCorrect: false,
  loadingCorrect: false,
  loadedBoxes: [],
  routeProgress: 0,
  routeComplete: false,
  hasIncident: false,
  viewedClues: [],
  finalState: null,
  courtVerdict: null,
  courtSource: null,
};

// ===== ХУК =====
export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);

  const setScreen = useCallback((screen: ScreenType) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  const setDeclaration = useCallback((data: DeclarationData) => {
    setState((prev) => ({
      ...prev,
      declaration: data,
      declarationCorrect: data.isCorrect,
    }));
  }, []);

  const loadBox = useCallback((boxType: BoxType) => {
    setState((prev) => ({
      ...prev,
      loadedBoxes: [...prev.loadedBoxes, boxType],
    }));
  }, []);

  const unloadBox = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      loadedBoxes: prev.loadedBoxes.filter((_, i) => i !== index),
    }));
  }, []);

  const completeLoading = useCallback((isCorrect?: boolean) => {
    setState((prev) => {
      const loadingCorrect = isCorrect !== undefined 
        ? isCorrect 
        : (prev.loadedBoxes.length === CORRECT_BOXES.length &&
           prev.loadedBoxes.every((b) => CORRECT_BOXES.includes(b)));
      
      const declarationCorrect = prev.declaration?.isCorrect || false;
      
      console.log('📦 Загрузка завершена:', {
        declarationCorrect,
        loadingCorrect,
        hasError: !declarationCorrect || !loadingCorrect
      });
      
      return {
        ...prev,
        declarationCorrect,
        loadingCorrect,
        hasIncident: true,
        routeProgress: 0,
        routeComplete: false,
      };
    });
  }, []);

  const updateRouteProgress = useCallback((progress: number) => {
    setState((prev) => ({
      ...prev,
      routeProgress: Math.min(progress, 100),
    }));
  }, []);

  const completeRoute = useCallback(() => {
    setState((prev) => {
      const hasError = !prev.declarationCorrect || !prev.loadingCorrect;
      
      if (hasError) {
        // ВЕТКА 1: Ошибка → штраф компании
        return {
          ...prev,
          currentScreen: 'final',
          routeComplete: true,
          finalState: {
            isWin: false,
            title: '❌ ДЕЛО ПРОИГРАНО!',
            message: 'ГРУЗ ПРИЕХАЛ НЕ ТОТ!',
            details: `Вы допустили ошибку при оформлении декларации или перепутали коробки на складе. Из-за этого таможня не пустила грузовик через границу.
            
Компания «Глобал Транс» признана виновной и выплатила 100,000 ₽ штрафа из собственного бюджета. В следующий раз проверяйте цифры лучше!`,
            amount: 100000,
          },
        };
      } else {
        // ВЕТКА 2: Всё правильно → страховой случай
        return {
          ...prev,
          currentScreen: 'incidentAlert',
          routeComplete: true,
        };
      }
    });
  }, []);

  const viewClue = useCallback((clueId: string) => {
    setState((prev) => {
      const viewed = prev.viewedClues.includes(clueId) 
        ? prev.viewedClues 
        : [...prev.viewedClues, clueId];
      
      return {
        ...prev,
        viewedClues: viewed,
      };
    });
  }, []);

  const setCourtVerdict = useCallback((verdict: string) => {
    setState((prev) => ({
      ...prev,
      courtVerdict: verdict,
    }));
  }, []);

  const setCourtSource = useCallback((source: string) => {
    setState((prev) => ({
      ...prev,
      courtSource: source,
    }));
  }, []);

  const submitVerdict = useCallback(() => {
    setState((prev) => {
      const isCorrectVerdict = 
        prev.courtVerdict === 'thirdParty' && 
        prev.courtSource === 'insurance';
      
      return {
        ...prev,
        currentScreen: 'final',
        finalState: isCorrectVerdict ? {
          isWin: true,
          title: '🎉 КЕЙС УСПЕШНО ЗАКРЫТ!',
          message: 'ПОБЕДА!',
          details: `Юристы «Глобал Транс» полностью доказали невиновность компании. Ваша заявка и погрузка были безупречны. Логи черного ящика подтвердили, что таможенный инспектор выкатил фрукты на рампу и оставил их гнить на 6 часов на жаре.
          
Случай официально признан страховым. Страховая компания полностью выплатила 100,000 ₽ пострадавшему клиенту. Бюджет «Глобал Транс» спасен!`,
          amount: 100000,
        } : {
          isWin: false,
          title: '❌ ДЕЛО ПРОИГРАНО!',
          message: 'ПОРАЖЕНИЕ!',
          details: `Страховая компания проверила логи и отклонила наш иск. Вы выбрали неправильный источник выплаты.
          
Компания «Глобал Транс» признана виновной и выплатила 100,000 ₽ штрафа из собственного бюджета.`,
          amount: 100000,
        },
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setScreen,
    setDeclaration,
    loadBox,
    unloadBox,
    completeLoading,
    updateRouteProgress,
    completeRoute,
    viewClue,
    setCourtVerdict,
    setCourtSource,
    submitVerdict,
    resetGame,
  };
};