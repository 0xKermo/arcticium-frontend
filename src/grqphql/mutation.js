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
        $tradeType:Int
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
     ) {
        tradeId
        tradeOwnerAddress
        tokenContract
        tokenId
        expiration
    }
  }
`;
