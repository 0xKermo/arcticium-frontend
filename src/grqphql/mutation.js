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
    $name: String
    $description: String
    $image: String
    $attributes: String
    $targetName:String
    $targetDescription:String
    $targetImage:String
    $targetAttributes:String
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
      name: $name
      description: $description
      image: $image
      attributes: $attributes
      targetName:$targetName
      targetDescription:$targetDescription
      targetImage:$targetImage
      targetAttributes:$targetAttributes
    ) {
      tradeId
      tradeOwnerAddress
      tokenContract
      tokenId
      expiration
    }
  }
`;
