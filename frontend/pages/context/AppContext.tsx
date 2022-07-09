import { createContext, useContext } from 'react';

export const AppContext = createContext(null);
AppContext.displayName = 'AppContext';

export const useAppContext = () => useContext(AppContext);
