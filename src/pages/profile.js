import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../components/notFound";
import { createGlobalStyle } from "styled-components";
import ColumnMyNfts from "../components/profileColumnMyNfts";
import { UserAsset } from "../grqphql";
import { useParams } from "react-router-dom";
import { updateUserProfile } from "../grqphql/mutation";
import { useMutation } from "@apollo/client";
import { BigNumber } from "ethers";
import ProfileNftsLoader from "../components/loader/profileNfts";
import { ToastPromise } from "../components/toast";
import { setUserAssets } from "../store/slicers/userAssets";

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

const Profile = () => {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { wallet } = useParams();
  const { userAssets, profileInfo, nonFilterUserAsset } = useSelector(
    (state) => state.userAssets
  );
  const { userAssetLoader } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state.wallet);
  const { openMenu } = useSelector((state) => state.profileOperation);

  const { getUserAssets } = UserAsset(
    BigNumber.from(wallet)._hex.toLowerCase()
  );
  const openEditProfile = () => {
    setEditProfile(true);
  };
  const [filterText, setFilterText] = useState(userAssets);

  const [updateProfile] = useMutation(updateUserProfile);

  const submitProfile = () => {
    const name = document.getElementById("username").value;
    const bio = document.getElementById("bio").value;

    const updatedProfile = updateProfile({
      variables: {
        walletAddress: BigNumber.from(wallet)._hex.toLowerCase(),
        name: name,
        bio: bio,
      },
    });
    const mintLoadingText = "Profile updating...";
    const successText = "Profile succesfully updated";

    ToastPromise(updatedProfile, mintLoadingText, successText);
    setEditProfile(false);
  };

  const filterNftTitles = (event) => {
    const value = event.target.value;
    const filteredData = nonFilterUserAsset.filter((item) =>
      item.name.toLowerCase().includes(value)
    );

    dispatch(setUserAssets(filteredData));
  };

  useEffect(() => {
    if (wallet) getUserAssets(BigNumber.from(wallet)._hex.toLowerCase());
  }, [wallet]);
  useEffect(() => {
    if (walletAddress) {
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
        <div className="mainbreadcumb_profile"></div>
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
                    <span>{profileInfo ? profileInfo.bio : null}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {isOwner && (
              <span
                className="btn-main-edit inline right"
                style={{ cursor: "pointer" }}
                onClick={openEditProfile}
              >
                Edit Profile
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <div className="left">
                  <li id="Mainbtn">
                    <span>Nft's</span>
                  </li>
                  <li id="Mainbtn1">
                    <span>Activity</span>
                  </li>
                  <li id="quick_search">
                    <div
                      className="row form-dark"
                      id="form_quick_search"
                      name="form_quick_search"
                    >
                      <div className="col">
                        <input
                          className="form-control"
                          id="name_1"
                          name="name_1"
                          placeholder="search item here..."
                          type="text"
                          onChange={filterNftTitles}
                        />
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {userAssetLoader && <ProfileNftsLoader />}
        {userAssets.length < 1 && !userAssetLoader && (
          <div style={{ textAlign: "center" }}>
            <NotFound text={"Sorry! There were no Nfts or Collection found."} />
          </div>
        )}
        {/* {!profileCreated && (
          <div style={{ textAlign: "center" }}>
            <ProfileCreating />
          </div>
        )} */}
        {openMenu && !userAssetLoader && userAssets.length > 0 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnMyNfts filter={filterText} />
          </div>
        )}
        {/* {openMenu1 && (
          <div id="zero3" className="onStep fadeIn">
            <Activity wallet={wallet} />
          </div>
        )} */}

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
              <div className="detailcheckout">
                <div className="listcheckout">
                  <div className="items_filter centerEl">
                    <div className="field-set">
                      <h5>Upload file</h5>
                      <div className="d-create-file">
                        <p id="file_name">
                          PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                        </p>

                        {/* <p>{fileName}</p> */}

                        <div className="browse">
                          <input
                            type="button"
                            id="get_file"
                            className="btn-main"
                            value="Browse"
                          />
                          <input
                            id="upload_file"
                            type="file"
                            multiple
                            // onChange={onChange}
                          />
                        </div>
                      </div>

                      <div className="spacer-single"></div>
                      <div className="row">
                        <div className="col-6">
                          <h5>Username</h5>
                          <input
                            type="text"
                            id="username"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />

                          <h5>Instagram Link</h5>
                          <input
                            type="text"
                            id="ınstagram"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />
                          <h5>Twitter Link</h5>
                          <input
                            type="text"
                            id="twitter"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />
                        </div>
                        <div className="col-6">
                          <h5>Discord Link</h5>
                          <input
                            type="text"
                            id="discord"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />
                          <h5>Telegram Link</h5>
                          <input
                            type="text"
                            id="telegram"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />
                          <h5>Website</h5>
                          <input
                            type="text"
                            id="website"
                            className="form-control"
                            defaultValue={profileInfo ? profileInfo.name : null}
                          />
                        </div>
                      </div>
                      <h5>Biografi</h5>
                      <textarea
                        type="text"
                        id="biografi"
                        className="form-control"
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
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
export default Profile;
