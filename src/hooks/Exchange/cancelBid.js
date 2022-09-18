import { useSelector, useDispatch } from "react-redux";
import { PROXY_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";
import { updateBidStatus } from "../../grqphql/mutation";
import { useMutation } from "@apollo/client";

export const CancelBid = () => {
  const { account } = useSelector((state) => state.wallet);
  const [bidStatus] = useMutation(updateBidStatus);

  const cancelBid = async (_tradeId,_bidId, _bidOwner) => {
    try {
      const cancelBidArgs = [
        {
          contractAddress: PROXY_ADDRESS,
          entrypoint: "cancel_swap_bid",
          calldata: [_tradeId,_bidId],
        },
      ];

      const result = await account.account.execute(cancelBidArgs);
      if(result.transaction_hash){
        bidStatus({
          variables:{
            tradeId:_tradeId,
            itemBidId: _bidId,
            status:"Cancelled",
            transactionHash: result.transaction_hash
          }
        })
      }
      const tx = account.provider.waitForTransaction(result.transaction_hash).then((res) => console.log("res",res));
      const mintLoadingText = "Transaction pending...";
      const mintSuccessText = `Bid successfully cancelled`;
      ToastPromise(tx, mintLoadingText, mintSuccessText);

      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    cancelBid,
  };
};
