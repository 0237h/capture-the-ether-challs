pragma solidity >0.8.0;

interface FuzzyIdentity {
    function authenticate() external;
}

contract FuzzyIdentitySteal {
    function name() public pure returns (bytes32) {
        return bytes32("smarx");
    }

    function authenticate(address _contract) public {
        FuzzyIdentity(_contract).authenticate();
    }
}

/**
* @title FuzzyIdentityDeploy
* @dev The goal is to generate a contract who's address contains the bytes 'badc0de' (order is important) in it. Contract addresses are generated based on the current contract address, their deployement
* code as well as a 'salt' when using the 'create2' instruction. Using the salt, we can generate many addresses with the hope of finding one that contains the magic bytes to validate the chall.
*  
* For efficiceny and obvious gas costs savings, it is better to bruteforce those addresses offline (see 'script.py'). Also, to bypass the first check, we simply need to implement the 'name()' function
* returning the value expected by the chall contract.
 */
contract FuzzyIdentityDeploy {
    function deploy(address _chall, uint256 _salt) public { // Salt = 3884297
        address new_addr;
        bytes memory _byteCode = getBytecode();
        require(isBadCode(computeAddress(_salt))); // Check if deployed address will work

        assembly{
            new_addr := create2(callvalue(), add(_byteCode, 0x20), mload(_byteCode), _salt) // Create new contract from deployement code of FuzzyIdenditySteal and salt
        }

        FuzzyIdentitySteal(new_addr).authenticate(_chall);
    }

    function isBadCode(address _addr) internal pure returns (bool) {
        bytes20 addr = bytes20(_addr);
        bytes20 id = hex"000000000000000000000000000000000badc0de";
        bytes20 mask = hex"000000000000000000000000000000000fffffff";

        for (uint256 i = 0; i < 34; i++) {
            if (addr & mask == id) {
                return true;
            }
            mask <<= 4;
            id <<= 4;
        }

        return false;
    }

    function getBytecode() public pure returns (bytes memory) { // Needed for offline bruteforce calculation along with this contract's address
        return type(FuzzyIdentitySteal).creationCode;
    }

    function computeAddress(uint256 _salt) public view returns (address) {
        bytes32 hash_ = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(getBytecode())));
        return address(uint160(uint256(hash_)));
    }
}