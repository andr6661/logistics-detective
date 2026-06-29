import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { useGameState } from './hooks/useGameState';
import { CORRECT_BOXES } from './types';
import MainMenu from './screens/MainMenu';
import ContractBriefing from './screens/ContractBriefing';
import DeclarationForm from './screens/DeclarationForm';
import WarehouseLoading from './screens/WarehouseLoading';
import TransportRoute from './screens/TransportRoute';
import IncidentAlert from './screens/IncidentAlert';
import Investigation from './screens/Investigation';
import CourtRoom from './screens/CourtRoom';
import FinalScreen from './screens/FinalScreen';

import './styles.css';

// Определяем тач-устройство
const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Оптимальные настройки для сенсоров
const dndOptions = {
  enableMouseEvents: true, // Позволяет работать мышкой на десктопе
  enableTouchEvents: true, // Включает тач
  delayTouchStart: 50,     // Важно: небольшая задержка для корректного захвата
};

function LogisticsDetective() {
  const {
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
  } = useGameState();

  // Выбираем бэкенд один раз при инициализации
  const Backend = isTouch() ? TouchBackend : HTML5Backend;

  return (
      <DndProvider backend={Backend} options={isTouch() ? dndOptions : {}}>
        <div className="app-container">
          {state.currentScreen === 'mainMenu' && (
              <MainMenu onStart={() => setScreen('contractBriefing')} />
          )}

          {state.currentScreen === 'contractBriefing' && (
              <ContractBriefing onNext={() => setScreen('declarationForm')} />
          )}

          {state.currentScreen === 'declarationForm' && (
              <DeclarationForm onSubmit={setDeclaration} onNext={() => setScreen('warehouseLoading')} />
          )}

          {state.currentScreen === 'warehouseLoading' && (
              <WarehouseLoading
                  loadedBoxes={state.loadedBoxes}
                  correctBoxes={CORRECT_BOXES}
                  onLoadBox={loadBox}
                  onUnloadBox={unloadBox}
                  onComplete={(isCorrect: boolean) => {
                    completeLoading(isCorrect);
                    setScreen('transportRoute');
                  }}
              />
          )}

          {state.currentScreen === 'transportRoute' && (
              <TransportRoute
                  progress={state.routeProgress}
                  isComplete={state.routeComplete}
                  hasIncident={state.hasIncident}
                  onUpdateProgress={updateRouteProgress}
                  onComplete={completeRoute}
              />
          )}

          {state.currentScreen === 'incidentAlert' && (
              <IncidentAlert onNext={() => setScreen('investigation')} />
          )}

          {state.currentScreen === 'investigation' && (
              <Investigation
                  viewedClues={state.viewedClues}
                  onViewClue={viewClue}
                  onNext={() => setScreen('courtRoom')}
                  hasIncident={state.hasIncident}
              />
          )}

          {state.currentScreen === 'courtRoom' && (
              <CourtRoom
                  onSelectVerdict={setCourtVerdict}
                  onSelectSource={setCourtSource}
                  onSubmit={submitVerdict}
                  selectedVerdict={state.courtVerdict}
                  selectedSource={state.courtSource}
                  isSubmitted={false}
              />
          )}

          {state.currentScreen === 'final' && (
              <FinalScreen finalState={state.finalState} onRestart={resetGame} />
          )}
        </div>
      </DndProvider>
  );
}

export default LogisticsDetective;