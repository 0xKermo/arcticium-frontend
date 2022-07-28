import {getSelectorFromName} from "starknet/utils/hash"

const axios = require('axios').default;

const readEvent = () => {
    const formData = {
        "jsonrpc": "2.0",
        "method": "starknet_getEvents",
        "params": [{
            "address": "0x07cB66E9ED0aF79Cda533c96221ae8e2651dd7d49A52bdc4d7C2C54f1B66901a",
            "page_size": 100,
            "page_number": 0,
            "keys":["0x5ad857f66a5b55f1301ff1ed7e098ac6d4433148f0b72ebc4a2945ab85ad53"]
        }],
        "id": 1
    }
    const resFile = axios({
        method: "post",
        url: "https://starknet-goerli.apibara.com",
        data: formData,
        headers: {
            'Content-Type': "application/json"
        },
    });
    return resFile
}

const readTransaction = async (tx) => {
    const formData = {
        "jsonrpc": "2.0",
        "method": "starknet_getTransactionByHash",
        "params": [tx],
        "id": 1
    }
    const resFile = await axios({
        method: "post",
        url: "https://starknet-goerli.apibara.com",
        data: formData,
        headers: {
            'Content-Type': "application/json"
        },
    });
    return resFile
}
const testArray = [
 
    {
        "transaction_hash": "0x48269026061bc5314880911c02d945054fb61e80819ec45ea5b05a8998ca0ec",
        "contract_address": "0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8",
        "token_id": "0x10"
    },
    {
        "transaction_hash": "0x763df6963a0e56f8497dccc57615345f231022c4f3881d5e1a96416fe024ca2",
        "contract_address": "0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8",
        "token_id": "0x11"
    },
    {
        "transaction_hash": "0x32f7a639675b490a5b0e43451796e0ad30ef20a221bac9eda21c7efc1cefd50",
        "contract_address": "0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8",
        "token_id": "0x12"
    },
    {
        "transaction_hash": "0x6064b33101baf2412bd961182601f4ef3a83327d20392daedf5c4a683a6d7cb",
        "contract_address": "0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8",
        "token_id": "0x13"
    },
    {
        "transaction_hash": "0x7527728948f164b368ee9bac1f294275965e9e1b0616382e90a06367475cf18",
        "contract_address": "0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8",
        "token_id": "0x14"
    }
]
export const ownerTokens = async() => {
    
    // const events = await readEvent()
    // const testArray = []
    // const eventTxs =events.data.result.events 
    
    // for(var i = 0; i < eventTxs.length; i++){
    //     var res = await readTransaction(eventTxs[i].transaction_hash)
    //     if (res.data.result.calldata[2] == functionSelector) {
    //         console.log(res.data.result.calldata[2])
    //         try {
    //             var ownerNft = {
    //                 "transaction_hash":eventTxs[i].transaction_hash,
    //                 "contract_address":res.data.result.calldata[1],
    //                 "token_id":res.data.result.calldata[7]
    //             }
    //             tokenIds.push(ownerNft)
    //         } catch (error) {
    //             console.log(res.data.result.calldata)
    
    //         }
    //     }
       
       
    // } 
    // const functionSelector = getSelectorFromName("balanceOf")
    
    return testArray
}