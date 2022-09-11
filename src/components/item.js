import React, { Component } from "react";


export default class Responsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.props.meta,
      voyagerLink: this.props.voyagerLink,
      collectionName: this.props.collectionName,
      attr: this.props.attr,
    };
  }

  render() {
    return (
      <div className="col-md-4 text-center">
        <div
          className="nft_detail_item m-0"
          style={{ padding:"0px" }}
        >
          <div className="nft__item_offer">
            <span>
              <img
                id="targetNft"
                className="lazy nft__item_preview"
                alt=""
                src={this.state.metadata.image}
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
                    <h2>{this.state.metadata.name}</h2>
                  </span>
                </div>
              </div>

              <div className="p_list" style={{ display: "flex" }}>
                <div className="col-md-6">
                  <div className="p_detail">
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp" onClick={() => window.open(`/${this.state.metadata.ownerAddress}`, "_blank")}>
                        <span>
                          <img
                            className="lazy"
                            src={this.state.metadata.ownerPP}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>{this.props.ownerWallet}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p_detail">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp" onClick={() => window.open(`/collection/${this.state.metadata.collectionAddress}`, "_blank")}>
                        <span>
                          <img
                            className="lazy"
                            src={"/"+this.state.metadata.collectionPP}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>{this.state.metadata.collectionName}</span>
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
                        <span>{this.state.metadata.description}</span>
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
                          href={`https://beta-goerli.voyager.online/contract/${this.props.contract}`}
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
                  <div className="row mt-5">{this.state.attr}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
