import { PROXY_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";

export const ApproveERC20 = () => {

  const approveERC20 = async (_contractAddress, _amount) => {
    try {
      const spender = hexToDecimalString(PROXY_ADDRESS)
      const result = {
        contractAddress: _contractAddress,
        entrypoint: 'approve',
        calldata: [spender, _amount.low,_amount.high],
      }
      return result
    } catch (error) {
      console.log(error)

    }

  };

  return {
    approveERC20,
  };


};

