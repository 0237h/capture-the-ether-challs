/*
	Using a signed transaction, it is possible to recover the public key from which the ethereum address is derived. Here are the steps :
		- Identify a signed transaction from the target address on Etherscan (e.g. https://ropsten.etherscan.io/tx/0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb)
		- Extract the raw transaction hex using either Etherscan directly (didn't work for me), the ABDK toolkit (https://toolkit.abdk.consulting/ethereum#transaction) or directly 
		in code using a web3 provider (Infura, etc.)
		- Using the library 'ethereumjs-tx' to extract the public key information from the raw tx.

	Note : the ABDK toolkit didn't provide the correct public key although the address did match, same for the 'ethers' and 'ethereumjs-util' libraries. Only 'ethereumjs-tx' worked for me.
*/

const eth_tx = require('ethereumjs-tx').Transaction
const rawTx = "0xf87080843b9aca0083015f90946b477781b0e68031109f21887e6b5afeaaeb002b808c5468616e6b732c206d616e2129a0a5522718c0f95dde27f0827f55de836342ceda594d20458523dd71a539d52ad7a05710e64311d481764b5ae8ca691b05d14054782c7d489f3511a7abf2f5078962"
console.log('0x' + new eth_tx(rawTx).getSenderPublicKey().toString('hex'))