import { getStarknet } from "get-starknet"
import {useDispatch } from "react-redux";
import {
  setWalletAddress,
  setProvider,
  setAccount,
} from "../store/slicers/wallet";
export const ConnectWallet =  () => {
  const dispatch = useDispatch();
  const connectWallet = async () => {
    const starknet = getStarknet()
    if (!starknet) {
      throw Error("User rejected wallet selection or silent connect found nothing")
    }
    
    await starknet.enable()

    
    dispatch(setWalletAddress(starknet.selectedAddress));
    // dispatch(setProvider(starknet.provider));
    dispatch(setAccount(starknet));
    return starknet
  }
return {
  connectWallet
}
}