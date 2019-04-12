const {Blockchain, Transaction}= require('./blockchain');

// Create new blockchain and add blocks
let hamishCoin = new Blockchain();
hamishCoin.createTransaction(new Transaction('address1', 'address2', 100));
hamishCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting mining...');
hamishCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', hamishCoin.getBalanceOfAddress('xaviers-address'));

console.log('\n Starting mining...');
hamishCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is', hamishCoin.getBalanceOfAddress('xaviers-address'));

