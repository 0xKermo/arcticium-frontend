import { useSelector, useDispatch } from "react-redux";
import {
  setOpenMenu,
  setOpenMenu1,
  setOpenCheckout,
  setOpenCheckoutBid,
  setChoosen
} from "../../store/slicers/itemDetailOperations";

export const ItemDetailAction = () => {
  const { openMenu, openMenu1 } = useSelector(
    (state) => state.itemDetailOperation
  );
  const dispatch = useDispatch();
  const handleBtnClick = (): void => {
    dispatch(setOpenMenu(!openMenu));
    dispatch(setOpenMenu1(false));
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };

  const handleBtnClick1 = (): void => {
    dispatch(setOpenMenu1(!openMenu1));
    dispatch(setOpenMenu(false));
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    
  };
  const anyBtn = () => {
    dispatch(setChoosen(0));
    document.getElementById("any").classList.add("method_active");
    document.getElementById("collection").classList.remove("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const collectionBtn = () => {
    dispatch(setChoosen(1));
    document.getElementById("any").classList.remove("method_active");
    document.getElementById("collection").classList.add("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const nftBtn = () => {
    dispatch(setChoosen(2));
    document.getElementById("any").classList.remove("method_active");
    document.getElementById("collection").classList.remove("method_active");
    document.getElementById("nft").classList.add("method_active");
  };

  return {
    handleBtnClick,
    handleBtnClick1,
    anyBtn,
    collectionBtn,
    nftBtn
  };
};
