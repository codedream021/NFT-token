require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  compilers: {
    solc: {
      version: "0.7.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    mainnet: {
      provider() {
        const { MNEMONIC, INFURA_API_KEY } = process.env;
        if (!MNEMONIC || !INFURA_API_KEY) {
          console.error(
            "Environment variables MNEMONIC and INFURA_API_KEY are required"
          );
          process.exit(1);
        }
        return new HDWalletProvider(
          MNEMONIC,
          `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
        );
      },
      network_id: 1,
    },
    kovan: {
      provider() {
        const { MNEMONIC, INFURA_API_KEY } = process.env;
        if (!MNEMONIC || !INFURA_API_KEY) {
          console.error(
            "Environment variables MNEMONIC and INFURA_API_KEY are required"
          );
          process.exit(1);
        }
        return new HDWalletProvider(
          MNEMONIC,
          `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}`
        );
      },
      network_id: 42,
      gasPrice: 2000000000, // 10 gwei (default: 20 gwei)
    },
    bsc_testnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://bsc-dataseed1.binance.org`
        ),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545, // <-- If you change this, also set the port option in .solcover.js.
      // gas: 0xfffffffffff, // <-- Use this high gas value
      // gasPrice: 0x01      // <-- Use this low gas price
    },
  },
  mocha: {
    timeout: 2000000,
    reporter: "Spec",
  },
  plugins: ["solidity-coverage"],
};
