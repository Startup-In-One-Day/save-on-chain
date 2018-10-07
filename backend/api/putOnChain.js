const express = require('express');
const config = require('../config');
const router = express.Router();

var transactionStatus = "";

router.post('/', (req, res, next) => {
    console.log(req.body);
    transactionStatus = "";
    writeToEthereumTestnet(req.body.message, res);
    // if (status.code == 200) {
    //     res.status(200).send(status.message);
    // } else {
    //     res.status(303).send(status.message);
    // }
    
});

// return status={code: number, message: string},
// where message contains transaction ID if message was put on blockchain
// and error otherwise
function writeToEthereumTestnet(messageForBlockChain, res) {
    var Web3 = require('web3');
    var util = require('ethereumjs-util');
    var tx = require('ethereumjs-tx');
    var lightwallet = require('eth-lightwallet');
    var txutils = lightwallet.txutils;
    var web3 = new Web3(
        new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
    );
    console.log(web3.currentProvider);
    var address = '0xac7b361076f98909889aA23dCc5ada0D6b44370c';
    var key = '9ef3ea0b5f1f66d84e240f8e6b9ae3a79a77997245c88a3e60d7a81f5141f711';

    let toHexF = web3.toHex || web3.utils.toHex;
    
    var rawTx = {
        nonce: toHexF(web3.eth.getTransactionCount(address)),
        gasLimit: toHexF(800000),
        gasPrice: toHexF(200000000000),
        data: toHexF(messageForBlockChain)
    };
    console.log(rawTx.data);

    console.log("sending rawTx");

    let sendTransaction = web3.eth.sendRawTransaction || web3.eth.sendSignedTransaction;

    function sendRaw(rawTx, res) {
        var privateKey = new Buffer(key, 'hex');
        var transaction = new tx(rawTx);
        transaction.sign(privateKey);
        var serializedTx = transaction.serialize().toString('hex');
        sendTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log("error:" + err);
                //transactionStatus =  {code: 303, message: str(err)};
                res.status(303).send(err);
            } else {
                console.log("result:" + result);
                res.status(200).send(result);
                //transactionStatus = {code: 200, message: str(result)};
            }
        });
    }; 
    
    sendRaw(rawTx, res);
}

module.exports = router;