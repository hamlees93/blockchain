const {Blockchain}= require('./blockchain');
const {Transaction} = require('./transaction');
const {User} = require('./users');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const newUser = new User;
const myKey = ec.keyFromPrivate(newUser.myKey);
const myWalletAddress = newUser.walletAddress;

// // Create new blockchain and add blocks
// let hamishCoin = new Blockchain();

// const tx1 = new Transaction(myWalletAddress, 'public Key goes here', 10);
// tx1.signTransaction(myKey);
// hamishCoin.addTransaction(tx1);

// console.log('\n Starting mining...');
// hamishCoin.minePendingTransactions(myWalletAddress);

// console.log('\nBalance of Hamish is', hamishCoin.getBalanceOfAddress(myWalletAddress));

// console.log('Is chain Valid?', hamishCoin.isChainValid())

console.log("---------------------------")
console.log("Hi there, welcome to the market place of HamishCoin!");
console.log(" ");
console.log("Hang tight, we will generate your keys for you");
setTimeout(function(){ console.log("...") }, 1000);
setTimeout(function(){ console.log("...") }, 2000);
setTimeout(function(){ console.log("...") }, 3000);
setTimeout(function(){ console.log(`Your Wallet Address is: ${myWalletAddress}`) }, 5000);
setTimeout(function(){ console.log(`-----------`) }, 7000);
setTimeout(function(){ console.log(`Your Private Key is: ${newUser.myKey}`) }, 9000);
setTimeout(function(){ console.log(`-----------`) }, 11000);
setTimeout(function(){ console.log("Note these down, and don't lose them!") }, 11500);


n