import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselNew } from "./constants";
import { walletAddressSlice } from "../utils/walletAddressSlice";
import { currencyNames } from "../constants/CurrencyAddresses";

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
        {props.swapData.getOpenTrades &&
          props.swapData.getOpenTrades.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div
                className="d-item"
                onClick={() =>
                  window.open(
                    `/asset/${nft.tokenContract}/${nft.tokenId}`,
                    "_self"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="nft_popular_item">
                  <div className="author_list_pp">
                    <span>
                      {nft.image && (
                        <img
                          className="lazy"
                          src={nft.assetInfo.image}
                          alt=""
                        />
                      )}
                    </span>
                  </div>
                  <div className="nft__item_wrap">
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
                          src={
                            nft.targetAssetInfo.length > 0
                              ? nft.targetAssetInfo[0].image
                              : "./img/emptyImage.png"
                          }
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className="nft__item_info"
                        style={{ padding: "10px" }}
                      >
                        <span>
                          <h4>
                            {nft.assetInfo.name ? (
                              nft.assetInfo.name
                            ) : (
                              <br></br>
                            )}
                          </h4>
                          <b style={{ fontWeight: "10", fontSize: "smaller" }}>
                            {nft.assetInfo.contract_address.slice(0, 12) +
                              "..."}
                          </b>
                        </span>
                        <div className="nft__item_price">
                          <span></span>
                        </div>
                        <div className="nft__item_action">
                          <span>
                            <br></br>
                          </span>
                        </div>
                      </div>
                    </div>
                    {nft.targetAssetInfo.length > 0 && (
                      <div className="col-md-6">
                        <div
                          className="nft__item_info"
                          style={{ padding: "10px" }}
                        >
                          <span onClick={() => window.open("/#", "_self")}>
                            <h4>{nft.targetAssetInfo[0].name}</h4>
                            <b
                              style={{ fontWeight: "10", fontSize: "smaller" }}
                            >
                              {nft.targetAssetInfo[0].contract_address.slice(
                                0,
                                12
                              ) + "..."}
                            </b>
                          </span>
                          <div className="nft__item_price">
                            {nft.price ? (
                              <b>
                                + {nft.price}{" "}
                                {currencyNames[Number(nft.currencyType)]}
                              </b>
                            ) : (
                              <span></span>
                            )}
                          </div>
                          <div className="nft__item_action">
                            <span>Buy now</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {nft.targetAssetInfo.length < 1 && (
                      <div className="col-md-6">
                        <div
                          className="nft__item_info"
                          style={{ padding: "10px" }}
                        >
                          <span
                            onClick={() => window.open("/#", "_self")}
                          ></span>
                          <div className="nft__item_price">
                            <br></br>
                          </div>
                          <div className="nft__item_action">
                            <span>Make Offer</span>
                          </div>
                        </div>
                      </div>
                    )}
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
