import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";
import { AMM1 } from "../../constants/starknetAddress";

export const GetAmmOut = () => {
    const getAmmOut = async () => {  
        console.log("ok")      
        let amt_in = bnToUint256("1")
        const low = hexToDecimalString(amt_in.low)
        const high = hexToDecimalString(amt_in.high)
        let token_in = "1"
        let token_out = "2"
        const provider = new Provider()
        console.log(AMM1)
        const tx = await provider.callContract({
            contractAddress: AMM1,
            entrypoint: 'get_amt_out_through_path',
            calldata: [
            low,high,
            [token_in,
            token_out,token_in,token_out]
        ]
        })
        return tx

    };

    return {
        getAmmOut,
    };
};

