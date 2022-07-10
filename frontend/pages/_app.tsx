import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app'
import { useReducer } from 'react';
import { initialState, reducers } from '../reducers/WalletReducer'
import { AppContext } from './context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
