// Proof of work and mining is created to ensure no one has changed the block and that a relevant amount of computing power has been used in each hash to ensure the blockchain is not being spammed

const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    // data - details of transaction, sender, receiver
    // previousHash - String of block before
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;

        // When we create our block, it will create all the above parameters, then will hash the block as well
        this.hash = this.calculateHash();

        // completely random number to ensure hash can change and can be mined
        this.nonce = 0;
    }

    // Using S56, which isn't available, so we bring it in through 'npm install crypto-js'
    calculateHash() {
        // Hash the block, then turn it to string, otherwise we will be left with object
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Function to ensure hash starts with enough zeros, as according to difficulty
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain{
    constructor(){
        // The chain will be equal to an array of blocks, starting with our genesis block
        this.chain = [this.createGenesisBlock()];   
        
        // Set the difficulty of the block being mined
        this.difficulty = 2;

        // For bitcoin, there is only one new block added every 10 mins, so there will be a pendingTransactions array that will hold all transactions waiting to be added to the next block
        this.pendingTransactions = [];

        this.miningReward = 100;

    }

    // First block in a blockchain is the Genesis Block, which we must create manually
    createGenesisBlock(){
        return new Block('11/04/2019', 'Genesis block', '0');
    }

    getLatestBlock(){
        // Simple function to get the last block on the chain
        return this.chain[this.chain.length - 1];
    }
    
    // When a miner calls this method, it will pass along its address, so it can receive the award
    minePendingTransactions(miningRewardAddress){
        // In Bitcoin, you can't pass all pending transactions, as it would be too big and would increase the block size over the max allowed
        let block = new Block(Date.now(), this.pendingTransactions);

        block.mineBlock(this.difficulty);
        console.log('Block Succcessfully mined!');

        this.chain.push(block);

        // Reset the pending transactions after they have been pushed onto the chain
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    // Simple function to receive a transaction and push it to the pending array
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    // You never actually keep your balance on you, instead you have to go to the blockchain and search for all transactions involving your address
    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                // Bit of logic - if you are the fromAddress, you are sending money
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                // If you are the toAddress - you are receving money
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    // Function to ensure blockchain is correct chain
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // If the current hash isn't equal to current hash for whatever reason, something is wrong and return false
            console.log(currentBlock.hash)
            console.log(currentBlock.calculateHash())
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            // If both above conditions are met, then chain is valid
            return true;
        }
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;