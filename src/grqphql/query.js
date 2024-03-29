import { gql } from "@apollo/client";

export const getUserProfile = gql`
  query getUserProfile($walletAddress: String!, $offset: Int, $limit: Int) {
    getUserProfile(walletAddress: $walletAddress) {
      walletAddress
      name
      bannerPath
      profileImgPath
      bio
      socialMediaHandles
      nextPage
      lastIndex
    }
    getUserAsset(assetOwner: $walletAddress, offset: $offset, limit: $limit) {
      assetOwner
      token_id
      name
      contract_address
      image
      trade {
        tradeId
      }
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
  query getAsset($contract_address: String!, $token_id: String) {
    getAsset(contract_address: $contract_address, token_id: $token_id) {
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
      bannerPath
    }
  }
`;

export const getCollection = gql`
  query getCollection($collectionAddress: String!,$offset:Int, $limit:Int) {
    collection(collectionAddress: $collectionAddress) {
      collectionName
      collectionAddress
      collectionOwner
      collectionType
      bannerPath
      profileImgPath
      bio
      socialMediaHandles
    }
    getTradeWithContractAddress(contractAdress: $collectionAddress,offset:$offset, limit:$limit) {
      tradeId
      tradeOwnerAddress
      tokenContract
      tokenId
      expiration
      price
      status
      swapTradeId
      targetTokenContract
      targetTokenId
      transactionHash
      tradeType
      currencyType

      assetInfo {
        assetOwner
        token_id
        name
        description
        contract_address
        image
      }
      targetAssetInfo {
        assetOwner
        token_id
        name
        description
        contract_address
        image
      }
    }
  }
`;

export const GetTradeWithAddresId = gql`
  query getTradeWithAddresId($contractAddress: String!, $tokenId: String) {
    getTradeWithAddresId(contractAdress: $contractAddress, tokenId: $tokenId) {
      tradeOwnerAddress
      tokenContract
      tradeId
      tokenId
      expiration
      currencyType
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
        createdAt
        bidAsset {
          assetOwner
          token_id
          name
          description
          contract_address
          image
        }
        createdAt
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
      user {
        walletAddress
        name
        bannerPath
        profileImgPath
      }
    }
  }
`;

export const GetOpenTrades = gql`
 query getOpenTrades($offset: Int!, $limit: Int) {
    getOpenTrades(offset: $offset,limit:$limit)  {
      tokenContract
      tokenId
      expiration
      price
      status
      targetTokenContract
      targetTokenId
      tradeType
      currencyType
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
      createdAt
    }
  
}
`;

export const getUserActivity = gql`
  query activities($to: String!) {
    activities(to: $to) {
      contractAddress
      tokenId
      to
      from
      activityType
      assetImage {
        image
      }
    }
  }
`;

export const getBalance = gql`
  query balance($walletAddress: String!) {
    balance(walletAddress: $walletAddress) {
      aETH
      aDAI
      aSTARK
    }
  }
`;