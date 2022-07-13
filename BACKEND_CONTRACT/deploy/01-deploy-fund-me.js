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