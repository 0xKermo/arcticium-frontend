import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import { currencyAddresses } from "../constants/CurrencyAddresses";
import { BidActions } from "../controller";

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#727272",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#ddd",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#fff !important",
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
  }),
};
const SwapToAnyItem = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { _nfts } = useSelector((state) => state.userNfts);
  const {
    bidCollectionAddress,
    bidItemId,
    bidCurrencyType,
    bidCurrencyAmount,
  } = useSelector((state) => state.bid);
  const { walletAddress } = useSelector((state) => state.wallet);

  const {
    bidCollectionOnchange,
    bidNftOnchange,
    bidCurrencyTypeOnchange,
    bidCurrencyAmountOnchange,
    makeOffer,
  } = BidActions();

  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
  };

  const make_offer = () => {
    const bidData = {
      bidOwner: walletAddress,
      bidContractAddress: props.data.targetTokenContract == null? bidCollectionAddress : props.data.targetTokenContract,
      bidTokenId: bidItemId,
      bidCurrencyType: bidCurrencyType == null ? 0 : currencyAddresses[bidCurrencyType],
      bidPrice: parseFloat(bidCurrencyAmount),
      tradeId: props.data.tradeId,
      biddedItemOwner: props.data.tradeOwnerAddress,
      biddedItemContractAddress: props.data.tokenContract,
      biddedItemId: props.data.tokenId,
      status: "Open",
      bidTradeType: props.data.tradeType,
      expiration: 1665179996,
    };
    console.log("bidData", bidData);
    makeOffer(bidData);
  };

  return (
    <div className="col-md-4 text-center">
      <div className="item_info">
        <div className="de_tab">
          <div className="tab-1 onStep fadeIn">
            <div
              className="nft__item m-0"
              style={{ width: "auto", height: "400px" }}
            >
              <a target="_blank" rel="noopener noreferrer" id="targetNftsrc">
                <div className="nft__item_offer">
                  <span>
                    <img
                      id="biddedNft"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>

                <div className="heading mt-3">
                  <p>Click on see NFT</p>
                </div>
              </a>
            </div>
            <div className="spacer-40"></div>

            <div className="p_list" style={{ display: "flex" }}>
              <div className="items_filter centerEl ">
                <div className="dropdownSelect one" style={{ width: "100%" }}>
                  <h5>Collection</h5>
                   {props.data != null && props.data.targetTokenContract != null ? (
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={
                        props.collections.filter(
                          (x) =>
                            x.collectionAddress ==
                            props.data.targetTokenContract
                        )[0].collectionName
                      }
                    />
                  ):(   <Select
                    className="select1"
                    onChange={bidCollectionOnchange}
                    styles={customStyles}
                    menuContainerStyle={{ zIndex: 999 }}
                    options={props.collections.map((item, i) => {
                      return {
                        value: item.collectionAddress,
                        label: item.collectionName,
                      };
                    })}
                  />)}
                </div>
              </div>
            </div>
            <div className="p_list" style={{ display: "flex" }}>
              <div className="items_filter centerEl">
                <div className="dropdownSelect two" style={{ width: "100%" }}>
                  <h5>Nft</h5>
                  <Select
                    id="bidNft"
                    className="select1"
                    onChange={bidNftOnchange}
                    styles={customStyles}
                    menuContainerStyle={{ zIndex: 999 }}
                    // value={bidItemId}
                    options={_nfts}
                  />
                </div>
              </div>
            </div>

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
                {isActive ? (
                  <label htmlFor="switch-unlock" onClick={unlockHide}></label>
                ) : (
                  <label htmlFor="switch-unlock" onClick={unlockClick}></label>
                )}
              </div>
              <div className="clearfix"></div>

              {isActive ? (
                <div id="unlockCtn" className="hide-content">
                  <Select
                    className="select1"
                    styles={customStyles}
                    menuContainerStyle={{ zIndex: 999 }}
                    options={props.currency.map((item, i) => {
                      return {
                        value: item.currencyAddress,
                        label: item.currencyName,
                      };
                    })}
                    onChange={bidCurrencyTypeOnchange}
                  />
                  <div className="spacer-20"></div>

                  <input
                    type="number"
                    name="currencyAmount"
                    id="currencyAmount"
                    className="form-control"
                    placeholder="Currency Amount"
                    onChange={bidCurrencyAmountOnchange}
                  />
                </div>
              ) : null}
            </div>
            <div className="spacer-40"></div>

            <span onClick={make_offer} className="btn-main inline lead">
              Make Offer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SwapToAnyItem;
