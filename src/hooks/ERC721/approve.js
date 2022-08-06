import { hexToDecimalString } from "../../utils/number";

export const ApproveERC721 = () => {

  const approveERC721 = async (_contractAddress,_to, _isApprove) => {
    try {
      const to = hexToDecimalString(_to)
      const result = {
        contractAddress: _contractAddress,
        entrypoint: 'setApprovalForAll',
        calldata: [to, _isApprove],
      }
      return result
    } catch (error) {
      console.log(error)

    }

  };

  return {
    approveERC721,
  };


};

