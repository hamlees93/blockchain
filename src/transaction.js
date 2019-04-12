const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now()
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
    }

    // We have to sign the Transaction to ensure its valid
    signTransaction(signingKey){
        // Ensure the correct user (wallet) is signing transaction
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transaction from other wallets!');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex')
    }

    isValid(){
        // Special case for receiving mining rewards, as it means it will be from 'null'
        if(this.fromAddress === null) return true;

        // If there is no signature, or the signature is blank throw an error, as its not valid
        if(!this.signature || this.signature.length === 0){
            throw new Error('No Signature in this transaction');
        }

        // we extract public key , and verify that the transaction was signed by that key
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
         
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

module.exports.Transaction = Transaction;