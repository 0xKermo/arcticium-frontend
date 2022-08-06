import { useSelector, useDispatch } from "react-redux";
import {
  setOpenMenu,
  setOpenMenu1,
  setOpenMenu2,
  setOpenMenu3,
} from "../../store/slicers/profileOperations";

export const ProfileActions = () => {
  const { openMenu, openMenu1, openMenu2, openMenu3 } = useSelector(
    (state) => state.profileOperation
  );
  const dispatch = useDispatch();
  const handleBtnClick = () => {
    dispatch(setOpenMenu(!openMenu));
    dispatch(setOpenMenu1(false));
    dispatch(setOpenMenu2(false));
    dispatch(setOpenMenu3(false));
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };

  const handleBtnClick1 = () => {
    dispatch(setOpenMenu1(!openMenu1));
    dispatch(setOpenMenu2(false));
    dispatch(setOpenMenu3(false));
    dispatch(setOpenMenu(false));
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    dispatch(setOpenMenu2(!openMenu2));
    dispatch(setOpenMenu3(false));
    dispatch(setOpenMenu(false));
    dispatch(setOpenMenu1(false));
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick3 = () => {
    dispatch(setOpenMenu3(!openMenu3));
    dispatch(setOpenMenu(false));
    dispatch(setOpenMenu1(false));
    dispatch(setOpenMenu2(false));
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };

  return {
    handleBtnClick,
    handleBtnClick1,
    handleBtnClick2,
    handleBtnClick3,
  };
};
