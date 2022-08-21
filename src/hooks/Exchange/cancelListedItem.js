import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";

export const CancelListedItem = () => {
  const { account } = useSelector((state) => state.wallet);

  const cancelListedItem = async (_tradeId) => {
    try {
      const cancelItemArgs = [
        {
          contractAddress: EXCHANGE_ADDRESS,
          entrypoint: "cancel_swap_trade",
          calldata: [_tradeId],
        },
      ];

      const result = await account.account.execute(cancelItemArgs);
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
    cancelListedItem,
  };
};
