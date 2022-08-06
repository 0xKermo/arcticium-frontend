import { useSelector,useDispatch } from "react-redux";
import { setTargetNftLink,setTargetCollectionAddress,setTargetNftId,setCurrencyAmount } from "../../store/slicers/itemDetailOperations";
export const Target = () => {
    const dispatch = useDispatch()
    const {targetCollectionAddress, targetNftId} = useSelector((state) => state.itemDetailOperation)
    const targetNftOnchange = (e) => {
       dispatch(setTargetNftId(e.target.value))
        const _targetNftLink =
          "http://localhost:3000/" + targetCollectionAddress + "/" + e.target.value;
          dispatch(setTargetNftLink(_targetNftLink));
      };
    
      const targetCollectionOnchange = (e) => {
        dispatch(setTargetCollectionAddress(e.value));
        const _targetNftLink =
          "http://localhost:3000/" + e.value + "/" + targetNftId;
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
 