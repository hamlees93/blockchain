const SHA256 = require('crypto-js/sha256');

class Block {
    // data - details of transaction, sender, receiver
    // previousHash - String of block before
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;

        // completely random number to ensure hash can change and can be mined
        this.nonce = 0;

        // When we create our block, it will create all the above parameters, then will hash the block as well
        this.hash = this.calculateHash();        
    }

    // Using S56, which isn't available, so we bring it in through 'n'
    calculateHash() {
        // Hash the block, then turn it to string, otherwise we will be left with object

        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    // Function to ensure hash starts with enough zeros, as according to difficulty
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`BLOCK MINED: ${this.hash}`);
    }

    hasValidTransaction(){
        // Loop through all transactions, and ensure they are all valid
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
    }
}

module.exports.Block = Block;