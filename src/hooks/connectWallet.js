import { BigNumber } from "ethers";
import {

  connect,
} from "get-starknet";
import { useDispatch } from "react-redux";
import userIsWl, { setUserIsWl } from "../store/slicers/userIsWl";
import {
  setWalletAddress,
  setProvider,
  setAccount,
} from "../store/slicers/wallet";
import { checkWalletIsWl } from "../utils/merkleTree";
export const ConnectWallet = () => {
  const dispatch = useDispatch();
  const connectWallet = async () => {
    const starknet = await connect({ showList: true });
    if (!starknet) {
      throw Error(
        "User rejected wallet selection or silent connect found nothing"
      );
    }
    if (starknet.isConnected) {
      // dispatch(setStarknetAccount(starknet));
    } else {
      await starknet?.enable();

      console.log("Problem");
    }

    dispatch(setWalletAddress(BigNumber.from(starknet.selectedAddress)._hex ));
    const res =checkWalletIsWl(BigNumber.from(starknet.selectedAddress)._hex)
    dispatch(setUserIsWl(res))
    // dispatch(setProvider(starknet.provider));
    dispatch(setAccount(starknet));
    return starknet
  };
  
  const silentConnectWallet = async () => {
    const starknet = await connect({ showList: false });
    if (!starknet?.isConnected) {
      await starknet?.enable({ showModal: false });
      const res =checkWalletIsWl(BigNumber.from(starknet.selectedAddress)._hex)

      dispatch(setUserIsWl(res))
      dispatch(setWalletAddress(BigNumber.from(starknet.selectedAddress)._hex));
    }
  };
  const disconnectWallet = async () => {
    localStorage.clear();
    dispatch(setWalletAddress(null));
    dispatch(setAccount(null));
  };
  return {
    connectWallet,
    disconnectWallet,
    silentConnectWallet,
  };
};
