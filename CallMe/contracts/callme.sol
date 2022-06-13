// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title CallMe
 * @dev Simply call the contract function to solve the level
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract CallMe {
    function callIt(address _contract) public {
        _contract.call(abi.encodeWithSignature("callme()"));
    }
}