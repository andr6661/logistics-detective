import { useState, useCallback } from 'react';
import {
  ScreenType,
  DeclarationData,
  BoxType,
  CORRECT_BOXES,
} from '../types';

interface LoadedBox {
  id: string;
  type: BoxType;
}

interface GameState {
  currentScreen: ScreenType;
  declaration: DeclarationData | null;
  declarationCorrect: boolean;
  loadingCorrect: boolean;
  loadedBoxes: LoadedBox[];
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

  const loadBox = useCallback((box: LoadedBox) => {
    setState((prev) => ({
      ...prev,
      loadedBoxes: [...prev.loadedBoxes, box],
    }));
  }, []);

  const unloadBox = useCallback((boxId: string) => {
    setState((prev) => ({
      ...prev,
      loadedBoxes: prev.loadedBoxes.filter((b) => b.id !== boxId),
    }));
  }, []);

  const completeLoading = useCallback((isCorrect?: boolean) => {
    setState((prev) => {
      const boxTypes = prev.loadedBoxes.map(b => b.type);
      const loadingCorrect = isCorrect !== undefined
          ? isCorrect
          : (boxTypes.length === CORRECT_BOXES.length &&
              boxTypes.every((b) => CORRECT_BOXES.includes(b)));

      return {
        ...prev,
        loadingCorrect,
        hasIncident: true,
        currentScreen: 'transportRoute',
        routeProgress: 0,
        routeComplete: false,
      };
    });
  }, []);

  const updateRouteProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, routeProgress: Math.min(progress, 100) }));
  }, []);

  const completeRoute = useCallback(() => {
    setState((prev) => {
      // Здесь проверяем, все ли мы сделали правильно до этого
      const hasError = !prev.declaration?.isCorrect || !prev.loadingCorrect;
      if (hasError) {
        return {
          ...prev,
          currentScreen: 'final',
          routeComplete: true,
          finalState: { isWon: false, message: "Ошибка в документах или загрузке!" }
        };
      }
      return { ...prev, currentScreen: 'incidentAlert', routeComplete: true };
    });
  }, []);

  const viewClue = useCallback((clueId: string) => {
    setState((prev) => ({
      ...prev,
      viewedClues: prev.viewedClues.includes(clueId) ? prev.viewedClues : [...prev.viewedClues, clueId]
    }));
  }, []);

  const setCourtVerdict = useCallback((verdict: string) => { setState((prev) => ({ ...prev, courtVerdict: verdict })); }, []);
  const setCourtSource = useCallback((source: string) => { setState((prev) => ({ ...prev, courtSource: source })); }, []);

  // ИСПРАВЛЕННАЯ ЛОГИКА ПОБЕДЫ
  const submitVerdict = useCallback(() => {
    setState((prev) => {
      const isCorrectVerdict = prev.courtVerdict === 'thirdParty' && prev.courtSource === 'insurance';

      // Игрок побеждает, если вердикт верен И всё предыдущее было сделано правильно
      const isWon = isCorrectVerdict && prev.declarationCorrect && prev.loadingCorrect;

      return {
        ...prev,
        currentScreen: 'final',
        finalState: {
          isWon,
          message: isWon
              ? "ДЕЛО ВЫИГРАНО! Вы доказали невиновность компании."
              : "ВЕРДИКТ НЕВЕРНЫЙ! Компания признана виновной, убытки не покрыты."
        }
      };
    });
  }, []);

  const resetGame = useCallback(() => { setState(initialState); }, []);

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