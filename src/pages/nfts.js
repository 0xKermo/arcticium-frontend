import React, { useEffect, useState } from "react";
import ExplorerColumnSwap from "../components/explorerColumnSwap";
import { createGlobalStyle } from "styled-components";
import TopFilterBar from "../components/topFilterBar";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetOpenTrades } from "../grqphql/query";
import { useDispatch, useSelector } from "react-redux";
import { openTrades, setOpenTrades, setOpenTradesNonFilter } from "../store/slicers/openTradesData";
import { setTradesLoader } from "../store/slicers/loader";
import SliderMainZero from "../components/SliderMainZero";
import ProfileNftsLoader from "../components/loader/profileNfts";

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

const Nfts = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);
  const { _openTrades } = useSelector((state) => state.openTrades);

  const { loading, error,data } = useQuery(GetOpenTrades,{
    variables: {
      offset: offset,
      limit: limit,
    }});

  const [test, { loading2, data2 }] = useLazyQuery(GetOpenTrades);
  const { tradesLoader } = useSelector((state) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loading")
    if (!loading) {
      if(_openTrades){
        const newArray = [..._openTrades, ...data.getOpenTrades]
        dispatch(setOpenTrades(newArray));
        dispatch(setOpenTradesNonFilter(newArray))

      }else{
        dispatch(setOpenTrades(data.getOpenTrades));
        dispatch(setOpenTradesNonFilter(data.getOpenTrades))
      }
      setTimeout(() => {
        dispatch(setTradesLoader(false));
      }, 1000);
    }
  }, [loading]);


  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight
    ) {
      setOffset(offset+limit)
      setLimit(limit+limit)
      test({
        variables: {
          offset: offset+limit,
          limit: limit+limit,
        },
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    test({
      variables: {
        offset: offset,
        limit: limit,
      },
    });
  }, []);

  return (
    <div>
      <GlobalStyles />

      <section className="jumbotron no-bg bg-gray">
        <SliderMainZero text={"Nft's"} />
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            {!tradesLoader && <TopFilterBar />}
          </div>
        </div>
        {tradesLoader && <ProfileNftsLoader />}
        {!tradesLoader && <ExplorerColumnSwap />}
      </section>
    </div>
  );
};
export default Nfts;
