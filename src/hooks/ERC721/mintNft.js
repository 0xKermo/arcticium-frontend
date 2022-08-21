import { useSelector } from "react-redux";
import { ERC721_ADDRESS } from "../../constants/starknetAddress";
import { strToShortStringFelt } from "../../utils/encode";
import { hexToDecimalString, toFelt } from "../../utils/number";
import { bnToUint256 } from "../../utils/uint256";

export const MintErc721 = () => {
    const { walletAddress, account } = useSelector(state => state.wallet)
    const mintErc721 = async ( metadata) => {
        const _ipfsMetadata = await metadata
        const _metadata = splitStrtoFeltArray(_ipfsMetadata)
        const arr_len = _metadata.length
        const arr = _metadata
        const address = hexToDecimalString(walletAddress)
        const calldata = [
            address,
            arr_len,
            ...arr
        ]
        const result = await account.account.execute({
            contractAddress: ERC721_ADDRESS,
            entrypoint: 'mint',
            calldata: calldata,
        })

        return result
    };

    const splitStrtoFeltArray = (string) => {
        const max_felt_length = 31;
        const string_langth = string.length;
        console.log(string_langth);
        const feltArray = [];
        var k = 0;
        if (string_langth > max_felt_length) {
          const iterasyon = Math.floor(string_langth / max_felt_length);
      
          for (var i = 0; i <= iterasyon; i++) {
            feltArray.push(
              toFelt(strToShortStringFelt(string.slice(k, k + max_felt_length)))
            );
            k += max_felt_length;
          }
        } else {
          feltArray.push(string);
        }
        return feltArray;
      };
    return {
        mintErc721,
    };


};

