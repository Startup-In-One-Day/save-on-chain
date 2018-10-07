const express = require('express')
const config = require('../config')
const router = express.Router()

let Eos = require('eosjs')

router.post('/', (req, res, next) => {
  console.log(req.body)
  writeToEOSTestnet(req.body.message, res)
})

// return status={code: number, message: string},
// where message contains transaction ID if message was put on blockchain
// and error otherwise
function writeToEOSTestnet (messageForBlockChain, res) {
  /**
   * Hard coded value, should read from a file / environment variables in production
   */
  let keyProvider = '5JHSNMsbZrRLymmyEyZAxiFZXWwLmUMbCxDJJKQZh3hnQkfgBtg' // evff private key
  let httpEndpoint = 'http://bp.cryptolions.io'
  let chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  let verbose = true

  // Connect to EOS mainnet using `httpEndPoint`
  let eos = Eos({httpEndpoint, chainId, keyProvider, verbose})

  eos.transfer({
    from: `eosvanforfun`,
    to: `eosvancouver`,
    quantity: `0.0001 EOS`,
    memo: messageForBlockChain
  }, (err, result) => {
    if (err) {
      console.log('error:' + err)
      res.status(303).send(err)
    } else {
      console.log('result:' + result)
      res.status(200).send(result)
    }
  })
}

module.exports = router
