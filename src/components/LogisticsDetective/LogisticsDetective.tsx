import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { useGameState, CORRECT_BOXES } from './hooks/useGameState';
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

const isTouch = () => 'ontouchstart' in window;

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

  const Backend = isTouch() ? TouchBackend : HTML5Backend;

  switch (state.currentScreen) {
    case 'mainMenu':
      return <MainMenu onStart={() => setScreen('contractBriefing')} />;

    case 'contractBriefing':
      return <ContractBriefing onNext={() => setScreen('declarationForm')} />;

    case 'declarationForm':
      return <DeclarationForm onSubmit={setDeclaration} onNext={() => setScreen('warehouseLoading')} />;

    case 'warehouseLoading':
      return (
        <DndProvider backend={Backend}>
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
        </DndProvider>
      );

    case 'transportRoute':
      return (
        <TransportRoute
          progress={state.routeProgress}
          isComplete={state.routeComplete}
          hasIncident={state.hasIncident}
          onUpdateProgress={updateRouteProgress}
          onComplete={completeRoute}
        />
      );

    case 'incidentAlert':
      return <IncidentAlert onNext={() => setScreen('investigation')} />;

    case 'investigation':
      return (
        <Investigation
          viewedClues={state.viewedClues}
          onViewClue={viewClue}
          onNext={() => setScreen('courtRoom')}
          hasIncident={state.hasIncident}
        />
      );

    case 'courtRoom':
      return (
        <CourtRoom
          onSelectVerdict={setCourtVerdict}
          onSelectSource={setCourtSource}
          onSubmit={submitVerdict}
          selectedVerdict={state.courtVerdict}
          selectedSource={state.courtSource}
          isSubmitted={false}
        />
      );

    case 'final':
      return <FinalScreen finalState={state.finalState} onRestart={resetGame} />;

    default:
      return <MainMenu onStart={() => setScreen('contractBriefing')} />;
  }
}

export default LogisticsDetective;