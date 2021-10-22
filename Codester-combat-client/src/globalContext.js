import * as React from 'react';

export const GlobalContext = React.createContext();

function countReducer(state, action) {
  switch (action.type) {
    case 'updateUserId': {
      return { ...state, userId: action.payload };
    }
    case 'updateUser2Id': {
      return { ...state, user2Id: action.payload };
    }
    case 'updatePlayer1Id': {
      return { ...state, player1Id: action.payload };
    }
    case 'updatePlayer2Id': {
      return { ...state, player2Id: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, {
    userId: '',
    player1Id: '',
    player2Id: '',
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}

export { GlobalProvider, useGlobal };
