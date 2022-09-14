import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";
import { hex2a } from "../../utils/util";

export const GetPixelTokenURI = () => {

  const getPixelTokenURI = async (_contract_address, _token_id) => {
    let token_id = bnToUint256(_token_id);
    const low = hexToDecimalString(token_id.low);
    const high = hexToDecimalString(token_id.high);
    const provider = new Provider();

    const tx = await provider.callContract({
      contractAddress: _contract_address,
      entrypoint: "tokenURI",
      calldata: [low, high],
    });
    const res = await joinTokenURI(tx.result,_contract_address,_token_id);
    return res
  };

  const joinTokenURI = async (hexArray, _contract_address, _token_id) => {
    const arr_len = hexArray[0];
    var metadaURI = "";
    for (let i = 1; i <= arr_len; i++) {
      metadaURI += hex2a(hexArray[i]);
    }
    const parsed = JSON.parse(metadaURI.slice(36))
    console.log(parsed.image)
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(parsed.image.slice(14), 'image/svg+xml');
    console.log(svgDoc)

    return svgDoc
  };


  return {
    getPixelTokenURI,
  };
};
