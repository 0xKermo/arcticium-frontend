import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open("", "_self")}>
                  <span className="logo-font">arcswap</span>
                  {/* <img
                    alt=""
                    className="f-logo d-1"
                    src="/img/ArcticiumLogo01.png"
                  />
                  <img
                    alt=""
                    className="f-logo d-3"
                    src="/img/ArcticiumLogo01.png"
                  />
                  <img
                    alt=""
                    className="f-logo d-4"
                    src="/img/ArcticiumLogo03.png"
                  /> */}
                  <span className="copy">
                    &copy; Copyright 2021 - Gigaland by Designesia
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span>
                    <a
                      href="https://twitter.com/arcticiumm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg">
                        <FontAwesomeIcon icon={faTwitter} />
                      </i>
                    </a>
                  </span>
                  <span>
                    <a
                      href="https://twitter.com/arcticiumm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg">
                        <FontAwesomeIcon icon={faDiscord} />
                      </i>
                    </a>
                  </span>
                  <span>
                    <a
                      href="https://medium.com/@arcticium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg">
                        <FontAwesomeIcon icon={faMediumM} />
                      </i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
