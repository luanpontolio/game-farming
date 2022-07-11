import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import {
  erc1155ContractLabelString,
  erc20ContractLabelString,
  deployTokenWithArgs,
  deployToken,
  deployYieldFarming,
} from "./utils/setup";
import { checkStakeAndWithdrawEvent } from "./utils/CheckEvents";

const fastForward = async (num: number) => {
  await ethers.provider.send("evm_increaseTime", [86400]);
  await ethers.provider.send("evm_mine", []);

  return true;
};

describe("YieldFarmingWithNFT", async function () {
  let stakingToken: any,
    rewardsToken: any,
    yieldFarming: any,
    owner: any,
    accounts: any,
    accountOne: any,
    accountTwo: any;

  const ZERO = BigNumber.from(parseEther("0")).toString();

  beforeEach(async () => {
    [owner, ...accounts] = await ethers.getSigners();
    accountOne = accounts[0];
    accountTwo = accounts[1];

    stakingToken = await deployToken(erc1155ContractLabelString);
    rewardsToken = await deployTokenWithArgs(
      erc20ContractLabelString,
      "Token",
      "TKN",
      BigNumber.from(parseEther("1000")).toString()
    );

    await rewardsToken.approve(
      accountOne.address,
      BigNumber.from(parseEther("100")).toString()
    );
    await rewardsToken.approve(
      accountTwo.address,
      BigNumber.from(parseEther("100")).toString()
    );
    await rewardsToken.transfer(
      accountOne.address,
      BigNumber.from(parseEther("100")).toString()
    );
    await rewardsToken.transfer(
      accountTwo.address,
      BigNumber.from(parseEther("100")).toString()
    );

    yieldFarming = await deployYieldFarming(
      accountOne.address,
      rewardsToken.address,
      stakingToken.address
    );
  });

  describe("#constructor", async function () {
    it("should set rewards token on constructor", async () => {
      expect(await yieldFarming.rewardsToken()).to.be.equal(
        rewardsToken.address
      );
    });

    it("should staking token on constructor", async () => {
      expect(await yieldFarming.stakingToken()).to.be.equal(
        stakingToken.address
      );
    });

    it("should set owner on constructor", async () => {
      const ownerAddress = await yieldFarming.owner();
      expect(ownerAddress).to.be.equal(owner.address);
    });
  });

  describe("Pausable", async function () {
    beforeEach(async () => {
      await yieldFarming.setPaused(true);
    });

    it("should revert calling stake() when paused", async () => {
      const tokenId = 1;
      await stakingToken.setApprovalForAll(yieldFarming.address, true);

      expect(
        await stakingToken.isApprovedForAll(owner.address, yieldFarming.address)
      ).to.be.true;

      try {
        await yieldFarming.stake(
          tokenId,
          1,
          ethers.utils.formatBytes32String("")
        );
      } catch (error: any) {
        expect(error.message).to.match(
          /This action cannot be performed while the contract is paused/
        );
      }
    });

    it("should not revert calling stake() when unpaused", async () => {
      await yieldFarming.setPaused(false);

      const tokenId = 1;
      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(
        tokenId,
        1,
        ethers.utils.formatBytes32String("")
      );

      expect(await checkStakeAndWithdrawEvent(yieldFarming, owner.address, tokenId, 'Staked')).to.be.true;
    });
  });

  describe("rewardPerToken()", () => {
    it("should return 0", async () => {
      expect(await yieldFarming.rewardPerToken()).to.be.equal(0);
    });

    it("should be > 0", async () => {
      const totalSupply = await yieldFarming.totalSupply();
      expect(totalSupply.toString()).to.be.equal(
        BigNumber.from(parseEther("0")).toString()
      );

      const rewardValue = BigNumber.from(parseEther("50")).toString();
      await rewardsToken.approve(yieldFarming.address, rewardValue);
      await rewardsToken.transfer(yieldFarming.address, rewardValue);
      await yieldFarming.connect(accountOne).notifyRewardAmount(rewardValue);

      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));

      // Forward 1 day
      await fastForward(86400);

      const rewardPerToken = await yieldFarming.rewardPerToken();
      expect(rewardPerToken.toString() > BigNumber.from("0").toString()).to.be
        .true;
    });
  });

  describe("#stake", async function () {
    it("should increase the balance staked", async () => {
      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));
      const initialStakeBal = await yieldFarming.balanceOf(owner.address);

      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(2, 1, ethers.utils.formatBytes32String(""));
      const postStakeBal = await yieldFarming.balanceOf(owner.address);

      expect(postStakeBal.toString() > initialStakeBal.toString()).to.be.true;
    });

    it("should increase totalSupply staked", async () => {
      const totalSupplyBefore = await yieldFarming.totalSupply();

      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));

      const totalSupplyAfter = await yieldFarming.totalSupply();

      expect(await checkStakeAndWithdrawEvent(yieldFarming, owner.address, 1, 'Staked')).to.be.true;
      expect(totalSupplyAfter.toString() > totalSupplyBefore.toString()).to.be
        .true;
    });

    it("cannot staked twice the same id", async () => {
      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));

      try {
        await stakingToken.setApprovalForAll(yieldFarming.address, true);
        await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));
      } catch (error: any) {
        expect(error.message).to.match(/Not empty/);
      }
    });
  });

  describe("earned", async function () {
    it("should be 0 when not staking", async function () {
      expect((await yieldFarming.earned(owner.address)).toString()).to.be.equal(
        ZERO
      );
    });

    it("should be > 0 when staking", async function () {
      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));

      const rewardValue = BigNumber.from(parseEther("50")).toString();
      await rewardsToken.approve(yieldFarming.address, rewardValue);
      await rewardsToken.transfer(yieldFarming.address, rewardValue);
      await yieldFarming.connect(accountOne).notifyRewardAmount(rewardValue);

      // Forward 1 day
      await fastForward(86400);

      const earned = await yieldFarming.earned(owner.address);

      expect(earned.toString() > ZERO).to.be.true;
    });

    it("rewardRate should increase if new rewards come before DURATION ends", async function () {
      const totalDistrubution = BigNumber.from(parseEther("50")).toString();

      await rewardsToken.approve(yieldFarming.address, totalDistrubution);
      await rewardsToken.transfer(yieldFarming.address, totalDistrubution);
      await yieldFarming
        .connect(accountOne)
        .notifyRewardAmount(totalDistrubution);

      const rewardRateInitial = await yieldFarming.rewardRate();

      await rewardsToken.approve(yieldFarming.address, totalDistrubution);
      await rewardsToken.transfer(yieldFarming.address, totalDistrubution);
      await yieldFarming
        .connect(accountOne)
        .notifyRewardAmount(totalDistrubution);

      const rewardRateLater = await yieldFarming.rewardRate();

      expect(rewardRateInitial.toString() > ZERO).to.be.true;
      expect(rewardRateLater.toNumber() > rewardRateInitial.toNumber()).to.be
        .true;
    });
  });

  describe('withdraw', async function() {
    it('cannot withdraw if nothing stake', async function() {
      try {
        await yieldFarming.withdraw(1, 1, ethers.utils.formatBytes32String(""))
      } catch(error: any) {
        expect(
          error.message
        ).to.match(/TokeId not staked/);
      }
    });

    it('should increases NFT token balance and decreases staking balance', async () => {
      await stakingToken.setApprovalForAll(yieldFarming.address, true);
      await yieldFarming.stake(1, 1, ethers.utils.formatBytes32String(""));

      const initialStakingTokenBal = await stakingToken.balanceOf(owner.address, 1);
      const initialStakeBal = await yieldFarming.balanceOf(owner.address);

      await yieldFarming.withdraw(1, 1, ethers.utils.formatBytes32String(""));

      const postStakingTokenBal = await stakingToken.balanceOf(owner.address, 1);;
      const postStakeBal = await yieldFarming.balanceOf(owner.address);

      expect(
        await checkStakeAndWithdrawEvent(yieldFarming, owner.address, 1, 'Withdrawn')
      ).to.be.true;
      expect(postStakeBal.toString() < initialStakeBal.toString()).to.be.true;
      expect((initialStakingTokenBal.toString() / 10**18) === (postStakingTokenBal.toString() / 10**18)).to.be.true
    });
  });
});
