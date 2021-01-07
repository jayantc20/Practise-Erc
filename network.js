require('dotenv').config();
const mnemonic = process.env.MNENOMIC;
import HDWalletProvider from "@truffle/hdwallet-provider";
const INFURA_API_KEY = process.env.INFURA_API_KEY;

export const networks = {
    development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*",
    },
    local: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "*",
    },
    ropsten: {
        provider: function () {
            return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + INFURA_API_KEY);
        },
        network_id: '3',
        gas: 4465030,
        gasPrice: 10000000000,
    },
    kovan: {
        provider: function () {
            return new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/' + INFURA_API_KEY);
        },
        network_id: '42',
        gas: 4465030,
        gasPrice: 10000000000,
    },
    rinkeby: {
        provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + INFURA_API_KEY),
        network_id: 4,
        gas: 3000000,
        gasPrice: 10000000000
    },
    goerli: {
        provider: () => {
          return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + INFURA_API_KEY)
        },
        network_id: 5,
        gas: 4465030,
        gasPrice: 10000000000,
      },
    // main ethereum network(mainnet)
    main: {
        provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + INFURA_API_KEY),
        network_id: 1,
        gas: 3000000,
        gasPrice: 10000000000
    }
};
export const compilers = {
    solc: {
        version: "^0.6"
    }
};