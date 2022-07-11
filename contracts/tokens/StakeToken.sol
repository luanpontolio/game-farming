//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract StakeToken is ERC1155 {
  uint256 public constant THORS_HAMMER = 1;
  uint256 public constant CAPTAIN_SHIELD = 2;
  uint256 public constant BOW_AND_ARROW = 3;
  uint256 public constant IRON_SUIT = 4;

  constructor() ERC1155("./api/{id}.json") {
    _mint(msg.sender, THORS_HAMMER, 10**18, "");
    _mint(msg.sender, CAPTAIN_SHIELD, 10**18, "");
    _mint(msg.sender, BOW_AND_ARROW, 10**18, "");
    _mint(msg.sender, IRON_SUIT, 10**18, "");
  }
}
