import { useEffect, useState } from 'react';
import { useAppContext } from '../pages/context/AppContext';
import yieldFarmingAbi from '../contracts/YieldFarmingWithNFT.json';
import stakeTokenAbi from '../contracts/StakeToken.json';
import useWeb3Modal from './useWeb3Modal';
import contractAddress from '../contracts/contract-address.json';

export const useContract = (abi: any, address: string) => {
  const { state } = useAppContext();
  const [contract, setContract] = useState<any>(null)
  const { web3Provider: web3 } = state;

  useEffect(() => {
    if (web3) {
      setContract(new web3.eth.Contract(abi, address));
    }
  }, [abi, address, web3]);

  return contract;
};

export const useYieldFarmingContract = () => {
  return useContract(yieldFarmingAbi.abi, contractAddress.YieldFarmingWithNFT);
};

export const useStakeTokenContract = () => {
  return useContract(stakeTokenAbi.abi, contractAddress.StakeToken);
};
