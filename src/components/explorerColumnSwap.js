import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./notFound";
import { GetOpenTrades } from "../grqphql/query";
import { currencyNames } from "../constants/CurrencyAddresses";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ExplorerColumnSwap = (props) => {
  const { _openTrades } = useSelector((state) => state.openTrades);
  const [_getOpenTrades, { loading, data }] = useLazyQuery(GetOpenTrades);

  return (
    <div className="row">
      {_openTrades != undefined &&
        _openTrades.length > 0 &&
        _openTrades.map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
          >
            <a
              href={`/asset/${nft.assetInfo.contract_address}/${nft.assetInfo.token_id}`}
            >
              <div className="nft_popular_item m-0">
                <div className="nft__item_wrap">
                  <Outer>
                    <span>
                      <img
                        src={
                          nft.assetInfo.image
                            ? nft.assetInfo.image
                            : "../img/emptyImage.png"
                        }
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </span>
                  </Outer>
                  <div className="swap-icon">
                    <i className="fa fa-exchange"></i>
                  </div>
                  <Outer>
                    <span>
                      {nft.targetTokenContract && nft.targetTokenId && (
                        <img
                          src={
                            nft.targetAssetInfo.length > 0
                              ? nft.targetAssetInfo[0].image
                              : "../img/emptyImage.png"
                          }
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      )}
                    </span>
                  </Outer>
                  {!nft.targetTokenId && (
                    <div>
                      <Outer>
                        <span>
                          <img
                            src="../img/emptyImage.png"
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </span>
                      </Outer>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="nft__item_info">
                      <span>
                        <h4>{nft.assetInfo.name}</h4>
                      </span>
                      <span>
                        <h6>
                          {" "}
                          {nft.assetInfo.contract_address ? (
                            nft.assetInfo.contract_address.slice(0, 10) + "..."
                          ) : (
                            <br></br>
                          )}
                        </h6>
                      </span>
                      <div className="nft__item_price">
                        <br></br>
                        <br></br>
                        <br></br>
                        {/* <span>{nft.bid}</span> */}
                      </div>
                    </div>
                  </div>
                  {nft.targetAssetInfo.length > 0 && (
                    <div className="col-6">
                      <div className="nft__item_info">
                        <span>
                          <h4>{nft.targetAssetInfo[0].name?nft.targetAssetInfo[0].name:<br></br>}</h4>
                          <span>
                            <h6>
                              {nft.targetAssetInfo[0].contract_address ? (
                                nft.targetAssetInfo[0].contract_address.slice(
                                  0,
                                  10
                                ) + "..."
                              ) : (
                                <br></br>
                              )}
                            </h6>
                          </span>
                        </span>
                        <div className="nft__item_price">
                          <span>
                            {nft.price ? (
                              "+ " +
                              nft.price +
                              " " +
                              currencyNames[Number(nft.currencyType)]
                            ) : (
                              <br></br>
                            )}
                          </span>

                          {/* <span>{nft.bid}</span> */}
                        </div>
                        <div className="nft__item_action">
                          <span>Buy now</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {nft.targetAssetInfo.length < 1 && (
                    <div className="col-6">
                      <div className="nft__item_info">
                      <br></br>
                        <br></br>
                        <div className="nft__item_price">
                          <br></br>
                          {/* <span>{nft.bid}</span> */}
                        </div>
                        <div className="nft__item_action">
                          <span>Make Offer</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))}
      {_openTrades.length < 1 && (
        <div style={{ textAlign: "center" }}>
          <NotFound text={"Sorry, No Nft found listed"} />
        </div>
      )}
    </div>
  );
};
export default ExplorerColumnSwap;
