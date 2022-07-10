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
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;  
    //uint256 public constant MINIMUM_EUR = 50 * 10 ** 18;
  

    // 'priceFeed' et 'priceFeedEuroToUsd' sont modularisés en fonction du type de blockchain et serviront désormais de 'PriceConverter'
    //....sur laquelle on se trouve...on n'a plus besoin des priceFeed hard coded dans './PriceConverter'
    AggregatorV3Interface public priceFeed;    
    AggregatorV3Interface public priceFeedEuroToUsd;

    
    // le constructeur est invoqué chaue fois que le contract est déployé.
    constructor(address priceFeedAddress, address priceFeedEuroToUsdAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);  // ETH<=>USD priceFeed
        priceFeedEuroToUsd = AggregatorV3Interface(priceFeedEuroToUsdAddress);  // Euro=>USD 
    }

    // get the descripption of the contract
    function getDescription() external view returns (string memory) {
        return priceFeed.description();
    }


    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        //require(msg.value.getConversionRateInEuro(priceFeedEuroToUsd) >= MINIMUM_EUR, "Not enough Eth to proceed !");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
     
  
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != owner) revert NotOwner();
        _;
    }
    
    function withdraw() payable onlyOwner public {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        // resetting our funders array with (0) funders inside...thus withdrawing the funds and restart funding with a completely blank array
        funders = new address[](0);

        /* 
        Pour retirer les fonds cotisés, il se présente 3 méthodes possible: Par Transfert, Par Envoi, Par Call 
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


