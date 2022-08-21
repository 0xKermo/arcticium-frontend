import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { ItemDetailAction } from "../controller";
import { updateTradeStatus } from "../grqphql/mutation";
import { AcceptBid} from "../hooks";
import {
  setMakeOfferBtn,
  setOpenCheckout,
  setItemOwner
} from "../store/slicers/itemDetailOperations";
import { ListedItemAction } from "../controller/itemDetail/listedItemAction";

const ItemDetailShowItem = (props) => {
  const dispatch = useDispatch();
  /**
   *    Redux
   */
  const { openMenu, openMenu1, voyagerLink, itemOwner } = useSelector(
    (state) => state.itemDetailOperation
  );
  const { collectionName } = useSelector((state) => state.collections);

  /**
   * Contract Functions
   */
  const { cancelItemListing } = ListedItemAction();
  const {acceptBid} = AcceptBid()
  /**
   * Graphql
   */
  const [tradeStatus] = useMutation(updateTradeStatus);
  /**
   * Functions
   */
  const { handleBtnClick, handleBtnClick1 } = ItemDetailAction();

  const open_trade = () => {
    dispatch(setOpenCheckout(true));
  };
  const attr =
  props.data.getAsset.attributes != null
      ? props.data.getAsset.attributes.map((item, index) => {
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

  const make_offer = () => {
    dispatch(setMakeOfferBtn(true));
  };

  const cancelListing = async () => {
    const tradeId = props.data.getTradeWithAddresId.tradeId;
    cancelItemListing(tradeId, props.contract, props.id)
  };

  const bidAccept = async (e) => {
      const res = acceptBid(e.tradeId, e.itemBidId)
      console.log(res)
  }



  /**
   * Function End
   */
  return (
    <>
      <div className="col-md-4 text-center">
        <div
          className="nft__item m-0"
          style={{ width: "auto", height: "400px", padding: "0" }}
        >
          <div className="nft__item_offer">
            <span>
              <img
                className="lazy nft__item_preview"
                alt=""
                src={props.data.getAsset.image}
              />
            </span>
          </div>
        </div>
        <div className="spacer-40"></div>
        <div className="item_info">
          <div className="de_tab">
            <div className="tab-1 onStep fadeIn">
              <div className="p_list">
                <div className="p_detail_header">
                  <span>
                    <h4>Description</h4>
                  </span>
                </div>
              </div>

              <div className="p_list">
                <div className="p_detail">
                  <span>{props.data.getAsset.description}</span>
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
          <h2>{props.data.getAsset.name}</h2>
        </div>

        <div className="item_info">
          <div className="p_list" style={{ display: "flex" }}>
            <div className="col-md-4  ">
              <div className="p_detail">
                <h6>Owner</h6>
                <div className="item_author">
                  <div className="author_list_pp">
                    <span>
                      <img className="lazy" src={props.data.getAsset.image} alt="" />
                    </span>
                  </div>
                  <div className="author_list_info">
                    <span>test</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p_detail">
                <h6>Creator</h6>
                <div className="item_author">
                  <div className="author_list_pp">
                    <span>
                      <img className="lazy" src={props.data.getAsset.image} alt="" />
                    </span>
                  </div>
                  <div className="author_list_info">
                    <span>
                      {collectionName
                        ? collectionName
                        : props.contract.slice(0, 6) +
                          "..." +
                          props.contract.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-40"></div>
        {itemOwner === 1 && (
          <span onClick={open_trade} className="btn-main inline lead">
            Open Trade
          </span>
        )}
        {itemOwner === 2 && (
          <div className="item_info">
            {props.data.getTradeWithAddresId !== null && (
              <>
                <div className="listedInfo">
                  <span>
                    item listed to{" "}
                    {props.data.getTradeWithAddresId.targetTokenContract == null
                      ? "any collection"
                      : props.data.getTradeWithAddresId.targetTokenId !== 0
                      ? props.data.getTradeWithAddresId.targetAssetInfo[0]
                          .name +
                        "from" +
                        props.data.getTradeWithAddresId.targetTokenContract +
                        "collection"
                      : "any item from " +
                        props.data.getTradeWithAddresId.targetTokenContract.slice(
                          0,
                          6
                        ) +
                        "..." +
                        props.data.getTradeWithAddresId.targetTokenContract.slice(
                          -6
                        )}
                  </span>
                </div>
                <div className="item_info">
                  <button
                    style={{
                      margin: "0",
                      color: "rgb(131, 100, 226) !important",
                      backgroundColor: "#f0f0f0",
                      width: "20%",
                      padding: "8px 20px",
                    }}
                    className="btn-cancel lead mb-2 right"
                    onClick={cancelListing}
                  >
                    Cancel listing
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {itemOwner === 3 && (
          <div className="item_info">
            <div className="de_countdown">
              <span onClick={make_offer} className="btn-main inline lead">
                Make Offer
              </span>
            </div>
          </div>
        )}
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-20"></div>

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
                  {props.data.getTradeWithAddresId != null &&
                    props.data.getTradeWithAddresId.tradeBids.map(
                      (item, index) => (
                        <div
                          className="p_list"
                          key={index}
                          
                        >
                          <div className="p_list_pp" onClick={() =>
                            window.open(
                              `/asset/${item.bidAsset.contract_address}/${item.bidAsset.token_id}`,
                              "_self"
                            )
                          }>
                            <span>
                              <img
                                className="lazy"
                                src={item.bidAsset.image}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </span>
                          </div>
                          <div className="p_list_info"  style={{ cursor: "pointer" }}>
                            <div className="row">
                              <div className="col-md-10" onClick={() =>
                            window.open(
                              `/asset/${item.bidAsset.contract_address}/${item.bidAsset.token_id}`,
                              "_self"
                            )
                          }>
                                Offered <b>{item.bidAsset.name}</b>
                                <span>
                                  by{" "}
                                  <b>
                                    {item.bidAsset.contract_address.slice(0, 6)}
                                  </b>{" "}
                                  at 6/15/2021, 3:20 AM
                                </span>
                              </div>
                              <div className="col-md-2">
                                <button
                                  className="btn-main lead mb-2 right"
                                  onClick={() => {bidAccept(item)}}
                                  style={{ padding: "6px 5px",margin:"10px" }}
                                >
                                  Accept
                                </button>
                               
                              </div>

                              <div className="col-md-2">
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
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
                      </span>
                    </div>
                    <div className="p_list_info">
                      Bid <b>0.005 ETH</b>
                      <span>
                        by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailShowItem;
