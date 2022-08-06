import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";
import { hex2a } from "../../utils/util";
import axios from "axios";

export const GetTokenURI = () => {
    const base_pinata_url = "https://gateway.pinata.cloud/ipfs/"

    const requestToMetadataURL = async (metadataURL,_contract_address,_token_id) => {
        const resFile = await axios({
            method: "get",
            url: metadataURL,
            headers: {
                "Content-Type": "application/json"
            },
        });
        const image_link =base_pinata_url + resFile.data.image.split("ipfs://")[1]
        const res = {
            "name":resFile.data.name,
            "description":resFile.data.description,
            "image":image_link,
            "contract_address":_contract_address,
            "token_id": _token_id,
            "attributes": resFile.data.attributes
        }
    
        return res
    }


    const getTokenURI = async (_contract_address, _token_id) => {        
        let token_id = bnToUint256(_token_id)
        const low = hexToDecimalString(token_id.low)
        const high = hexToDecimalString(token_id.high)
        const provider = new Provider()

        const tx = await provider.callContract({
            contractAddress: _contract_address,
            entrypoint: 'tokenURI',
            calldata: [low,high]
        })
        const res = joinTokenURI(tx.result,_contract_address,_token_id)
        return res

    };

    const joinTokenURI = async (hexArray,_contract_address,_token_id) => {
        const arr_len = hexArray.length
        var res
        var metadaURI = ""
        for (let i = 1; i < arr_len; i++) {
            metadaURI += hex2a(hexArray[i])
        }
        try {
            const pinata_url = base_pinata_url + metadaURI.split("ipfs://")[1]
            res = requestToMetadataURL(pinata_url,_contract_address,_token_id)
        } catch (error) {
            res = ""
        }

        return res
    }

    return {
        getTokenURI,
    };


};

