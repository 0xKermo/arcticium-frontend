import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { TradeAdd } from "../mutation";

export const AddTrade = () => {
  const [_TradeAdd] = useMutation(TradeAdd, {
    onSuccess: async(data, context) => {
      console.log("success",data)
      toast.success(data)
    },
    onError: async(data, context) => {
      toast.error(data)
    },
  });

  const _addTrade = (tradeArgs) => {
    const result = _TradeAdd({
      variables: {
        tradeId: tradeArgs.tradeId,
        tradeOwnerAddress: tradeArgs.tradeOwnerAddress,
        tokenContract: tradeArgs.tokenContract,
        tokenId: tradeArgs.tokenId,
        expiration: tradeArgs.expiration,
        price: tradeArgs.price,
        status: tradeArgs.status,
        swapTradeId: tradeArgs.swapTradeId,
        targetTokenContract: tradeArgs.targetTokenContract,
        targetTokenId: tradeArgs.targetTokenId,
        transactionHash: tradeArgs.transactionHash,
        tradeType: tradeArgs.tradeType,
        name: tradeArgs.name,
        description : tradeArgs.description,
        image: tradeArgs.image,
        attributes: tradeArgs.attributes,
        targetName: tradeArgs.targetNftName,
        targetDescription: tradeArgs.targetNftDescription,
        targetImage: tradeArgs.targetNftImage,
        targetAttributes: tradeArgs.targetNftAttributes
      },
    }, {
      onSuccess: async(data, context) => {
        console.log("success",data)
        toast.success(data)
      },
      onError: async(data, context) => {
        toast.error(data)
      },
    });
    return result;
  };

 

  return { _addTrade };
};
