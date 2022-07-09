import { useEffect, useCallback } from "react";
import Web3 from "web3";
import {
  setProvider,
  setResetProvider,
  setAccount,
  setNetwork,
  setWrongNetwork,
} from "../reducers/WalletReducer";
import useWeb3Modal from './useWeb3Modal';

export default (state: any, dispatch: any) => {
  const web3Modal = useWeb3Modal();
  const { provider, network } = state ;

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new Web3(provider);

      const accounts = await web3Provider.eth.getAccounts();
      const network = await web3Provider.eth.getChainId();
      dispatch(setProvider({
        provider,
        web3Provider,
        network,
        account: accounts[0],
      }))
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  const disconnect = useCallback(async () => {
    try {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }

      disconnectAccount();
    } catch (error) {
      console.error(error.message);
    }
  }, [provider]);
  const changeAccount = (accounts: string[]): void => {
    dispatch(setAccount(accounts?.length ? accounts[0] : null));
  };
  const disconnectAccount = async () => {
    dispatch(setResetProvider());
  }
  const chainNetwork = async (chainId: string) => {
    console.log(`chain networking changed: ${chainId}`);
    dispatch(setNetwork(chainId));
  }
  const switchNetwork = async () => {
    try {
      const chainId= Number(process?.env?.CHAIN_ID)
      dispatch(setWrongNetwork(network !== chainId));
      await window?.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if(!provider?.on) return;

    switchNetwork();

    provider.on('accountsChanged', changeAccount);
    provider.on('chainChanged', chainNetwork);
    provider.on('disconnect', disconnectAccount);

    return () => {
      if (provider.removeListener) {
        provider.removeListener('accountsChanged', changeAccount)
        provider.removeListener('chainChanged', chainNetwork)
        provider.removeListener('disconnect', disconnectAccount)
      }
    }
  }, [provider, disconnect]);

  return {
    connect,
    disconnect,
  }
}
