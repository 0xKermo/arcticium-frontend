import { gql } from "@apollo/client";

export const TradeAdd = gql`
  mutation tradeAdd(
    $tradeId: Int
    $tradeOwnerAddress: String
    $tokenContract: String
    $tokenId: Int
    $expiration: Date
    $price: Int
    $status: String
    $swapTradeId: Int
    $targetTokenContract: String
    $targetTokenId: Int
    $transactionHash: String
    $tradeType: Int
  ) {
    tradeAdd(
      tradeId: $tradeId
      tradeOwnerAddress: $tradeOwnerAddress
      tokenContract: $tokenContract
      tokenId: $tokenId
      expiration: $expiration
      price: $price
      status: $status
      swapTradeId: $swapTradeId
      targetTokenContract: $targetTokenContract
      targetTokenId: $targetTokenId
      transactionHash: $transactionHash
      tradeType: $tradeType
    ) {
      tradeId
      tradeOwnerAddress
      tokenContract
      tokenId
      expiration
    }
  }
`;

export const BidAdd = gql`
  mutation addBid(
    $tradeId: Int
    $bidOwner: String
    $bidContractAddress: String
    $bidTokenId: Int
    $expiration: Date
    $bidCurrencyType: Int
    $bidPrice: Int
    $status: Status
    $biddedItemOwner: String
    $biddedItemContractAddress: String
    $biddedItemId: Int
    $itemBidId: Int
    $bidTradeType: Int
  ) {
    addBid(
      tradeId: $tradeId
      bidOwner: $bidOwner
      bidContractAddress: $bidContractAddress
      bidTokenId: $bidTokenId
      expiration: $expiration
      bidCurrencyType: $bidCurrencyType
      bidPrice: $bidPrice
      status: $status
      biddedItemOwner: $biddedItemOwner
      biddedItemContractAddress: $biddedItemContractAddress
      biddedItemId: $biddedItemId
      itemBidId: $itemBidId
      bidTradeType: $bidTradeType
    ) {
      tradeId
      bidContractAddress
      bidTokenId
      expiration
    }
  }
`;
gql`
  input assetMetaData{
    assetTokenId: Int
    assetName:String
    assetDescription: String
    assetContractAddress: String
    assetExternalUri: String
    assetAnimationUri: String
  }`
export const updateUserAssets = gql`
  mutation (
    $assetOwner:String
  ) {
    updateAssets(
      assetOwner:$assetOwner
    ) {
      assetOwner
    }
  }

`;
