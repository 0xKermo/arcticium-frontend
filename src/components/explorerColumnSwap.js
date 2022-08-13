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
  dummyData = [
    {
      deadline: "December, 30, 2021",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-1.jpg",
      previewImg: "./img/items/static-1.jpg",
      title: "Pinky Ocean",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-10.jpg",
      previewImg: "./img/items/static-2.jpg",
      title: "Deep Sea Phantasy",
      price: "0.06 ETH",
      bid: "1/22",
      likes: 80,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-11.jpg",
      previewImg: "./img/items/static-3.jpg",
      title: "Rainbow Style",
      price: "0.05 ETH",
      bid: "1/11",
      likes: 97,
    },
    {
      deadline: "January, 1, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-12.jpg",
      previewImg: "./img/items/static-4.jpg",
      title: "Two Tigers",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-9.jpg",
      previewImg: "./img/items/anim-4.webp",
      title: "The Truth",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 15, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-2.jpg",
      previewImg: "./img/items/anim-2.webp",
      title: "Running Puppets",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-3.jpg",
      previewImg: "./img/items/anim-1.webp",
      title: "USA Wordmation",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-4.jpg",
      previewImg: "./img/items/anim-5.webp",
      title: "Loop Donut",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 3, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-5.jpg",
      previewImg: "./img/items/anim-3.webp",
      title: "Lady Copter",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-7.jpg",
      previewImg: "./img/items/static-5.jpg",
      title: "Purple Planet",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/items/anim-6.webp",
      title: "Oh Yeah!",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 10, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-8.jpg",
      previewImg: "./img/items/anim-7.webp",
      title: "This is Our Story",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-9.jpg",
      previewImg: "./img/items/static-6.jpg",
      title: "Pixel World",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 10, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./img/author/author-12.jpg",
      previewImg: "./img/items/anim-8.webp",
      title: "I Believe I Can Fly",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      nfts: props.data.getOpenTrades,
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    console.log("nfts", this.state.nfts);
  }

  loadMore = () => {
    let nftState = this.state.nfts;
    let start = nftState.length;
    let end = nftState.length + 4;
    this.setState({
      nfts: [...nftState, ...this.dummyData.slice(start, end)],
    });
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
        {this.state.nfts.map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
          >
            <Link
              to={`/asset/${nft.assetInfo.contract_address}/${nft.assetInfo.token_id}/swap`}
            >
              <div className="nft__item m-0">
                <div className="nft__item_wrap" style={{ height: `225px` }}>
                  <div className="col-md-5">
                    <Outer>
                      <span>
                        <img
                          height={100}
                          width={100}
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
                    {nft.targetTokenContract != null && nft.targetTokenId != 0 && (
                      <Outer>
                        <span>
                          <img
                            height={100}
                            width={100}
                            onLoad={this.onImgLoad}
                            src={nft.targetAssetInfo[0].image}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </span>
                      </Outer>
                    )}
                    {nft.targetTokenContract != null &&
                      nft.targetTokenId == 0 && (
                        <div>{nft.targetTokenContract.slice(0, 3)}</div>
                      )}
                    {nft.targetTokenContract == null &&
                      nft.targetTokenId == 0 && <div>Make Offer</div>}
                  </div>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>{nft.assetInfo.name}</h4>
                  </span>
                  <div className="nft__item_price">
                    {nft.price}
                    {/* <span>{nft.bid}</span> */}
                  </div>
                  <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {this.state.nfts.length !== this.dummyData.length && (
          <div className="col-lg-12">
            <div className="spacer-single"></div>
            <span
              onClick={() => this.loadMore()}
              className="btn-main lead m-auto"
            >
              Load More
            </span>
          </div>
        )}
      </div>
    );
  }
}
