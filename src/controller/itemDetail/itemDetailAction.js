import { useSelector, useDispatch } from "react-redux";
import {
  setOpenMenu,
  setOpenMenu1,
  setOpenCheckout,
  setOpenCheckoutBid,
  setListType,
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
    dispatch(setListType(0));
    dispatch(setTargetCollectionAddress(0));
    dispatch(setTargetNftId(null));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setChoosenCurrency(null));
    dispatch(setCurrencyAmount(null));
    document.getElementById("any").classList.add("method_active");
    document.getElementById("collection").classList.remove("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const collectionBtn = () => {
    dispatch(setListType(1));
    
    dispatch(setTargetCollectionAddress(0));
    dispatch(setTargetNftId(null));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setChoosenCurrency(null));
    dispatch(setCurrencyAmount(null));
    document.getElementById("any").classList.remove("method_active");
    document.getElementById("collection").classList.add("method_active");
    document.getElementById("nft").classList.remove("method_active");
  };
  const nftBtn = () => {
    dispatch(setListType(2));
    
    dispatch(setTargetCollectionAddress(null));
    dispatch(setTargetNftId(null));
    dispatch(setTargetNftLink(null));
    dispatch(setVoyagerLink(null));
    dispatch(setCurrencyAmount(null));
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
