import Web3 from "web3";
import PractiseErcAbi from "./build/PractiseErcAbi.js";
import dotenv from "dotenv";
dotenv.config();
const rpcURL = "https://rpc.slock.it/goerli"; // Your RCP URL goes here
// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
const getWeb3 = () => {
  const web3 = new Web3(rpcURL);
  return web3;
};

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
const getContractInstance = (web3) => {
  const deployedAddress = process.env.TOKEN_ADDRESS;
  console.log(deployedAddress);
  const instance = new web3.eth.Contract(PractiseErcAbi, deployedAddress);
  return instance;
};

export { getWeb3, getContractInstance };

// import Web3 from "web3";
// const rpcURL = "https://rpc.slock.it/goerli"; // Your RCP URL goes here
// const web3 = new Web3(rpcURL);
// import PractiseErcAbi from "./build/PractiseErcAbi.js";

// const contractAddress = "0xb6be8a2370CDDdC26a4338e0be9b0e156b287D77";
// // const gasPrice = web3.eth.gasPrice;
// // const gasPriceHex = web3.utils.toHex(gasPrice);
// // const gasLimitHex = web3.utils.toHex(3000000);

// export default new web3.eth.Contract(PractiseErcAbi, contractAddress);
// export {  web3 };

// // assumes passed-in web3 is v1.0 and creates a function to receive contract name
// const getContractInstance = (web3) => (contractName) => {
//   const artifact = artifacts.require(contractName) // globally injected artifacts helper
//   const deployedAddress = artifact.networks[artifact.network_id].address
//   const instance = new web3.eth.Contract(artifact.abi, deployedAddress)
//   return instance
// }
