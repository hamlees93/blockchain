// Proof of work and mining is created to ensure no one has changed the block and that a relevant amount of computing power has been used in each hash to ensure the blockchain is not being spammed

const {Transaction} = require('./transaction');
const {Block} = require('./block');

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
        return new Block(Date.parse('2017-01-01'), [], '0');   
    }

    getLatestBlock(){
        // Simple function to get the last block on the chain
        return this.chain[this.chain.length - 1];
    }
    
    // When a miner calls this method, it will pass along its address, so it can receive the award
    minePendingTransactions(miningRewardAddress){
        // Create the transaction to give to the successful miner
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
    
        // In Bitcoin, you can't pass all pending transactions, as it would be too big and would increase the block size over the max allowed
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);

        block.mineBlock(this.difficulty);
        console.log('Block Succcessfully mined!');

        this.chain.push(block);

        // Reset the pending transactions after they have been pushed onto the chain
        this.pendingTransactions = [

        ];
    }

    // Simple function to receive a transaction and push it to the pending array
    addTransaction(transaction){
        // Need to check from and to address are filled in 
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from AND to address');
        }

        // Must also ensure transaction is valid 
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain.')
        }

        // If it passes both those errors, we can push it to the pending transactions
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

    // List all transactions from certain address
    getAllTransactionsForWallet(address) {
        const txs = [];
    
        for (const block of this.chain) {
          for (const tx of block.transactions) {
            if (tx.fromAddress === address || tx.toAddress === address) {
              txs.push(tx);
            }
          }
        }
    
        return txs;
      }

    // Function to ensure blockchain is correct chain
    isChainValid(){
        // Check genesis block hasn't been tampered with by running the createGenesis agaisnt block's genesis
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
          return false;
        }


        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Ensure that transactions in current block has all valid transactions
            if(!currentBlock.hasValidTransaction()){
                return false;
            }

            // If the current hash isn't equal to current hash for whatever reason, something is wrong and return false
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //**************************** */ 
            // 
            //SHOULD BE                        // previousBlock.calculateHash(), but its wigging out
            // 
            // *************************
            if(currentBlock.previousHash !== previousBlock.calculateHash()){
                return false;
            }

            // If both above conditions are met, then chain is valid
            return true;
        }
    }
}

module.exports.Blockchain = Blockchain;