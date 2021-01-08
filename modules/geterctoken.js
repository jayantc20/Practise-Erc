import { getWeb3, getContractInstance } from "../connect.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
const web3 = getWeb3();

const contract = getContractInstance(web3);
const getTotalSupply = asyncMiddleware(async (req, res) => {
  const result = await contract.methods.totalSupply().call();
  console.log(result);
  res.status(201).json({ TotalSupply: result });
});

const getSymbol = asyncMiddleware(async (req, res) => {
  const result = await contract.methods.symbol().call();
  console.log(result);
  res.status(201).json({ Symbol: result });
});

const getName = asyncMiddleware(async (req, res) => {
  const result = await contract.methods.name().call();
  console.log(result);
  res.status(201).json({ Name: result });
});

const getDecimals = asyncMiddleware(async (req, res) => {
  const result = await contract.methods.decimals().call();
  console.log(result);
  res.status(201).json({ Decimals: result });
});

const getBalance = asyncMiddleware(async (req, res) => {
  const result = await contract.methods.balanceOf(req.params.address).call();
  console.log(result);
  res.status(201).json({ Balance: result });
});

const getAllowance = asyncMiddleware(async (req, res) => {
  const result = await contract.methods
    .allowance(req.query.owner, req.query.spender)
    .call();
  console.log(result);
  res.status(201).json({ Result: result });
});

export {
  getTotalSupply,
  getSymbol,
  getDecimals,
  getName,
  getBalance,
  getAllowance,
};
