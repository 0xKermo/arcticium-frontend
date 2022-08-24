import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnSwap from "../components/profileColumnSwap";
import Activity from "../components/profileActvity";
import { createGlobalStyle } from "styled-components";
import { ProfileActions } from "../controller";
import ColumnMyNfts from "../components/profileColumnMyNfts";
import { AddUserAsset } from "../grqphql";
import { useParams } from "react-router-dom";
import { updateUserProfile } from "../grqphql/mutation";
import { useMutation } from "@apollo/client";
import { BigNumber } from "ethers";
import ProfileNftsLoader from "../components/loader/profileNfts";
import { ToastPromise } from "../components/toast";

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

const Profile = () => {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { wallet } = useParams();
  const { userAssets } = useSelector((state) => state.userAssets);

  const { walletAddress } = useSelector((state) => state.wallet);
  const { openMenu, openMenu1, openMenu2 } = useSelector(
    (state) => state.profileOperation
  );
  const {  profileInfo } = useSelector((state) => state.userAssets);

  const { handleBtnClick, handleBtnClick1, handleBtnClick2 } =
    ProfileActions();
  const {  getUserAssets } = AddUserAsset();
  const openEditProfile = () => {
    setEditProfile(true);
  };

  const [updateProfile] = useMutation(updateUserProfile);

  const submitProfile = () => {
    const name = document.getElementById("username").value;
    const bio = document.getElementById("bio").value;

    const updatedProfile =updateProfile({
      variables: {
        walletAddress: wallet,
        name: name,
        bio: bio,
      },
    });
    const mintLoadingText = "Profile updating...";
    const successText = "Profile succesfully updated";

    ToastPromise(updatedProfile, mintLoadingText, successText);
    setEditProfile(false)
    console.log("ok",updatedProfile)
  };
  useEffect(() => {
    if (walletAddress != null) {
      // const userAssetsArgs = {
      //   assetOwner: wallet.toLowerCase(),
      // };
      // _addUserAsset(userAssetsArgs);
      getUserAssets(wallet.toLowerCase());
      setIsOwner(BigNumber.from(wallet).eq(walletAddress));
    }
  }, [walletAddress]);

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

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-8">
            <div className="d_profile de-flex left">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src="./img/author_single/author_thumbnail.jpg" alt="" />
                  <div className="profile_name">
                    <h4>
                      {profileInfo ? profileInfo.name : null}
                      <span className="profile_username"></span>
                      <span id="wallet" className="profile_wallet">
                        {wallet.slice(0, 6)}...{wallet.slice(-6)}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        copy
                      </button>
                    </h4>
                    <h4>{profileInfo ? profileInfo.bio : null}</h4>
                  </div>
                </div>
                {isOwner && (
                  <div
                    className="d_profile de-flex right"
                    style={{ cursor: "pointer" }}
                    onClick={openEditProfile}
                  >
                    <div className="de_countdown">
                      <span>Edit Profile</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="">
                  <span onClick={handleBtnClick}>My Nft's</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>On Swap</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>Activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {userAssets.length <1 &&
          <ProfileNftsLoader />
        }
        {openMenu && (
        
          <div id="zero2" className="onStep fadeIn">
            <ColumnMyNfts />
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

        {isEditProfile && (
          <div className="checkout">
            <div className="maincheckout">
              <button
                className="btn-close"
                onClick={() => {
                  setEditProfile(false);
                }}
              >
                x
              </button>
              <div className="heading">
                <h3>Edit Profile</h3>
              </div>
              <div className="detailcheckout mt-4">
                <div className="listcheckout">
                  <div className="spacer-40"></div>

                  <div className="items_filter centerEl">
                    <div
                      className="dropdownSelect two"
                      style={{ width: "100%" }}
                    >
                      <h5>Username</h5>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="username"
                        defaultValue={profileInfo ? profileInfo.name : null}
                      />
                    </div>
                    <div className="spacer-20"></div>
                    <div
                      className="dropdownSelect two"
                      style={{ width: "100%" }}
                    >
                      <h5>Bio</h5>
                      <textarea
                        type="text"
                        id="bio"
                        className="form-control"
                        placeholder="bio"
                        defaultValue={profileInfo ? profileInfo.bio : null}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                style={{ margin: "0", width: "30%" }}
                className="btn-main lead mb-2 right"
                onClick={submitProfile}
              >
                Save
              </button>
              <button
                style={{
                  margin: "0",
                  color: "rgb(131, 100, 226) !important",
                  backgroundColor: "#f0f0f0",
                  width: "30%",
                  marginRight: "10px",
                }}
                className="btn-cancel lead mb-2 right"
                onClick={() => {
                  setEditProfile(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
export default Profile;
