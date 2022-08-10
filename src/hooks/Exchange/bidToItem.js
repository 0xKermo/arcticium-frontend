import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ApproveERC721 } from "../ERC721/approve";
import { ToastPromise } from "../../components/toast";

export const BidToItem = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
  const { approveERC721 } = ApproveERC721();
  const bidToItem = async (
    _bidItemCallData,
    _isApprove,
    _bidContractAddress
  ) => {
    try {
      let bidtoItemArgs = [
        {
          contractAddress: EXCHANGE_ADDRESS,
          entrypoint: "open_swap_bid",
          calldata:_bidItemCallData ,
        },
      ];
      let result;

      if (_isApprove == 0) {
        console.log(" a 0")
        const approveArgs = await approveERC721(
          "0x041e478739dc3c8cb8e530b0e2146c3ec4df0f7efaf804131797d39276fde64c",
          EXCHANGE_ADDRESS,
          1
        );
        bidtoItemArgs.push(approveArgs);
        result = await account.account.execute(bidtoItemArgs.reverse());
      } else {
        console.log(" a 1")
        console.log(account)
        result = await account.account.execute(bidtoItemArgs[0]);
      }

      const tx = account.provider.waitForTransaction(result.transaction_hash);
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `<a src=${voyagerLink}>Bid successfully apply Click and see on Voyager</a>`;
      ToastPromise(tx, mintLoadingText, mintSuccessText);
      tx.then((res) => {
        console.log(result)
        console.log(res)
        console.log(tx)
      })
      return {
        result,
        tx,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    bidToItem,
  };
};
