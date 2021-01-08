import { getWeb3, getContractInstance } from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import createRequire from "ethereumjs-tx";
const Tx = createRequire.Transaction;
import dotenv from "dotenv";
dotenv.config();
const web3 = getWeb3();
const contract = getContractInstance(web3);
const key = new Buffer.from(process.env.PRIVATE_KEY, "hex");

const tokenAddress = process.env.TOKEN_ADDRESS; // HST contract address
const fromAddress = process.env.FROM_ADDRESS; // your wallet
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
const gasLimitHex = web3.utils.toHex(3000000);

// gasLimit: web3.utils.toHex(75000),
// gasPrice: web3.utils.toHex(10e9), // 10 Gwei

const postTransfer = asyncMiddleware(async (req, res) => {
  const { toAddress, amount } = req.body;
  const data = await contract.methods.transfer(toAddress, amount).encodeABI();

  const result = await Transaction(data);
  res.status(201).json({ Transaction: result });
});

const postTransferFrom = asyncMiddleware(async (req, res) => {
  const { sender, toAddress, amount } = req.body;
  const data = await contract.methods
    .transferFrom(sender, toAddress, amount)
    .encodeABI();

  const result = await Transaction(data);
  res.status(201).json({ Transaction: result });
});

const postApprove = asyncMiddleware(async (req, res) => {
  const { sender, amount } = req.body;
  const data = await contract.methods.approve(sender, amount).encodeABI();

  const result = await Transaction(data);
  res.status(201).json({ Transaction: result });
});

const postIncreaseAllowance = asyncMiddleware(async (req, res) => {
  const { spender, addedValue } = req.body;
  const data = await contract.methods
    .increaseAllowance(spender, addedValue)
    .encodeABI();

  const result = await Transaction(data);
  res.status(201).json({ Transaction: result });
});

const postDecreaseAllowance = asyncMiddleware(async (req, res) => {
  const { spender, subtractedValue } = req.body;
  const data = await contract.methods
    .decreaseAllowance(spender, subtractedValue)
    .encodeABI();

  const result = await Transaction(data);
  res.status(201).json({ Transaction: result });
});

const Transaction = async (data) => {
  var rawTransaction = {
    from: fromAddress,
    gasLimit: gasLimitHex,
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
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

  return await sendRawTransaction(rawTransaction);
};

export {
  postTransfer,
  postTransferFrom,
  postApprove,
  postIncreaseAllowance,
  postDecreaseAllowance,
};
