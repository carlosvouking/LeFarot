// import statements: We can do this in 3 diferent ways according to the ease of reading and understand

//1rst way..............
// function deployF(hre) {
//     console.log("Testing deployF !");
//     hre.getNamedAccounts()
//     hre.deployments
// }
// module.exports.default = deployF


//2nd way...............
// module.exports = async(hre) => {
//     const { getNamedAccounts, deployments } = hre //ie: hre.getNamedAccounts  and hre.deployments
// }


// 3rd way..............
// Ces objets de déploiements (getNamedAccounts, deployments) du hre nous donnent accès à des functions 'deploy', 'log', et 'deployer' account
module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
}


// Pour déployer le contract FundMe, que se passera t'il si on change de chaines ?
// .. Donc il est tjrs recommendé de tester localement(localhost, default hardhat) avant de passer en testnet (Rinkeby, Ropsten...)
// ... Alors pour déployer sur localhost ou default hardhat en local, on utilisera des 'MOCK' pour mimiquer le mainnet.


