import Container from '@mui/material/Container';
import useWallet from '../../hooks/useWallet';
import { useAppContext } from '../../pages/context/AppContext'
import styles from '../../styles/Home.module.css'
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const Main = () => {
  const { state, dispatch } = useAppContext();
  const { connect, disconnect } = useWallet(state, dispatch);
  const { account } = state;

  return (
    <Container>
      <ConnectWallet
        account={account}
        onConnect={connect}
        onDisconnect={disconnect}
      />
    </Container>
  )
}

export default Main;