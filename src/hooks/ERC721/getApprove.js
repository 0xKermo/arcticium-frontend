import { Provider } from "starknet";
import { toBN } from "starknet/utils/number";
import { ERC721_ADDRESS ,EXCHANGE_ADDRESS} from "../../constants/starknetAddress";
import { hexToDecimalString } from "../../utils/number";
export const GetApprove = () => {
  const getApprove = async (_owner, _contract) => {
    const owner = hexToDecimalString(_owner)
    const operator =hexToDecimalString(EXCHANGE_ADDRESS)

    const provider = new Provider();
    const tx = await provider.callContract({
      contractAddress: _contract,
      entrypoint: "isApprovedForAll",
      calldata: [owner, operator],
    });
    return toBN(tx.result.toString()).toString();
  };

  return {
    getApprove,
  };
};
