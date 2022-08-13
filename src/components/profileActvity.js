import React from "react";
import { useCallback } from "react";
import Select from "react-select";
import { activity } from "./constants/filters";
import { useDispatch } from "react-redux";

const Activity = function () {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openMenu4, setOpenMenu4] = React.useState(false);
  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick1 = (): void => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.add("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick2 = (): void => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.add("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick3 = (): void => {
    setOpenMenu3(!openMenu3);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.add("active");
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#fff",
      color: "#333",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#eee",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  const dispatch = useDispatch();
  const handleCategory = useCallback(
    (option) => {
      const { value } = option;
    },
    [dispatch]
  );

  const defaultValue = {
    value: null,
    label: "Select Filter",
  };

  return (
    <div>
      <div className="container">
        <span className="filter__l">Filter</span>
        <span className="filter__r" onClick={handleBtnClick}>
          Reset
        </span>
        <div className="spacer-half"></div>
        <div className="clearfix"></div>
        <div className="dropdownSelect one">
          <Select
            styles={customStyles}
            menuContainerStyle={{ zIndex: 999 }}
            options={[defaultValue, ...activity]}
            onChange={handleCategory}
          />
        </div>
        <div className="spacer-half"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {openMenu && (
            <ul className="activity-list">
              <li className="act_follow">
                <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                <div className="act_list_text">
                  <h4>Monica Lucas</h4>
                  started following <span className="color">Gayle Hicks</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_sale">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-2.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Deep Sea Phantasy</h4>1 edition purchased by{" "}
                  <span className="color">Stacy Long</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_follow">
                <img className="lazy" src="./img/author/author-2.jpg" alt="" />
                <div className="act_list_text">
                  <h4>Mamie Barnett</h4>
                  started following <span className="color">Claude Banks</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_sale">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-4.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Two Tigers</h4>1 edition purchased by{" "}
                  <span className="color">Jimmy Wright</span> for 0.02 ETH
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_like">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-7.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Cute Astronout</h4>
                  liked by <span className="color">Nicholas Daniels</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_offer">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-5.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Purple Planet</h4>
                  <span className="color">Franklin Greer</span> offered 0.002
                  ETH
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_like">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-6.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Cute Astronout</h4>
                  liked by <span className="color">Nicholas Daniels</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            </ul>
          )}

          {openMenu1 && (
            <ul className="activity-list">
              <li className="act_follow">
                <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                <div className="act_list_text">
                  <h4>Monica Lucas</h4>
                  started following <span className="color">Gayle Hicks</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_follow">
                <img className="lazy" src="./img/author/author-2.jpg" alt="" />
                <div className="act_list_text">
                  <h4>Mamie Barnett</h4>
                  started following <span className="color">Claude Banks</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            </ul>
          )}

          {openMenu2 && (
            <ul className="activity-list">
              <li className="act_sale">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-2.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Deep Sea Phantasy</h4>1 edition purchased by{" "}
                  <span className="color">Stacy Long</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_sale">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-4.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Two Tigers</h4>1 edition purchased by{" "}
                  <span className="color">Jimmy Wright</span> for 0.02 ETH
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            </ul>
          )}

          {openMenu3 && (
            <ul className="activity-list">
              <li className="act_like">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-7.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Cute Astronout</h4>
                  liked by <span className="color">Nicholas Daniels</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
              <li className="act_like">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-6.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Cute Astronout</h4>
                  liked by <span className="color">Nicholas Daniels</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            </ul>
          )}

          {openMenu4 && (
            <ul className="activity-list">
              <li className="act_offer">
                <img
                  className="lazy"
                  src="./img/items/thumbnail-5.jpg"
                  alt=""
                />
                <div className="act_list_text">
                  <h4>Purple Planet</h4>
                  <span className="color">Franklin Greer</span> offered 0.002
                  ETH
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
