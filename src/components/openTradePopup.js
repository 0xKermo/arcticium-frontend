import { useDispatch, useSelector } from "react-redux";
import {
  ItemDetailAction,
  ListItemData,
  TargetNftOperation,
} from "../controller";
import {
  setOpenCheckout,
  setListType,
  setChoosenCurrency,
  setCurrencyAmount,
} from "../store/slicers/itemDetailOperations";
import Select from "react-select";
import { useState } from "react";
import { setTargetMetadata } from "../store/slicers/targetNftMetadata";
import { GetTokenURI } from "../hooks";
import TargetItemLoader from "./loader/targetItemPopupLoader";
import { useLazyQuery } from "@apollo/client";
import { getAsset } from "../grqphql/query";


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

const OpenTradePopup = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [targetNftUrl, setTargetNftUrl] = useState("");
  const [targetNftLoader, setTargetNftLoader] = useState(0);
  const [_getAsset, {loading,data}] = useLazyQuery(getAsset)
  const { getTokenURI } = GetTokenURI();
  const { listItemData} = ListItemData()
  const dispatch = useDispatch();
  const { listType, targetNftLink, targetCollectionAddress } = useSelector(
    (state) => state.itemDetailOperation
  );
  const { currencyInfo } = useSelector((state) => state.currency);

  const { collections } = useSelector((state) => state.collections);
  const { anyBtn, collectionBtn, nftBtn } = ItemDetailAction();

  const listItemBtn = async () => {
  
    listItemData(props.contract, props.id);
  };
  
  const {
    targetNftOnchange,
    targetCollectionOnchange,
    currencyAmountOnchange,
    currencyTypeOnchange
  } = TargetNftOperation();

  const targetNftOnfocus = async (e) => {
    setTargetNftUrl("");
    setTargetNftLoader(1);
    _getAsset({
      variables:{
        contract_address:targetCollectionAddress,
        token_id:e.target.value
      }
    })
    console.log(data)
    const targetMetadata = await getTokenURI(
      targetCollectionAddress,
      e.target.value
    );
    setTargetNftLoader(2)
    dispatch(setTargetMetadata(props.metadata));
    const _targetNftLink =
      "http://localhost:3000/" + targetCollectionAddress + "/" + e.target.value;
      console.log("targetMetadata",targetMetadata)
    document.getElementById("targetNft").src = targetMetadata.image;
    document.getElementById("targetNftsrc").src = _targetNftLink;
    setTargetNftUrl(targetMetadata.image);
  };
  
  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
    dispatch(setChoosenCurrency(null));
    dispatch(setCurrencyAmount(0));
  };
  return (
    <div className="checkout">
      <div className="maincheckout">
        <button
          className="btn-close"
          onClick={() => {
            dispatch(setOpenCheckout(false));
            dispatch(setListType(0));
          }}
        >
          x
        </button>
        <div className="heading">
          <h3>{props.metadata.name}</h3>
        </div>
        <div className="detailcheckout mt-4">
          <div className="listcheckout">
            <ul className="activity-filter">
              <li
                id="any"
                onClick={anyBtn}
                className="filter_by_sales method_active"
              >
                Any
              </li>
              <li
                id="collection"
                onClick={collectionBtn}
                className="filter_by_likes"
              >
                Collection
              </li>
              <li id="nft" onClick={nftBtn} className="filter_by_offers">
                Nft
              </li>
            </ul>
            <div className="spacer-40"></div>
            {listType === 1 && (
              <div className="items_filter centerEl">
                <div className="dropdownSelect one" style={{ width: "100%" }}>
                  <h5>Target Collection</h5>
                  <Select
                    id="targetCollection1"
                    className="select1"
                    styles={customStyles}
                    menuContainerStyle={{ zIndex: 999 }}
                    options={collections}
                    onChange={targetCollectionOnchange}
                  />
                </div>
              </div>
            )}
            {listType === 2 && (
              <div className="items_filter centerEl">
                <div className="dropdownSelect one" style={{ width: "100%" }}>
                  <h5>Target Collection</h5>
                  <Select
                    className="select1"
                    onChange={targetCollectionOnchange}
                    id="targetCollection2"
                    styles={customStyles}
                    menuContainerStyle={{ zIndex: 999 }}
                    options={collections}
                    formatOptionLabel={
                      <div>
                        <img
                          className="lazy"
                          src="https://gateway.pinata.cloud/ipfs/bafkreie5y6v5g2jwwcatnpbe5ilqd3vywtxvfanb2mqwkkddphudo6bdhe"
                          alt=""
                        >
                          {" "}
                        </img>{" "}
                      </div>
                    }
                  />
                </div>
                <div className="spacer-20"></div>

                <div className="dropdownSelect two" style={{ width: "100%" }}>
                  <h5>Target nft id</h5>
                  <input
                    type="text"
                    name="targetNft"
                    id="targetNft"
                    className="form-control"
                    placeholder="Type NFT id"
                    onChange={targetNftOnchange}
                    onBlur={targetNftOnfocus}
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
                    {isActive ? (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockHide}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockClick}
                      ></label>
                    )}
                  </div>
                  <div className="clearfix"></div>

                  {isActive ? (
                    <div id="unlockCtn" className="hide-content">
                      <Select
                        className="select1"
                        styles={customStyles}
                        onChange={currencyTypeOnchange}
                        menuContainerStyle={{ zIndex: 999 }}
                        defaultValue={currencyInfo[0]}
                        options={currencyInfo.currencyInfo}
                      />
                      <input
                        type="number"
                        onChange={currencyAmountOnchange}
                        name="currencyAmount"
                        id="currencyAmount"
                        className="form-control"
                        placeholder="Currency Amount"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
        {listType === 0 && (
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
        )}
        {listType === 1 && (
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
        )}

        {listType === 2 && (
          <div className="nft__item m-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              id="targetNftsrc"
              href={targetNftLink}
            >
              <div className="nft_target_item">
                {targetNftLoader == 1 &&
                <TargetItemLoader />
                }
                {targetNftLoader ==2 &&
                
                  <img
                    src={targetNftUrl}
                    id="targetNft"
                    className="lazy nft__item_preview"
                    alt=""
                    style={{ width: "auto", height: "400px", padding: "0" }}
                  />
                }
              </div>

              <div className="heading mt-3">
                <p>Click on see NFT</p>
              </div>
            </a>
          </div>
        )}

        <button onClick={listItemBtn} className="btn-main lead mb-5">
          List item
        </button>
      </div>
    </div>
  );
};
export default OpenTradePopup;
