import { useSelector, useDispatch } from "react-redux";
import {
  setBidCollectionAddress,
  setBidCurrencyAmount,
  setBidCurrencyType,
  setBidExpiration,
  setBidId,
  setBidItemId,
} from "../../store/slicers/bid";
import { useMutation } from "@apollo/client";
import { BidAdd } from "../../grqphql/mutation";
import { GetApprove } from "../../hooks";
import { bnToUint256 } from "../../utils/uint256";
import { BidToItem } from "../../hooks/Exchange/bidToItem";

export const BidActions = () => {
  const dispatch = useDispatch();
  const [_BidAdd] = useMutation(BidAdd);
  const { walletAddress } = useSelector((state) => state.wallet);
   const { getApprove } = GetApprove();
  const {bidToItem} = BidToItem()
  const bidCollectionOnchange = (e) => {
    console.log(e.value);
    dispatch(setBidCollectionAddress(e.value));
  };
  const bidNftOnchange = (e) => {
    console.log(e.target.value);
    dispatch(setBidItemId(e.target.value));
  };
  const bidCurrencyTypeOnchange = (e) => {
    console.log(e.value);
    dispatch(setBidCurrencyType(e.value));
  };
  const bidCurrencyAmountOnchange = (e) => {
    console.log(e.target.value);
    dispatch(setBidCurrencyAmount(e.target.value));
  };
  const makeOffer = async (bidData) => {
    const isApprove = await getApprove(walletAddress, bidData.bidContractAddress)
    console.log("is approve",isApprove)
    const token_id = bnToUint256(bidData.bidTokenId) 
    const biddedItemId = bnToUint256(bidData.biddedItemId)
    const bidItemCallData = [
      bidData.tradeId,
      bidData.bidContractAddress,
      token_id.low,token_id.high,
      bidData.expiration,
      bidData.bidPrice,
      bidData.biddedItemContractAddress,
      biddedItemId.low,biddedItemId.high
      
    ]
    console.log(bidItemCallData)
    const {result,tx} = await bidToItem(bidItemCallData,isApprove, bidData.bidContractAddress)
    // const result = _BidAdd({
    //   variables: bidData,
    // });
    // console.log(result);
  };

  return {
    makeOffer,
    bidCollectionOnchange,
    bidNftOnchange,
    bidCurrencyTypeOnchange,
    bidCurrencyAmountOnchange,
  };
};
