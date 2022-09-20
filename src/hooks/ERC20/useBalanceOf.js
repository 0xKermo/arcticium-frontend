import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { ERC20_ETH_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";

export const useBalanceOf = () => {
    const {walletAddress, provider,account} = useSelector(state => state.wallet)

    
  useEffect(async () => {

    getBalanceOf()

  }, [provider]);

  const getBalanceOf = async () => {
    try {
      const address = hexToDecimalString(walletAddress)
      const tx = await provider.callContract({
        contractAddress: ERC20_ETH_ADDRESS,
        entrypoint: 'balanceOf',
        calldata: [address],
      })
  
      console.log(tx)
    } catch (error) {

    }


  };


  return {
    getBalanceOf,
  };


  };

