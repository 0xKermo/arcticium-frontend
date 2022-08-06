import { useSelector, useDispatch } from "react-redux";
import {
  setOpenMenu,
  setOpenMenu1,
  setOpenCheckout,
  setOpenCheckoutBid,
  setChoosen,
  setTargetNftId,
  setTargetCollectionAddress,
  setTargetNftLink,
  setChoosenCurrency,
  setVoyagerLink,
  setCurrencyAmount
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
    dispatch(setTargetCollectionAddress(0));
    dispatch(setTargetNftId(0));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setChoosenCurrency(null));
    dispatch(setCurrencyAmount(0));
    document.getElementById("any").classList.add("method_active");
    document.getElementById("collection").classList.remove("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const collectionBtn = () => {
    dispatch(setChoosen(1));
    
    dispatch(setTargetCollectionAddress(0));
    dispatch(setTargetNftId(0));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setChoosenCurrency(null));
    dispatch(setCurrencyAmount(0));
    document.getElementById("any").classList.remove("method_active");
    document.getElementById("collection").classList.add("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const nftBtn = () => {
    dispatch(setChoosen(2));
    
    dispatch(setTargetCollectionAddress(0));
    dispatch(setTargetNftId(0));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setCurrencyAmount(0));
    dispatch(setChoosenCurrency(null));
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
