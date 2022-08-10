import { useMutation, useQuery } from "@apollo/client";
import { updateUserAssets } from "../mutation";
import {
  setMetadata,
  setMetadataLoading,
  setMetadataError,
} from "../../store/slicers/metadata";
import { useDispatch } from "react-redux";
import { getUserAsset } from "../query";
import { useEffect } from "react";

export const AddUserAsset = () => {
  const [_AddUserAsset] = useMutation(updateUserAssets);
  
  const dispatch = useDispatch();

  const _addUserAsset = (assetsArgs) => {
    console.log(assetsArgs);
    const result = _AddUserAsset({
      variables: assetsArgs,
    });
    return result;
  };

  const GetUserAssets = (walletAddress) => {
    const { loading, error, data } = useQuery(getUserAsset, {
      variables: {
        walletAddress: walletAddress
      },
    });
    if (!loading) {
      dispatch(setMetadata(data.getTokenURI));
      dispatch(setMetadataLoading(loading));
    }

    dispatch(setMetadataError(error));
  };
  return { _addUserAsset, GetUserAssets };
};
