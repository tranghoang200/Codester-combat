import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './Constant/routes';
import LobbyPage from './component/LobbyPage/lobby';
import gamePage from './component/GamePage/gamePage';
import SelectionScreen from './component/player-selection/SelectionScreen';
import MatchingScreen from './component/matching/MatchingScreen';
import GameResult from './component/GameResultPage/gameResult';
import { GlobalProvider } from './globalContext';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Route exact path={ROUTES.START} component={LobbyPage} />
        <Route path={ROUTES.GAME} component={gamePage} />
        <Route path={ROUTES.PLAYER_SELECTION} component={SelectionScreen} />
        <Route path={ROUTES.MATCHING_SCREEN} component={MatchingScreen} />
        <Route path={ROUTES.GAME_RESULT} component={GameResult} />
      </Router>
    </GlobalProvider>
  );
}

export default App;
