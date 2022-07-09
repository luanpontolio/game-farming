import { ethers } from 'hardhat';
import { BigNumber, Contract } from 'ethers';
import { expect } from 'chai';

export const checkStakeEvent = async (
  contract: Contract,
  account: string,
  tokenId: number,
): Promise<boolean> => {
  let stakeEvent = new Promise<any>((resolve, reject) => {
    contract.on('Staked', (address, tokenId) => {
      resolve({
        address,
        tokenId,
      });
    });

    setTimeout(() => {
      reject(new Error('timeout'));
    }, 60000);
  });

  const eventStake = await stakeEvent;
  expect(eventStake.address).to.be.equal(account);
  expect(eventStake.tokenId).to.be.equal(tokenId);

  contract.removeAllListeners();

  return true;
};
