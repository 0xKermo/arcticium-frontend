import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import Clock from "./clock";
import { Link } from "react-router-dom";
import NftCard from "./nftCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { walletAddressSlice } from "../utils/walletAddressSlice";
import { useSelector } from "react-redux";
import { urlCheck } from "../constants/consttant";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ExplorerColumnSwap = () => {
  const { _openTrades } = useSelector((state) => state.openTrades);

  useEffect(() => {
    console.log("sd", _openTrades);
  }, []);

  return (
    <div className="row">
      {_openTrades != undefined
        ? _openTrades.map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            >
              <Link
                to={`/asset/${nft.assetInfo.contract_address}/${nft.assetInfo.token_id}`}
              >
                <div className="nft_popular_item m-0">
                  <div className="nft__item_wrap">
                    <Outer>
                      <span>
                        <img
                          src={
                            nft.assetInfo.image
                              ? nft.assetInfo.image
                              : "/img/noimage.jpg"
                          }
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </span>
                    </Outer>
                    <div className="swap-icon">
                      <i className="fa fa-exchange"></i>
                    </div>
                    <Outer>
                      <span>
                        {nft.targetTokenContract && nft.targetTokenId && (
                          <img
                            src={nft.targetAssetInfo[0].image}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        )}
                      </span>
                    </Outer>
                    {nft.targetTokenContract && !nft.targetTokenId && (
                      <div>
                        <Outer>
                          <span>
                            <img
                              src="img/items/make-offer.png"
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </span>
                        </Outer>
                      </div>
                    )}
                    {!nft.targetTokenContract && !nft.targetTokenId && (
                      <div>
                        <Outer>
                          <span>
                            <img
                              src="img/items/make-offer.png"
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </span>
                        </Outer>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="nft__item_info">
                        <span>
                          <h4>{nft.assetInfo.name}</h4>
                        </span>
                        <span>
                          <h4>
                            {walletAddressSlice(
                              nft.assetInfo.contract_address,
                              5,
                              3
                            )}
                          </h4>
                        </span>
                        <div className="nft__item_price">
                          <span></span>

                          {/* <span>{nft.bid}</span> */}
                        </div>
                        <div className="nft__item_action">
                          <span>Make offer</span>
                        </div>
                      </div>
                    </div>
                    {nft.targetAssetInfo.length > 0 && (
                      <div className="col-md-6">
                        <div className="nft__item_info">
                          <span>
                            <h4>{nft.targetAssetInfo[0].name}</h4>
                            <span>
                              <h4>
                                {walletAddressSlice(
                                  nft.targetAssetInfo[0].contract_address,
                                  5,
                                  3
                                )}
                              </h4>
                            </span>
                          </span>
                          <div className="nft__item_price">
                            <span>{nft.price ? "+ " + nft.price : null}</span>

                            {/* <span>{nft.bid}</span> */}
                          </div>
                          <div className="nft__item_action">
                            <span>Make offer</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};
export default ExplorerColumnSwap;
