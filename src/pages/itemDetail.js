import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenURI, GetOwnerOf, GetCollectionName, BuyItem, CancelListedItem } from "../hooks";
import { useParams } from "react-router-dom";
import { setItemOwner } from "../store/slicers/itemDetailOperations";
import { setMetadata, setOwnerWallet } from "../store/slicers/metadata";
import { Toaster } from "react-hot-toast";
import { GetTradeWithAddresId } from "../grqphql/query";
import { useMutation, useQuery } from "@apollo/client";
import Item from "../components/item";
import { setCurrencyInfo } from "../store/slicers/currency";
import { setCollections } from "../store/slicers/collections";
import OfferPopup from "../components/offerPopup";
import ItemDetailShowItem from "../components/itemDetailShowItem";
import SwapToAnyItem from "../components/swapToAnyItem";
import TargetItem from "../components/targetItem";
import { BigNumber } from "ethers";
import { currencyAddresses } from "../constants/CurrencyAddresses";
import { updateTradeStatus } from "../grqphql/mutation";
import { walletAddressSlice } from "../utils/walletAddressSlice";
import ItemLoader from "../components/loader/itemLoader";
import { setItemDetailLoader } from "../store/slicers/loader";
import { GetPixelTokenURI } from "../hooks/ERC721/pixelTokenUri";

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
    text-align: left;
    border-bottom: 1px solid #8364e2;

  }
  .p_detail{
    font-weight: 400;
    text-align: left;
      
    }
    .link:hover {
      color: #00F
   }
  }
`;

const ItemDetail = function () {
  const dispatch = useDispatch();

  /**
   *  Reducer start
   */
  const { metadata, ownerWallet } = useSelector((state) => state.metadata);
  const { voyagerLink, openCheckout, makeOfferBtn, itemOwner } = useSelector(
    (state) => state.itemDetailOperation
  );
  const { collectionName } = useSelector((state) => state.collections);
  const { walletAddress } = useSelector((state) => state.wallet);
  const { itemDetailLoader } = useSelector((state) => state.loader);

  const { cancelListedItem } = CancelListedItem();


  /**
   * Reducer End
   */
  const { contract, id } = useParams();

  /**
   * Graphql start
   */
  const { loading, error, data } = useQuery(GetTradeWithAddresId, {
    variables: {
      contractAddress: contract,
      tokenId: id,
    },
  });
  const [tradeStatus] = useMutation(updateTradeStatus);

  /**
   * Contract
   */
  const {getPixelTokenURI} = GetPixelTokenURI()
  const { getCollectionName } = GetCollectionName();
  const { buyItem } = BuyItem();
  const cancelListing = async () => {
    const tradeId = data.getTradeWithAddresId.tradeId;
    cancelListedItem(tradeId);
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const buyNow = () => {
    debugger
    const tradeId = data.getTradeWithAddresId.tradeId;

    const targetItemContract =
      data.getTradeWithAddresId.targetAssetInfo[0].contract_address;
    const targetAssetOwner =
      data.getTradeWithAddresId.targetAssetInfo[0].assetOwner;
    const price = data.getTradeWithAddresId.price;
    const status = "Executed";
    const tokenContract = getKeyByValue(
      currencyAddresses,
      Number(data.getTradeWithAddresId.currencyType)
    );

    const tradeStatusData = {
      tradeId : tradeId,
      status: status,
      buyer : targetAssetOwner
    }
    buyItem(
      tradeId,
      targetItemContract,
      price,
      tokenContract,
      tradeStatusData
    );
  };

 
  useEffect( () => {
    const  prepare = async (dataGetAsset) =>  {
      const _collectionName =
      data.collections.filter((x) => x.collectionAddress == contract)[0] ==
      null
        ? await getCollectionName(contract) // set collection name collections redux
        : data.collections.filter((x) => x.collectionAddress == contract)[0]
            .collectionName;
      dispatch(
        setMetadata({
          name: dataGetAsset.name,
          description: dataGetAsset.description,
          image: dataGetAsset.image,
          attributes: dataGetAsset.attributes,
          ownerPP: "../../img/author/author.svg",
          collectionPP:
            data.collections.filter(
              (x) => x.collectionAddress == contract
            )[0] == null
              ? "../../img/author/author.svg"
              : data.collections.filter(
                  (x) => x.collectionAddress == contract
                )[0].profileImgPath,
          collectionName: _collectionName,
        })
        );

        setTimeout(() => {
        dispatch(setItemDetailLoader(true));
        }, 1000);

    }

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
  }, [loading])
  

  useEffect(() => {
    const prepare = async () => {
      if (walletAddress != undefined && !loading) {
        try {
          console.log(walletAddress)
          console.log(data.getAsset.assetOwner)
          const checkItemOwner = BigNumber.from(walletAddress).eq(
            data.getAsset.assetOwner
          );
          dispatch(setOwnerWallet(data.getAsset.assetOwner))
          if (checkItemOwner && data.getTradeWithAddresId === null) {
            dispatch(setItemOwner(1));
          } else if (checkItemOwner && data.getTradeWithAddresId !== null) {
            dispatch(setItemOwner(2));
          } else if (!checkItemOwner) {
            dispatch(setItemOwner(3));
          }
        } catch (error) {
            console.log(error)
        }
      }
    };
    prepare();
  }, [walletAddress, loading]);

  const attr = (_metadata) =>
    _metadata.attributes != null && _metadata.attributes != undefined
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
          {!itemDetailLoader && <ItemLoader />}
          {!loading &&
            itemDetailLoader &&
            data.getTradeWithAddresId === null &&
            !makeOfferBtn &&
            metadata != null && (
              <ItemDetailShowItem data={data} contract={contract} id={id} />
            )}

          {!loading &&
            data.getTradeWithAddresId === null &&
            makeOfferBtn &&
            itemDetailLoader && (
              <>
                <Item
                  meta={metadata}
                  collectionName={collectionName}
                  attr={attr(metadata)}
                  voyagerLink={voyagerLink}
                  ownerWallet={walletAddressSlice(ownerWallet, 5, 3)}
                  contract={contract}
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

          {!loading &&
            itemDetailLoader &&
            data.getTradeWithAddresId !== null &&
            data.getTradeWithAddresId.tradeType != 2 && (
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
                      ownerWallet={walletAddressSlice(ownerWallet, 5, 3)}
                      contract={contract}
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

          {!loading &&
            itemDetailLoader &&
            metadata !== null &&
            data.getTradeWithAddresId !== null &&
            data.getTradeWithAddresId.tradeType === 2 && (
              <>
                <Item
                  meta={metadata}
                  collectionName={collectionName}
                  attr={attr(metadata)}
                  voyagerLink={voyagerLink}
                  contract={contract}
                  ownerWallet={walletAddressSlice(ownerWallet, 5, 3)}
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
                      {itemOwner == 2 && (
                        <div className="item_info">
                          <button
                            style={{
                              margin: "0",
                              color: "rgb(131, 100, 226) !important",
                              backgroundColor: "#f0f0f0",
                            }}
                            className="btn-cancel lead mb-2"
                            onClick={cancelListing}
                          >
                            Cancel listing
                          </button>
                        </div>
                      )}
                      {itemOwner === 3 && (
                        <div className="item_info">
                          <button
                            className="btn-main lead mb-2"
                            onClick={buyNow}
                          >
                            Buy now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <TargetItem
                  targetItemData={data.getTradeWithAddresId.targetAssetInfo[0]}
                  price={data.getTradeWithAddresId.price}
                  collections={data.collections}
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
