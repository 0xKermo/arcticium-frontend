import {hexToDecimalString,toBN} from "./number"

export function splitBidArray (array) {
    const bidCount = array[0]
    let newArray = []
    let j = 1 // 0. indis bid sayısı
    for(var i = 0; i <bidCount; i++){
      newArray.push(ConvertFunc(array,j))
      j =j+13
    }
}

function ConvertFunc(arr, j){
   const bidData = {
      "trade_id": toBN(arr[j]).toString(),
      "bid_owner": arr[j+1],
      "bid_contract_address" : arr[j+2],
      "bid_token_id":toBN(arr[j+3]).toString()+","+ toBN(arr[j+4]).toString(),
      "expiration":toBN(arr[j+5]).toString(),
      "price":toBN(arr[j+6]).toString(),
      "status":toBN(arr[j+7]).toString(),
      "target_nft_owner":arr[j+8],
      "target_Token_contract":arr[j+9],
      "target_token_id":toBN(arr[j+10]).toString()+","+toBN(arr[j+11]).toString(),
      "item_bid_id" : toBN(arr[j+12]).toString()
    }
    return bidData
}


export function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
  }
  return str;
} 