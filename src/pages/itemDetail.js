import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenURI, GetOwnerOf, GetCollectionName } from "../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setVoyagerLink } from "../store/slicers/itemDetailOperations";
import { setMetadata } from "../store/slicers/metadata";
import { Toaster } from "react-hot-toast";
import { GetTradeWithAddresId } from "../grqphql/query";
import { useQuery } from "@apollo/client";

import Item from "../components/item";

import { setCurrencyInfo } from "../store/slicers/currency";
import { setCollections } from "../store/slicers/collections";
import OfferPopup from "../components/offerPopup";
import ItemDetailShowItem from "../components/itemDetailShowItem";
import SwapToAnyItem from "../components/swapToAnyItem";
import SwapToCollectionItem from "../components/swapToCollectionItem";
import TargetItem from "../components/targetItem";
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
    .link:hover {
      color: #00F
   }
  }
`;

const ItemDetail = function () {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(link);
  };

  /**
   *  Reducer start
   */
  const { metadata } = useSelector((state) => state.metadata);
  const { openMenu, openMenu1, voyagerLink, openCheckout, makeOfferBtn } =
    useSelector((state) => state.itemDetailOperation);
  const { collectionName } = useSelector((state) => state.collections);

  /**
   * Reducer End
   */
  const { contract, id } = useParams();

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

  /**
   * Graphql end
   */

  useEffect(() => {
    const prepare = async (dataGetAsset) => {
      console.log(dataGetAsset);
      await getCollectionName(contract);
      if (dataGetAsset == null) {
        await getTokenURI(contract, id).then((res) => {
          dispatch(setMetadata(res));
          dispatch(
            setVoyagerLink(
              `https://beta-goerli.voyager.online/contract/${res.contract_address}`
            )
          );
        });
      } else {
        dispatch(setMetadata(dataGetAsset));
        dispatch(
          setVoyagerLink(
            `https://beta-goerli.voyager.online/contract/${dataGetAsset.contract_address}`
          )
        );
      }
    };
    if (!loading) {
      const _collections = data.collections.map((item, i) => {
        const collectionSelect = {
          value: item.collectionAddress,
          label: item.collectionName,
        };
        return collectionSelect;
      });
      dispatch(setCollections(_collections));

      const currencyInfo = data.getCurrencies.map((item, i) => {
        return {
          value: item.currencyAddress,
          label: item.currencyName,
        };
      });
      dispatch(setCurrencyInfo({ currencyInfo }));
      prepare(data.getAsset != null ? data.getAsset : null);
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

          {!loading && data.getTradeWithAddresId === null && !makeOfferBtn && (
            <ItemDetailShowItem data={data} contract={contract} id={id} />
          )}

          {!loading && data.getTradeWithAddresId === null && makeOfferBtn && (
            <>
              <Item
                meta={metadata}
                collectionName={collectionName}
                attr={attr(metadata)}
                voyagerLink={voyagerLink}
              />
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
                  </div>
                </div>
              </div>
              <SwapToAnyItem
                collections={data.collections}
                currency={data.getCurrencies}
                data={data.getTradeWithAddresId}
              />
            </>
          )}

          {!loading && data.getTradeWithAddresId !== null && data.getTradeWithAddresId.tradeType === 0 && (
            <>
              {!makeOfferBtn && (
                <ItemDetailShowItem data={data} contract={contract} id={id} />
              )}
              {makeOfferBtn && (
                <>
                  <Item
                    meta={metadata}
                    collectionName={collectionName}
                    attr={attr(metadata)}
                    voyagerLink={voyagerLink}
                  />
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
                      </div>
                    </div>
                  </div>
                  <SwapToAnyItem
                    collections={data.collections}
                    currency={data.getCurrencies}
                    data={data.getTradeWithAddresId}
                  />
                </>
              )}
            </>
          )}

          {!loading && data.getTradeWithAddresId !== null && data.getTradeWithAddresId.tradeType === 1 && (
            <>
              {!makeOfferBtn && (
                <ItemDetailShowItem data={data} contract={contract} id={id} />
              )}
              {makeOfferBtn && (
                <>
                  <Item
                    meta={metadata}
                    collectionName={collectionName}
                    attr={attr(metadata)}
                    voyagerLink={voyagerLink}
                  />
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
                      </div>
                    </div>
                  </div>
                  <SwapToCollectionItem
                    collections={data.collections}
                    currency={data.getCurrencies}
                    data={data.getTradeWithAddresId}
                  />
                </>
              )}
            </>
          )}

          {!loading && data.getTradeWithAddresId !== null   && data.getTradeWithAddresId.tradeType === 2 && (
            <>
              <Item
                meta={metadata}
                collectionName={collectionName}
                attr={attr(metadata)}
                voyagerLink={voyagerLink}
              />
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
                  </div>
                </div>
              </div>
              <TargetItem
                targetItemData={data.getTradeWithAddresId.targetAssetInfo[0]}
              />
            </>
          )}

        </div>
      </section>

      {openCheckout && (
        <OfferPopup contract={contract} id={id} metadata={metadata} />
      )}
    </div>
  );
};
export default ItemDetail;
