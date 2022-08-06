import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ApproveERC721 } from "../ERC721/approve";
import { ToastPromise } from "../../components/toast";
import { setOpenCheckout } from "../../store/slicers/itemDetailOperations";
import { AddTrade } from "../../grqphql";

export const ListItem = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
  const { choosen } = useSelector((state) => state.itemDetailOperation);
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
      let result;
      console.log(_isApprove);
      if (_isApprove == 0) {
        const approveArgs = await approveERC721(tradeArgs.tokenContract, EXCHANGE_ADDRESS, 1);
        listItemArgs.push(approveArgs);
        console.log(approveArgs)
        result = await account.account.execute(listItemArgs.reverse());
      } else {
        console.log("ok")
        result = await account.account.execute(listItemArgs[0]);
      }
      dispatch(setOpenCheckout(true));

      const tx = account.provider.waitForTransaction(result.transaction_hash);
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `Minted successfully Test arcEth token : <a src=${voyagerLink}>Click and see on Voyager</a>`;
      tx.then((res) => {
        tradeArgs.transactionHash = result.transaction_hash;
        _addTrade(tradeArgs);
      });
      ToastPromise(tx, mintLoadingText, mintSuccessText);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    listItem,
  };
};
