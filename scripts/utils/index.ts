import { artifacts, ethers } from 'hardhat';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { formatEther } from 'ethers/lib/utils';

const contractsDir = __dirname + '/../../frontend/contracts';
const typechainSrcDir = __dirname + '/../../typechain';
const typechainDestDir = __dirname + '/../../frontend/typechain';

export const getFactory = async (contractName: string) => {
  return await ethers.getContractFactory(contractName);
};

export const deployContracts = async (contractName: string, ...args: any[]) => {
  const contractFactory = await getFactory(contractName);

  if (contractFactory?.signer === undefined)
    throw console.error('Is not a contract!');

  const contract = await contractFactory.deploy(...args);

  return contract;
};

export const deployer = async () => {
  const [owner, accountOne] = await ethers.getSigners();

  console.log('Account 0 Deployer Address:', owner.address);
  console.log(
    'Account 0 Deployer balance:',
    formatEther(await owner.getBalance())
  );
  console.log('Account 1 user address:', accountOne.address);

  return [owner, accountOne];
};

export const saveFrontendFiles = (
  address: string,
  contractName: string,
  artifactName?: string
): boolean => {
  let isFinish = false;

  try {
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
    if (!fs.existsSync(typechainDestDir)) {
      fs.mkdirSync(typechainDestDir);
    }

    let dir = contractsDir + '/contract-address.json';
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, JSON.stringify({}));
    }

    let data: string = fs.readFileSync(dir, 'utf-8');
    fs.writeFileSync(
      dir,
      JSON.stringify({ ...JSON.parse(data), [contractName]: address }, null, 2)
    );

    if (artifactName) {
      const artifact = artifacts.readArtifactSync(artifactName);
      fs.writeFileSync(
        contractsDir + `/${contractName}.json`,
        JSON.stringify(artifact, null, 2)
      );
    }

    fse.copySync(typechainSrcDir, typechainDestDir);

    isFinish = true;
  } catch (error: any) {
    isFinish = false;
    console.error(error.message);
  }

  return isFinish;
};
