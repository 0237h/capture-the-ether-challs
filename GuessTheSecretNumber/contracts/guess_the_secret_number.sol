// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface ABI {
    function guess(uint8) external payable;
}

/**
 * @title GuessTheSecretNumber
 * @dev Simply calls the function with the right number, requiring 1 ether.
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract GuessTheSecretNumber {
    constructor() payable {}
    receive() external payable {}
    function guess(address _contract, uint8 _n) public {
        ABI(_contract).guess{value: 1 ether}(_n); // Number is 170 (hash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365)
    }

    function sweep(address payable _to) public {
        selfdestruct(_to);
    }
}