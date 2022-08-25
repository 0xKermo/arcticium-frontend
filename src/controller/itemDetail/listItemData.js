import { GetApprove } from "../../hooks";
import { bnToUint256 } from "../../utils/uint256";
import { useSelector } from "react-redux";
import { ToastPromise } from "../../components/toast";
import { ListItem } from "../../hooks";
import {currencyAddresses} from "../../constants/CurrencyAddresses"
import { toHex } from "../../utils/number";

export const ListItemData = () => {
  const { listType, targetCollectionAddress, targetNftId, currencyAmount,choosenCurrency } =
    useSelector((state) => state.itemDetailOperation);
  const { walletAddress } = useSelector((state) => state.wallet);
  const { getApprove } = GetApprove();
  const { listItem } = ListItem();

  const listItemData = async (_contract, _token_id) => {
    const isApproved = await getApprove(walletAddress, _contract);
    const contract_address = _contract;
    const token_id = bnToUint256(_token_id);
    const expiration = 1665179996;
    const price = Number(currencyAmount) * 10**18;
    const priceUint = bnToUint256(price.toString())
    const targetTokenId = bnToUint256(targetNftId);

     const listItemCallData = [
        contract_address,
        token_id.low,
        token_id.high,
        expiration,
        choosenCurrency == null ? 0 :  currencyAddresses[choosenCurrency],
        priceUint.low,
        targetCollectionAddress,
        targetTokenId.low,
        targetTokenId.high,
      ];       
    const tradeArgs = {
      tradeOwnerAddress: walletAddress,
      tokenContract: contract_address,
      tokenId: _token_id,
      expiration: expiration,
      currencyType: choosenCurrency == null ? null: currencyAddresses[choosenCurrency] ,
      price: currencyAmount == null ? 0 : parseFloat(currencyAmount),
      status: "Open",
      targetTokenContract: targetCollectionAddress === 0 ? null : targetCollectionAddress,
      targetTokenId: targetNftId,
      tradeType: listType
    };
    listItem(listItemCallData, isApproved, tradeArgs);
  };

  return {
    listItemData,
  };
};
