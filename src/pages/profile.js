import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ColumnMyNfts from "../components/columnMyNfts";
import ColumnSwap from "../components/profileColumnSwap";
import Activity from "../components/profileActvity";
import Favorites from "../components/profileColumnFavorites";
import { createGlobalStyle } from "styled-components";
import { dummyData } from "../components/constants/dummy";
import { setUserNfts } from "../store/slicers/userNfts";
import { ProfileActions } from "../hooks";
import { useQuery } from "@apollo/client";
import { tokensURI } from "../grqphql/query";
import ColumnMyNfts from "../components/profileColumnMyNftsCopy";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
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

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="padding_zero d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-8">
            <div className="d_profile de-flex left">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src="./img/author_single/author_thumbnail.jpg" alt="" />
                  <div className="profile_name">
                    <h4>
                      Monica Lucas
                      <span className="profile_username">@monicaaa</span>
                      <span id="wallet" className="profile_wallet">
                        DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        copy
                      </button>
                    </h4>
                    <h4>Servet-i Fünun döneminde ön plana çıkan diğer isimler ise Mehmet Rauf ile Hüseyin Cahit Yalçın’dır.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="d_profile de-flex right">
              <div className="de-flex-col">
                <div className="collection-social-icons">
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-linkedin fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-pinterest fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-rss fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
            </div>
        </div>
      </section>

      <section className="padding_zero">
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
