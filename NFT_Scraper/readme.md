

# SETUP

```
npm install
nano .env.jnft
```
This Repo is based on <a href="https://github.com/casper-ecosystem/casper-nft-cep47/blob/master/Contract-Interaction-Tutorial.md">Contract-Interaction-Tutorial</a>
and intended for use within the Casper ecosystem / CasperLab.
I created this repo to have a standalone integration of the NFT-client and will modify it to suit my personal needs.
Before Interacting with a Contract on the Casper Chain, follow this tutorial <a href="https://github.com/casper-ecosystem/casper-nft-cep47/blob/master/Basic-Tutorial.md#sending-the-contract-to-the-network">Install an NFT contract</a>

default path for secret_key.pem and public_key.pem is ../keys/***.pem

----- CONTENT .env.jnft -----
```python

CHAIN_NAME=casper-test
NODE_ADDRESS=http://136.243.187.84:7777/rpc
EVENT_STREAM_ADDRESS=http://136.243.187.84:9999/events/main
MASTER_KEY_PAIR_PATH=../keys
USER_KEY_PAIR_PATH=../keys

TOKEN_NAME=JonasToken
CONTRACT_NAME=my_contract
TOKEN_SYMBOL=JO
TOKEN_META=ID1 NumberOne,ID2 NumberTwo
INSTALL_PAYMENT_AMOUNT=250000000000

MINT_ONE_PAYMENT_AMOUNT=2000000000
MINT_COPIES_PAYMENT_AMOUNT=30000000000
BURN_ONE_PAYMENT_AMOUNT=12000000000
MINT_ONE_META_SIZE=1
MINT_COPIES_META_SIZE=10
MINT_COPIES_COUNT=20
MINT_MANY_META_SIZE=5
MINT_MANY_META_COUNT=5
TRANSFER_ONE_PAYMENT_AMOUNT=2000000000
```
----- END -----

# What is ? - Current features ( as per 26.06.2022 )
The Casper NFT-Scraper is a tool that makes use of the casper-nft-client library \
to provide an 'Externally observable association between Accounts and/or Contracts and NFTs they "own".' \
As stated in the enhanced-nft-standard https://github.com/casper-ecosystem/cep-78-enhanced-nft . \

Scraper.js - This script takes 2 inputs (account hash, contract hash), where the contract hash is the \
"contract hash" of any non fungible token on the NFT blockchain ( according to the NFT standard ! not the enhanced standard) \
and account hash is the "account-hash" of any account on the casper blockchain. \

main.js - An integration of the casper-nft-client with additional functions, designed to be as modular as possible. \
client.js - Calls main.js, can be imported to any node.js backend to serve relevant data and disply NFTs in Apps. \

# Roadmap
Manage Keys and integrate:
    - transfers
    - mints
    - burns

# Integration
Import functions from client.js ( look into the file to see currently supported functionality. ) 
