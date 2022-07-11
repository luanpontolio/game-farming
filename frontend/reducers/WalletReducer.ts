import { network } from "hardhat";
import Web3 from "web3";

export type TState = {
  provider?: any,
  web3Provider?: Web3 | null | undefined,
  account?: string | null | undefined
  network?: string | null | undefined,
  wrongNetwork?: boolean | null,
}

type TAction = {
  type?: string;
} & TState;


export const Types = {
  SET_ACCOUNT: '@PROVIDER/SET_ACCOUNT',
  SET_LOADING_WALLET: '@PROVIDER/SET_LOADING',
  SET_NETWORK: '@PROVIDER/SET_NETWORK',
  SET_WRONG_NETWORK: '@PROVIDER/SET_WRONG_NETWORK',
  SET_PROVIDER: '@PROVIDER/SET_PROVIDER',
  SET_RESET_PROVIDER: '@PROVIDER/SET_RESET_PROVIDER',
}

export const initialState: TState = {
  provider: null,
  web3Provider: null,
  account: null,
  wrongNetwork: null,
  network: process?.env?.CHAIN_ID,
}

export const setAccount = (account: string | any) => ({
  type: Types.SET_ACCOUNT,
  account,
});

export const setProvider = (data: any) => ({
  type: Types.SET_PROVIDER,
  ...data,
});

export const setResetProvider = () => ({
  type: Types.SET_RESET_PROVIDER,
})

export const setNetwork = (network: string) => ({
  type: Types.SET_NETWORK,
  network,
})

export const setLoading = (loading: boolean) => ({
  type: Types.SET_LOADING_WALLET,
  loading,
});

export const setWrongNetwork = (wrongNetwork: boolean) => ({
 type: Types.SET_WRONG_NETWORK,
 wrongNetwork
});

export function reducers(state: TState = initialState, action: TAction) {
  const {
    type,
    provider,
    web3Provider,
    account,
    network,
    wrongNetwork
  } = action;

  switch (type) {
    case Types.SET_PROVIDER:
      return {
        ...state,
        provider,
        web3Provider,
        account,
        network,
      }

    case Types.SET_ACCOUNT:
      return {
        ...state,
        account,
      }

    case Types.SET_NETWORK:
      return {
        ...state,
        network,
      }
    case Types.SET_WRONG_NETWORK:
      return {
        ...state,
        wrongNetwork,
      }

    case Types.SET_RESET_PROVIDER:
      return initialState

    default:
      return state;
  }
}
