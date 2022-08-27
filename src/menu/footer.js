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
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <img
                    alt=""
                    className="f-logo d-3"
                    src="./img/logo-2-light.png"
                  />
                  <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                  <span className="copy">
                    &copy; Copyright 2021 - Gigaland by Designesia
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa-lg">
                      <FontAwesomeIcon icon={faTwitter} />
                    </i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa-lg">
                      <FontAwesomeIcon icon={faDiscord} />
                    </i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa-lg">
                      <FontAwesomeIcon icon={faMediumM} />
                    </i>
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
