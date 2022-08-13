import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ColumnMyNfts = () => {
  const [height, setHeight] = useState(0);
  const { _nfts } = useSelector((state) => state.userNfts);
  const { userAssets } = useSelector((state) => state.userAssets);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };
  const loadMore = () => {
    console.log(userAssets);
    let nftState = userAssets;
    let start = nftState.length;
    let end = nftState.length + 4;
    // this.setState({
    //   nfts: [...nftState, ...this.dummyData.slice(start, end)],
    // });
  };
  return (
    <div className="row">
      {userAssets.map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-2 col-md-6 col-sm-6 col-xs-12 mb-4"
          onClick={() => window.open("/asset/"+nft.contract_address+"/"+nft.token_id, "_self")}
        >
          <div className="nft__item m-0">
            <div className="nft__item_wrap" style={{ height: `${height}px` }}>
              <Outer>
                <span>
                  <img
                    onLoad={onImgLoad}
                    src={nft.image}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span onClick={() => window.open(nft.nftLink, "_self")}>
                <h4>{nft.name}</h4>
              </span>
              <div className="nft__item_price">
                {nft.contract_address.slice(0, 6)}
                ...
                {nft.contract_address.slice(-7)}
              </div>
              <div className="nft__item_action">
                <span onClick={() => window.open(nft.contract_address+"/"+nft.token_id, "_self")}>
                  ...
                </span>
              </div>
              <div className="nft__item_like">
                <span>Unlisted</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {_nfts.length !== _nfts.length && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};
export default ColumnMyNfts;
