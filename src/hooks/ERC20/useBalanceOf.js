import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { ERC20_ETH_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";

export const useBalanceOf = () => {
    const {walletAddress, provider,account} = useSelector(state => state.wallet)

  const getBalanceOf = async (_contract_address) => {
    try {
      const address = hexToDecimalString(walletAddress)
      const tx = await provider.callContract({
        contractAddress: _contract_address,
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

