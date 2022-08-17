import React, {  useState,useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./clock";
import { carouselNew } from "./constants";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNewRedux = (props) => {
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };


  
  return (
    <div className="nft">
      <Slider {...carouselNew}>
        {
         props.swapData.getOpenTrades &&
         props.swapData.getOpenTrades.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                  {/* {nft.deadline && (
                    <div className="de_countdown">
                      <Clock deadline={nft.deadline} />
                    </div>
                  )} */}
                  <div className="author_list_pp">
                    <span onClick={() => window.open("/home1", "_self")}>
                      {nft.image && (
                        <img className="lazy" src={nft.assetInfo.image} alt="" />
                      )}
                    </span>
                  </div>
                  <div
                    className="nft__item_wrap"
                    style={{ height: `${height}px` }}
                  >
                    <Outer>
                      <span>
                        <img
                          src={nft.assetInfo.image}
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                    <div className="swap-icon">
                      <i className="fa fa-exchange"></i>
                    </div>
                    <Outer>
                      <span>
                        <img
                          src={nft.targetAssetInfo.length > 0 ? nft.targetAssetInfo[0].image:null }
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <span onClick={() => window.open("/#", "_self")}>
                      <h4>{nft.assetInfo.name}</h4>
                    </span>
                    <div className="nft__item_price">
                      {nft.price} ETH
                    </div>
                    {/* <div className="nft__item_action">
                      <span onClick={() => window.open(nft.bid_link, "_self")}>
                        Place a bid
                      </span>
                    </div>
                 */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default CarouselNewRedux;
