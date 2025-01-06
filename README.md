# Account abstraction and ZkMinimalAccount Smart Contracts

This repository contains two Ethereum smart contracts:

1. A minimal EVM "Smart Wallet" using alt-mempool AA
   1. Sending a transaction to the `EntryPoint.sol`
2. A minimal zkSync "Smart Wallet" using native AA
   1. [zkSync uses native AA, which is slightly different than ERC-4337](https://docs.zksync.io/build/developer-reference/account-abstraction.html#iaccount-interface)
   2. Sending our zkSync transaction to the alt-mempool

---

# Account Abstraction zkSync Contract Deployment Flow

## First time
1. Calls `createAccount` or `create2Account` on the `CONTRACT_DEPLOYER` system contract 
   1. This will deploy the contract *to the L1*.
   2. Mark the contract hash in the `KnownCodesStorage` contract
   3. Mark it as an AA contract 
   4. [Example](https://sepolia.explorer.zksync.io/tx/0xec0d587903415b2785d542f8b41c21b82ad0613c226a8c83376ec2b8f90ffdd0#eventlog)
      1. Notice 6 logs emitted? 

## Subsequent times
1. Calls `createAccount` or `create2Account` on the `CONTRACT_DEPLOYER` system contract 
   1. The `CONTRACT_DEPLOYER` will check and see it's deployed this hash before
   2. It will put in another system contract that this address is associated with the first has
   3. [Example](https://sepolia.explorer.zksync.io/tx/0xe7a2a895d9854db5a6cc60df60524852d9957dd17adcc5720749f60b4da3eba7)
      1. Only 3 logs emitted!

## Installation

```bash
git clone https://github.com/mohamed-Decentralized/foundry-account-abstraction.git
cd foundry-account-abstraction
forge install
forge build
```
