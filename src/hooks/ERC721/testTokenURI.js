import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";
import { hex2a } from "../../utils/util";
import axios from "axios";

export const GetTestTokenURI = () => {

  const requestToMetadataURL = async (
    metadataURL,
    _contract_address,
    _token_id
  ) => {
    const isPinata = urlCheck(metadataURL)
    const resFile = await axios({
      method: "get",
      url: isPinata,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = {
      name: resFile.data.name,
      description: resFile.data.description,
      image: urlCheck(resFile.data.image),
      contract_address: _contract_address,
      token_id: _token_id,
      attributes: resFile.data.attributes,
    };

    return res;
  };

  const getTestTokenURI = async (_contract_address, _token_id) => {
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
    // console.log(res)
    return res
  };

  const joinTokenURI = async (hexArray, _contract_address, _token_id) => {
    const arr_len = hexArray[0];
    var metadaURI = "";
    for (let i = 1; i <= arr_len; i++) {
      metadaURI += hex2a(hexArray[i]);
    }
    // const res = await requestToMetadataURL(metadaURI,_contract_address,_token_id)
    const parsed = JSON.parse(metadaURI.slice(36))
    console.log(parsed.image)
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(parsed.image.slice(14), 'image/svg+xml');
    console.log(svgDoc)

    return metadaURI
  };

  const urlCheck = (metaDataUrl) => {
    const ipfs = "ipfs://";
    const ipfsGateway = "https://arcswap.mypinata.cloud/ipfs/";
    const isIpfs = metaDataUrl.startsWith(ipfs);
    const isGatewayIpfs = metaDataUrl.startsWith(ipfsGateway);
    if (isIpfs) {
        return ipfsGateway + metaDataUrl.slice(7);
    } else {
      return metaDataUrl;
    }
    
  };

  return {
    getTestTokenURI,
  };
};
