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

const { network } = require("hardhat")  // to help fetch the chainId
const { networkConfig } = require("../helper-hardhat-config")   // pulling the 'networkConfig' element from the file 'helper-hardhat-config'

// 3rd way..............
// Ces objets de déploiements (getNamedAccounts, deployments) du 'HRE' nous donnent accès à des functions 'deploy', 'log', et 'deployer'
module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //To fill in the arg[] this is still hard coding...we need to parametize this in function of each network we are in.
    //const address = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"  

    // instead we will derive the actual network through its chainId....reference to: AAVE/aave-v3-core github which also deploys on multiple network addresses.
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]  // read the corresponding network address from networkConfig in helper-hardhat-config'.

    /*
      In case of a local network (default Hardhat or Localhost) which do not have PriceFeed address ?? ....On doit créer un 'contrat mock'. 
      l'idée des contrts MOCk est teel que si le contrat n existe pas, on déploie une version minimale du contract pour tester en local.
      Et déployer un contract mock c 'est en fait techniquement un script 'deploy' qu'on va créer.....ici ('00-deploy-mock')
    */




    // Pour déployer le contract FundMe, que se passera t'il si on change de chaines ?
    // .. Donc il est tjrs recommendé de tester localement(localhost, default hardhat) avant de passer en testnet (Rinkeby, Ropsten...)
    // ... Alors pour déployer sur localhost ou default hardhat en local, on utilisera des 'MOCK' pour mimiquer le mainnet.
    // Let's use the 'deploy' function from hre to deploy our FundMe contract

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [
            /*
            list of argumets in the consttructor in the FundMe contract ... priceFeedAddress , priceFeedEuroToUsdAddress
            */
        ] , 
        log: true,  // to avoid doing 'console.log' all the time.
    })

}




