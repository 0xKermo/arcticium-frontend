import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ApproveERC721 } from "../ERC721/approve";
import { ToastPromise } from "../../components/toast";
import { setOpenCheckout } from "../../store/slicers/itemDetailOperations";
import { AddTrade } from "../../grqphql";

export const ListItem = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
  const { listType } = useSelector((state) => state.itemDetailOperation);
  const dispatch = useDispatch();
  const { approveERC721 } = ApproveERC721();
  const { _addTrade } = AddTrade();

  const listItem = async (_itemCallData, _isApprove, tradeArgs) => {
    try {
      let listItemArgs = [
        {
          contractAddress: EXCHANGE_ADDRESS,
          entrypoint: "open_swap_trade",
          calldata: _itemCallData,
        },
      ];
      tradeArgs.transactionHash = "result.transaction_hash";

      const resAddTrade = _addTrade(tradeArgs);
      return false
      let result;

      if (_isApprove == 0) {
        console.log(0)
        const approveArgs = await approveERC721(
          tradeArgs.tokenContract,
          EXCHANGE_ADDRESS,
          1
        );
        listItemArgs.push(approveArgs);
        result = await account.account.execute(listItemArgs.reverse());
      } else {
        console.log(1)

        result = await account.account.execute(listItemArgs[0]);
      }
      dispatch(setOpenCheckout(false));

      const tx = account.provider.waitForTransaction(result.transaction_hash);
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `Minted successfully Test arcEth token : <a src=${voyagerLink}>Click and see on Voyager</a>`;
    
     ToastPromise(tx, mintLoadingText, mintSuccessText);
      tx.then(res => {
        console.log("test")
        tradeArgs.transactionHash = result.transaction_hash;
        const resAddTrade = _addTrade(tradeArgs);
        console.log(resAddTrade);
      })
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    listItem,
  };
};
