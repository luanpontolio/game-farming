import { useEffect, useState } from 'react';
import { providerOptions } from '../utils/config';
import Web3Modal from 'web3modal';

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: process.env.CHAIN_NETWORK,
    cacheProvider: true,
    providerOptions,
  });
}

const useWeb3Modal = () => {
  const [modal, setWeb3Modal] = useState<any>(web3Modal);

  useEffect(() => {
    if (!modal) {
      setWeb3Modal(new Web3Modal({
        network: process.env.CHAIN_NETWORK,
        cacheProvider: true,
        providerOptions,
      }));
    }
  }, [modal])

  return modal;
};

export default useWeb3Modal;
