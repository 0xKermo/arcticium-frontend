import { useQuery } from "@apollo/client";
import React, { Component } from "react";
import styled from "styled-components";
import Clock from "./clock";
import { Link } from "react-router-dom";
import NftCard from "./nftCard";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfts: this.props.data,
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    console.log("nfts", this.state.nfts);
  }

  loadMore = () => {
    let nftState = this.state.nfts;
    let start = nftState.length;
    let end = nftState.length + 4;
    // this.setState({
    //   nfts: [...nftState, ...this.dummyData.slice(start, end)],
    // });
  };

  onImgLoad({ target: img }) {
    let currentHeight = this.state.height;
    if (currentHeight < img.offsetHeight) {
      this.setState({
        height: img.offsetHeight,
      });
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.nfts != undefined
          ? this.state.nfts.map((nft, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              >
                <Link
                  to={`/asset/${nft.assetInfo.contract_address}/${nft.assetInfo.token_id}`}
                >
                  <div className="nft_popular_item m-0">
                    <div className="nft__item_wrap">
                      <div className="col-md-5">
                        <Outer>
                          <span>
                            <img
                              onLoad={this.onImgLoad}
                              src={nft.assetInfo.image}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </span>
                        </Outer>
                      </div>
                      <div className="col-md-2">
                        <div className="swap-icon">
                          <i className="fa fa-exchange"></i>
                        </div>
                      </div>
                      <div className="col-md-5">
                        {nft.targetTokenId && (
                          <Outer>
                            <span>
                              <img
                                onLoad={this.onImgLoad}
                                src={nft.targetAssetInfo[0].image}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            </span>
                          </Outer>
                        )}
                        {nft.targetTokenContract && !nft.targetTokenId && (
                          <div>{nft.targetTokenContract.slice(0, 3)}</div>
                        )}
                        {nft.targetTokenContract == null &&
                          nft.targetTokenId == 0 && <div>Make Offer</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="nft__item_info"
                          style={{ padding: "10px" }}
                        >
                          <span>
                            <h4>{nft.assetInfo.name}</h4>
                          </span>
                          <b>
                            <h4>{nft.assetInfo.contract_address}</h4>
                          </b>
                          <div className="nft__item_price">
                          <span>

                            </span>
                          </div>
                          <div className="nft__item_action">
                            <span>Make offer</span>
                          </div>
                        </div>
                      </div>
                      {nft.targetTokenContract && nft.targetTokenId &&
                      
                      <div className="col-md-6">
                        <div
                          className="nft__item_info"
                          style={{ padding: "10px" }}
                        >
                          <span>
                            <h4>{nft.targetAssetInfo[0].name}</h4>
                          </span>
                          <span>
                            <h4>{nft.targetAssetInfo[0].contract_address}</h4>
                          </span>
                          <div className="nft__item_price">
                            <span>
                              {nft.price ? "+ "+ nft.price:null}

                            </span>
                            {/* <span>{nft.bid}</span> */}
                          </div>
                          <div className="nft__item_action">
                            <span>Make offer</span>
                          </div>
                        </div>
                      </div>
                      }
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : null}
      </div>
    );
  }
}
