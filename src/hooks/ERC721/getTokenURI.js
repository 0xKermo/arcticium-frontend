import { Provider } from "starknet";
import { bnToUint256 } from "../../utils/uint256";
import { hexToDecimalString } from "../../utils/number";
import { hex2a } from "../../utils/util";
import axios from "axios";

export const GetTokenURI = () => {
  const requestToMetadataURL = async (
    metadataURL,
    _contract_address,
    _token_id
  ) => {
    const isPinata = urlCheck(metadataURL);
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

  const getTokenURI = async (_contract_address, _token_id) => {
    try {
      
      let token_id = bnToUint256(_token_id);
      const low = hexToDecimalString(token_id.low);
      const high = hexToDecimalString(token_id.high);
      const provider = new Provider();
  
      const tx = await provider.callContract({
        contractAddress: _contract_address,
        entrypoint: "tokenURI",
        calldata: [low, high],
      });
      const res = await joinTokenURI(tx.result, _contract_address, _token_id);
      console.log("res",res)
      return res;
    } catch (error) {
      return null
    }
  };

  const joinTokenURI = async (hexArray, _contract_address, _token_id) => {
    const arr_len = hexArray[0];
    var metadaURI = "";
    for (let i = 1; i <= arr_len; i++) {
      metadaURI += hex2a(hexArray[i]);
    }
    const res = await requestToMetadataURL(
      metadaURI,
      _contract_address,
      _token_id
    );

    return res;
  };
 const urlCheck = (metaDataUrl) => {
    const ipfs = "ipfs/";
    const ipfs2 = "ipfs://";
    const ipfsGateway = "https://arcswap.mypinata.cloud/ipfs/";
    const isIpfs = metaDataUrl.indexOf(ipfs);
    const isIpfs2 = metaDataUrl.indexOf(ipfs2);
    if (isIpfs2 === -1 && isIpfs !== -1) {

      return ipfsGateway + metaDataUrl.slice(isIpfs + ipfs.length);
    } else if (isIpfs2 !== -1 && isIpfs === -1) {

      return ipfsGateway + metaDataUrl.slice(isIpfs2 + ipfs2.length);
    } else {
      return metaDataUrl;
    }
  };

  return {
    getTokenURI,
    urlCheck
  };
};
