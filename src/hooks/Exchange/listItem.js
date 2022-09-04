import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS, PROXY_ADDRESS } from "../../constants/starknetAddress";
import { ApproveERC721 } from "../ERC721/approve";
import { ToastPromise } from "../../components/toast";
import { setOpenCheckout } from "../../store/slicers/itemDetailOperations";
import { AddTrade } from "../../grqphql";
import { getSelectorFromName } from "starknet/utils/hash";

export const ListItem = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
  const { listType } = useSelector((state) => state.itemDetailOperation);
  const dispatch = useDispatch();
  const { approveERC721 } = ApproveERC721();
  const { _addTrade } = AddTrade();

  const listItem = async (_itemCallData, _isApprove, tradeArgs) => {
    try {
      const listItemSelector = getSelectorFromName("open_swap_trade")
      console.log(listItemSelector)
      
      let listItemArgs = [
        {
          contractAddress: EXCHANGE_ADDRESS,
          entrypoint: "open_swap_trade",
          calldata: _itemCallData,
        },
      ];
      let result;
      if (_isApprove == 0) {
        const approveArgs = await approveERC721(
          tradeArgs.tokenContract,
          EXCHANGE_ADDRESS,
          1
        );
        listItemArgs.push(approveArgs);
        result = await account.account.execute(listItemArgs.reverse());
      } else {
        result = await account.account.execute(listItemArgs[0]);
      }
      dispatch(setOpenCheckout(false));
      if(result.transaction_hash){
        tradeArgs.transactionHash = result.transaction_hash;
        await _addTrade(tradeArgs);
      }
      const tx = account.provider.waitForTransaction(result.transaction_hash);
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `Minted successfully Test arcEth token : <a src=${voyagerLink}>Click and see on Voyager</a>`;

      ToastPromise(tx, mintLoadingText, mintSuccessText);
      tx.then(async(res) => {
        console.log("test", res);
        window.location.reload()
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    listItem,
  };
};
