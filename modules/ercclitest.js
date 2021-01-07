import contract from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import createRequire from "ethereumjs-tx";
const Tx = createRequire.Transaction;
import { gasPriceHex, gasLimitHex, web3 } from "../connect.js";
import dotenv from "dotenv";
dotenv.config();

const key = new Buffer.from(process.env.PRIVATE_KEY, "hex");
let tokenAddress = "0xb6be8a2370CDDdC26a4338e0be9b0e156b287D77"; // HST contract address
let toAddress = "0xA164FeAd2d36DEB400812f8DDAc081B5C0Ea2e31"; // where to send it
let fromAddress = "0x64BEf94a42E0885EA9C56bcE68912AA073FFa830"; // your wallet
// 1e18 === 1 HST
// let amount = web3.utils.toHex(1e18);
let amount = 100;
const count = web3.eth.getTransactionCount(fromAddress);

const postTransfer = asyncMiddleware(async (toAddress, amount) => {
  // const { recipient, amount } = req.body;
  const data = await contract.methods.transfer(toAddress, amount).encodeABI();
  // "nonce": web3.utils.toHex(count),
  // "chainId": 5,
  // gasPrice: web3.utils.toHex(20 * 1e9),
  // gasLimit: web3.utils.toHex(210000),
  // gasPrice: web3.utils.toHex(),
  // gasLimit: web3.utils.toHex(210000),
  var gasPrice = web3.eth.gasPrice;
  var gasLimit = 90000;

  var rawTransaction = {
    from: fromAddress,
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
    to: tokenAddress,
    // value: "0x0",
    data: data,
  };

  const tx = new Tx(
    { ...rawTransaction, nonce: web3.utils.toHex(count + 1) },
    { chain: "goerli" }
  );

  tx.sign(key);

  let serializedTx = tx.serialize();

  const result = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );

  console.log(result);
});

postTransfer(toAddress, amount);
