<!-- Ghost Brand -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Game Farming by Luan Pontolio</h3>

<p align="center">
    <br />
    
</p>/

</p>

# Setup checklist

[ ] Node 16.14.2

# Setup environment variables

1. Check `env.example` at project root and fill in corresonpding values on your local
2. Go to https://infura.io/ and make an account
3. Paste the kovan project ID into your .env as the value for `INFURA_PROJECT_ID` key
4. Generate a 12 word mnemonic seed phrase (can use ganache to get one or ask project admin for current seed used for remote envs)
5. Paste 12 word mnemonic seed phrase as value for `MNEMONIC_SEED` key
6. Go to https://alchemyapi.io/ and setup an account then take the api key for the relevant network (like mainnet, kovan or ropsten) or ask the team for an existing API key and paste under `ALCHEMY_KEY`
7. When setting up locally, paste `LOCALHOST` as value to `CHAIN_NETWORK`. Other values are `KOVAN` or `MAINNET` (we are not on other testnets atm)

# Metamask

1. Be sure to have metamask plugin installed in your browser (recommended browser is Chrome)
2. Login to Metamask and point the network to localhost and port 7545 before starting the frontend app
3. Install ganache `https://trufflesuite.com/ganache/`.

## Quickstart: Running local

1. Open a new terminal window and run `git clone https://github.com/luanpontolio/game-farming && cd game-farming`
2. run `yarn` to install backend dependencies
3. run `npm run test:local` to run contract test suite to run smart contract test cases
4. run `npm run deploy:local` to compile and deploy the Game-Farming contracts to the ganache node
5. cd to frontend `cd frontend`
6. run `yarn` to install frontend dependencies
7. run `npm run dev` to serve the app locally

## Environment Setup

#### Quickstart Setup

- [ ] Install all dependencies
- [ ] Deployed a local ethereum network with Ganache on the uma protocol/ protocol folder
- [ ] Compliled and deployed smart contract to the blockchain
- [ ] Contract artifact and typechain is auto generated in the `frontend` folder

#### Terminal Setup Checklist

- [ ] Terminal 1 - React Front End for the dapp
#### Dapp Setup Checklist

- [ ] Deploy the local ganache
- [ ] Metamask set to the network you are developing to (localhost:7545 for local, testnet of choice)
- [ ] Run a local react server

#### Smart Contract Development Setup Checklist

- [ ] Contract and other dependencies are in the same folder

## Tutorials

#### Deploying contracts in Local

1. Ensure your local environment has been set up (ganache node, truffle console)
2. Run `npm run test:local` to ensure all tests are passing (make sure you have the setup your local environment first)
3. Make sure your ganache is running and open `localhost:7545`
4. If tests are passing running `DEPLOY_PATH=scripts/deploy.ts npm run deploy:local`
5. The contracts addresses and the owner address will show up on terminal.
6. Run the dApp: `cd frontend && npm run dev`
7. Change your metamask network to `localhost`
8. The Game-Farming dApp UI should load
#### Resources

[HardHat Documentation](https://hardhat.org/getting-started/) - Hardhat tutorials, config, network, and plugin references

## Troubleshooting

1. Error: Cannot use JSX unless the '--jsx' flag is provided

- Follow: https://vscode.readthedocs.io/en/latest/languages/typescript/#using-the-workspace-version-of-typescript - "Using the workspace version of TypeScript" section

2. Warning: Calling an account which is not a contract

- Compile and deploy your contract first. Run `npm run deploy:local` for local deployments.

## Guidelines:

- Name your branches starting with branchName. Ex. doingSomethingNew or fixSomething.
