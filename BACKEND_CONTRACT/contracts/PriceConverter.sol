// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Why is this a library and not abstract?
// Why not an interface?
library PriceConverter {
    // We could make this public, but then we'd have to deploy it
    function getPrice() internal view returns (uint256) {
        // Rinkeby ETH / USD Address
        // https://docs.chain.link/docs/ethereum-addresses/
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(answer * 10000000000);
    }

    function getEquivalenceEurToUsd() internal view returns (uint256) {
        // il nous faut l'adresse Rinkeby de l'équivalence EUR / USD
        AggregatorV3Interface priceFeedEuroToUsd = AggregatorV3Interface(
            0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
        );
        (, int256 equivalent_Eur_Usd, , , ) = priceFeedEuroToUsd
            .latestRoundData();
        return uint256(equivalent_Eur_Usd);
    }

    // 1000000000
    function getConversionRate(uint256 ethAmount)
        internal
        view
        returns (uint256)
    {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        // the actual ETH/USD conversion rate, after adjusting the extra 0s.
        return ethAmountInUsd;
    }

    function getConversionRateInEuro(ethAmountEuro)
        internal
        view
        returns (uint256)
    {
        uint256 ethPriceInEuro = getEquivalenceEurToUsd();
        uint256 ethAmountInEuro = (ethPriceInEuro * ethAmountEuro) /
            1000000000000000000;
        // ci dessous la cobersion actuelle entre ETH/EUR après ajusemtn des zéros
        return ethAmountInEuro;
    }
}
