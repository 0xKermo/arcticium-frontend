import React, { Component } from "react";
import styled from "styled-components";
import Clock from "./clock";

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
      metadata: this.props.meta,
      voyagerLink: this.props.voyagerLink,
      collectionName : this.props.collectionName,
      attr: this.props.attr
    };
    console.log("target",this.state.metadata)


}



  render() {
    return (
    
        <div className="col-md-4 text-center">
        <img
          src={this.state.metadata.image}
          className="img-fluid img-rounded mb-sm-30"
          alt=""
        />
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
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <span>
                          <img
                            className="lazy"
                            src={this.state.metadata.image}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
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
                            src={this.state.metadata.image}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span>{this.state.collectionName}</span>
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
