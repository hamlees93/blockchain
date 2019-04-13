const {Blockchain}= require('./blockchain');
const {Transaction} = require('./transaction');
const {User} = require('./users');
const {MongoClient} = require('./app');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const newUser = new User;
const myKey = ec.keyFromPrivate(newUser.myKey);
const myWalletAddress = newUser.walletAddress;

// Create new blockchain and add blocks
let hamishCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public Key goes here', 10);
tx1.signTransaction(myKey);
hamishCoin.addTransaction(tx1);

console.log('\n Starting mining...');
hamishCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Hamish is', hamishCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain Valid?', hamishCoin.isChainValid())