//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenERC1155 is ERC1155, Ownable {
  uint256 public constant GOLD = 0;
  uint256 public constant SILVER = 1;

  constructor() ERC1155("http://test.com/{id}.json") {
    _mint(msg.sender, GOLD, 10**18, "");
    _mint(msg.sender, SILVER, 10**27, "");
  }
}
