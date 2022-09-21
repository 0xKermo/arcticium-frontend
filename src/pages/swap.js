import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Toaster } from "react-hot-toast";
import { hash,number }  from "starknet"
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
      "types": {
        "StarkNetDomain": [
          { "name": "name", "type": "felt" },
          { "name": "version", "type": "felt" },
          { "name": "chainId", "type": "felt" }
        ],
        "Person": [
          { "name": "name", "type": "felt" },
          { "name": "wallet", "type": "felt" }
        ],
        "Mail": [
          { "name": "from", "type": "Person" },
          { "name": "to", "type": "Person" },
          { "name": "contents", "type": "felt" }
        ]
      },
      "primaryType": "Mail",
      "domain": {
        "name": "StarkNet Mail",
        "version": "1",
        "chainId": 1
      },
      "message": {
        "from": {
          "name": "Cow",
          "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
        },
        "to": {
          "name": "Bob",
          "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
        },
        "contents": "Hello, Bob!"
      }
    };
      console.log(account)
      let hashedMessage = await account.account.hashMessage(signableMessage);
      let signature = await account.account.signMessage(signableMessage);
      try {
          let response = await account.account.verifyMessage(signableMessage, signature);
          console.log("response",response)
      } catch (err) {
          console.log("error",err)
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
