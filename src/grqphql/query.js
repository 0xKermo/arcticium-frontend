import { gql } from "@apollo/client";

export const collections = gql`
  {
    collections {
      collectionAddress
      collectionOwner
    }
  }
`;

export const tokensURI = gql`
  {
    getTokensURI {
      name
      description
      image
      contract_address
      token_id
    }
  }
`;

export const tokenURI = gql`
  query GetTokenURI($contract_address: String!, $token_id: String!) {
    getTokenURI(contract_address: $contract_address, token_id: $token_id) {
      name
      description
      image
      contract_address
      token_id
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
      tokenContract
      tradeId
      tokenId
      expiration
      price
      targetTokenContract
      targetTokenId
      tradeType
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

`