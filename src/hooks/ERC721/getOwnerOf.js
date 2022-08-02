import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";

export const GetOwnerOf = () => {
    const getOwnerOf = async (_contract_address, _token_id) => {     
        let token_id = bnToUint256(_token_id)
        const low = hexToDecimalString(token_id.low)
        const high = hexToDecimalString(token_id.high)
        const provider = new Provider()
        const tx = await provider.callContract({
            contractAddress: _contract_address,
            entrypoint: 'ownerOf',
            calldata: [low,high]
        })
        return tx

    };

    return {
        getOwnerOf,
    };
};

