//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardsToken is ERC20, Ownable {
  constructor(string memory name, string memory symbol, uint256 totalSupply_) ERC20(name, symbol) {
    _mint(msg.sender, totalSupply_);
  }
}
