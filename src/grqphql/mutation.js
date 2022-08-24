import { gql } from "@apollo/client";

export const TradeAdd = gql`
  mutation tradeAdd(
    $tradeId: Int
    $tradeOwnerAddress: String
    $tokenContract: String
    $tokenId: Int
    $expiration: Date
    $currencyType: Int
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
      currencyType: $currencyType
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

export const updateUserAssets = gql`
  mutation ($assetOwner: String) {
    updateAssets(assetOwner: $assetOwner) {
      assetOwner
    }
  }
`;

export const updateUserProfile = gql`
  mutation updateUserProfile(
    $walletAddress: String
    $name: String
    $bio: String
  ) {
    updateProfile(walletAddress: $walletAddress, name: $name, bio: $bio) {
      walletAddress
    }
  }
`;

export const updateTradeStatus = gql`
  mutation tradeStatus($tradeId: Int, $status: String, $buyer: String) {
    tradeStatus(tradeId: $tradeId, status: $status, buyer: $buyer) {
      tradeId
      status
    }
  }
`;

export const updateBidStatus = gql`
  mutation bidStatus($tradeId: Int, $itemBidId:Int, $status: String) {
    bidStatus(tradeId: $tradeId, itemBidId: $itemBidId, status: $status) {
      tradeId
      status
    }
  }
`;



export const uploadToMetadata = gql`
  mutation uploadMetadata($assetOwner: String!, $token_id: Int, $name: String, $description: String, $image: String ) {
    uploadMetadata(assetOwner: $assetOwner, token_id: $token_id, name: $name, description: $description, image: $image) {
      image
    }
  }
`;
