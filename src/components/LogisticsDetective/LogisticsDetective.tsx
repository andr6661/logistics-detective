import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { useGameState } from './hooks/useGameState';
import { CORRECT_BOXES } from './types';

// Импорты экранов
import MainMenu from './screens/MainMenu';
import Intro from './screens/Intro';
import ContractBriefing from './screens/ContractBriefing';
import DeclarationForm from './screens/DeclarationForm';
import WarehouseLoading from './screens/WarehouseLoading';
import TransportRoute from './screens/TransportRoute';
import IncidentAlert from './screens/IncidentAlert';
import Investigation from './screens/Investigation';
import CourtRoom from './screens/CourtRoom';
import FinalScreen from './screens/FinalScreen';

import './styles.css';

const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const dndOptions = { enableMouseEvents: true, enableTouchEvents: true, delayTouchStart: 50 };

export default function LogisticsDetective() {
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

  const Backend = isTouch() ? TouchBackend : HTML5Backend;

  return (
      <DndProvider backend={Backend} options={isTouch() ? dndOptions : {}}>
        <div className="app-container" style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>

          {/* 1. Главное меню */}
          {state.currentScreen === 'mainMenu' && (
              <MainMenu onStart={() => setScreen('intro')} />
          )}

          {/* 2. Интро после меню */}
          {state.currentScreen === 'intro' && (
              <Intro onNext={() => setScreen('contractBriefing')} />
          )}

          {/* 3. Остальной путь игры */}
          {state.currentScreen === 'contractBriefing' && (
              <ContractBriefing onNext={() => setScreen('declarationForm')} />
          )}

          {state.currentScreen === 'declarationForm' && (
              <DeclarationForm
                  onSubmit={setDeclaration}
                  onNext={() => setScreen('warehouseLoading')}
              />
          )}

          {state.currentScreen === 'warehouseLoading' && (
              <WarehouseLoading
                  loadedBoxes={state.loadedBoxes || []} // Защита от undefined
                  correctBoxes={CORRECT_BOXES}
                  onLoadBox={loadBox}
                  onUnloadBox={unloadBox}
                  onComplete={(isCorrect: boolean) => {
                    completeLoading(isCorrect);
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