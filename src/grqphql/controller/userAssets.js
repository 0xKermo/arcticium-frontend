import { useMutation } from "@apollo/client";
import { updateUserAssets } from "../mutation";
export const AddUserAsset = () => {
  const [_AddUserAsset] = useMutation(updateUserAssets);

  const _addUserAsset = (assetsArgs) => {
    console.log(assetsArgs);
    const result = _AddUserAsset({
      variables: assetsArgs,
    });
    return result;
  };

 

  return { _addUserAsset };
};
