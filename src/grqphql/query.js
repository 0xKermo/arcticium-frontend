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
    getUserAsset(assetOwner: $walletAddress) {
      assetOwner
      token_id
      name
      contract_address
      image
    }
  }
`;

export const getUserAssetByContract = gql`
  query getUserAssetByContract(
    $walletAddress: String!
    $contract_address: String!
  ) {
    getUserAssetByContractAddress(
      assetOwner: $walletAddress
      contract_address: $contract_address
    ) {
      assetOwner
      token_id
      name
      contract_address
      image
    }
  }
`;
export const getAsset = gql`
  query getAsset($contract_address: String!, $token_id: Int) {
    getUserAsset(contract_address: $contract_address, token_id: $token_id) {
      assetOwner
      token_id
      name
      contract_address
      image
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
      targetAssetInfo {
        assetOwner
        token_id
        name
        image
        description
        contract_address
        attributes {
          trait_type
          value
        }
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
    getAsset(contract_address: $contractAddress, token_id: $tokenId) {
      assetOwner
      token_id
      name
      description
      image
      contract_address
      attributes {
        trait_type
        value
      }
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
      assetInfo {
        assetOwner
        token_id
        name
        image
        contract_address
      }
      targetAssetInfo {
        assetOwner
        token_id
        name
        image
        contract_address
      }
    }
  }
`;
