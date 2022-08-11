const ipfs= "ipfs://";
const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";

export const urlCheck = (url) => {
  let resUrl = ""
  const isIpfs = url.startsWith(ipfs);
  const isGatewayIpfs = url.startsWith(ipfsGateway);
  if (isIpfs) {
    resUrl = ipfsGateway+url.slice(7)
  }else if (isGatewayIpfs){
    resUrl = url
  }
  return resUrl
};
