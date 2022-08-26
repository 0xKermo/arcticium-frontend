import React, { Component } from "react";

export default class Responsive extends Component {
  dummyData = [
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-1.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-2.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-3.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-4.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-5.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
    {
      authorLink: "/collection",
      authorImg: "./img/author/author-6.jpg",
      previewImg: "./img/collections/coll-6.jpg",
      name: "Oh Yeah!",
      description: "ERC-61",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      nfts: this.dummyData.slice(0, 8),
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    this.state.collections = this.props.collections;
    console.log(this.state.collections);
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
        {this.state.collections.map((collection, index) => (
          <div
            key={index}
            className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
          >
            <div
              className="nft_coll m-0"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `collection/${collection.collectionAddress}`,
                  "_self"
                )
              }
            >
              <div className="nft_wrap">
                <span>
                  <img
                    src={collection.bannerPath}
                    className="lazy img-fluid"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft_coll_pp">
                <span>
                  <img
                    className="lazy"
                    src={collection.profileImgPath}
                    alt=""
                  />
                </span>
              </div>
              <div className="nft_coll_info">
                <span>
                  <h4>{collection.collectionName}</h4>
                </span>
              </div>
            </div>
          </div>
        ))}
        {this.state.collections.length !== this.dummyData.length && (
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
