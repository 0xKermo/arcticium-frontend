import { gql } from "@apollo/client";

export const TradeAdd = gql`
  input metaDataInput{
    name:String
    description:String
    image:String
    attributes:String
  }
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
        $tradeType:Int
        $metadata:metaDataInput
        ) {
    tradeAdd(
        tradeId: $tradeId,
        tradeOwnerAddress: $tradeOwnerAddress,
        tokenContract: $tokenContract,
        tokenId: $tokenId,
        expiration: $expiration,
        price: $price,
        status: $status,
        swapTradeId: $swapTradeId,
        targetTokenContract: $targetTokenContract,
        targetTokenId: $targetTokenId,
        transactionHash: $transactionHash,
        tradeType: $tradeType,
        metadata: $metadata
     ) {
        tradeId
        tradeOwnerAddress
        tokenContract
        tokenId
        expiration
    }
  }
`;
