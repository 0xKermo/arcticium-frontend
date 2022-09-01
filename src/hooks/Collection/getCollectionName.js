import { Provider } from "starknet";
import { hex2a } from "../../utils/util";
import { useDispatch } from "react-redux";
import { setCollectionName } from "../../store/slicers/collections";
export const GetCollectionName = () => {
    const dispatch = useDispatch()
    const getCollectionName = async (_contract_address) => {     
        try {
            const provider = new Provider()
            const tx = await provider.callContract({
                contractAddress: _contract_address,
                entrypoint: 'name',
            })
            const collectionName = hex2a(tx.result.toString())
            dispatch(setCollectionName(collectionName))
            
        } catch (error) {
            dispatch(setCollectionName(null))
        }
    };

    return {
        getCollectionName,
    };
};

