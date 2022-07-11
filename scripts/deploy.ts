import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { deployContracts, deployer, saveFrontendFiles } from './utils';

// For the test.
// REWARDS_TOKEN_ADDRESS, GHO address on Rinkeby:
// https://rinkeby.etherscan.io/token/0xC68e24098636Bd89Ef6aAAfc4920b0c4b9D0B862#balances
// STAKE_TOKEN_ADDRESS, OPENSEA ERC1155 address on Rinkeby:
// https://rinkeby.etherscan.io/address/0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656
const { REWARDS_TOKEN_ADDRESS, STAKE_TOKEN_ADDRESS, CHAIN_NAME } = process.env;

let yieldFarmingContractLabelString: string = 'YieldFarmingWithNFT';
let erc20ContractLabelString: string = 'RewardsToken';
let erc1155ContractLabelString: string = 'StakeToken';

let totalSupply = BigNumber.from(parseEther('1000'));

async function main() {
  const [_, rewardsDistributor] = await deployer();

  const RewardsToken = await deployContracts(erc20ContractLabelString, 'RewardsToken', 'RWT', totalSupply)
  const StakeToken = await deployContracts(erc1155ContractLabelString)

  const yieldFarming = await deployContracts(
    yieldFarmingContractLabelString,
    rewardsDistributor.address,
    RewardsToken.address,
    StakeToken.address
  );

  console.log(`YieldFarmingWithNFT address contract: ${yieldFarming.address}`);
  console.log(`RewardsDistributor address account: ${rewardsDistributor.address}`);
  console.log(`Rewards token address contract: ${RewardsToken.address}`);
  console.log(`Stake token address contract: ${StakeToken.address}`);

  // transfer RewardsToken for contract
  const totalRewards = BigNumber.from(parseEther('100'))
  await RewardsToken.approve(yieldFarming.address, totalRewards);
  await RewardsToken.transfer(yieldFarming.address, totalRewards);
  await yieldFarming.connect(rewardsDistributor).notifyRewardAmount(totalRewards);

  [
    [
      yieldFarming.address,
      yieldFarmingContractLabelString,
      yieldFarmingContractLabelString
    ],
    [
      RewardsToken.address,
      erc20ContractLabelString,
      erc20ContractLabelString
    ],
    [
      StakeToken.address,
      erc1155ContractLabelString,
      erc1155ContractLabelString
    ]
  ].map((args: any[]) => {
    saveFrontendFiles(
      args[0], args[1], args[2],
    );
  });
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
