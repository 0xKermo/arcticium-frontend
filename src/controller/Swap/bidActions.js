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

export const BidActions = (_contract_address, tradeType) => {
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

  const makeOffer = async (bidData, bidItemCallData,_allowance) => {
    const isApprove = await getApprove(walletAddress, bidData.bidContractAddress)
    
    const {result,tx} = await bidToItem(bidItemCallData,isApprove, bidData.bidContractAddress,_allowance)
    tx.then((ress) => {
      console.log("ress",ress)
      console.log("tx",tx)

      _BidAdd({
        variables: bidData,
      });
      
    })
   };  

useEffect(() => {
  if(tradeType == 1){

    GetUserAssetByContract({ variables: { walletAddress: walletAddress, contract_address: _contract_address} })
    dispatch(setBidCollectionAddress(_contract_address))
  }
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
