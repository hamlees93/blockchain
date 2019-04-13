// Library, allows us to create public/private keys and verify them
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class User{
    constructor(){
        this.genKeyPair = ec.genKeyPair();
        this.walletAddress = this.genKeyPair.getPublic('hex');
        this.myKey = this.genKeyPair.getPrivate('hex');
    }
}

module.exports.User = User;