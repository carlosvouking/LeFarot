require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ROPSTEN_URL = process.env.ROPSTEN_URL 
 const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
 const PRIVATE_KEY = process.env.PRIVATE_KEY
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
 const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",   // blank blockchain...is detroyed once the script ends. 
    networks: {
        ropsten: {
            url: ROPSTEN_URL || "",
            accounts: []
        },
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: [PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",  // in order to get this currency, we need an API key from coinmarketcap.
        outputFile: "gas-report.txt",
        nocolors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,  // ceci fera un appel api sur coinmerketcap à chaque fois qu'on executera un rapport de consommation de gas
        //token: "MATIC" ,  / gas reporting on polygon
    },
    namedAccounts: {
        deployer: {
            default: 0, // deployer account
        },
        user: {
            default: 1,
        },
    }
};