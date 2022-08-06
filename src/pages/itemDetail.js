import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenURI, GetOwnerOf, GetCollectionName } from "../hooks";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { ListItemData } from "../controller/itemDetail/listItem";
import { GraphqlCollections, GraphqlCurrency } from "../grqphql";
import { ItemDetailAction } from "../controller/itemDetail/itemDetailAction";
import {
  setOpenCheckout,
  setOpenCheckoutBid,
  setChoosenCurrency,
  setVoyagerLink,
} from "../store/slicers/itemDetailOperations";
import { setMetadata } from "../store/slicers/metadata";
import { Toaster } from "react-hot-toast";
import { Target } from "../controller/itemDetail/target";
import { GetTradeWithAddresId } from "../grqphql/query";
import { useQuery } from "@apollo/client";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
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

const ItemDetail = function () {
  const dispatch = useDispatch();
  const [is_owner, setIsOwner] = useState(0);

  /**
   * Contract Start
   */
  const { getOwnerOf } = GetOwnerOf();
  /**
   * Contract End
   */

  /**
   *  Reducer start
   */
  const { metadata } = useSelector((state) => state.metadata);
  const { walletAddress } = useSelector((state) => state.wallet);
  const { currencyInfo } = useSelector((state) => state.currency);
  const {
    openMenu,
    openMenu1,
    openCheckout,
    openCheckoutbid,
    choosen,
    targetNftLink,
    voyagerLink,
  } = useSelector((state) => state.itemDetailOperation);
  const { collections, collectionloading, collectionError, collectionName } =
    useSelector((state) => state.collections);
  const { handleBtnClick, handleBtnClick1, anyBtn, collectionBtn, nftBtn } =
    ItemDetailAction();
  /**
   * Reducer End
   */
  const { contract, id } = useParams();
  const { listItemData } = ListItemData();

  const [isActive, setIsActive] = useState(false);
  /**
   * Graphql start
   */
  const { getTokenURI } = GetTokenURI();
  const { graphqlCollections } = GraphqlCollections();
  const { getCollectionName } = GetCollectionName();
  const { graphqlCurrency } = GraphqlCurrency();
  const { loading, error, data } = useQuery(GetTradeWithAddresId, {
    variables: {
      contractAddress: contract,
      tokenId: Number(id),
    },
  });

  /**
   * Graphql end
   */

  const {
    targetNftOnchange,
    targetCollectionOnchange,
    currencyAmountOnchange,
  } = Target();
  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
    dispatch(setChoosenCurrency(null));
  };

  const open_trade = () => {
    console.log("open trde");
    graphqlCollections();
    graphqlCurrency();
    dispatch(setOpenCheckout(true));
  };

  const listItemBtn = async () => {
    listItemData(contract, id,metadata);
    dispatch(setOpenCheckout(false));
  };
  useEffect(() => {
    console.log("tradeData", data);
  }, [loading]);

  useEffect(() => {
    const prepare = async () => {
      const res = await getOwnerOf(contract, id);
      if (walletAddress != null && res.result[0] === walletAddress) {
        setIsOwner(1);
      } else if (walletAddress != null) {
        setIsOwner(2);
      }
      await getCollectionName(contract);

      var _metadata = await getTokenURI(contract, id);
      if (_metadata.name != undefined) {
        dispatch(setMetadata(_metadata));
        console.log(metadata)
        dispatch(
          setVoyagerLink(
            `https://beta-goerli.voyager.online/contract/${_metadata.contract_address}`
          )
        );
      }
    };
    prepare();
  }, [walletAddress]);

  const attr =
    metadata.attributes != undefined
      ? metadata.attributes.map((item, index) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
              <div className="nft_attr">
                <h5>{item.trait_type}</h5>
                <h4>{item.value}</h4>
              </div>
            </div>
          );
        })
      : null;

  return (
    <div>
      <GlobalStyles />
      <Toaster position="bottom-center" reverseOrder={true} />
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-4 text-center">
            <img
              src={metadata.image}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
            <div className="spacer-40"></div>
            <div className="item_info">
              <div className="de_tab">
                <div className="tab-1 onStep fadeIn">
                  <div className="p_list">
                    <div className="p_detail_header">
                      <span>
                        <h4>Descripton</h4>
                      </span>
                    </div>
                  </div>

                  <div className="p_list">
                    <div className="p_detail">
                      <span>{metadata.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>

            <div className="de_tab">
              <div className="tab-1 onStep fadeIn">
                <div className="p_list">
                  <div className="p_detail_header">
                    <span>
                      <h4>Details</h4>
                    </span>
                  </div>
                </div>

                <div className="p_list">
                  <div className="p_detail">
                    <span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={voyagerLink}
                      >
                        <b>Voyager Link</b>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>

            <div className="de_tab">
              <div className="tab-1 onStep fadeIn">
                <div className="p_list">
                  <div className="p_detail_header">
                    <span>
                      <h4>Attributes</h4>
                    </span>
                  </div>
                </div>
                <div className="row mt-5">{attr}</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{metadata.name}</h2>
            </div>

            <div className="item_info">
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src={metadata.image} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="author_list_info">
                  <span>{collectionName}</span>
                </div>
              </div>
            </div>

            <div className="spacer-40"></div>
            <div className="item_info">
              <div className="de_countdown">
                <span onClick={open_trade} className="btn-main inline lead">
                  Open Trade
                </span>
              </div>
            </div>
            <div className="spacer-40"></div>

            <div className="item_info">
              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-3.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-4.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-5.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-1.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-3.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-4.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openCheckout && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => dispatch(setOpenCheckout(false))}
            >
              x
            </button>
            <div className="heading">
              <h3>{metadata.name}</h3>
            </div>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <ul class="activity-filter">
                  <li
                    id="any"
                    onClick={anyBtn}
                    class="filter_by_sales method_active"
                  >
                    Any
                  </li>
                  <li
                    id="collection"
                    onClick={collectionBtn}
                    class="filter_by_likes"
                  >
                    Collection
                  </li>
                  <li id="nft" onClick={nftBtn} class="filter_by_offers">
                    Nft
                  </li>
                </ul>
                <div className="spacer-40"></div>
                {choosen === 1 && (
                  <div className="items_filter centerEl">
                    <div className="dropdownSelect one">
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
                {choosen === 2 && (
                  <div className="items_filter centerEl">
                    <div className="dropdownSelect one">
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
                              class="lazy"
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

                    <div className="dropdownSelect two">
                      <h5>Target nft id</h5>
                      <input
                        type="text"
                        name="targetNft"
                        id="targetNft"
                        className="form-control"
                        placeholder="Type NFT id"
                        onChange={targetNftOnchange}
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
            {choosen === 0 && (
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
            {choosen === 1 && (
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

            {choosen === 2 && (
              <div className="nft__item m-0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={targetNftLink}
                >
                  <div className="nft__item_offer">
                    <span>
                      <img
                        src={metadata.image}
                        id="get_file_2"
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
            )}

            <button onClick={listItemBtn} className="btn-main lead mb-5">
              List item
            </button>
          </div>
        </div>
      )}
      {openCheckoutbid && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => dispatch(setOpenCheckoutBid(false))}
            >
              x
            </button>
            <div className="heading">
              <h3>Place a Bid</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">AnimeSailorClub #304</span>
              <span className="bold">from Monica Lucas</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid (ETH)</h6>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="detailcheckout mt-3">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input
                  type="text"
                  name="buy_now_qty"
                  id="buy_now_qty"
                  className="form-control"
                />
              </div>
            </div>
            <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 ETH</div>
            </div>
            <button className="btn-main lead mb-5">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ItemDetail;
