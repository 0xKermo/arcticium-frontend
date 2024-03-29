import { useSelector, useDispatch } from "react-redux";
import { PROXY_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";
import { updateBidStatus } from "../../grqphql/mutation";
import { useMutation } from "@apollo/client";

export const AcceptBid = () => {
  const { account } = useSelector((state) => state.wallet);
  const [bidStatus] = useMutation(updateBidStatus);

  const acceptBid = async (_tradeId,_bidId, _bidOwner) => {
    try {
      const acceptBidArgs = [
        {
          contractAddress: PROXY_ADDRESS,
          entrypoint: "accept_swap_bid",
          calldata: [_tradeId,_bidId],
        },
      ];

      const result = await account.account.execute(acceptBidArgs);
      if(result.transaction_hash){
        bidStatus({
          variables:{
            tradeId:_tradeId,
            itemBidId: _bidId,
            status:"Executed",
            transactionHash: result.transaction_hash
          }
        })
      }
      const tx = account.provider.waitForTransaction(result.transaction_hash).then((res) => console.log("res",res));
      tx.then((res) => {
        console.log("accepted bid",res)
      })
      const mintLoadingText = "Transaction pending...";
      const mintSuccessText = `Trade successfully executed`;
      ToastPromise(tx, mintLoadingText, mintSuccessText);
 
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    acceptBid,
  };
};
