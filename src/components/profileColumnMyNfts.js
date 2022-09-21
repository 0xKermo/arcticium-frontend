import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setUserAssets } from "../store/slicers/userAssets";

const Outer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ColumnMyNfts = () => {
  const [height, setHeight] = useState(0);
  const { userAssets } = useSelector((state) => state.userAssets);
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };


  return (
    <div className="row">
      {userAssets.map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-2 col-md-6 col-sm-6 col-xs-12 mb-4"
          onClick={() =>
            window.open(
              "/asset/" + nft.contract_address + "/" + nft.token_id,
              "_self"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div
            className="nft__item m-0"
            style={{ padding: "0px", height: "350px" }}
          >
            <div className="nft__item_wrap" style={{ height: "70%" }}>
              <Outer>
                <img
                  style={{ width: "100%", height: "100%" }}
                  onLoad={onImgLoad}
                  src={nft.image ? nft.image : "/img/emptyImage.jpg"}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Outer>
            </div>
            <div className="nft__item_info" style={{ padding: "15px" }}>
              <span>
                <h4>{nft.name ? nft.name : ""}</h4>
              </span>
              <div className="nft__item_price">
                {nft.contract_address ? nft.contract_address.slice(0, 6) : null}
                ...
                {nft.contract_address ? nft.contract_address.slice(-7) : null}
              </div>
              {/* <div className="nft__item_action">
                <span onClick={() => window.open(nft.contract_address+"/"+nft.token_id, "_self")}>
                  ...
                </span>
              </div> */}
              <div className="nft__item_like">
                {nft.trade.tradeId ? (
                  <span>Listed</span>
                ) : (
                  <span>Unlisted</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ColumnMyNfts;
