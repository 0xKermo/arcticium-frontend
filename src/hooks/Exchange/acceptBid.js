import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";

export const AcceptBid = () => {
  const { account } = useSelector((state) => state.wallet);

  const acceptBid = async (_tradeId,_bidId) => {
    try {
      const acceptBidArgs = [
        {
          contractAddress: EXCHANGE_ADDRESS,
          entrypoint: "accept_swap_bid",
          calldata: [_tradeId,_bidId],
        },
      ];

      const result = await account.account.execute(acceptBidArgs);

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
