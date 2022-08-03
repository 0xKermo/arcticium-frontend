import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ColumnMyNfts from "../components/columnMyNfts";
import ColumnSwap from "../components/columnSwap";
import Activity from "../components/profileActvity";
import Favorites from "../components/favorites";
import { createGlobalStyle } from "styled-components";
import { dummyData } from "../components/constants/dummy";
import { setUserNfts } from "../store/slicers/userNfts";
import { ProfileActions } from "../hooks";
import { useQuery } from "@apollo/client";
import { tokensURI } from "../grqphql/query";
import ColumnMyNfts from "../components/columnMyNftsCopy";
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
  const dispatch = useDispatch();
  // const {loading,error,data} = useQuery(tokensURI)

  const { openMenu, openMenu1, openMenu2, openMenu3 } = useSelector(
    (state) => state.profileOperation
  );
  const { handleBtnClick, handleBtnClick1, handleBtnClick2, handleBtnClick3 } =
    ProfileActions();
  const { userNfts } = useSelector((state) => state.userNfts);

  // useEffect( () => {
  //   // const prepare = async () => {
  //   //   const { getTokenURI } = GetTokenURI();
  //   //   const events = await ownerTokens();
  
  //   //   var arr = [];
  //   //   for (let index = 0; index < events.length; index++) {
  //   //     var metadata = await getTokenURI(
  //   //       events[index].contract_address,
  //   //       hexToDecimalString(events[index].token_id)
  //   //     );
  //   //     arr.push(metadata);
        
  //   //   }
  //   // }
  //   // prepare()
  //   if(!loading){
  //     dispatch(setUserNfts(data.getTokensURI));

  //   }

  //   console.log("data",data)
    
  // }, [loading]);

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
                  <span className="btn-main">Edit Profile</span>
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
                  <span onClick={handleBtnClick}>My Nft's</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>On Swap</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>Activity</span>
                </li>
                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}>Favorites</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div id="zero1" className="onStep fadeIn">
          <ColumnNew shuffle showLoadMore={false} authorId={dummyData.id} />
        </div> */}
        {openMenu && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnMyNfts nfts={userNfts} />
          </div>
        )}

        {openMenu1 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnSwap />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <Activity />
          </div>
        )}
        {openMenu3 && (
          <div id="zero3" className="onStep fadeIn">
            <Favorites />
          </div>
        )}
      </section>
    </div>
  );
};
export default Profile;
