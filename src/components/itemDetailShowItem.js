import { BigNumber } from "ethers";
import {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { ItemDetailAction } from "../controller";
import { AcceptBid, CancelListedItem } from "../hooks";
import { CancelBid } from "../hooks/Exchange/cancelBid";
import {
  setMakeOfferBtn,
  setOpenCheckout,
} from "../store/slicers/itemDetailOperations";
import { walletAddressSlice } from "../utils/walletAddressSlice";

const ItemDetailShowItem = (props) => {

  const dispatch = useDispatch();
  /**
   *    Redux
   */
   const { walletAddress } = useSelector((state) => state.wallet);

  const { metadata, ownerWallet } = useSelector((state) => state.metadata);

  const { itemOwner } = useSelector((state) => state.itemDetailOperation);

  /**
   * Contract Functions
   */
  const { cancelListedItem } = CancelListedItem();
   const {cancelBid} = CancelBid()
  const { acceptBid } = AcceptBid();
  /**
   * Graphql
   */

  /**
   * Functions
   */
  const convertDate = (_bidDate) => {
    const splitDate = _bidDate.split("T")
    const date = splitDate[0].split("-").reverse().join("/")
    const time = splitDate[1].split(".")[0]
    return date+ " "+time

  }
  const open_trade = () => {
    dispatch(setOpenCheckout(true));
  };

  const attr =
    props.data.getAsset != null && props.data.getAsset.attributes != null
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
    cancelListedItem(tradeId);
  };

  const bidAccept = async (e) => {
    const res = acceptBid(e.tradeId, e.itemBidId, e.biddedItemOwner);
    console.log(res);
  };

  const bidCancel = (e) => {
    const res = cancelBid(e.tradeId, e.itemBidId, e.biddedItemOwner);

  }

  return (
    <>
      <div className="col-md-4 text-center">
        <div className="nft_detail_item m-0">
          <img className="lazy nft__item_preview" alt="" src={metadata.image} />
        </div>
        <div className="spacer-40"></div>

        <div className="nft_detail_item_info m-0">
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

        <div className="nft_detail_item_info m-0">
          <div className="item_info">
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
                        href={`https://beta-goerli.voyager.online/contract/${props.contract}`}
                      >
                        <b>Voyager Link</b>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-40"></div>

        <div className="nft_detail_item_info m-0">
          <div className="item_info">
            <div className="de_tab">
              <div className="tab-1 onStep fadeIn">
                <div className="p_list">
                  <div className="p_detail_header">
                    <span>
                      <h4>Attributes</h4>
                    </span>
                  </div>
                </div>
                <div className="row">{attr}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="nft_detail_item_info m-0">
          <div className="item_info">
            <div className="p_detail_header">
              {itemOwner === 1 && (
                <span onClick={open_trade} className="right btn-main lead">
                  Open Trade
                </span>
              )}
              {itemOwner === 2 && (
                <span onClick={cancelListing} className="right btn-main lead">
                  Cancel listing
                </span>
              )}
              {itemOwner === 3 && (
                <span onClick={make_offer} className="right btn-main lead">
                  Make Offer
                </span>
              )}
              <span>
                <h2>{metadata.name}</h2>
              </span>
            </div>
          </div>

          <div className="item_info">
            <div className="p_list" style={{ display: "flex" }}>
              <div className="col-md-4  ">
                <div className="p_detail">
                  <h6>Owner</h6>
                  <div
                    className="item_author"
                    onClick={() =>
                      window.open(`/${props.data.getAsset.assetOwner}`, "_self")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="author_list_pp">
                      <span>
                        <img className="lazy" src={metadata.ownerPP} alt="" />
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>{walletAddressSlice(ownerWallet, 5, 3)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p_detail">
                  <h6>Creator</h6>
                  <div
                    className="item_author"
                    onClick={() =>
                      window.open(`/collection/${props.contract}`, "_self")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={`/${metadata.collectionPP}`}
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>
                        {metadata.collectionName
                          ? metadata.collectionName
                          : props.contract.slice(0, 5) +
                            "..." +
                            props.contract.slice(-3)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>

            {props.data.getTradeWithAddresId && (
              <div className="row">
                <div className="col-md-4">
                  <div className="listedInfo">
                    <span style={{ padding: "10px" }}>
                      item listed to{" "}
                      {props.data.getTradeWithAddresId.targetTokenContract ==
                      null
                        ? "any item"
                        : props.data.getTradeWithAddresId.targetTokenId !== null
                        ? props.data.getTradeWithAddresId.targetAssetInfo[0]
                            .name +
                          "from" +
                          props.data.getTradeWithAddresId.targetTokenContract +
                          "collection"
                        : "any item from " +
                          walletAddressSlice(props.data.getTradeWithAddresId.targetTokenContract,5,5)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-40"></div>
        <div className="spacer-30"></div>

        <div className="nft_detail_item_info m-0">
          <div className="item_info">
            <div className="de_tab">
              <div className="de_tab">
                <div className="tab-1 onStep fadeIn">
                  <div className="p_list">
                    <div className="p_detail_header">
                      <span>
                        <h4>Bids</h4>
                      </span>
                    </div>
                  </div>
                  {props.data.getTradeWithAddresId && props.data.getTradeWithAddresId.tradeId && 
                    props.data.getTradeWithAddresId.tradeBids.map(
                      (item, index) => (
                        <div className="p_list" key={index}>
                          <div
                            className="p_list_pp"
                            onClick={() =>
                              window.open(
                                `/asset/${item.bidAsset.contract_address}/${item.bidAsset.token_id}`,
                                "_self"
                              )
                            }
                          >
                            <img
                              className="lazy"
                              src={item.bidAsset.image}
                              alt=""
                              style={{ cursor: "pointer", height: "50px" }}
                            />
                          </div>
                          <div
                            className="p_list_info"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="row">
                              <div
                                className="col-md-10"
                                onClick={() =>
                                  window.open(
                                    `/asset/${item.bidAsset.contract_address}/${item.bidAsset.token_id}`,
                                    "_self"
                                  )
                                }
                              >
                                Offered{" "}
                                <b>
                                {item.bidAsset.name }
                                  {item.bidPrice && Number(item.bidPrice) > 0
                                    && 
                                      " + " +
                                      item.bidPrice +
                                      " ETH"
                                    }
                                </b>
                                   {" "}   by{" "}
                                  <b>{walletAddressSlice(item.bidAsset.assetOwner,5,5)}</b>{" "}
                                <span>
                                  from{" "}
                                  <b>{walletAddressSlice(item.bidAsset.contract_address,5,3)}</b>{" "}
                                  at {convertDate(item.createdAt)}
                                </span>
                              </div>
                              {(() => {
                                if (itemOwner === 2 || itemOwner === 1) {
                                  return (
                                    <div className="col-md-2">
                                      <button
                                        className="btn-main lead mb-2 right"
                                        onClick={() => {
                                          bidAccept(item);
                                        }}
                                        style={{
                                          padding: "6px 5px",
                                          margin: "10px",
                                        }}
                                      >
                                        Accept
                                      </button>
                                    </div>
                                  );
                                }else if(itemOwner === 3 && BigNumber.from(walletAddress).eq(
                                  item.bidOwner
                                )){
                                  return (
                                    <div className="col-md-2">
                                      <button
                                        className="btn-main lead mb-2 right"
                                        onClick={() => {
                                          bidCancel(item);
                                        }}
                                        style={{
                                          padding: "6px 5px",
                                          margin: "10px",
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  );
                                }
                              })()}
                              
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="spacer-40"></div>
      </div>
    </>
  );
};

export default ItemDetailShowItem;
