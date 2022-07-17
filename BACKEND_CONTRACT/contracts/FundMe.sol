// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

      // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;   // in ETH
    uint256 public constant MINIMUM_EUR = 50 * 10 ** 18;
  
  

    // 'priceFeed' et 'priceFeedEuroToUsd' sont variables et modularisés en fonction du type de blockchain (serviront désormais de 'PriceConverter')    
    AggregatorV3Interface public priceFeed;    
    AggregatorV3Interface public priceFeedEuroToUsd;  

    
    // passer coe argument l'adresse de prix en fucntion de la blockchain sur laquelle on opère Ethereum, BNB, Polygonlgon...Mainnet, rinkeby, Kovan etc...
    constructor(address priceFeedAddress, address priceFeedEuroToUsdAddress) {
        owner = msg.sender;  // the guy who is deploying the contract
        priceFeed = AggregatorV3Interface(priceFeedAddress);  // ETH<=>USD // instead of 'priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e)' which is only for Rinkeby;
        priceFeedEuroToUsd = AggregatorV3Interface(priceFeedEuroToUsdAddress);  // Euro=>USD 
    }

    // get the description of the contract
    function getDescription() external view returns (string memory) {
        return priceFeed.description();
    }


    function fund() public payable {
        //getConversionRate(msg.value, priceFeed)
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");   // ConversionRate ds 'PriceConverter' aura désormais 2 paramètres: 'msg.value' et 'priceFeed'
        //require(msg.value.getConversionRateInEuro(priceFeedEuroToUsd) >= MINIMUM_EUR, "Not enough Eth to proceed !");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function fundEuro() public payable {
        require(msg.value.getConversionRateInEuro(priceFeedEuroToUsd) >= MINIMUM_EUR,  "You probably need more ETH!");
        addressToAmountFunded[msg.sender] = addressToAmountFunded[msg.sender] + msg.value;
        funders.push(msg.sender);     
    }
     
  
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != owner) revert NotOwner();
        _;  // doing the rest of the code in the function which inherits the 'onlyOwner' modifier
    }
    
    function withdraw() payable onlyOwner public {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        // resetting our funders array with (0) funders inside...thus withdrawing the funds and restart funding with a completely blank array
        funders = new address[](0);

        /* 
        Pour retirer les fonds cotisés, il se présente 3 méthodes possibles: Par Transfert, Par Envoi, Par Call 
        remeber Transfer and Send methods are gas expensive 2300TH 
        faut pas oublier de convertir l'adresse 'msg.value' en adresse payable 'payable(msg.value)'.
        */
        // // transfer....throws an error if it fails
        // payable(msg.sender).transfer(address(this).balance);
        // // send...returns a bool if it fails
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");   // help revert the transaction if it fails
        // call...can be used to call any function in ethereum without even have to have an ABI
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed"); // revert if the 'call' fails
    }
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \ 
    //         yes  no
    //         /     \
    //    receive()?  fallback() 
    //     /   \ 
    //   yes   no
    //  /        \
    //receive()  fallback()

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}

// Concepts we didn't cover yet (will cover in later sections)
// 1. Enum
// 2. Events
// 3. Try / Catch
// 4. Function Selector
// 5. abi.encode / decode
// 6. Hash with keccak256
// 7. Yul / Assembly


