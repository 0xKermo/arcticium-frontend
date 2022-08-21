import { EXCHANGE_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";

export const ApproveERC20 = () => {

  const approveERC20 = async (_contractAddress, _amount) => {
    try {
      const spender = hexToDecimalString(EXCHANGE_ADDRESS)
      const result = {
        contractAddress: _contractAddress,
        entrypoint: 'approve',
        calldata: [spender, _amount],
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

