import { useSelector, useDispatch } from "react-redux";
import { PROXY_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";
import { GetApprove } from "../ERC721/getApprove";
import { ApproveERC721 } from "../ERC721/approve";
import { bnToUint256 } from "../../utils/uint256";
import { useMutation } from "@apollo/client";
import { updateTradeStatus } from "../../grqphql/mutation";

export const BuyItem = () => {
  const { account, walletAddress } = useSelector((state) => state.wallet);
  const { getApprove } = GetApprove();
  const { approveERC721 } = ApproveERC721();
  const [tradeStatus] = useMutation(updateTradeStatus);

  const buyItem = async (
    _tradeId,
    _targetItemcontract,
    _price,
    _token_contract,
    tradeStatusData
  ) => {
    const isApproved = await getApprove(walletAddress, _targetItemcontract);
    let result;
    const price = _price * 10 ** 18;
    const priceUint = bnToUint256(price.toString());

    const approveArgs = {
        contractAddress: _token_contract,
        entrypoint: "approve",
        calldata: [PROXY_ADDRESS, priceUint.low, priceUint.high],
    };
    const acceptBidArgs = [
      {
        contractAddress: PROXY_ADDRESS,
        entrypoint: "execute_swap_trade",
        calldata: [_tradeId],
      },
    ];
    if (price != 0) {
      acceptBidArgs.push(approveArgs);
    }
    if (isApproved == 0) {
      const approveArgs = await approveERC721(
        _targetItemcontract,
        PROXY_ADDRESS,
        1
      );
      acceptBidArgs.push(approveArgs);
      result = await account.account.execute(acceptBidArgs.reverse());
    } else {
      result = await account.account.execute(acceptBidArgs.reverse());
    }
    if(result.transaction_hash){
      tradeStatus.transactionHash   = result.transaction_hash
      tradeStatus({
        variables: tradeStatusData,
      });
    }
  
    const tx = account.provider
      .waitForTransaction(result.transaction_hash)
      .then((res) => console.log("res", res));
    const mintLoadingText = "Transaction pending...";
    const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
    const mintSuccessText = `<a src=${voyagerLink}>Listing cancelled, click and see on Voyager</a>`;

    ToastPromise(tx, mintLoadingText, mintSuccessText);
    return tx;
  };

  return {
    buyItem,
  };
};
