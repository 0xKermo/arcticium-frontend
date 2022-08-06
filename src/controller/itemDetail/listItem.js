import { GetApprove } from "../../hooks";
import { bnToUint256 } from "../../utils/uint256";
import { useSelector } from "react-redux";
import { ToastPromise } from "../../components/toast";
import { ListItem } from "../../hooks";

export const ListItemData = () => {
  const { choosen, targetCollectionAddress, targetNftId, currencyAmount } =
    useSelector((state) => state.itemDetailOperation);
    const { walletAddress } = useSelector((state) => state.wallet);
    const { getApprove } = GetApprove();
    const { listItem } = ListItem();

  const listItemData = async (_contract, _token_id) => {
    const isApproved = await getApprove(walletAddress, _contract);
    let listItemCallData = [];
    const contract_address = _contract;
    const token_id = bnToUint256(_token_id);
    const expiration = 1234;
    const price = currencyAmount;
    const targetTokenId = bnToUint256(targetNftId);
    
    if (choosen === 0) {
      listItemCallData = [
        contract_address,
        token_id.low,
        token_id.high,
        expiration,
        price,
        targetCollectionAddress,
        targetTokenId.low,
        targetTokenId.high,
      ];
    } else if (choosen === 1) {
      listItemCallData = [
        contract_address,
        token_id.low,
        token_id.high,
        expiration,
        price,
        targetCollectionAddress,
        targetTokenId.low,
        targetTokenId.high,
      ];
    } else if (choosen === 2) {
      listItemCallData = [
        contract_address,
        token_id.low,
        token_id.high,
        expiration,
        price,
        targetCollectionAddress,
        targetTokenId.low,
        targetTokenId.high,
      ];
    }
    
    const tradeArgs = {
      tradeId:1,
      tradeOwnerAddress: walletAddress,
      tokenContract:contract_address,
      tokenId: _token_id == null?0:Number(_token_id),
      expiration: expiration,
      price: price == null ? 0 :Number(price),
      status: "Open",
      swapTradeId: 1,
      targetTokenContract: targetCollectionAddress === 0?null:targetCollectionAddress,
      targetTokenId:targetNftId == null ? 0 : Number(targetNftId),
      transactionHash: "result.transaction_hash",
      tradeType:choosen,
    };
    listItem(listItemCallData, isApproved,tradeArgs)
  };

  return {
    listItemData,
  };
};
