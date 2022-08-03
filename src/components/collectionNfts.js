import React from "react";
import ColumnNew from "../components/ColumnNew";
import { createGlobalStyle } from "styled-components";
import TopFilterBar from "../components/topFilterBar";
import LeftFilterBar from "../components/leftFilterBar";

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
const CollectionNfts = function () {
  return (
    <div>
      <GlobalStyles />
      <section className="padding_zero">
        <div className="row">
          <div className="col-md-2">
            <LeftFilterBar />
          </div>

          <div className="col-md-10">
            <TopFilterBar />
            <ColumnNew />
          </div>
        </div>
      </section>
    </div>
  );
};
export default CollectionNfts;
