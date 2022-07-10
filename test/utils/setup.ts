import { ethers } from 'hardhat';

let TokenContract, RewardsContract;

export let erc1155ContractLabelString: string = 'StakeToken';
export let erc20ContractLabelString: string = 'RewardsToken';
export let yieldFarmingContractLabelString: string = 'YieldFarmingWithNFT';

export const deployToken = async (contractLabel: string) => {
  TokenContract = await ethers.getContractFactory(contractLabel);

  return await TokenContract.deploy();
}

export const deployTokenWithArgs = async (contractLabel: string, ...args: any[]) => {
  TokenContract = await ethers.getContractFactory(contractLabel);

  return await TokenContract.deploy(...args);
}

export const deployYieldFarming = async (
  ownerAddress: string,
  rewardsTokenAddress: string,
  stakeTokenAddress: string,
) => {
  RewardsContract = await ethers.getContractFactory(yieldFarmingContractLabelString);

  return await RewardsContract.deploy(ownerAddress, rewardsTokenAddress, stakeTokenAddress);
}
