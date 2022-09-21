import { useSelector } from "react-redux";
import {
  ERC20_ETH_ADDRESS,
  ERC20_DAI_ADDRESS,
  ERC20_STARK_ADDRESS,
} from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";
import { bnToUint256 } from "../../utils/uint256";
import { useAddToken } from "./addTokens";


export const MintErc20 = () => {
  const { walletAddress, account } = useSelector((state) => state.wallet);
  const { addTokens } = useAddToken();

  const mintErc20 = async () => {
    try {
      const address = hexToDecimalString(walletAddress);
      const result = await account.account.execute([
        {
          contractAddress: ERC20_ETH_ADDRESS,
          entrypoint: "mint",
          calldata: [address],
        },
        {
          contractAddress: ERC20_DAI_ADDRESS,
          entrypoint: "mint",
          calldata: [address],
        },
        {
          contractAddress: ERC20_STARK_ADDRESS,
          entrypoint: "mint",
          calldata: [address],
        }]
      );
    addTokens()

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    mintErc20,
  };
};
