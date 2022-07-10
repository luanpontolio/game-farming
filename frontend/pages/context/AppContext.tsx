import { createContext, useContext } from 'react';

interface AppContextProps {
  state: any;
  dispatch: any;
}

export const AppContext = createContext({} as AppContextProps);
AppContext.displayName = 'AppContext';

export const useAppContext = () => useContext(AppContext);
