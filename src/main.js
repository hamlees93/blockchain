const {Blockchain}= require('./blockchain');
const {Transaction} = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Accessing public and private keys
const myKey = ec.keyFromPrivate('f0d96911cddd3db0783cca11db0f43a7c47d68389fd111cf6cfbe50c922ebcf3');
const myWalletAddress = myKey.getPublic('hex');

// Create new blockchain and add blocks
let hamishCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public Key goes here', 10);
tx1.signTransaction(myKey);
hamishCoin.addTransaction(tx1);

console.log('\n Starting mining...');
hamishCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Hamish is', hamishCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain Valid?', hamishCoin.isChainValid())