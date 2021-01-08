import contract from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import createRequire from "ethereumjs-tx";
const Tx = createRequire.Transaction;
import { web3 } from "../connect.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log(process.env.PRIVATE_KEY);
const key = new Buffer.from(process.env.PRIVATE_KEY,
  "hex"
);
let tokenAddress = process.env.TOKEN_ADDRESS; // HST contract address
let toAddress = "0xA164FeAd2d36DEB400812f8DDAc081B5C0Ea2e31"; // where to send it
let fromAddress = process.env.FROM_ADDRESS; // your wallet
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
let decimals = web3.utils.toBN(18);
let amount = web3.utils.toBN(100);
// calculate ERC20 token amount
let value = amount.mul(web3.utils.toBN(10).pow(decimals));
const count = web3.eth.getTransactionCount(fromAddress);

const postTransfer = asyncMiddleware(async (toAddress, value) => {
  const data = await contract.methods.transfer(toAddress, amount).encodeABI();

  var rawTransaction = {
    from: fromAddress,
    gasLimit: web3.utils.toHex(75000),
    gasPrice: gasPriceHex, // 10 Gwei
    to: tokenAddress,
    value: "0x0",
    data: data,
  };

  /** Signs the given transaction data and sends it. Abstracts some of the details of
   * buffering and serializing the transaction for web3.
   * @returns A promise of an object that emits events: transactionHash, receipt, confirmaton, error
   */
  const sendRawTransaction = (rawTransaction) =>
    // get the number of transactions sent so far so we can create a fresh nonce
    web3.eth.getTransactionCount(fromAddress).then((txCount) => {
      const newNonce = web3.utils.toHex(txCount);
      const transaction = new Tx(
        { ...rawTransaction, nonce: newNonce },
        { chain: "goerli" }
      ); // or 'rinkeby'
      transaction.sign(key);
      const serializedTx = transaction.serialize().toString("hex");
      return web3.eth.sendSignedTransaction("0x" + serializedTx);
    });

  const result = await sendRawTransaction(rawTransaction);
  console.log(result);
});

postTransfer(toAddress, value);

// 1e18 === 1 HST
// let amount = web3.utils.toHex(1e18);
// let amount = 100;
// Use BigNumber

// // const { recipient, amount } = req.body;
// const data = await contract.methods.transfer(toAddress, amount).encodeABI();
// // "nonce": web3.utils.toHex(count),
// // "chainId": 5,
// // gasPrice: web3.utils.toHex(20 * 1e9),
// // gasLimit: web3.utils.toHex(210000),
// // gasPrice: web3.utils.toHex(),
// // gasLimit: web3.utils.toHex(210000),
// var gasPrice = web3.eth.gasPrice;
// var gasLimit = 90000;

// var rawTransaction = {
//   from: fromAddress,
//   gasLimit: web3.utils.toHex(25000),
//   gasPrice: web3.utils.toHex(10e9), // 10 Gwei
//   to: tokenAddress,
//   // value: "0x0",
//   data: data,
// };

// const tx = new Tx(
//   { ...rawTransaction, nonce: web3.utils.toHex(count + 1) },
//   { chain: "goerli" }
// );

// tx.sign(key);

// let serializedTx = tx.serialize();

// const result = await web3.eth.sendSignedTransaction(
//   "0x" + serializedTx.toString("hex")
// );

// console.log(result);

// sendRawTransaction(rawTransaction).then((result) =>
//   result
//     .on("transactionHash", (txHash) => {
//       console.log("transactionHash:", txHash);
//     })
//     .on("receipt", (receipt) => {
//       console.log("receipt:", receipt);
//     })
//     .on("confirmation", (confirmationNumber, receipt) => {
//       if (confirmationNumber >= 1) {
//         console.log("confirmations:", confirmationNumber, receipt);
//       }
//     })
//     .on("error:", (error) => {
//       console.error(error);
//     })
// );
