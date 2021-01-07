import contract from "../connect.js";
import { gasPriceHex, gasLimitHex, web3 } from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import createRequire from "ethereumjs-tx";
const Tx = createRequire.Transaction;
import dotenv from "dotenv";
dotenv.config();

const key = new Buffer.from(process.env.PRIVATE_KEY, "hex");

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
  const tx = new Tx(
    { ...rawTransaction, nonce: web3.utils.toHex(count) },
    { chain: "goerli" }
  );

  tx.sign(key);

  let serializedTx = tx.serialize();

  const result = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );
  res.status(201).json({ Result: result });
});

// const postTransferFrom = asyncMiddleware(async (req, res) => {
//   const { sender, recipient, amount } = req.body;
//   const result = await contract.methods
//     .transferFrom(sender, recipient, amount)
//     .send({ from: process.env.FROM_ADDRESS });
//   console.log(result);
//   res.status(201).json({ TransferFomResult: result });
// });

export { postTransfer };
