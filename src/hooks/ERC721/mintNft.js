import { useSelector } from "react-redux";
import { ERC721_ADDRESS } from "../../constants/starknetAddress";
import { hexToDecimalString, toFelt } from "../../utils/number";
import { bnToUint256 } from "../../utils/uint256";
import { GetTotalSupply } from "./useTotalSupply";

export const MintErc721 = () => {
    const { walletAddress, account,provider } = useSelector(state => state.wallet)
    const {getTotalSupply} = GetTotalSupply()
    const mintErc721 = async ( metadata) => {
        const _metadata = await metadata
        const arr_len = _metadata.length
        const arr = _metadata
        let calldata = []
        const address = hexToDecimalString(walletAddress)
        const totalSupply = await getTotalSupply()
        let next_token_id = hexToDecimalString(totalSupply.result[0])
        next_token_id = bnToUint256(next_token_id)
        if (arr_len > 0 && arr_len == 2) {
            calldata = [
                address,
                next_token_id.low, next_token_id.high,
                arr_len,
                toFelt(arr[0]), toFelt(arr[1])
            ]
        }else if(arr_len == 3){
            calldata = [
                address,
                next_token_id.low, next_token_id.high,
                arr_len,
                toFelt(arr[0]), toFelt(arr[1]),toFelt(arr[1]),toFelt(arr[2])
            ]
        }
        const result = await account.account.execute({
            contractAddress: ERC721_ADDRESS,
            entrypoint: 'mint',
            calldata: calldata,
        })

        return result
    };

    return {
        mintErc721,
    };


};

