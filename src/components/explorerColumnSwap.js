import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import Clock from "./clock";
import { Link } from "react-router-dom";
import NftCard from "./nftCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { walletAddressSlice } from "../utils/walletAddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { urlCheck } from "../constants/consttant";
import NotFound from "./notFound";
import EmptyPage from "./emptypage";
import { GetOpenTrades } from "../grqphql/query";
import { setOpenTrades } from "../store/slicers/openTradesData";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ExplorerColumnSwap = (props) => {
  const { _openTrades } = useSelector((state) => state.openTrades);
  const [_getOpenTrades,{ loading, data }] = useLazyQuery(GetOpenTrades);


  
  return (
    <div className="row">
      {_openTrades != undefined && _openTrades.length > 0 &&
       _openTrades.map((nft, index) => (
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
                            src={nft.targetAssetInfo.length > 0 ?  nft.targetAssetInfo[0].image : null}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        )}
                      </span>
                    </Outer>
                    {!nft.targetTokenId && (
                      <div>
                        <Outer>
                          <span>
                            <img
                              src=""
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
                          <h6 style={{fontSize:"smaller",fontWeight:"100"}}> {walletAddressSlice(
                              nft.assetInfo.contract_address,
                              5,
                              3
                            )}</h6>
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
                              <h6 style={{fontSize:"smaller",fontWeight:"100"}}>
                                {walletAddressSlice(
                                  nft.targetAssetInfo[0].contract_address,
                                  5,
                                  3
                                )}
                              </h6>
                            </span>
                          </span>
                          <div className="nft__item_price">
                            <span>{nft.price ? "+ " + nft.price +" ETH": null}</span>

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
        }
        {
          _openTrades.length < 1 &&
          
          <div style={{textAlign:"center"}}>
            <NotFound text={"Sorry, No Nft found listed"} />

          </div>
        }
    </div>
  );
};
export default ExplorerColumnSwap;
