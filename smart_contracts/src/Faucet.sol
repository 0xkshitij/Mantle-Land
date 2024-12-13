// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol"; // Add this import for IERC1155Receiver
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract Faucet is ERC2771Context {
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function getToken(address tokenAddress, uint256 tokenId) public {
        // Transfer 10 tokens of the specified tokenId to the caller
        IERC1155(tokenAddress).safeTransferFrom(
            address(this),
            _msgSender(),
            tokenId,
            10,
            ""
        );
    }

    // Required by ERC1155 standard to handle token reception
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return IERC1155Receiver.onERC1155Received.selector;
    }

    // Required by ERC1155 standard to handle batch token reception
    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }
}
