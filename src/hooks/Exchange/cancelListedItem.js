import { useSelector, useDispatch } from "react-redux";
import { PROXY_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";
import { useMutation } from "@apollo/client";
import { cancelTrade } from "../../grqphql/mutation";
import { setItemOwner } from "../../store/slicers/itemDetailOperations";

export const CancelListedItem = () => {
  const { account } = useSelector((state) => state.wallet);
  const [_cancelTrade] = useMutation(cancelTrade);
  const dispatch = useDispatch()
  const cancelListedItem = async (_tradeId) => {
    try {
      const cancelItemArgs = [
        {
          contractAddress: PROXY_ADDRESS,
          entrypoint: "cancel_swap_trade",
          calldata: [_tradeId],
        },
      ];

      const result = await account.account.execute(cancelItemArgs);
      if(result.transaction_hash){
        const res = _cancelTrade({
          variables: {
            tradeId: _tradeId,
            transactionHash : result.transaction_hash
      
          },
        });
        res.then((res) => {
          console.log(res);
          if ((res.data.tradeStatus.status = "Cancelled")) {
            dispatch(setItemOwner(1));
          }
        });

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
    cancelListedItem,
  };
};
