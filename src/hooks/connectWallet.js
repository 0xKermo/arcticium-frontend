import { useLazyQuery } from "@apollo/client";
import { BigNumber } from "ethers";
import { connect } from "get-starknet";
import { useDispatch } from "react-redux";
import { getBalance } from "../grqphql/query";
import userIsWl, { setUserIsWl } from "../store/slicers/userIsWl";
import { setWalletAddress, setAccount } from "../store/slicers/wallet";
import { useEffect } from "react";
import { checkWalletIsWl } from "../utils/merkleTree";
import { setADAI, setAETH, setASTARK, setBalanceLoading } from "../store/slicers/erc20Balance";
export const ConnectWallet = () => {
  const dispatch = useDispatch();
  const [_getBalance, { loading, data }] = useLazyQuery(getBalance);

  const connectWallet = async () => {
    const starknet = await connect({ showList: true });
    if (!starknet) {
      throw Error(
        "User rejected wallet selection or silent connect found nothing"
      );
    }
    if (starknet.isConnected) {
      // dispatch(setStarknetAccount(starknet));
      dispatch(setWalletAddress(BigNumber.from(starknet.selectedAddress)._hex));
      const res = checkWalletIsWl(
        BigNumber.from(starknet.selectedAddress)._hex
      );
      dispatch(setUserIsWl(res));
      _getBalance({
        variables: {
          walletAddress: BigNumber.from(starknet.selectedAddress)._hex,
        },
      });
      // dispatch(setProvider(starknet.provider));
      dispatch(setAccount(starknet));
    } else {
      await starknet?.enable();
    }

    return starknet;
  };
      useEffect(() => {
          if (data) {
            dispatch(setAETH(Number(data.balance.aETH)/10**18))
            dispatch(setADAI(Number(data.balance.aDAI)/10**18))
            dispatch(setASTARK(Number(data.balance.aSTARK)/10**18))
            dispatch(setBalanceLoading(!loading))
          }
    }, [loading]);

  const silentConnectWallet = async () => {
    try {
      const starknet = await connect({ showList: false });
      if (!starknet?.isConnected) {
        await starknet?.enable({ showModal: false });
        _getBalance({
          variables: {
            walletAddress: BigNumber.from(starknet.selectedAddress)._hex,
          },
        });
        const res = checkWalletIsWl(
          BigNumber.from(starknet.selectedAddress)._hex
        );
        dispatch(setUserIsWl(res));
        dispatch(setAccount(starknet));
  
        dispatch(setWalletAddress(BigNumber.from(starknet.selectedAddress)._hex));
      }
    } catch (error) {
      console.log(error)
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
