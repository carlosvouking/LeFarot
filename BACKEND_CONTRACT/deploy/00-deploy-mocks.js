/* 
This only when deploying on 'hardhat' or on 'localhost'...the goal is to deploy our OWN Mock priceFeed contract 
and use it in our normal deploy file: '01-deploy-fund-me' as our "ethUsdPriceFeedAddress"
*/

const {network} = require("hardhat")
const { getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = getNamedAccounts
    chainId = network.config.chainId
}