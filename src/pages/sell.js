import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GetTokenURI, GetOwnerOf, GetCollectionName } from "../hooks";
import { useParams } from "react-router-dom";
import {
  setVoyagerLink,
} from "../store/slicers/itemDetailOperations";
import { setMetadata } from "../store/slicers/metadata";
import { Toaster } from "react-hot-toast";
import { GetTradeWithAddresId } from "../grqphql/query";
import { useQuery } from "@apollo/client";
import { setTargetMetadata,setTargetVoyagerLink } from "../store/slicers/targetNftMetadata";
import Item from "../components/item"
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


const Sell = function () {
  const dispatch = useDispatch();

  /**
   *  Reducer start
   */
  const { metadata } = useSelector((state) => state.metadata);
  const { walletAddress } = useSelector((state) => state.wallet);
  const { targetMetadata,targetVoyagerLink } = useSelector((state) => state.targetMetadata);
  const {  collectionName } =
    useSelector((state) => state.collections);
  const {
    voyagerLink,
  } = useSelector((state) => state.itemDetailOperation);

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



  const open_trade = () => {
    console.log("open trde");
  };

  useEffect(() => {
    console.log(data)
    if(!loading){
      dispatch(setTargetMetadata({
        name:data.getTradeWithAddresId.targetName,
        contract_address:data.getTradeWithAddresId.targetTokenContract,
        description: data.getTradeWithAddresId.targetDescription,
        image:data.getTradeWithAddresId.targetImage,
        attributes:data.getTradeWithAddresId.targetAttributes == undefined ? null :data.getTradeWithAddresId.targetAttributes,
          }))
          const targetVoyager = `https://beta-goerli.voyager.online/contract/${data.getTradeWithAddresId.targetTokenContract}`
          dispatch(setTargetVoyagerLink(targetVoyager))
    }
   
  }, [loading]);

  useEffect(() => {
    const prepare = async () => {

      await getCollectionName(contract);

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
    };
    prepare();
  }, [walletAddress]);

  const attr =() => (
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
      : null
    )
  
    

  return (
    <div>
      <GlobalStyles />
      <Toaster position="bottom-center" reverseOrder={true} />
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          {metadata.name &&
          <Item meta={metadata} collectionName={collectionName} attr={attr} voyagerLink={voyagerLink} />
          }
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
                  <span onClick={open_trade} className="btn-main inline lead">
                    Buy now
                  </span>
                </div>
              </div>
            </div>
          </div>
          {targetMetadata.name &&
          <Item meta={targetMetadata} collectionName={collectionName} attr={attr} voyagerLink={targetVoyagerLink} />
          }
        </div>
      </section>
    </div>
  );
};
export default Sell;
