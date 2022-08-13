import React from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { hash, number, starknet } from "starknet";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
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
      color: #fff !important;
    }
  }
`;

const Test = () => {
  const { walletAddress,account } = useSelector((state) => state.wallet);


  const requestFaucet = async () => {
    console.log(account.account.signer)
    const NETWORK_NAME = "SN_GOERLI"
    let longTitle = "This is a very, very, very, very, very, very long title.";
  let hashedMsg = number.toHex(hash.starknetKeccak(longTitle));
  console.log(hashedMsg);
  let signableMessage = {
    domain: {
      name: "Almanac",
      chainId: (NETWORK_NAME == 'mainnet-alpha') ? "SN_MAIN" : "SN_GOERLI",
      version: "0.0.1",
    },
    types: {
      StarkNetDomain: [
        { name: "name", type: "felt" },
        { name: "chainId", type: "felt" },
        { name: "version", type: "felt" },
      ],
      Message: [{ name: "msg", type: "felt" }],
    },
      primaryType: "Message",
      message: {
        msg: hashedMsg
      }
    };
    let signature = await account.account.signMessage(signableMessage);
    console.log(signature);
    // const keyPair = account.account.signer.signTransaction(tut)


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
                <div className="row" id="form_sb" >
                  <p className="mt-0">Address</p>
                  <Toaster position="bottom-center"
                  reverseOrder={true} />
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
    </div>
  );
};
export default Test;
