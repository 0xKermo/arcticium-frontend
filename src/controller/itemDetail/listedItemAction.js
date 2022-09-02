import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { ToastPromise } from "../../components/toast";
import { cancelTrade } from "../../grqphql/mutation";
import { CancelListedItem } from "../../hooks";
import { setItemOwner } from "../../store/slicers/itemDetailOperations";

export const ListedItemAction = () => {
  const { cancelListedItem } = CancelListedItem();
  const [_cancelTrade] = useMutation(cancelTrade);
  const dispatch = useDispatch();
  const { walletAddress, account } = useSelector((state) => state.wallet);

  const cancelItemListing = async (_tradeId, _contract, _id) => {
    try {
      const contractResult = cancelListedItem(_tradeId);
      const tx = account.provider.waitForTransaction(
        contractResult.transaction_hash
      );

      const mintLoadingText = "Transaction pending...";
      const successText = "Listing succesfully cancelled";

      ToastPromise(tx, mintLoadingText, successText);
      tx.then((ress) => {
        const res = _cancelTrade({
          variables: {
            tradeId: _tradeId,
      
          },
        });
        res.then((res) => {
          console.log(res);
          if ((res.data.tradeStatus.status = "Cancelled")) {
            dispatch(setItemOwner(1));
          }
        });
      });
    } catch (error) {}
  };

  return {
    cancelItemListing,
  };
};
