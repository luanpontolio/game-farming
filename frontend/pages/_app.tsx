import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useReducer } from 'react';
import { initialState, reducers } from '../reducers/WalletReducer'
import { AppContext } from './context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
