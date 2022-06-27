// import statements: We can do this in 3diferent ways according to the ease of reading and understand

//1rst way..............
// function deployF(hre) {
//     console.log("Testing deployF !");
//     hre.getNamedAccounts()
// }
// module.exports.default = deployF


//2nd way...............
// module.exports = async(hre) => {
//     const { getNamedAccounts, deployments } = hre //ie: hre.getNamedAccounts  and hre.deployments
// }


// 3d way..............
// on utilse ces objets de déploiements (getNamedAccounts, deployments) qui nous donnent accès à des functions
module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
}