import { useDispatch, useSelector } from "react-redux";


const EditProfile = () => {




  return (
    <div className="checkout">
      <div className="maincheckout">
        <button
          className="btn-close"
          onClick={() => {
          }}
        >
          x
        </button>
        <div className="heading">
          <h3>Edit Profile</h3>
        </div>
        <div className="detailcheckout mt-4">
          <div className="listcheckout">
      
            <div className="spacer-40"></div>
     
    
              <div className="items_filter centerEl">


                <div className="dropdownSelect two" style={{ width: "100%" }}>
                  <h5>Target nft id</h5>
                  <input
                    type="text"
                    name="targetNft"
                    id="targetNft"
                    className="form-control"
                    placeholder="Type NFT id"
                  />
                </div>
                <div className="spacer-20"></div>
                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Currency
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock"
                      className="checkbox"
                    />
                  </div>
                  <div className="clearfix"></div>

                  
                    <div id="unlockCtn" className="hide-content">
              
                      <input
                        type="number"
                        name="currencyAmount"
                        id="currencyAmount"
                        className="form-control"
                        placeholder="Currency Amount"
                      />
                    </div>
                 
                </div>
              </div>
  
          </div>
        </div>
          <div>
            <div className="heading">
              <p>Service fee 0%</p>
              <div className="subtotal">0.00 ETH</div>
            </div>
            <div className="heading">
              <p>
                Anyone can offer <span className="bold">any nft</span>
              </p>
            </div>
          </div>
          <div>
            <div className="heading mt-3">
              <p>
                Anyone with{" "}
                <span className="bold">
                  any nft from the example collection{" "}
                </span>
                can make an offer
              </p>
            </div>
          </div>
              <button  className="btn-main lead mb-5">
          List item
        </button>
      </div>
    </div>
  );
};
export default EditProfile;
