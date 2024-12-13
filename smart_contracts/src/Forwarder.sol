// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC2771Forwarder} from "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";

contract Forwarder is ERC2771Forwarder {
    constructor(string memory _trustedForwarder) ERC2771Forwarder(_trustedForwarder) {}
}
