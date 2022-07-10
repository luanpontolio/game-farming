require('dotenv').config();

import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import 'solidity-coverage';
import { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types';
import { task } from 'hardhat/config';

// .env
const {
  CHAIN_ID,
  ETHERSCAN_API_KEY,
  GAS_LIMIT,
  GAS_PRICE,
  ALCHEMY_PROJECT_URL,
  MNEMONIC_SEED,
  PRIVATE_KEY,
  SECOND_PRIVATE_KEY,
} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  mocha: {
    timeout: 1500000,
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  networks: {
    rinkeby: {
      chainId: Number(CHAIN_ID),
      url: ALCHEMY_PROJECT_URL,
      accounts: [PRIVATE_KEY, SECOND_PRIVATE_KEY],
      gas: Number(GAS_LIMIT),
      gasPrice: Number(GAS_PRICE) * 10000, // gwei unit
      timeout: 600 * 1000, // milliseconds
      live: true,
      saveDeployments: true,
      throwOnCallFailures: true,
      throwOnTransactionFailures: true,
      loggingEnabled: true,
    } as NetworkUserConfig,
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: MNEMONIC_SEED,
      },
    },
    localhost: {
      chainId: 1337,
      url: 'http://127.0.0.1:7545',
      gasPrice: 5000000000,
    },
  },
} as HardhatUserConfig;

export default config;
