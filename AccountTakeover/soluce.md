This challenge exploits the fact that two transactions used the same 'r' value to extract the private key and allow anyone to takeover the account.

The details are very well explained [in this medium post](https://medium.com/coinmonks/smart-contract-exploits-part-3-featuring-capture-the-ether-accounts-c86d7e9a1400#ea6b) and the python script provided comes from this article.

The main lesson from this chall, well known in the cryptography domain, is that parameters linking the private key to the message should not be reused in different messages as it allow for information leak or worse, the leak of the private key itself. The formula for ECDSA is : 

```s = k^(-1) * (z + r * privKey) mod p```

where
* k is a (supposedly) random nonce value
* z the message digest
* r a value derived from k
* p a large prime number (0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141 for the secp256k1 curve used in Ethereum and Bitcoin)

Manipulating the formula, it is possible to find the value of k and from there, derive the private key.