import { useSelector, useDispatch } from "react-redux";
import {
  setBidCollectionAddress,
  setBidCurrencyAmount,
  setBidCurrencyType,
  setBidExpiration,
  setBidId,
  setBidItemId,
} from "../../store/slicers/bid";
import { useMutation,useLazyQuery } from "@apollo/client";
import { BidAdd } from "../../grqphql/mutation";
import { GetApprove } from "../../hooks";
import { bnToUint256 } from "../../utils/uint256";
import { BidToItem } from "../../hooks/Exchange/bidToItem";
import { getUserAssetByContract } from "../../grqphql/query";
import { useEffect } from "react";
import { setUserNfts } from "../../store/slicers/userNfts";

export const BidActions = () => {
  const dispatch = useDispatch();
  const [_BidAdd] = useMutation(BidAdd);
  const { walletAddress } = useSelector((state) => state.wallet);
  const { bidCollectionAddress } = useSelector((state) => state.bid);
  const { getApprove } = GetApprove();
  const {bidToItem} = BidToItem()
  
  const [GetUserAssetByContract, { loading, data }] = useLazyQuery(getUserAssetByContract
    );

  const bidCollectionOnchange = (e) => {
    console.log(e.value);
    GetUserAssetByContract({ variables: { walletAddress: walletAddress, contract_address: e.value } })

    console.log(document.getElementById("bidNft"))
    dispatch(setBidCollectionAddress(e.value));
    // dispatch(setBidItemId(null));

  };
  const bidNftOnchange = (e) => {
    document.getElementById("biddedNft").src =""

    console.log(e.value);
    dispatch(setBidItemId(e.value));
    const filteredAsset = data.getUserAssetByContractAddress.filter(x => x.contract_address == bidCollectionAddress && x.token_id == e.value );
    document.getElementById("biddedNft").src = filteredAsset[0].image
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
    const token_id = bnToUint256(bidData.bidTokenId) 
    const biddedItemId = bnToUint256(bidData.biddedItemId)
    debugger
    let priceUint = bnToUint256("0")
    if(bidData.bidCurrencyType && bidData.bidPrice){
      const _price = bidData.price * 10**18
      priceUint = bnToUint256(_price.toString())

    }

    const bidItemCallData = [
      bidData.tradeId,
      bidData.bidContractAddress,
      token_id.low,token_id.high,
      bidData.expiration,
      bidData.bidCurrencyType,
      priceUint.low,
      priceUint.high,
      bidData.biddedItemContractAddress,
      biddedItemId.low,biddedItemId.high
      
    ]
    const {result,tx} = await bidToItem(bidItemCallData,isApprove, bidData.bidContractAddress)
    tx.then((ress) => {
      console.log("ress",ress)
      _BidAdd({
        variables: bidData,
      });
      
    })
   };  
useEffect(() => {
  if(data != null){
    dispatch(setUserNfts(data.getUserAssetByContractAddress.map((item,i) => {
      return{
        label:item.name,
        value:item.token_id
      }
    })))
  }

  
}, [data])

  return {
    makeOffer,
    bidCollectionOnchange,
    bidNftOnchange,
    bidCurrencyTypeOnchange,
    bidCurrencyAmountOnchange,
  };
};
