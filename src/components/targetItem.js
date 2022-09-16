import React, { Component } from "react";
import { GetCollectionName } from "../hooks";
import { walletAddressSlice } from "../utils/walletAddressSlice";

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetItemData: this.props.targetItemData,
      targetItemvoyagerLink: `https://beta-goerli.voyager.online/contract/${this.props.targetItemData.contract_address}`,
      collectionName: this.props.targetItemData.contract_address,
    };
    console.log(this.state.targetItemData);
  }

  attr = (_attributes) =>
    _attributes != null
      ? _attributes.map((item, index) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
              <div className="nft_attr">
                <h5>{item.trait_type}</h5>
                <h4>{item.value}</h4>
              </div>
            </div>
          );
        })
      : null;

  render() {
    return (
      <div className="col-md-5 text-center">
        <div className="nft_detail_item m-0" style={{ padding: "0px" }}>
          <div className="nft__item_offer">
            <span>
              <img
                id="targetNft"
                className="lazy nft__item_preview"
                alt=""
                src={this.state.targetItemData.image}
              />
            </span>
          </div>
        </div>
        <div className="spacer-40">
          {this.props.price > 0 && (
            <h3
              style={{
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              + {this.props.price} ETH{" "}
            </h3>
          )}
        </div>
        <div className="item_info">
          <div className="de_tab">
            <div className="tab-1 onStep fadeIn">
              <div className="p_list">
                <div className="p_detail_header">
                  <span>
                    <h2>{this.state.targetItemData.name}</h2>
                  </span>
                </div>
              </div>

              <div className="p_list" style={{ display: "flex" }}>
                <div className="col-md-6">
                  <div
                    className="p_detail"
                    onClick={() =>
                      window.open(
                        `/${this.state.targetItemData.assetOwner}`,
                        "_blank"
                      )
                    }
                  >
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <span>
                          <img
                            className="lazy"
                            src="../../img/author/author.svg"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>
                          {walletAddressSlice(
                            this.state.targetItemData.assetOwner,
                            5,
                            3
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="p_detail"
                    onClick={() =>
                      window.open(
                        `/collection/${this.state.targetItemData.contract_address}`,
                        "_blank"
                      )
                    }
                  >
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <span>
                          <img
                            className="lazy"
                            src={
                              "/" +
                              this.props.collections.filter(
                                (x) =>
                                  x.collectionAddress ==
                                  this.state.targetItemData.contract_address
                              )[0]
                                ? "/" +
                                  this.props.collections.filter(
                                    (x) =>
                                      x.collectionAddress ==
                                      this.state.targetItemData.contract_address
                                  )[0].profileImgPath
                                : "../../img/author/author.svg"
                            }
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>
                          {this.props.collections.filter(
                            (x) =>
                              x.collectionAddress ==
                              this.state.targetItemData.contract_address
                          )[0]
                            ? this.props.collections.filter(
                                (x) =>
                                  x.collectionAddress ==
                                  this.state.targetItemData.contract_address
                              )[0].collectionName
                            : walletAddressSlice(
                                this.state.targetItemData.contract_address,
                                5,
                                3
                              )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>
              <div className="item_info">
                <div className="de_tab">
                  <div className="tab-1 onStep fadeIn">
                    <div className="p_list">
                      <div className="p_detail_header">
                        <span>
                          <h4>Descripton</h4>
                        </span>
                      </div>
                    </div>

                    <div className="p_list">
                      <div className="p_detail">
                        <span>{this.state.targetItemData.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>

              <div className="de_tab">
                <div className="tab-1 onStep fadeIn">
                  <div className="p_list">
                    <div className="p_detail_header">
                      <span>
                        <h4>Details</h4>
                      </span>
                    </div>
                  </div>

                  <div className="p_list">
                    <div className="p_detail">
                      <span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={this.state.targetItemvoyagerLink}
                        >
                          <b>Voyager Link</b>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>

              <div className="de_tab">
                <div className="tab-1 onStep fadeIn">
                  <div className="p_list">
                    <div className="p_detail_header">
                      <span>
                        <h4>Attributes</h4>
                      </span>
                    </div>
                  </div>
                  <div className="row mt-5">
                    {this.attr(
                      this.state.targetItemData.attributes === null
                        ? null
                        : this.state.targetItemData.attributes
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
