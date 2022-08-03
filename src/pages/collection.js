import React from "react";
import { createGlobalStyle } from "styled-components";
import Activity from "../components/collectionActivity";
import CollectionNfts from "../components/collectionNfts";

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
const Collection = function () {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = (): void => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

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

      <section className="left_item d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img src="./img/author/author-1.jpg" alt="" />
                  <i className="fa fa-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding_zero">
        <div className="row">
          <div className="col-md-8">
            <div className="item_filter_group">
              <h3>BaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlık</h3>
              <span>
                <h4>By Başlık</h4>
              </span>
              <h4>
                BaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlık
                BaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlık
                BaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlıkBaşlık
              </h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="de-flex right">
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
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>NFT's</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <CollectionNfts />
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
