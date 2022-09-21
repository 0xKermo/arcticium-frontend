import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Toaster } from "react-hot-toast";
import { hash,number,Contract }  from "starknet"
import { ARGENT_ACCOUNT } from "../utils/ACCOUNT_ABİ";
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
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }

  .method_active{
    background: #8364e2!important;
    color: #fff;
  }
  .p_detail_header{
    font-weight: 400;
    padding-left: 5%;
    text-align: left;
    border-bottom: 1px solid #8364e2;

  }
  .p_detail{
    font-weight: 400;
    padding-left: 5%;
    text-align: left;
      
    }
  }
`;


const Swap = function () {

  const { walletAddress,account } = useSelector((state) => state.wallet);

  const signMessages = async() =>{
    let longTitle = "Edit Profile";
    let hashedMsg = number.toHex(hash.starknetKeccak(longTitle));
    console.log(hashedMsg);
    let signableMessage = {
      domain: {
        name: "Arcticium",
        chainId:  "SN_GOERLI",
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
      console.log(account)
      let signature = await account.account.signMessage(signableMessage);
      console.log("signature",signature);
      let hashedMessage = await account.account.hashMessage(signableMessage);
      console.log("hashhedmessage",hashedMessage );
      let argentAccount = new Contract(ARGENT_ACCOUNT,walletAddress,account.provicer )
      try {
          let response = await argentAccount.is_valid_signature(hashedMessage, signature);
          
      } catch (err) {
          console.log(err)
      }

  }


  return (
    <div>
      <GlobalStyles />
      <Toaster position="bottom-center" reverseOrder={true} />
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
  
          <div className="col-md-2">
            <div className="p_list">
              <div className="p_detail">
                <div
                  className="swap-icon"
                  style={{
                    fontSize: "50px",
                    textAlign: "center",
                    marginTop: "150px",
                  }}
                >
                  <i className="fa fa-exchange"></i>
                </div>
                  <div
                    className="swap-icon"
                    style={{ textAlign: "center", marginTop: "140px" }}
                  >
                    <span onClick={signMessages} className="btn-main inline lead">
                      Buy now
                    </span>
                  </div>
                
              </div>
            </div>
          </div>
  
        </div>
      </section>
    </div>
  );
};
export default Swap;
