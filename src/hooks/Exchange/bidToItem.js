import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ApproveERC721 } from "../ERC721/approve";
import { ToastPromise } from "../../components/toast";
import { ApproveERC20 } from "../ERC20/approve";

export const BidToItem = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
   const {
    bidCurrencyType,
  } = useSelector((state) => state.bid);
  const { approveERC721 } = ApproveERC721();
  const {approveERC20} = ApproveERC20();
  const bidToItem = async (
    _bidItemCallData,
    _isApprove,
    _bidContractAddress,
    _allowance
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

      if(_allowance != 0){
        const allowanceArgs = await approveERC20(bidCurrencyType, _allowance)
        bidtoItemArgs.push(allowanceArgs);
      }       

      if (_isApprove == 0) {
        const approveArgs = await approveERC721(
          _bidContractAddress,
          EXCHANGE_ADDRESS,
          1
        );
        bidtoItemArgs.push(approveArgs);
        result = await account.account.execute(bidtoItemArgs.reverse());
      } else {
     
        result = await account.account.execute(bidtoItemArgs.reverse());
      }

      const tx = account.provider.waitForTransaction(result.transaction_hash);
      const mintLoadingText = "Transaction pending...";
      const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
      const mintSuccessText = `<a src=${voyagerLink}>Bid successfully apply Click and see on Voyager</a>`;
      ToastPromise(tx, mintLoadingText, mintSuccessText);

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
