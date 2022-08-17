import React, { Component } from "react";
import { GetCollectionName } from "../hooks";

export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetItemData: this.props.targetItemData,
      targetItemvoyagerLink: `https://beta-goerli.voyager.online/contract/${this.props.targetItemData.contract_address}`,
      collectionName : this.props.targetItemData.contract_address,
    };
}


attr = (_metadata) =>
_metadata.attributes != undefined
  ? _metadata.attributes.map((item, index) => {
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
    
        <div className="col-md-4 text-center">
            <div
              className="nft__item m-0"
              style={{ width: "auto", height: "400px" }}
            >
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
        <div className="spacer-40"></div>
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
                  <div className="p_detail">
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <span>
                          <img
                            className="lazy"
                            src={this.state.targetItemData.image}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>test</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p_detail">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <span>
                          <img
                            className="lazy"
                            src={this.state.targetItemData.image}
                            alt=""
                          />
                          
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>{this.state.collectionName.slice(0,6)}</span>
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
                          href={this.state.voyagerLink}
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
                  <div className="row mt-5">{this.attr(this.state.targetItemData.attributes)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
