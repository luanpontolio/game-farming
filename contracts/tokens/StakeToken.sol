//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakeToken is ERC1155, Ownable {
  uint256 public constant THORS_HAMMER = 2;

  constructor() ERC1155("./assets/{id}.json") {
    _mint(msg.sender, THORS_HAMMER, 10**18, "");
  }
}
