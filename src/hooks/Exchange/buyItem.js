import { useSelector, useDispatch } from "react-redux";
import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { ToastPromise } from "../../components/toast";
import { GetApprove } from "../ERC721/getApprove";
import { ApproveERC721 } from "../ERC721/approve";
import { bnToUint256 } from "../../utils/uint256";

export const BuyItem = () => {
  const { account, walletAddress } = useSelector((state) => state.wallet);
  const { getApprove } = GetApprove();
  const { approveERC721 } = ApproveERC721();

  const buyItem = async (
    _tradeId,
    _targetItemcontract,
    _price,
    _token_contract,
    tradeStatusChange
  ) => {
    const isApproved = await getApprove(walletAddress, _targetItemcontract);
    let result;
    const price = _price * 10 ** 18;
    const priceUint = bnToUint256(price.toString());
    const approveArgs = {
        contractAddress: _token_contract,
        entrypoint: "approve",
        calldata: [EXCHANGE_ADDRESS, priceUint.low, priceUint.high],
    };
    tradeStatusChange()
    return false
    const acceptBidArgs = [
      {
        contractAddress: EXCHANGE_ADDRESS,
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
        EXCHANGE_ADDRESS,
        1
      );
      acceptBidArgs.push(approveArgs);
      result = await account.account.execute(acceptBidArgs.reverse());
    } else {
      result = await account.account.execute(acceptBidArgs.reverse());
    }

    const tx = account.provider
      .waitForTransaction(result.transaction_hash)
      .then((res) => console.log("res", res));
    const mintLoadingText = "Transaction pending...";
    const voyagerLink = `https://beta-goerli.voyager.online/tx/${result.transaction_hash}`;
    const mintSuccessText = `<a src=${voyagerLink}>Listing cancelled, click and see on Voyager</a>`;
    tx.then(res => {
    })
    ToastPromise(tx, mintLoadingText, mintSuccessText);
    return tx;
  };

  return {
    buyItem,
  };
};