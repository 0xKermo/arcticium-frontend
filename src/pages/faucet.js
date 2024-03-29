import React from "react";
import { createGlobalStyle } from "styled-components";
import { MintErc20 } from "../hooks";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ToastPromise } from "../components/toast";
import { Provider } from "starknet";
import EmptyPage from "../components/emptypage";
import SliderMainZero from "../components/SliderMainZero";

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
   .mainside{
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Faucet = () => {
  const { walletAddress } = useSelector((state) => state.wallet);

  const { mintErc20 } = MintErc20();
  const requestFaucet = async () => {
    const mintErc20Promise = mintErc20();
    const provider = new Provider();
    const tx = provider.waitForTransaction(mintErc20Promise.transaction_hash);
    const mintLoadingText = "Transaction pending...";
    const mintSuccessText = `Minted successfully Test arcEth,arcDAI and arcSTARK tokens`;
    ToastPromise(tx, mintLoadingText, mintSuccessText);
  };
  return (
    <div>
      <GlobalStyles />

      <section className="jumbotron no-bg bg-gray">
        <SliderMainZero text={"Faucet"} />
      </section>
      <section className="jumbotron no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 text-center">
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
                  You will receive ArcETH, ArcDAI and ArcSTARK.
                  <h6>
                    This faucet can only be taken every 24 hours. Just for use
                    in the Arcticium testnet.
                  </h6>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EmptyPage />
    </div>
  );
};
export default Faucet;
