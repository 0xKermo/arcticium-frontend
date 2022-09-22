import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Activity from "../components/collectionActivity";
import ColumnSwap from "../components/explorerColumnSwap";
import { getCollection } from "../grqphql/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faTelegram,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenTrades,
  setOpenTradesNonFilter,
} from "../store/slicers/openTradesData";
import { setTradesLoader } from "../store/slicers/loader";
import ProfileNftsLoader from "../components/loader/profileNfts";
import TopFilterBar from "../components/topFilterBar";
import toast, { Toaster } from "react-hot-toast";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #000;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #000;
  }
  header#myHeader .dropdown-toggle::after{
    color: #000;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }
`;
const Collection = function () {
  const { contract } = useParams();
  const { tradesLoader } = useSelector((state) => state.loader);

  const { loading, error, data } = useQuery(getCollection, {
    variables: {
      collectionAddress: contract,
      offset: 0,
      limit: 12,
    },
  });
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);

  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  function copyToClipboard() {
    navigator.clipboard.writeText(contract).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      toast.success("Copied");
    });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      dispatch(setOpenTrades(data.getTradeWithContractAddress));
      dispatch(setOpenTradesNonFilter(data.getTradeWithContractAddress));
      setTimeout(() => {
        dispatch(setTradesLoader(false));
      }, 1000);
    }
  }, [loading]);

  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(/${
            !loading ? data.collection.bannerPath : null
          })`,
        }}
      >
        <div className="mainbreadcumb_profile"></div>
      </section>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-8">
            <div className="d_profile de-flex left">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img
                    src={!loading ? "/" + data.collection.profileImgPath : null}
                    alt=""
                  />
                  <div className="profile_name">
                    <h4>
                      {!loading ? data.collection.collectionName : null}
                      <span className="profile_username"></span>
                      <span id="wallet" className="profile_wallet">
                        {!loading ? data.collection.collectionAddress : null}
                      </span>
                      <button
                        id="btn_copy"
                        title="Copy Text"
                        onClick={copyToClipboard}
                      >
                        copy
                      </button>
                    </h4>
                    <span>{!loading ? data.collection.bio : null}</span>
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
                    <a
                      href="https://twitter.com/arcticiumm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-lg">
                        <FontAwesomeIcon icon={faTwitter} />
                      </i>
                    </a>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <a
                      href="https://twitter.com/arcticiumm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-lg">
                        <FontAwesomeIcon icon={faDiscord} />
                      </i>
                    </a>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <a
                      href="https://medium.com/@arcticium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-lg">
                        <FontAwesomeIcon icon={faTelegram} />
                      </i>
                    </a>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <a
                      href="https://medium.com/@arcticium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-lg">
                        <FontAwesomeIcon icon={faGlobe} />
                      </i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>NFT's</span>
                </li>
                {/* <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {tradesLoader && <ProfileNftsLoader />}
        <div className="col-lg-12">
          {!tradesLoader && (
            <TopFilterBar data={data.getTradeWithContractAddress} />
          )}
        </div>
        {openMenu && !tradesLoader && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnSwap data={data.getTradeWithContractAddress} />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <Activity />
          </div>
        )}
      </section>
    </div>
  );
};
export default Collection;
