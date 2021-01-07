import Web3 from "web3";
const rpcURL = "https://rpc.slock.it/goerli"; // Your RCP URL goes here
const web3 = new Web3(rpcURL);
import PractiseErcAbi from "./build/PractiseErcAbi.js";

const contractAddress = "0xb6be8a2370CDDdC26a4338e0be9b0e156b287D77";
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.utils.toHex(gasPrice);
const gasLimitHex = web3.utils.toHex(3000000);

export default new web3.eth.Contract(PractiseErcAbi, contractAddress);
export { gasLimitHex, gasPriceHex, web3 };
