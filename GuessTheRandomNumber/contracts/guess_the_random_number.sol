// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface ABI {
    function guess(uint8) external payable;
}

/**
 * @title GuessTheRandomNumber
 * @dev Simply calls the function with the right number, requiring 1 ether.
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract GuessTheRandomNumber {
    constructor() payable {}
    receive() external payable {}
    function guess(address _contract, uint8 _n) public {
        ABI(_contract).guess{value: 1 ether}(_n); // Number is 186, determined from the block number and stored publicly on the blockchain (0x34745d18dfe1c80490dbaf1d2b5f47f8c2be69eaf9e9d6ffef1baa52a5c3d66d)
    }

    function sweep(address payable _to) public {
        selfdestruct(_to);
    }
}