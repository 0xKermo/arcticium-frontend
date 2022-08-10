import { useSelector,useDispatch } from "react-redux";
import { setTargetNftLink,setTargetCollectionAddress,setTargetNftId,setCurrencyAmount } from "../../store/slicers/itemDetailOperations";
import { GetTokenURI } from "../../hooks";
export const TargetNftOperation = () => {
    const dispatch = useDispatch()
    const {targetCollectionAddress, targetNftId} = useSelector((state) => state.itemDetailOperation)
    
    const targetNftOnchange = async (e) => {
       dispatch(setTargetNftId(e.target.value))

        const _targetNftLink =
          "http://localhost:3000/asset/" + targetCollectionAddress + "/" + e.target.value;
          dispatch(setTargetNftLink(_targetNftLink));
      };
    
      const targetCollectionOnchange = (e) => {
        dispatch(setTargetCollectionAddress(e.value));
        const _targetNftLink =
          "http://localhost:3000/asset/" + e.value + "/" + targetNftId;
          dispatch(setTargetNftLink(_targetNftLink));
      };

      const currencyAmountOnchange = (e) => {
        dispatch(setCurrencyAmount(e.target.value))
      }
      return {
        targetNftOnchange,
        targetCollectionOnchange,
        currencyAmountOnchange
      }

}
 