import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
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
          contractAddress: EXCHANGE_ADDRESS,
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
            trasactionHash: result.transaction_hash
          }
        })
      }
      const tx = account.provider.waitForTransaction(result.transaction_hash).then((res) => console.log("res",res));
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `<a src=${voyagerLink}>Listing cancelled, click and see on Voyager</a>`;
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
