import { ERC721_ADDRESS } from "../../constants/starknetAddress";
import { Provider } from "starknet";

export const GetTotalSupply = () => {

 const getTotalSupply = async () => {
    try {
      const provider = new Provider()
      const tx = await provider.callContract({
        contractAddress: ERC721_ADDRESS,
        entrypoint: 'totalSupply',
      })
      return tx
    } catch (error) {
      console.log("error",error)
    }
  };
  return {
    getTotalSupply,
  };


  };

