import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnNew from "../components/ColumnNew";
import { createGlobalStyle } from "styled-components";
import { dummyData } from "../components/constants/dummy";
import { setUserNfts } from "../store/slicers/userNfts";
import { hexToDecimalString } from "../utils/number";
import { ownerTokens } from "../utils/apiRequest/readEvent";
import { GetTokenURI } from "../hooks";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Profile = ({}) => {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const { dispatch } = useDispatch();
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  useEffect(async () => {
    const { getTokenURI } = GetTokenURI();
    const events = await ownerTokens();

    var arr = [];
    for (let index = 0; index < events.length; index++) {
      var metadata = await getTokenURI(
        events[index].contract_address,
        hexToDecimalString(events[index].token_id)
      );
      arr.push(metadata);
    }
    dispatch(setUserNfts(arr));
  }, []);

  return (
    <div>
      <GlobalStyles />
      <section>
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img
                    src={dummyData[0].avatar}
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                  />

                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      {dummyData[0].username}
                      <span className="profile_username">
                        {dummyData[0].name}
                      </span>
                      <span id="wallet" className="profile_wallet">
                        {dummyData[0].wallet}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">1 followers</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">Follow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>NFTs</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="zero1" className="onStep fadeIn">
          {/* <ColumnNew shuffle showLoadMore={false} authorId={dummyData.id} /> */}
          <ColumnNew />
        </div>
      </section>
    </div>
  );
};
export default Profile;
