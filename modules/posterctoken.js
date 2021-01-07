import contract from "../connect.js";
import { gasPriceHex, gasLimitHex, web3 } from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import createRequire from "ethereumjs-tx";
const Tx = createRequire.Transaction;
import dotenv from "dotenv";
dotenv.config();

const key = new Buffer.from(process.env.PRIVATE_KEY, "hex");
const count = web3.eth.getTransactionCount(process.env.FROM_ADDRESS);

const postTransfer = asyncMiddleware(async (req, res) => {
  const { toAddress, amount } = req.body;
  const data = await contract.methods.transfer(toAddress, amount).encodeABI();

  var rawTransaction = {
    from: process.env.FROM_ADDRESS,
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
    to: process.env.TOKEN_ADDRESS,
    // value: "0x0",
    data: data,
  };


/** Signs the given transaction data and sends it. Abstracts some of the details of 
  * buffering and serializing the transaction for web3.
  * @returns A promise of an object that emits events: transactionHash, receipt, confirmaton, error
*/
const sendRawTransaction = txData =>
  // get the number of transactions sent so far so we can create a fresh nonce
  web3.eth.getTransactionCount(process.env.FROM_ADDRESS).then(txCount => {
    const newNonce = web3.utils.toHex(txCount)
    const transaction = new Tx({ ...rawTransaction, nonce: newNonce }, { chain: 'goerli' }) // or 'rinkeby'
    transaction.sign(key)
    const serializedTx = transaction.serialize().toString('hex')
    return web3.eth.sendSignedTransaction('0x' + serializedTx)
  })


sendRawTransaction(rawTransaction).then(result =>
  result
    .on('transactionHash', txHash => {
      console.log('transactionHash:', txHash)
    })
    .on('receipt', receipt => {
      console.log('receipt:', receipt)
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber >= 1) {
        console.log('confirmations:', confirmationNumber, receipt)
      }
    })
    .on('error:', error => {
      console.error(error)
    })
)

  // res.status(201).json({ Result: result });
  // const tx = new Tx(
  //   { ...rawTransaction, nonce: web3.utils.toHex(count) },
  //   { chain: "goerli" }
  // );

  // tx.sign(key);

  // let serializedTx = tx.serialize();

  // const result = await web3.eth
  //   .sendSignedTransaction("0x" + serializedTx.toString("hex"))
  //   .once("transactionHash", (hash) => {
  //     // notify user of the tx hash with an etherscan link
  //     console.log(hash);
  //   })
  //   .on("confirmation", (confNumber) => {
  //     // update UI to show the number of confirmations for this tx
  //     console.log(confNumber);
  //   });

});


export { postTransfer };
