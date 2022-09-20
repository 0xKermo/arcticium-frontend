import { connect } from "get-starknet";
import { ERC20_DAI_ADDRESS, ERC20_ETH_ADDRESS, ERC20_STARK_ADDRESS } from "../../constants/starknetAddress";

export const useAddToken = () => {
  const addToken = async (address) => {
    const windowStarknet = await connect({ showList: false });
    if (!windowStarknet?.isConnected) {
      await windowStarknet?.enable({ showModal: false });
    }
    if (!windowStarknet?.isConnected) {
      throw Error("starknet wallet not connected");
    } else {
      await windowStarknet.request({
        type: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address,
          },
        },
      });
    }
  };

  const addTokens = async () => {
    await addToken(ERC20_ETH_ADDRESS);
    await addToken(ERC20_DAI_ADDRESS);
    await addToken(ERC20_STARK_ADDRESS);
  };
  return {
    addToken,
    addTokens,
  };
};