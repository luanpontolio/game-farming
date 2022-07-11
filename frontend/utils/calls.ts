import { Contract } from 'web3-eth-contract';
import web3 from 'web3'

const NUMBER_ITEM: number = 1;
const { padRight, asciiToHex } = web3.utils;

export const uri = async (
  contract: Contract,
  account: string,
  tokenId: string
) => {
  return contract.methods.uri(tokenId).call({ from: account });
}

export const approve = async (
  contract: Contract,
  account: string,
  to: string,
  type: boolean
) => {
  return contract.methods.setApprovalForAll(to, type).send({ from: account });
}

export const stake = async (
  contract: Contract,
  account: string,
  tokenId: string,
  data: any,
) => {
  return contract.methods.stake(
    Number(tokenId),
    NUMBER_ITEM,
    padRight(asciiToHex(data), 64)
  )
  .send({ from: account })
  .once('confirmation', () => {
    console.log('confirmed');
  })
  .on('error', (error: any) => console.log('error'));
}

export const earned = (
  contract: Contract,
  account: string,
) => {
  return contract.methods.earned(account).call({ from: account });
}

export const rewards = (
  contract: Contract,
  account: string,
) => {
  return contract.methods.getReward().send({ from: account });
}

export const filterByEvent = async (
  contract: Contract,
  event: string,
  account: string
) => {
  return await contract.getPastEvents(event, {
    filter: { to: account },
    fromBlock: 0,
    toBlock: 'latest',
  });
};
