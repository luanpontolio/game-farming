//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenERC20 is ERC20 {
  constructor() ERC20("Token", "TKN") {
    _mint(msg.sender, 1_000_000*1e18);
  }
}
