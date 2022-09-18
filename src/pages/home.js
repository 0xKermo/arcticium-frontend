import React, { useEffect } from "react";
import Particle from "../components/particle";
import SliderMainParticle from "../components/sliderMainParticle";
import FeatureBox from "../components/featureBox";
import CarouselCollection from "../components/carouselCollection";
import CarouselSwap from "../components/carouselSwap";
import { createGlobalStyle } from "styled-components";

import { useQuery } from "@apollo/client";
import { GetOpenTrades } from "../grqphql/query";
import SliderMainZeroHome from "../components/SliderMainZeroHome";

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

const Home = () => {
  const { loading, error, data } = useQuery(GetOpenTrades);

  return (
    <div>
      <GlobalStyles />
      <section className="jumbotron no-bg bg-gray">
         <SliderMainZeroHome/>
      </section>


      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Create and sell your NFTs</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <FeatureBox />
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Popular Swap's</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        {!loading && <CarouselSwap swapData={data} />}
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <CarouselCollection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
