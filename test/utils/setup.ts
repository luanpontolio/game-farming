import { ethers } from 'hardhat';

let TokenContract, RewardsContract;

export let erc1155ContractLabelString: string = 'TokenERC1155';
export let erc20ContractLabelString: string = 'TokenERC20';
export let yieldFarmingContractLabelString: string = 'YieldFarmingWithNFT';

export const deployToken = async (contractLabel: string) => {
  TokenContract = await ethers.getContractFactory(contractLabel);

  return await TokenContract.deploy();
}

export const deployYieldFarming = async (
  ownerAddress: string,
  rewardsTokenAddress: string,
  stakeTokenAddress: string,
) => {
  RewardsContract = await ethers.getContractFactory(yieldFarmingContractLabelString);

  return await RewardsContract.deploy(ownerAddress, rewardsTokenAddress, stakeTokenAddress);
}
