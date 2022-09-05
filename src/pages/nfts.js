import React, { useEffect } from "react";
import ExplorerColumnSwap from "../components/explorerColumnSwap";
import { createGlobalStyle } from "styled-components";
import TopFilterBar from "../components/topFilterBar";
import { useQuery } from "@apollo/client";
import { GetOpenTrades } from "../grqphql/query";
import { useDispatch, useSelector } from "react-redux";
import { setOpenTrades } from "../store/slicers/openTradesData";
import { setTradesLoader } from "../store/slicers/loader";

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
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }
`;

const Nfts = () => {
  const { loading, error, data } = useQuery(GetOpenTrades);
  const { tradesLoader } = useSelector((state) => state.loader);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading) {
      dispatch(setOpenTrades(data.getOpenTrades));
      setTimeout(() => {
        dispatch(setTradesLoader(false));
      }, 100);
    }
  }, [loading]);

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Nft's</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            {!tradesLoader && <TopFilterBar data={data.getOpenTrades} />}
          </div>
        </div>
        {!tradesLoader && <ExplorerColumnSwap />}
      </section>
    </div>
  );
};
export default Nfts;
