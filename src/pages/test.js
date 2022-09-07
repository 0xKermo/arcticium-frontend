import React from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Provider } from "starknet";
import { GetPixelTokenURI } from "../hooks/ERC721/pixelTokenUri";
import ContentLoader from "react-content-loader";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #000;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #000;
  }
  header#myHeader .dropdown-toggle::after{
    color: #000;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }
`;

const Test = () => {
  const { walletAddress } = useSelector((state) => state.wallet);

  const { getPixelTokenURI } = GetPixelTokenURI();

  const requestFaucet = async () => {
    const contract_address =
      "0x07ffe4bd0b457e10674a2842164b91fea646ed4027d3b606a0fcbf056a4c8827";
    const token_id = "1";
    getPixelTokenURI(contract_address, token_id);
  };
  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 text-center">
                <h1>Faucet</h1>

                <div className="spacer-20"></div>
                <div className="row" id="form_sb">
                  <p className="mt-0">Address</p>
                  <Toaster position="bottom-center" reverseOrder={true} />
                  <div className="col text-center">
                    <input
                      className="form-control"
                      id="address"
                      name="address"
                      type="text"
                      value={walletAddress}
                    />{" "}
                    <button id="btn-submit" onClick={requestFaucet}>
                      <i className="arrow_right"></i>
                    </button>
                  </div>
                </div>
                <div className="spacer-20"></div>
                <p className="mt-0">
                  This faucet can only be taken every 24 hours. Just for use in
                  Arcswap testnet only
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
};
export default Test;
