import { useSelector, useDispatch } from "react-redux";

import { ToastPromise } from "../components/toast";
import { PROXY_ADDRESS } from "../constants/starknetAddress";

import { Provider } from "starknet";
import { GOERLI_PROVIDER } from "../constants/consttant";
import { toBN } from "../utils/number";

export const AdminExchangeOperation = () => {
  const { account } = useSelector((state) => state.wallet);

  const addCurrency = async (_currency_address) => {
    try {
      const addCurrencyArgs = [
        {
          contractAddress: PROXY_ADDRESS,
          entrypoint: "add_currency_address",
          calldata: [_currency_address],
        },
      ];

      const result = await account.account.execute(addCurrencyArgs);
      const tx = account.provider.waitForTransaction(result.transaction_hash).then((res) => console.log("res",res));
      const mintLoadingText = "Transaction pending...";
      const mintSuccessText = `Currency added`;
      ToastPromise(tx, mintLoadingText, mintSuccessText);
 
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

   const getSwapTrade = async (_tradeId) => {       

    const provider = new Provider(GOERLI_PROVIDER)

    const tx = await provider.callContract({
        contractAddress: PROXY_ADDRESS,
        entrypoint: 'get_swap_trade',
        calldata:[_tradeId]
    })
    console.log(tx)
    return tx

};

const getTradeBid = async (_tradeId,_bidId) => {       

  const provider = new Provider(GOERLI_PROVIDER)

  const tx = await provider.callContract({
      contractAddress: PROXY_ADDRESS,
      entrypoint: 'get_swap_item_bid',
      calldata:[_tradeId,_bidId]
  })
  console.log(tx)
  return tx

};

const getTradeCount = async (_tradeId,_bidId) => {       

  const provider = new Provider(GOERLI_PROVIDER)

  const tx = await provider.callContract({
      contractAddress: PROXY_ADDRESS,
      entrypoint: 'get_swap_trade_count',
      calldata:[]
  })
  console.log(toBN(tx.result[0]).toString())

  return tx

};

const getTradeBidCount = async (_tradeId) => {       

  const provider = new Provider(GOERLI_PROVIDER)

  const tx = await provider.callContract({
      contractAddress: PROXY_ADDRESS,
      entrypoint: 'get_swap_item_bid_count',
      calldata:[_tradeId]
  })
  console.log(tx.result[0].toString())
  return tx

};
  return {
    addCurrency,
    getSwapTrade,
    getTradeBid,
    getTradeCount,
    getTradeBidCount,
    getTradeBidCount
  };
};
