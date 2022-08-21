import { useSelector } from "react-redux";
import { ERC20_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";
import { bnToUint256 } from "../../utils/uint256";

export const MintErc20 = () => {
  const { walletAddress, account } = useSelector(state => state.wallet)

  const mintErc20 = async () => {
    try {
      const address = hexToDecimalString(walletAddress)
      const amount = bnToUint256("10000000000000000000")
      const result = await account.account.execute({
        contractAddress: ERC20_ADDRESS,
        entrypoint: 'mint',
        calldata: [address, amount.low, amount.high],
      })
      return result
    } catch (error) {
      console.log(error)

    }

  };

  return {
    mintErc20,
  };


};

