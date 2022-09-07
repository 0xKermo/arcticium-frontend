import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenURI, GetCollectionName } from "../hooks";
import { useParams } from "react-router-dom";
import { setVoyagerLink } from "../store/slicers/itemDetailOperations";
import { setMetadata } from "../store/slicers/metadata";
import { Toaster } from "react-hot-toast";
import { GetTradeWithAddresId } from "../grqphql/query";
import { useQuery } from "@apollo/client";
import { BidActions } from "../controller";
import Item from "../components/item";
import TargetItem from "../components/targetItem";
import SwapToAnyItem from "../components/swapToAnyItem";
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
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
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

const Swap = function () {
  const dispatch = useDispatch();
  /**
   *  Reducer start
   */
  const { metadata } = useSelector((state) => state.metadata);
  const { walletAddress } = useSelector((state) => state.wallet);

  const { collectionName } = useSelector((state) => state.collections);
  const {
    bidCollectionAddress,
    bidItemId,
    bidCurrencyType,
    bidCurrencyAmount,
  } = useSelector((state) => state.bid);
  const { voyagerLink } = useSelector((state) => state.itemDetailOperation);
  /**
   * Reducer End
   */
  const { contract, id } = useParams();
  const { makeOffer } = BidActions();
  /**
   * Graphql start
   */

  const { getTokenURI } = GetTokenURI();
  const { getCollectionName } = GetCollectionName();
  const { loading, error, data } = useQuery(GetTradeWithAddresId, {
    variables: {
      contractAddress: contract,
      tokenId: Number(id),
    },
  });
  const buy_now = () => {};
  const make_offer = () => {
    const bidData = {
      bidOwner: walletAddress,
      bidContractAddress: bidCollectionAddress,
      bidTokenId: bidItemId,
      bidCurrencyType: 1,
      bidPrice: Number(bidCurrencyAmount),
      tradeId: 9,
      biddedItemOwner: data.getTradeWithAddresId.tradeOwnerAddress,
      biddedItemContractAddress: data.getTradeWithAddresId.tokenContract,
      biddedItemId: data.getTradeWithAddresId.tokenId,
      status: "Open",
      bidTradeType: data.getTradeWithAddresId.tradeType,
      expiration: 123,
      itemBidId: 1,
    };
    makeOffer(bidData);
  };

  useEffect(() => {
    const prepare = async (assetInfo) => {
      await getCollectionName(contract);
      if (assetInfo != null) {
        dispatch(setMetadata(assetInfo));
        dispatch(
          setVoyagerLink(
            `https://beta-goerli.voyager.online/contract/${assetInfo.contract_address}`
          )
        );
      } else {
        var _metadata = await getTokenURI(contract, id);
        if (_metadata.name != undefined) {
          dispatch(setMetadata(_metadata));
          console.log(metadata);
          dispatch(
            setVoyagerLink(
              `https://beta-goerli.voyager.online/contract/${_metadata.contract_address}`
            )
          );
        }
      }
    };
    if (!loading) {
      prepare(data.getAsset);
      console.log(data);
    }
  }, [loading]);

  const attr = (_metadata) =>
    _metadata.attributes != undefined
      ? _metadata.attributes.map((item, index) => {
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
          {metadata.name && (
            <Item
              meta={metadata}
              collectionName={collectionName}
              attr={attr(metadata)}
              voyagerLink={voyagerLink}
            />
          )}
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
                {!loading && data.getTradeWithAddresId.tradeType === 2 && (
                  <div
                    className="swap-icon"
                    style={{ textAlign: "center", marginTop: "140px" }}
                  >
                    <span onClick={buy_now} className="btn-main inline lead">
                      Buy now
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!loading && data.getTradeWithAddresId.tradeType === 0 && (
            <SwapToAnyItem
              collections={data.collections}
              currency={data.getCurrencies}
              makeOffer={make_offer}
              data={data.getTradeWithAddresId}
            />
          )}

          {!loading && data.getTradeWithAddresId.tradeType === 2 && (
            <TargetItem
              targetItemData={data.getTradeWithAddresId.targetAssetInfo[0]}
            />
          )}
        </div>
      </section>
    </div>
  );
};
export default Swap;
