import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setItemOwner } from "../../store/slicers/itemDetailOperations";
import { TradeAdd } from "../mutation";

export const AddTrade = () => {
  const [_TradeAdd] = useMutation(TradeAdd);
  const dispatch = useDispatch()
  const _addTrade = (tradeArgs) => {
    const result = _TradeAdd({
      variables: tradeArgs
    }, {
      onCompleted: async(data, context) => {
        console.log("success",data)
        dispatch(setItemOwner(2))
        toast.success(data)
      },
      onError: async(data, context) => {
        toast.error(data)
      },
    });
    return result;
  };

 

  return { _addTrade };
};
