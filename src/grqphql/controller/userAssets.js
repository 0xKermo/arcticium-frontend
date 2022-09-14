import { useMutation, useLazyQuery } from "@apollo/client";
import { status, updateUserAssets } from "../mutation";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../query";
import { useEffect } from "react";
import { setNonFilterUserData, setProfileInfo, setUserAssets } from "../../store/slicers/userAssets";
import { setUserAssetLoader } from "../../store/slicers/loader";
import { setProfileCreated } from "../../store/slicers/profileOperations";

export const UserAsset = (walletAddress) => {
  const [_checkEvents] = useMutation(status);
  // const {walletAddress} = useSelector((state) => state.wallet)
  const [getAsset, { loading, data }] = useLazyQuery(getUserProfile);

  const dispatch = useDispatch();

  const checkEvents = (assetsArgs) => {
    const result = _checkEvents({
      variables: assetsArgs,
    });
    return result;
  };

  const getUserAssets = (walletAddress) => {
    getAsset({ variables: { walletAddress: walletAddress } });
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        dispatch(setUserAssetLoader(false))
        
      }, 1500);
      if (data != undefined) {
        dispatch(setUserAssets(data.getUserAsset));
        dispatch(setProfileInfo(data.getUserProfile));
        dispatch(setNonFilterUserData(data.getUserAsset))
        // const statusArgs = {
        //   walletAddress:walletAddress,
        //   index: data.getUserProfile ? data.getUserProfile.nextPage: 0,
        //   lastIndex: data.getUserProfile ? data.getUserProfile.lastIndex: 0
        // }
        // if(data.getUserProfile == null){
        //   dispatch(setProfileCreated(false))
        // }
        // checkEvents(statusArgs).then(res => {
        //   if(res.data.status.index){
        //   dispatch(setProfileCreated(true))
        //   getUserAssets(walletAddress)
        //   dispatch(setUserAssets(data.getUserAsset));
        //   dispatch(setProfileInfo(data.getUserProfile));
        //   }
        // })
      }
    }
  }, [loading]);

  return {  checkEvents, getUserAssets };
};
