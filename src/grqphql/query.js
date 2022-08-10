import { gql } from "@apollo/client";

export const collections = gql`
  {
    collections {
      collectionAddress
      collectionOwner
    }
  }
`;

export const getUserAsset = gql`
  query getUserAsset($walletAddress: String!) {
    getAsset(assetOwner: $walletAddress) {
      assetOwner
      token_id
      name
      description
      contract_address
      image
      attributes
    }
  }
`;

export const getCurrencies = gql`
  {
    getCurrencies {
      currencyName
      currencyAddress
      currencySymbol
      currencyImage
    }
  }
`;

export const getCollections = gql`
  {
    collections {
      collectionName
      collectionAddress
      profileImgPath
    }
  }
`;

export const GetTradeWithAddresId = gql`
  query getTradeWithAddresId($contractAddress: String!, $tokenId: Int) {
    getTradeWithAddresId(contractAdress: $contractAddress, tokenId: $tokenId) {
      tradeOwnerAddress
      tokenContract
      tradeId
      tokenId
      expiration
      price
      targetTokenContract
      targetTokenId
      tradeType
      targetName
      targetDescription
      targetImage
      targetAttributes
      tradeBids {
        tradeId
        bidOwner
        bidContractAddress
        bidTokenId
        expiration
        bidCurrencyType
        bidPrice
        status
        biddedItemOwner
        biddedItemContractAddress
        biddedItemId
        itemBidId
        bidTradeType
      }
    }
    collections {
      collectionName
      collectionAddress
      profileImgPath
    }
    getCurrencies {
      currencyName
      currencyAddress
      currencySymbol
      currencyImage
    }
  }
`;

export const GetOpenTrades = gql`
  {
    getOpenTrades {
      tokenContract
      tokenId
      expiration
      price
      status
      targetTokenContract
      targetTokenId
      tradeType
      name
      description
      image
      attributes
      targetName
      targetDescription
      targetImage
      targetAttributes
    }
  }
`;
