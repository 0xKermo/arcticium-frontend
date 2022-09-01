import { GetApprove } from "../../hooks";
import { bnToUint256 } from "../../utils/uint256";
import { useSelector } from "react-redux";
import { ListItem } from "../../hooks";
import {currencyAddresses} from "../../constants/CurrencyAddresses"

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
    let _price = currencyAmount
    let _choosenCurrency = choosenCurrency 
    if (!currencyAmount || !choosenCurrency) {
      _price = null
      _choosenCurrency = null
    }
    const price = Number(_price) * 10**18;
    const priceUint = bnToUint256(price.toString())
    const targetTokenId = bnToUint256(targetNftId ? targetNftId: 0);

     const listItemCallData = [
        contract_address,
        token_id.low,
        token_id.high,
        expiration,
        _choosenCurrency == null ? 0 :  currencyAddresses[_choosenCurrency],
        priceUint.low,
        priceUint.high,
        listType,
        targetCollectionAddress,
        targetTokenId.low,
        targetTokenId.high,
      ];       
    
    const tradeArgs = {
      tradeOwnerAddress: walletAddress,
      tokenContract: contract_address,
      tokenId: _token_id,
      expiration: expiration,
      currencyType: _choosenCurrency == null ? null: currencyAddresses[_choosenCurrency] ,
      price: _price == null ? null : _price.toString(),
      status: "Open",
      targetTokenContract:  targetCollectionAddress,
      targetTokenId: targetNftId,
      tradeType: listType
    };
    listItem(listItemCallData, isApproved, tradeArgs);
  };

  return {
    listItemData,
  };
};
