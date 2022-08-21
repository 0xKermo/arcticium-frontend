import { useMutation, useLazyQuery } from "@apollo/client";
import { updateUserAssets } from "../mutation";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../query";
import { useEffect } from "react";
import { setProfileInfo, setUserAssets } from "../../store/slicers/userAssets";

export const AddUserAsset = () => {
  const [_AddUserAsset] = useMutation(updateUserAssets);
  // const {walletAddress} = useSelector((state) => state.wallet)

  const [getAsset, { loading, data }] = useLazyQuery(getUserProfile);

  const dispatch = useDispatch();

  const _addUserAsset = (assetsArgs) => {
    const result = _AddUserAsset({
      variables: assetsArgs,
    });
    return result;
  };

  const getUserAssets = (walletAddress) => {
    getAsset({ variables: { walletAddress: walletAddress } });
  };

  useEffect(() => {
    if (!loading) {
      if (data != undefined) {
        dispatch(setUserAssets(data.getUserAsset));
        dispatch(setProfileInfo(data.getUserProfile));
        console.log(data.getUserProfile)
      }
    }
  }, [loading]);

  return {  _addUserAsset, getUserAssets };
};
