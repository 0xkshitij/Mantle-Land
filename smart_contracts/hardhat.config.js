require("@nomicfoundation/hardhat-foundry");
// require("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan");
// require("hardhat-deploy");
// require("solidity-coverage")
// require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
// require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");

const mantlesepoliatestnet_RPC_URL =
  process.env.SEPOLIA_RPC_URL || "https://1rpc.io/mantlesepolia";
const ZKSYNC_SEPOLIA_RPC_URL =


// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "Your etherscan API key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mantlesepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: mantleSEPOLIA_RPC_URL, // The Ethereum Web3 RPC URL (optional).
      accounts: [PRIVATE_KEY],
    },
  
  },
  etherscan: {
    // To list networks supported by default: npx hardhat verify --list-networks
    // You can manually add support for it by following these instructions: https://hardhat.org/verify-custom-networks
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      mantlesepolia: "",
    },
    customChains: [
      {
        network: "mantlesepolia",
        chainId: 5003,
        urls: {
          apiURL:
            "https://explorer.mantlesepolia.dev/contract_verification",
          browserURL: "https://explorer.mantlesepolia.dev",
        },
      },
    ],
  },
  // gasReporter: {
  //   enabled: REPORT_GAS,
  //   currency: "USD",
  //   outputFile: "gas-report.txt",
  //   noColors: true,
  //   // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  // },
  // contractSizer: {
  //   runOnCompile: false,
  //   // only: ["Raffle"],
  // },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  zksolc: {
    // need to reference zksolc compiler
    version: "latest",
    settings: {
      libraries: {},
    },
  },
  mocha: {
    timeout: 300000, // 300 seconds max for running tests
  },
};
